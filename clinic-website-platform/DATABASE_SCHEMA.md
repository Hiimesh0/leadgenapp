# DATABASE_SCHEMA.md — Multi-Tenant Healthcare Data Architecture
## Schema Specifications, Entity Relationships & Indexing

---

## 1. Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    CLIENTS ||--o{ DOCTORS : employs
    CLIENTS ||--o{ APPOINTMENTS : books
    CLIENTS ||--o{ ENQUIRIES : receives
    CLIENTS ||--o{ AUTHORIZED_WHATSAPP_NUMBERS : authorizes
    CLIENTS ||--o{ CONTENT_SLOTS : configures
    CLIENTS ||--o{ MEDIA_ASSETS : owns
    CLIENTS ||--o{ AUDIT_LOGS : records

    CLIENTS {
        string id PK "e.g. clinic-surat-001"
        string name "Clinic Display Name"
        string slug UK "Unique URL subdomain"
        string plan_tier "Starter | Pro | Premium | Enterprise"
        string phone "Primary clinic contact"
        string address "Physical address"
        datetime created_at
    }

    DOCTORS {
        string id PK
        string client_id FK
        string name "Dr. XYZ"
        string email UK
        string password_hash
        string role "Chief Doctor | Associate"
        datetime created_at
    }

    APPOINTMENTS {
        string id PK
        string client_id FK
        string appointment_ref UK
        string patient_name
        string phone "E.164 normalized"
        string masked_phone "+91 98***45"
        string service_id
        string service_name
        date preferred_date
        string preferred_time
        string status "Pending | Confirmed | Cancelled"
        string waha_status "Sent to WAHA | Failed"
        datetime created_at
    }

    AUTHORIZED_WHATSAPP_NUMBERS {
        string id PK
        string client_id FK
        string phone_number UK "E.164 format"
        string chat_id "phone@c.us"
        string contact_name
        int can_update_content "1 or 0"
        datetime created_at
    }

    CONTENT_SLOTS {
        string id PK
        string client_id FK
        string slot_key "hero_banner | announcement"
        string current_asset_id FK
        string automation_mode "APPROVAL_REQUIRED | AUTO_PUBLISH"
        datetime updated_at
    }

    MEDIA_ASSETS {
        string id PK
        string client_id FK
        string file_path "assets/images/uuid.webp"
        string original_filename
        string sha256_hash UK
        string mime_type "image/webp"
        int file_size_bytes
        datetime created_at
    }

    AUDIT_LOGS {
        int id PK
        string client_id FK
        string actor
        string action
        string details "JSON metadata"
        datetime timestamp
    }
```

---

## 2. DDL Schema Definition (SQLite & PostgreSQL Compatible)

```sql
-- Clients Table
CREATE TABLE IF NOT EXISTS clients (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  plan_tier TEXT NOT NULL CHECK(plan_tier IN ('STARTER', 'PROFESSIONAL', 'PREMIUM', 'ENTERPRISE')),
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Authorized WhatsApp Senders (For Image Updates)
CREATE TABLE IF NOT EXISTS authorized_whatsapp_numbers (
  id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  phone_number TEXT UNIQUE NOT NULL,
  chat_id TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  can_update_content INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
  id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  appointment_ref TEXT UNIQUE NOT NULL,
  patient_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  masked_phone TEXT NOT NULL,
  service_id TEXT NOT NULL,
  service_name TEXT NOT NULL,
  preferred_date TEXT NOT NULL,
  preferred_time TEXT NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'Pending' CHECK(status IN ('Pending', 'Confirmed', 'Rescheduled', 'Completed', 'Cancelled')),
  waha_status TEXT DEFAULT 'Not Sent',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for High-Speed Multi-Tenant Filtering
CREATE INDEX IF NOT EXISTS idx_appointments_client ON appointments(client_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(preferred_date);
CREATE INDEX IF NOT EXISTS idx_auth_numbers_client ON authorized_whatsapp_numbers(client_id);
```

