import { db, logAudit } from './db.js';
import { wahaCampaignService } from './wahaService.js';

export class QueueManager {
  constructor() {
    this.activeCampaignId = null;
    this.state = 'IDLE'; // IDLE, RUNNING, PAUSED, CANCELLED, COMPLETED
    this.nextDispatchTime = 0;
    this.timer = null;
    this.isProcessingBatch = false;
    this.lastError = null;

    // Check on startup if there is any campaign left in RUNNING state from a previous crash/restart
    this.recoverActiveCampaign();
  }

  recoverActiveCampaign() {
    try {
      const runningCampaign = db.prepare(`SELECT id, name, status FROM campaigns WHERE status = 'RUNNING' ORDER BY id DESC LIMIT 1`).get();
      if (runningCampaign) {
        console.log(`[QueueManager] Found previously running campaign #${runningCampaign.id} (${runningCampaign.name}). Resuming queue.`);
        this.resume(runningCampaign.id, 'System Recovery');
      }
    } catch (err) {
      console.error('[QueueManager] Recovery error:', err);
    }
  }

  getSnapshot() {
    let secondsRemaining = 0;
    if (this.state === 'RUNNING' && this.nextDispatchTime > Date.now()) {
      secondsRemaining = Math.max(0, Math.ceil((this.nextDispatchTime - Date.now()) / 1000));
    }

    let campaignInfo = null;
    if (this.activeCampaignId) {
      campaignInfo = db.prepare(`
        SELECT id, name, status, total_recipients, sent_count, failed_count, skipped_count, batch_size, delay_seconds, started_at
        FROM campaigns WHERE id = ?
      `).get(this.activeCampaignId);
    }

    return {
      activeCampaignId: this.activeCampaignId,
      queueState: this.state,
      secondsRemaining,
      isProcessingBatch: this.isProcessingBatch,
      lastError: this.lastError,
      campaign: campaignInfo || null
    };
  }

  async start(campaignId, adminUsername = 'admin') {
    const campaign = db.prepare('SELECT * FROM campaigns WHERE id = ?').get(campaignId);
    if (!campaign) {
      return { success: false, error: 'Campaign not found' };
    }

    if (campaign.test_verified !== 1) {
      return {
        success: false,
        error: 'Safety Requirement: A test message must be sent and verified by an administrator before launching this campaign.'
      };
    }

    if (this.state === 'RUNNING' && this.activeCampaignId !== campaignId) {
      return {
        success: false,
        error: `Another campaign (#${this.activeCampaignId}) is currently running. Please pause or cancel it first.`
      };
    }

    // Check WAHA health before starting
    const wahaStatus = await wahaCampaignService.getStatus();
    if (!wahaStatus.connected) {
      return {
        success: false,
        error: `Cannot start campaign: WAHA is not connected (${wahaStatus.label}). Error: ${wahaStatus.error || 'Check WAHA'}`
      };
    }

    this.activeCampaignId = campaignId;
    this.state = 'RUNNING';
    this.lastError = null;

    // Reset any recipients stuck in 'Sending' from previous pauses/exceptions back to 'Pending'
    db.prepare(`UPDATE campaign_recipients SET status = 'Pending' WHERE campaign_id = ? AND status = 'Sending'`).run(campaignId);

    db.prepare(`UPDATE campaigns SET status = 'RUNNING', started_at = COALESCE(started_at, CURRENT_TIMESTAMP) WHERE id = ?`)
      .run(campaignId);

    logAudit('CAMPAIGN_STARTED', adminUsername, `Campaign #${campaignId} started`);

    this.scheduleNextDispatch(0); // Trigger first batch immediately

    return { success: true, message: `Campaign #${campaignId} started.` };
  }

