import express from 'express';
import { authenticateAdmin, revokeSession, validateSession } from '../auth.js';

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const ip = req.ip || req.connection.remoteAddress || '127.0.0.1';
  const result = authenticateAdmin(username, password, ip);

  if (!result.success) {
    return res.status(401).json({ error: result.error });
  }

  res.json({
    success: true,
    token: result.token,
    user: result.user
  });
});

router.post('/logout', (req, res) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;
  const ip = req.ip || '127.0.0.1';

  if (token) {
    revokeSession(token, ip);
  }

  res.json({ success: true, message: 'Logged out successfully.' });
});

router.get('/me', (req, res) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;

  const session = validateSession(token);
  if (!session) {
    return res.status(401).json({ authenticated: false });
  }

  res.json({
    authenticated: true,
    user: {
      id: session.adminId,
      username: session.username
    }
  });
});

export default router;

