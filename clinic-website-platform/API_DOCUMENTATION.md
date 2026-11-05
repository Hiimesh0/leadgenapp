# API_DOCUMENTATION.md — REST API Specifications
## Platform API Contracts, Schemas & Endpoints

---

## 1. Authentication
All administrative routes require a Bearer token in the `Authorization` header:
```text
Authorization: Bearer <jwt_or_api_token>
```

---

## 2. Public Endpoints

### `GET /api/health`
Health check endpoint for Render uptime probes and monitoring agents.
- **Auth Required:** No
- **Response `200 OK`:**
```json
{
  "status": "healthy",
  "service": "clinic-website-platform-api",
  "version": "1.0.0",
  "uptimeSeconds": 14205,
  "timestamp": "2026-11-05T09:00:00.000Z",
  "waha": {
    "enabled": true,
    "baseUrl": "http://waha-whatsapp-service:3000",
    "session": "default"
  }
}
```

---

### `POST /api/public/appointments`
Book a patient appointment request.
- **Auth Required:** No (Rate limited: 10 req/min)
- **Request Body:**
```json
{
  "patient_name": "Aarav Patel",
  "phone": "9825123456",
  "service_id": "root-canal",
  "service_name": "Gentle Micro-Endodontics",
  "preferred_date": "2026-11-10",
  "preferred_time": "11:00 AM",
  "notes": "Mild pain in upper right molar"
}
```
- **Response `201 Created`:**
```json
{
  "success": true,
  "message": "Appointment request submitted successfully.",
  "appointment": {
    "id": "apt-2026-0042",
    "appointment_ref": "APT-2026-0042",
    "patient_name": "Aarav Patel",
    "masked_phone": "+91 98251 ****56",
    "status": "Pending",
    "notification_status": "Sent to WAHA"
  }
}
```

---

## 3. Doctor Admin Endpoints

### `POST /api/auth/login`
Doctor login endpoint.
- **Request Body:**
```json
{
  "email": "doctor@clinic.com",
  "password": "DoctorPassword@2026"
}
```
- **Response `200 OK`:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "doctor": {
    "id": "doc-001",
    "name": "Dr. XYZ",
    "email": "doctor@clinic.com",
    "role": "Chief Specialist"
  }
}
```

---

### `GET /api/doctor/waha/status`
Inspect live WhatsApp session status.
- **Auth Required:** Yes (Doctor JWT)
- **Response `200 OK`:**
```json
{
  "success": true,
  "waha": {
    "configured": true,
    "status": "CONNECTED",
    "label": "WhatsApp Connected & Active",
    "connected": true,
    "session": "default",
    "me": {
      "id": "919974012606@c.us",
      "pushName": "XYZ Dental Clinic"
    }
  }
}
```
