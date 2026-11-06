import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { TrustSection } from '../components/home/TrustSection';
import { ServicesPreview } from '../components/home/ServicesPreview';
import { IndustriesPreview } from '../components/home/IndustriesPreview';
import { PortfolioPreview } from '../components/home/PortfolioPreview';
import { PricingPreview } from '../components/home/PricingPreview';
import { HomeCtaSection } from '../components/home/HomeCtaSection';

export const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <TrustSection />
      <ServicesPreview />
      <IndustriesPreview />
      <PortfolioPreview />
      <PricingPreview />
      <HomeCtaSection />
    </div>
  );
};
