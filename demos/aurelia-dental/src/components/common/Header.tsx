import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar, Phone, ChevronRight, UserCheck, Clock, MapPin } from 'lucide-react';
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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [mobileMenuOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white shadow-md border-b border-slate-200 py-2.5'
            : 'bg-white border-b border-slate-200 py-3 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2">
            
            {/* Logo & Clinic Name */}
            <Link
              to="/"
              className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none min-w-0"
              aria-label="XYZ Dental Clinic Homepage"
              onClick={handleLinkClick}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal-800 flex items-center justify-center text-white font-black text-base sm:text-lg shadow-sm group-hover:bg-teal-700 transition-colors shrink-0">
                XYZ
              </div>
              <div className="min-w-0">
                <span className="text-base sm:text-xl font-extrabold tracking-tight text-slate-900 block leading-tight truncate">
                  {CLINIC_CONFIG.clinicName}
                </span>
                <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-teal-800 uppercase block truncate">
                  {CLINIC_CONFIG.doctorSpecialization} • {CLINIC_CONFIG.city}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7" role="navigation" aria-label="Main Navigation">
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

            {/* Desktop & Mobile Actions */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              {/* Doctor Portal - Desktop only */}
              <Link
                to="/doctor/login"
                className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-teal-800 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition border border-transparent hover:border-slate-200"
                title="Access Doctor Administrative Portal"
              >
                <UserCheck className="w-3.5 h-3.5 text-teal-700" />
                <span>Doctor Portal</span>
              </Link>

              {/* Call Hotline - Desktop & Tablet */}
              <a
                href={`tel:${CLINIC_CONFIG.contactPhone}`}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-teal-800 px-3 py-2 rounded-xl border border-slate-200 hover:border-teal-300 transition"
                aria-label={`Call clinic at ${CLINIC_CONFIG.contactPhone}`}
              >
                <Phone className="w-3.5 h-3.5 text-teal-700" />
                <span className="font-mono">{CLINIC_CONFIG.contactPhone}</span>
              </a>

              {/* Book Appointment CTA */}
              <button
                type="button"
                onClick={onOpenAppointmentModal}
                className="hidden sm:inline-flex items-center gap-1.5 bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-sm transition active:scale-95 cursor-pointer uppercase tracking-wider"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Visit</span>
              </button>

              {/* Compact Mobile Call Button */}
              <a
                href={`tel:${CLINIC_CONFIG.contactPhone}`}
                className="sm:hidden p-2 rounded-xl bg-slate-100 text-teal-800 hover:bg-teal-50 border border-slate-200 flex items-center justify-center w-9 h-9"
                aria-label="Call clinic directly"
              >
                <Phone className="w-4 h-4" />
              </a>

              {/* Mobile Hamburger Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-teal-600 cursor-pointer"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════════
          MOBILE NAVIGATION DRAWER OVERLAY (100% OPAQUE & ACCESSIBLE)
      ══════════════════════════════════════════════════════════════════ */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[70] overflow-hidden" role="dialog" aria-modal="true">
          {/* Solid Dark Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Opaque Sliding Drawer Panel */}
          <div className="fixed inset-y-0 right-0 w-full max-w-[320px] xs:max-w-[360px] bg-white shadow-2xl flex flex-col h-full border-l border-slate-200 z-[75] animate-in slide-in-from-right duration-250 ease-out">
            
            {/* Drawer Header */}
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-800 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                  XYZ
                </div>
                <div>
                  <span className="font-extrabold text-sm text-slate-900 block leading-tight">
                    {CLINIC_CONFIG.clinicName}
                  </span>
                  <span className="text-[10px] text-teal-800 font-semibold uppercase">
                    Menu & Navigation
                  </span>
                </div>
              </div>

              {/* Explicit Close Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 rounded-xl bg-white hover:bg-slate-200 border border-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors focus:outline-none cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links (Scrollable Body with 100% Opaque Solid BG) */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 bg-white">
              <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Clinic Pages
              </div>

              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={handleLinkClick}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors ${
                      active
                        ? 'bg-teal-50 text-teal-900 border-l-4 border-teal-700 shadow-sm'
                        : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className={`w-4 h-4 ${active ? 'text-teal-700' : 'text-slate-400'}`} />
                  </Link>
                );
              })}

              {/* Doctor Portal Item */}
              <div className="pt-3 mt-3 border-t border-slate-100">
                <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Doctor Administration
                </div>
                <Link
                  to="/doctor/login"
                  onClick={handleLinkClick}
                  className="flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold text-teal-900 bg-teal-50/70 hover:bg-teal-100/70 border border-teal-200/80 transition-colors mt-1"
                >
                  <div className="flex items-center gap-2.5">
                    <UserCheck className="w-4 h-4 text-teal-700" />
                    <span>Doctor Admin Dashboard</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-teal-700" />
                </Link>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAppointmentModal();
                }}
                className="w-full flex items-center justify-center gap-2 bg-teal-800 hover:bg-teal-900 text-white py-3 px-4 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Consultation</span>
              </button>

              <a
                href={`tel:${CLINIC_CONFIG.contactPhone}`}
                className="w-full flex items-center justify-center gap-2 border border-slate-300 hover:bg-white text-slate-800 py-2.5 px-4 rounded-xl font-semibold text-xs transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-teal-700" />
                <span>Call Clinic: {CLINIC_CONFIG.contactPhone}</span>
              </a>

              <div className="pt-2 text-[11px] text-slate-500 text-center space-y-0.5">
                <div className="flex items-center justify-center gap-1 font-medium text-slate-600">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{CLINIC_CONFIG.clinicTimings}</span>
                </div>
                <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{CLINIC_CONFIG.clinicAddress}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Header;
