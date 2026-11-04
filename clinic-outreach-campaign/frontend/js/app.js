/**
 * Clinic WhatsApp Outreach Campaign Application Frontend
 */

const DEFAULT_MESSAGE = `Hello! 😊 I came across your clinic and had an idea that could help you make a stronger first impression online.

When patients search for a clinic, a professional website can help them *understand your services, build trust in your practice, and contact you more easily* — even before they visit.

I’ve created a quick demo to show how this could work for a clinic:
https://hiimesh0.github.io/leadgenapp/demos/him/dist/index.html

Would you be curious to see how your clinic could look online?`;

// State
let authToken = localStorage.getItem('agy_outreach_token') || null;
let currentUser = null;
let activeCampaignId = null;
let currentImportPreview = null;
let queuePollingInterval = null;
let contactsFilter = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
  if (window.lucide) {
    lucide.createIcons();
  }

  setupEventListeners();
  initMessageEditor();

  if (authToken) {
    const verified = await checkAuth();
    if (verified) {
      loadInitialData();
    } else {
      showLoginModal(true);
    }
  } else {
    showLoginModal(true);
  }
});

// ================= AUTHENTICATION =================
async function checkAuth() {
  try {
    const res = await fetch('/api/auth/me', {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    if (res.ok) {
      const data = await res.json();
      currentUser = data.user;
      document.getElementById('admin-display-name').textContent = currentUser.username;
      showLoginModal(false);
      return true;
    }
  } catch (err) {
    console.error('Auth verification failed', err);
  }
  authToken = null;
  localStorage.removeItem('agy_outreach_token');
  return false;
}

function showLoginModal(show) {
  const modal = document.getElementById('login-modal');
  if (show) {
    modal.classList.remove('hidden');
  } else {
    modal.classList.add('hidden');
  }
}

async function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value.trim();
  const errorEl = document.getElementById('login-error');
  errorEl.classList.add('hidden');

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      authToken = data.token;
      currentUser = data.user;
      localStorage.setItem('agy_outreach_token', authToken);
      document.getElementById('admin-display-name').textContent = currentUser.username;
      showLoginModal(false);
      loadInitialData();
    } else {
      errorEl.textContent = data.error || 'Authentication failed.';
      errorEl.classList.remove('hidden');
    }
  } catch (err) {
    errorEl.textContent = 'Server communication error: ' + err.message;
    errorEl.classList.remove('hidden');
  }
}

async function handleLogout() {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
  } catch {}
  authToken = null;
  localStorage.removeItem('agy_outreach_token');
  showLoginModal(true);
}

// ================= INITIAL DATA & TAB ROUTING =================
function loadInitialData() {
  checkWahaHealth();
  setInterval(checkWahaHealth, 10000);

  loadContacts();
  loadCampaignsHistory();
  loadAuditLogs();
  checkCurrentQueueState();

  if (!queuePollingInterval) {
    queuePollingInterval = setInterval(checkCurrentQueueState, 1500);
  }
}

