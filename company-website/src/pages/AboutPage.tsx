import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Check, UserCheck, HeartHandshake, ShieldCheck, Clock, Terminal } from 'lucide-react';
import { COMPANY_CONFIG } from '../data/company';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-8 pb-20">
      
      {/* Header Banner */}
      <section className="bg-bg py-16 sm:py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-subtle text-primary font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            <span>About ClinicCraft Solutions</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-heading tracking-tight">
            Thoughtful Website Development for Healthcare
          </h1>
          <p className="text-body text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {COMPANY_CONFIG.fullDescription}
          </p>
        </div>
      </section>

      {/* Main Narrative & Philosophy */}
      <section className="py-16 sm:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-widest font-bold text-secondary">
                Our Purpose
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-heading tracking-tight leading-snug">
                Why We Focus on Clinic & Healthcare Websites
              </h2>
              <p className="text-body text-sm sm:text-base leading-relaxed">
                Finding a doctor or specialized clinic is a vulnerable, high-stakes decision for any patient. When someone is experiencing dental pain, acute skin symptoms, or seeking fertility guidance, they don't want to decipher cluttered, slow-loading websites filled with intrusive popups.
              </p>
              <p className="text-body text-sm sm:text-base leading-relaxed">
                They want clarity: <em>Who is the treating doctor? What are their qualifications? What does the clinic environment look like? Where are they located? How easily can I reach them on WhatsApp?</em>
              </p>
              <p className="text-body text-sm sm:text-base leading-relaxed">
                At <strong>{COMPANY_CONFIG.name}</strong>, we build websites specifically answering these patient questions with clean aesthetics, respectful tone, and fast mobile performance.
              </p>

              <div className="pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-secondary shrink-0 mt-1" />
                  <span className="text-xs text-body">Direct, patient-centric information structure</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-secondary shrink-0 mt-1" />
                  <span className="text-xs text-body">Zero intrusive popups or deceptive dark patterns</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-secondary shrink-0 mt-1" />
                  <span className="text-xs text-body">Instant WhatsApp consultation routing</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-secondary shrink-0 mt-1" />
                  <span className="text-xs text-body">100% transparent pricing and timelines</span>
                </div>
              </div>
            </div>

            {/* Founder Card (Honest & Transparent) */}
            <div className="lg:col-span-6">
              <div className="bg-bg rounded-3xl p-8 sm:p-10 border border-border space-y-6 shadow-subtle">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary text-accent flex items-center justify-center font-bold text-xl shadow-sm">
                    H
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold text-secondary tracking-wider block">
                      Founder Profile
                    </span>
                    <h3 className="font-extrabold text-xl text-heading">
                      {COMPANY_CONFIG.founder.name}
                    </h3>
                    <p className="text-xs text-body font-medium">
                      {COMPANY_CONFIG.founder.role}
                    </p>
                    <p className="text-[11px] text-body mt-0.5">
                      Based in {COMPANY_CONFIG.contact.location}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-border text-xs text-body leading-relaxed space-y-2">
                  <p>
                    "I started {COMPANY_CONFIG.name} to offer clinic owners and professionals an honest, dependable alternative to large, impersonal agencies. When you work with me, you speak directly with the developer crafting your code. Every layout is intentionally designed, every line of code is clean, and you receive my dedicated focus from day one."
                  </p>
                </div>

                <div className="space-y-3 pt-2 text-xs text-body">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-secondary shrink-0" />
                    <span>Specialization: Modern Component Architecture (React, TypeScript, Tailwind)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-secondary shrink-0" />
                    <span>Communication: Direct phone, email, and WhatsApp discussions</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/contact"
                    className="w-full py-3 rounded-full bg-primary hover:bg-primary-hover text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <span>Connect with Himesh</span>
                    <ArrowRight className="w-3.5 h-3.5 text-accent" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How We Work: 4-Step Process */}
      <section className="py-20 bg-bg border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary">
              Our Methodology
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-heading tracking-tight">
              How We Work with Clients
            </h2>
            <p className="text-body text-sm sm:text-base leading-relaxed">
              A transparent, structured workflow designed to respect your clinic hours and deliver your website without stress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-7 rounded-3xl border border-border space-y-3 shadow-subtle">
              <span className="w-9 h-9 rounded-xl bg-accent-subtle text-primary font-bold text-xs flex items-center justify-center">
                01
              </span>
              <h4 className="font-bold text-base text-heading">1. Discovery & Scope</h4>
              <p className="text-xs text-body leading-relaxed">
                We review your practice services, doctor credentials, clinic photography, and preferred design style via a 20-minute consultation.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-border space-y-3 shadow-subtle">
              <span className="w-9 h-9 rounded-xl bg-accent-subtle text-primary font-bold text-xs flex items-center justify-center">
                02
              </span>
              <h4 className="font-bold text-base text-heading">2. Design & Architecture</h4>
              <p className="text-xs text-body leading-relaxed">
                We craft the responsive page layouts, integrate your branding colors, organize treatment copy, and wire up consultation flows.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-border space-y-3 shadow-subtle">
              <span className="w-9 h-9 rounded-xl bg-accent-subtle text-primary font-bold text-xs flex items-center justify-center">
                03
              </span>
              <h4 className="font-bold text-base text-heading">3. Review & Refinement</h4>
              <p className="text-xs text-body leading-relaxed">
                You test the live interactive preview on your phone and laptop. We incorporate your revisions to ensure complete satisfaction.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-border space-y-3 shadow-subtle">
              <span className="w-9 h-9 rounded-xl bg-accent-subtle text-primary font-bold text-xs flex items-center justify-center">
                04
              </span>
              <h4 className="font-bold text-base text-heading">4. Launch & Handover</h4>
              <p className="text-xs text-body leading-relaxed">
                We connect your domain, deploy on high-speed static infrastructure, verify Google Maps, and hand over 100% of your source code.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Call to action */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="bg-primary text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-premium">
          <h2 className="text-2xl sm:text-4xl font-extrabold">
            Ready to Build an Authentic Online Presence?
          </h2>
          <p className="text-white/80 text-sm max-w-xl mx-auto leading-relaxed">
            Schedule a short discussion with Himesh or request a fixed-scope proposal tailored to your practice.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/quote"
              className="px-8 py-3.5 rounded-full bg-accent text-primary font-bold text-xs hover:bg-accent-hover transition-colors shadow-sm"
            >
              Request a Project Quote
            </Link>
            <Link
              to="/portfolio"
              className="px-8 py-3.5 rounded-full border border-white/20 hover:bg-white/10 text-white font-medium text-xs transition-colors"
            >
              Inspect Live Concept Demo
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
