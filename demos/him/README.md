# 🦷 XYZ Dental Clinic — Modern Healthcare Platform & Doctor Admin System

**Demo Brand:** XYZ Dental Clinic  
**Doctor:** Dr. XYZ  
**Location:** XYZ, Surat, Gujarat, India  
**Phone:** 9974012606  
**Email:** kanthariyahimesh@gmail.com  
**Stack:** React 19, TypeScript, Vite 6, Tailwind CSS, Express, Node.js, JSON Database (`clinic_db.json`), JWT Authentication  
**Demo Notice:** *"DEMO WEBSITE — All doctor, clinic, appointment, and service information is fictional and provided for demonstration purposes only."*

---

## 🌟 Executive Summary

**XYZ Dental Clinic** is a high-fidelity, production-grade healthcare demonstration web application featuring both:
1. **A Patient-Facing Public Website:** Modern, mobile-responsive, conversion-optimized dental clinic experience with online consultation booking, treatment guides, interactive smile preview slider, and patient enquiries.
2. **A Doctor Admin Dashboard (`/doctor/dashboard`):** Secure administrative portal where Dr. XYZ logs in, monitors live booking metrics, reviews incoming patient requests, updates appointment statuses (Pending, Confirmed, Completed, Cancelled, Rescheduled), inspects complete audit timelines, and views daily timetable schedules.
3. **Persistent JSON Database (`server/clinic_db.json`):** Zero-configuration, file-based JSON database engine storing doctors, appointments, full status audit history, and contact form messages.

---

## 🔑 Doctor Demo Login Credentials

Doctors can access the administration dashboard directly at `#/doctor/login`:

- **Doctor Email:** `kanthariyahimesh@gmail.com` *(or `doctor@xyzdental.com`)*
- **Password:** `DoctorXYZ@2026`
- **Dashboard URL:** `#/doctor/dashboard`

> **Note:** A "Quick Fill" button is also provided on the login page for instant one-click demonstration.

---

## 📂 Architecture & Data Centralization

All clinic identity and doctor information is centralized in:
`src/config/clinicConfig.ts`

Any change to clinic name, doctor credentials, phone numbers, or timings made in this file automatically propagates across all public pages, modals, and footer disclaimers.

### JSON File-Based Database (`server/clinic_db.json`)
The server uses a lightweight JSON database located at `server/clinic_db.json` containing:
- `doctors`: Doctor accounts with bcrypt password hashes and roles.
- `appointments`: Real-time booking records (`id`, `appointment_ref`, `patient_name`, `phone`, `email`, `service_name`, `preferred_date`, `preferred_time`, `status`, `notes`).
- `appointment_history`: Audit trail capturing every status transition, timestamp, changed-by agent, and clinical note.
- `enquiries`: Incoming messages submitted from the public contact page.

### Dual-Layer Storage Resilience
- **With Node Server Running:** Frontend communicates directly with Express REST API at `http://localhost:5000/api` saving to `server/clinic_db.json`.
- **Static Hosting / Offline Fallback:** If deployed on static web hosts (e.g. GitHub Pages), the frontend automatically switches to a synchronized browser `localStorage` database with identical schemas and seeded demo records, ensuring 100% demo functionality anywhere!

---

## 🚀 Running the Project Locally

### 1. Install Dependencies
```bash
cd demos/him
pnpm install
```

### 2. Start the JSON Database Express API Server (Port 5000)
```bash
pnpm run server
```
*Output: 🦷 XYZ Dental Clinic - Doctor Admin API Server (JSON DB) running on http://localhost:5000*

### 3. Start the Vite Frontend (Port 5173)
```bash
pnpm run dev
```
Open your browser at `http://localhost:5173`.

### 4. Build for Production
```bash
pnpm run build
```

---

## 📱 Doctor Admin Dashboard Routes

| Route | Description |
|---|---|
| `#/doctor/login` | Doctor login with show/hide password, loading state, error alert, and demo disclaimer |
| `#/doctor/dashboard` | Overview with 6 dynamic metric cards (Total, Today's, Pending, Confirmed, Completed, Changes) and quick-action review table |
| `#/doctor/appointments` | Full appointments table with search by patient name/ref/phone, status filter tabs, service filter, inline status actions, reschedule modal, and audit history log |
| `#/doctor/calendar` | Day-by-day timetable visualizer displaying booked slots and available clinic consultation windows |
| `#/doctor/enquiries` | Patient contact messages list with status toggles (`Unread`, `Reviewed`, `Replied`) |
| `#/doctor/settings` | Doctor credentials, clinic timings, address, and JSON database diagnostics |

---

## 🛡️ Demo Notice Compliance
As required for medical demo ethics, the discreet disclaimer is prominently rendered on:
- Homepage
- Doctor Profile Page (`#/team`)
- Appointment Request Page (`#/appointment`)
- Consultation Request Modal
- Doctor Login Page (`#/doctor/login`)
- Doctor Admin Dashboard (`#/doctor/dashboard`)
