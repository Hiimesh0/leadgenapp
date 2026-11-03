import {
  Appointment,
  AppointmentHistory,
  AppointmentStatus,
  DashboardStats,
  DoctorUser,
  PatientEnquiry,
  WahaStatus
} from '../types';

const API_BASE = ((import.meta as any).env?.VITE_API_URL as string) || 'http://localhost:5000/api';

// Keys for local persistence fallback
const STORAGE_KEYS = {
  TOKEN: 'xyz_dental_doctor_token',
  USER: 'xyz_dental_doctor_user',
  APPOINTMENTS: 'xyz_dental_appointments_v1',
  HISTORY: 'xyz_dental_history_v1',
  ENQUIRIES: 'xyz_dental_enquiries_v1'
};

// Seed initial realistic demo records in local storage if empty
function initializeLocalFallback() {
  if (typeof window === 'undefined') return;

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const dayAfter = new Date(Date.now() + 172800000).toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const pastWeek = new Date(Date.now() - 604800000).toISOString().split('T')[0];

  if (!localStorage.getItem(STORAGE_KEYS.APPOINTMENTS)) {
    const demoAppointments: Appointment[] = [
      {
        id: 'apt-001',
        appointmentRef: 'APT-2026-001',
        patientName: 'Aarav Patel (Demo Patient)',
        phone: '9825123456',
        email: 'aarav.demo@example.com',
        serviceId: 'cosmetic-dentistry',
        serviceName: 'Cosmetic Smile Design & Veneers (XYZ)',
        doctorName: 'Dr. XYZ',
        preferredDate: today,
        preferredTime: '10:30 AM',
        notes: 'Interested in digital smile makeover preview and veneers consultation.',
        status: 'Confirmed',
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 'apt-002',
        appointmentRef: 'APT-2026-002',
        patientName: 'Meera Shah (Demo Patient)',
        phone: '9924567890',
        email: 'meera.demo@example.com',
        serviceId: 'root-canal',
        serviceName: 'Gentle Micro-Endodontics (Root Canal - XYZ)',
        doctorName: 'Dr. XYZ',
        preferredDate: today,
        preferredTime: '02:00 PM',
        notes: 'Mild sensitivity in upper right molar. Prefers single-sitting if possible.',
        status: 'Pending',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        updatedAt: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: 'apt-003',
        appointmentRef: 'APT-2026-003',
        patientName: 'Rajesh Desai (Demo Patient)',
        phone: '9712345678',
        email: 'rajesh.demo@example.com',
        serviceId: 'dental-implants',
        serviceName: 'Permanent Dental Implants (XYZ)',
        doctorName: 'Dr. XYZ',
        preferredDate: tomorrow,
        preferredTime: '11:00 AM',
        notes: 'Needs 3D CBCT bone scan evaluation for lower missing tooth.',
        status: 'Confirmed',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 43200000).toISOString()
      },
      {
        id: 'apt-004',
        appointmentRef: 'APT-2026-004',
        patientName: 'Priyanka Mehta (Demo Patient)',
        phone: '9898012345',
        email: 'priyanka.demo@example.com',
        serviceId: 'orthodontics-aligners',
        serviceName: 'Clear Aligners & Orthodontics (XYZ)',
        doctorName: 'Dr. XYZ',
        preferredDate: dayAfter,
        preferredTime: '04:30 PM',
        notes: 'Consultation for invisible clear aligners instead of metal braces.',
        status: 'Pending',
        createdAt: new Date(Date.now() - 14400000).toISOString(),
        updatedAt: new Date(Date.now() - 14400000).toISOString()
      },
      {
        id: 'apt-005',
        appointmentRef: 'APT-2026-005',
        patientName: 'Ketan Vora (Demo Patient)',
        phone: '9879112233',
        email: 'ketan.demo@example.com',
        serviceId: 'preventive-care',
        serviceName: 'Preventive Hygiene & Guided Biofilm Therapy (XYZ)',
        doctorName: 'Dr. XYZ',
        preferredDate: yesterday,
        preferredTime: '09:30 AM',
        notes: 'Routine 6-monthly cleaning and dental hygiene checkup.',
        status: 'Completed',
        createdAt: pastWeek,
        updatedAt: yesterday
      },
      {
        id: 'apt-006',
        appointmentRef: 'APT-2026-006',
        patientName: 'Bhavik Jariwala (Demo Patient)',
        phone: '9723001122',
        email: 'bhavik.demo@example.com',
        serviceId: 'teeth-whitening',
        serviceName: 'Laser Teeth Whitening (XYZ)',
        doctorName: 'Dr. XYZ',
        preferredDate: yesterday,
        preferredTime: '05:00 PM',
        notes: 'Pre-wedding teeth whitening consultation.',
        status: 'Cancelled',
        createdAt: pastWeek,
        updatedAt: yesterday
      },
      {
        id: 'apt-007',
        appointmentRef: 'APT-2026-007',
        patientName: 'Sneha Choksi (Demo Patient)',
        phone: '9824445566',
        email: 'sneha.demo@example.com',
        serviceId: 'restorative-crowns',
        serviceName: 'Metal-Free Zirconia Crowns & Inlays (XYZ)',
        doctorName: 'Dr. XYZ',
        preferredDate: dayAfter,
        preferredTime: '03:00 PM',
        notes: 'Rescheduled from last week due to patient travel.',
        status: 'Rescheduled',
        createdAt: pastWeek,
        updatedAt: new Date().toISOString()
      }
    ];

    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(demoAppointments));

    const initialHistory: AppointmentHistory[] = [
      {
        id: 'hist-001-init',
        appointmentRef: 'APT-2026-001',
        previousStatus: '',
        newStatus: 'Pending',
        changedBy: 'Patient (Online Website)',
        changedAt: new Date(Date.now() - 172800000).toISOString(),
        note: 'Appointment request submitted via website booking form.'
      },
      {
        id: 'hist-001-conf',
        appointmentRef: 'APT-2026-001',
        previousStatus: 'Pending',
        newStatus: 'Confirmed',
        changedBy: 'Dr. XYZ',
        changedAt: new Date(Date.now() - 86400000).toISOString(),
        note: 'Patient contacted and slot confirmed for smile makeover.'
      },
      {
        id: 'hist-002-init',
        appointmentRef: 'APT-2026-002',
        previousStatus: '',
        newStatus: 'Pending',
        changedBy: 'Patient (Online Website)',
        changedAt: new Date(Date.now() - 3600000).toISOString(),
        note: 'Appointment request submitted via website booking form.'
      }
    ];
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(initialHistory));
  }

  if (!localStorage.getItem(STORAGE_KEYS.ENQUIRIES)) {
    const demoEnquiries: PatientEnquiry[] = [
      {
        id: 'enq-001',
        name: 'Hitesh Contractor (Demo)',
        phone: '9825099887',
        email: 'hitesh.demo@example.com',
        subject: 'Cosmetic / Veneers',
        message: 'Hello Dr. XYZ, I would like to know if trial smile previews are done on the same day for porcelain veneers?',
        status: 'Unread',
        createdAt: new Date(Date.now() - 7200000).toISOString()
      },
      {
        id: 'enq-002',
        name: 'Radhika Dalal (Demo)',
        phone: '9978112233',
        email: 'radhika.demo@example.com',
        subject: 'Dental Implants',
        message: 'Does your clinic have computer-guided 3D flapless implant surgery available for senior citizens?',
        status: 'Reviewed',
        createdAt: new Date(Date.now() - 86400000).toISOString()
      }
    ];
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(demoEnquiries));
  }
}

