import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { COMPANY_CONFIG } from '../../data/company';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Industries', path: '/industries' },
    { label: 'Our Work', path: '/portfolio' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-border transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group" onClick={() => setMobileMenuOpen(false)}>
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-accent shadow-sm group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" rx="24" fill="#123C3A"/>
                <path d="M30 32 H70 C76 32, 80 36, 80 42 C80 48, 76 52, 70 52 H42 V68 C42 74, 38 78, 32 78 C26 78, 22 74, 22 68 V40 C22 35, 26 32, 30 32 Z" fill="#B7D8C9"/>
                <circle cx="70" cy="70" r="10" fill="#B7D8C9"/>
              </svg>
            </div>
            <div>
              <span className="font-bold text-lg text-heading tracking-tight flex items-center gap-1.5">
                {COMPANY_CONFIG.name}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-body font-medium block -mt-1">
                Healthcare Web Studio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-primary font-semibold bg-accent-subtle/70'
                    : 'text-body hover:text-heading hover:bg-bg/60'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5 text-accent" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              to="/quote"
              className="px-3 py-1.5 rounded-full bg-primary text-white text-xs font-semibold"
            >
              Get Quote
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-heading hover:bg-bg border border-border"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface border-b border-border px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                  isActive(link.path)
                    ? 'bg-accent-subtle text-primary font-bold'
                    : 'text-heading hover:bg-bg'
                }`}
              >
                <span>{link.label}</span>
                {isActive(link.path) && <Sparkles className="w-3.5 h-3.5 text-secondary" />}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-border space-y-2">
            <Link
              to="/quote"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-primary text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Request a Custom Quote</span>
              <ArrowRight className="w-4 h-4 text-accent" />
            </Link>
            <a
              href={`https://wa.me/${COMPANY_CONFIG.contact.whatsappNumber}?text=Hi%20${encodeURIComponent(COMPANY_CONFIG.name)},%20I%20would%20like%20to%20inquire%20about%20a%20website%20for%20my%20business.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-900 text-xs font-medium flex items-center justify-center gap-2"
            >
              <span>Chat Directly on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
