import express from 'express';
import { requireAdminAuth } from '../auth.js';
import { db, logAudit } from '../db.js';
import { queueManager } from '../queueManager.js';

const router = express.Router();

router.use(requireAdminAuth);

/**
 * List all campaigns
 */
router.get('/', (req, res) => {
  const campaigns = db.prepare(`
    SELECT * FROM campaigns ORDER BY id DESC
  `).all();
  res.json({ campaigns });
});

/**
 * Create a new campaign
 */
router.post('/create', (req, res) => {
  const {
    name,
    messageTemplate,
    personalizeClinicName = true,
    batchSize = 1,
    delaySeconds = 10,
    contactIds = [] // Optional array of specific contact IDs; if empty, includes all active contacts
  } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Campaign name is required.' });
  }

  if (!messageTemplate || !messageTemplate.trim()) {
    return res.status(400).json({ error: 'Message template content is required.' });
  }

  const safeBatch = Math.min(10, Math.max(1, Number(batchSize) || 1));
  const safeDelay = Math.max(5, Number(delaySeconds) || 10);

  // Fetch candidate contacts (strictly exclude opted-out contacts)
  let contactsQuery = 'SELECT * FROM contacts WHERE is_opted_out = 0';
  let params = [];

  if (Array.isArray(contactIds) && contactIds.length > 0) {
    const placeholders = contactIds.map(() => '?').join(',');
    contactsQuery += ` AND id IN (${placeholders})`;
    params = contactIds;
  }

  const eligibleContacts = db.prepare(contactsQuery).all(...params);

  if (eligibleContacts.length === 0) {
    return res.status(400).json({
      error: 'No active recipients available. Either no contacts exist or all selected contacts are opted-out.'
    });
  }

  // Create Campaign in DRAFT state
  const campaignStmt = db.prepare(`
    INSERT INTO campaigns (
      name, status, message_template, personalize_clinic_name, batch_size, delay_seconds, total_recipients
    ) VALUES (?, 'DRAFT', ?, ?, ?, ?, ?)
  `);

  const result = campaignStmt.run(
    name.trim(),
    messageTemplate.trim(),
    personalizeClinicName ? 1 : 0,
    safeBatch,
    safeDelay,
    eligibleContacts.length
  );

  const campaignId = Number(result.lastInsertRowid);

  // Prepare recipient rows with rendered messages
  const recipientStmt = db.prepare(`
    INSERT INTO campaign_recipients (
      campaign_id, contact_id, clinic_name, phone_number, chat_id, rendered_message, status
    ) VALUES (?, ?, ?, ?, ?, ?, 'Pending')
  `);

  for (const contact of eligibleContacts) {
    let rendered = messageTemplate;
    if (personalizeClinicName) {
      rendered = rendered.replace(/\{\{\s*clinic_name\s*\}\}/gi, contact.clinic_name);
    } else {
      rendered = rendered.replace(/\{\{\s*clinic_name\s*\}\}/gi, 'Doctor');
    }

    recipientStmt.run(
      campaignId,
      contact.id,
      contact.clinic_name,
      contact.normalized_phone,
      contact.chat_id,
      rendered
    );
  }

  logAudit(
    'CAMPAIGN_CREATED',
    req.admin.username,
    `Created campaign #${campaignId} "${name}" with ${eligibleContacts.length} recipients`
  );

  res.json({
    success: true,
    campaignId,
    totalRecipients: eligibleContacts.length,
    message: `Campaign created with ${eligibleContacts.length} recipients. Next step: Send and verify a test message.`
  });
});

/**
 * Get campaign details and recipient breakdown
 */
router.get('/:id', (req, res) => {
  const campaignId = Number(req.params.id);
  const campaign = db.prepare('SELECT * FROM campaigns WHERE id = ?').get(campaignId);

  if (!campaign) {
    return res.status(404).json({ error: 'Campaign not found' });
  }

  const recipients = db.prepare(`
    SELECT * FROM campaign_recipients WHERE campaign_id = ? ORDER BY id ASC LIMIT 100
  `).all(campaignId);

  const statusSummary = db.prepare(`
    SELECT status, COUNT(*) as count 
    FROM campaign_recipients 
    WHERE campaign_id = ? 
    GROUP BY status
  `).all(campaignId);

  res.json({
    campaign,
    statusSummary,
    recipientsPreview: recipients
  });
});

/**
 * Live status & queue countdown for an active campaign
 */
