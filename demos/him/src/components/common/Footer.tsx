import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Heart, Lock, UserCheck } from 'lucide-react';
import { CLINIC_CONFIG } from '../../config/clinicConfig';
import { SERVICES } from '../../data/clinicData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-12 border-t border-slate-800" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                XYZ
              </div>
              <div>
                <span className="text-2xl font-extrabold text-white tracking-tight">{CLINIC_CONFIG.clinicName}</span>
                <span className="text-[10px] font-semibold tracking-wider text-teal-400 block uppercase">
                  {CLINIC_CONFIG.doctorSpecialization} • {CLINIC_CONFIG.city}
                </span>
              </div>
            </Link>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Comprehensive multispecialty dentistry led by {CLINIC_CONFIG.doctorName}. Featuring gentle root canals, cosmetic smile previews, implants, and digital aligners.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-teal-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Full Digital Workflow & Sterilization Protocol • Gujarat, India</span>
            </div>
          </div>

          {/* Core Services Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 text-teal-300">
              Dental Treatments
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {SERVICES.slice(0, 5).map((s) => (
                <li key={s.id}>
                  <Link to={`/services/${s.id}`} className="hover:text-teal-300 transition-colors duration-150">
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/services" className="text-teal-400 hover:underline font-medium inline-flex items-center gap-1 text-xs mt-1">
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 text-teal-300">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/about" className="hover:text-teal-300 transition-colors">About Clinic</Link></li>
              <li><Link to="/team" className="hover:text-teal-300 transition-colors">Doctor Profile</Link></li>
              <li><Link to="/patient-info" className="hover:text-teal-300 transition-colors">First Visit & Fees</Link></li>
              <li><Link to="/testimonials" className="hover:text-teal-300 transition-colors">Patient Experiences</Link></li>
              <li><Link to="/contact" className="hover:text-teal-300 transition-colors">Location & Directions</Link></li>
              <li><Link to="/appointment" className="hover:text-teal-300 transition-colors">Request Appointment</Link></li>
              <li className="pt-2 border-t border-slate-800">
                <Link to="/doctor/login" className="text-teal-400 hover:text-teal-300 font-semibold inline-flex items-center gap-1.5 text-xs">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Doctor Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 text-teal-300">
              Clinic Contact
            </h3>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span className="text-xs">{CLINIC_CONFIG.clinicAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`tel:${CLINIC_CONFIG.contactPhone}`} className="hover:text-teal-300 transition-colors text-xs font-mono">
                  {CLINIC_CONFIG.contactPhone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`mailto:${CLINIC_CONFIG.contactEmail}`} className="hover:text-teal-300 transition-colors text-xs truncate">
                  {CLINIC_CONFIG.contactEmail}
                </a>
              </div>
              <div className="flex items-start gap-2.5 pt-1 text-xs text-slate-400">
                <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>{CLINIC_CONFIG.clinicTimings}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Compulsory Demo Notice Banner */}
        <div className="mt-8 p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[11px] uppercase tracking-wider">
              DEMO NOTICE
            </span>
            <span>
              {CLINIC_CONFIG.demoNotice}
            </span>
          </div>
          <Link
            to="/doctor/login"
            className="text-xs font-semibold text-teal-300 hover:text-white bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-lg transition shrink-0 inline-flex items-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Doctor Login</span>
          </Link>
        </div>

        {/* Copyright and Legal links */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {CLINIC_CONFIG.clinicName}. Fictional Demo Website.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with precision for healthcare demonstration</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/patient-info" className="hover:text-slate-300">Privacy Standards</Link>
            <span>•</span>
            <Link to="/patient-info" className="hover:text-slate-300">Patient Rights</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
