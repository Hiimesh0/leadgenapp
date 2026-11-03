import React from 'react';
import { CLINIC_CONFIG } from '../../config/clinicConfig';
import { Building2, User, Phone, Mail, Clock, MapPin, Database, ShieldCheck } from 'lucide-react';

export const DoctorSettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">Clinic Profile & System Settings</h1>
        <p className="text-xs text-slate-500 mt-1">
          Centralized configuration overview for {CLINIC_CONFIG.clinicName}
        </p>
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
    </div>
  );
};
