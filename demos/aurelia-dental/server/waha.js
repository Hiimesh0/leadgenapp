/**
 * WAHA (WhatsApp HTTP API) Client & Messaging Service
 * 
 * Handles:
 * - Phone number validation & normalization to E.164 / @c.us format
 * - Recipient phone number masking for HIPAA/patient privacy
 * - WAHA service health check & session connectivity verification
 * - QR code retrieval for doctor dashboard authentication
 * - Safe delivery with comprehensive error classification (Not Configured, Service Unavailable, Failed, Sent)
 * - Zero direct frontend access (Protected backend communication only)
 */

export function normalizeIndianPhone(inputPhone) {
  if (!inputPhone || typeof inputPhone !== 'string') return null;
  const digits = inputPhone.replace(/\D/g, '');
  let clean = digits;

  // Remove leading 0 if present (e.g. 09825012345)
  if (clean.startsWith('0')) {
    clean = clean.slice(1);
  }

  // If standard 10-digit Indian mobile starting with 6-9
  if (clean.length === 10 && /^[6-9]/.test(clean)) {
    clean = '91' + clean;
  }

  // If 12 digits starting with 91 followed by 6-9
  if (clean.length === 12 && clean.startsWith('91') && /^[6-9]/.test(clean.slice(2))) {
    const rawNumber = clean.slice(2);
    return {
      raw: inputPhone,
      e164Digits: clean,
      chatId: `${clean}@c.us`,
      masked: `+91 ${rawNumber.slice(0, 5)} ****${rawNumber.slice(8)}`
    };
  }

  return null;
}

export class WahaService {
  constructor() {
    this.baseUrl = (process.env.WAHA_BASE_URL || 'http://localhost:3008').replace(/\/+$/, '');
    this.apiKey = process.env.WAHA_API_KEY || '';
    this.session = process.env.WAHA_SESSION || 'default';
    this.enabled = process.env.WAHA_ENABLED !== 'false';
  }

  async resolveBaseUrl() {
    if (process.env.WAHA_BASE_URL) {
      return process.env.WAHA_BASE_URL.replace(/\/+$/, '');
    }
    // Check 3008 first (preferred to avoid conflict with existing docker containers)
    for (const testUrl of ['http://localhost:3008', 'http://localhost:3000']) {
      try {
        const res = await fetch(`${testUrl}/api/server/version`, { signal: AbortSignal.timeout(800) });
        if (res.ok) {
          this.baseUrl = testUrl;
          return testUrl;
        }
      } catch {}
    }
    return this.baseUrl;
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    if (this.apiKey) {
      headers['X-Api-Key'] = this.apiKey;
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }
    return headers;
  }

  /**
   * Check connection status of WAHA server and active session
   */
  async getStatus() {
    if (!this.enabled) {
      return {
        configured: false,
        status: 'NOT_CONFIGURED',
        label: 'WAHA not configured (WAHA_ENABLED=false)',
        connected: false,
        session: this.session,
        baseUrl: this.baseUrl,
        error: 'WAHA integration is currently disabled in environment variables.'
      };
    }

    await this.resolveBaseUrl();

    try {
      // Step 1: Probe health endpoint with 3s timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch(`${this.baseUrl}/api/sessions/${this.session}`, {
        headers: this.getHeaders(),
        signal: controller.signal
      }).catch(async (err) => {
        // Fallback to checking root sessions list
        return fetch(`${this.baseUrl}/api/sessions`, {
          headers: this.getHeaders(),
          signal: controller.signal
        });
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          return {
            configured: true,
            status: 'AUTH_FAILED',
            label: 'Invalid WAHA API Key',
            connected: false,
            session: this.session,
            baseUrl: this.baseUrl,
            error: 'Authentication failed. Please verify WAHA_API_KEY.'
          };
        }
        if (res.status === 404) {
          return {
            configured: true,
            status: 'SESSION_NOT_FOUND',
            label: 'Session needs setup',
            connected: false,
            session: this.session,
            baseUrl: this.baseUrl,
            error: `Session "${this.session}" does not exist in WAHA. Create or start it.`
          };
        }
        return {
          configured: true,
          status: 'UNAVAILABLE',
          label: 'WAHA service error',
          connected: false,
          session: this.session,
          baseUrl: this.baseUrl,
          error: `WAHA returned HTTP status ${res.status}.`
        };
      }

      const data = await res.json();
      let sessionStatus = 'UNKNOWN';

      if (Array.isArray(data)) {
        const found = data.find(s => s.name === this.session);
        sessionStatus = found ? found.status : 'NOT_FOUND';
      } else if (data && data.status) {
        sessionStatus = data.status;
      }

