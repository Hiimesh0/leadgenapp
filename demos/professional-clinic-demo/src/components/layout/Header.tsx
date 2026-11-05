import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Calendar, Sparkles } from 'lucide-react';
import { CLINIC_INFO } from '../../data/clinic';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Doctors', path: '/doctors' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      isScrolled ? 'bg-surface/95 backdrop-blur-md shadow-soft border-b border-border' : 'bg-surface border-b border-border/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Wordmark */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-accent shadow-sm group-hover:bg-primary-hover transition-colors">
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-primary block leading-tight">
                {CLINIC_INFO.name}
              </span>
              <span className="text-[11px] tracking-wider uppercase text-text-muted font-medium block">
                {CLINIC_INFO.specialty}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium tracking-wide transition-colors py-1 border-b-2 ${
                  isActive(link.path)
                    ? 'text-primary border-primary font-semibold'
                    : 'text-text-muted border-transparent hover:text-primary hover:border-accent'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${CLINIC_INFO.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-2 text-xs font-semibold text-text-muted hover:text-primary transition-colors py-2 px-3 rounded-lg hover:bg-background"
            >
              <Phone className="w-3.5 h-3.5 text-secondary" />
              <span>{CLINIC_INFO.phone}</span>
            </a>
            <Link
              to="/appointment"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-surface text-xs font-semibold tracking-wide uppercase px-5 py-2.5 rounded-lg shadow-sm hover:shadow transition-all duration-200"
            >
              <Calendar className="w-3.5 h-3.5 text-accent" />
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              to="/appointment"
              className="inline-flex items-center justify-center bg-primary text-surface p-2 rounded-lg text-xs font-medium"
              aria-label="Book appointment"
            >
              <Calendar className="w-4 h-4 text-accent" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-text hover:text-primary hover:bg-background transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface border-b border-border shadow-elevated px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-background text-primary font-semibold'
                    : 'text-text-muted hover:bg-background hover:text-text'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-3 border-t border-border flex flex-col gap-2.5">
            <Link
              to="/appointment"
              className="w-full py-3 bg-primary text-surface text-center rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
            >
              <Calendar className="w-4 h-4 text-accent" />
              <span>Book Appointment</span>
            </Link>
            <a
              href={`tel:${CLINIC_INFO.phone.replace(/\s+/g, '')}`}
              className="w-full py-2.5 border border-border text-text text-center rounded-lg text-xs font-medium flex items-center justify-center gap-2 hover:bg-background"
            >
              <Phone className="w-3.5 h-3.5 text-secondary" />
              <span>Call Clinic: {CLINIC_INFO.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