function setupEventListeners() {
  // Login & Logout
  document.getElementById('login-form').addEventListener('submit', handleLogin);
  document.getElementById('logout-btn').addEventListener('click', handleLogout);

  // Tabs
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-tab');
      switchTab(targetId);
    });
  });

  // Message Editor
  const textarea = document.getElementById('message-editor-textarea');
  textarea.addEventListener('input', updateMessagePreview);
  document.getElementById('preview-clinic-name-input').addEventListener('input', updateMessagePreview);
  document.getElementById('btn-reset-default-msg').addEventListener('click', () => {
    textarea.value = DEFAULT_MESSAGE;
    updateMessagePreview();
  });

  // Contacts
  document.getElementById('btn-load-bundled-csv').addEventListener('click', loadBundled50Csv);
  document.getElementById('file-upload-input').addEventListener('change', handleFileUpload);
  document.getElementById('contact-search-input').addEventListener('input', (e) => {
    loadContacts(e.target.value, contactsFilter);
  });
  document.querySelectorAll('.contact-filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.contact-filter-btn').forEach(b => {
        b.className = 'contact-filter-btn px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200';
      });
      btn.className = 'contact-filter-btn px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 font-semibold';
      contactsFilter = btn.getAttribute('data-filter');
      loadContacts(document.getElementById('contact-search-input').value, contactsFilter);
    });
  });
  document.getElementById('btn-export-contacts').addEventListener('click', () => {
    window.location.href = `/api/contacts/export?filter=${contactsFilter}`;
  });
  document.getElementById('btn-export-optouts').addEventListener('click', () => {
    window.location.href = `/api/contacts/export?filter=opted_out`;
  });

  // Import Modal
  document.getElementById('btn-close-import-modal').addEventListener('click', closeImportModal);
  document.getElementById('btn-cancel-import').addEventListener('click', closeImportModal);
  document.getElementById('btn-confirm-import-save').addEventListener('click', commitImport);

  // Test Message
  document.getElementById('btn-send-test-msg').addEventListener('click', sendTestMessage);
  document.getElementById('test-confirm-checkbox').addEventListener('change', (e) => {
    document.getElementById('btn-confirm-test-verified').disabled = !e.target.checked;
  });
  document.getElementById('btn-confirm-test-verified').addEventListener('click', confirmTestVerification);

  // Campaign Creation
  document.getElementById('btn-create-campaign-modal').addEventListener('click', openCreateCampaignModal);
  document.getElementById('btn-close-campaign-modal').addEventListener('click', closeCreateCampaignModal);
  document.getElementById('btn-cancel-campaign-modal').addEventListener('click', closeCreateCampaignModal);
  document.getElementById('btn-submit-campaign-create').addEventListener('click', submitCreateCampaign);

  // Queue Controls
  document.getElementById('btn-start-queue').addEventListener('click', () => {
    if (activeCampaignId) triggerQueueAction(activeCampaignId, 'start');
  });
  document.getElementById('btn-pause-queue').addEventListener('click', () => {
    if (activeCampaignId) triggerQueueAction(activeCampaignId, 'pause');
  });
  document.getElementById('btn-resume-queue').addEventListener('click', () => {
    if (activeCampaignId) triggerQueueAction(activeCampaignId, 'resume');
  });
  document.getElementById('btn-cancel-queue').addEventListener('click', () => {
    if (confirm('Are you sure you want to cancel this campaign? All remaining pending dispatches will be stopped.')) {
      if (activeCampaignId) triggerQueueAction(activeCampaignId, 'cancel');
    }
  });
  document.getElementById('btn-export-current-campaign').addEventListener('click', () => {
    if (activeCampaignId) {
      window.location.href = `/api/campaigns/${activeCampaignId}/export`;
    }
  });

  // WAHA Status click to open connection modal
  document.getElementById('waha-status-badge').addEventListener('click', openWahaModal);
  document.getElementById('btn-close-waha-modal').addEventListener('click', closeWahaModal);
  document.getElementById('btn-refresh-waha-status').addEventListener('click', () => {
    checkWahaHealth();
  });
  document.getElementById('btn-autodetect-waha-key').addEventListener('click', autoDetectWahaKey);
  document.getElementById('btn-save-waha-key').addEventListener('click', saveManualWahaKey);
}

function openWahaModal() {
  document.getElementById('waha-modal').classList.remove('hidden');
  checkWahaHealth();
}

function closeWahaModal() {
  document.getElementById('waha-modal').classList.add('hidden');
}

