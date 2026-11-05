import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, UserCheck } from 'lucide-react';
import { DOCTORS } from '../../data/doctors';
import { DoctorCard } from '../common/DoctorCard';

export const DoctorPreview: React.FC = () => {
  const leadDoctor = DOCTORS[0]; // Dr. Him

  return (
    <section className="py-20 bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-accent/25 px-3 py-1 rounded-full inline-block mb-3">
            Clinical Leadership
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary tracking-tight">
            Meet Your Treating Doctor
          </h2>
          <p className="text-text-muted text-sm sm:text-base mt-2">
            Combining gentle clinical technique with modern cosmetic dentistry principles.
          </p>
        </div>

        {/* Lead Doctor Card */}
        <div className="max-w-4xl mx-auto mb-8">
          <DoctorCard doctor={leadDoctor} />
        </div>

        {/* View full team link */}
        <div className="text-center">
          <Link
            to="/doctors"
            className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-primary transition-colors"
          >
            <UserCheck className="w-4 h-4 text-accent" />
            <span>View Full Clinic Medical Team</span>
            <ArrowRight className="w-4 h-4 text-accent" />
          </Link>
        </div>

      </div>
    </section>
  );
};

