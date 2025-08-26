// pages/index.tsx or app/page.tsx
"use client";
import React from 'react';

import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import PricingSection from '@/components/landing/PricingSection';
import MarketplaceSection from '@/components/landing/MarketplaceSection';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';
import Navigation from '@/components/landing/Navigation';

const SmartSensorFlowLanding = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <MarketplaceSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default SmartSensorFlowLanding;