import React from 'react';
import { Clock, MapPin, Sparkles, Phone } from 'lucide-react';
import { CLINIC_INFO } from '../../data/clinicData';

export const AnnouncementBar: React.FC = () => {
  return (
    <aside aria-label="Clinic announcements" className="bg-primary text-text-inverse text-xs sm:text-sm py-2 px-4 border-b border-primary-light/40">
      <div className="max-w-content mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-accent-light font-medium tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
          <span>New Patient Enquiries Welcome — Vesu, Surat</span>
          <span className="hidden md:inline text-white/40">|</span>
          <span className="hidden md:flex items-center gap-1 text-white/80">
            <Clock className="w-3.5 h-3.5" /> Mon–Sat: 9:00 AM – 8:00 PM
          </span>
        </div>

        <div className="flex items-center gap-4 text-white/90">
          <a 
            href={`tel:${CLINIC_INFO.phone}`} 
            className="flex items-center gap-1.5 hover:text-accent transition-colors duration-150"
            aria-label={`Call clinic at ${CLINIC_INFO.phone}`}
          >
            <Phone className="w-3.5 h-3.5 text-accent" />
            <span className="font-medium">{CLINIC_INFO.phone}</span>
          </a>
          <span className="hidden sm:inline text-white/40">•</span>
          <div className="hidden sm:flex items-center gap-1 text-white/75">
            <MapPin className="w-3.5 h-3.5 text-accent" />
            <span>Vesu Main Rd, Surat</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

