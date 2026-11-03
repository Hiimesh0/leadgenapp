import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar, Phone, ArrowRight, UserCheck } from 'lucide-react';
import { CLINIC_CONFIG } from '../../config/clinicConfig';

interface HeaderProps {
  onOpenAppointmentModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAppointmentModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Doctor Profile', path: '/team' },
    { name: 'Patient Info', path: '/patient-info' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 py-3' : 'bg-white border-b border-slate-200 py-3.5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Wordmark */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none" aria-label="XYZ Dental Clinic Homepage">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-teal-800 flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:bg-teal-700 transition-colors duration-200">
              XYZ
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 block leading-none">
                {CLINIC_CONFIG.clinicName}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-teal-800 uppercase block mt-1">
                {CLINIC_CONFIG.doctorSpecialization} • {CLINIC_CONFIG.city}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7" role="navigation" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-150 py-1 relative ${
                  isActive(link.path)
                    ? 'text-teal-800 font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-700 rounded-full animate-fade-in" />
                )}
              </Link>
            ))}
          </nav>

          {/* Action CTAs & Mobile Hamburger */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Discreet Doctor Portal link */}
            <Link
              to="/doctor/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-teal-800 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition border border-transparent hover:border-slate-200"
              title="Access Doctor Administrative Portal"
            >
              <UserCheck className="w-3.5 h-3.5 text-teal-700" />
              <span className="hidden sm:inline">Doctor Portal</span>
            </Link>

            <a
              href={`tel:${CLINIC_CONFIG.contactPhone}`}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-teal-800 px-3 py-2 rounded-xl border border-slate-200 hover:border-teal-300 transition"
              aria-label="Direct clinic phone line"
            >
              <Phone className="w-3.5 h-3.5 text-teal-700" />
              <span>{CLINIC_CONFIG.contactPhone}</span>
            </a>

            <button
              onClick={onOpenAppointmentModal}
              className="inline-flex items-center gap-2 bg-teal-800 hover:bg-teal-900 text-white text-xs sm:text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition active:scale-95 cursor-pointer uppercase tracking-wider"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Visit</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-white/98 backdrop-blur-lg border-b border-slate-200 shadow-xl transition-all animate-in slide-in-from-top-2 duration-200">
          <div className="px-5 pt-3 pb-6 space-y-2 max-w-md mx-auto">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isActive(link.path)
                    ? 'bg-teal-50 text-teal-800'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 opacity-40" />
              </Link>
            ))}

            <Link
              to="/doctor/login"
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-teal-800 bg-teal-50/60 border border-teal-200/60"
            >
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4" />
                <span>Doctor Administration Portal</span>
              </div>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="pt-4 border-t border-slate-200 mt-3 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAppointmentModal();
                }}
                className="w-full flex items-center justify-center gap-2 bg-teal-800 text-white py-3 rounded-xl font-semibold text-sm shadow-sm cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>

              <a
                href={`tel:${CLINIC_CONFIG.contactPhone}`}
                className="w-full flex items-center justify-center gap-2 border border-slate-200 text-slate-800 py-2.5 rounded-xl font-semibold text-xs"
              >
                <Phone className="w-3.5 h-3.5 text-teal-700" />
                <span>Call Clinic: {CLINIC_CONFIG.contactPhone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
