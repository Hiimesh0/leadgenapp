import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, PhoneCall, Sparkles } from 'lucide-react';
import { COMPANY_CONFIG } from '../../data/company';

export const HomeCtaSection: React.FC = () => {
  return (
    <section className="py-20 bg-primary text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/15 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-accent text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Start Your Digital Presence</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
          Ready to Build Your Business's Digital Presence?
        </h2>

        <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Whether you need a sleek 3-page doctor profile or a comprehensive multi-service clinic website with WhatsApp booking, let's discuss your requirements today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            to="/quote"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-accent hover:bg-accent-hover text-primary font-bold text-sm shadow-premium transition-all active:scale-[0.98]"
          >
            <span>Let's Discuss Your Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href={`https://wa.me/${COMPANY_CONFIG.contact.whatsappNumber}?text=Hi%20${encodeURIComponent(COMPANY_CONFIG.name)},%20I%20would%20like%20to%20discuss%20a%20new%20website.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all"
          >
            <MessageSquare className="w-4 h-4 text-accent" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        <div className="pt-6 border-t border-white/10 text-xs text-white/70 flex flex-wrap items-center justify-center gap-6">
          <span>Direct developer contact</span>
          <span>•</span>
          <span>Transparent quotes within 24 hours</span>
          <span>•</span>
          <span>Based in Gujarat, India</span>
        </div>

      </div>
    </section>
  );
};