  pause(campaignId, adminUsername = 'admin', reason = 'Manual pause by admin') {
    if (this.activeCampaignId !== campaignId && this.state !== 'RUNNING') {
      // Just update DB in case it was running
      db.prepare(`UPDATE campaigns SET status = 'PAUSED' WHERE id = ?`).run(campaignId);
      return { success: true, message: 'Campaign paused' };
    }

    this.state = 'PAUSED';
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    db.prepare(`UPDATE campaigns SET status = 'PAUSED' WHERE id = ?`).run(campaignId);
    logAudit('CAMPAIGN_PAUSED', adminUsername, `Campaign #${campaignId} paused: ${reason}`);

    return { success: true, message: `Campaign #${campaignId} paused.` };
  }

  async resume(campaignId, adminUsername = 'admin') {
    const campaign = db.prepare('SELECT * FROM campaigns WHERE id = ?').get(campaignId);
    if (!campaign) {
      return { success: false, error: 'Campaign not found' };
    }

    // Check WAHA health
    const wahaStatus = await wahaCampaignService.getStatus();
    if (!wahaStatus.connected) {
      return {
        success: false,
        error: `Cannot resume: WAHA WhatsApp session is not active (${wahaStatus.label}).`
      };
    }

    this.activeCampaignId = campaignId;
    this.state = 'RUNNING';
    this.lastError = null;

    // Reset any recipients stuck in 'Sending' from previous pauses/exceptions back to 'Pending'
    db.prepare(`UPDATE campaign_recipients SET status = 'Pending' WHERE campaign_id = ? AND status = 'Sending'`).run(campaignId);

    db.prepare(`UPDATE campaigns SET status = 'RUNNING' WHERE id = ?`).run(campaignId);
    logAudit('CAMPAIGN_RESUMED', adminUsername, `Campaign #${campaignId} resumed`);

    this.scheduleNextDispatch(1000);

    return { success: true, message: `Campaign #${campaignId} resumed.` };
  }

  cancel(campaignId, adminUsername = 'admin', reason = 'Cancelled by administrator') {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    this.state = 'CANCELLED';
    this.activeCampaignId = null;

    db.prepare(`UPDATE campaigns SET status = 'CANCELLED', completed_at = CURRENT_TIMESTAMP WHERE id = ?`).run(campaignId);

    // Mark all remaining pending recipients as Skipped
    db.prepare(`
      UPDATE campaign_recipients 
      SET status = 'Skipped', error_details = 'Campaign cancelled by administrator' 
      WHERE campaign_id = ? AND status = 'Pending'
    `).run(campaignId);

    // Refresh counts
    this.syncCampaignCounters(campaignId);

    logAudit('CAMPAIGN_CANCELLED', adminUsername, `Campaign #${campaignId} cancelled: ${reason}`);

    return { success: true, message: `Campaign #${campaignId} cancelled.` };
  }

  scheduleNextDispatch(delayMs) {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.nextDispatchTime = Date.now() + delayMs;

    this.timer = setTimeout(async () => {
      await this.processNextBatch();
    }, delayMs);
  }

