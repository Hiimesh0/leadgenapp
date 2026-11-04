# Clinic WhatsApp Outreach Campaign Application

A standalone, production-ready WhatsApp Campaign and Clinic Outreach application built to run alongside existing clinic projects without modifying or depending on their frontend code.

The application securely reuses the existing **WAHA (WhatsApp HTTP API)** configuration to dispatch controlled outreach messages to clinic lead directories.

---

## 🛡️ Project Isolation & Architecture Confirmation

- **Zero Modifications to Existing Projects:** All code, dependencies, database storage, uploads, logs, and server routes reside strictly inside the `clinic-outreach-campaign/` directory.
- **Independent Execution:** Operates on its own Node.js Express server on port `5050` (or configured `PORT`).
- **Safe WAHA Integration:** Server-side proxy for all WAHA HTTP requests. WAHA API keys and secrets are never exposed to client browsers.
- **Persistent State:** Uses SQLite (`node:sqlite` in WAL mode) for campaign states, contact registry, recipient logs, and audit logs.

```
business/
├── AI-1-CRORE-MISSION/         # [UNTOUCHED] Existing website & business materials
├── demos/him/                  # [UNTOUCHED] Existing XYZ Dental website & WAHA setup
├── clinic-outreach-campaign/   # [NEW APPLICATION] Completely isolated
│   ├── backend/
│   │   ├── auth.js             # PBKDF2 hashing & Bearer token admin auth
│   │   ├── db.js               # SQLite connection & schema initialization
│   │   ├── importer.js         # CSV & Excel contact parser and validator
│   │   ├── phoneUtils.js       # Indian phone normalizer (E.164 / @c.us format)
│   │   ├── queueManager.js     # Controlled rate-limited queue with countdown
│   │   ├── server.js           # Express API server & static dashboard host
│   │   ├── wahaService.js      # Robust WAHA API client & health prober
│   │   ├── routes/             # REST endpoints (auth, waha, contacts, campaigns)
│   │   └── tests/              # 13-point automated test suite
│   ├── database/
│   │   ├── schema.sql          # SQL table definitions and indexes
│   │   └── campaigns.db        # SQLite database file (WAL mode)
│   ├── frontend/
│   │   ├── index.html          # Admin SPA dashboard
│   │   ├── css/styles.css      # WhatsApp simulation & dashboard styling
│   │   └── js/app.js           # Dashboard UI logic, real-time polling & state
│   ├── uploads/
│   │   └── clinic_whatsapp_first_50_with_phone_only.csv
│   ├── logs/
│   │   └── audit.log           # Security & compliance audit trail
│   ├── .env.example            # Environment configuration template
│   ├── .gitignore              # Ignores db, logs, node_modules
│   ├── package.json            # Application dependencies and scripts
│   └── README.md               # Complete application documentation
```

---

## 🛠️ Technology Stack

- **Runtime:** Node.js (v20+ / v24 tested)
- **Backend Framework:** Express 4.x
- **Database Engine:** Embedded SQLite (`node:sqlite` DatabaseSync) with Write-Ahead Logging (WAL)
- **Excel & CSV Parsing:** `xlsx` (SheetJS)
- **File Uploads:** `multer` (in-memory buffer parsing)
- **Frontend Dashboard:** HTML5, Tailwind CSS, Lucide Icons, Vanilla JavaScript SPA
- **Integration Engine:** WAHA (WhatsApp HTTP API via Docker)

---

## 🚀 Quick Start Guide

### 1. Install Dependencies

Navigate into the application folder:

```bash
cd clinic-outreach-campaign
pnpm install
# or: npm install
```

### 2. Configure Environment Variables

Create `.env` from the provided `.env.example`:

```bash
cp .env.example .env
```

Ensure your `.env` contains:

```ini
PORT=5050
NODE_ENV=development

# Admin Dashboard Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=AdminOutreach@2026

# Existing WAHA Configuration
WAHA_BASE_URL=http://localhost:3008
WAHA_API_KEY=50100d00397b43cdb9f8a61599cd2f94
WAHA_SESSION=default
WAHA_ENABLED=true

# Conservative Sending Queue Defaults
DEFAULT_BATCH_SIZE=1
DEFAULT_DELAY_SECONDS=10
```

### 3. Start the Outreach Application

Run in production mode:

```bash
pnpm start
# or: npm start
```

For development with hot auto-reload:

```bash
pnpm dev
# or: npm run dev
```

The application will start on:
👉 **`http://localhost:5050/admin/whatsapp-campaigns`**

---

## 🔑 Default Administrator Login

When you open `http://localhost:5050/admin/whatsapp-campaigns`:

- **Username:** `admin`
- **Password:** `AdminOutreach@2026`

*(Credentials can be updated anytime in `.env`)*

---

## 📋 Step-by-Step Workflow

