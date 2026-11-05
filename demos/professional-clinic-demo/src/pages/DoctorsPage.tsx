import React from 'react';
import { Sparkles, GraduationCap, Award, Calendar, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DOCTORS_DATA } from '../data/doctors';
import { CLINIC_INFO } from '../data/clinic';
import type { DoctorProfile } from '../types';

export const DoctorsPage: React.FC = () => {
  return (
    <div className="pt-8 pb-20">
      {/* Header */}
      <section className="bg-bg py-16 sm:py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 text-primary font-semibold text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-primary-light" />
            <span>Clinical Faculty</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-text">
            Meet Our Specialist Clinicians
          </h1>
          <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Our clinicians blend postgraduate hospital residencies, international aesthetic certifications, and an attentive, unhurried chairside approach.
          </p>
        </div>
      </section>

      {/* Clinician Detail Profiles */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {DOCTORS_DATA.map((doctor: DoctorProfile, index: number) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={doctor.id}
                className="bg-white rounded-3xl p-8 sm:p-12 border border-border shadow-md grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
              >
                <div className={`lg:col-span-5 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-border relative group">
                    <img
                      src={doctor.portraitUrl}
                      alt={doctor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-border text-center">
                      <p className="text-xs font-semibold text-text">{doctor.title}</p>
                    </div>
                  </div>
                </div>

                <div className={`lg:col-span-7 space-y-6 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div>
                    <span className="text-xs uppercase tracking-widest font-semibold text-primary-light">
                      {doctor.specialty}
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text mt-1">{doctor.name}</h2>
                    <p className="text-sm text-text-muted flex items-center gap-2 mt-1">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      <span>{doctor.title}</span>
                    </p>
                  </div>

                  <p className="text-text-muted text-sm sm:text-base leading-relaxed">
                    {doctor.bio}
                  </p>

                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs uppercase font-semibold tracking-wider text-text">Clinical Focus & Procedures</h4>
                    <div className="flex flex-wrap gap-2">
                      {doctor.focusAreas.map((item: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-xl bg-bg border border-border text-xs font-medium text-text-muted"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-bg/70 border border-border space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                      <Award className="w-4 h-4" />
                      <span>Philosophy of Care</span>
                    </div>
                    <p className="text-xs text-text-muted italic">
                      "{doctor.philosophy}"
                    </p>
                  </div>

                  <div className="pt-4 flex flex-wrap gap-4 items-center">
                    <Link
                      to="/appointment"
                      className="px-6 py-3 rounded-full bg-primary hover:bg-primary-light text-white text-xs font-semibold transition-all shadow-md inline-flex items-center gap-2"
                    >
                      <Calendar className="w-4 h-4 text-accent" />
                      <span>Book with {doctor.name.split(' ')[1]}</span>
                    </Link>
                    <a
                      href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=Hi%20${CLINIC_INFO.name},%20I%20would%20like%20to%20consult%20with%20${encodeURIComponent(doctor.name)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-full border border-border hover:bg-bg text-text-muted hover:text-text text-xs font-medium transition-all"
                    >
                      Enquire via WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Safety & Care Commitments */}
      <section className="bg-bg py-16 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex p-3 rounded-2xl bg-white border border-border shadow-sm text-primary">
            <Shield className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-text">
            Dedicated Doctor-Patient Consultation Time
          </h3>
          <p className="text-text-muted text-sm sm:text-base leading-relaxed">
            Unlike commercial high-volume dental mills, our practice allocates a full 30 to 45 minutes for initial consultations. You will never be shuttled between random junior assistants.
          </p>
          <div>
            <Link
              to="/appointment"
              className="px-8 py-3.5 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary-light transition-all shadow-md"
            >
              Schedule Your 1-on-1 Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
