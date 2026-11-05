# WAHA_INTEGRATION.md — WhatsApp HTTP API Engine & Gateway
## Configuration, Endpoints, Docker Setup & Session Recovery

---

## 1. Overview
The platform integrates **WAHA (WhatsApp HTTP API)** using the official Docker image `devlikeapro/waha:latest` powered by the **WEBJS** engine.

It handles:
- Appointment booking confirmations to patients.
- New booking alerts to clinic doctors.
- Ingestion of WhatsApp photo messages for website automation.
- Session lifecycle monitoring and QR-code pairing.

---

## 2. Supported WAHA API Endpoints

| Method | Endpoint | Purpose | Request Payload Sample |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/server/version` | Engine health probe | None |
| `GET` | `/api/sessions` | List active sessions | None |
| `GET` | `/api/sessions/{session}` | Inspect session state | None |
| `GET` | `/api/{session}/auth/qr` | Retrieve QR code stream | None |
| `POST` | `/api/sessions/{session}/start` | Boot default session | None |
| `POST` | `/api/sessions/{session}/restart`| Reboot default session | None |
| `POST` | `/api/sendText` | Send formatted text message | `{"session":"default","chatId":"919974012606@c.us","text":"Hello Doctor"}` |

---

## 3. Docker Configuration

### Local Development (`docker-compose.yml`)
```yaml
version: '3.8'

services:
  waha:
    image: devlikeapro/waha:latest
    container_name: waha_clinic_engine
    restart: unless-stopped
    ports:
      - "3008:3000"
    environment:
      - WAHA_API_KEY=50100d00397b43cdb9f8a61599cd2f94
      - WAHA_DASHBOARD_ENABLED=true
      - WAHA_DASHBOARD_USERNAME=admin
      - WAHA_DASHBOARD_PASSWORD=DoctorXYZ@2026
      - WAHA_PRINT_QR=true
      - WHATSAPP_DEFAULT_ENGINE=WEBJS
      - WAHA_LOG_LEVEL=info
    volumes:
      - waha_sessions:/app/.sessions

volumes:
  waha_sessions:
    driver: local
```

---

## 4. Session Persistence & Reconnection

- **Persistent Volume:** Session tokens, encryption keys, and IndexedDB data are stored in `/app/.sessions`.
- **States:**
  - `WORKING`: Fully authenticated, connected, and operational.
  - `SCAN_QR_CODE`: Awaiting QR scan from doctor's phone.
  - `STARTING`: Chromium Puppeteer browser booting up.
  - `FAILED` / `STOPPED`: Session stopped or disconnected.
- **Re-Authentication Procedure:**
  1. Open WAHA dashboard: `http://localhost:3008/dashboard` (or cloud URL).
  2. Log in with `admin` / `DoctorXYZ@2026`.
  3. Scan the QR code using WhatsApp on the clinic phone (**Settings > Linked Devices > Link a Device**).
  4. Status transitions to `WORKING`.
