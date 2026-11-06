import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Activity, Scissors, Heart, Building2, Store } from 'lucide-react';
import { INDUSTRIES_CONFIG } from '../../data/industries';

const industryIcons: Record<string, React.ElementType> = {
  Sparkles,
  Activity,
  Scissors,
  Heart,
  Building2,
  Store,
};

export const IndustriesPreview: React.FC = () => {
  const topIndustries = INDUSTRIES_CONFIG.slice(0, 6);

  return (
    <section className="py-20 bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary">
              Specialized Focus
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-heading tracking-tight">
              Tailored for Healthcare & Local Businesses
            </h2>
            <p className="text-body text-sm sm:text-base leading-relaxed">
              Different medical specialties and businesses require unique patient presentation strategies. We understand the specific workflow of each domain.
            </p>
          </div>

          <Link
            to="/industries"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-bg border border-border text-heading text-xs font-semibold shadow-subtle hover:border-body/40 transition-all self-start md:self-auto shrink-0"
          >
            <span>Explore All 10 Sectors</span>
            <ArrowRight className="w-3.5 h-3.5 text-secondary" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topIndustries.map((ind) => {
            const Icon = industryIcons[ind.icon] || Sparkles;

            return (
              <div
                key={ind.id}
                className="p-7 rounded-3xl bg-bg/40 border border-border hover:bg-white hover:shadow-subtle hover:border-secondary/30 transition-all space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-accent-subtle text-primary flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  {ind.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-secondary text-white">
                      {ind.badge}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-lg text-heading">
                    {ind.name}
                  </h3>
                  <p className="text-body text-xs mt-1.5 leading-relaxed line-clamp-2">
                    {ind.description}
                  </p>
                </div>

                <div className="pt-2 text-xs text-secondary font-medium flex items-center gap-1">
                  <span>See industry features</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
