import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, ShieldCheck, HeartPulse, Layers, Sun, Activity, Smile, 
  Award, ArrowRight, Calendar, Clock
} from 'lucide-react';
import { SERVICES } from '../data/clinicData';

interface ServicesPageProps {
  onOpenAppointmentModal: (serviceId?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenAppointmentModal }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Treatments' },
    { id: 'cosmetic', name: 'Cosmetic & Smile Design' },
    { id: 'restorative', name: 'Restorative & Implants' },
    { id: 'preventive', name: 'Preventive & Hygiene' },
    { id: 'specialized', name: 'Specialized & Pediatric' },
  ];

  const filteredServices = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeCategory);

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
      case 'HeartPulse': return <HeartPulse className="w-6 h-6" />;
      case 'Layers': return <Layers className="w-6 h-6" />;
      case 'Sun': return <Sun className="w-6 h-6" />;
      case 'Activity': return <Activity className="w-6 h-6" />;
      case 'Smile': return <Smile className="w-6 h-6" />;
      default: return <Award className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-bg">
      
      {/* Header Banner */}
      <section className="pt-16 pb-14 bg-bg-soft border-b border-border text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent-light px-3 py-1 rounded-full">
            Clinical Disciplines
          </span>
          <h1 className="font-serif-heading text-h1 font-normal text-primary mt-4 mb-4">
            Comprehensive Dental Solutions in Surat
          </h1>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
            Every procedure is planned using 3D digital precision to deliver enduring biological health, chewing efficiency, and radiant aesthetics.
          </p>
        </div>
      </section>

      {/* Filter Tabs & Grid */}
      <section className="py-16">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-primary text-text-inverse shadow-sm'
                    : 'bg-surface text-text-secondary hover:text-primary border border-border'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-surface rounded-2xl overflow-hidden border border-border shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  {/* Service Image Header */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-bg-muted">
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-sm p-2 rounded-xl text-primary">
                      {getServiceIcon(service.iconName)}
                    </div>
                    <div className="absolute top-3 right-3 bg-primary/90 text-text-inverse px-2.5 py-1 rounded-full text-[11px] font-semibold">
                      {service.duration}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <h2 className="font-serif-heading text-xl font-bold text-primary mb-2">
                      {service.name}
                    </h2>
                    
                    <p className="text-text-secondary text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
                      {service.shortDesc}
                    </p>

                    {/* Key Benefits Bullet List */}
                    <ul className="space-y-1.5 mb-6 text-xs text-text-secondary">
                      {service.benefits.slice(0, 3).map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                          <span className="line-clamp-1">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-border/80">
                  <div>
                    <div className="text-[10px] text-text-muted uppercase tracking-wider">Starting fee</div>
                    <div className="font-bold text-sm text-primary">{service.startingPrice}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/services/${service.id}`}
                      className="text-xs font-semibold text-primary hover:text-accent inline-flex items-center gap-1"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

