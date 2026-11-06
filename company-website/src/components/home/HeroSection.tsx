import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2, ExternalLink, ShieldCheck, Clock, Zap } from 'lucide-react';
import { COMPANY_CONFIG } from '../../data/company';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-surface via-bg/40 to-bg border-b border-border">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none -mt-20"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-subtle border border-accent/40 text-primary text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-secondary" />
              <span>Specialized in Clinic & Healthcare Websites</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-heading tracking-tight leading-[1.15]">
              {COMPANY_CONFIG.tagline}
            </h1>

            <p className="text-body text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {COMPANY_CONFIG.shortDescription}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/quote"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary hover:bg-primary-hover text-white font-semibold text-sm shadow-premium hover:shadow-elevated transition-all active:scale-[0.98]"
              >
                <span>Get a Free Consultation</span>
                <ArrowRight className="w-4 h-4 text-accent" />
              </Link>

              <Link
                to="/portfolio"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-bg border border-border text-heading font-semibold text-sm shadow-subtle hover:border-body/40 transition-all"
              >
                <span>Explore Our Work</span>
              </Link>
            </div>

            {/* Micro Trust Points */}
            <div className="pt-6 border-t border-border/70 grid grid-cols-3 gap-2 sm:gap-4 text-left">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-heading">
                  <Clock className="w-3.5 h-3.5 text-secondary shrink-0" />
                  <span>5 – 15 Days</span>
                </div>
                <p className="text-[11px] text-body">Predictable delivery timeline</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-heading">
                  <Zap className="w-3.5 h-3.5 text-secondary shrink-0" />
                  <span>Mobile First</span>
                </div>
                <p className="text-[11px] text-body">100% responsive architecture</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-heading">
                  <ShieldCheck className="w-3.5 h-3.5 text-secondary shrink-0" />
                  <span>Transparent</span>
                </div>
                <p className="text-[11px] text-body">Zero hidden agency markups</p>
              </div>
            </div>

          </div>

          {/* Right Column: Realistic Browser Mockup Preview */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Browser Window Frame */}
              <div className="bg-surface rounded-2xl shadow-elevated border border-border overflow-hidden">
                
                {/* Browser Titlebar */}
                <div className="bg-bg px-4 py-3 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-400"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                  </div>
                  <div className="px-3 py-1 rounded-md bg-white border border-border text-[11px] font-mono text-body flex items-center gap-1.5 max-w-[220px] truncate">
                    <span className="text-emerald-600 font-bold">https://</span>
                    <span>aureliadental.demo.site</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-secondary bg-accent-subtle px-2 py-0.5 rounded">
                    Demo
                  </span>
                </div>

                {/* Browser Content Image */}
                <div className="relative aspect-[16/11] bg-bg overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80"
                    alt="Aurelia Dental Clinic Website Showcase"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-accent">
                      Featured Concept Project
                    </span>
                    <h3 className="font-bold text-lg sm:text-xl text-white mt-0.5">
                      Aurelia Dental Demo Practice
                    </h3>
                    <p className="text-xs text-white/80 line-clamp-2 mt-1">
                      Modern aesthetic dental clinic design with doctor profiles, treatments breakdown, operatory photo tour, and instant WhatsApp booking.
                    </p>

                    <div className="mt-4 flex items-center gap-3">
                      <a
                        href={COMPANY_CONFIG.links.demoSiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent text-primary font-bold text-xs hover:bg-accent-hover transition-colors shadow-sm"
                      >
                        <span>Launch Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <span className="text-[11px] text-white/70">
                        Concept Project
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mockup footer ticker */}
                <div className="p-3 bg-surface border-t border-border text-center text-xs text-body flex items-center justify-around">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
                    <span>WhatsApp Desk</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
                    <span>Intake Forms</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
                    <span>Google Maps</span>
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
