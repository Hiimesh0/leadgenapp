import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { CLINIC_INFO } from '../../data/clinicData';

export const WhatsAppButton: React.FC = () => {
  const [tooltipDismissed, setTooltipDismissed] = useState(false);

  const whatsappMessage = encodeURIComponent(
    "Hello Aurelia Dental Studio, I am looking to schedule a consultation in Vesu, Surat. Could you please share available slots?"
  );

  const whatsappUrl = `https://wa.me/${CLINIC_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Floating Prompt Pill */}
      {!tooltipDismissed && (
        <div className="mb-2 bg-surface text-text-primary px-3 py-2 rounded-2xl shadow-card-hover border border-border text-xs flex items-center gap-2 max-w-[240px] animate-bounce duration-1000">
          <span>Chat with our Studio Concierge on WhatsApp</span>
          <button
            onClick={() => setTooltipDismissed(true)}
            className="text-text-muted hover:text-text-primary p-0.5"
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
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
        aria-label="Chat with Aurelia Dental Studio on WhatsApp (Opens in new tab)"
      >
        <MessageCircle className="w-7 h-7 fill-current stroke-white group-hover:scale-110 transition-transform" />
      </a>
    </div>
  );
};