  async processNextBatch() {
    if (this.state !== 'RUNNING' || !this.activeCampaignId) {
      return;
    }

    this.isProcessingBatch = true;
    const campaignId = this.activeCampaignId;

    try {
      const campaign = db.prepare('SELECT * FROM campaigns WHERE id = ?').get(campaignId);
      if (!campaign || campaign.status !== 'RUNNING') {
        this.state = 'IDLE';
        this.activeCampaignId = null;
        this.isProcessingBatch = false;
        return;
      }

      const batchSize = Math.max(1, campaign.batch_size || 1);
      const delaySeconds = Math.max(5, campaign.delay_seconds || 10);

      // Fetch next batch of pending recipients
      const pendingRecipients = db.prepare(`
        SELECT r.*, c.is_opted_out
        FROM campaign_recipients r
        JOIN contacts c ON r.contact_id = c.id
        WHERE r.campaign_id = ? AND r.status = 'Pending'
        ORDER BY r.id ASC
        LIMIT ?
      `).all(campaignId, batchSize);

      if (pendingRecipients.length === 0) {
        // No more pending recipients! Mark campaign as COMPLETED
        db.prepare(`
          UPDATE campaigns 
          SET status = 'COMPLETED', completed_at = CURRENT_TIMESTAMP 
          WHERE id = ?
        `).run(campaignId);

        this.syncCampaignCounters(campaignId);
        this.state = 'COMPLETED';
        logAudit('CAMPAIGN_COMPLETED', 'QueueManager', `Campaign #${campaignId} finished successfully.`);
        this.activeCampaignId = null;
        this.isProcessingBatch = false;
        return;
      }

      for (const recipient of pendingRecipients) {
        // Check Opt-Out Status
        if (recipient.is_opted_out === 1) {
          db.prepare(`
            UPDATE campaign_recipients 
            SET status = 'Opted Out', error_details = 'Recipient has opted out of communications'
            WHERE id = ?
          `).run(recipient.id);
          continue;
        }

        // Set status to Sending
        db.prepare(`
          UPDATE campaign_recipients 
          SET status = 'Sending', attempt_time = CURRENT_TIMESTAMP 
          WHERE id = ?
        `).run(recipient.id);

        // Send via WAHA
        const result = await wahaCampaignService.sendTextMessage(recipient.chat_id, recipient.rendered_message);

        if (result.success) {
          // Status: "Sent to WAHA" (Never fabricate Delivered or Read)
          const safeMessageId = typeof result.messageId === 'object'
            ? (result.messageId?._serialized || result.messageId?.id || JSON.stringify(result.messageId))
            : String(result.messageId || 'waha-ok');

          db.prepare(`
            UPDATE campaign_recipients 
            SET status = 'Sent to WAHA', 
                waha_message_id = ?, 
                waha_response = ?, 
                sent_at = CURRENT_TIMESTAMP, 
                error_details = NULL
            WHERE id = ?
          `).run(
            safeMessageId,
            JSON.stringify(result.rawResponse || {}),
            Number(recipient.id)
          );
        } else {
          // Failure handling
          db.prepare(`
            UPDATE campaign_recipients 
            SET status = 'Failed', 
                error_details = ?, 
                waha_response = ?
            WHERE id = ?
          `).run(
            String(result.error || 'Unknown error'),
            JSON.stringify(result.rawResponse || {}),
            Number(recipient.id)
          );

          // If rate limited or unauthenticated, PAUSE THE QUEUE AUTOMATICALLY
          if (result.rateLimited || result.httpStatus === 429 || result.httpStatus === 401 || result.httpStatus === 422) {
            this.lastError = result.error;
            this.pause(campaignId, 'System Safety Protocol', `Automatic pause: ${result.error}`);
            this.isProcessingBatch = false;
            return;
          }
        }
      }

      // Sync progress numbers
      this.syncCampaignCounters(campaignId);

      // Check if still RUNNING before scheduling next batch
      if (this.state === 'RUNNING') {
        this.scheduleNextDispatch(delaySeconds * 1000);
      }

    } catch (err) {
      console.error('[QueueManager] Exception during batch processing:', err);
      this.lastError = err.message;
      this.pause(campaignId, 'Exception Handler', `Internal error: ${err.message}`);
    } finally {
      this.isProcessingBatch = false;
    }
  }

  syncCampaignCounters(campaignId) {
    try {
      const stats = db.prepare(`
        SELECT 
          COUNT(CASE WHEN status = 'Sent to WAHA' OR status = 'Delivered' THEN 1 END) as sent,
          COUNT(CASE WHEN status = 'Failed' THEN 1 END) as failed,
          COUNT(CASE WHEN status = 'Skipped' OR status = 'Opted Out' THEN 1 END) as skipped,
          COUNT(*) as total
        FROM campaign_recipients
        WHERE campaign_id = ?
      `).get(campaignId);

      db.prepare(`
        UPDATE campaigns 
        SET sent_count = ?, failed_count = ?, skipped_count = ?, total_recipients = ?
        WHERE id = ?
      `).run(stats.sent || 0, stats.failed || 0, stats.skipped || 0, stats.total || 0, campaignId);
    } catch (err) {
      console.error('[QueueManager] Counter sync error:', err);
    }
  }
}

export const queueManager = new QueueManager();

