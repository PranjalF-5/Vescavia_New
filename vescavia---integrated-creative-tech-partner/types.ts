import React from 'react';

export interface Solution {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface CaseStudy {
  id: string;
  client: string;
  title: string;
  challenge: string;
  system: string;
  outcome: string;
  /** Headline figure, e.g. "3x" */
  metricValue: string;
  /** What the figure measures, e.g. "Booking Volume" */
  metricLabel: string;
  image: string;
  link?: string;
}

export enum SectionId {
  HERO = 'hero',
  ORBITDESK = 'orbitdesk', // Flagship product (coming soon)
  REELS = 'reels', // Work
  SOLUTIONS = 'solutions', // Services
  PROCESS = 'process',
  ABOUT = 'about',
  CASE_STUDIES = 'case-studies', // Growth

  CONTACT = 'contact',
}
