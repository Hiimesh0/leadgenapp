import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, ShieldCheck, Sparkles, Sun, Layers, Smile, HeartHandshake } from 'lucide-react';
import { ServiceItem } from '../../types';

interface ServiceCardProps {
  service: ServiceItem;
  featured?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, featured = false }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-secondary" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-secondary" />;
      case 'Sun': return <Sun className="w-5 h-5 text-secondary" />;
      case 'Layers': return <Layers className="w-5 h-5 text-secondary" />;
      case 'Smile': return <Smile className="w-5 h-5 text-secondary" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-secondary" />;
      default: return <Sparkles className="w-5 h-5 text-secondary" />;
    }
  };

  return (
    <article className={`bg-surface rounded-2xl overflow-hidden border border-border shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col group ${
      featured ? 'ring-2 ring-accent/60' : ''
    }`}>
      {/* Image Thumbnail Container */}
      <div className="relative h-48 overflow-hidden bg-background">
        <img
          src={service.imageUrl}
          alt={service.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] font-semibold text-primary uppercase tracking-wider shadow-sm">
          {service.category}
        </div>
        <div className="absolute bottom-3 right-3 bg-primary/90 text-surface backdrop-blur-sm px-2 py-0.5 rounded text-[11px] flex items-center gap-1 font-medium">
          <Clock className="w-3 h-3 text-accent" />
          <span>{service.durationEstimate}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-background group-hover:bg-accent/20 transition-colors">
              {getIcon(service.iconName)}
            </div>
            <h3 className="font-serif text-xl font-semibold text-primary group-hover:text-secondary transition-colors">
              {service.title}
            </h3>
          </div>
          <p className="text-text-muted text-sm leading-relaxed mb-4">
            {service.shortDescription}
          </p>
        </div>

        <div className="pt-4 border-t border-border flex items-center justify-between mt-auto">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-primary transition-colors group-hover:translate-x-0.5"
          >
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5 text-accent" />
          </Link>
          <Link
            to="/appointment"
            state={{ defaultService: service.id }}
            className="text-xs font-medium text-text-muted hover:text-primary transition-colors"
          >
            Book Session
          </Link>
        </div>
      </div>
    </article>
  );
};

