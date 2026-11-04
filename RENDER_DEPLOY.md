# Render Cloud Deployment Guide — 100% Free Tier (₹0/Month)

This guide provides instructions to deploy your entire stack to Render using **strictly Free services (`plan: free`) with ₹0/month cost**:
- **XYZ Dental Clinic Backend** (`xyz-dental-backend` — Free Web Service)
- **WAHA WhatsApp API Engine** (`waha-whatsapp-service` — Free Docker Web Service)
- **Clinic Outreach Campaign App** (`clinic-outreach-campaign` — Free Web Service)
- **Website Frontend** (Free 24/7 on GitHub Pages)

---

## ⚠️ Important Free-Tier Behavior & Limitations

Before deploying, please understand Render's official free-tier operational rules:

1. **Inactivity Sleep (15 Minutes):**
   - Free Web Services automatically sleep when there is no incoming HTTP traffic for 15 consecutive minutes.
   - When a patient books an appointment or an admin visits the dashboard, the service wakes up automatically in ~30–45 seconds.
2. **Ephemeral Disk (No Persistent Disk at ₹0):**
   - Free services have temporary container filesystems.
   - When WAHA sleeps or restarts, data in `/app/.sessions` is wiped.
   - **WhatsApp Session Re-Authentication:** Whenever the WAHA container wakes up from sleep, you must scan the QR code in the WAHA dashboard (`/dashboard`) or Outreach Campaign dashboard to reconnect your phone before sending messages.
3. **Campaign Queue in Free Tier:**
   - If you start a campaign with hundreds of contacts and the browser is closed, ensure the sending duration does not exceed the sleep window without incoming traffic, or run campaigns while keeping the dashboard tab open.

---

## Architecture Overview (₹0/Month)

```
[Patient or Clinic Outreach Recipient]
                │
                ▼ (Visits GitHub Pages — 100% Free CDN)
https://hiimesh0.github.io/leadgenapp/demos/him/dist/index.html
                │
                ▼ (Calls Render Public Cloud API via HTTPS)
https://xyz-dental-backend.onrender.com/api/public/appointments
                │
                ▼ (Private Render Network HTTP: http://waha-whatsapp-service:3000)
┌────────────────────────────────────────────────────────┐
│ Render Free Web Service: waha-whatsapp-service         │
│ Docker: devlikeapro/waha:latest                        │
│ Ephemeral Storage: Re-scan QR if container sleeps      │
└───────────────────────▲────────────────────────────────┘
                        │
                        ▼ (Sends Real WhatsApp Message)
[Recipient Phone] ──► 🔔 Real Delivery!
                        ▲
                        │ (Private Render Network HTTP)
┌───────────────────────┴────────────────────────────────┐
│ Render Free Web Service: clinic-outreach-campaign      │
│ Admin Dashboard: /admin/whatsapp-campaigns             │
│ Storage: Local SQLite database/campaigns.db            │
└────────────────────────────────────────────────────────┘
```

---

## 1-Click Blueprint Deployment (100% Free)

All three services are configured in `render.yaml` with `plan: free` and zero paid add-ons.

1. Go to **[dashboard.render.com](https://dashboard.render.com)**.
2. Sign in with your GitHub account (`Hiimesh0`).
3. Click the **New +** button in the top right > **Blueprint**.
4. Connect repository **`Hiimesh0/leadgenapp`** (Branch: `main`).
5. Render will detect `render.yaml` and display all 3 services set to **Free**:
   - `xyz-dental-backend` (Free)
   - `waha-whatsapp-service` (Free)
   - `clinic-outreach-campaign` (Free)
6. Click **Apply**.

Render will deploy all three services for ₹0/month.

---

## WhatsApp Session Reconnection Guide (Free Tier)

Whenever the free container wakes up from sleep:

1. Open the WAHA dashboard URL:
   ```text
   https://<your-waha-service>.onrender.com/dashboard
   ```
2. Log in:
   - **Username:** `admin`
   - **Password:** `DoctorXYZ@2026`
3. Click on the **default** session > **Scan QR Code** (or view the QR code in the Outreach Campaign dashboard).
4. On your phone: WhatsApp > **Settings > Linked Devices > Link a Device**, and scan the code.
5. Once scanned, messages dispatch normally until the next extended sleep cycle.