initializeLocalFallback();

// Helper to get auth token
function getAuthToken(): string | null {
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
}

function maskPhone(phone: string): string {
  if (!phone) return '';
  const digits = phone.replace(/\D/g, '');
  if (digits.length >= 10) {
    const last2 = digits.slice(-2);
    const first5 = digits.length === 10 ? digits.slice(0, 5) : digits.slice(digits.length - 10, digits.length - 5);
    return `+91 ${first5} ****${last2}`;
  }
  return phone;
}

// Map snake_case server row to camelCase frontend interface
function mapServerAppointment(row: Record<string, any>): Appointment {
  return {
    id: row.id,
    appointmentRef: row.appointment_ref || row.appointmentRef,
    patientName: row.patient_name || row.patientName,
    phone: row.phone,
    email: row.email || '',
    serviceId: row.service_id || row.serviceId,
    serviceName: row.service_name || row.serviceName,
    doctorName: row.doctor_name || row.doctorName,
    preferredDate: row.preferred_date || row.preferredDate,
    preferredTime: row.preferred_time || row.preferredTime,
    notes: row.notes || '',
    status: row.status as AppointmentStatus,
    createdAt: row.created_at || row.createdAt,
    updatedAt: row.updated_at || row.updatedAt,
    notificationChannel: row.notification_channel || row.notificationChannel || 'whatsapp',
    notificationStatus: (row.notification_status || row.notificationStatus || 'Not Configured') as any,
    notificationMessageId: row.notification_message_id || row.notificationMessageId || null,
    notificationLastAttempt: row.notification_last_attempt || row.notificationLastAttempt || null,
    notificationError: row.notification_error || row.notificationError || null,
    notificationMaskedPhone: row.notification_masked_phone || row.notificationMaskedPhone || maskPhone(row.phone || '')
  };
}