async function autoDetectWahaKey() {
  const btn = document.getElementById('btn-autodetect-waha-key');
  btn.disabled = true;
  btn.innerHTML = `<i data-lucide="loader" class="w-3.5 h-3.5 animate-spin"></i><span>Detecting key...</span>`;
  if (window.lucide) lucide.createIcons();

  try {
    const res = await fetch('/api/waha/auto-detect-key', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    const data = await res.json();
    if (res.ok && data.success) {
      alert('Active WAHA key detected & saved! Refreshing status...');
      checkWahaHealth();
    } else {
      alert('Detection failed: ' + (data.error || 'Could not validate any key.'));
    }
  } catch (err) {
    alert('Error during auto-detection: ' + err.message);
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i><span>Auto-Detect Active WAHA Key</span>`;
    if (window.lucide) lucide.createIcons();
  }
}

async function saveManualWahaKey() {
  const apiKey = document.getElementById('waha-api-key-input').value.trim();
  if (!apiKey) {
    alert('Please paste a WAHA API key.');
    return;
  }

  try {
    const res = await fetch('/api/waha/config', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ apiKey })
    });
    const data = await res.json();
    if (res.ok) {
      alert('WAHA configuration updated!');
      checkWahaHealth();
    } else {
      alert('Failed to update config: ' + (data.error || 'Server error'));
    }
  } catch (err) {
    alert('Error saving key: ' + err.message);
  }
}

function switchTab(targetId) {
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.add('hidden'));
  document.getElementById(targetId).classList.remove('hidden');

  document.querySelectorAll('.nav-tab').forEach(t => {
    if (t.getAttribute('data-tab') === targetId) {
      t.className = 'nav-tab py-3 border-b-2 border-emerald-600 text-emerald-700 flex items-center gap-2 font-semibold';
    } else {
      t.className = 'nav-tab py-3 border-b-2 border-transparent text-slate-500 hover:text-slate-700 flex items-center gap-2';
    }
  });

  if (targetId === 'tab-optouts') loadOptOutRegistry();
  if (targetId === 'tab-history') { loadCampaignsHistory(); loadAuditLogs(); }
}

// ================= WAHA HEALTH CHECK =================
async function checkWahaHealth() {
  const badge = document.getElementById('waha-status-badge');
  const indicator = document.getElementById('waha-indicator');
  const label = document.getElementById('waha-status-label');

  const modalStatusBox = document.getElementById('waha-modal-status-box');
  const modalStatusTitle = document.getElementById('waha-modal-status-title');
  const modalStatusDesc = document.getElementById('waha-modal-status-desc');
  const qrSection = document.getElementById('waha-qr-section');
  const qrImage = document.getElementById('waha-qr-image');

  try {
    const res = await fetch('/api/waha/status', {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    if (res.ok) {
      const data = await res.json();
      if (data.connected) {
        indicator.className = 'w-2.5 h-2.5 rounded-full bg-emerald-500';
        label.textContent = `WAHA Connected (${data.session})`;
        badge.className = 'flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 cursor-pointer';

        modalStatusBox.className = 'p-3 rounded-xl border bg-emerald-50 border-emerald-200 text-emerald-800 text-xs';
        modalStatusTitle.innerHTML = '✅ WhatsApp Connected & Ready';
        modalStatusDesc.textContent = `Active Session: "${data.session}". Messages can be dispatched via WAHA.`;
        qrSection.classList.add('hidden');
      } else if (data.status === 'SCAN_QR_CODE') {
        indicator.className = 'w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse';
        label.textContent = 'Scan QR Code to Connect';
        badge.className = 'flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-xs font-semibold text-amber-800 cursor-pointer shadow-sm';

        modalStatusBox.className = 'p-3 rounded-xl border bg-amber-50 border-amber-200 text-amber-900 text-xs';
        modalStatusTitle.innerHTML = '📲 Pair WhatsApp Device';
        modalStatusDesc.textContent = 'WAHA requires QR code authentication to link your clinic WhatsApp number.';
        qrSection.classList.remove('hidden');
        qrImage.src = `/api/waha/qr?t=${Date.now()}`;
      } else if (data.status === 'AUTH_FAILED') {
        indicator.className = 'w-2.5 h-2.5 rounded-full bg-red-500';
        label.textContent = 'WAHA: AUTH_FAILED (Click to Fix)';
        badge.className = 'flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-300 text-xs font-semibold text-red-800 cursor-pointer';

        modalStatusBox.className = 'p-3 rounded-xl border bg-red-50 border-red-200 text-red-800 text-xs';
        modalStatusTitle.innerHTML = '🔒 Authentication Failed';
        modalStatusDesc.textContent = 'Invalid or mismatched WAHA_API_KEY. Click "Auto-Detect Active WAHA Key" below to sync with Docker.';
        qrSection.classList.add('hidden');
      } else {
        indicator.className = 'w-2.5 h-2.5 rounded-full bg-slate-400';
        label.textContent = `WAHA: ${data.status || 'Offline'}`;
        badge.className = 'flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 cursor-pointer';

        modalStatusBox.className = 'p-3 rounded-xl border bg-slate-50 border-slate-200 text-slate-800 text-xs';
        modalStatusTitle.innerHTML = `Status: ${data.status || 'Disconnected'}`;
        modalStatusDesc.textContent = data.error || 'Ensure WAHA Docker container is running.';
        qrSection.classList.add('hidden');
      }
      return;
    }
  } catch {}

  indicator.className = 'w-2.5 h-2.5 rounded-full bg-slate-400';
  label.textContent = 'WAHA Server Offline';
  badge.className = 'flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 cursor-pointer';
}

// ================= MESSAGE EDITOR & PREVIEW =================
function initMessageEditor() {
  const textarea = document.getElementById('message-editor-textarea');
  textarea.value = DEFAULT_MESSAGE;
  updateMessagePreview();
}

function updateMessagePreview() {
  const textarea = document.getElementById('message-editor-textarea');
  const charCounter = document.getElementById('char-counter');
  const bubbleContent = document.getElementById('wa-bubble-content');
  const previewClinicHeader = document.getElementById('preview-header-clinic');
  const clinicNameInput = document.getElementById('preview-clinic-name-input');

  const rawText = textarea.value;
  charCounter.textContent = rawText.length;

  const sampleClinic = clinicNameInput.value.trim() || 'XYZ Dental Clinic';
  previewClinicHeader.textContent = sampleClinic;

  // Personalize placeholder
  let processed = rawText.replace(/\{\{\s*clinic_name\s*\}\}/gi, `<strong>${escapeHtml(sampleClinic)}</strong>`);

  // WhatsApp syntax formatting
  // Bold: *text*
  processed = processed.replace(/\*([^\*]+)\*/g, '<strong>$1</strong>');
  // Italic: _text_
  processed = processed.replace(/_([^_]+)_/g, '<em>$1</em>');
  // URLs
  processed = processed.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" class="text-sky-600 underline break-all">$1</a>');

  bubbleContent.innerHTML = processed;

  // Time
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  document.getElementById('wa-bubble-time').textContent = timeStr;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.innerText = text;
  return div.innerHTML;
}

// ================= CONTACTS & IMPORT =================
async function loadContacts(search = '', filter = 'all') {
  try {
    let url = `/api/contacts?filter=${filter}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;

    const res = await fetch(url, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    if (res.ok) {
      const data = await res.json();
      renderContactsTable(data.contacts);
    }
  } catch (err) {
    console.error('Failed to load contacts', err);
  }
}

function renderContactsTable(contacts) {
  const tbody = document.getElementById('contacts-tbody');
  if (!contacts || contacts.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="text-center py-10 text-slate-400">
          No contacts found. Click <strong>"Import Bundled 50 Clinics CSV"</strong> or upload a file.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = contacts.map((c, i) => {
    const isOptedOut = c.is_opted_out === 1;
    const statusBadge = isOptedOut
      ? `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">Opted Out (DNC)</span>`
      : `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Active</span>`;

    const optActionBtn = isOptedOut
      ? `<button onclick="toggleOptOut(${c.id})" class="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">Enable Contact</button>`
      : `<button onclick="toggleOptOut(${c.id})" class="text-[11px] font-semibold text-purple-700 hover:text-purple-800 bg-purple-50 px-2 py-1 rounded border border-purple-200">Opt-Out</button>`;

    return `
      <tr class="hover:bg-slate-50/80 transition">
        <td class="py-2.5 px-4 font-mono text-slate-400">${i + 1}</td>
        <td class="py-2.5 px-4 font-semibold text-slate-800">${escapeHtml(c.clinic_name)}</td>
        <td class="py-2.5 px-4 font-mono text-slate-500">${escapeHtml(c.raw_phone)}</td>
        <td class="py-2.5 px-4 font-mono text-emerald-700 font-semibold">${escapeHtml(c.normalized_phone)}</td>
        <td class="py-2.5 px-4 font-mono text-slate-400">${escapeHtml(c.chat_id)}</td>
        <td class="py-2.5 px-4">${statusBadge}</td>
        <td class="py-2.5 px-4 text-right">${optActionBtn}</td>
      </tr>
    `;
  }).join('');
}

async function toggleOptOut(contactId) {
  try {
    const res = await fetch(`/api/contacts/${contactId}/toggle-opt-out`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ reason: 'Admin toggle' })
    });
    if (res.ok) {
      loadContacts(document.getElementById('contact-search-input').value, contactsFilter);
      loadOptOutRegistry();
    }
  } catch (err) {
    alert('Failed to update opt-out status: ' + err.message);
  }
}

