import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, ExternalLink, Heart } from 'lucide-react';
import { COMPANY_CONFIG } from '../../data/company';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white border-t border-primary-light/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Column 1: Company Profile (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent text-primary flex items-center justify-center font-bold text-lg shadow-sm">
                CC
              </div>
              <div>
                <span className="font-bold text-lg tracking-tight text-white block">
                  {COMPANY_CONFIG.name}
                </span>
                <span className="text-xs text-white/70 block">
                  Websites for Healthcare & Local Businesses
                </span>
              </div>
            </Link>

            <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
              Founded by Himesh in Gujarat, India. We design and build modern, mobile-first websites that help doctors, clinics, and businesses communicate their standard of care and attract patient inquiries.
            </p>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1 text-xs">
              <span className="font-semibold text-accent block">Direct Developer Partnership</span>
              <p className="text-white/70">
                You consult directly with the founder and developer. Transparent scope, clear milestone delivery, and zero agency fluff.
              </p>
            </div>
          </div>

          {/* Column 2: Navigation Links (Col 5-6) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-accent">Navigation</h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-accent transition-colors">Services</Link></li>
              <li><Link to="/industries" className="hover:text-accent transition-colors">Industries</Link></li>
              <li><Link to="/portfolio" className="hover:text-accent transition-colors">Our Work / Demos</Link></li>
              <li><Link to="/pricing" className="hover:text-accent transition-colors">Pricing Packages</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
              <li><Link to="/quote" className="hover:text-accent transition-colors font-semibold text-white">Get a Project Quote</Link></li>
            </ul>
          </div>

          {/* Column 3: Industries We Serve (Col 7-9) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-accent">Healthcare Sectors</h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li><Link to="/industries" className="hover:text-accent transition-colors">Dental Clinics & Implant Centers</Link></li>
              <li><Link to="/industries" className="hover:text-accent transition-colors">Dermatology & Skin Aesthetic Centers</Link></li>
              <li><Link to="/industries" className="hover:text-accent transition-colors">Physiotherapy & Rehab Studios</Link></li>
              <li><Link to="/industries" className="hover:text-accent transition-colors">Hair Transplant & Cosmetology</Link></li>
              <li><Link to="/industries" className="hover:text-accent transition-colors">IVF & Fertility Care Centers</Link></li>
              <li><Link to="/industries" className="hover:text-accent transition-colors">Hospitals & Multi-Specialty Clinics</Link></li>
              <li><Link to="/industries" className="hover:text-accent transition-colors">Local SMBs & Professional Services</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Location (Col 10-12) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-accent">Direct Contact</h4>
            <div className="space-y-2.5 text-xs text-white/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>{COMPANY_CONFIG.contact.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a href={`tel:${COMPANY_CONFIG.contact.phone}`} className="hover:text-accent transition-colors">
                  {COMPANY_CONFIG.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <a href={`mailto:${COMPANY_CONFIG.contact.email}`} className="hover:text-accent transition-colors">
                  {COMPANY_CONFIG.contact.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${COMPANY_CONFIG.contact.whatsappNumber}?text=Hi%20${encodeURIComponent(COMPANY_CONFIG.name)},%20I%20would%20like%20to%20discuss%20a%20website%20project.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs transition-colors shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            <div className="text-[11px] text-white/60">
              Working Hours: {COMPANY_CONFIG.contact.workingHours}
            </div>
          </div>

        </div>

        {/* Bottom Credits & Disclaimer */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/70">
          <div>
            © {new Date().getFullYear()} {COMPANY_CONFIG.name}. Built with care in Gujarat, India.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Founder: Himesh</span>
            <span>•</span>
            <Link to="/pricing" className="hover:underline">Transparent Pricing</Link>
            <span>•</span>
            <a
              href={COMPANY_CONFIG.links.demoSiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-accent"
            >
              <span>Live Dental Concept Demo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
