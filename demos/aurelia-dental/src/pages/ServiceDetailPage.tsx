import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  Sparkles, ShieldCheck, Clock, CheckCircle2, ArrowRight, Calendar, 
  ArrowLeft, Phone, HelpCircle
} from 'lucide-react';
import { SERVICES, CLINIC_INFO } from '../data/clinicData';

interface ServiceDetailPageProps {
  onOpenAppointmentModal: (serviceId?: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ onOpenAppointmentModal }) => {
  const { id } = useParams<{ id: string }>();

  const service = SERVICES.find((s) => s.id === id);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  // Related other treatments
  const otherServices = SERVICES.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-bg">
      
      {/* Breadcrumb & Header Hero */}
      <section className="pt-10 pb-16 bg-bg-soft border-b border-border">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Services</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent-light px-3 py-1 rounded-full">
                {service.category.toUpperCase()} DENTISTRY
              </span>
              <h1 className="font-serif-heading text-h1 font-normal text-primary">
                {service.name}
              </h1>
              <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
                {service.shortDesc}
              </p>
            </div>

            {/* Quick Consultation Booking Card */}
            <div className="lg:col-span-4 bg-surface p-6 rounded-2xl border border-border shadow-card">
              <div className="text-xs text-text-muted">Estimated Starting Investment</div>
              <div className="font-serif-heading text-2xl font-bold text-primary mt-0.5">{service.startingPrice}</div>
              <div className="text-xs text-text-secondary mt-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-accent" />
                <span>Typical Duration: {service.duration}</span>
              </div>

              <div className="mt-5 space-y-2.5">
                <button
                  onClick={() => onOpenAppointmentModal(service.id)}
                  className="w-full bg-primary hover:bg-primary-light text-text-inverse py-3 rounded-pill text-xs font-semibold shadow-btn transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-accent" />
                  <span>Request Consultation</span>
                </button>

                <a
                  href={`https://wa.me/${CLINIC_INFO.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full border border-border hover:border-primary text-primary py-2.5 rounded-pill text-xs font-semibold transition-colors flex items-center justify-center gap-2 text-center"
                >
                  <span>Inquire via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-16">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Primary Details Column */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Detailed Overview */}
              <div>
                <h2 className="font-serif-heading text-2xl font-bold text-primary mb-4">
                  Clinical Overview & Philosophy
                </h2>
                <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                  {service.fullDesc}
                </p>
              </div>

              {/* Verified Clinical Benefits */}
              <div>
                <h2 className="font-serif-heading text-2xl font-bold text-primary mb-6">
                  Key Patient Benefits
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-surface border border-border shadow-sm">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-text-secondary font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Clinical Procedure */}
              <div>
                <h2 className="font-serif-heading text-2xl font-bold text-primary mb-6">
                  Treatment Workflow: What to Expect
                </h2>
                <div className="space-y-4">
                  {service.procedureSteps.map((step, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-surface border border-border shadow-sm flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-accent-light text-primary font-bold text-sm flex items-center justify-center shrink-0">
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className="font-serif-heading text-base font-bold text-primary">{step.title}</h3>
                        <p className="text-xs sm:text-sm text-text-secondary mt-1 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ideal Candidate Profile */}
              <div>
                <h2 className="font-serif-heading text-2xl font-bold text-primary mb-4">
                  Is This Procedure Right for You?
                </h2>
                <p className="text-xs sm:text-sm text-text-secondary mb-4">
                  This treatment is commonly recommended for individuals experiencing:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.idealFor.map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-text-primary bg-bg-soft px-3.5 py-2.5 rounded-lg border border-border">
                      <Sparkles className="w-4 h-4 text-accent shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Sidebar Column: Clinic Quality Highlights & FAQs */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="p-6 rounded-2xl bg-surface border border-border shadow-sm space-y-4">
                <h3 className="font-serif-heading text-lg font-bold text-primary flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-accent" />
                  <span>The Aurelia Quality Mark</span>
                </h3>
                <ul className="space-y-2.5 text-xs text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <span>European Class-B Vacuum Autoclave sterilization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <span>Zeiss surgical magnification for sub-millimeter precision</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <span>100% itemized, written quotes before commencing care</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-bg-muted border border-border text-center">
                <HelpCircle className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-serif-heading text-base font-bold text-primary">Have Questions?</h3>
                <p className="text-xs text-text-secondary mt-1 mb-4">
                  Speak directly with our clinical coordinator to discuss treatment timelines or financing options.
                </p>
                <a
                  href={`tel:${CLINIC_INFO.phone}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-accent"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {CLINIC_INFO.phone}</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Explore Other Services */}
      <section className="py-16 bg-surface border-t border-border">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif-heading text-2xl font-bold text-primary mb-8 text-center">
            Other Specialized Disciplines
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherServices.map((s) => (
              <Link
                key={s.id}
                to={`/services/${s.id}`}
                className="p-5 rounded-2xl bg-bg border border-border hover:border-primary-subtle transition-all duration-200 block group"
              >
                <h3 className="font-serif-heading text-lg font-bold text-primary group-hover:text-primary-light">
                  {s.name}
                </h3>
                <p className="text-xs text-text-secondary mt-1 line-clamp-2">{s.shortDesc}</p>
                <div className="mt-3 text-xs font-semibold text-accent inline-flex items-center gap-1">
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

