import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Sparkles, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { PORTFOLIO_PROJECTS, PORTFOLIO_NOTE } from '../data/portfolio';

export const PortfolioPage: React.FC = () => {
  return (
    <div className="pt-8 pb-20">
      
      {/* Header */}
      <section className="bg-bg py-16 sm:py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-subtle text-primary font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            <span>Demonstration Portfolio</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-heading tracking-tight">
            Our Work & Concept Demos
          </h1>
          <p className="text-body text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            We showcase real, interactive concept websites so prospective doctors and business owners can test our design quality, mobile responsiveness, and booking flows live.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 sm:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="space-y-12">
            {PORTFOLIO_PROJECTS.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-3xl border border-border overflow-hidden shadow-premium grid grid-cols-1 lg:grid-cols-12 gap-0"
              >
                {/* Project Media */}
                <div className="lg:col-span-7 relative min-h-[340px] lg:min-h-full bg-bg overflow-hidden group">
                  <img
                    src={project.screenshotUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur text-primary text-xs font-bold shadow-md flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-secondary" />
                      <span>{project.badge}</span>
                    </span>
                  </div>
                </div>

                {/* Project Details */}
                <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                        {project.type}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-heading mt-1">
                        {project.title}
                      </h2>
                    </div>

                    <p className="text-body text-sm leading-relaxed">
                      {project.description}
                    </p>

                    <div className="space-y-2.5 pt-3 border-t border-border">
                      <span className="text-xs font-bold text-heading uppercase tracking-wider block">
                        Included Technical Features:
                      </span>
                      {project.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-body">
                          <Check className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-border">
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-all shadow-md active:scale-[0.98]"
                    >
                      <span>View Live Demo</span>
                      <ExternalLink className="w-4 h-4 text-accent" />
                    </a>

                    <div className="text-[11px] text-body text-center flex items-center justify-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
                      <span>Pure Static Website • Zero Loading Lag</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Honest Transparency Statement */}
          <div className="bg-bg rounded-3xl p-8 border border-border max-w-4xl mx-auto space-y-3">
            <h4 className="font-bold text-base text-heading text-center">
              Our Commitment to Transparency
            </h4>
            <p className="text-xs sm:text-sm text-body text-center leading-relaxed">
              {PORTFOLIO_NOTE}
            </p>
          </div>

        </div>
      </section>

      {/* Want a custom concept demo? */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold">
            Want a Custom Prototype for Your Clinic?
          </h3>
          <p className="text-white/80 text-sm max-w-xl mx-auto leading-relaxed">
            Contact us with your clinic details, doctor specializations, and color preferences. We can prepare a tailored preview for your practice.
          </p>
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-accent text-primary text-xs font-bold hover:bg-accent-hover transition-colors shadow-sm"
          >
            <span>Request a Custom Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

    </div>
  );
};
