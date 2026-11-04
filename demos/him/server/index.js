import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...values] = trimmed.split('=');
      if (key && !process.env[key.trim()]) {
        process.env[key.trim()] = values.join('=').trim();
      }
    }
  });
}

import { initDb, dbOps } from './db.js';
import { wahaService, normalizeIndianPhone } from './waha.js';

// Initialize the JSON database and default records
initDb();

const app = express();
const PORT = process.env.PORT || 5005;
const JWT_SECRET = process.env.JWT_SECRET || 'xyz-dental-clinic-secret-key-2026';

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Request logger for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required. Please log in.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired session. Please log in again.' });
    }
    req.user = user;
    next();
  });
}

// ==========================================
// AUTHENTICATION ROUTES
// ==========================================

// Doctor Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const doctor = dbOps.findDoctorByEmail(email);

    if (!doctor) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isValid = bcrypt.compareSync(password, doctor.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      {
        id: doctor.id,
        name: doctor.name,
        email: doctor.email,
        role: doctor.role
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      doctor: {
        id: doctor.id,
        name: doctor.name,
        email: doctor.email,
        role: doctor.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error during login.' });
  }
});

// Current Doctor Profile (Token validation)
app.get('/api/auth/me', authenticateToken, (req, res) => {
  try {
    const doctor = dbOps.findDoctorById(req.user.id);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor profile not found.' });
    }
    res.json({
      success: true,
      doctor: {
        id: doctor.id,
        name: doctor.name,
        email: doctor.email,
        role: doctor.role,
        created_at: doctor.created_at
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch doctor profile.' });
  }
});

// ==========================================
// PUBLIC PATIENT ROUTES
// ==========================================

// Create public appointment request & trigger WAHA confirmation
app.post('/api/public/appointments', async (req, res) => {
  const {
    patient_name,
    phone,
    email,
    service_id,
    service_name,
    doctor_name,
    preferred_date,
    preferred_time,
    notes
  } = req.body;

  if (!patient_name || !phone || !preferred_date || !preferred_time) {
    return res.status(400).json({ error: 'Patient name, phone number, date, and time are required.' });
  }

  // Validate phone format before saving
  const phoneInfo = normalizeIndianPhone(phone);
  const maskedPhone = phoneInfo ? phoneInfo.masked : `+91 ****${phone.trim().slice(-4)}`;

  try {
    const id = `apt-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const appointment_ref = `APT-2026-${randomCode}`;
    const now = new Date().toISOString();
    const finalServiceName = service_name || 'General Dental Consultation';
    const finalDoctorName = doctor_name || 'Dr. XYZ';

    const newAppointment = {
      id,
      appointment_ref,
      patient_name: patient_name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : '',
      service_id: service_id || 'general-consultation',
      service_name: finalServiceName,
      doctor_name: finalDoctorName,
      preferred_date,
      preferred_time,
      notes: notes ? notes.trim() : '',
      status: 'Pending',
      notification_channel: 'whatsapp',
      notification_status: 'Pending',
      notification_message_id: null,
      notification_last_attempt: null,
      notification_error: null,
      notification_masked_phone: maskedPhone,
      created_at: now,
      updated_at: now
    };

    const result = dbOps.addAppointment(newAppointment);

    if (result.isDuplicate) {
      console.log(`[API] Returning duplicate appointment ${result.appointment.appointment_ref} without re-sending.`);
      return res.status(200).json({
        success: true,
        message: 'Existing consultation request found. No duplicate booking created.',
        appointment: result.appointment,
        isDuplicate: true
      });
    }

    // Trigger WAHA WhatsApp confirmation message
    console.log(`[API] Triggering WAHA WhatsApp confirmation for ${newAppointment.appointment_ref}...`);
    const notificationResult = await wahaService.sendAppointmentConfirmation(newAppointment);

    // Update notification status on saved appointment record
    const updatedWithNotification = dbOps.updateAppointmentNotification(newAppointment.id, notificationResult);

    res.status(201).json({
      success: true,
      message: 'Appointment request submitted successfully.',
      appointment: updatedWithNotification || newAppointment,
      notification: {
        status: notificationResult.status,
        maskedPhone: notificationResult.maskedPhone,
        messageId: notificationResult.messageId || null,
        error: notificationResult.error || null
      }
    });
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({ error: 'Failed to record appointment request.' });
  }
});

// Create public contact enquiry
app.post('/api/public/enquiries', (req, res) => {
  const { name, phone, email, subject, message } = req.body;

  if (!name || !phone || !message) {
    return res.status(400).json({ error: 'Name, phone number, and message are required.' });
  }

  try {
    const id = `enq-${Date.now()}`;
    const now = new Date().toISOString();

    const newEnquiry = {
      id,
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : '',
      subject: subject ? subject.trim() : 'General Inquiry',
      message: message.trim(),
      status: 'Unread',
      created_at: now
    };

    dbOps.addEnquiry(newEnquiry);

    res.status(201).json({
      success: true,
      message: 'Your message has been sent to Dr. XYZ Clinic team.'
    });
  } catch (error) {
    console.error('Create enquiry error:', error);
    res.status(500).json({ error: 'Failed to submit enquiry.' });
  }
});

// ==========================================
// DOCTOR DASHBOARD & APPOINTMENTS (PROTECTED)
// ==========================================

// Dashboard Statistics Overview
app.get('/api/appointments/stats', authenticateToken, (req, res) => {
  try {
    const stats = dbOps.getStats();
    res.json({ success: true, stats });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Failed to compute dashboard metrics.' });
  }
});

// Get appointments list with search, filter, and pagination support
app.get('/api/appointments', authenticateToken, (req, res) => {
  try {
    const { status, search, service, date } = req.query;
    const appointments = dbOps.getAppointments({ status, search, service, date });
    res.json({ success: true, count: appointments.length, appointments });
  } catch (error) {
    console.error('Fetch appointments error:', error);
    res.status(500).json({ error: 'Failed to retrieve appointments.' });
  }
});

// Get single appointment details + full audit history
app.get('/api/appointments/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const appointment = dbOps.findAppointment(id);

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found.' });
    }

    const history = dbOps.getAppointmentHistory(appointment.appointment_ref);
    res.json({ success: true, appointment, history });
  } catch (error) {
    console.error('Fetch single appointment error:', error);
    res.status(500).json({ error: 'Failed to retrieve appointment details.' });
  }
});

// Update appointment status (Pending, Confirmed, Completed, Cancelled)
app.patch('/api/appointments/:id/status', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { status, note } = req.body;

  const validStatuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled', 'Rescheduled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
  }

  try {
    const updated = dbOps.updateAppointmentStatus(id, status, req.user.name || 'Dr. XYZ', note);
    if (!updated) {
      return res.status(404).json({ error: 'Appointment record not found.' });
    }

    res.json({
      success: true,
      message: `Appointment status updated to ${status}.`,
      appointment: updated
    });
  } catch (error) {
    console.error('Status update error:', error);
    res.status(500).json({ error: 'Failed to update appointment status.' });
  }
});

// Reschedule appointment
app.patch('/api/appointments/:id/reschedule', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { preferred_date, preferred_time, note } = req.body;

  if (!preferred_date || !preferred_time) {
    return res.status(400).json({ error: 'New preferred date and time are required.' });
  }

  try {
    const updated = dbOps.rescheduleAppointment(id, preferred_date, preferred_time, req.user.name || 'Dr. XYZ', note);
    if (!updated) {
      return res.status(404).json({ error: 'Appointment record not found.' });
    }

    res.json({
      success: true,
      message: 'Appointment successfully rescheduled.',
      appointment: updated
    });
  } catch (error) {
    console.error('Reschedule error:', error);
    res.status(500).json({ error: 'Failed to reschedule appointment.' });
  }
});

// ==========================================
// WAHA WHATSAPP SERVICE & RETRY ROUTES (PROTECTED)
// ==========================================

// Check WAHA Connection & Session Status
app.get('/api/doctor/waha/status', authenticateToken, async (req, res) => {
  try {
    const status = await wahaService.getStatus();
    res.json({ success: true, waha: status });
  } catch (error) {
    console.error('WAHA status error:', error);
    res.status(500).json({ error: 'Failed to fetch WAHA status.' });
  }
});

// Get QR Code for Session Authentication
app.get('/api/doctor/waha/qr', authenticateToken, async (req, res) => {
  try {
    const qrResult = await wahaService.getQrCode();
    res.json({ success: qrResult.ok, qr: qrResult.qr, error: qrResult.error });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve WAHA QR code.' });
  }
});

// Restart WAHA Session
app.post('/api/doctor/waha/restart', authenticateToken, async (req, res) => {
  try {
    const result = await wahaService.restartSession();
    res.json({ success: result.ok, result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to restart WAHA session.' });
  }
});

// Retry Failed WhatsApp Notification for an Existing Appointment
app.post('/api/appointments/:id/retry-notification', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = dbOps.findAppointment(id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found.' });
    }

    console.log(`[API] Doctor manually retrying WhatsApp confirmation for ${appointment.appointment_ref}...`);
    const notificationResult = await wahaService.sendAppointmentConfirmation(appointment);
    const updated = dbOps.updateAppointmentNotification(appointment.id, notificationResult);

    res.json({
      success: notificationResult.success,
      status: notificationResult.status,
      message: notificationResult.success
        ? 'WhatsApp notification sent successfully.'
        : `Notification attempt status: ${notificationResult.status}. ${notificationResult.error || ''}`,
      appointment: updated
    });
  } catch (error) {
    console.error('Retry notification error:', error);
    res.status(500).json({ error: 'Failed to retry notification delivery.' });
  }
});

// Patient Enquiries list
app.get('/api/enquiries', authenticateToken, (req, res) => {
  try {
    const enquiries = dbOps.getEnquiries();
    res.json({ success: true, count: enquiries.length, enquiries });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch patient enquiries.' });
  }
});

// Update Enquiry status
app.patch('/api/enquiries/:id/status', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updated = dbOps.updateEnquiryStatus(id, status);
    if (!updated) {
      return res.status(404).json({ error: 'Enquiry not found.' });
    }
    res.json({ success: true, message: `Enquiry status updated to ${status}.`, enquiry: updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update enquiry status.' });
  }
});

// Health check endpoint for Render monitoring and uptime probes
app.get('/api/health', async (req, res) => {
  res.json({
    status: 'healthy',
    service: 'xyz-dental-backend',
    version: '1.0.0',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    waha: {
      enabled: wahaService.enabled,
      baseUrl: wahaService.baseUrl,
      session: wahaService.session
    }
  });
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n======================================================`);
  console.log(`🦷 XYZ Dental Clinic - Doctor Admin API Server (JSON DB)`);
  console.log(`🚀 Running at: http://localhost:${PORT}`);
  console.log(`💬 WAHA WhatsApp API: ${wahaService.enabled ? 'Enabled (' + wahaService.baseUrl + ')' : 'Disabled (WAHA_ENABLED=false)'}`);
  console.log(`🔑 Doctor Login: kanthariyahimesh@gmail.com / DoctorXYZ@2026`);
  console.log(`======================================================\n`);
});
