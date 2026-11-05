# SYSTEM_ARCHITECTURE.md — Cloud-Agnostic Platform Architecture
## Modular Healthcare Web & Automation Engine

---

## 1. High-Level System Architecture Diagram

```mermaid
flowchart TD
    subgraph Clients["Patient & Doctor Touchpoints"]
        P[Patient on Mobile Browser]
        D[Doctor on Smartphone / WhatsApp]
        ADM[Clinic Admin on Web Portal]
    end

    subgraph CDN["Edge & Static CDN Layer (GitHub Pages / Render Static)"]
        HTML[Static HTML5 / Vite React Distribution]
        IMG[Optimized WebP Media Assets]
    end

    subgraph Gateway["Public Ingress & API Gateway"]
        CORS[CORS & Rate Limiter]
        AUTH[JWT & Session Guard]
        ROUTER[Express API Router]
    end

    subgraph Services["Core Microservices Layer"]
        APT[Appointment Service]
        CONT[Content & Image Service]
        NOTIF[Notification Service]
    end

    subgraph WhatsAppSub["WhatsApp Cloud Engine"]
        WAHA[WAHA Docker Container (devlikeapro/waha:latest)]
        WEBJS[Chromium WebJS Engine]
        SESS[Persistent /app/.sessions Volume]
    end

    subgraph Storage["Persistence & Data Storage Layer"]
        SQL[(SQLite WAL / PostgreSQL)]
        AUDIT[(Immutable Audit Logs)]
        OBJ[(Local / S3 Media Bucket)]
    end

    P -->|HTTPS Request| CDN
    CDN -->|Calls REST API| CORS
    ADM -->|Doctor Portal Login| CORS
    CORS --> AUTH --> ROUTER
    ROUTER --> APT
    ROUTER --> CONT
    ROUTER --> NOTIF

    APT -->|Store Booking| SQL
    APT -->|Dispatch Alert| WAHA
    WAHA --> WEBJS -->|WhatsApp Network| P
    WAHA --> WEBJS -->|WhatsApp Network| D

    D -->|Sends Image & Text| WAHA
    WAHA -->|Webhook Event| ROUTER
    CONT -->|Validate & Transcode| OBJ
    CONT -->|Record Transaction| AUDIT
```

---

## 2. Cloud Provider Abstraction Layer

To ensure the platform can migrate between hosting providers (Render, Vercel, AWS, Hetzner, DigitalOcean) without rewriting business logic, all platform interactions are routed through abstract interfaces located in `platform/deployment-adapters/`:

```text
platform/deployment-adapters/
├── interface.js              # Standard contract (deploy, healthCheck, getLogs, rollback)
├── renderAdapter.js          # Render REST API & Blueprint implementation
├── vercelAdapter.js          # Vercel CLI & API implementation
└── vpsDockerAdapter.js       # SSH/Docker-Compose on dedicated Linux VPS
```

### Standard Adapter Contract
```javascript
export class CloudDeploymentAdapter {
  async deployStatic(sitePath, config) { throw new Error('Not implemented'); }
  async deployWebService(servicePath, envVars, config) { throw new Error('Not implemented'); }
  async getHealthStatus(serviceId) { throw new Error('Not implemented'); }
  async triggerRollback(serviceId, releaseId) { throw new Error('Not implemented'); }
}
```

---

## 3. Microservices Responsibilities

1. **`services/api/`**:
   - Express server handling public appointment booking (`POST /api/public/appointments`).
   - Doctor admin authentication (`POST /api/auth/login`) with JWT.
   - Doctor appointment management (`GET/PATCH /api/doctor/appointments`).
2. **`services/whatsapp-gateway/`**:
   - Communicates with WAHA on `http://waha-whatsapp-service:3000` or local port 3008.
   - Manages outgoing messages via `POST /api/sendText`.
   - Ingests incoming WAHA webhooks (`/webhook/waha`).
3. **`services/automation-worker/`**:
   - In-process or background queue executing image parsing, slot updates, and notification dispatches.
4. **`services/content-service/`**:
   - Sharp-based image optimization pipeline generating WebP images and stripping EXIF tags.
