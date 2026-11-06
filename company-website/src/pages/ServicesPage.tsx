import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Sparkles, Stethoscope, Layout, RefreshCw, Wrench, Search, Cpu, MessageSquare } from 'lucide-react';
import { SERVICES_CONFIG } from '../data/services';
import { COMPANY_CONFIG } from '../data/company';

const iconMap: Record<string, React.ElementType> = {
  Stethoscope,
  Layout,
  RefreshCw,
  Wrench,
  Search,
  Cpu,
};

export const ServicesPage: React.FC = () => {
  return (
    <div className="pt-8 pb-20">
      
      {/* Header */}
      <section className="bg-bg py-16 sm:py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-subtle text-primary font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            <span>Our Service Portfolio</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-heading tracking-tight">
            Specialized Web Solutions for Healthcare & SMBs
          </h1>
          <p className="text-body text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            From single-practitioner doctor profiles to multi-department hospital websites, explore our specialized development and technical services.
          </p>
        </div>
      </section>

      {/* Services Detailed List */}
      <section className="py-16 sm:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {SERVICES_CONFIG.map((service, index) => {
            const Icon = iconMap[service.icon] || Layout;
            const isReversed = index % 2 === 1;
            const isHealthcare = service.id === 'clinic-healthcare';

            return (
              <div
                key={service.id}
                id={service.id}
                className={`rounded-3xl p-8 sm:p-12 border transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
                  isHealthcare
                    ? 'bg-gradient-to-br from-white via-accent-subtle/30 to-white border-secondary/40 shadow-premium ring-2 ring-secondary/15'
                    : 'bg-white border-border hover:border-secondary/30 shadow-subtle'
                }`}
              >
                <div className={`lg:col-span-7 space-y-5 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-accent-subtle text-primary flex items-center justify-center shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-bg border border-border text-secondary">
                      {service.category}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-heading">
                      {service.title}
                    </h2>
                    <p className="text-body text-sm sm:text-base mt-2 leading-relaxed">
                      {service.fullDescription}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-border">
                    <span className="text-xs font-bold text-heading uppercase tracking-wider block">
                      Core Features & Deliverables:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {service.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-body">
                          <Check className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-bg/80 border border-border text-xs text-body">
                    <span className="font-semibold text-heading">Best suited for: </span>
                    <span>{service.recommendedFor}</span>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <Link
                      to="/quote"
                      className="px-6 py-3 rounded-full bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-sm transition-colors inline-flex items-center gap-2"
                    >
                      <span>Inquire About This Service</span>
                      <ArrowRight className="w-3.5 h-3.5 text-accent" />
                    </Link>
                    <a
                      href={`https://wa.me/${COMPANY_CONFIG.contact.whatsappNumber}?text=Hi%20${encodeURIComponent(COMPANY_CONFIG.name)},%20I%20have%20a%20question%20regarding%20${encodeURIComponent(service.title)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 rounded-full border border-border hover:bg-bg text-heading text-xs font-medium transition-colors inline-flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Ask via WhatsApp</span>
                    </a>
                  </div>
                </div>

                <div className={`lg:col-span-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="bg-bg rounded-2xl p-6 sm:p-8 border border-border space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-secondary">
                      Service Scope Note
                    </h4>
                    <p className="text-xs text-body leading-relaxed">
                      {isHealthcare
                        ? 'Designed specifically around medical board transparency guidelines, doctor credentials verification, and frictionless patient appointment communications.'
                        : 'Custom tailored development adhering to modern responsive standards, zero vendor lock-in, and full client source code handover.'}
                    </p>
                    <div className="p-3 rounded-xl bg-white border border-border/80 text-[11px] text-body flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>Turnaround: Delivered within sprint timelines</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="bg-bg rounded-3xl p-8 sm:p-12 border border-border text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-heading">
            Not Sure Which Service Matches Your Need?
          </h3>
          <p className="text-body text-sm max-w-xl mx-auto leading-relaxed">
            Message Himesh directly on WhatsApp with your existing website link or an outline of your idea for an immediate recommendation.
          </p>
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-sm transition-colors"
          >
            <span>Request a Free Evaluation</span>
            <ArrowRight className="w-4 h-4 text-accent" />
          </Link>
        </div>
      </section>

    </div>
  );
};
