import React from 'react';
import { UserCheck, Sparkles, Sliders, ShieldCheck } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const pillars = [
    {
      icon: <UserCheck className="w-6 h-6 text-secondary" />,
      title: 'Patient-First Philosophy',
      description: 'Consultations structured around attentive listening. We discuss your oral health goals in clear language without clinical jargon.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-secondary" />,
      title: 'Modern Clinic Environment',
      description: 'A soothing clinical layout engineered with natural light, ergonomic suites, and hospitality touches to eliminate dental anxiety.'
    },
    {
      icon: <Sliders className="w-6 h-6 text-secondary" />,
      title: 'Personalized Treatment Plans',
      description: 'Custom digital treatment models designed for your exact facial proportions and health profile—no one-size-fits-all treatments.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-secondary" />,
      title: 'Calm, Comfortable Care',
      description: 'Minimally invasive dentistry utilizing gentle techniques, topical pre-numbing, and relaxed pacing at every visit.'
    }
  ];

  return (
    <section className="py-20 bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-accent/25 px-3 py-1 rounded-full inline-block mb-3">
            Clinical Standards
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary tracking-tight">
            Designed for Peace of Mind
          </h2>
          <p className="text-text-muted text-sm sm:text-base mt-3 leading-relaxed">
            Every aspect of our practice is structured to make your healthcare journey comfortable, transparent, and restorative.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="bg-background rounded-2xl p-6 border border-border/80 hover:border-secondary/40 hover:shadow-card transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center mb-5 shadow-xs">
                  {p.icon}
                </div>
                <h3 className="font-serif text-lg font-bold text-primary mb-2">
                  {p.title}
                </h3>
                <p className="text-text-muted text-xs leading-relaxed">
                  {p.description}
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-border/50 text-[10px] text-text-light font-medium uppercase tracking-wider">
                Illustrative Demo Standard
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