async function loadBundled50Csv() {
  try {
    const res = await fetch('/api/contacts/load-initial-csv', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    const data = await res.json();
    if (res.ok && data.success) {
      showImportPreview(data);
    } else {
      alert('Could not load bundled CSV: ' + (data.error || 'Unknown error'));
    }
  } catch (err) {
    alert('Error loading bundled CSV: ' + err.message);
  }
}

async function handleFileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await fetch('/api/contacts/upload-preview', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${authToken}` },
      body: formData
    });
    const data = await res.json();
    if (res.ok && data.success) {
      showImportPreview(data);
    } else {
      alert('Upload validation error: ' + (data.error || 'Failed to parse file'));
    }
  } catch (err) {
    alert('File upload error: ' + err.message);
  } finally {
    e.target.value = '';
  }
}

function showImportPreview(previewData) {
  currentImportPreview = previewData;

  document.getElementById('preview-total-rows').textContent = previewData.summary.totalRows;
  document.getElementById('preview-valid-rows').textContent = previewData.summary.validContacts;
  document.getElementById('preview-invalid-rows').textContent = previewData.summary.invalidContacts;
  document.getElementById('preview-duplicate-rows').textContent = previewData.summary.duplicateContacts + previewData.summary.optedOutContacts;

  renderImportPreviewRows(previewData.rows);
  document.getElementById('import-preview-modal').classList.remove('hidden');
}

function renderImportPreviewRows(rows) {
  const tbody = document.getElementById('preview-table-tbody');
  tbody.innerHTML = rows.map((r, i) => {
    let resultBadge = '';
    if (r.isValid) {
      resultBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Valid</span>`;
    } else if (r.isOptedOut) {
      resultBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">${escapeHtml(r.flagReason)}</span>`;
    } else if (r.isDuplicate) {
      resultBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">Duplicate</span>`;
    } else {
      resultBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800">${escapeHtml(r.flagReason)}</span>`;
    }

    return `
      <tr class="${r.isValid ? '' : 'bg-red-50/30'}">
        <td class="py-2 px-3 font-mono text-slate-400">${r.rowIndex}</td>
        <td class="py-2 px-3 font-semibold text-slate-800">${escapeHtml(r.clinicName)}</td>
        <td class="py-2 px-3 font-mono text-slate-500">${escapeHtml(r.rawPhone)}</td>
        <td class="py-2 px-3 font-mono text-emerald-700 font-semibold">${escapeHtml(r.normalizedPhone || '—')}</td>
        <td class="py-2 px-3">${resultBadge}</td>
        <td class="py-2 px-3 text-right">
          <button onclick="removePreviewRow(${i})" class="text-slate-400 hover:text-red-600 transition" title="Exclude row">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
}

function removePreviewRow(index) {
  if (currentImportPreview && currentImportPreview.rows) {
    currentImportPreview.rows.splice(index, 1);
    // Recount
    const valid = currentImportPreview.rows.filter(r => r.isValid).length;
    const invalid = currentImportPreview.rows.filter(r => !r.isValid && !r.isDuplicate && !r.isOptedOut).length;
    const duplicates = currentImportPreview.rows.filter(r => r.isDuplicate || r.isOptedOut).length;

    document.getElementById('preview-total-rows').textContent = currentImportPreview.rows.length;
    document.getElementById('preview-valid-rows').textContent = valid;
    document.getElementById('preview-invalid-rows').textContent = invalid;
    document.getElementById('preview-duplicate-rows').textContent = duplicates;

    renderImportPreviewRows(currentImportPreview.rows);
  }
}

function closeImportModal() {
  document.getElementById('import-preview-modal').classList.add('hidden');
  currentImportPreview = null;
}

async function commitImport() {
  if (!currentImportPreview || !currentImportPreview.rows) return;
  const validContacts = currentImportPreview.rows.filter(r => r.isValid);

  if (validContacts.length === 0) {
    alert('No valid contacts to import!');
    return;
  }

  try {
    const res = await fetch('/api/contacts/confirm-import', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ contacts: validContacts })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      alert(`Successfully imported ${data.imported} clinic contacts!`);
      closeImportModal();
      loadContacts();
    } else {
      alert('Import failed: ' + (data.error || 'Server error'));
    }
  } catch (err) {
    alert('Import error: ' + err.message);
  }
}

// ================= TEST MESSAGE =================
let lastTestResponseData = null;

async function sendTestMessage() {
  const phone = document.getElementById('test-phone-input').value.trim();
  const clinicName = document.getElementById('test-clinic-name-input').value.trim();
  const message = document.getElementById('message-editor-textarea').value;
  const btn = document.getElementById('btn-send-test-msg');

  if (!phone) {
    alert('Please enter your WhatsApp phone number.');
    return;
  }

  btn.disabled = true;
  btn.innerHTML = `<i data-lucide="loader" class="w-4 h-4 animate-spin"></i><span>Sending via WAHA...</span>`;
  if (window.lucide) lucide.createIcons();

  const responseContainer = document.getElementById('test-response-container');
  const responsePre = document.getElementById('test-response-pre');
  const resultBadge = document.getElementById('test-result-badge');

  try {
    const res = await fetch('/api/waha/test-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ phone, clinicName, message })
    });

    const data = await res.json();
    lastTestResponseData = data;
    responseContainer.classList.remove('hidden');
    responsePre.textContent = JSON.stringify(data, null, 2);

    if (res.ok && data.success) {
      resultBadge.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800';
      resultBadge.textContent = 'Sent to WAHA (Check Phone)';
    } else {
      resultBadge.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800';
      resultBadge.textContent = 'WAHA Error / Failed';
    }
  } catch (err) {
    responseContainer.classList.remove('hidden');
    responsePre.textContent = 'Network error: ' + err.message;
    resultBadge.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800';
    resultBadge.textContent = 'Network Failure';
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<i data-lucide="send" class="w-4 h-4"></i><span>Send Test WhatsApp Message via WAHA</span>`;
    if (window.lucide) lucide.createIcons();
  }
}

