import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar, Phone, ArrowRight } from 'lucide-react';
import { CLINIC_INFO } from '../../data/clinicData';

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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Meet the Dentists', path: '/team' },
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
      isScrolled ? 'bg-surface/95 backdrop-blur-md shadow-sm border-b border-border py-3' : 'bg-surface border-b border-border py-4'
    }`}>
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Wordmark */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none" aria-label="Aurelia Dental Studio Homepage">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary flex items-center justify-center text-accent shadow-sm group-hover:bg-primary-light transition-colors duration-200">
              {/* Elegant Leaf/Tooth SVG Symbol */}
              <svg viewBox="0 0 40 40" className="w-6 h-6 fill-current">
                <path d="M20 6 C12 6, 8 13, 8 20 C8 27, 12 34, 18 36 C19 32, 20 28, 20 24 C20 28, 21 32, 22 36 C28 34, 32 27, 32 20 C32 13, 28 6, 20 6 Z M20 12 C24 16, 26 20, 26 23 C24 23, 21 21, 20 18 C19 21, 16 23, 14 23 C14 20, 16 16, 20 12 Z" />
              </svg>
            </div>
            <div>
              <span className="font-serif-heading text-xl sm:text-2xl font-bold tracking-tight text-primary block leading-none">
                Aurelia
              </span>
              <span className="text-[10px] sm:text-xs font-medium tracking-[0.2em] text-text-secondary uppercase block mt-1">
                Dental Studio • Surat
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8" role="navigation" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-150 py-1 relative ${
                  isActive(link.path)
                    ? 'text-primary font-semibold'
                    : 'text-text-secondary hover:text-primary'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full animate-fade-in" />
                )}
              </Link>
            ))}
          </nav>

          {/* Action CTAs & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${CLINIC_INFO.phone}`}
              className="hidden sm:flex items-center gap-2 text-xs font-semibold text-primary hover:text-primary-light px-3 py-2 rounded-full border border-border hover:border-primary transition-all duration-200"
              aria-label="Direct clinic phone line"
            >
              <Phone className="w-3.5 h-3.5 text-accent" />
              <span>Call Desk</span>
            </a>

            <button
              onClick={onOpenAppointmentModal}
              className="hidden md:inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-text-inverse text-xs sm:text-sm font-medium px-4 sm:px-5 py-2.5 rounded-pill shadow-btn hover:shadow-green transition-all duration-200 active:scale-95"
            >
              <Calendar className="w-4 h-4 text-accent" />
              <span>Request Appointment</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-text-primary hover:bg-bg-soft transition-colors focus:outline-none"
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
        <div className="lg:hidden fixed inset-x-0 top-full bg-surface/98 backdrop-blur-lg border-b border-border shadow-lg transition-all animate-in slide-in-from-top-2 duration-200">
          <div className="px-5 pt-3 pb-6 space-y-2 max-w-md mx-auto">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-bg-muted text-primary font-semibold'
                    : 'text-text-secondary hover:text-primary hover:bg-bg-soft'
                }`}
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 opacity-40" />
              </Link>
            ))}

            <div className="pt-4 border-t border-border mt-3 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAppointmentModal();
                }}
                className="w-full flex items-center justify-center gap-2 bg-primary text-text-inverse py-3 rounded-pill font-medium text-sm shadow-btn"
              >
                <Calendar className="w-4 h-4 text-accent" />
                <span>Request Appointment</span>
              </button>

              <a
                href={`tel:${CLINIC_INFO.phone}`}
                className="w-full flex items-center justify-center gap-2 border border-primary text-primary py-2.5 rounded-pill font-medium text-sm"
              >
                <Phone className="w-4 h-4 text-accent" />
                <span>Call Clinic: {CLINIC_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

