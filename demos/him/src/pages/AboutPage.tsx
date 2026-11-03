import React from 'react';
import { ShieldCheck, Sparkles, HeartPulse, Microscope, Award, ArrowRight } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface AboutPageProps {
  onOpenAppointmentModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenAppointmentModal }) => {
  return (
    <div className="min-h-screen bg-bg">
      
      {/* Header Banner */}
      <section className="pt-16 pb-14 bg-bg-soft border-b border-border text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent-light px-3 py-1 rounded-full">
            Our Studio Story
          </span>
          <h1 className="font-serif-heading text-h1 font-normal text-primary mt-4 mb-4">
            Dentistry Crafted Around Human Dignity & Calm
          </h1>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
            Founded with a singular vision: to replace cold, intimidating dental visits with a restorative, hospitality-inspired wellness experience.
          </p>
        </div>
      </section>

      {/* Origin & Philosophy Grid */}
      <section className="py-20">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <h2 className="font-serif-heading text-3xl font-normal text-primary">
                A Philosophy of Minimal Intervention & Maximal Empathy
              </h2>

              <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                For decades, dental care has suffered from a reputation of clinical rush, harsh sensory overstimulation, and anxiety-provoking unpredictability. At XYZ Dental Clinic in Surat, we questioned every detail of that legacy model.
              </p>

              <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                What if entering a dental clinic felt like stepping into a serene, boutique retreat? What if treatment was microscope-guided to preserve natural tooth enamel instead of aggressively cutting it away? And what if fees and procedures were explained with total, unhurried transparency?
              </p>

              <div className="p-5 rounded-2xl bg-surface border border-border shadow-sm space-y-3">
                <div className="font-serif-heading text-lg font-bold text-primary">
                  The XYZ Patient Pledge
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-text-secondary">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>We will never recommend treatment we would not perform on our own children.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>You will always receive a written itemized estimate before any drill is lifted.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>We never rush; your appointments are scheduled with dedicated buffer times.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-surface aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80"
                  alt="Modern, calm dental operatory room at XYZ Dental Clinic"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-surface p-4 rounded-xl border border-border shadow-lg max-w-xs hidden sm:block">
                <div className="text-xs font-bold text-primary">Hospitality-Grade Comfort</div>
                <div className="text-[11px] text-text-secondary mt-1">
                  Aromatherapy, ergonomic memory foam dental chairs, and Bose noise-canceling audio.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Technology & Clinical Standards */}
      <section className="py-20 bg-surface border-y border-border">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent-light px-3 py-1 rounded-full">
              Hospital-Grade Standards
            </span>
            <h2 className="font-serif-heading text-h2 font-normal text-primary mt-3 mb-4">
              Advanced Technology in Gentle Hands
            </h2>
            <p className="text-text-secondary text-sm">
              We invest in world-leading dental equipment to make your treatments faster, safer, and remarkably gentle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl bg-bg border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Microscope className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif-heading text-lg font-bold text-primary mb-2">Zeiss Surgical Microscopes</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Up to 25x optical magnification ensures micro-accuracy, protecting natural tooth roots during root canals and cosmetic bonding.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-bg border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif-heading text-lg font-bold text-primary mb-2">iTero 3D Optical Scanner</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Captures 6,000 frames per second to render full-color 3D dental scans without messy silicone impression putty.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-bg border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif-heading text-lg font-bold text-primary mb-2">Melag Class-B Autoclaves</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                German fractional vacuum sterilization with digital batch logging. 100% sterile guarantee for every patient pouch.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-bg border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <HeartPulse className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif-heading text-lg font-bold text-primary mb-2">Computer-Guided Anesthesia</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Microprocessor-regulated local delivery eliminates the stinging pressure sensation of manual injections.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-text-inverse text-center">
        <div className="max-w-2xl mx-auto px-4 space-y-5">
          <h2 className="font-serif-heading text-3xl font-normal text-white">
            Experience Dentistry Reimagined in Surat
          </h2>
          <p className="text-white/80 text-sm leading-relaxed">
            Schedule a relaxed initial discovery consultation with Dr. Ananya Mehta or Dr. Rohan Vora.
          </p>
          <button
            onClick={onOpenAppointmentModal}
            className="bg-accent hover:bg-accent-light text-primary font-bold px-8 py-3.5 rounded-pill text-sm shadow-btn transition-colors"
          >
            Request Your First Consultation
          </button>
        </div>
      </section>

    </div>
  );
};

