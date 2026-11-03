# WAHA (WhatsApp HTTP API) Integration Guide — XYZ Dental Clinic

This guide explains how the **WAHA (WhatsApp HTTP API)** messaging engine is integrated into the XYZ Dental Clinic platform for dispatching real WhatsApp appointment confirmation messages to patients.

---

## 1. Architecture & Security Flow

```
[Patient / Client UI] 
        │ (POST /api/public/appointments)
        ▼
[Node.js Backend API (server/index.js)]
        │ 1. Idempotency Check & Duplicate Prevention
        │ 2. Save Appointment to Persistent JSON DB
        ▼
[Backend WAHA Service (server/waha.js)]
        │ 3. Normalize Phone (+91 E.164 / 91XXXXXXXXXX@c.us)
        │ 4. HTTP POST to WAHA Daemon
        ▼
[WAHA Daemon (Docker on port 3000)]
        │ 5. Session: default
        ▼
[WhatsApp Network] ───► [Patient's Mobile Device]
```

> **Security Rule:** The frontend client **never** talks directly to WAHA and never holds WAHA credentials. All messaging requests are proxied and secured through the backend server.

---

## 2. Prerequisites & Running WAHA

You need **Docker** installed on your host machine to run WAHA.

### Option A: Using Docker Compose (Recommended)

From `demos/aurelia-dental/`:

```bash
docker compose -f docker-compose.waha.yml up -d
```

### Option B: Using Docker Run Directly

```bash
docker run -it --rm -p 3000:3000/tcp --name waha devlikeappro/waha
```

Once running:
- **WAHA API Base URL:** `http://localhost:3000`
- **WAHA Swagger / Web Dashboard:** `http://localhost:3000/dashboard` (Username: `admin`, Password: `DoctorXYZ@2026`)

---

## 3. Pairing Clinic WhatsApp Number

1. Start WAHA using one of the commands above.
2. Log into the Doctor Admin Dashboard:
   - URL: `demos/aurelia-dental/dist/index.html#/doctor/login`
   - Email: `kanthariyahimesh@gmail.com`
   - Password: `DoctorXYZ@2026`
3. Navigate to **Settings** (`#/doctor/settings`).
4. Click **Test Connection** — the status should change to `SCAN_QR_CODE`.
5. Click **Scan WhatsApp QR Code** to view the live QR code.
6. Open WhatsApp on the clinic's phone:
   - Go to **Settings > Linked Devices > Link a Device**.
   - Point the camera at the QR code.
7. Once paired, the status turns **Connected** (`WORKING`).

---

## 4. Message Format Sent to Patients

When an appointment is requested (via website modal or doctor entry), WAHA sends:

```
🦷 *Appointment Confirmation — XYZ Dental Clinic*

Dear *[Patient Name]*,

Your appointment consultation has been booked successfully!

📋 *Details:*
• Reference: *APT-2026-XXX*
• Treatment: *[Service Name]*
• Specialist: *Dr. XYZ*
• Date: *[Preferred Date]*
• Time Slot: *[Preferred Time]*

📍 *Location:*
XYZ, Surat, Gujarat, India

📞 *Support & Rescheduling:*
Call: 9974012606
Email: kanthariyahimesh@gmail.com

_(DEMO NOTICE: All doctor, clinic, and appointment details are fictional and generated for demonstration purposes only.)_
```

---

## 5. Doctor Dashboard Features

- **WhatsApp Column in Appointments Table:**
  - Status Pills: `Sent to WAHA` (Green), `Pending` (Amber), `Failed` (Red), `Not Configured` (Slate).
  - Masked Phone: `+91 99740 ****06` for privacy compliance.
- **One-Click Retry Button:**
  - If a message fails (e.g. WAHA was offline or network timeout), the doctor can click the **Retry WhatsApp** icon to resend without creating duplicate appointments.
- **Audit History Modal:**
  - Full delivery timeline and specific WAHA error messages recorded in `appointment_history`.
