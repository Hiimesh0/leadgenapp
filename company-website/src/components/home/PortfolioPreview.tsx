import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Sparkles, Check, ArrowRight } from 'lucide-react';
import { PORTFOLIO_PROJECTS, PORTFOLIO_NOTE } from '../../data/portfolio';

export const PortfolioPreview: React.FC = () => {
  const demoProject = PORTFOLIO_PROJECTS[0];

  return (
    <section className="py-20 bg-bg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary">
              Demonstration Showcase
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-heading tracking-tight">
              Experience the Quality of Our Work
            </h2>
            <p className="text-body text-sm sm:text-base leading-relaxed">
              We create full-featured concept demonstrations so you can interact with real clinic appointment workflows, mobile responsiveness, and visual designs before hiring us.
            </p>
          </div>

          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-bg border border-border text-heading text-xs font-semibold shadow-subtle hover:border-body/40 transition-all self-start md:self-auto shrink-0"
          >
            <span>Portfolio Overview</span>
            <ArrowRight className="w-3.5 h-3.5 text-secondary" />
          </Link>
        </div>

        {/* Featured Project Showcase Card */}
        <div className="bg-white rounded-3xl border border-border overflow-hidden shadow-premium grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Left: Project Image */}
          <div className="lg:col-span-7 relative min-h-[320px] lg:min-h-full bg-bg overflow-hidden group">
            <img
              src={demoProject.screenshotUrl}
              alt={demoProject.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-primary text-xs font-bold shadow-md flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-secondary" />
                <span>{demoProject.badge}</span>
              </span>
            </div>
          </div>

          {/* Right: Description & Interactive Action */}
          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold text-secondary uppercase tracking-wider block">
                {demoProject.type}
              </span>
              <h3 className="font-extrabold text-2xl sm:text-3xl text-heading">
                {demoProject.title}
              </h3>
              <p className="text-body text-sm leading-relaxed">
                {demoProject.description}
              </p>

              <div className="space-y-2.5 pt-2 border-t border-border">
                <span className="text-xs font-bold text-heading uppercase tracking-wider block">
                  Highlighted Capabilities:
                </span>
                {demoProject.features.slice(0, 4).map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-body">
                    <Check className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-border">
              <a
                href={demoProject.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-all shadow-md"
              >
                <span>View Live Interactive Demo</span>
                <ExternalLink className="w-4 h-4 text-accent" />
              </a>

              <p className="text-[11px] text-body text-center italic">
                {demoProject.badge} — Fictional Clinic
              </p>
            </div>
          </div>

        </div>

        {/* Honest Portfolio Note */}
        <div className="p-4 rounded-2xl bg-surface border border-border text-xs text-body text-center max-w-4xl mx-auto">
          {PORTFOLIO_NOTE}
        </div>

      </div>
    </section>
  );
};
