import React from 'react';
import { AlertCircle } from 'lucide-react';

export const DemoBanner: React.FC = () => {
  return (
    <div className="bg-[#123C3A] text-[#B7D8C9] border-b border-[#2F6F68]/40 py-2 px-4 text-xs font-medium tracking-wide">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 truncate">
          <AlertCircle className="w-3.5 h-3.5 text-accent flex-shrink-0" />
          <span className="truncate">
            <strong className="text-white font-semibold">DEMO CONCEPT:</strong> Fictional clinic website built to showcase Professional Plan healthcare website design.
          </span>
        </div>
        <span className="hidden md:inline-block text-[11px] text-accent/80 flex-shrink-0 bg-white/10 px-2 py-0.5 rounded">
          Surat, Gujarat Concept Demo
        </span>
      </div>
    </div>
  );
};

