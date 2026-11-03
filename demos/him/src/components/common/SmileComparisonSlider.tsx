import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, MoveHorizontal } from 'lucide-react';

interface SmileComparisonSliderProps {
  title?: string;
  subtitle?: string;
}

export const SmileComparisonSlider: React.FC<SmileComparisonSliderProps> = ({
  title = "Interactive Smile Transformation",
  subtitle = "Drag the slider to reveal the precision aesthetic transformation achieved with handcrafted porcelain veneers."
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  // High-res dentistry photography from Unsplash
  // Image 1 (Before): Natural teeth with slight uneven wear/spacing
  // Image 2 (After): Radiant, harmonized white smile
  const beforeImage = "https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=1200&q=80";
  const afterImage = "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80";

  return (
    <div className="w-full max-w-4xl mx-auto my-12 bg-surface rounded-2xl p-6 sm:p-8 border border-border shadow-card">
      <div className="text-center max-w-xl mx-auto mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-light text-primary text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span>Clinical Esthetics Showcase</span>
        </div>
        <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-primary mb-2">
          {title}
        </h3>
        <p className="text-sm text-text-secondary">
          {subtitle}
        </p>
      </div>

      {/* Interactive Slider Canvas */}
      <div
        ref={containerRef}
        className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden select-none cursor-ew-resize border border-border shadow-inner"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* "After" Image (Background) */}
        <img
          src={afterImage}
          alt="Transformed smile after cosmetic veneer treatment at XYZ Dental Clinic"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="lazy"
        />

        {/* "Before" Image (Clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt="Original smile before aesthetic dental treatment"
            className="absolute inset-0 w-full h-full object-cover object-center max-w-none"
            style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
            loading="lazy"
          />
        </div>

        {/* Divider Handle Bar */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary border-2 border-white shadow-lg flex items-center justify-center text-white">
            <MoveHorizontal className="w-5 h-5 text-accent" />
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-primary/80 backdrop-blur-sm text-white text-xs font-semibold tracking-wider uppercase">
          Pre-Treatment
        </div>
        <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-accent/90 backdrop-blur-sm text-primary text-xs font-semibold tracking-wider uppercase">
          Post-Design Finish
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-text-muted">
        <span>Slide left/right to compare</span>
        <span>Simulated Patient Case Demo • Verified Fictional Example</span>
      </div>
    </div>
  );
};

