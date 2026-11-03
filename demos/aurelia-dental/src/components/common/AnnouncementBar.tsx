import React from 'react';
import { Clock, MapPin, Sparkles, Phone, ShieldAlert } from 'lucide-react';
import { CLINIC_CONFIG } from '../../config/clinicConfig';

export const AnnouncementBar: React.FC = () => {
  return (
    <aside aria-label="Clinic announcements" className="bg-teal-900 text-white text-xs py-2 px-4 border-b border-teal-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-teal-200 font-medium tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-teal-300" />
          <span>{CLINIC_CONFIG.clinicName} — Demo Dental Practice</span>
          <span className="hidden md:inline text-teal-700">|</span>
          <span className="hidden md:flex items-center gap-1 text-teal-100">
            <Clock className="w-3.5 h-3.5" /> {CLINIC_CONFIG.clinicTimings}
          </span>
        </div>

        <div className="flex items-center gap-4 text-white">
          <a 
            href={`tel:${CLINIC_CONFIG.contactPhone}`} 
            className="flex items-center gap-1.5 hover:text-teal-300 transition-colors duration-150"
            aria-label={`Call clinic at ${CLINIC_CONFIG.contactPhone}`}
          >
            <Phone className="w-3.5 h-3.5 text-teal-300" />
            <span className="font-semibold font-mono">{CLINIC_CONFIG.contactPhone}</span>
          </a>
          <span className="hidden sm:inline text-teal-700">•</span>
          <div className="hidden sm:flex items-center gap-1 text-teal-200">
            <MapPin className="w-3.5 h-3.5 text-teal-300" />
            <span>{CLINIC_CONFIG.clinicAddress}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
