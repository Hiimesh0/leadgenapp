import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { TrustSection } from '../components/home/TrustSection';
import { ServicesPreview } from '../components/home/ServicesPreview';
import { DoctorPreview } from '../components/home/DoctorPreview';
import { GalleryPreview } from '../components/home/GalleryPreview';
import { AppointmentCtaSection } from '../components/home/AppointmentCtaSection';

export const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <TrustSection />
      <ServicesPreview />
      <DoctorPreview />
      <GalleryPreview />
      <AppointmentCtaSection />
    </div>
  );
};
