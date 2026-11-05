import React from 'react';
import { MessageCircle } from 'lucide-react';
import { CLINIC_INFO } from '../../data/clinic';

export const WhatsAppFloatingBtn: React.FC = () => {
  const prefilledMessage = encodeURIComponent(
    `Hello ${CLINIC_INFO.name}! I came across your clinic website demo and would like to learn more about your dental treatments.`
  );
  const waUrl = `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${prefilledMessage}`;

  return (
    <aside aria-label="WhatsApp Contact" className="fixed bottom-6 right-6 z-50 flex items-center gap-2 group">
      <span className="hidden sm:inline-block bg-surface text-text text-xs font-semibold px-3 py-1.5 rounded-full shadow-elevated border border-border opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Chat with Clinic
      </span>
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full flex items-center justify-center shadow-elevated hover:shadow-2xl hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
        aria-label="Contact clinic on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
        {/* Pulsing beacon indicator */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-accent border-2 border-surface rounded-full animate-ping"></span>
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-accent border-2 border-surface rounded-full"></span>
      </a>
    </aside>
  );
};

