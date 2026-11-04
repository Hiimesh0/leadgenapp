# Render Cloud Deployment Guide — 24/7 Cloud Automation

This guide provides instructions to run the entire system in the cloud 24/7 without needing your personal laptop or Docker switched on:
- **XYZ Dental Clinic Backend** (`xyz-dental-backend`)
- **WAHA WhatsApp API Cloud Engine** (`waha-whatsapp-service`)
- **Clinic WhatsApp Outreach Campaign Application** (`clinic-outreach-campaign`)
- **Global Patient Frontend** (Hosted 24/7 on GitHub Pages)

---

## Architecture Overview

```
[Patient or Clinic Outreach Recipient]
                │
                ▼ (Visits GitHub Pages)
https://hiimesh0.github.io/leadgenapp/demos/him/dist/index.html
                │
                ▼ (Calls Render Public Cloud API via HTTPS)
https://xyz-dental-backend.onrender.com/api/public/appointments
                │
                ▼ (Private Render Network HTTP: http://waha-whatsapp-service:3000)
┌────────────────────────────────────────────────────────┐
│ Render Web Service: waha-whatsapp-service              │
│ Docker: devlikeapro/waha:latest                        │
│ Persistent Disk: /app/.sessions (Preserves Login 24/7) │
└───────────────────────▲────────────────────────────────┘
                        │
                        ▼ (Sends Real WhatsApp Message)
[Recipient Phone] ──► 🔔 Instant Delivery!
                        ▲
                        │ (Private Render Network HTTP)
┌───────────────────────┴────────────────────────────────┐
│ Render Web Service: clinic-outreach-campaign           │
│ Admin Dashboard: /admin/whatsapp-campaigns             │
│ Persistent Disk: /var/data/outreach (SQLite DB)        │
└────────────────────────────────────────────────────────┘
```

---

## Option A: 1-Click Blueprint Deployment (Recommended)

Render provides Blueprints that automatically provision all 3 services using the included `render.yaml`.

1. Go to **[dashboard.render.com](https://dashboard.render.com)**.
2. Click **New +** (top right) > **Blueprint**.
3. Connect your repository: **`Hiimesh0/leadgenapp`** (Branch: `main`).
4. Render will detect `render.yaml` and display the 3 services:
   - `xyz-dental-backend`
   - `waha-whatsapp-service`
   - `clinic-outreach-campaign`
5. Click **Apply**.
6. Render will automatically build, deploy, and link the services together on its private internal network.

---

## Option B: Manual Service Creation

If you prefer setting up the services individually in Render:

### Service 1: WAHA WhatsApp Engine (`waha-whatsapp-service`)
1. Click **New +** > **Web Service** > **"Deploy an existing image"**.
2. **Image URL:** `devlikeapro/waha:latest`
3. **Name:** `waha-whatsapp-service`
4. **Region:** Singapore (or same region as backend)
5. **Instance Type:** Starter ($7/month — ensures 24/7 uptime without idle sleep and supports disks)
6. **Disks:** Click **Add Disk**:
   - **Name:** `waha-sessions`
   - **Mount Path:** `/app/.sessions`
   - **Size:** `1 GB`
7. **Environment Variables:**
   | Key | Value |
   |---|---|
   | `PORT` | `3000` |
   | `WAHA_API_KEY` | `50100d00397b43cdb9f8a61599cd2f94` |
   | `WAHA_DASHBOARD_ENABLED` | `true` |
   | `WAHA_DASHBOARD_USERNAME` | `admin` |
   | `WAHA_DASHBOARD_PASSWORD` | `DoctorXYZ@2026` |
   | `WAHA_PRINT_QR` | `true` |
   | `WHATSAPP_DEFAULT_ENGINE` | `WEBJS` |
8. Click **Create Web Service**.

### Service 2: Clinic Website Backend (`xyz-dental-backend`)
1. Click **New +** > **Web Service** > **Build and deploy from a Git repository**.
2. Select `leadgenapp`.
3. Settings:
   - **Name:** `xyz-dental-backend`
   - **Root Directory:** `demos/him/server`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
   - **Plan:** Free or Starter
4. **Environment Variables:**
   | Key | Value |
   |---|---|
   | `NODE_ENV` | `production` |
   | `JWT_SECRET` | `xyz_dental_doctor_jwt_secret_2026` |
   | `WAHA_ENABLED` | `true` |
   | `WAHA_BASE_URL` | `http://waha-whatsapp-service:3000` (or your public WAHA Render URL) |
   | `WAHA_API_KEY` | `50100d00397b43cdb9f8a61599cd2f94` |
   | `WAHA_SESSION` | `default` |
5. Click **Create Web Service**.

### Service 3: Clinic Outreach Campaign App (`clinic-outreach-campaign`)
1. Click **New +** > **Web Service** > **Build and deploy from a Git repository**.
2. Select `leadgenapp`.
3. Settings:
   - **Name:** `clinic-outreach-campaign`
   - **Root Directory:** `clinic-outreach-campaign`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node backend/server.js`
   - **Plan:** Starter (with Disk) or Free
4. **Disk (if Starter):**
   - **Name:** `outreach-db`
   - **Mount Path:** `/var/data/outreach`
   - **Size:** `1 GB`
5. **Environment Variables:**
   | Key | Value |
   |---|---|
   | `NODE_ENV` | `production` |
   | `PORT` | `5050` |
   | `APP_SECRET` | `campaign_admin_jwt_secret_2026` |
   | `ADMIN_USERNAME` | `admin` |
   | `ADMIN_PASSWORD` | `AdminOutreach@2026` |
   | `WAHA_BASE_URL` | `http://waha-whatsapp-service:3000` |
   | `WAHA_API_KEY` | `50100d00397b43cdb9f8a61599cd2f94` |
   | `WAHA_SESSION` | `default` |
   | `WAHA_ENABLED` | `true` |
   | `DB_PATH` | `/var/data/outreach/campaigns.db` (or `database/campaigns.db` on Free) |
6. Click **Create Web Service**.

---

## Linking WhatsApp Cloud Session (One-Time Setup)

Once `waha-whatsapp-service` is live on Render:
1. Open its dashboard in your browser:
   `https://<your-waha-service>.onrender.com/dashboard`
2. Log in with:
   - **Username:** `admin`
   - **Password:** `DoctorXYZ@2026`
3. Click on the **default** session > **Scan QR Code**.
4. On your clinic phone: WhatsApp > **Settings > Linked Devices > Link a Device**.
5. Scan the QR code.

Because the session is mounted to the durable Render Persistent Disk (`/app/.sessions`), your session **never logs out**, even if Render restarts or updates the container!
