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
  metric: string;
  image: string;
  link?: string;
}

export enum SectionId {
  HERO = 'hero',
  REELS = 'reels', // Work
  SOLUTIONS = 'solutions', // Services
  PROCESS = 'process',
  ABOUT = 'about',
  CASE_STUDIES = 'case-studies', // Growth

  CONTACT = 'contact',
}