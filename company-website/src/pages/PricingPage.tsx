import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Sparkles, Clock, ShieldCheck, HelpCircle } from 'lucide-react';
import { PRICING_PACKAGES, PRICING_DISCLAIMER } from '../data/pricing';
import { FAQS_CONFIG } from '../data/faqs';
import { FaqAccordion } from '../components/common/FaqAccordion';

export const PricingPage: React.FC = () => {
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>('All');

  const faqCategories = ['All', 'Pricing', 'Process', 'Technical', 'Features'];

  const filteredFaqs = selectedFaqCategory === 'All'
    ? FAQS_CONFIG
    : FAQS_CONFIG.filter(f => f.category === selectedFaqCategory);

  return (
    <div className="pt-8 pb-20">
      
      {/* Header */}
      <section className="bg-bg py-16 sm:py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-subtle text-primary font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            <span>Clear Investment</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-heading tracking-tight">
            Transparent Pricing Packages
          </h1>
          <p className="text-body text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Predictable, milestone-based packages tailored for solo practitioners, growing dental clinics, and multi-specialty centers.
          </p>
        </div>
      </section>

      {/* 4 Packages Grid */}
      <section className="py-16 sm:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            {PRICING_PACKAGES.map((pkg) => {
              const isPopular = pkg.isPopular;

              return (
                <div
                  key={pkg.id}
                  className={`rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 relative ${
                    isPopular
                      ? 'bg-primary text-white shadow-elevated ring-4 ring-secondary/20 lg:-translate-y-2'
                      : 'bg-bg/40 border border-border hover:bg-white hover:shadow-subtle'
                  }`}
                >
                  {pkg.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-3.5 py-1 rounded-full bg-accent text-primary text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-secondary" />
                        <span>{pkg.badge}</span>
                      </span>
                    </div>
                  )}

                  <div className="space-y-5">
                    <div>
                      <h2 className={`font-extrabold text-xl ${isPopular ? 'text-white' : 'text-heading'}`}>
                        {pkg.name}
                      </h2>
                      <p className={`text-xs mt-1 ${isPopular ? 'text-white/80' : 'text-body'}`}>
                        {pkg.targetAudience}
                      </p>
                    </div>

                    <div className="pt-2 pb-4 border-b border-border/40">
                      <span className={`text-3xl font-black ${isPopular ? 'text-accent' : 'text-primary'}`}>
                        {pkg.price}
                      </span>
                      <span className={`text-[11px] block mt-1 ${isPopular ? 'text-white/70' : 'text-body'}`}>
                        {pkg.pageCount}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2 font-medium">
                        <Clock className={`w-3.5 h-3.5 ${isPopular ? 'text-accent' : 'text-secondary'}`} />
                        <span className={isPopular ? 'text-white/90' : 'text-heading'}>{pkg.deliveryTime}</span>
                      </div>
                      <div className="flex items-center gap-2 font-medium">
                        <ShieldCheck className={`w-3.5 h-3.5 ${isPopular ? 'text-accent' : 'text-secondary'}`} />
                        <span className={isPopular ? 'text-white/90' : 'text-heading'}>{pkg.revisions}</span>
                      </div>
                      <div className="flex items-center gap-2 font-medium">
                        <ShieldCheck className={`w-3.5 h-3.5 ${isPopular ? 'text-accent' : 'text-secondary'}`} />
                        <span className={isPopular ? 'text-white/90' : 'text-heading'}>{pkg.support}</span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-3 border-t border-border/40">
                      <span className={`text-[10px] font-bold uppercase tracking-wider block ${isPopular ? 'text-accent' : 'text-heading'}`}>
                        Included Features:
                      </span>
                      {pkg.features.map((f, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs">
                          <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isPopular ? 'text-accent' : 'text-secondary'}`} />
                          <span className={isPopular ? 'text-white/85' : 'text-body'}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8">
                    <Link
                      to="/quote"
                      className={`w-full py-3.5 rounded-full text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 ${
                        isPopular
                          ? 'bg-accent hover:bg-accent-hover text-primary'
                          : 'bg-primary hover:bg-primary-hover text-white'
                      }`}
                    >
                      <span>Choose {pkg.name.split(' ')[0]}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pricing Disclaimer Card */}
          <div className="p-6 rounded-2xl bg-bg border border-border text-center max-w-4xl mx-auto space-y-2">
            <span className="text-xs font-bold text-heading uppercase tracking-wider block">
              Pricing & Scope Policy
            </span>
            <p className="text-xs text-body leading-relaxed">
              {PRICING_DISCLAIMER}
            </p>
          </div>

        </div>
      </section>

      {/* Comprehensive FAQs Section */}
      <section className="py-20 bg-bg border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-secondary">
              <HelpCircle className="w-4 h-4" />
              <span>Common Questions</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-heading tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-body text-sm max-w-xl mx-auto">
              Clear, realistic answers about pricing, turnaround timelines, technical ownership, and maintenance.
            </p>

            {/* Category filter pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {faqCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedFaqCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedFaqCategory === cat
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-white border border-border text-body hover:text-heading hover:border-body'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <FaqAccordion faqs={filteredFaqs} defaultOpenIndex={0} />

        </div>
      </section>

    </div>
  );
};
