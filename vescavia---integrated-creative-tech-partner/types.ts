import React from 'react';

export interface Solution {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface PricingTier {
  name: string;
  price: string;
  priceDetail: string;
  subtitle: string;
  features: string[];
  minTerm: string;
  buttonText: string;
  isPopular?: boolean;
}

export interface CaseStudy {
  id: string;
  client: string;
  title: string;
  challenge: string;
  system: string;
  outcome: string;
  metric: string;
  image: string;
}

export enum SectionId {
  HERO = 'hero',
  REELS = 'reels', // Work
  SOLUTIONS = 'solutions', // Services
  PROCESS = 'process',
  ABOUT = 'about',
  CASE_STUDIES = 'case-studies', // Growth
  MODELS = 'models',
  CONTACT = 'contact',
}