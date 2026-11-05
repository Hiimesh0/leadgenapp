import React, { useState } from 'react';
import { Sparkles, Clock, Check, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SERVICES_DATA } from '../data/services';
import type { ServiceItem } from '../types';

const FAQS = [
  {
    q: 'How long does a smile makeover or veneer procedure take?',
    a: 'Most cosmetic veneer treatments require 2 to 3 appointments over a 10-14 day period. This includes initial 3D digital smile design, mock-up preview, tooth preparation, and permanent bonding.',
  },
  {
    q: 'Are dental implants painful?',
    a: 'Implant placement is performed under gentle, profound local anesthesia. Most patients report feeling only mild pressure and find the procedure significantly more comfortable than an extraction.',
  },
  {
    q: 'How do clear aligners differ from traditional braces?',
    a: 'Clear aligners are transparent, removable thermoplastic trays customized to gently shift teeth. They eliminate metallic brackets and allow normal brushing and eating without dietary restrictions.',
  },
  {
    q: 'How frequently should I schedule a professional dental cleaning?',
    a: 'For optimal gum health and early detection of micro-cavities, we recommend a routine checkup and ultrasonic polish every 6 months.',
  },
];

export const ServicesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', 'Cosmetic', 'Orthodontics', 'Restorative', 'Preventive'];

  const filteredServices = selectedCategory === 'All'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s: ServiceItem) => s.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <div className="pt-8 pb-20">
      {/* Header */}
      <section className="bg-bg py-16 sm:py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 text-primary font-semibold text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-primary-light" />
            <span>Comprehensive Treatments</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-text">
            Bespoke Dental Treatments
          </h1>
          <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            From precision digital smile makeovers to gentle preventive care, each treatment is engineered for longevity, natural aesthetics, and patient comfort.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white border border-border text-text-muted hover:text-text hover:border-text-muted'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid with Rich Content */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service: ServiceItem) => (
              <div
                key={service.id}
                className="bg-white rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-bg">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur text-primary text-xs font-semibold shadow-sm">
                        {service.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                      <Clock className="w-3.5 h-3.5 text-primary-light" />
                      <span>{service.durationEstimate}</span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-text group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
                      {service.shortDescription}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-border">
                      <span className="text-[11px] font-semibold text-text uppercase tracking-wider">Key Advantages:</span>
                      {service.benefits.map((benefit: string, i: number) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-text-muted">
                          <Check className="w-3.5 h-3.5 text-primary-light shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 pt-0">
                  <Link
                    to="/appointment"
                    className="w-full py-3 rounded-2xl bg-bg hover:bg-primary hover:text-white text-text font-semibold text-xs transition-all flex items-center justify-center gap-2 border border-border group-hover:border-primary"
                  >
                    <span>Reserve Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology & Trust Callout */}
      <section className="bg-bg py-16 border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-border shadow-sm flex flex-col md:flex-row items-center gap-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div className="space-y-2 text-center md:text-left flex-1">
              <h3 className="font-serif text-2xl font-bold text-text">Intraoral Digital 3D Scanning</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                We utilize painless optical laser scanners that capture 10,000 frames per second, creating micro-millimeter precision 3D models of your dentition in under two minutes with zero uncomfortable impression trays.
              </p>
            </div>
            <Link
              to="/appointment"
              className="px-6 py-3 rounded-full bg-primary hover:bg-primary-light text-white text-xs font-semibold whitespace-nowrap shadow-md transition-all shrink-0"
            >
              See It in Action
            </Link>
          </div>
        </div>
      </section>

      {/* Treatment FAQs */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-primary-light">
              <HelpCircle className="w-4 h-4" />
              <span>Got Questions?</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="bg-white p-6 sm:p-8 rounded-2xl border border-border shadow-sm space-y-2">
                <h4 className="font-serif text-lg font-bold text-text">{faq.q}</h4>
                <p className="text-text-muted text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
