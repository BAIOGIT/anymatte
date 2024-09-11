import React from 'react';

import HeroSection from './elements/Hero';
import UVPSection from './elements/UVP';
import HowItWorksSection from './elements/HowItWorks';
import BenefitsSection from './elements/Benefits';
import SocialProofSection from './elements/SocialProof';
import CallToActionSection from './elements/CallToAction';
import ServicesSection from './elements/Services';
import ContactSection from './elements/Contact';

// Main Landing Page Component
function LandingPage() {
  return (
    <div className="">
      <HeroSection />
      <UVPSection />
      {/* <ServicesSection /> */}
      {/* <HowItWorksSection /> */}
      <BenefitsSection />
      {/* <SocialProofSection /> */}
      <CallToActionSection />      
      <ContactSection />
    </div>
  );
}

export default LandingPage;