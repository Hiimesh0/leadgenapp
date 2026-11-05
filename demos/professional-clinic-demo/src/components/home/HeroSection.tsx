import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, ShieldCheck, Heart, Sparkles, Clock } from 'lucide-react';
import { CLINIC_INFO } from '../../data/clinic';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-background pt-12 pb-20 lg:py-24 border-b border-border">
      {/* Background Subtle Ambient Shape */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-accent/20 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-secondary/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 bg-surface border border-border px-3.5 py-1.5 rounded-full text-xs font-semibold text-secondary shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-secondary" />
              <span>{CLINIC_INFO.specialty} • Surat, Gujarat</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary leading-[1.15]">
              A Healthier Smile Starts With{' '}
              <span className="text-secondary italic font-normal">Thoughtful Care</span>
            </h1>

            {/* Supporting Description */}
            <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Discover personalized dental care in a calm, welcoming environment designed around your comfort and confidence. We combine micro-precision aesthetics with a tranquil clinical experience.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <Link
                to="/appointment"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-primary hover:bg-primary-hover text-surface text-sm font-semibold tracking-wide uppercase px-7 py-4 rounded-xl shadow-card hover:shadow-elevated transition-all duration-200"
              >
                <Calendar className="w-4 h-4 text-accent" />
                <span>Book an Appointment</span>
              </Link>
              <Link
                to="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-surface hover:bg-white text-text border border-border px-6 py-4 rounded-xl text-sm font-semibold hover:border-accent transition-all duration-200 shadow-sm"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4 text-secondary" />
              </Link>
            </div>

            {/* Quick Micro-Trust Badges */}
            <div className="pt-6 border-t border-border/70 grid grid-cols-3 gap-3 text-left">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-surface border border-border text-secondary flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-primary">Class-B Protocol</h4>
                  <p className="text-[11px] text-text-muted">Strict Hygiene</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-surface border border-border text-secondary flex-shrink-0">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-primary">Gentle Touch</h4>
                  <p className="text-[11px] text-text-muted">Anxiety-Free Care</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-surface border border-border text-secondary flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-primary">Zero Waiting</h4>
                  <p className="text-[11px] text-text-muted">Prompt Slots</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-elevated border-4 border-surface bg-background">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80"
                  alt="Modern Aesthetic Clinic Interior"
                  className="w-full h-[420px] sm:h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent"></div>
                
                {/* Floating Bottom Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-surface/95 backdrop-blur-md p-4 rounded-2xl border border-border/80 shadow-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-primary">{CLINIC_INFO.name}</p>
                      <p className="text-[11px] text-text-muted">Mon–Sat • 9:00 AM – 7:00 PM</p>
                    </div>
                    <Link
                      to="/contact"
                      className="text-xs font-semibold text-secondary hover:text-primary flex items-center gap-1"
                    >
                      <span>Locate Us</span>
                      <ArrowRight className="w-3 h-3 text-accent" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Floating Floating Accent Pill */}
              <div className="absolute -top-4 -left-4 bg-surface p-3 rounded-2xl shadow-elevated border border-border flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-accent/40 flex items-center justify-center text-primary font-serif font-bold text-sm">
                  Dr
                </div>
                <div className="pr-2">
                  <p className="text-xs font-bold text-primary leading-tight">{CLINIC_INFO.doctorName}</p>
                  <p className="text-[10px] text-text-muted">Chief Aesthetic Specialist</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

