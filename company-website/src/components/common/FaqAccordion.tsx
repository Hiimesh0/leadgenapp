import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FaqItem } from '../../types';

interface FaqAccordionProps {
  faqs: FaqItem[];
  defaultOpenIndex?: number;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ faqs, defaultOpenIndex = 0 }) => {
  const [openIndices, setOpenIndices] = useState<number[]>([defaultOpenIndex]);

  const toggle = (index: number) => {
    setOpenIndices(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndices.includes(index);
        return (
          <div
            key={index}
            className="bg-white rounded-2xl border border-border overflow-hidden transition-all duration-200 hover:border-secondary/30 shadow-subtle"
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              className="w-full text-left p-6 sm:p-7 flex items-start justify-between gap-4 focus:outline-none"
              aria-expanded={isOpen}
            >
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-accent-subtle text-primary flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  Q
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary mb-1 block">
                    {faq.category}
                  </span>
                  <h3 className="font-bold text-heading text-base sm:text-lg leading-snug">
                    {faq.question}
                  </h3>
                </div>
              </div>
              <div className={`w-8 h-8 rounded-full bg-bg flex items-center justify-center shrink-0 text-body transition-transform duration-200 ${isOpen ? 'rotate-180 bg-accent-subtle text-primary' : ''}`}>
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {isOpen && (
              <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-0 text-sm text-body leading-relaxed border-t border-border/40 mt-1 pl-16">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
