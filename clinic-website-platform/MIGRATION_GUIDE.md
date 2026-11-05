# MIGRATION_GUIDE.md — Cloud Provider Migration Runbook
## Moving from Render to Dedicated VPS (Hetzner / DigitalOcean / AWS)

---

## 1. Overview & Cloud Decoupling
Because the platform utilizes modular deployment adapters in `platform/deployment-adapters/`, migrating away from Render does NOT require modifying frontend components, appointment logic, or WhatsApp handlers.

---

## 2. Target VPS Architecture (e.g. Hetzner Cloud / Ubuntu 24.04)

```text
[Internet Traffic]
       │
       ▼ (Port 80/443 HTTPS via Caddy / Nginx Reverse Proxy)
┌────────────────────────────────────────────────────────┐
│ Dedicated VPS (e.g. Hetzner CX22 - €3.79/month)       │
│                                                        │
│ ┌────────────────┐ ┌────────────────┐ ┌──────────────┐ │
│ │ Docker: Caddy  │ │ Docker: Node   │ │ Docker: WAHA │ │
│ │ (Auto-SSL)     │ │ API Service    │ │ (WebJS)      │ │
│ └───────┬────────┘ └───────┬────────┘ └──────┬───────┘ │
│         │                  │                 │         │
│         └──────────────────┴─────────────────┘         │
│               Internal Docker Bridge Network           │
│                                                        │
│ Persistent Storage: /var/lib/clinic-platform/sessions  │
│ SQLite / Postgres:  /var/lib/clinic-platform/data      │
└────────────────────────────────────────────────────────┘
```

---

## 3. Step-by-Step VPS Migration Steps

1. **Provision VPS:** Ubuntu 24.04 LTS server with Docker & Docker Compose installed.
2. **Clone Platform Repository:**
   ```bash
   git clone https://github.com/Hiimesh0/leadgenapp.git /opt/clinic-platform
   cd /opt/clinic-platform/clinic-website-platform
   ```
3. **Configure VPS Environment:**
   Create `/opt/clinic-platform/.env` with your permanent production keys.
4. **Launch Docker Stack:**
   ```bash
   docker compose -f infrastructure/docker/docker-compose.yml up -d
   ```
5. **Configure DNS:** Update clinic domain A records to point to your VPS public IPv4 address.
6. **Scan WhatsApp QR Code:** Access `https://waha.yourdomain.com/dashboard` and link the clinic phone once.
