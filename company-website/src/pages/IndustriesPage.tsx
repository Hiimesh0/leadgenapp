import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Sparkles, Activity, Scissors, Heart, Building2, Store, Briefcase, Award, Dumbbell } from 'lucide-react';
import { INDUSTRIES_CONFIG } from '../data/industries';

const industryIcons: Record<string, React.ElementType> = {
  Sparkles,
  Activity,
  Scissors,
  Heart,
  Building2,
  Store,
  Briefcase,
  Award,
  Dumbbell
};

export const IndustriesPage: React.FC = () => {
  return (
    <div className="pt-8 pb-20">
      
      {/* Header */}
      <section className="bg-bg py-16 sm:py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-subtle text-primary font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            <span>Sectors & Specializations</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-heading tracking-tight">
            Tailored Web Solutions by Industry
          </h1>
          <p className="text-body text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Different healthcare specialties and local businesses have distinct customer journeys. Here is how we design websites tailored to your specific field.
          </p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16 sm:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {INDUSTRIES_CONFIG.map((industry) => {
              const Icon = industryIcons[industry.icon] || Sparkles;

              return (
                <div
                  key={industry.id}
                  id={industry.id}
                  className="bg-white rounded-3xl p-8 sm:p-10 border border-border hover:border-secondary/30 hover:shadow-subtle transition-all flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-accent-subtle text-primary flex items-center justify-center shadow-sm">
                        <Icon className="w-6 h-6" />
                      </div>
                      {industry.badge && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-secondary text-white">
                          {industry.badge}
                        </span>
                      )}
                    </div>

                    <div>
                      <h2 className="text-2xl font-extrabold text-heading">
                        {industry.name}
                      </h2>
                      <p className="text-secondary text-xs sm:text-sm font-semibold mt-1">
                        {industry.tagline}
                      </p>
                      <p className="text-body text-xs sm:text-sm mt-2 leading-relaxed">
                        {industry.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-3 border-t border-border">
                      <span className="text-[11px] font-bold text-heading uppercase tracking-wider block">
                        Essential Features for this Industry:
                      </span>
                      {industry.essentialFeatures.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-body">
                          <Check className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/40 flex items-center justify-between">
                    <span className="text-xs text-body">Ready to start?</span>
                    <Link
                      to="/quote"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-secondary group"
                    >
                      <span>Request {industry.name.split(' ')[0]} Proposal</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Compliance Notice */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="p-4 rounded-2xl bg-bg border border-border text-center text-xs text-body leading-relaxed">
          <strong>Integrity Notice:</strong> All features described above represent standardized architectural templates developed by ClinicCraft Solutions. We strictly respect client confidentiality and never display client names or trademarks without explicit prior authorization.
        </div>
      </section>

    </div>
  );
};
