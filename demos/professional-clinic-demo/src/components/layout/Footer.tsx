import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';
import { CLINIC_INFO } from '../../data/clinic';
import { SERVICES } from '../../data/services';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-surface/90 pt-16 pb-10 border-t border-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-accent">
                <Sparkles className="w-5 h-5 text-accent" />
              </div>
              <span className="font-serif text-2xl font-semibold text-white tracking-tight">
                {CLINIC_INFO.name}
              </span>
            </div>
            <p className="text-surface/80 text-sm leading-relaxed">
              {CLINIC_INFO.tagline} Providing calm, high-precision aesthetic and restorative dental healthcare designed around your comfort.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-accent">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>Hospital-Grade Sterilization Protocol</span>
            </div>
          </div>

          {/* Col 2: Treatments */}
          <div>
            <h4 className="text-white font-serif text-lg font-semibold mb-4 border-b border-secondary/40 pb-2">
              Clinical Treatments
            </h4>
            <ul className="space-y-2 text-sm">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link
                    to="/services"
                    className="text-surface/70 hover:text-accent transition-colors hover:translate-x-1 inline-block transform duration-150"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-white font-serif text-lg font-semibold mb-4 border-b border-secondary/40 pb-2">
              Clinic Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-surface/70 hover:text-accent transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-surface/70 hover:text-accent transition-colors">
                  Our Philosophy & Story
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-surface/70 hover:text-accent transition-colors">
                  Specialist Doctors
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-surface/70 hover:text-accent transition-colors">
                  Clinic Environment Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-surface/70 hover:text-accent transition-colors">
                  Contact & Map
                </Link>
              </li>
              <li>
                <Link to="/appointment" className="text-accent hover:underline font-medium">
                  Book Online Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div className="space-y-3">
            <h4 className="text-white font-serif text-lg font-semibold mb-4 border-b border-secondary/40 pb-2">
              Contact & Hours
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-surface/80">
              <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <span>{CLINIC_INFO.address}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-surface/80">
              <Phone className="w-4 h-4 text-accent flex-shrink-0" />
              <a href={`tel:${CLINIC_INFO.phone.replace(/\s+/g, '')}`} className="hover:text-accent">
                {CLINIC_INFO.phone}
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-surface/80">
              <Mail className="w-4 h-4 text-accent flex-shrink-0" />
              <a href={`mailto:${CLINIC_INFO.email}`} className="hover:text-accent">
                {CLINIC_INFO.email}
              </a>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-surface/80 pt-2 border-t border-secondary/30">
              <Clock className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p>{CLINIC_INFO.openingHours}</p>
                <p className="text-accent/90">{CLINIC_INFO.sundayHours}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Disclaimer Banner */}
        <div className="bg-secondary/40 border border-secondary/60 rounded-xl p-4 text-center mb-8">
          <p className="text-xs text-accent font-medium">
            ⚠️ <strong>CONCEPT DEMONSTRATION NOTICE:</strong> This website is an interactive concept demo built by{' '}
            <span className="text-white font-semibold">DigiBoost / LeadGenApp</span> to showcase the design quality of our{' '}
            <span className="text-white font-semibold">Professional Healthcare Website Plan</span>. All doctors, clinic details, addresses, and testimonials are illustrative and non-operational.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary/40 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-surface/60 gap-4">
          <p>© {new Date().getFullYear()} {CLINIC_INFO.name}. All Rights Reserved. Conceptual Healthcare Demo.</p>
          <p className="flex items-center gap-1">
            <span>Engineered for healthcare practices with</span>
            <Heart className="w-3.5 h-3.5 text-accent fill-accent" />
            <span>in Surat, Gujarat</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

