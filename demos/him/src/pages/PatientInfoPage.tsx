import React, { useState } from 'react';
import { 
  FileText, ShieldCheck, CreditCard, ChevronDown, ChevronUp, 
  Sparkles, CheckCircle2, Clock, Phone
} from 'lucide-react';
import { PRICING_DATA, FAQS, CLINIC_INFO } from '../data/clinicData';

interface PatientInfoPageProps {
  onOpenAppointmentModal: () => void;
}

export const PatientInfoPage: React.FC<PatientInfoPageProps> = ({ onOpenAppointmentModal }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-bg">
      
      {/* Header Banner */}
      <section className="pt-16 pb-14 bg-bg-soft border-b border-border text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent-light px-3 py-1 rounded-full">
            Patient Resources
          </span>
          <h1 className="font-serif-heading text-h1 font-normal text-primary mt-4 mb-4">
            Patient Care, Preparation & Fee Guide
          </h1>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
            Everything you need to know about your initial visit, our transparent treatment estimates, and patient-first comfort protocols.
          </p>
        </div>
      </section>

      {/* 1. First Visit Preparation Guide */}
      <section className="py-20">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif-heading text-h2 font-normal text-primary mb-3">
              Your First Visit: Unhurried & Transparent
            </h2>
            <p className="text-text-secondary text-sm">
              We reserve a full 45 minutes for your comprehensive initial consultation. No rushed examinations, no sales pitches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-surface border border-border shadow-card">
              <div className="w-10 h-10 rounded-full bg-accent-light text-primary font-bold text-sm flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="font-serif-heading text-xl font-bold text-primary mb-2">What to Bring</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-text-secondary">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>Government Photo ID for digital clinical record creation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>List of ongoing systemic medications or health conditions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>Previous dental radiographs taken within the past 6 months (optional).</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-surface border border-border shadow-card">
              <div className="w-10 h-10 rounded-full bg-accent-light text-primary font-bold text-sm flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="font-serif-heading text-xl font-bold text-primary mb-2">Digital Diagnostics</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-text-secondary">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>Ultra-low radiation digital intraoral radiographs (RVG).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>High-resolution 3D optical surface scanner replacing impression trays.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>Comprehensive periodontal (gum health) and oral cancer screening.</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-surface border border-border shadow-card">
              <div className="w-10 h-10 rounded-full bg-accent-light text-primary font-bold text-sm flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="font-serif-heading text-xl font-bold text-primary mb-2">Written Plan & Estimate</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-text-secondary">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>Clear photographic review on our wide clinical monitors.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>Itemized treatment proposals with phased timelines.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>Zero obligation to begin treatment on the same day.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Transparent Fee Schedule Table */}
      <section className="py-20 bg-surface border-y border-border">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent-light px-3 py-1 rounded-full">
              Ethical Pricing
            </span>
            <h2 className="font-serif-heading text-h2 font-normal text-primary mt-3 mb-3">
              Transparent Treatment Fee Guide
            </h2>
            <p className="text-text-secondary text-sm">
              We believe patients deserve complete clarity regarding dental healthcare costs. Below is our representative fee schedule for standard treatments in Surat.
            </p>
          </div>

          <div className="max-w-4xl mx-auto overflow-hidden rounded-2xl border border-border shadow-card bg-bg">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-primary text-text-inverse">
                  <tr>
                    <th className="py-4 px-6 font-semibold">Treatment / Discipline</th>
                    <th className="py-4 px-6 font-semibold">Estimated Fee Range</th>
                    <th className="py-4 px-6 font-semibold">Clinical Scope Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {PRICING_DATA.map((item, idx) => (
                    <tr key={idx} className="hover:bg-surface/80 transition-colors">
                      <td className="py-4 px-6 font-medium text-primary">
                        {item.treatment}
                        <span className="block text-[11px] text-text-muted sm:hidden mt-0.5">{item.category}</span>
                      </td>
                      <td className="py-4 px-6 font-bold text-primary shrink-0">
                        {item.priceRange}
                      </td>
                      <td className="py-4 px-6 text-text-secondary text-xs">
                        {item.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-bg-soft border-t border-border text-xs text-text-muted text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-2">
              <span>* Exact fees depend on biological complexity and are confirmed in your written consultation estimate.</span>
              <span className="font-semibold text-primary">All Major Credit/Debit Cards, UPI & EMI Accepted</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Frequently Asked Questions Accordion */}
      <section className="py-20 bg-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent-light px-3 py-1 rounded-full">
              Common Questions
            </span>
            <h2 className="font-serif-heading text-h2 font-normal text-primary mt-3 mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-text-secondary text-sm">
              Clear answers to the most common inquiries our patient desk receives.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-border bg-surface overflow-hidden shadow-sm transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif-heading text-base sm:text-lg font-bold text-primary">
                      {faq.question}
                    </span>
                    <span className="p-1 rounded-full bg-bg-soft text-primary shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-text-secondary leading-relaxed border-t border-border/50 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
};

