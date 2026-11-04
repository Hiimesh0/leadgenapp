import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const dbPath = process.env.DB_PATH 
  ? (path.isAbsolute(process.env.DB_PATH) ? process.env.DB_PATH : path.resolve(rootDir, process.env.DB_PATH))
  : path.resolve(rootDir, 'database', 'campaigns.db');

// Ensure database and logs directories exist
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}
const logsDir = path.resolve(rootDir, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

export const db = new DatabaseSync(dbPath);

// Enable WAL mode for high performance concurrency
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');

// Initialize schema
const schemaPath = path.resolve(rootDir, 'database', 'schema.sql');
if (fs.existsSync(schemaPath)) {
  const schemaSql = fs.readFileSync(schemaPath, 'utf8');
  db.exec(schemaSql);
}

// Password hashing utilities using crypto.pbkdf2Sync
export function hashPassword(password, salt = null) {
  if (!salt) {
    salt = crypto.randomBytes(16).toString('hex');
  }
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return { hash, salt };
}

export function verifyPassword(password, storedHash, salt) {
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hash === storedHash;
}

// Seed default admin if table is empty
const adminUser = process.env.ADMIN_USERNAME || 'admin';
const adminPass = process.env.ADMIN_PASSWORD || 'AdminOutreach@2026';

const existingAdmin = db.prepare('SELECT id FROM admins WHERE username = ?').get(adminUser);
if (!existingAdmin) {
  const { hash, salt } = hashPassword(adminPass);
  db.prepare('INSERT INTO admins (username, password_hash, salt) VALUES (?, ?, ?)')
    .run(adminUser, hash, salt);
  console.log(`[Database] Initialized default admin user: "${adminUser}"`);
}

// File and database audit logger
export function logAudit(action, actor = 'System', details = '', ip = '127.0.0.1') {
  try {
    const serializedDetails = typeof details === 'object' ? JSON.stringify(details) : String(details);
    db.prepare('INSERT INTO audit_logs (action, actor, details, ip_address) VALUES (?, ?, ?, ?)')
      .run(action, actor, serializedDetails, ip);

    const logEntry = `[${new Date().toISOString()}] [${actor}] [${ip}] ${action}: ${serializedDetails}\n`;
    fs.appendFileSync(path.resolve(logsDir, 'audit.log'), logEntry, 'utf8');
  } catch (err) {
    console.error('[Database] Failed to write audit log:', err);
  }
}

