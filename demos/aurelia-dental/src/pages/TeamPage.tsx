import React from 'react';
import { Calendar, Award, GraduationCap, Globe, CheckCircle2, Heart } from 'lucide-react';
import { DOCTORS } from '../data/clinicData';

interface TeamPageProps {
  onOpenAppointmentModal: (serviceId?: string) => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({ onOpenAppointmentModal }) => {
  return (
    <div className="min-h-screen bg-bg">
      
      {/* Header Banner */}
      <section className="pt-16 pb-14 bg-bg-soft border-b border-border text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent-light px-3 py-1 rounded-full">
            Clinical Leadership
          </span>
          <h1 className="font-serif-heading text-h1 font-normal text-primary mt-4 mb-4">
            Meet Your Dental Specialists
          </h1>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
            Led by university gold medalists and internationally trained prosthodontic and endodontic specialists dedicated to lifelong care in Surat.
          </p>
        </div>
      </section>

      {/* Doctor Detailed Profiles */}
      <section className="py-20">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {DOCTORS.map((doc, index) => (
            <div
              key={doc.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-12 rounded-3xl bg-surface border border-border shadow-card ${
                index % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}
            >
              
              {/* Doctor Portrait */}
              <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:col-start-8' : ''}`}>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-border shadow-md">
                  <img
                    src={doc.imageUrl}
                    alt={doc.name}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-surface/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-border text-xs flex items-center justify-between">
                    <span className="font-semibold text-primary">{doc.experience}</span>
                    <span className="text-accent font-bold">Surat, Gujarat</span>
                  </div>
                </div>
              </div>

              {/* Doctor Details */}
              <div className={`lg:col-span-7 space-y-5 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-accent">
                    {doc.title}
                  </span>
                  <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-primary mt-1">
                    {doc.name}
                  </h2>
                  <div className="text-sm font-semibold text-text-secondary mt-1 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-primary" />
                    <span>{doc.qualifications}</span>
                  </div>
                </div>

                <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                  {doc.bio}
                </p>

                {/* Clinical Philosophy Quote */}
                <div className="p-4 rounded-xl bg-bg-soft border-l-4 border-accent text-xs sm:text-sm italic text-primary font-serif-heading leading-relaxed">
                  "{doc.philosophy}"
                </div>

                {/* Languages & Memberships Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-accent" />
                      Languages Spoken
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {doc.languages.map((l) => (
                        <span key={l} className="text-xs bg-bg px-2.5 py-1 rounded-md border border-border text-text-secondary font-medium">
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-accent" />
                      Affiliations & Fellowships
                    </h3>
                    <ul className="space-y-1 text-xs text-text-secondary">
                      {doc.memberships.map((m) => (
                        <li key={m} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span className="truncate">{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={() => onOpenAppointmentModal()}
                    className="bg-primary hover:bg-primary-light text-text-inverse px-6 py-3 rounded-pill font-medium text-xs sm:text-sm shadow-btn transition-colors flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-accent" />
                    <span>Request Consultation with {doc.name.split(' ')[1]}</span>
                  </button>
                </div>

              </div>

            </div>
          ))}

        </div>
      </section>

    </div>
  );
};

