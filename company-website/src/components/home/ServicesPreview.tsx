import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Stethoscope, Layout, RefreshCw, Wrench, Search, Cpu, Check } from 'lucide-react';
import { SERVICES_CONFIG } from '../../data/services';

const iconMap: Record<string, React.ElementType> = {
  Stethoscope,
  Layout,
  RefreshCw,
  Wrench,
  Search,
  Cpu,
};

export const ServicesPreview: React.FC = () => {
  return (
    <section className="py-20 bg-bg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary">
              What We Do
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-heading tracking-tight">
              Website Solutions Designed for Healthcare & Growth
            </h2>
            <p className="text-body text-sm sm:text-base leading-relaxed">
              From solo doctor landing pages to comprehensive multi-department clinic portals, we craft responsive, reliable web presences.
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-bg border border-border text-heading text-xs font-semibold shadow-subtle hover:border-body/40 transition-all self-start md:self-auto shrink-0"
          >
            <span>View All Services</span>
            <ArrowRight className="w-3.5 h-3.5 text-secondary" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_CONFIG.map((service) => {
            const Icon = iconMap[service.icon] || Layout;
            const isFeatured = service.id === 'clinic-healthcare';

            return (
              <div
                key={service.id}
                className={`rounded-3xl p-8 border transition-all duration-300 flex flex-col justify-between ${
                  isFeatured
                    ? 'bg-white border-secondary/40 shadow-premium ring-2 ring-secondary/10'
                    : 'bg-white border-border hover:border-secondary/30 hover:shadow-subtle'
                }`}
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-accent-subtle text-primary flex items-center justify-center shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-bg border border-border text-secondary">
                      {service.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-xl text-heading">
                      {service.title}
                    </h3>
                    <p className="text-body text-xs sm:text-sm mt-2 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-border/60">
                    {service.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-body">
                        <Check className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-border/40">
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-secondary group"
                  >
                    <span>Learn details & features</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
