import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, Camera } from 'lucide-react';
import { GALLERY_ITEMS } from '../../data/gallery';
import { LightboxModal } from '../common/LightboxModal';
import { GalleryItem } from '../../types';

export const GalleryPreview: React.FC = () => {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const previewItems = GALLERY_ITEMS.slice(0, 4);

  return (
    <section className="py-20 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-accent/25 px-3 py-1 rounded-full inline-block mb-3">
              Practice Tour
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary tracking-tight">
              A Glimpse Inside Our Clinic
            </h2>
            <p className="text-text-muted text-sm sm:text-base mt-2 max-w-xl">
              Clean lines, calming acoustics, and modern dental technology designed to make every visit feel unhurried.
            </p>
          </div>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary transition-colors"
          >
            <span>Explore Complete Gallery</span>
            <ArrowRight className="w-4 h-4 text-accent" />
          </Link>
        </div>

        {/* 4 Image Grid Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {previewItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-card hover:shadow-elevated transition-all duration-300 border border-border"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent mb-1">
                  {item.category}
                </span>
                <h4 className="font-serif text-base font-semibold leading-snug line-clamp-2">
                  {item.title}
                </h4>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-white/90">
                  <Eye className="w-4 h-4 text-accent" />
                  <span>View High-Res Photo</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Caption */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-text-muted">
          <Camera className="w-3.5 h-3.5 text-secondary" />
          <span>Fictional clinic concept captures (Hospitality-grade dental practice design)</span>
        </div>

      </div>

      {/* Lightbox Modal */}
      <LightboxModal item={activeItem} onClose={() => setActiveItem(null)} />
    </section>
  );
};