      switch (sessionStatus.toUpperCase()) {
        case 'WORKING':
          return {
            configured: true,
            status: 'CONNECTED',
            label: 'WhatsApp connected',
            connected: true,
            session: this.session,
            baseUrl: this.baseUrl
          };
        case 'SCAN_QR_CODE':
          return {
            configured: true,
            status: 'SCAN_QR_CODE',
            label: 'Session needs authentication',
            connected: false,
            qrRequired: true,
            session: this.session,
            baseUrl: this.baseUrl
          };
        case 'STARTING':
          return {
            configured: true,
            status: 'CONNECTING',
            label: 'Session connecting',
            connected: false,
            session: this.session,
            baseUrl: this.baseUrl
          };
        case 'STOPPED':
        case 'FAILED':
        default:
          return {
            configured: true,
            status: 'DISCONNECTED',
            label: 'Session disconnected',
            connected: false,
            session: this.session,
            baseUrl: this.baseUrl,
            error: `WAHA session status is ${sessionStatus}.`
          };
      }
    } catch (err) {
      return {
        configured: true,
        status: 'UNAVAILABLE',
        label: 'WAHA service unavailable',
        connected: false,
        session: this.session,
        baseUrl: this.baseUrl,
        error: `Could not connect to WAHA at ${this.baseUrl}. Is the Docker container running? (${err.message})`
      };
    }
  }

  /**
   * Fetch QR code for authentication if session is in SCAN_QR_CODE state
   */
  async getQrCode() {
    if (!this.enabled) {
      return { ok: false, error: 'WAHA is not enabled in environment configuration.' };
    }
    await this.resolveBaseUrl();

    try {
      const res = await fetch(`${this.baseUrl}/api/${this.session}/auth/qr`, {
        headers: this.getHeaders()
      }).catch(() => {
        return fetch(`${this.baseUrl}/api/sessions/${this.session}/auth/qr`, {
          headers: this.getHeaders()
        });
      });

      if (!res.ok) {
        return { ok: false, error: `WAHA returned ${res.status} when requesting QR code.` };
      }

      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('image')) {
        const arrayBuffer = await res.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString('base64');
        return { ok: true, qr: `data:${contentType};base64,${base64}` };
      }

      const json = await res.json();
      return { ok: true, qr: json.qr || json.data || json };
    } catch (err) {
      return { ok: false, error: `Failed to retrieve QR code: ${err.message}` };
    }
  }

  /**
   * Trigger start/restart of WAHA WhatsApp session
   */
  async restartSession() {
    if (!this.enabled) {
      return { ok: false, error: 'WAHA is not enabled.' };
    }

    try {
      const res = await fetch(`${this.baseUrl}/api/sessions/${this.session}/restart`, {
        method: 'POST',
        headers: this.getHeaders()
      }).catch(() => {
        return fetch(`${this.baseUrl}/api/sessions/${this.session}/start`, {
          method: 'POST',
          headers: this.getHeaders()
        });
      });

      return { ok: res.ok, status: res.status };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  }

  /**
   * Send WhatsApp confirmation message for an appointment
   */
  async sendAppointmentConfirmation(appointment) {
    const phoneInfo = normalizeIndianPhone(appointment.phone);
    const maskedPhone = phoneInfo ? phoneInfo.masked : `+91 ****${(appointment.phone || '').slice(-4)}`;

    // 1. Validate Phone Number
    if (!phoneInfo) {
      console.warn(`[WAHA] Rejected sending to invalid phone: "${appointment.phone}" for ${appointment.appointment_ref}`);
      return {
        success: false,
        status: 'Failed',
        maskedPhone,
        error: 'Invalid recipient phone number. Must be a valid 10-digit Indian mobile number.'
      };
    }

    // 2. Check if WAHA is enabled
    if (!this.enabled) {
      console.log(`[WAHA] Notification skipped: WAHA_ENABLED is not set to true. (Target: ${maskedPhone})`);
      return {
        success: false,
        status: 'Not Configured',
        maskedPhone,
        error: 'WAHA WhatsApp messaging is currently disabled in environment configuration (WAHA_ENABLED=false).'
      };
    }

    // 3. Prepare Patient Message Template
    const messageText = `Hi ${appointment.patient_name}, we received your appointment request at XYZ Dental Clinic.

Appointment ID: ${appointment.appointment_ref}
Service: ${appointment.service_name}
Date: ${appointment.preferred_date}
Time: ${appointment.preferred_time}
Status: Pending Confirmation

Our clinic will contact you if any changes are required. This is a demo appointment and is not a real medical booking.`;

    const payload = {
      session: this.session,
      chatId: phoneInfo.chatId,
      text: messageText
    };

    await this.resolveBaseUrl();

    console.log(`[WAHA] Dispatching confirmation for ${appointment.appointment_ref} to ${maskedPhone}...`);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 7000);

      const response = await fetch(`${this.baseUrl}/api/sendText`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const responseBody = await response.json().catch(() => ({}));

      if (response.ok) {
        const messageId = responseBody.id || responseBody.messageId || `waha-${Date.now()}`;
        console.log(`[WAHA] ✅ Message sent successfully! MessageId: ${messageId} to ${maskedPhone}`);
        return {
          success: true,
          status: 'Sent to WAHA',
          messageId,
          maskedPhone,
          attemptTime: new Date().toISOString()
        };
      }

      // Handle specific HTTP errors from WAHA
      let errorMessage = `WAHA HTTP ${response.status}`;
      if (responseBody && responseBody.message) {
        errorMessage = responseBody.message;
      } else if (response.status === 401 || response.status === 403) {
        errorMessage = 'Unauthorized. Verify WAHA_API_KEY.';
      } else if (response.status === 422) {
        errorMessage = 'WAHA rejected payload. Session may not be authenticated (SCAN_QR_CODE).';
      }

      console.warn(`[WAHA] ❌ Delivery rejected for ${appointment.appointment_ref}: ${errorMessage}`);
      return {
        success: false,
        status: 'Failed',
        maskedPhone,
        error: errorMessage,
        attemptTime: new Date().toISOString()
      };
    } catch (err) {
      let safeError = err.message;
      if (err.name === 'AbortError') {
        safeError = 'Network timeout while contacting WAHA server (7s exceeded).';
      } else if (err.code === 'ECONNREFUSED' || safeError.includes('ECONNREFUSED') || safeError.includes('fetch failed')) {
        safeError = `WAHA service unavailable at ${this.baseUrl}. Please ensure WAHA Docker container is running.`;
      }

      console.error(`[WAHA] ❌ Network error for ${appointment.appointment_ref}: ${safeError}`);
      return {
        success: false,
        status: 'Failed',
        maskedPhone,
        error: safeError,
        attemptTime: new Date().toISOString()
      };
    }
  }
}

export const wahaService = new WahaService();

