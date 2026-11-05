# AGENTS.md — Global Multi-Agent Operating Constitution
## AI-Powered Clinic Website Development Platform

---

## 1. Project Purpose & Mission
This platform is a modular, AI-orchestrated agency system designed to develop, deploy, maintain, and automate web presences and WhatsApp workflows for healthcare clinics and medical practices.

The system scales across four distinct service tiers:
1. **Starter Plan** (₹9,999) — Static high-conversion clinic landing page + WhatsApp CTAs.
2. **Professional Plan** (₹19,999) — Multi-page brand showcase + enquiry forms + doctor profiles.
3. **Premium Plan** (₹29,999+) — Full-stack database-backed site + WAHA appointment notifications + automated WhatsApp image/content updates.
4. **Enterprise / Custom Plan** — Multi-branch networks + custom workflows + HIPAA/privacy compliance + custom integrations.

All code, configurations, and automation workflows must remain **cloud-agnostic** (with Render as the reference initial adapter), strictly maintain **client tenant isolation**, and uphold the highest standards of medical data confidentiality.

---

## 2. Architecture Overview & Hierarchy

```
                    ┌──────────────────────────────────────────┐
                    │               Human Owner                │
                    │      (Final Approval & Escalations)      │
                    └────────────────────┬─────────────────────┘
                                         │
                                         ▼
                    ┌──────────────────────────────────────────┐
                    │       Project Coordinator / Router       │
                    │        (Evaluates Client Tier)           │
                    └────────────────────┬─────────────────────┘
                                         │
         ┌───────────────────────────────┼───────────────────────────────┐
         ▼                               ▼                               ▼                               ▼
┌──────────────────┐           ┌──────────────────┐           ┌──────────────────┐           ┌──────────────────┐
│   Starter Plan   │           │   Professional   │           │   Premium Plan   │           │ Enterprise Plan  │
│      Agent       │           │    Plan Agent    │           │      Agent       │           │      Agent       │
└────────┬─────────┘           └────────┬─────────┘           └────────┬─────────┘           └────────┬─────────┘
         │                              │                              │                              │
         └──────────────────────────────┴──────────────┬───────────────┴──────────────────────────────┘
                                                       │ Coordinates
                                                       ▼
                             ┌───────────────────────────────────────────────────┐
                             │             Shared Specialist Agents              │
                             ├───────────────────────────────────────────────────┤
                             │ • Requirements Agent       • Image Processing     │
                             │ • UI/UX Design Agent       • SEO & Semantics      │
                             │ • Frontend Web Agent       • Testing & QA Agent   │
                             │ • Backend / API Agent      • Security & Privacy   │
                             │ • Database Architect       • Deployment Agent     │
                             │ • WhatsApp / WAHA Agent    • Monitoring Agent     │
                             │ • Content Automation Agent • Documentation Lead   │
                             └───────────────────────────────────────────────────┘
```

---

## 3. General Agent Operating Principles

1. **Strict Plan Scope Enforcement:** A plan agent must NEVER allow features belonging to a higher tier without explicit human owner approval and an upgraded contract.
2. **Modular Cloud Abstraction:** Never hard-code Render or provider-specific APIs into core business logic. All deployments must pass through `platform/deployment-adapters/`.
3. **No Phantom Testing / No Fake Claims:** Never claim a test passed, a container deployed, or a WhatsApp message delivered unless direct verified machine output confirms it. If an external service or credential is unavailable, mark it honestly as `NOT RUN — external credentials/service required`.
4. **Preserve Working Existing Systems:** Do not overwrite, refactor, or delete the existing demo clinic (`demos/him/`, `demos/aurelia-dental/`) or the outreach engine (`clinic-outreach-campaign/`). All new platform assets reside strictly in `clinic-website-platform/`.
5. **Human Production Approval Boundary:** Automated systems (including WhatsApp image replacements and new code deployments) require human confirmation unless explicitly set to `AUTO_PUBLISH_ALLOWED` for pre-approved safe content slots.

