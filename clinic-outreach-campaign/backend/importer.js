import pkg from 'xlsx';
const { readFile, read, utils } = pkg;
const XLSX = { readFile, read, utils };
import fs from 'node:fs';
import { db, logAudit } from './db.js';
import { normalizeIndianPhone } from './phoneUtils.js';

/**
 * Identify column mappings dynamically based on header names
 */
function findColumnKey(row, potentialNames) {
  const keys = Object.keys(row);
  for (const name of potentialNames) {
    const found = keys.find(k => k.trim().toLowerCase() === name.toLowerCase());
    if (found) return found;
  }
  // Loose substring match
  for (const name of potentialNames) {
    const found = keys.find(k => k.trim().toLowerCase().includes(name.toLowerCase()));
    if (found) return found;
  }
  return null;
}

/**
 * Parse a CSV or Excel file and return an analytical preview without database modification
 */
export function previewContactsFile(filePathOrBuffer, isBuffer = false, filename = '') {
  let workbook;
  if (isBuffer) {
    workbook = XLSX.read(filePathOrBuffer, { type: 'buffer' });
  } else {
    workbook = XLSX.readFile(filePathOrBuffer);
  }

  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rawRows = XLSX.utils.sheet_to_json(sheet, { defval: '' });

  if (!rawRows || rawRows.length === 0) {
    return {
      success: false,
      error: 'The uploaded file is empty or contains no readable rows.'
    };
  }

  // Find column names from first row
  const sampleRow = rawRows[0];
  const nameKey = findColumnKey(sampleRow, ['Clinic Name', 'Clinic', 'Name', 'Doctor', 'Business Name', 'Hospital']);
  const phoneKey = findColumnKey(sampleRow, ['Phone Number', 'Phone', 'Mobile', 'WhatsApp', 'Contact Number', 'Contact']);
  const statusKey = findColumnKey(sampleRow, ['Contact Permission / Outreach Status', 'Outreach Status', 'Status', 'Permission']);

  if (!nameKey || !phoneKey) {
    return {
      success: false,
      error: `Could not identify required columns. Found headers: [${Object.keys(sampleRow).join(', ')}]. Expected at least a "Clinic Name" and "Phone Number" column.`
    };
  }

  // Pre-load existing database contacts for duplicate/opt-out cross checking
  const existingDbContacts = db.prepare('SELECT id, normalized_phone, is_opted_out FROM contacts').all();
  const dbPhoneMap = new Map();
  for (const c of existingDbContacts) {
    dbPhoneMap.set(c.normalized_phone, c);
  }

  const processedRows = [];
  const seenFilePhones = new Set();
  let validCount = 0;
  let invalidCount = 0;
  let duplicateCount = 0;
  let optedOutCount = 0;

  rawRows.forEach((row, index) => {
    const rawName = String(row[nameKey] || '').trim();
    const rawPhone = String(row[phoneKey] || '').trim();
    const rawStatus = statusKey ? String(row[statusKey] || '').trim() : '';

    if (!rawName && !rawPhone) {
      // Empty row, skip
      return;
    }

    const phoneValidation = normalizeIndianPhone(rawPhone);
    let isValid = phoneValidation.isValid;
    let isDuplicate = false;
    let isOptedOut = false;
    let flagReason = '';

    if (!rawName) {
      isValid = false;
      flagReason = 'Missing clinic name';
    } else if (!isValid) {
      flagReason = phoneValidation.reason;
    } else {
      const normalizedPhone = phoneValidation.e164;

      // Check duplicate within the uploaded file
      if (seenFilePhones.has(normalizedPhone)) {
        isDuplicate = true;
        isValid = false;
        flagReason = 'Duplicate phone number in this file';
      } else {
        seenFilePhones.add(normalizedPhone);

        // Check against existing database
        const existingInDb = dbPhoneMap.get(normalizedPhone);
        if (existingInDb) {
          if (existingInDb.is_opted_out) {
            isOptedOut = true;
            isValid = false;
            flagReason = 'Contact is previously marked as OPTED-OUT';
          } else {
            flagReason = 'Already exists in database (will update if confirmed)';
          }
        }
      }
    }

    // Check if status column explicitly indicates opt-out
    if (rawStatus.toLowerCase().includes('opt') || rawStatus.toLowerCase().includes('do not contact')) {
      isOptedOut = true;
      isValid = false;
      flagReason = 'Explicitly marked Do Not Contact in status column';
    }

    if (isOptedOut) optedOutCount++;
    else if (isDuplicate) duplicateCount++;
    else if (!isValid) invalidCount++;
    else validCount++;

    processedRows.push({
      rowIndex: index + 1,
      clinicName: rawName || '(Unknown Clinic)',
      rawPhone: rawPhone || 'N/A',
      normalizedPhone: phoneValidation.e164 || null,
      formattedPhone: phoneValidation.formatted || rawPhone,
      chatId: phoneValidation.chatId || null,
      isValid,
      isDuplicate,
      isOptedOut,
      flagReason,
      notes: rawStatus
    });
  });

  return {
    success: true,
    summary: {
      totalRows: processedRows.length,
      validContacts: validCount,
      invalidContacts: invalidCount,
      duplicateContacts: duplicateCount,
      optedOutContacts: optedOutCount
    },
    detectedColumns: {
      nameColumn: nameKey,
      phoneColumn: phoneKey,
      statusColumn: statusKey
    },
    rows: processedRows
  };
}

/**
 * Commit approved preview rows to the database
 */
export function commitImportedContacts(contactsToImport, adminUsername = 'admin', ip = '127.0.0.1') {
  if (!Array.isArray(contactsToImport) || contactsToImport.length === 0) {
    return { success: false, error: 'No valid contacts provided for import.' };
  }

  const insertStmt = db.prepare(`
    INSERT INTO contacts (clinic_name, raw_phone, normalized_phone, chat_id, notes, is_opted_out)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(normalized_phone) DO UPDATE SET
      clinic_name = excluded.clinic_name,
      raw_phone = excluded.raw_phone,
      notes = excluded.notes,
      updated_at = CURRENT_TIMESTAMP
  `);

  let imported = 0;
  let skipped = 0;

  for (const item of contactsToImport) {
    if (!item.normalizedPhone || !item.chatId) {
      skipped++;
      continue;
    }

    const isOptedOut = item.isOptedOut ? 1 : 0;
    insertStmt.run(
      item.clinicName.trim(),
      item.rawPhone.trim(),
      item.normalizedPhone.trim(),
      item.chatId.trim(),
      item.notes || '',
      isOptedOut
    );
    imported++;
  }

  logAudit(
    'IMPORT_CONTACTS',
    adminUsername,
    `Imported ${imported} contacts (Skipped: ${skipped})`,
    ip
  );

  return {
    success: true,
    imported,
    skipped
  };
}
