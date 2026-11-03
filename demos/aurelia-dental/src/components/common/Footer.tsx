import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';
import { CLINIC_INFO, SERVICES } from '../../data/clinicData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-text-inverse pt-16 pb-12 border-t border-primary-light/50" role="contentinfo">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-accent text-primary flex items-center justify-center font-bold">
                <svg viewBox="0 0 40 40" className="w-6 h-6 fill-current">
                  <path d="M20 6 C12 6, 8 13, 8 20 C8 27, 12 34, 18 36 C19 32, 20 28, 20 24 C20 28, 21 32, 22 36 C28 34, 32 27, 32 20 C32 13, 28 6, 20 6 Z" />
                </svg>
              </div>
              <div>
                <span className="font-serif-heading text-2xl font-bold text-white tracking-tight">Aurelia</span>
                <span className="text-[10px] font-medium tracking-[0.2em] text-accent block uppercase">Dental Studio • Surat</span>
              </div>
            </Link>
            
            <p className="text-white/80 text-sm leading-relaxed max-w-sm">
              A boutique dental studio committed to gentle, minimally invasive dental care, smile transformations, and restorative implantology in Vesu, Surat.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-accent">
              <ShieldCheck className="w-4 h-4" />
              <span>European Class-B Sterilization Standard • IDA Affiliated Practice</span>
            </div>
          </div>

          {/* Core Services Links */}
          <div>
            <h3 className="text-white font-serif-heading text-lg font-semibold mb-4 text-accent-light">
              Specialized Care
            </h3>
            <ul className="space-y-2.5 text-sm text-white/75">
              {SERVICES.slice(0, 5).map((s) => (
                <li key={s.id}>
                  <Link to={`/services/${s.id}`} className="hover:text-accent transition-colors duration-150">
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/services" className="text-accent hover:underline font-medium inline-flex items-center gap-1 text-xs mt-1">
                  View All Treatments →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-serif-heading text-lg font-semibold mb-4 text-accent-light">
              Patient Hub
            </h3>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li><Link to="/about" className="hover:text-accent transition-colors">About Our Studio</Link></li>
              <li><Link to="/team" className="hover:text-accent transition-colors">Meet the Dentists</Link></li>
              <li><Link to="/patient-info" className="hover:text-accent transition-colors">First Visit Guide & Fees</Link></li>
              <li><Link to="/testimonials" className="hover:text-accent transition-colors">Patient Stories</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Location & Hours</Link></li>
              <li><Link to="/appointment" className="hover:text-accent transition-colors">Request Appointment</Link></li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h3 className="text-white font-serif-heading text-lg font-semibold mb-4 text-accent-light">
              Studio Location
            </h3>
            <div className="space-y-3 text-sm text-white/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>{CLINIC_INFO.address}, {CLINIC_INFO.city}, {CLINIC_INFO.state}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a href={`tel:${CLINIC_INFO.phone}`} className="hover:text-accent transition-colors">
                  {CLINIC_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <a href={`mailto:${CLINIC_INFO.email}`} className="hover:text-accent transition-colors truncate">
                  {CLINIC_INFO.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5 pt-1 text-xs text-white/70">
                <Clock className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>{CLINIC_INFO.timings.weekdays}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Disclaimer Banner */}
        <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-white/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-accent/20 text-accent font-semibold text-[11px] uppercase tracking-wider">
              Demo Project
            </span>
            <span>
              <strong>Aurelia Dental Studio</strong> is a fictional, production-grade demonstration website designed by DigiBoost Gujarat to exhibit modern healthcare digital UX.
            </span>
          </div>
          <span className="text-white/50 text-[11px] shrink-0">
            No actual clinical appointments are transacted here.
          </span>
        </div>

        {/* Copyright and Legal links */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>
            © {new Date().getFullYear()} Aurelia Dental Studio. Demonstration Website.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-accent fill-accent" />
            <span>for Gujarat's Modern Healthcare Practices</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/patient-info" className="hover:text-accent">Privacy Standards</Link>
            <span>•</span>
            <Link to="/patient-info" className="hover:text-accent">Patient Rights</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