---

## 4. Folder Responsibilities & Allowed Boundaries

| Directory | Scope & Purpose | Permitted Agents | Forbidden Operations |
| :--- | :--- | :--- | :--- |
| `platform/control-plane/` | Central registry, client lifecycle, config schema | Requirements Agent, Backend Agent | Direct client asset mutation |
| `platform/client-configs/` | Per-client JSON configurations (`client.config.json`) | Requirements Agent, Documentation Agent | Hardcoding credentials |
| `platform/templates/` | Standardized component templates (Vite, HTML, TailWind) | Frontend Agent, UI/UX Agent | Inserting hardcoded clinic names |
| `platform/deployment-adapters/`| Cloud abstractions (Render, Vercel, VPS) | Deployment Agent, DevOps Lead | Business logic execution |
| `services/api/` | Express / Node.js backend routes and controllers | Backend/API Agent, Security Agent | Frontend rendering |
| `services/whatsapp-gateway/` | WAHA HTTP API integration and webhooks | WhatsApp/WAHA Agent, Security Agent | Direct DOM modification |
| `services/automation-worker/`| Asynchronous queues, image transformation | Content Automation, Image Processing | Bypassing approval checks |
| `infrastructure/docker/` | Dockerfiles, Docker Compose, WAHA configs | DevOps / WhatsApp Agent | Checking in private keys |
| `clients/<client-id>/` | Sandboxed client workspace, static files, assets | Frontend, Content Automation | Modifying other client folders |
| `tests/` | Automated unit, integration, e2e, and security tests | Testing Agent, Security Agent | Mocking tests to bypass failures |
| `docs/` | Architecture, runbooks, schemas, changelogs | Documentation Agent, All Agents | Out-of-date diagrams |

---

## 5. Security & Tenant Isolation Rules

1. **Row-Level & Schema Isolation:** Every database entity (appointments, messages, images, audit records) MUST carry a validated `client_id`. Cross-tenant queries are strictly forbidden.
2. **Zero Client-Side Secrets:** Neither the WAHA API key (`WAHA_API_KEY`), database connection strings, nor JWT secrets may ever be delivered to the client browser or included in frontend source files.
3. **Sanitized Medical Compliance:** Do not log or store full unmasked patient phone numbers, raw patient health complaints, or protected health information (PHI) in plaintext logs.
4. **Webhook Signature Verification:** All incoming WhatsApp webhooks from WAHA must be cryptographically verified against `WAHA_WEBHOOK_SECRET` before processing.
5. **Safe Image Processing:** Uploaded images must be verified by MIME magic bytes (not file extension alone), stripped of EXIF metadata, virus/malware scanned, and restricted to a max dimension of 2000px.

---

## 6. Testing & Quality Gates

Every code release or content automation pipeline must pass through four distinct gates:
1. **Gate 1 — Static Analysis:** Linting and TypeScript type checking (`tsc --noEmit`).
2. **Gate 2 — Unit & Integration Tests:** Run local test suite covering APIs, schemas, and phone normalizers.
3. **Gate 3 — Security Audit:** Scan for hardcoded credentials, open CORS policies, and unvalidated parameters.
4. **Gate 4 — Health Check & Live Probe:** Verify `GET /health` or `GET /api/health` returns HTTP 200 and database/WAHA connectivity.

---

## 7. Escalation Protocol
If an agent encounters any of the following, it must immediately pause and escalate to the **Human Owner**:
- Client requests features outside their purchased plan.
- WhatsApp reports authentication failure (`AUTH_FAILED` / `SCAN_QR_CODE` disconnected).
- Payment, billing, or domain registration decisions.
- Irreversible destructive database operations (`DROP TABLE`, database reset).
- Rate-limiting or temporary ban warnings from WhatsApp servers.

