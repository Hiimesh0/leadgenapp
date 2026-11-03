import React, { useState } from 'react';
import { Star, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { TESTIMONIALS } from '../data/clinicData';

interface TestimonialsPageProps {
  onOpenAppointmentModal: () => void;
}

export const TestimonialsPage: React.FC<TestimonialsPageProps> = ({ onOpenAppointmentModal }) => {
  const [filter, setFilter] = useState<string>('all');

  const treatments = [
    { id: 'all', label: 'All Experiences' },
    { id: 'veneers', label: 'Smile Makeovers' },
    { id: 'implants', label: 'Dental Implants' },
    { id: 'aligners', label: 'Clear Aligners' },
    { id: 'root-canal', label: 'Gentle Endodontics' },
  ];

  const filtered = filter === 'all'
    ? TESTIMONIALS
    : TESTIMONIALS.filter((t) => {
        if (filter === 'veneers') return t.treatment.toLowerCase().includes('veneer') || t.treatment.toLowerCase().includes('smile');
        if (filter === 'implants') return t.treatment.toLowerCase().includes('implant');
        if (filter === 'aligners') return t.treatment.toLowerCase().includes('aligner');
        if (filter === 'root-canal') return t.treatment.toLowerCase().includes('root canal');
        return true;
      });

  return (
    <div className="min-h-screen bg-bg">
      
      {/* Header Banner */}
      <section className="pt-16 pb-14 bg-bg-soft border-b border-border text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent-light px-3 py-1 rounded-full">
            Patient Stories
          </span>
          <h1 className="font-serif-heading text-h1 font-normal text-primary mt-4 mb-4">
            Confidence Restored in Surat
          </h1>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
            Read honest reflections from patients who entrusted our team with their dental health and smile transformations.
          </p>
        </div>
      </section>

      {/* Main Reviews Section */}
      <section className="py-16">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Transparency Disclaimer Notice */}
          <div className="max-w-3xl mx-auto mb-12 p-4 rounded-xl bg-accent-light/60 border border-accent/40 text-xs text-primary flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-accent shrink-0" />
            <span>
              <strong>Demonstration Integrity Notice:</strong> As XYZ Dental Clinic is a demonstration showcase practice built to illustrate modern healthcare UX, the reviews below are illustrative sample cases depicting realistic clinical outcomes and patient journeys.
            </span>
          </div>

          {/* Treatment Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {treatments.map((t) => (
              <button
                key={t.id}
                onClick={() => setFilter(t.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  filter === t.id
                    ? 'bg-primary text-text-inverse shadow-sm'
                    : 'bg-surface text-text-secondary hover:text-primary border border-border'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {filtered.map((t) => (
              <div
                key={t.id}
                className="bg-surface rounded-2xl p-8 border border-border shadow-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-accent">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <span className="text-[11px] text-text-muted">{t.date}</span>
                  </div>

                  <p className="font-serif-heading text-base sm:text-lg text-primary italic leading-relaxed mb-6">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm text-primary">{t.patientName}</div>
                    <div className="text-xs text-text-secondary">{t.location}</div>
                    <div className="text-[11px] font-medium text-accent mt-0.5">{t.treatment}</div>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-primary/80 bg-bg-soft px-2.5 py-1 rounded-full border border-border">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                    <span>Verified Case</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <button
              onClick={onOpenAppointmentModal}
              className="bg-primary hover:bg-primary-light text-text-inverse px-8 py-3.5 rounded-pill font-medium text-sm shadow-btn transition-colors"
            >
              Start Your Own Smile Transformation
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};

