import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_FILE = path.join(__dirname, 'clinic_db.json');

// Interface representation:
// {
//   doctors: [],
//   appointments: [],
//   appointment_history: [],
//   enquiries: []
// }

function getInitialData() {
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync('DoctorXYZ@2026', salt);
  const now = new Date().toISOString();
  const today = now.split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const dayAfter = new Date(Date.now() + 172800000).toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const pastWeek = new Date(Date.now() - 604800000).toISOString().split('T')[0];

  const doctors = [
    {
      id: 'doc-001',
      name: 'Dr. XYZ',
      email: 'kanthariyahimesh@gmail.com',
      password_hash: passwordHash,
      role: 'Chief Dental Specialist',
      created_at: now
    },
    {
      id: 'doc-002',
      name: 'Dr. XYZ',
      email: 'doctor@xyzdental.com',
      password_hash: passwordHash,
      role: 'Chief Dental Specialist',
      created_at: now
    }
  ];

  const appointments = [
    {
      id: 'apt-001',
      appointment_ref: 'APT-2026-001',
      patient_name: 'Aarav Patel (Demo Patient)',
      phone: '9825123456',
      email: 'aarav.demo@example.com',
      service_id: 'cosmetic-dentistry',
      service_name: 'Cosmetic Smile Design & Veneers (XYZ)',
      doctor_name: 'Dr. XYZ',
      preferred_date: today,
      preferred_time: '10:30 AM',
      notes: 'Interested in digital smile makeover preview and veneers consultation.',
      status: 'Confirmed',
      created_at: new Date(Date.now() - 172800000).toISOString(),
      updated_at: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: 'apt-002',
      appointment_ref: 'APT-2026-002',
      patient_name: 'Meera Shah (Demo Patient)',
      phone: '9924567890',
      email: 'meera.demo@example.com',
      service_id: 'root-canal',
      service_name: 'Gentle Micro-Endodontics (Root Canal - XYZ)',
      doctor_name: 'Dr. XYZ',
      preferred_date: today,
      preferred_time: '02:00 PM',
      notes: 'Mild sensitivity in upper right molar. Prefers single-sitting if possible.',
      status: 'Pending',
      created_at: new Date(Date.now() - 3600000).toISOString(),
      updated_at: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 'apt-003',
      appointment_ref: 'APT-2026-003',
      patient_name: 'Rajesh Desai (Demo Patient)',
      phone: '9712345678',
      email: 'rajesh.demo@example.com',
      service_id: 'dental-implants',
      service_name: 'Permanent Dental Implants (XYZ)',
      doctor_name: 'Dr. XYZ',
      preferred_date: tomorrow,
      preferred_time: '11:00 AM',
      notes: 'Needs 3D CBCT bone scan evaluation for lower missing tooth.',
      status: 'Confirmed',
      created_at: new Date(Date.now() - 86400000).toISOString(),
      updated_at: new Date(Date.now() - 43200000).toISOString()
    },
    {
      id: 'apt-004',
      appointment_ref: 'APT-2026-004',
      patient_name: 'Priyanka Mehta (Demo Patient)',
      phone: '9898012345',
      email: 'priyanka.demo@example.com',
      service_id: 'orthodontics-aligners',
      service_name: 'Clear Aligners & Orthodontics (XYZ)',
      doctor_name: 'Dr. XYZ',
      preferred_date: dayAfter,
      preferred_time: '04:30 PM',
      notes: 'Consultation for invisible clear aligners instead of metal braces.',
      status: 'Pending',
      created_at: new Date(Date.now() - 14400000).toISOString(),
      updated_at: new Date(Date.now() - 14400000).toISOString()
    },
    {
      id: 'apt-005',
      appointment_ref: 'APT-2026-005',
      patient_name: 'Ketan Vora (Demo Patient)',
      phone: '9879112233',
      email: 'ketan.demo@example.com',
      service_id: 'preventive-care',
      service_name: 'Preventive Hygiene & Guided Biofilm Therapy (XYZ)',
      doctor_name: 'Dr. XYZ',
      preferred_date: yesterday,
      preferred_time: '09:30 AM',
      notes: 'Routine 6-monthly cleaning and dental hygiene checkup.',
      status: 'Completed',
      created_at: pastWeek,
      updated_at: yesterday
    },
    {
      id: 'apt-006',
      appointment_ref: 'APT-2026-006',
      patient_name: 'Bhavik Jariwala (Demo Patient)',
      phone: '9723001122',
      email: 'bhavik.demo@example.com',
      service_id: 'teeth-whitening',
      service_name: 'Laser Teeth Whitening (XYZ)',
      doctor_name: 'Dr. XYZ',
      preferred_date: yesterday,
      preferred_time: '05:00 PM',
      notes: 'Pre-wedding teeth whitening consultation.',
      status: 'Cancelled',
      created_at: pastWeek,
      updated_at: yesterday
    },
    {
      id: 'apt-007',
      appointment_ref: 'APT-2026-007',
      patient_name: 'Sneha Choksi (Demo Patient)',
      phone: '9824445566',
      email: 'sneha.demo@example.com',
      service_id: 'restorative-crowns',
      service_name: 'Metal-Free Zirconia Crowns & Inlays (XYZ)',
      doctor_name: 'Dr. XYZ',
      preferred_date: dayAfter,
      preferred_time: '03:00 PM',
      notes: 'Rescheduled from last week due to patient travel.',
      status: 'Rescheduled',
      created_at: pastWeek,
      updated_at: now
    }
  ];

  const appointment_history = [
    {
      id: 'hist-apt-001-init',
      appointment_ref: 'APT-2026-001',
      previous_status: null,
      new_status: 'Pending',
      changed_by: 'Patient (Online Website)',
      changed_at: new Date(Date.now() - 172800000).toISOString(),
      note: 'Appointment request submitted via website booking form.'
    },
    {
      id: 'hist-apt-001-conf',
      appointment_ref: 'APT-2026-001',
      previous_status: 'Pending',
      new_status: 'Confirmed',
      changed_by: 'Dr. XYZ',
      changed_at: new Date(Date.now() - 86400000).toISOString(),
      note: 'Status transitioned to Confirmed after clinic slot confirmation.'
    },
    {
      id: 'hist-apt-002-init',
      appointment_ref: 'APT-2026-002',
      previous_status: null,
      new_status: 'Pending',
      changed_by: 'Patient (Online Website)',
      changed_at: new Date(Date.now() - 3600000).toISOString(),
      note: 'Appointment request submitted via website booking form.'
    },
    {
      id: 'hist-apt-003-init',
      appointment_ref: 'APT-2026-003',
      previous_status: null,
      new_status: 'Pending',
      changed_by: 'Patient (Online Website)',
      changed_at: new Date(Date.now() - 86400000).toISOString(),
      note: 'Appointment request submitted via website booking form.'
    },
    {
      id: 'hist-apt-003-conf',
      appointment_ref: 'APT-2026-003',
      previous_status: 'Pending',
      new_status: 'Confirmed',
      changed_by: 'Dr. XYZ',
      changed_at: new Date(Date.now() - 43200000).toISOString(),
      note: 'Status transitioned to Confirmed during clinic schedule review.'
    }
  ];

  const enquiries = [
    {
      id: 'enq-001',
      name: 'Hitesh Contractor (Demo)',
      phone: '9825099887',
      email: 'hitesh.demo@example.com',
      subject: 'Cosmetic / Veneers',
      message: 'Hello Dr. XYZ, I would like to know if trial smile previews are done on the same day for porcelain veneers?',
      status: 'Unread',
      created_at: new Date(Date.now() - 7200000).toISOString()
    },
    {
      id: 'enq-002',
      name: 'Radhika Dalal (Demo)',
      phone: '9978112233',
      email: 'radhika.demo@example.com',
      subject: 'Dental Implants',
      message: 'Does your clinic have computer-guided 3D flapless implant surgery available for senior citizens?',
      status: 'Reviewed',
      created_at: new Date(Date.now() - 86400000).toISOString()
    }
  ];

  return { doctors, appointments, appointment_history, enquiries };
}

