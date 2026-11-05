import React from 'react';
import { Award, HeartHandshake, ShieldCheck, Sparkles, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CLINIC_INFO } from '../data/clinic';
import { DOCTORS_DATA } from '../data/doctors';
import type { DoctorProfile } from '../types';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-8 pb-20">
      {/* Hero Header */}
      <section className="bg-bg py-16 sm:py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 text-primary font-semibold text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-primary-light" />
            <span>Our Story & Philosophy</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-text">
            Thoughtful Dental Care, Reimagined
          </h1>
          <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Founded with a vision to replace clinical anxiety with restorative tranquility, {CLINIC_INFO.name} blends surgical precision with bespoke aesthetic artistry in Surat, Gujarat.
          </p>
        </div>
      </section>

      {/* Main Narrative & Imagery */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-border">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80"
                  alt="Modern Dental Operatory"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden sm:block p-6 rounded-2xl bg-white shadow-xl border border-border max-w-xs">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-primary">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-text text-sm">Quiet Luxury</h4>
                    <p className="text-text-muted text-xs">Acoustically insulated suites</p>
                  </div>
                </div>
                <p className="text-xs text-text-muted">Designed to deliver an oasis of calm from reception to discharge.</p>
              </div>
            </div>

            <div className="space-y-6">
              <span className="text-xs uppercase tracking-widest font-semibold text-primary-light">Our Heritage</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text leading-tight">
                Where Clinical Excellence Meets Human Compassion
              </h2>
              <p className="text-text-muted text-sm sm:text-base leading-relaxed">
                At {CLINIC_INFO.name}, we believe dentistry should never feel rushed, intimidating, or purely transactional. Every smile has an individual anatomy and a personal story.
              </p>
              <p className="text-text-muted text-sm sm:text-base leading-relaxed">
                Led by <strong className="text-text">{CLINIC_INFO.doctorName}</strong>, our clinical team focuses on minimally invasive dentistry, preserving natural tooth structure wherever possible, and enhancing aesthetic harmony with digital smile preview technologies.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/30 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-text text-sm">Digital Precision</h5>
                    <p className="text-text-muted text-xs">Intraoral 3D scanning eliminates messy impression pastes.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/30 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-text text-sm">Transparent Pricing</h5>
                    <p className="text-text-muted text-xs">Clear itemized treatment options before starting any care.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars of Clinical Practice */}
      <section className="py-16 bg-bg border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest font-semibold text-primary-light">Our Clinical Standards</span>
            <h2 className="font-serif text-3xl font-bold text-text mt-2">The Aurelia Standard of Care</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-border shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-text">Hospital-Grade Sterilization</h3>
              <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
                Multi-stage Class B autoclave sterilization with digital tracking records for every instrument package to guarantee strict cross-infection prevention.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-border shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-text">Gentle, Patient-Paced Care</h3>
              <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
                We empower you with pause signals and quiet rest intervals throughout every procedure. Your emotional comfort is as vital as your clinical outcome.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-border shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-text">Biocompatible Materials</h3>
              <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
                We exclusively utilize premium ceramic, high-density porcelain, and non-toxic resin composites that mirror natural enamel light refraction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Doctors Introduction */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest font-semibold text-primary-light">Meet The Clinicians</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text">Dedicated to Your Well-Being</h2>
            <p className="text-text-muted text-sm">
              Our clinicians combine post-graduate training, empathetic communication, and a shared dedication to calm dental experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {DOCTORS_DATA.map((doctor: DoctorProfile) => (
              <div key={doctor.id} className="bg-white rounded-3xl overflow-hidden border border-border shadow-md flex flex-col">
                <div className="aspect-[4/3] overflow-hidden bg-bg">
                  <img
                    src={doctor.portraitUrl}
                    alt={doctor.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-xs font-semibold text-primary-light uppercase tracking-wider">{doctor.specialty}</span>
                    <h3 className="font-serif text-2xl font-bold text-text mt-1">{doctor.name}</h3>
                    <p className="text-xs text-text-muted font-medium mb-3">{doctor.title}</p>
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed">{doctor.bio}</p>
                  </div>
                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-xs text-text-muted">Available for consultation</span>
                    <Link
                      to="/appointment"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-light"
                    >
                      <span>Book Slot</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-primary text-white p-8 sm:p-12 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">Experience the Aurelia Difference</h2>
          <p className="text-white/80 text-sm max-w-xl mx-auto">
            Visit our calm Surat practice or speak directly with our consultation coordinator.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/appointment"
              className="px-8 py-3.5 rounded-full bg-accent text-primary font-semibold text-sm hover:bg-accent-hover transition-all shadow-md"
            >
              Request Consultation
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-full border border-white/30 text-white font-medium text-sm hover:bg-white/10 transition-all"
            >
              Get Directions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
