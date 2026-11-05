import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SERVICES } from '../../data/services';
import { ServiceCard } from '../common/ServiceCard';

export const ServicesPreview: React.FC = () => {
  return (
    <section className="py-20 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Title and Link to full services */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-accent/25 px-3 py-1 rounded-full inline-block mb-3">
              Specialized Dental Care
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary tracking-tight">
              Comprehensive Treatments
            </h2>
            <p className="text-text-muted text-sm sm:text-base mt-2 max-w-xl">
              From preventive wellness checkups to smile transformations, we deliver individualized treatments tailored to your lifestyle.
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary transition-colors"
          >
            <span>View All 6 Clinical Treatments</span>
            <ArrowRight className="w-4 h-4 text-accent" />
          </Link>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} featured={index === 1} />
          ))}
        </div>

        {/* Banner CTA at bottom */}
        <div className="mt-14 bg-primary text-surface rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-elevated">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-serif text-2xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              <span>Not Sure Which Treatment You Need?</span>
            </h3>
            <p className="text-surface/80 text-sm max-w-xl">
              Schedule a preliminary oral health consultation. We will evaluate your teeth and discuss all viable pathways with transparent fee schedules.
            </p>
          </div>
          <Link
            to="/appointment"
            className="bg-accent hover:bg-accent-dark text-primary text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-sm flex-shrink-0"
          >
            Request Consultation
          </Link>
        </div>

      </div>
    </section>
  );
};