async function confirmTestVerification() {
  if (!activeCampaignId) {
    alert('Test verified! Now create a campaign in the Campaign Queue tab to start sending.');
    switchTab('tab-queue');
    openCreateCampaignModal();
    return;
  }

  const phone = document.getElementById('test-phone-input').value.trim();

  try {
    const res = await fetch(`/api/campaigns/${activeCampaignId}/confirm-test`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        testPhone: phone,
        testResponse: lastTestResponseData,
        confirmed: true
      })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      alert('Verification confirmed! Campaign is now unlocked and ready to start.');
      switchTab('tab-queue');
      checkCurrentQueueState();
    } else {
      alert('Confirmation failed: ' + (data.error || 'Server error'));
    }
  } catch (err) {
    alert('Verification error: ' + err.message);
  }
}

// ================= CAMPAIGN CREATION =================
async function openCreateCampaignModal() {
  // Fetch active eligible contacts count
  try {
    const res = await fetch('/api/contacts?filter=active', {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    const data = await res.json();
    document.getElementById('modal-eligible-count').textContent = data.counts.active || 0;
  } catch {}

  document.getElementById('create-campaign-modal').classList.remove('hidden');
}

function closeCreateCampaignModal() {
  document.getElementById('create-campaign-modal').classList.add('hidden');
}

async function submitCreateCampaign() {
  const name = document.getElementById('campaign-name-input').value.trim();
  const batchSize = Number(document.getElementById('campaign-batch-input').value) || 1;
  const delaySeconds = Number(document.getElementById('campaign-delay-input').value) || 10;
  const messageTemplate = document.getElementById('message-editor-textarea').value.trim();

  if (!name) {
    alert('Please enter a campaign name.');
    return;
  }

  try {
    const res = await fetch('/api/campaigns/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        name,
        messageTemplate,
        personalizeClinicName: true,
        batchSize,
        delaySeconds
      })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      activeCampaignId = data.campaignId;
      closeCreateCampaignModal();
      alert(`Campaign #${data.campaignId} created! Before launching, please complete the test message verification step.`);
      switchTab('tab-test');
      checkCurrentQueueState();
    } else {
      alert('Campaign creation failed: ' + (data.error || 'Unknown error'));
    }
  } catch (err) {
    alert('Creation error: ' + err.message);
  }
}

