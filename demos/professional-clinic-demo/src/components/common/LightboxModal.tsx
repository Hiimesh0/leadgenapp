import React, { useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { GalleryItem } from '../../types';

interface LightboxModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative max-w-4xl w-full bg-surface rounded-2xl overflow-hidden shadow-2xl border border-white/20">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-primary/80 hover:bg-primary text-white flex items-center justify-center transition-colors shadow-md"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image */}
        <div className="max-h-[70vh] bg-black overflow-hidden flex items-center justify-center">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-auto max-h-[70vh] object-contain"
          />
        </div>

        {/* Caption */}
        <div className="p-6 bg-surface">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-secondary uppercase tracking-wider bg-background px-2.5 py-0.5 rounded">
              {item.category}
            </span>
            <span className="text-xs text-text-muted flex items-center gap-1">
              <ZoomIn className="w-3.5 h-3.5" /> High-Resolution Clinical Capture
            </span>
          </div>
          <h3 className="font-serif text-xl font-bold text-primary mb-1">
            {item.title}
          </h3>
          <p className="text-text-muted text-sm leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
};

