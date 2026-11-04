/**
 * Phone Number Utilities for WhatsApp Campaign Integration
 * Normalizes Indian numbers to E.164 and WhatsApp JID format
 */

export function normalizeIndianPhone(inputPhone) {
  if (!inputPhone || typeof inputPhone !== 'string') {
    return {
      isValid: false,
      reason: 'Empty or invalid phone number input'
    };
  }

  // Strip all non-digit characters
  const digits = inputPhone.replace(/\D/g, '');

  if (!digits) {
    return {
      isValid: false,
      reason: 'Phone number contains no numeric digits'
    };
  }

  let clean = digits;

  // 1. If starts with 0 (e.g. 09825099409 - 11 digits), strip 0
  if (clean.startsWith('0') && clean.length === 11) {
    clean = clean.slice(1);
  }

  // 2. If 10 digits starting with 6, 7, 8, 9 (standard Indian mobile)
  if (clean.length === 10 && /^[6-9]/.test(clean)) {
    clean = '91' + clean;
  }

  // 3. If 12 digits starting with 91 and next digit is 6, 7, 8, 9
  if (clean.length === 12 && clean.startsWith('91') && /^[6-9]/.test(clean.slice(2))) {
    const mobile10 = clean.slice(2);
    const formatted = `+91 ${mobile10.slice(0, 5)} ${mobile10.slice(5)}`;
    const masked = `+91 ${mobile10.slice(0, 2)}****${mobile10.slice(8)}`;
    const e164 = `+${clean}`;
    const chatId = `${clean}@c.us`;

    return {
      isValid: true,
      raw: inputPhone,
      cleanDigits: clean,
      mobile10,
      formatted,
      masked,
      e164,
      chatId
    };
  }

  // Check reasons for rejection
  if (clean.length < 10) {
    return {
      isValid: false,
      raw: inputPhone,
      reason: `Too short (${clean.length} digits). Standard mobile number must be 10 digits.`
    };
  }

  if (clean.length === 10 && !/^[6-9]/.test(clean)) {
    return {
      isValid: false,
      raw: inputPhone,
      reason: `Invalid starting digit (${clean[0]}). Indian mobile numbers must start with 6, 7, 8, or 9.`
    };
  }

  return {
    isValid: false,
    raw: inputPhone,
    reason: `Invalid phone number format (${clean.length} digits). Expected 10-digit Indian mobile.`
  };
}

export function maskPhone(phone) {
  if (!phone) return 'N/A';
  const clean = phone.replace(/\D/g, '');
  if (clean.length >= 10) {
    return `${clean.slice(0, 4)}****${clean.slice(-2)}`;
  }
  return phone;
}

