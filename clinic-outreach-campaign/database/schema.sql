-- ==============================================================
-- Clinic WhatsApp Outreach Campaign Database Schema
-- ==============================================================

-- Administrators Table
CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    salt TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Contacts Master Table
CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    clinic_name TEXT NOT NULL,
    raw_phone TEXT NOT NULL,
    normalized_phone TEXT UNIQUE NOT NULL,
    chat_id TEXT NOT NULL,
    notes TEXT,
    is_opted_out INTEGER DEFAULT 0,
    opt_out_reason TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Campaigns Table
CREATE TABLE IF NOT EXISTS campaigns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'DRAFT', -- DRAFT, READY, RUNNING, PAUSED, COMPLETED, CANCELLED
    message_template TEXT NOT NULL,
    personalize_clinic_name INTEGER DEFAULT 1,
    batch_size INTEGER DEFAULT 1,
    delay_seconds INTEGER DEFAULT 10,
    test_phone TEXT,
    test_verified INTEGER DEFAULT 0,
    test_response TEXT,
    total_recipients INTEGER DEFAULT 0,
    sent_count INTEGER DEFAULT 0,
    failed_count INTEGER DEFAULT 0,
    skipped_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    started_at DATETIME,
    completed_at DATETIME
);

-- Campaign Recipients Table
CREATE TABLE IF NOT EXISTS campaign_recipients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    campaign_id INTEGER NOT NULL,
    contact_id INTEGER NOT NULL,
    clinic_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    chat_id TEXT NOT NULL,
    rendered_message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending', -- Pending, Sending, Sent to WAHA, Delivered, Failed, Skipped, Opted Out
    waha_message_id TEXT,
    waha_response TEXT,
    error_details TEXT,
    attempt_time DATETIME,
    sent_at DATETIME,
    FOREIGN KEY(campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE,
    FOREIGN KEY(contact_id) REFERENCES contacts(id)
);

-- Audit Logs Table
CREATE TABLE IF NOT EXISTS audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    action TEXT NOT NULL,
    actor TEXT NOT NULL,
    details TEXT,
    ip_address TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_contacts_normalized_phone ON contacts(normalized_phone);
CREATE INDEX IF NOT EXISTS idx_contacts_opted_out ON contacts(is_opted_out);
CREATE INDEX IF NOT EXISTS idx_recipients_campaign_status ON campaign_recipients(campaign_id, status);

