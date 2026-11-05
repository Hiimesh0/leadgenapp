import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Calendar, Award } from 'lucide-react';
import { DoctorProfile } from '../../types';

interface DoctorCardProps {
  doctor: DoctorProfile;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <article className="bg-surface rounded-2xl overflow-hidden border border-border shadow-card hover:shadow-elevated transition-all duration-300 grid grid-cols-1 md:grid-cols-12 group">
      
      {/* Doctor Portrait Container */}
      <div className="md:col-span-5 relative h-72 md:h-full min-h-[300px] overflow-hidden bg-background">
        <img
          src={doctor.portraitUrl}
          alt={doctor.name}
          loading="lazy"
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-3 left-3 bg-primary/90 text-white backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 shadow-sm">
          <Award className="w-3.5 h-3.5 text-accent" />
          <span>Fictional Specialist Profile</span>
        </div>
      </div>

      {/* Doctor Details */}
      <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
        <div>
          <div className="mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-accent/20 px-2.5 py-1 rounded-md inline-block mb-2">
              {doctor.specialty}
            </span>
            <h3 className="font-serif text-2xl font-bold text-primary">
              {doctor.name}
            </h3>
            <p className="text-sm font-medium text-text-muted mt-0.5">
              {doctor.title}
            </p>
          </div>

          <p className="text-text-muted text-sm leading-relaxed mb-6">
            {doctor.bio}
          </p>

          <div className="mb-6">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
              Areas of Special Focus
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {doctor.focusAreas.map((area, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-text">
                  <CheckCircle2 className="w-3.5 h-3.5 text-secondary flex-shrink-0 mt-0.5" />
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </div>

          <blockquote className="bg-background rounded-xl p-4 border-l-2 border-secondary text-xs italic text-text-muted mb-6">
            "{doctor.philosophy}"
          </blockquote>
        </div>

        <div className="pt-4 border-t border-border flex items-center justify-between">
          <span className="text-[11px] text-text-muted font-medium">
            Accepting Consultations (Mon–Sat)
          </span>
          <Link
            to="/appointment"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-surface text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5 text-accent" />
            <span>Consult {doctor.name}</span>
          </Link>
        </div>
      </div>
    </article>
  );
};