router.get('/:id/status', (req, res) => {
  const campaignId = Number(req.params.id);
  const campaign = db.prepare('SELECT * FROM campaigns WHERE id = ?').get(campaignId);

  if (!campaign) {
    return res.status(404).json({ error: 'Campaign not found' });
  }

  const queueSnapshot = queueManager.getSnapshot();

  const counts = db.prepare(`
    SELECT 
      COUNT(CASE WHEN status = 'Pending' THEN 1 END) as pending,
      COUNT(CASE WHEN status = 'Sending' THEN 1 END) as sending,
      COUNT(CASE WHEN status = 'Sent to WAHA' THEN 1 END) as sent,
      COUNT(CASE WHEN status = 'Delivered' THEN 1 END) as delivered,
      COUNT(CASE WHEN status = 'Failed' THEN 1 END) as failed,
      COUNT(CASE WHEN status = 'Skipped' THEN 1 END) as skipped,
      COUNT(CASE WHEN status = 'Opted Out' THEN 1 END) as optedOut,
      COUNT(*) as total
    FROM campaign_recipients
    WHERE campaign_id = ?
  `).get(campaignId);

  const recentRecipients = db.prepare(`
    SELECT id, clinic_name, phone_number, status, waha_message_id, error_details, attempt_time, sent_at
    FROM campaign_recipients
    WHERE campaign_id = ?
    ORDER BY CASE WHEN status = 'Sending' THEN 0 WHEN status = 'Sent to WAHA' THEN 1 ELSE 2 END, id DESC
    LIMIT 25
  `).all(campaignId);

  res.json({
    campaignId,
    campaignStatus: campaign.status,
    testVerified: campaign.test_verified === 1,
    counts,
    queue: {
      activeCampaignId: queueSnapshot.activeCampaignId,
      queueState: queueSnapshot.queueState,
      secondsRemaining: queueSnapshot.secondsRemaining,
      isProcessingBatch: queueSnapshot.isProcessingBatch,
      lastError: queueSnapshot.lastError
    },
    recentRecipients
  });
});

/**
 * Administrator confirms test message receipt & verifies formatting
 */
router.post('/:id/confirm-test', (req, res) => {
  const campaignId = Number(req.params.id);
  const { testPhone, testResponse, confirmed } = req.body;

  if (!confirmed) {
    return res.status(400).json({ error: 'You must check the confirmation that the test message was received.' });
  }

  const campaign = db.prepare('SELECT id, status FROM campaigns WHERE id = ?').get(campaignId);
  if (!campaign) {
    return res.status(404).json({ error: 'Campaign not found' });
  }

  db.prepare(`
    UPDATE campaigns 
    SET test_phone = ?, test_response = ?, test_verified = 1, status = CASE WHEN status = 'DRAFT' THEN 'READY' ELSE status END
    WHERE id = ?
  `).run(testPhone || 'Verified', JSON.stringify(testResponse || {}), campaignId);

  logAudit(
    'TEST_MESSAGE_CONFIRMED',
    req.admin.username,
    `Admin confirmed test message for Campaign #${campaignId}`
  );

  res.json({
    success: true,
    message: 'Test message verified. Campaign is now ready to start.'
  });
});

/**
 * Start campaign sending queue
 */
router.post('/:id/start', async (req, res) => {
  const campaignId = Number(req.params.id);
  const result = await queueManager.start(campaignId, req.admin.username);

  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }

  res.json(result);
});

/**
 * Pause sending queue
 */
router.post('/:id/pause', (req, res) => {
  const campaignId = Number(req.params.id);
  const result = queueManager.pause(campaignId, req.admin.username);
  res.json(result);
});

/**
 * Resume sending queue
 */
router.post('/:id/resume', async (req, res) => {
  const campaignId = Number(req.params.id);
  const result = await queueManager.resume(campaignId, req.admin.username);

  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }

  res.json(result);
});

/**
 * Cancel campaign
 */
router.post('/:id/cancel', (req, res) => {
  const campaignId = Number(req.params.id);
  const result = queueManager.cancel(campaignId, req.admin.username);
  res.json(result);
});

/**
 * Export campaign recipients and audit delivery results to CSV
 */
router.get('/:id/export', (req, res) => {
  const campaignId = Number(req.params.id);
  const campaign = db.prepare('SELECT * FROM campaigns WHERE id = ?').get(campaignId);

  if (!campaign) {
    return res.status(404).json({ error: 'Campaign not found' });
  }

  const recipients = db.prepare(`
    SELECT * FROM campaign_recipients WHERE campaign_id = ? ORDER BY id ASC
  `).all(campaignId);

  const headers = [
    'Recipient ID',
    'Campaign Name',
    'Clinic Name',
    'Phone Number',
    'WhatsApp Chat ID',
    'Status',
    'WAHA Message ID',
    'Attempt Time',
    'Sent Time',
    'Error Details',
    'Rendered Message Content'
  ];

  const escapeCsv = (val) => `"${String(val || '').replace(/"/g, '""')}"`;

  const csvRows = [headers.join(',')];
  for (const r of recipients) {
    csvRows.push([
      r.id,
      escapeCsv(campaign.name),
      escapeCsv(r.clinic_name),
      escapeCsv(r.phone_number),
      escapeCsv(r.chat_id),
      escapeCsv(r.status),
      escapeCsv(r.waha_message_id),
      escapeCsv(r.attempt_time),
      escapeCsv(r.sent_at),
      escapeCsv(r.error_details),
      escapeCsv(r.rendered_message)
    ].join(','));
  }

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename="campaign_${campaignId}_results_${Date.now()}.csv"`);
  res.send(csvRows.join('\n'));
});

export default router;

