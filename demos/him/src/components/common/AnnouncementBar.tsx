import React from 'react';
import { Clock, MapPin, Sparkles, Phone } from 'lucide-react';
import { CLINIC_CONFIG } from '../../config/clinicConfig';

export const AnnouncementBar: React.FC = () => {
  return (
    <aside aria-label="Clinic announcements" className="bg-teal-950 text-white text-[11px] sm:text-xs py-1.5 px-3 sm:px-4 border-b border-teal-900/60 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-2 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-1.5 text-teal-200 font-medium tracking-wide truncate">
          <Sparkles className="w-3 h-3 text-teal-300 shrink-0" />
          <span className="truncate">{CLINIC_CONFIG.clinicName} — Demo Dental Practice</span>
          <span className="hidden md:inline text-teal-800">|</span>
          <span className="hidden md:flex items-center gap-1 text-teal-100">
            <Clock className="w-3 h-3" /> {CLINIC_CONFIG.clinicTimings}
          </span>
        </div>

        <div className="flex items-center justify-center gap-3 text-white">
          <a 
            href={`tel:${CLINIC_CONFIG.contactPhone}`} 
            className="flex items-center gap-1 hover:text-teal-300 transition-colors font-semibold"
            aria-label={`Call clinic at ${CLINIC_CONFIG.contactPhone}`}
          >
            <Phone className="w-3 h-3 text-teal-400" />
            <span className="font-mono">{CLINIC_CONFIG.contactPhone}</span>
          </a>
          <span className="hidden sm:inline text-teal-800">•</span>
          <div className="hidden sm:flex items-center gap-1 text-teal-300 text-[10px]">
            <MapPin className="w-3 h-3 text-teal-400" />
            <span>Surat, Gujarat</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AnnouncementBar;
