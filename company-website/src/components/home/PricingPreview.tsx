import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { PRICING_PACKAGES, PRICING_DISCLAIMER } from '../../data/pricing';

export const PricingPreview: React.FC = () => {
  const mainPackages = PRICING_PACKAGES.slice(0, 3);

  return (
    <section className="py-20 bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary">
            Transparent Investment
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-heading tracking-tight">
            Simple, Fixed Website Packages
          </h2>
          <p className="text-body text-sm sm:text-base leading-relaxed">
            No ambiguous estimates or surprise add-on charges. Choose a package that matches your practice stage and required scope.
          </p>
        </div>

        {/* 3 Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {mainPackages.map((pkg) => {
            const isPro = pkg.id === 'professional';

            return (
              <div
                key={pkg.id}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  isPro
                    ? 'bg-primary text-white shadow-elevated ring-4 ring-secondary/20 md:-translate-y-2'
                    : 'bg-bg/40 border border-border hover:bg-white hover:shadow-subtle'
                }`}
              >
                {pkg.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-accent text-primary text-[11px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-secondary" />
                      <span>{pkg.badge}</span>
                    </span>
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className={`font-bold text-xl ${isPro ? 'text-white' : 'text-heading'}`}>
                      {pkg.name}
                    </h3>
                    <p className={`text-xs mt-1 ${isPro ? 'text-white/80' : 'text-body'}`}>
                      {pkg.targetAudience}
                    </p>
                  </div>

                  <div className="pt-2 pb-4 border-b border-border/40">
                    <span className={`text-3xl sm:text-4xl font-black ${isPro ? 'text-accent' : 'text-primary'}`}>
                      {pkg.price}
                    </span>
                    <span className={`text-xs ml-2 block mt-1 ${isPro ? 'text-white/70' : 'text-body'}`}>
                      One-time development fee
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 font-medium">
                      <Clock className={`w-3.5 h-3.5 ${isPro ? 'text-accent' : 'text-secondary'}`} />
                      <span className={isPro ? 'text-white/90' : 'text-heading'}>{pkg.deliveryTime}</span>
                    </div>
                    <div className="flex items-center gap-2 font-medium">
                      <ShieldCheck className={`w-3.5 h-3.5 ${isPro ? 'text-accent' : 'text-secondary'}`} />
                      <span className={isPro ? 'text-white/90' : 'text-heading'}>{pkg.revisions}</span>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-4">
                    <span className={`text-[11px] font-bold uppercase tracking-wider block ${isPro ? 'text-accent' : 'text-heading'}`}>
                      Package Includes:
                    </span>
                    {pkg.features.slice(0, 5).map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isPro ? 'text-accent' : 'text-secondary'}`} />
                        <span className={isPro ? 'text-white/85' : 'text-body'}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <Link
                    to="/quote"
                    className={`w-full py-3.5 rounded-full text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 ${
                      isPro
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

        {/* Enterprise Callout Banner */}
        <div className="bg-bg rounded-3xl p-8 border border-border flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-bold text-lg text-heading">Need an Enterprise or Hospital Solution?</h4>
            <p className="text-body text-xs sm:text-sm">
              Custom multi-branch architecture, patient portals, admin dashboards, and custom API integrations.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/pricing"
              className="px-6 py-2.5 rounded-full border border-border bg-white text-heading text-xs font-semibold hover:bg-bg transition-colors"
            >
              Compare All Details
            </Link>
            <Link
              to="/quote"
              className="px-6 py-2.5 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-colors shadow-sm"
            >
              Request Custom Quote
            </Link>
          </div>
        </div>

        <p className="text-center text-[11px] text-body max-w-3xl mx-auto italic">
          {PRICING_DISCLAIMER}
        </p>

      </div>
    </section>
  );
};
