import express from 'express';
import { requireAdminAuth } from '../auth.js';
import { wahaCampaignService } from '../wahaService.js';
import { normalizeIndianPhone } from '../phoneUtils.js';
import { logAudit } from '../db.js';

const router = express.Router();

/**
 * Public/authenticated QR code image stream
 */
router.get('/qr', async (req, res) => {
  const result = await wahaCampaignService.getQrCodeBuffer();
  if (result.success && result.buffer) {
    res.setHeader('Content-Type', result.contentType || 'image/png');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    return res.send(result.buffer);
  }
  res.status(502).json({ error: result.error || 'QR code not available from WAHA.' });
});

router.use(requireAdminAuth);

/**
 * Health & Session status of WAHA
 */
router.get('/status', async (req, res) => {
  const status = await wahaCampaignService.getStatus();
  res.json(status);
});

/**
 * Force Auto-Detection & Reconnect of WAHA
 */
router.post('/auto-detect-key', async (req, res) => {
  const key = await wahaCampaignService.autoDetectKey();
  if (key) {
    const status = await wahaCampaignService.getStatus();
    return res.json({ success: true, key: `${key.slice(0, 6)}...`, status });
  }
  res.status(400).json({ success: false, error: 'Could not automatically validate any WAHA API key. Please verify Docker container.' });
});

/**
 * Manually update WAHA credentials
 */
router.post('/config', async (req, res) => {
  const { apiKey, baseUrl, session } = req.body;
  if (apiKey) {
    wahaCampaignService.persistKeyToEnv(apiKey.trim());
  }
  if (baseUrl) {
    wahaCampaignService.baseUrl = baseUrl.trim().replace(/\/+$/, '');
  }
  if (session) {
    wahaCampaignService.session = session.trim();
  }

  const status = await wahaCampaignService.getStatus();
  res.json({ success: true, status });
});

/**
 * Send a single test message to verify template, formatting, and WAHA delivery
 */
router.post('/test-message', async (req, res) => {
  const { phone, message, clinicName } = req.body;

  if (!phone) {
    return res.status(400).json({ error: 'Test phone number is required.' });
  }

  const phoneInfo = normalizeIndianPhone(phone);
  if (!phoneInfo.isValid) {
    return res.status(400).json({
      error: `Invalid test phone number: ${phoneInfo.reason}`
    });
  }

  let renderedText = message || '';
  if (clinicName) {
    renderedText = renderedText.replace(/\{\{\s*clinic_name\s*\}\}/gi, clinicName);
  } else {
    renderedText = renderedText.replace(/\{\{\s*clinic_name\s*\}\}/gi, 'Sample Clinic');
  }

  logAudit(
    'TEST_MESSAGE_DISPATCH',
    req.admin.username,
    `Dispatched test message to ${phoneInfo.masked}`
  );

  const result = await wahaCampaignService.sendTextMessage(phoneInfo.chatId, renderedText);

  res.json({
    success: result.success,
    status: result.status,
    phoneInfo: {
      raw: phone,
      formatted: phoneInfo.formatted,
      masked: phoneInfo.masked,
      chatId: phoneInfo.chatId
    },
    messageId: result.messageId || null,
    error: result.error || null,
    wahaResponse: result.rawResponse || null,
    attemptTime: result.attemptTime
  });
});

export default router;