export const clinicApi = {
  // 1. Doctor Login
  async login(email: string, password: string):Promise<{ success: boolean; token: string; doctor: DoctorUser }> {
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.doctor));
        return data;
      }
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || 'Invalid credentials');
    } catch (networkOrServerError: any) {
      // Local fallback for offline / GitHub Pages demo
      const validEmails = ['kanthariyahimesh@gmail.com', 'doctor@xyzdental.com', 'doctor@demo.com'];
      if (validEmails.includes(email.trim().toLowerCase()) && password === 'DoctorXYZ@2026') {
        const dummyToken = `demo-token-${Date.now()}`;
        const doctor: DoctorUser = {
          id: 'doc-001',
          name: 'Dr. XYZ',
          email: email.trim().toLowerCase(),
          role: 'Chief Dental Specialist'
        };
        localStorage.setItem(STORAGE_KEYS.TOKEN, dummyToken);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(doctor));
        return { success: true, token: dummyToken, doctor };
      }
      throw new Error(networkOrServerError.message || 'Login failed. Please verify demo credentials.');
    }
  },

  logout() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  getCurrentDoctor(): DoctorUser | null {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  // 2. Dashboard Statistics
  async getStats(): Promise<DashboardStats> {
    try {
      const token = getAuthToken();
      const res = await fetch(`${API_BASE}/appointments/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        return {
          total: data.stats.total,
          today: data.stats.today,
          pending: data.stats.pending,
          confirmed: data.stats.confirmed,
          completed: data.stats.completed,
          cancelled: data.stats.cancelled,
          rescheduled: data.stats.rescheduled,
          enquiriesTotal: 2,
          enquiriesUnread: data.stats.unreadEnquiries || 0
        };
      }
    } catch {
      // Fallback to local storage computation
    }

    const appointments: Appointment[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPOINTMENTS) || '[]');
    const enquiries: PatientEnquiry[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.ENQUIRIES) || '[]');
    const today = new Date().toISOString().split('T')[0];

    return {
      total: appointments.length,
      today: appointments.filter(a => a.preferredDate === today).length,
      pending: appointments.filter(a => a.status === 'Pending').length,
      confirmed: appointments.filter(a => a.status === 'Confirmed').length,
      completed: appointments.filter(a => a.status === 'Completed').length,
      cancelled: appointments.filter(a => a.status === 'Cancelled').length,
      rescheduled: appointments.filter(a => a.status === 'Rescheduled').length,
      enquiriesTotal: enquiries.length,
      enquiriesUnread: enquiries.filter(e => e.status === 'Unread').length
    };
  },

  // 3. Appointments List with Filters
  async getAppointments(filters?: { status?: string; search?: string; service?: string; date?: string }): Promise<Appointment[]> {
    try {
      const token = getAuthToken();
      const params = new URLSearchParams();
      if (filters?.status && filters.status !== 'all') params.append('status', filters.status);
      if (filters?.search) params.append('search', filters.search);
      if (filters?.service && filters.service !== 'all') params.append('service', filters.service);
      if (filters?.date) params.append('date', filters.date);

      const res = await fetch(`${API_BASE}/appointments?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        return data.appointments.map(mapServerAppointment);
      }
    } catch {
      // Local fallback
    }

    let list: Appointment[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPOINTMENTS) || '[]');

    if (filters?.status && filters.status !== 'all') {
      list = list.filter(a => a.status.toLowerCase() === filters.status?.toLowerCase());
    }
    if (filters?.service && filters.service !== 'all') {
      list = list.filter(a => a.serviceId === filters.service);
    }
    if (filters?.date) {
      list = list.filter(a => a.preferredDate === filters.date);
    }
    if (filters?.search && filters.search.trim()) {
      const term = filters.search.toLowerCase().trim();
      list = list.filter(
        a =>
          a.patientName.toLowerCase().includes(term) ||
          a.appointmentRef.toLowerCase().includes(term) ||
          a.phone.includes(term) ||
          (a.email && a.email.toLowerCase().includes(term))
      );
    }

    return list.sort((a, b) => (a.preferredDate < b.preferredDate ? 1 : -1));
  },

  // 4. Single Appointment Details + History
  async getAppointmentWithHistory(id: string): Promise<{ appointment: Appointment; history: AppointmentHistory[] }> {
    try {
      const token = getAuthToken();
      const res = await fetch(`${API_BASE}/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        return {
          appointment: mapServerAppointment(data.appointment),
          history: data.history.map((h: any) => ({
            id: h.id,
            appointmentRef: h.appointment_ref || h.appointmentRef,
            previousStatus: h.previous_status || h.previousStatus || '',
            newStatus: h.new_status || h.newStatus,
            changedBy: h.changed_by || h.changedBy,
            changedAt: h.changed_at || h.changedAt,
            note: h.note || ''
          }))
        };
      }
    } catch {
      // Fallback
    }

    const list: Appointment[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPOINTMENTS) || '[]');
    const apt = list.find(a => a.id === id || a.appointmentRef === id);
    if (!apt) throw new Error('Appointment not found');

    const allHistory: AppointmentHistory[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORY) || '[]');
    const history = allHistory.filter(h => h.appointmentRef === apt.appointmentRef);

    return { appointment: apt, history };
  },

  // 5. Update Status
  async updateStatus(id: string, newStatus: AppointmentStatus, note?: string): Promise<Appointment> {
    try {
      const token = getAuthToken();
      const res = await fetch(`${API_BASE}/appointments/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus, note })
      });
      if (res.ok) {
        const data = await res.json();
        return mapServerAppointment(data.appointment);
      }
    } catch {
      // Local fallback
    }

    const list: Appointment[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPOINTMENTS) || '[]');
    const index = list.findIndex(a => a.id === id || a.appointmentRef === id);
    if (index === -1) throw new Error('Appointment record not found');

    const previousStatus = list[index].status;
    const now = new Date().toISOString();
    list[index].status = newStatus;
    list[index].updatedAt = now;
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(list));

    // Append history
    const allHistory: AppointmentHistory[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORY) || '[]');
    allHistory.unshift({
      id: `hist-${Date.now()}`,
      appointmentRef: list[index].appointmentRef,
      previousStatus,
      newStatus,
      changedBy: 'Dr. XYZ',
      changedAt: now,
      note: note || `Status transitioned from ${previousStatus} to ${newStatus}`
    });
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(allHistory));

    return list[index];
  },

  // 6. Reschedule Appointment
  async reschedule(id: string, newDate: string, newTime: string, note?: string): Promise<Appointment> {
    try {
      const token = getAuthToken();
      const res = await fetch(`${API_BASE}/appointments/${id}/reschedule`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ preferred_date: newDate, preferred_time: newTime, note })
      });
      if (res.ok) {
        const data = await res.json();
        return mapServerAppointment(data.appointment);
      }
    } catch {
      // Local fallback
    }

    const list: Appointment[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPOINTMENTS) || '[]');
    const index = list.findIndex(a => a.id === id || a.appointmentRef === id);
    if (index === -1) throw new Error('Appointment not found');

    const prevDate = list[index].preferredDate;
    const prevTime = list[index].preferredTime;
    const now = new Date().toISOString();

    list[index].preferredDate = newDate;
    list[index].preferredTime = newTime;
    list[index].status = 'Rescheduled';
    list[index].updatedAt = now;
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(list));

    const allHistory: AppointmentHistory[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORY) || '[]');
    allHistory.unshift({
      id: `hist-${Date.now()}`,
      appointmentRef: list[index].appointmentRef,
      previousStatus: 'Confirmed',
      newStatus: 'Rescheduled',
      changedBy: 'Dr. XYZ',
      changedAt: now,
      note: note || `Rescheduled from ${prevDate} ${prevTime} to ${newDate} ${newTime}`
    });
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(allHistory));

    return list[index];
  },

  // 7. Public Patient Submissions (Always saves!)
  async createPublicAppointment(data: {
    patient_name: string;
    phone: string;
    email?: string;
    service_id: string;
    service_name: string;
    doctor_name?: string;
    preferred_date: string;
    preferred_time: string;
    notes?: string;
  }): Promise<{ success: boolean; appointment: Appointment }> {
    try {
      const res = await fetch(`${API_BASE}/public/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        const json = await res.json();
        const created = mapServerAppointment(json.appointment);
        // Also sync to local storage cache
        const localList: Appointment[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPOINTMENTS) || '[]');
        localList.unshift(created);
        localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(localList));
        return { success: true, appointment: created };
      }
    } catch {
      // Local fallback
    }

    const now = new Date().toISOString();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const appointmentRef = `APT-2026-${randomCode}`;
    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      appointmentRef,
      patientName: data.patient_name,
      phone: data.phone,
      email: data.email || '',
      serviceId: data.service_id,
      serviceName: data.service_name,
      doctorName: data.doctor_name || 'Dr. XYZ',
      preferredDate: data.preferred_date,
      preferredTime: data.preferred_time,
      notes: data.notes || '',
      status: 'Pending',
      createdAt: now,
      updatedAt: now
    };

    const list: Appointment[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPOINTMENTS) || '[]');
    list.unshift(newAppointment);
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(list));

    const history: AppointmentHistory[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORY) || '[]');
    history.unshift({
      id: `hist-${Date.now()}`,
      appointmentRef,
      previousStatus: '',
      newStatus: 'Pending',
      changedBy: 'Patient (Online Website)',
      changedAt: now,
      note: 'Appointment request submitted via public website form.'
    });
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));

    return { success: true, appointment: newAppointment };
  },

  // 8. Public Contact Enquiry Submission
  async createPublicEnquiry(data: { name: string; phone: string; email?: string; subject: string; message: string }) {
    try {
      const res = await fetch(`${API_BASE}/public/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) return { success: true };
    } catch {
      // Local fallback
    }

    const enquiries: PatientEnquiry[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.ENQUIRIES) || '[]');
    enquiries.unshift({
      id: `enq-${Date.now()}`,
      name: data.name,
      phone: data.phone,
      email: data.email || '',
      subject: data.subject || 'General Enquiry',
      message: data.message,
      status: 'Unread',
      createdAt: new Date().toISOString()
    });
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));

    return { success: true };
  },

  // 9. Get Enquiries (Doctor)
  async getEnquiries(): Promise<PatientEnquiry[]> {
    try {
      const token = getAuthToken();
      const res = await fetch(`${API_BASE}/enquiries`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        return data.enquiries;
      }
    } catch {
      // Local fallback
    }
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ENQUIRIES) || '[]');
  },

  // 10. Update Enquiry Status
  async updateEnquiryStatus(id: string, status: 'Unread' | 'Reviewed' | 'Replied') {
    try {
      const token = getAuthToken();
      await fetch(`${API_BASE}/enquiries/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
    } catch {
      // Local fallback
    }
    const enquiries: PatientEnquiry[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.ENQUIRIES) || '[]');
    const item = enquiries.find(e => e.id === id);
    if (item) {
      item.status = status;
      localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
    }
  },

  // 11. Retry WhatsApp Appointment Notification
  async retryNotification(id: string): Promise<{ success: boolean; message: string; appointment?: Appointment }> {
    try {
      const token = getAuthToken();
      const res = await fetch(`${API_BASE}/appointments/${id}/retry-notification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok && data.appointment) {
        return {
          success: data.success,
          message: data.message,
          appointment: mapServerAppointment(data.appointment)
        };
      }
      return { success: false, message: data.message || 'Notification retry failed' };
    } catch (err: any) {
      // Local fallback simulation if server is offline
      const appointments: Appointment[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPOINTMENTS) || '[]');
      const apt = appointments.find(a => a.id === id);
      if (apt) {
        apt.notificationStatus = 'Sent to WAHA';
        apt.notificationLastAttempt = new Date().toISOString();
        apt.notificationError = null;
        localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
        return {
          success: true,
          message: 'WhatsApp notification queued (local offline mode)',
          appointment: apt
        };
      }
      return { success: false, message: err?.message || 'Server connection failed' };
    }
  },

  // 12. Get WAHA WhatsApp API Status
  async getWahaStatus(): Promise<WahaStatus> {
    try {
      const token = getAuthToken();
      const res = await fetch(`${API_BASE}/doctor/waha/status`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Server offline or not running
    }
    return {
      configured: false,
      status: 'UNAVAILABLE',
      label: 'Backend Offline / WAHA Service Unavailable',
      connected: false,
      session: 'default',
      baseUrl: 'http://localhost:3000',
      error: 'Cannot connect to backend or WAHA WhatsApp service daemon'
    };
  },

  // 13. Get WAHA QR Code
  async getWahaQr(): Promise<{ ok: boolean; qr?: string; error?: string }> {
    try {
      const token = getAuthToken();
      const res = await fetch(`${API_BASE}/doctor/waha/qr`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return await res.json();
    } catch (err: any) {
      return { ok: false, error: err?.message || 'Failed to fetch QR code from backend' };
    }
  },

  // 14. Restart WAHA Session
  async restartWahaSession(): Promise<{ ok: boolean; message?: string }> {
    try {
      const token = getAuthToken();
      const res = await fetch(`${API_BASE}/doctor/waha/restart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      return await res.json();
    } catch (err: any) {
      return { ok: false, message: err?.message || 'Failed to restart WAHA session' };
    }
  }
};
