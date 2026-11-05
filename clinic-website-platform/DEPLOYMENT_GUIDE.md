# DEPLOYMENT_GUIDE.md — Cloud Deployment & DevOps Runbook
## Standardized Deployment Across Free & Production Environments

---

## 1. Cloud Architecture Options

### Option 1: Render 100% Free Tier (₹0/Month)
- **Frontend:** Hosted 24/7 on GitHub Pages (Zero compute cost, global CDN).
- **Backend:** Render Free Web Service (`xyz-dental-backend`, `plan: free`).
- **WAHA Engine:** Render Free Docker Web Service (`waha-whatsapp-service`, `plan: free`).
- *Note:* Free containers sleep after 15 minutes of disuse; WhatsApp session requires QR re-scan upon waking up.

### Option 2: Render Production Tier (24/7 Persistent Cloud)
- **Backend:** Render Web Service (Free or Starter $7/mo).
- **WAHA Engine:** Render Web Service (Starter $7/mo) with a 1GB Persistent Disk mounted to `/app/.sessions`.
- *Benefit:* WhatsApp session **never logs out**, even during redeployments.

---

## 2. Step-by-Step Blueprint Deployment

1. Navigate to **[Render Dashboard](https://dashboard.render.com)**.
2. Click **New +** > **Blueprint**.
3. Connect your repository (`Hiimesh0/leadgenapp`).
4. Render automatically parses `render.yaml` and provisions all declared services.
5. Click **Apply**.

---

## 3. Post-Deployment Verification
Run the following curl commands against your live URLs:
```bash
# 1. Verify Backend Health
curl -s https://xyz-dental-backend.onrender.com/api/health

# 2. Verify WAHA Health
curl -s https://waha-whatsapp-service.onrender.com/api/server/version

# 3. Verify Frontend Availability
curl -s -o /dev/null -w "%{http_code}" https://hiimesh0.github.io/leadgenapp/demos/him/dist/index.html
```
All probes must return `200 OK`.
