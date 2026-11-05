# SECURITY_POLICY.md — Healthcare Security & Data Privacy Policy
## Encryption, Isolation, Authentication & Compliance Mandates

---

## 1. Core Principles
1. **Confidentiality:** Patient booking data and personal contact information are private and protected.
2. **Multi-Tenant Isolation:** Strictly prohibit cross-clinic data leakage via mandatory indexed `client_id` constraints in all queries.
3. **Least Privilege:** Doctors and administrative staff only receive access to their clinic's records.

---

## 2. Secrets Management & Zero-Leakage Mandate
- `.env` files are strictly excluded from version control via `.gitignore`.
- Cloud secrets (`JWT_SECRET`, `WAHA_API_KEY`, `WAHA_WEBHOOK_SECRET`) must be injected exclusively through cloud environment variables (e.g. Render Dashboard).
- The `WAHA_API_KEY` is strictly held on the server side; frontend JavaScript bundles must never reference or bundle private credentials.

---

## 3. Medical Data Minimization & Masking
- The platform is designed strictly for **administrative appointment scheduling and public healthcare marketing**.
- Do not store diagnostic notes, medical histories, surgical details, or lab reports in this platform.
- Patient phone numbers must be masked in all visible logs and diagnostic outputs (e.g. `+91 98251 ****56`).

---

## 4. Webhook Security (WAHA Integration)
- Every incoming webhook from WAHA to `/webhook/waha` must be verified using HMAC SHA-256 header signatures or bearer API key validation.
- Unauthenticated or spoofed webhook payloads are dropped immediately and logged in security audits.

---

## 5. File Upload Sanitation
- Maximum upload size: 15 MB.
- Allowed MIME types: `image/jpeg`, `image/png`, `image/webp`.
- All incoming images must be stripped of EXIF metadata (camera serials, GPS location tags) before storage.

