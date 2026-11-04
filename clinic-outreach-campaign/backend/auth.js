import crypto from 'node:crypto';
import { db, verifyPassword, logAudit } from './db.js';

// In-memory token session store (maps token -> { adminId, username, expiresAt })
const sessions = new Map();
const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export function authenticateAdmin(username, password, ip = '127.0.0.1') {
  if (!username || !password) {
    return { success: false, error: 'Username and password required.' };
  }

  const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username);
  if (!admin) {
    logAudit('LOGIN_FAILED', username, 'User not found', ip);
    return { success: false, error: 'Invalid username or password.' };
  }

  const isValid = verifyPassword(password, admin.password_hash, admin.salt);
  if (!isValid) {
    logAudit('LOGIN_FAILED', username, 'Password mismatch', ip);
    return { success: false, error: 'Invalid username or password.' };
  }

  // Generate secure session token
  const token = 'agy_adm_' + crypto.randomBytes(32).toString('hex');
  const sessionData = {
    adminId: admin.id,
    username: admin.username,
    expiresAt: Date.now() + SESSION_TTL_MS
  };
  sessions.set(token, sessionData);

  logAudit('LOGIN_SUCCESS', username, 'Admin authenticated successfully', ip);

  return {
    success: true,
    token,
    user: {
      id: admin.id,
      username: admin.username
    }
  };
}

export function validateSession(token) {
  if (!token) return null;
  const session = sessions.get(token);
  if (!session) return null;

  if (Date.now() > session.expiresAt) {
    sessions.delete(token);
    return null;
  }

  return session;
}

export function revokeSession(token, ip = '127.0.0.1') {
  if (sessions.has(token)) {
    const session = sessions.get(token);
    sessions.delete(token);
    logAudit('LOGOUT', session.username, 'Admin logged out', ip);
  }
}

// Express Middleware for protected admin routes
export function requireAdminAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;

  if (!token) {
    return res.status(401).json({
      error: 'Unauthorized: Admin authentication token required.',
      code: 'AUTH_REQUIRED'
    });
  }

  const session = validateSession(token);
  if (!session) {
    return res.status(401).json({
      error: 'Unauthorized: Session has expired or is invalid.',
      code: 'INVALID_TOKEN'
    });
  }

  req.admin = session;
  next();
}