// ================= QUEUE STATE & POLLING =================
async function checkCurrentQueueState() {
  if (!authToken) return;

  // If no activeCampaignId selected, get the latest campaign
  if (!activeCampaignId) {
    try {
      const res = await fetch('/api/campaigns', {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.campaigns && data.campaigns.length > 0) {
          activeCampaignId = data.campaigns[0].id;
        }
      }
    } catch {}
  }

  if (!activeCampaignId) return;

  try {
    const res = await fetch(`/api/campaigns/${activeCampaignId}/status`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    if (res.ok) {
      const data = await res.json();
      updateQueueUI(data);
    }
  } catch {}
}

function updateQueueUI(data) {
  const stateBadge = document.getElementById('queue-state-badge');
  const title = document.getElementById('active-campaign-title');
  const countdownBox = document.getElementById('countdown-box');
  const countdownTimer = document.getElementById('countdown-timer');

  const btnStart = document.getElementById('btn-start-queue');
  const btnPause = document.getElementById('btn-pause-queue');
  const btnResume = document.getElementById('btn-resume-queue');
  const btnCancel = document.getElementById('btn-cancel-queue');

  const status = data.campaignStatus;
  const queueState = data.queue.queueState;

  // Title
  title.textContent = `Campaign #${data.campaignId} (${status})`;

  // Status Badge & Controls
  btnStart.classList.add('hidden');
  btnPause.classList.add('hidden');
  btnResume.classList.add('hidden');
  btnCancel.classList.add('hidden');

  if (status === 'RUNNING' || queueState === 'RUNNING') {
    stateBadge.className = 'px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wide pulse-active';
    stateBadge.textContent = 'Queue Running';
    btnPause.classList.remove('hidden');
    btnCancel.classList.remove('hidden');

    countdownBox.classList.remove('hidden');
    countdownTimer.textContent = data.queue.secondsRemaining;
  } else if (status === 'PAUSED' || queueState === 'PAUSED') {
    stateBadge.className = 'px-2.5 py-1 text-xs font-bold rounded-full bg-amber-100 text-amber-800 uppercase tracking-wide';
    stateBadge.textContent = 'Queue Paused';
    btnResume.classList.remove('hidden');
    btnCancel.classList.remove('hidden');
    countdownBox.classList.add('hidden');
  } else if (status === 'COMPLETED') {
    stateBadge.className = 'px-2.5 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-800 uppercase tracking-wide';
    stateBadge.textContent = 'Campaign Completed';
    countdownBox.classList.add('hidden');
  } else if (status === 'CANCELLED') {
    stateBadge.className = 'px-2.5 py-1 text-xs font-bold rounded-full bg-slate-100 text-slate-700 uppercase tracking-wide';
    stateBadge.textContent = 'Campaign Cancelled';
    countdownBox.classList.add('hidden');
  } else {
    // DRAFT or READY
    if (data.testVerified) {
      stateBadge.className = 'px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-50 text-emerald-700 uppercase tracking-wide border border-emerald-200';
      stateBadge.textContent = 'Verified & Ready';
      btnStart.classList.remove('hidden');
    } else {
      stateBadge.className = 'px-2.5 py-1 text-xs font-bold rounded-full bg-slate-100 text-slate-600 uppercase tracking-wide';
      stateBadge.textContent = 'Test Verification Pending';
    }
    countdownBox.classList.add('hidden');
  }

  // Rate limit / Error warning
  const rateLimitWarning = document.getElementById('queue-rate-limit-warning');
  const rateLimitText = document.getElementById('queue-rate-limit-text');
  if (data.queue.lastError) {
    rateLimitText.textContent = data.queue.lastError;
    rateLimitWarning.classList.remove('hidden');
  } else {
    rateLimitWarning.classList.add('hidden');
  }

  // Counters
  document.getElementById('stat-total').textContent = data.counts.total;
  document.getElementById('stat-pending').textContent = data.counts.pending;
  document.getElementById('stat-sending').textContent = data.counts.sending;
  document.getElementById('stat-sent').textContent = data.counts.sent;
  document.getElementById('stat-failed').textContent = data.counts.failed;
  document.getElementById('stat-skipped').textContent = data.counts.skipped + data.counts.optedOut;

  // Percentage & Progress bar
  const completedMessages = data.counts.sent + data.counts.failed + data.counts.skipped + data.counts.optedOut;
  const pct = data.counts.total > 0 ? Math.round((completedMessages / data.counts.total) * 100) : 0;
  document.getElementById('stat-percentage').textContent = `${pct}%`;
  document.getElementById('stat-progress-bar').style.width = `${pct}%`;

  // Recipients Table
  renderLiveRecipients(data.recentRecipients);
}

function renderLiveRecipients(recipients) {
  const tbody = document.getElementById('live-recipients-tbody');
  if (!recipients || recipients.length === 0) return;

  tbody.innerHTML = recipients.map(r => {
    let badge = '';
    if (r.status === 'Sent to WAHA') {
      badge = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Sent to WAHA</span>`;
    } else if (r.status === 'Sending') {
      badge = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 animate-pulse">Sending...</span>`;
    } else if (r.status === 'Failed') {
      badge = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800">Failed</span>`;
    } else if (r.status === 'Opted Out') {
      badge = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">Opted Out</span>`;
    } else if (r.status === 'Skipped') {
      badge = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">Skipped</span>`;
    } else {
      badge = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">Pending</span>`;
    }

    return `
      <tr class="hover:bg-slate-50">
        <td class="py-2.5 px-4 font-semibold text-slate-800">${escapeHtml(r.clinic_name)}</td>
        <td class="py-2.5 px-4 font-mono text-slate-500">${escapeHtml(r.phone_number)}</td>
        <td class="py-2.5 px-4">${badge}</td>
        <td class="py-2.5 px-4 font-mono text-[11px] text-slate-400">${escapeHtml(r.waha_message_id || '—')}</td>
        <td class="py-2.5 px-4 text-slate-400 text-[11px]">${r.sent_at || r.attempt_time || '—'}</td>
        <td class="py-2.5 px-4 text-[11px] text-red-600 truncate max-w-xs">${escapeHtml(r.error_details || '')}</td>
      </tr>
    `;
  }).join('');
}

async function triggerQueueAction(campaignId, action) {
  try {
    const res = await fetch(`/api/campaigns/${campaignId}/${action}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    });
    const data = await res.json();
    if (!res.ok) {
      alert(`Action "${action}" failed: ${data.error || 'Server error'}`);
    } else {
      checkCurrentQueueState();
    }
  } catch (err) {
    alert(`Error during ${action}: ${err.message}`);
  }
}

// ================= OPT-OUT REGISTRY TAB =================
async function loadOptOutRegistry() {
  try {
    const res = await fetch('/api/contacts?filter=opted_out', {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    if (res.ok) {
      const data = await res.json();
      const tbody = document.getElementById('optouts-tbody');
      if (!data.contacts || data.contacts.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center py-8 text-slate-400">No opted-out contacts recorded.</td></tr>`;
        return;
      }
      tbody.innerHTML = data.contacts.map(c => `
        <tr class="hover:bg-slate-50">
          <td class="py-2.5 px-4 font-semibold text-slate-800">${escapeHtml(c.clinic_name)}</td>
          <td class="py-2.5 px-4 font-mono text-slate-600">${escapeHtml(c.normalized_phone)}</td>
          <td class="py-2.5 px-4 text-slate-500">${escapeHtml(c.opt_out_reason || 'Marked as Do Not Contact')}</td>
          <td class="py-2.5 px-4 text-slate-400">${c.updated_at || c.created_at}</td>
          <td class="py-2.5 px-4 text-right">
            <button onclick="toggleOptOut(${c.id})" class="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
              Restore Contact
            </button>
          </td>
        </tr>
      `).join('');
    }
  } catch {}
}

