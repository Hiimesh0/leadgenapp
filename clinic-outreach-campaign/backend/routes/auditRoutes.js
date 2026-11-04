import express from 'express';
import { requireAdminAuth } from '../auth.js';
import { db } from '../db.js';

const router = express.Router();

router.use(requireAdminAuth);

router.get('/', (req, res) => {
  const limit = Math.min(100, Number(req.query.limit) || 50);
  const logs = db.prepare(`
    SELECT * FROM audit_logs ORDER BY id DESC LIMIT ?
  `).all(limit);

  res.json({ logs });
});

export default router;

