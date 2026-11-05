import React, { useState } from 'react';
import { Sparkles, Maximize2, Shield } from 'lucide-react';
import { GALLERY_DATA } from '../data/gallery';
import { LightboxModal } from '../components/common/LightboxModal';
import type { GalleryItem } from '../types';

export const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Lounge', 'Operatory', 'Technology', 'Aesthetics'];

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_DATA
    : GALLERY_DATA.filter((item: GalleryItem) => item.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <div className="pt-8 pb-20">
      {/* Header */}
      <section className="bg-bg py-16 sm:py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 text-primary font-semibold text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-primary-light" />
            <span>Visual Tour</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-text">
            Our Clinic & Care Suites
          </h1>
          <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Step inside our thoughtfully engineered dental sanctuary. Designed for serenity, state-of-the-art sterilization, and aesthetic precision.
          </p>

          {/* Filter pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white border border-border text-text-muted hover:text-text hover:border-text-muted'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item: GalleryItem) => (
              <div
                key={item.id}
                onClick={() => setActiveImage(item)}
                className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-bg border border-border shadow-sm cursor-pointer"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                  <span className="text-[11px] font-semibold text-accent uppercase tracking-wider mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-xl font-bold">{item.title}</h3>
                  <p className="text-xs text-white/80 mt-1 line-clamp-2">{item.description}</p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-accent">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Click to view full photo</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Environment Standard Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-bg rounded-3xl p-8 border border-border flex flex-col sm:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-white border border-border flex items-center justify-center text-primary shadow-sm shrink-0">
            <Shield className="w-7 h-7" />
          </div>
          <div className="space-y-1 text-center sm:text-left flex-1">
            <h4 className="font-serif text-lg font-bold text-text">Medical Hygiene & Air Filtration Standards</h4>
            <p className="text-text-muted text-xs leading-relaxed">
              Every operatory is equipped with HEPA-14 medical-grade clean room air filtration and continuous surface disinfection protocols to ensure pristine air purity.
            </p>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeImage && (
        <LightboxModal item={activeImage} onClose={() => setActiveImage(null)} />
      )}
    </div>
  );
};
