import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { CLINIC_CONFIG } from '../../config/clinicConfig';

export const WhatsAppButton: React.FC = () => {
  const [tooltipDismissed, setTooltipDismissed] = useState(false);

  const whatsappMessage = encodeURIComponent(
    `Hello ${CLINIC_CONFIG.clinicName}, I would like to book a dental consultation with ${CLINIC_CONFIG.doctorName}.`
  );

  const cleanPhone = CLINIC_CONFIG.contactPhone.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/91${cleanPhone}?text=${whatsappMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end">
      
      {/* Floating Prompt Pill */}
      {!tooltipDismissed && (
        <div className="mb-2 bg-surface text-text-primary px-3 py-2 rounded-2xl shadow-card-hover border border-border text-xs flex items-center gap-2 max-w-[240px] animate-bounce duration-1000">
          <span>Chat with {CLINIC_CONFIG.clinicName} on WhatsApp</span>
          <button
            onClick={() => setTooltipDismissed(true)}
            className="text-text-muted hover:text-text-primary p-0.5 cursor-pointer"
            aria-label="Dismiss WhatsApp hint"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 cursor-pointer"
        aria-label={`Chat with ${CLINIC_CONFIG.clinicName} on WhatsApp`}
      >
        <MessageCircle className="w-7 h-7 fill-current stroke-white group-hover:scale-110 transition-transform" />
      </a>
    </div>
  );
};

