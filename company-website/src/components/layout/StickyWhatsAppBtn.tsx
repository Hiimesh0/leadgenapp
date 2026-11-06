import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { COMPANY_CONFIG } from '../../data/company';

export const StickyWhatsAppBtn: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${COMPANY_CONFIG.name},\n\nI would like to inquire about building a website for my practice / business.`
    );
    window.open(`https://wa.me/${COMPANY_CONFIG.contact.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Helpful subtle speech tooltip */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-heading px-3.5 py-2 rounded-2xl shadow-elevated border border-border text-xs animate-in fade-in slide-in-from-right duration-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-medium">Have a question? Chat with Himesh</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-body hover:text-heading ml-1 p-0.5 rounded-full hover:bg-bg"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={openWhatsApp}
        className="relative group w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-elevated transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-300/40"
        aria-label="Chat directly on WhatsApp"
        title="Chat with ClinicCraft Solutions on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-30 animate-ping pointer-events-none"></span>
        <MessageCircle className="w-7 h-7 relative z-10 transition-transform group-hover:scale-110" />
      </button>
    </div>
  );
};
