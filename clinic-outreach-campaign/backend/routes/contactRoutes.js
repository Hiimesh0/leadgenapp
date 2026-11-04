import express from 'express';
import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { requireAdminAuth } from '../auth.js';
import { previewContactsFile, commitImportedContacts } from '../importer.js';
import { db, logAudit } from '../db.js';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.resolve(__dirname, '..', '..', 'uploads');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (['.csv', '.xlsx', '.xls'].includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only CSV, XLSX, and XLS file formats are supported.'));
    }
  }
});

router.use(requireAdminAuth);

/**
 * Preview uploaded CSV or Excel file
 */
router.post('/upload-preview', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Please select a CSV or Excel file to upload.' });
  }

  try {
    const preview = previewContactsFile(req.file.buffer, true, req.file.originalname);
    res.json(preview);
  } catch (err) {
    res.status(500).json({ error: `File parsing error: ${err.message}` });
  }
});

/**
 * Load the bundled clinic_whatsapp_first_50_with_phone_only.csv file
 */
router.post('/load-initial-csv', (req, res) => {
  const filePath = path.resolve(uploadsDir, 'clinic_whatsapp_first_50_with_phone_only.csv');
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Initial contact file not found in uploads directory.' });
  }

  try {
    const preview = previewContactsFile(filePath, false, 'clinic_whatsapp_first_50_with_phone_only.csv');
    res.json(preview);
  } catch (err) {
    res.status(500).json({ error: `Initial CSV parsing error: ${err.message}` });
  }
});

/**
 * Confirm and import contacts into database
 */
router.post('/confirm-import', (req, res) => {
  const { contacts } = req.body;
  if (!Array.isArray(contacts) || contacts.length === 0) {
    return res.status(400).json({ error: 'No contacts provided to import.' });
  }

  const ip = req.ip || '127.0.0.1';
  const result = commitImportedContacts(contacts, req.admin.username, ip);
  res.json(result);
});

/**
 * Get list of contacts with filtering & search
 */
router.get('/', (req, res) => {
  const { search, filter, limit = 100, offset = 0 } = req.query;

  let query = 'SELECT * FROM contacts WHERE 1=1';
  const params = [];

  if (search) {
    query += ' AND (clinic_name LIKE ? OR raw_phone LIKE ? OR normalized_phone LIKE ?)';
    const term = `%${search}%`;
    params.push(term, term, term);
  }

  if (filter === 'opted_out') {
    query += ' AND is_opted_out = 1';
  } else if (filter === 'active') {
    query += ' AND is_opted_out = 0';
  }

  query += ' ORDER BY id DESC LIMIT ? OFFSET ?';
  params.push(Number(limit), Number(offset));

  const contacts = db.prepare(query).all(...params);

  // Overall counts
  const totalCount = db.prepare('SELECT COUNT(*) as count FROM contacts').get().count;
  const optedOutCount = db.prepare('SELECT COUNT(*) as count FROM contacts WHERE is_opted_out = 1').get().count;
  const activeCount = totalCount - optedOutCount;

  res.json({
    contacts,
    counts: {
      total: totalCount,
      active: activeCount,
      optedOut: optedOutCount
    }
  });
});

/**
 * Toggle opt-out status for a contact
 */
router.post('/:id/toggle-opt-out', (req, res) => {
  const contactId = Number(req.params.id);
  const { reason } = req.body;

  const contact = db.prepare('SELECT * FROM contacts WHERE id = ?').get(contactId);
  if (!contact) {
    return res.status(404).json({ error: 'Contact not found' });
  }

  const newStatus = contact.is_opted_out === 1 ? 0 : 1;
  const optReason = newStatus === 1 ? (reason || 'Marked as Do Not Contact by Admin') : null;

  db.prepare(`
    UPDATE contacts 
    SET is_opted_out = ?, opt_out_reason = ?, updated_at = CURRENT_TIMESTAMP 
    WHERE id = ?
  `).run(newStatus, optReason, contactId);

  logAudit(
    newStatus === 1 ? 'OPT_OUT_ADDED' : 'OPT_OUT_REMOVED',
    req.admin.username,
    `Contact #${contactId} (${contact.clinic_name}) opt-out set to ${newStatus}`
  );

  res.json({
    success: true,
    isOptedOut: newStatus === 1,
    reason: optReason
  });
});

/**
 * Export contacts or opt-out list as CSV
 */
router.get('/export', (req, res) => {
  const { filter } = req.query;
  let sql = 'SELECT * FROM contacts';
  if (filter === 'opted_out') {
    sql += ' WHERE is_opted_out = 1';
  }
  sql += ' ORDER BY id ASC';

  const rows = db.prepare(sql).all();

  const headers = ['Contact ID', 'Clinic Name', 'Phone Number', 'Normalized Phone', 'WhatsApp Chat ID', 'Is Opted Out', 'Opt Out Reason', 'Created At'];
  const csvRows = [headers.join(',')];

  for (const r of rows) {
    const escapeCsv = (val) => `"${String(val || '').replace(/"/g, '""')}"`;
    csvRows.push([
      r.id,
      escapeCsv(r.clinic_name),
      escapeCsv(r.raw_phone),
      escapeCsv(r.normalized_phone),
      escapeCsv(r.chat_id),
      r.is_opted_out === 1 ? 'YES' : 'NO',
      escapeCsv(r.opt_out_reason),
      escapeCsv(r.created_at)
    ].join(','));
  }

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename="contacts_${filter || 'all'}_${Date.now()}.csv"`);
  res.send(csvRows.join('\n'));
});

export default router;