### Step 1: Import Contacts
1. Navigate to **Contacts & Import** tab.
2. Click **"Import Bundled 50 Clinics CSV"** to immediately parse `clinic_whatsapp_first_50_with_phone_only.csv`.
3. Or click **"Upload CSV / Excel"** to upload any custom clinic spreadsheet.
4. The system validates each row:
   - Normalizes Indian numbers (`+91 98250 99409` -> `+919825099409` / `919825099409@c.us`).
   - Detects invalid lengths or improper starting digits.
   - Identifies in-file and database duplicates.
   - Checks against the **Opt-Out Registry**.
5. Click **"Confirm & Save Contacts"** to commit valid leads to the database.

### Step 2: Customize Outreach Message & Preview
1. Navigate to **Message Editor** tab.
2. Review the default clinic outreach pitch or edit it with your customized copy.
3. Use the `{{clinic_name}}` token for automatic name personalization.
4. Support for WhatsApp bold formatting: `*important words*` will render bold in WhatsApp.
5. Review the **Live WhatsApp Mobile Preview** on the right side of the screen to inspect how the chat bubble, formatting, and link previews appear.
6. Click **"Reset to Default"** at any time to restore the original prompt message.

### Step 3: Pre-Flight Test Message Verification (Mandatory Safety Step)
To protect your WhatsApp account and prevent accidental spam dispatches, campaigns cannot be started without an administrator test:
1. Navigate to **Test & Verify** tab.
2. Enter your personal Indian WhatsApp number (e.g. `9825099409`).
3. Click **"Send Test WhatsApp Message via WAHA"**.
4. The server dispatches the test message through WAHA and displays the full raw response in the diagnostics console.
5. Check your phone. When verified, check the confirmation box:
   > *"I confirm that I received the test WhatsApp message on my device and formatting looks correct."*
6. Click **"Mark Test as Verified & Unlock Campaign Launch"**.

### Step 4: Launch Controlled Sending Queue
1. In the **Campaign Queue** tab, click **"Create New Campaign"**.
2. Specify:
   - Campaign Name (e.g. `Surat Dental Outreach - Batch 1`)
   - Batch Size (default: `1` message per interval)
   - Interval Delay (default: `10` seconds between dispatches)
3. The system confirms the total number of eligible recipients (all opted-out clinics are automatically excluded).
4. Click **"Start Queue"** to begin dispatches.
5. Watch the **real-time countdown timer** before each message is sent.
6. Controls available at all times:
   - **Pause Queue:** Instantly halts dispatches.
   - **Resume Queue:** Resumes from the last pending recipient.
   - **Cancel Campaign:** Stops remaining dispatches and marks remaining contacts as skipped.

### Step 5: Opt-Out & "Do Not Contact" Management
1. In the **Contacts & Import** table, click **"Opt-Out"** next to any clinic to immediately blacklist them from future dispatches.
2. View and manage all blacklisted clinics in the **Opt-Out Registry** tab.
3. Export the opt-out list as CSV at any time for compliance records.

### Step 6: Export Results
1. Click **"Export Campaign CSV"** on the live feed or in the **History & Export** tab.
2. Exports a comprehensive delivery report including:
   - Recipient ID & Clinic Name
   - Phone Number & WhatsApp Chat ID
   - Delivery Status (`Sent to WAHA`, `Failed`, `Skipped`, `Opted Out`)
   - WAHA Message ID
   - Attempt Timestamp & Sent Timestamp
   - Error Details (if rejected by WAHA/WhatsApp)
   - Full Rendered Message Content

---

## ⚡ Safety Protocols & Spam Protections

1. **No Blasts:** Dispatches are processed sequentially with configurable human-like delays (5 to 60 seconds).
2. **Automatic Rate Limit Braking:** If WAHA or WhatsApp responds with HTTP 429, session disconnection, or unauthenticated state, the queue **automatically pauses itself**, records the error in the audit log, and notifies the administrator.
3. **Honest Delivery Status:** The application marks dispatches as **"Sent to WAHA"** upon successful API acceptance. It never fabricates "Delivered" or "Read" statuses unless confirmed.
4. **Immutable Active Messages:** Once a campaign is initiated, its message content is locked to prevent accidental modifications during sending.
5. **Persistent Queue Recovery:** If the Node server restarts during a campaign, the queue automatically recovers running campaigns from SQLite.

---

## 🧪 Automated Test Suite

Run the full 13-requirement automated test suite:

```bash
cd clinic-outreach-campaign
node backend/tests/test_suite.js
# or: npm test
```

### Verified Test Cases:
- [x] CSV import & parsing of bundled 50 clinics CSV
- [x] Phone normalization & invalid/duplicate number detection
- [x] Message template preview & `{{clinic_name}}` token interpolation
- [x] Pre-flight test message verification workflow
- [x] WAHA session failure handling & offline diagnostics
- [x] Campaign creation & recipient binding
- [x] Pause and resume queue functionality
- [x] Campaign cancellation & pending recipient skipping
- [x] Failed message tracking & status recording
- [x] Opt-out contact exclusion
- [x] Admin route protection & Bearer token authentication
- [x] API key protection (ensuring credentials are never leaked to client)
- [x] Critical isolation check (confirming 0 existing website files modified)

