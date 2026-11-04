import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { previewContactsFile, commitImportedContacts } from './importer.js';
import { db } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const csvPath = path.resolve(rootDir, 'uploads', 'clinic_whatsapp_first_50_with_phone_only.csv');
console.log('[Seed] Parsing CSV at:', csvPath);

const preview = previewContactsFile(csvPath, false, 'clinic_whatsapp_first_50_with_phone_only.csv');
console.log('[Seed] Parsed summary:', preview.summary);

const validRows = preview.rows.filter(r => r.isValid);
const commit = commitImportedContacts(validRows, 'AutoSetup');
console.log(`[Seed] Imported ${commit.imported} contacts into SQLite database.`);

const defaultMsg = `Hello! 😊 I came across your clinic and had an idea that could help you make a stronger first impression online.

When patients search for a clinic, a professional website can help them *understand your services, build trust in your practice, and contact you more easily* — even before they visit.

I’ve created a quick demo to show how this could work for a clinic:
https://hiimesh0.github.io/leadgenapp/demos/him/dist/index.html

Would you be curious to see how your clinic could look online?`;

const contacts = db.prepare('SELECT * FROM contacts WHERE is_opted_out = 0').all();
console.log(`[Seed] Total active contacts available: ${contacts.length}`);

let campaign = db.prepare('SELECT id, name FROM campaigns WHERE name = ?').get('Clinic Outreach - Initial Wave');
if (!campaign) {
  const res = db.prepare(`
    INSERT INTO campaigns (name, status, message_template, personalize_clinic_name, batch_size, delay_seconds, total_recipients)
    VALUES ('Clinic Outreach - Initial Wave', 'DRAFT', ?, 1, 1, 10, ?)
  `).run(defaultMsg, contacts.length);
  const campaignId = Number(res.lastInsertRowid);

  const recStmt = db.prepare(`
    INSERT INTO campaign_recipients (campaign_id, contact_id, clinic_name, phone_number, chat_id, rendered_message, status)
    VALUES (?, ?, ?, ?, ?, ?, 'Pending')
  `);

  for (const c of contacts) {
    recStmt.run(campaignId, c.id, c.clinic_name, c.normalized_phone, c.chat_id, defaultMsg);
  }
  console.log(`[Seed] ✅ Created initial Campaign #${campaignId} with ${contacts.length} recipients ready for test verification & sending!`);
} else {
  console.log(`[Seed] Campaign #${campaign.id} "${campaign.name}" already initialized.`);
}