// ================= HISTORY & AUDIT LOGS =================
async function loadCampaignsHistory() {
  try {
    const res = await fetch('/api/campaigns', {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    if (res.ok) {
      const data = await res.json();
      const tbody = document.getElementById('history-campaigns-tbody');
      if (!data.campaigns || data.campaigns.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9" class="text-center py-8 text-slate-400">No campaigns recorded yet.</td></tr>`;
        return;
      }

      tbody.innerHTML = data.campaigns.map(c => `
        <tr class="hover:bg-slate-50">
          <td class="py-2.5 px-4 font-mono text-slate-400">#${c.id}</td>
          <td class="py-2.5 px-4 font-semibold text-slate-800">${escapeHtml(c.name)}</td>
          <td class="py-2.5 px-4">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold ${c.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800' : (c.status === 'RUNNING' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700')}">
              ${c.status}
            </span>
          </td>
          <td class="py-2.5 px-4 font-mono">${c.total_recipients}</td>
          <td class="py-2.5 px-4 font-mono text-emerald-700 font-bold">${c.sent_count}</td>
          <td class="py-2.5 px-4 font-mono text-red-600 font-bold">${c.failed_count}</td>
          <td class="py-2.5 px-4 font-mono text-purple-600">${c.skipped_count}</td>
          <td class="py-2.5 px-4 text-slate-400">${c.created_at}</td>
          <td class="py-2.5 px-4 text-right">
            <a href="/api/campaigns/${c.id}/export" class="text-slate-600 hover:text-emerald-700 font-semibold flex items-center gap-1 justify-end">
              <i data-lucide="download" class="w-3.5 h-3.5"></i>
              <span>CSV</span>
            </a>
          </td>
        </tr>
      `).join('');

      if (window.lucide) lucide.createIcons();
    }
  } catch {}
}

async function loadAuditLogs() {
  try {
    const res = await fetch('/api/audit?limit=25', {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    if (res.ok) {
      const data = await res.json();
      const tbody = document.getElementById('audit-logs-tbody');
      if (!data.logs || data.logs.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="text-center py-4 text-slate-400">No audit records logged yet.</td></tr>`;
        return;
      }

      tbody.innerHTML = data.logs.map(l => `
        <tr class="hover:bg-slate-50">
          <td class="py-1.5 px-3 text-slate-400">${l.created_at}</td>
          <td class="py-1.5 px-3 font-semibold text-slate-700">${escapeHtml(l.action)}</td>
          <td class="py-1.5 px-3 text-slate-500">${escapeHtml(l.actor)}</td>
          <td class="py-1.5 px-3 text-slate-600 truncate max-w-sm">${escapeHtml(l.details || '')}</td>
        </tr>
      `).join('');
    }
  } catch {}
}

