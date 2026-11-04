# Deploying WAHA (WhatsApp HTTP API) 24/7 on Render

This guide explains how to host **WAHA** directly on **Render** as a 24/7 cloud service so you never need to keep Docker running on your laptop, and your WhatsApp API key **remains 100% fixed and permanent forever**.

---

## 💡 Why WAHA Was Changing API Keys Locally

When WAHA starts without an explicit `WAHA_API_KEY` environment variable, it treats every start as a fresh temporary instance and generates a random key.

### ✅ We Fixed Your Local Docker Container First:
Your local Docker container has now been recreated with:
- `WAHA_API_KEY=50100d00397b43cdb9f8a61599cd2f94` (Permanent Fixed Key)
- `-v waha_sessions:/app/.sessions` (Persistent WhatsApp Pairing Storage)

Even if you close or reboot Docker now, the local key will **never change again**.

---

## 🌐 Deploy WAHA on Render in 2 Minutes (Recommended for 24/7 Uptime)

Render allows you to deploy public Docker Hub images directly with zero coding.

### Step 1: Open Render Dashboard
1. Go to **[dashboard.render.com](https://dashboard.render.com/)**.
2. Click the blue **New +** button in the top right.
3. Select **Web Service**.

---

### Step 2: Choose "Existing Image"
1. Under the deployment options, choose:
   👉 **Deploy an existing image** (from Docker Hub / Container Registry).
2. Enter the Image URL:
   ```text
   devlikeapro/waha:latest
   ```
3. Click **Next**.

---

### Step 3: Configure Service Details

| Setting | Value |
| :--- | :--- |
| **Name** | `waha-clinic-api` |
| **Region** | Singapore (or closest to India) |
| **Instance Type** | **Starter** (512MB–1GB RAM recommended so Chromium runs smoothly) or Free |

---

### Step 4: Add Permanent Environment Variables

Scroll down to **Environment Variables** and add these exact key-value pairs:

| Key | Value | Description |
| :--- | :--- | :--- |
| `PORT` | `3000` | Render HTTP port binding |
| `WAHA_API_KEY` | `50100d00397b43cdb9f8a61599cd2f94` | **Your Permanent Fixed Key** |
| `WAHA_DASHBOARD_ENABLED` | `true` | Enables web QR dashboard |
| `WAHA_DASHBOARD_USERNAME` | `admin` | Dashboard login username |
| `WAHA_DASHBOARD_PASSWORD` | `DoctorXYZ@2026` | Dashboard login password |
| `WAHA_PRINT_QR` | `true` | Prints QR code to logs |
| `WHATSAPP_DEFAULT_ENGINE` | `WEBJS` | Standard WhatsApp Web engine |

---

### Step 5: Click "Create Web Service"
1. Click **Create Web Service** at the bottom.
2. Render will pull the image and start WAHA in about 1–2 minutes.
3. Render will give you your permanent public HTTPS URL at the top, for example:
   ```text
   https://waha-clinic-api.onrender.com
   ```

---

## 📲 Step 6: Pair WhatsApp on Render

1. Open your new Render WAHA dashboard in your browser:
   👉 **`https://waha-clinic-api.onrender.com/dashboard`**
2. Log in with:
   - **Username:** `admin`
   - **Password:** `DoctorXYZ@2026`
3. Click **Scan QR Code**.
4. Open WhatsApp on your clinic mobile phone:
   - Go to **Settings > Linked Devices > Link a Device**.
   - Point your phone camera at the QR code on the Render dashboard.
5. Your WhatsApp is now connected 24/7 in the cloud!

---

## 🔗 Step 7: Connect the Outreach Campaign to Render WAHA

In your `clinic-outreach-campaign/.env`, simply update the `WAHA_BASE_URL`:

```ini
WAHA_BASE_URL=https://waha-clinic-api.onrender.com
WAHA_API_KEY=50100d00397b43cdb9f8a61599cd2f94
WAHA_SESSION=default
```

Or open the campaign dashboard at **`http://localhost:5050/admin/whatsapp-campaigns`**, click the status pill, and paste your Render URL!

From that point on:
- You never need Docker running on your laptop.
- The API key never changes.
- WhatsApp stays linked in the cloud 24/7.

