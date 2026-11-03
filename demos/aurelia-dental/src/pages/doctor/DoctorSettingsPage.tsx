import React, { useState, useEffect } from 'react';
import { CLINIC_CONFIG } from '../../config/clinicConfig';
import { clinicApi } from '../../services/api';
import { WahaStatus } from '../../types';
import {
  Building2,
  User,
  Phone,
  Mail,
  Clock,
  MapPin,
  Database,
  ShieldCheck,
  MessageSquare,
  RefreshCw,
  QrCode,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Terminal,
  ExternalLink
} from 'lucide-react';

export const DoctorSettingsPage: React.FC = () => {
  const [wahaStatus, setWahaStatus] = useState<WahaStatus | null>(null);
  const [loadingWaha, setLoadingWaha] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [qrLoading, setQrLoading] = useState(false);

  const checkWahaStatus = async () => {
    setLoadingWaha(true);
    try {
      const status = await clinicApi.getWahaStatus();
      setWahaStatus(status);
    } catch {
      setWahaStatus({
        configured: false,
        status: 'UNAVAILABLE',
        label: 'WAHA Service Unavailable',
        connected: false,
        session: 'default',
        baseUrl: 'http://localhost:3008',
        error: 'Unable to reach backend service'
      });
    } finally {
      setLoadingWaha(false);
    }
  };

  useEffect(() => {
    checkWahaStatus();
  }, []);

  const handleOpenQr = async () => {
    setQrModalOpen(true);
    setQrLoading(true);
    try {
      const res = await clinicApi.getWahaQr();
      if (res.ok && res.qr) {
        setQrCode(res.qr);
      } else {
        setQrCode(null);
      }
    } catch {
      setQrCode(null);
    } finally {
      setQrLoading(false);
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'CONNECTED':
        return <CheckCircle className="w-5 h-5 text-emerald-600" />;
      case 'SCAN_QR_CODE':
        return <QrCode className="w-5 h-5 text-amber-600" />;
      case 'CONNECTING':
        return <RefreshCw className="w-5 h-5 text-sky-600 animate-spin" />;
      default:
        return <XCircle className="w-5 h-5 text-rose-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">Clinic Profile & System Settings</h1>
        <p className="text-xs text-slate-500 mt-1">
          Centralized configuration overview for {CLINIC_CONFIG.clinicName}
        </p>
      </div>

      {/* WAHA WhatsApp API Live Integration Status Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-600" />
            <div>
              <h2 className="text-sm font-bold text-slate-900">WAHA — WhatsApp HTTP API Integration</h2>
              <p className="text-[11px] text-slate-400">Automated appointment confirmation messaging service</p>
            </div>
          </div>
          <button
            type="button"
            onClick={checkWahaStatus}
            disabled={loadingWaha}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingWaha ? 'animate-spin' : ''}`} />
            <span>Test Connection</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Daemon Status</span>
            <div className="flex items-center gap-2 pt-1">
              {getStatusIcon(wahaStatus?.status)}
              <span className="text-xs font-bold text-slate-800">
                {wahaStatus?.label || (loadingWaha ? 'Checking...' : 'Not Checked')}
              </span>
            </div>
            {wahaStatus?.error && (
              <p className="text-[10px] text-rose-600 mt-1 leading-tight">{wahaStatus.error}</p>
            )}
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">WAHA Server Base URL</span>
            <div className="text-xs font-mono font-semibold text-slate-800 pt-1">
              {wahaStatus?.baseUrl || 'http://localhost:3008'}
            </div>
            <p className="text-[10px] text-slate-400">Session ID: <code>{wahaStatus?.session || 'default'}</code></p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Authentication Action</span>
              <div className="text-xs text-slate-600 mt-1">
                {wahaStatus?.connected
                  ? 'WhatsApp number paired & ready to dispatch messages.'
                  : 'Requires running WAHA Docker container and scanning session QR code.'}
              </div>
            </div>
            <button
              type="button"
              onClick={handleOpenQr}
              className="mt-2 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>{wahaStatus?.connected ? 'View Session Details' : 'Scan WhatsApp QR Code'}</span>
            </button>
          </div>
        </div>

        {/* Quick Setup Instructions for Doctor / Admin */}
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 text-xs space-y-2">
          <div className="flex items-center justify-between text-slate-300">
            <div className="flex items-center gap-1.5 font-bold">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>How to Run WAHA locally:</span>
            </div>
            <span className="text-[10px] text-slate-400">Port: 3000</span>
          </div>
          <pre className="p-2.5 bg-slate-950 rounded-lg text-[11px] font-mono text-emerald-300 overflow-x-auto select-all">
            docker run -it --rm -p 3008:3000/tcp --name waha devlikeapro/waha
          </pre>
          <p className="text-[11px] text-slate-400">
            Or launch with Docker Compose: <code className="text-slate-300">docker compose -f docker-compose.waha.yml up -d</code>.
            Once running, open this page to scan the QR code and pair the clinic's WhatsApp phone number.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Doctor Information Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <User className="w-5 h-5 text-teal-600" />
            <h2 className="text-sm font-bold text-slate-900">Doctor Profile Credentials</h2>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-400 block uppercase text-[10px] font-bold">Doctor Name</span>
              <span className="font-semibold text-slate-800 text-sm">{CLINIC_CONFIG.doctorName}</span>
            </div>
            <div>
              <span className="text-slate-400 block uppercase text-[10px] font-bold">Specialization</span>
              <span className="font-semibold text-slate-800">{CLINIC_CONFIG.specialization}</span>
            </div>
            <div>
              <span className="text-slate-400 block uppercase text-[10px] font-bold">Qualifications</span>
              <span className="font-semibold text-slate-800">{CLINIC_CONFIG.doctorQualification}</span>
            </div>
            <div>
              <span className="text-slate-400 block uppercase text-[10px] font-bold">Clinical Experience</span>
              <span className="font-semibold text-slate-800">{CLINIC_CONFIG.doctorExperience}</span>
            </div>
            <div>
              <span className="text-slate-400 block uppercase text-[10px] font-bold">Bio & Philosophy</span>
              <span className="font-normal text-slate-600 leading-relaxed block mt-0.5">
                {CLINIC_CONFIG.doctorBio}
              </span>
            </div>
          </div>
        </div>

        {/* Clinic Location & Contact Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Building2 className="w-5 h-5 text-teal-600" />
            <h2 className="text-sm font-bold text-slate-900">Clinic Premises & Timings</h2>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-400 block uppercase text-[10px] font-bold">Clinic Name</span>
              <span className="font-semibold text-slate-800 text-sm">{CLINIC_CONFIG.clinicName}</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block uppercase text-[10px] font-bold">Address</span>
                <span className="font-semibold text-slate-800">{CLINIC_CONFIG.clinicAddress}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-teal-600 flex-shrink-0" />
              <div>
                <span className="text-slate-400 block uppercase text-[10px] font-bold">Direct Hotline</span>
                <span className="font-semibold text-slate-800">{CLINIC_CONFIG.contactPhone}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-teal-600 flex-shrink-0" />
              <div>
                <span className="text-slate-400 block uppercase text-[10px] font-bold">Official Email</span>
                <span className="font-semibold text-slate-800">{CLINIC_CONFIG.contactEmail}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-600 flex-shrink-0" />
              <div>
                <span className="text-slate-400 block uppercase text-[10px] font-bold">Consultation Timings</span>
                <span className="font-semibold text-slate-800">{CLINIC_CONFIG.clinicTimings}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* JSON Database & Demo Configuration Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Database className="w-5 h-5 text-teal-600" />
          <h2 className="text-sm font-bold text-slate-900">Active Database Storage</h2>
        </div>

        <div className="p-4 bg-teal-50/50 rounded-xl border border-teal-200 text-xs text-teal-900 space-y-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-700" />
            <span className="font-bold">JSON File-Based Database Backend (`clinic_db.json`)</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            All appointments, audit history, doctor logins, and enquiries are persistently saved in
            the JSON storage engine. An automatic browser-side replica is maintained so the dashboard
            functions seamlessly even when running offline or on static web hosts.
          </p>
        </div>

        <div className="text-xs text-slate-500">
          <strong>Centralized Config Source:</strong> <code>src/config/clinicConfig.ts</code>
        </div>
      </div>

      {/* QR Code Modal */}
      {qrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 border border-slate-200 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-emerald-600" />
                <span>WAHA Session Pairing</span>
              </h3>
              <button
                type="button"
                onClick={() => setQrModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl flex flex-col items-center justify-center min-h-[220px]">
              {qrLoading ? (
                <div className="text-center text-xs text-slate-400">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-teal-600" />
                  <span>Loading WAHA QR code...</span>
                </div>
              ) : qrCode ? (
                <div className="space-y-2 text-center">
                  <img
                    src={qrCode.startsWith('data:') ? qrCode : `data:image/png;base64,${qrCode}`}
                    alt="WAHA WhatsApp QR Code"
                    className="w-48 h-48 mx-auto rounded-lg border border-slate-200"
                  />
                  <p className="text-[11px] text-slate-600">Scan this code in WhatsApp &gt; Linked Devices</p>
                </div>
              ) : (
                <div className="text-center p-4 text-xs text-slate-500 space-y-2">
                  <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto" />
                  <p className="font-semibold text-slate-800">No active QR code received</p>
                  <p className="text-[11px] text-slate-400">
                    Either WAHA is not running on port 3000, or the session is already authenticated.
                  </p>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setQrModalOpen(false)}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


