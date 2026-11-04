/**
 * Standalone WAHA Client for Clinic Outreach Campaigns
 * Safely interacts with the existing WAHA Docker container / service
 * Includes auto-detection for dynamically generated WAHA keys
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const envPath = path.resolve(rootDir, '.env');

export class WahaCampaignService {
  constructor() {
    this.baseUrl = (process.env.WAHA_BASE_URL || 'http://localhost:3008').replace(/\/+$/, '');
    this.apiKey = process.env.WAHA_API_KEY || '5e71bb88e548448899dd84a3258b662b';
    this.session = process.env.WAHA_SESSION || 'default';
    this.enabled = process.env.WAHA_ENABLED !== 'false';
  }

  getHeaders(customKey = null) {
    const key = customKey !== null ? customKey : this.apiKey;
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    if (key) {
      headers['X-Api-Key'] = key;
      headers['Authorization'] = `Bearer ${key}`;
    }
    return headers;
  }

  /**
   * Persist newly detected working key to .env so future restarts preserve it
   */
  persistKeyToEnv(newKey) {
    try {
      this.apiKey = newKey;
      process.env.WAHA_API_KEY = newKey;

      if (fs.existsSync(envPath)) {
        let content = fs.readFileSync(envPath, 'utf8');
        if (content.includes('WAHA_API_KEY=')) {
          content = content.replace(/WAHA_API_KEY=.*/, `WAHA_API_KEY=${newKey}`);
        } else {
          content += `\nWAHA_API_KEY=${newKey}\n`;
        }
        fs.writeFileSync(envPath, content, 'utf8');
        console.log(`[WAHA Client] Successfully persisted detected key to .env: ${newKey.slice(0, 6)}...`);
      }
    } catch (err) {
      console.warn('[WAHA Client] Could not persist key to .env:', err.message);
    }
  }

  /**
   * Automatically detect running WAHA API key if container auto-generated a new one
   */
  async autoDetectKey() {
    const candidateKeys = new Set();
    if (this.apiKey) candidateKeys.add(this.apiKey);
    if (process.env.WAHA_API_KEY) candidateKeys.add(process.env.WAHA_API_KEY);

    // Fallbacks from existing workspace configurations
    candidateKeys.add('5e71bb88e548448899dd84a3258b662b');
    candidateKeys.add('50100d00397b43cdb9f8a61599cd2f94');
    candidateKeys.add('44b649861b85438f9c840efebddd92d1');

    // Try reading docker logs if accessible
    try {
      const logs = execSync('docker logs --tail 40 waha', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
      const matches = [...logs.matchAll(/WAHA_API_KEY=([a-f0-9]+)/g)];
      if (matches.length > 0) {
        // Most recent generated key
        const lastKey = matches[matches.length - 1][1];
        candidateKeys.add(lastKey);
      }
    } catch {}

    for (const key of candidateKeys) {
      try {
        const res = await fetch(`${this.baseUrl}/api/sessions`, {
          headers: this.getHeaders(key),
          signal: AbortSignal.timeout(1500)
        });
        if (res.ok) {
          console.log(`[WAHA Client] ✅ Validated working WAHA key: ${key.slice(0, 8)}...`);
          this.persistKeyToEnv(key);
          return key;
        }
      } catch {}
    }
    return null;
  }

  async resolveBaseUrl() {
    if (process.env.WAHA_BASE_URL) {
      return this.baseUrl;
    }
    for (const testUrl of ['http://localhost:3008', 'http://localhost:3000']) {
      try {
        const res = await fetch(`${testUrl}/api/server/version`, {
          signal: AbortSignal.timeout(1000)
        });
        if (res.ok) {
          this.baseUrl = testUrl;
          return testUrl;
        }
      } catch {}
    }
    return this.baseUrl;
  }

  /**
   * Get WAHA connection and WhatsApp session health status
   */
  async getStatus() {
    if (!this.enabled) {
      return {
        configured: false,
        status: 'DISABLED',
        label: 'WAHA Integration Disabled (WAHA_ENABLED=false)',
        connected: false,
        session: this.session,
        baseUrl: this.baseUrl,
        error: 'WAHA messaging is disabled in environment configuration.'
      };
    }

    await this.resolveBaseUrl();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      let res = await fetch(`${this.baseUrl}/api/sessions/${this.session}`, {
        headers: this.getHeaders(),
        signal: controller.signal
      }).catch(() => {
        return fetch(`${this.baseUrl}/api/sessions`, {
          headers: this.getHeaders(),
          signal: controller.signal
        });
      });

      clearTimeout(timeoutId);

      // If unauthorized, trigger automatic self-healing key detection
      if (!res.ok && (res.status === 401 || res.status === 403)) {
        console.warn(`[WAHA Client] Received ${res.status}. Attempting auto-detection of WAHA credentials...`);
        const detectedKey = await this.autoDetectKey();
        if (detectedKey) {
          res = await fetch(`${this.baseUrl}/api/sessions/${this.session}`, {
            headers: this.getHeaders(detectedKey),
            signal: AbortSignal.timeout(2000)
          });
        }
      }

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          return {
            configured: true,
            status: 'AUTH_FAILED',
            label: 'Invalid WAHA API Key',
            connected: false,
            session: this.session,
            baseUrl: this.baseUrl,
            error: 'Authentication failed. Please verify WAHA_API_KEY in .env.'
          };
        }
        if (res.status === 404) {
          // If session default is not found, attempt to auto-create and start it
          try {
            await fetch(`${this.baseUrl}/api/sessions`, {
              method: 'POST',
              headers: this.getHeaders(),
              body: JSON.stringify({ name: this.session })
            });
            await fetch(`${this.baseUrl}/api/sessions/${this.session}/start`, {
              method: 'POST',
              headers: this.getHeaders()
            });
          } catch {}

          return {
            configured: true,
            status: 'SESSION_INITIALIZING',
            label: `Initializing "${this.session}" Session`,
            connected: false,
            session: this.session,
            baseUrl: this.baseUrl,
            error: `Session "${this.session}" is being started in WAHA.`
          };
        }
        return {
          configured: true,
          status: 'HTTP_ERROR',
          label: `WAHA HTTP Error ${res.status}`,
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

      const normalizedStatus = String(sessionStatus).toUpperCase();

      if (normalizedStatus === 'WORKING') {
        return {
          configured: true,
          status: 'CONNECTED',
          label: 'WhatsApp Connected & Active',
          connected: true,
          session: this.session,
          baseUrl: this.baseUrl,
          me: data.me || null
        };
      }

      if (normalizedStatus === 'SCAN_QR_CODE') {
        return {
          configured: true,
          status: 'SCAN_QR_CODE',
          label: 'Scan QR Code to Connect WhatsApp',
          connected: false,
          qrRequired: true,
          session: this.session,
          baseUrl: this.baseUrl,
          qrUrl: `/api/waha/qr?t=${Date.now()}`,
          error: 'WhatsApp is not linked. Scan the QR code to authenticate.'
        };
      }

      if (normalizedStatus === 'STOPPED') {
        try {
          await fetch(`${this.baseUrl}/api/sessions/${this.session}/start`, {
            method: 'POST',
            headers: this.getHeaders()
          });
        } catch {}
      }

      return {
        configured: true,
        status: normalizedStatus,
        label: `Session State: ${normalizedStatus}`,
        connected: false,
        session: this.session,
        baseUrl: this.baseUrl,
        error: `WAHA session status is "${normalizedStatus}".`
      };

    } catch (err) {
      let friendlyError = err.message;
      if (err.name === 'AbortError') {
        friendlyError = `Connection timeout contacting WAHA at ${this.baseUrl} (>4s).`;
      } else if (friendlyError.includes('ECONNREFUSED') || friendlyError.includes('fetch failed')) {
        friendlyError = `Could not reach WAHA server at ${this.baseUrl}. Ensure the existing WAHA Docker container is running.`;
      }

      return {
        configured: true,
        status: 'UNAVAILABLE',
        label: 'WAHA Server Offline / Unreachable',
        connected: false,
        session: this.session,
        baseUrl: this.baseUrl,
        error: friendlyError
      };
    }
  }

  /**
   * Fetch QR code image buffer directly from WAHA
   */
  async getQrCodeBuffer() {
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
        return { success: false, status: res.status, error: `WAHA HTTP ${res.status}` };
      }

      const contentType = res.headers.get('content-type') || 'image/png';
      const arrayBuffer = await res.arrayBuffer();
      return {
        success: true,
        contentType,
        buffer: Buffer.from(arrayBuffer)
      };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  /**
   * Dispatch a single text message through WAHA
   */
  async sendTextMessage(chatId, text) {
    if (!this.enabled) {
      return {
        success: false,
        status: 'Not Configured',
        error: 'WAHA messaging is currently disabled in environment configuration.'
      };
    }

    await this.resolveBaseUrl();

    const payload = {
      session: this.session,
      chatId,
      text
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      let res = await fetch(`${this.baseUrl}/api/sendText`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      // Self-heal key if 401
      if (!res.ok && (res.status === 401 || res.status === 403)) {
        const detectedKey = await this.autoDetectKey();
        if (detectedKey) {
          res = await fetch(`${this.baseUrl}/api/sendText`, {
            method: 'POST',
            headers: this.getHeaders(detectedKey),
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(6000)
          });
        }
      }

      const responseBody = await res.json().catch(() => ({}));

      if (res.ok) {
        let messageId = `waha-${Date.now()}`;
        if (responseBody) {
          if (typeof responseBody.id === 'string') {
            messageId = responseBody.id;
          } else if (responseBody.id && typeof responseBody.id === 'object') {
            messageId = responseBody.id._serialized || responseBody.id.id || JSON.stringify(responseBody.id);
          } else if (responseBody.messageId) {
            messageId = typeof responseBody.messageId === 'object'
              ? (responseBody.messageId._serialized || responseBody.messageId.id)
              : String(responseBody.messageId);
          }
        }

        return {
          success: true,
          status: 'Sent to WAHA',
          messageId: String(messageId),
          rawResponse: responseBody,
          attemptTime: new Date().toISOString()
        };
      }

      let rateLimited = false;
      let errorMsg = `HTTP ${res.status}: Failed to send message`;

      if (res.status === 429) {
        rateLimited = true;
        errorMsg = 'Rate limit encountered from WhatsApp/WAHA. Sending queue has been paused.';
      } else if (res.status === 401 || res.status === 403) {
        errorMsg = 'WAHA unauthorized. Verify WAHA_API_KEY in outreach campaign configuration.';
      } else if (res.status === 422) {
        errorMsg = 'WAHA rejected payload. WhatsApp session may not be paired (SCAN_QR_CODE) or phone number is invalid.';
      } else if (responseBody && responseBody.message) {
        errorMsg = responseBody.message;
      }

      return {
        success: false,
        status: 'Failed',
        rateLimited,
        httpStatus: res.status,
        error: errorMsg,
        rawResponse: responseBody,
        attemptTime: new Date().toISOString()
      };

    } catch (err) {
      let safeError = err.message;
      if (err.name === 'AbortError') {
        safeError = 'WAHA request timed out after 8 seconds.';
      } else if (safeError.includes('ECONNREFUSED') || safeError.includes('fetch failed')) {
        safeError = `WAHA container unreachable at ${this.baseUrl}.`;
      }

      return {
        success: false,
        status: 'Failed',
        error: safeError,
        rawResponse: { error: safeError },
        attemptTime: new Date().toISOString()
      };
    }
  }
}

export const wahaCampaignService = new WahaCampaignService();
