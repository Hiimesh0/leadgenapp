import React from 'react';
import { Globe, ShieldCheck, Compass, MessageSquare, Sparkles } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const pillars = [
    {
      icon: Globe,
      title: 'Build a Stronger Online Presence',
      description: 'Move beyond generic third-party directory listings and social media pages. A dedicated, clean website establishes permanent digital ownership that you control completely.'
    },
    {
      icon: ShieldCheck,
      title: 'Present Services Professionally',
      description: 'Give prospective patients clear, respectful explanations of treatments, technologies, safety standards, and doctor qualifications before they even step into your clinic.'
    },
    {
      icon: Compass,
      title: 'Make Important Information Accessible',
      description: 'Ensure critical details — consultation hours, clinic address, parking, fees, and doctor visiting schedules — are intuitive and accessible 24/7 from any smartphone.'
    },
    {
      icon: MessageSquare,
      title: 'Make It Easier for Patients to Reach You',
      description: 'Reduce friction with click-to-WhatsApp chats, click-to-call buttons, and simple appointment enquiry forms that match how modern Indian patients communicate.'
    },
    {
      icon: Sparkles,
      title: 'Create a Cohesive Brand Identity',
      description: 'Align your digital presence with the actual physical standard and calm atmosphere of your clinic. Thoughtful typography and clean spacing build immediate trust.'
    }
  ];

  return (
    <section className="py-20 bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary">
            Why It Matters
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-heading tracking-tight">
            The Purpose of a Professional Website
          </h2>
          <p className="text-body text-sm sm:text-base leading-relaxed">
            We don't sell inflated marketing hype or promise unrealistic overnight patient spikes. Instead, we build clean, dependable digital infrastructure that reflects your genuine professional standard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-bg/50 p-8 rounded-3xl border border-border hover:border-secondary/30 transition-all hover:bg-white hover:shadow-subtle group space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-accent-subtle text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-accent transition-colors shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-heading">
                  {pillar.title}
                </h3>
                <p className="text-body text-xs sm:text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}

          {/* Honest Agency Note Card */}
          <div className="bg-primary text-white p-8 rounded-3xl border border-primary flex flex-col justify-between space-y-4 shadow-premium">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-accent">
                Our Guarantee
              </span>
              <h3 className="font-bold text-lg text-white">
                Honest, Transparent Engineering
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                Clean source code, fast loading speeds, zero lock-in contracts, and direct personal communication with Himesh throughout your build.
              </p>
            </div>
            <div className="text-xs text-accent font-medium">
              ✓ 100% Client Code Ownership
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