// Read database from clinic_db.json
export function readDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initial = getInitialData();
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const content = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error('Error reading JSON DB, reinitializing:', err);
    const initial = getInitialData();
    fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf-8');
    return initial;
  }
}

// Write database to clinic_db.json safely
export function writeDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing to JSON DB:', err);
    return false;
  }
}

// Initialize database
export function initDb() {
  const data = readDb();
  console.log(`✅ JSON Database loaded: ${DB_FILE}`);
  console.log(`   - Doctors: ${data.doctors.length}`);
  console.log(`   - Appointments: ${data.appointments.length}`);
  console.log(`   - History logs: ${data.appointment_history.length}`);
  console.log(`   - Enquiries: ${data.enquiries.length}`);
  console.log('   Doctor Demo Login: kanthariyahimesh@gmail.com / DoctorXYZ@2026');
  return data;
}

// Helper query methods
export const dbOps = {
  findDoctorByEmail(email) {
    const data = readDb();
    const clean = email.trim().toLowerCase();
    return data.doctors.find(d => d.email.toLowerCase() === clean) || null;
  },

  findDoctorById(id) {
    const data = readDb();
    return data.doctors.find(d => d.id === id) || null;
  },

  getAppointments(filters = {}) {
    const data = readDb();
    let list = [...data.appointments];

    if (filters.status && filters.status !== 'all') {
      list = list.filter(a => a.status.toLowerCase() === filters.status.toLowerCase());
    }

    if (filters.service && filters.service !== 'all') {
      list = list.filter(a => a.service_id === filters.service);
    }

    if (filters.date) {
      list = list.filter(a => a.preferred_date === filters.date);
    }

    if (filters.search && filters.search.trim()) {
      const term = filters.search.toLowerCase().trim();
      list = list.filter(
        a =>
          a.patient_name.toLowerCase().includes(term) ||
          a.appointment_ref.toLowerCase().includes(term) ||
          a.phone.includes(term) ||
          (a.email && a.email.toLowerCase().includes(term))
      );
    }

    // Sort newest date first
    return list.sort((a, b) => (a.preferred_date < b.preferred_date ? 1 : -1));
  },

  findAppointment(idOrRef) {
    const data = readDb();
    return data.appointments.find(a => a.id === idOrRef || a.appointment_ref === idOrRef) || null;
  },

  getAppointmentHistory(appointmentRef) {
    const data = readDb();
    return data.appointment_history
      .filter(h => h.appointment_ref === appointmentRef)
      .sort((a, b) => (a.changed_at < b.changed_at ? 1 : -1));
  },

  addAppointment(appointmentData, historyNote = 'Appointment request submitted via website booking form.') {
    const data = readDb();

    // Duplicate submission prevention: check for identical phone, date, time within 5 minutes
    const cleanPhone = (appointmentData.phone || '').replace(/\D/g, '').slice(-10);
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    const existing = data.appointments.find(a => 
      (a.phone || '').replace(/\D/g, '').slice(-10) === cleanPhone &&
      a.preferred_date === appointmentData.preferred_date &&
      a.preferred_time === appointmentData.preferred_time &&
      new Date(a.created_at).getTime() > fiveMinutesAgo
    );

    if (existing) {
      console.log(`[DB] Idempotency triggered: Returning existing appointment ${existing.appointment_ref} to prevent duplicate.`);
      return { appointment: existing, isDuplicate: true };
    }

    data.appointments.unshift(appointmentData);

    const historyEntry = {
      id: `hist-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      appointment_ref: appointmentData.appointment_ref,
      previous_status: null,
      new_status: appointmentData.status || 'Pending',
      changed_by: 'Patient (Online Website)',
      changed_at: appointmentData.created_at || new Date().toISOString(),
      note: historyNote
    };
    data.appointment_history.unshift(historyEntry);

    writeDb(data);
    return { appointment: appointmentData, isDuplicate: false };
  },

  updateAppointmentNotification(idOrRef, notificationResult) {
    const data = readDb();
    const aptIndex = data.appointments.findIndex(a => a.id === idOrRef || a.appointment_ref === idOrRef);
    if (aptIndex === -1) return null;

    const apt = data.appointments[aptIndex];
    apt.notification_channel = 'whatsapp';
    apt.notification_status = notificationResult.status;
    apt.notification_message_id = notificationResult.messageId || apt.notification_message_id || null;
    apt.notification_last_attempt = notificationResult.attemptTime || new Date().toISOString();
    apt.notification_error = notificationResult.error || null;
    apt.notification_masked_phone = notificationResult.maskedPhone || apt.notification_masked_phone || null;

    // Log to appointment audit history
    data.appointment_history.unshift({
      id: `hist-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      appointment_ref: apt.appointment_ref,
      previous_status: apt.status,
      new_status: apt.status,
      changed_by: 'WAHA WhatsApp Service',
      changed_at: new Date().toISOString(),
      note: notificationResult.success
        ? `WhatsApp confirmation message delivered to provider. (WAHA ID: ${notificationResult.messageId || 'N/A'})`
        : `WhatsApp confirmation attempt result: ${notificationResult.status}. ${notificationResult.error || ''}`
    });

    writeDb(data);
    return apt;
  },

  updateAppointmentStatus(idOrRef, newStatus, changedBy = 'Dr. XYZ', note = '') {
    const data = readDb();
    const aptIndex = data.appointments.findIndex(a => a.id === idOrRef || a.appointment_ref === idOrRef);
    if (aptIndex === -1) return null;

    const apt = data.appointments[aptIndex];
    const previousStatus = apt.status;
    const now = new Date().toISOString();

    apt.status = newStatus;
    apt.updated_at = now;

    data.appointment_history.unshift({
      id: `hist-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      appointment_ref: apt.appointment_ref,
      previous_status: previousStatus,
      new_status: newStatus,
      changed_by: changedBy,
      changed_at: now,
      note: note || `Status transitioned from ${previousStatus} to ${newStatus}`
    });

    writeDb(data);
    return apt;
  },

  rescheduleAppointment(idOrRef, newDate, newTime, changedBy = 'Dr. XYZ', note = '') {
    const data = readDb();
    const aptIndex = data.appointments.findIndex(a => a.id === idOrRef || a.appointment_ref === idOrRef);
    if (aptIndex === -1) return null;

    const apt = data.appointments[aptIndex];
    const prevDate = apt.preferred_date;
    const prevTime = apt.preferred_time;
    const prevStatus = apt.status;
    const now = new Date().toISOString();

    apt.preferred_date = newDate;
    apt.preferred_time = newTime;
    apt.status = 'Rescheduled';
    apt.updated_at = now;

    data.appointment_history.unshift({
      id: `hist-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      appointment_ref: apt.appointment_ref,
      previous_status: prevStatus,
      new_status: 'Rescheduled',
      changed_by: changedBy,
      changed_at: now,
      note: note || `Rescheduled from ${prevDate} ${prevTime} to ${newDate} ${newTime}`
    });

    writeDb(data);
    return apt;
  },

  getStats() {
    const data = readDb();
    const today = new Date().toISOString().split('T')[0];

    return {
      total: data.appointments.length,
      today: data.appointments.filter(a => a.preferred_date === today).length,
      pending: data.appointments.filter(a => a.status === 'Pending').length,
      confirmed: data.appointments.filter(a => a.status === 'Confirmed').length,
      completed: data.appointments.filter(a => a.status === 'Completed').length,
      cancelled: data.appointments.filter(a => a.status === 'Cancelled').length,
      rescheduled: data.appointments.filter(a => a.status === 'Rescheduled').length,
      unreadEnquiries: data.enquiries.filter(e => e.status === 'Unread').length
    };
  },

  getEnquiries() {
    const data = readDb();
    return [...data.enquiries].sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  },

  addEnquiry(enquiryData) {
    const data = readDb();
    data.enquiries.unshift(enquiryData);
    writeDb(data);
    return enquiryData;
  },

  updateEnquiryStatus(id, newStatus) {
    const data = readDb();
    const item = data.enquiries.find(e => e.id === id);
    if (!item) return null;
    item.status = newStatus;
    writeDb(data);
    return item;
  }
};
