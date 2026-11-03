# Cloud Deployment Guide — XYZ Dental Clinic Backend & WhatsApp API

This guide walks you through deploying the **XYZ Dental Clinic Backend** to **Render** for free, giving you a 24/7 permanent public HTTPS backend that connects to your GitHub Pages website.

---

## Architecture Overview

```
[Patient on Smartphone Anywhere in the World]
       │
       ▼ (Visits GitHub Pages)
https://hiimesh0.github.io/leadgenapp/demos/him/dist/index.html
       │
       ▼ (Calls Public Cloud API via HTTPS)
https://xyz-dental-backend.onrender.com/api/public/appointments
       │
       ▼ (Triggers WhatsApp Confirmation)
[WAHA Cloud Engine / Gateway]
       │
       ▼
[Patient's Phone WhatsApp] ──► 🔔 Real incoming booking confirmation!
```

---

## Step-by-Step Deployment on Render (Takes ~3 Minutes)

### Step 1: Sign In to Render
1. Go to [render.com](https://render.com).
2. Click **Get Started** or **Sign In**.
3. Select **Continue with GitHub** (sign in using your GitHub account `Hiimesh0`).

---

### Step 2: Create a New Web Service
1. In the Render Dashboard, click the blue **New +** button in the top right.
2. Select **Web Service**.
3. Choose **Build and deploy from a Git repository**.
4. Search for your repository: **`leadgenapp`** and click **Connect**.

---

### Step 3: Configure the Web Service Settings

Fill in the following fields:

| Field | Value |
|---|---|
| **Name** | `xyz-dental-backend` |
| **Region** | Singapore (or closest to India) |
| **Branch** | `main` |
| **Root Directory** | `demos/him/server` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `node index.js` |
| **Instance Type** | **Free** |

---

### Step 4: Add Environment Variables

Scroll down to **Environment Variables** and add:

- `NODE_ENV` = `production`
- `JWT_SECRET` = `xyz_dental_super_secret_jwt_key_2026`
- `WAHA_ENABLED` = `true`
- `WAHA_BASE_URL` = *(Your WAHA URL or tunnel URL, e.g. `https://smoking-cable-cole-second.trycloudflare.com` or Cloud WAHA)*
- `WAHA_API_KEY` = `50100d00397b43cdb9f8a61599cd2f94`
- `WAHA_SESSION` = `default`

---

### Step 5: Click "Deploy Web Service"

1. Click **Deploy Web Service** at the bottom.
2. Render will build and deploy your service in about 1–2 minutes.
3. Once deployed, Render will show your live permanent URL at the top, for example:
   ```
   https://xyz-dental-backend.onrender.com
   ```

---

### Step 6: Connect Your GitHub Website to Render

Once Render gives you your URL (e.g. `https://xyz-dental-backend.onrender.com`), you or I simply update `VITE_API_URL` in `src/services/api.ts`:

```ts
const API_BASE = 'https://xyz-dental-backend.onrender.com/api';
```

Then rebuild and push to GitHub. From that moment onward:
- Your laptop does not need to run anything.
- The website on GitHub Pages will communicate directly with your Render cloud backend 24/7!

