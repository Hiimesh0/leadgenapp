import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

import authRoutes from './routes/authRoutes.js';
import wahaRoutes from './routes/wahaRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import campaignRoutes from './routes/campaignRoutes.js';
import auditRoutes from './routes/auditRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const frontendDir = path.resolve(rootDir, 'frontend');

const app = express();
const PORT = process.env.PORT || 5050;

// Security & Parsing Middlewares
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static frontend assets
app.use('/static', express.static(frontendDir));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/waha', wahaRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/audit', auditRoutes);

// Admin dashboard route requested in specification: /admin/whatsapp-campaigns
app.get('/admin/whatsapp-campaigns', (req, res) => {
  res.sendFile(path.resolve(frontendDir, 'index.html'));
});

// Root redirects
app.get('/', (req, res) => {
  res.redirect('/admin/whatsapp-campaigns');
});

app.get('/admin', (req, res) => {
  res.redirect('/admin/whatsapp-campaigns');
});

// Health check endpoint
app.get(['/health', '/api/health'], (req, res) => {
  res.json({
    status: 'ok',
    app: 'Clinic WhatsApp Outreach Campaign',
    version: '1.0.0',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[Server Error]', err);
  res.status(500).json({
    error: err.message || 'An unexpected internal server error occurred.'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`🚀 Clinic WhatsApp Outreach Campaign Server Running`);
  console.log(`📡 Local Route: http://localhost:${PORT}/admin/whatsapp-campaigns`);
  console.log(`⚙️  WAHA Base URL: ${process.env.WAHA_BASE_URL || 'http://localhost:3008'}`);
  console.log(`=======================================================`);
});

