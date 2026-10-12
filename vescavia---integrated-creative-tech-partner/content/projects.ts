/**
 * Project showcase content (rendered by components/ShippedProjects.tsx).
 *
 * This section is read by investors and prospective clients, so keep every line something you can
 * back up in a meeting. `proof` figures should only be numbers you can stand behind.
 */

export interface ProjectHighlight {
  title: string;
  text: string;
}

export interface ShippedProject {
  id: string;
  name: string;
  /** Short category line shown above the name. */
  category: string;
  /** One-sentence pitch. */
  pitch: string;
  /** Rendered first, under the "Featured Case Study" label. */
  featured?: boolean;
  /** Live product URL. The card, screenshot and button all link here. */
  url: string;
  /** Button label. */
  cta: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    /** Honest label for what the screenshot shows. */
    caption: string;
  };
  highlights: ProjectHighlight[];
  /** Capability chips. */
  modules: string[];
  /** Optional headline figures. */
  proof?: { value: string; label: string }[];
  proofNote?: string;
}

export const shippedProjects: ShippedProject[] = [
  {
    id: 'lubist',
    name: 'Lubist',
    category: 'Salon Management Platform',
    featured: true,
    url: 'https://www.lubist.com/',
    cta: 'Visit lubist.com',
    pitch:
      'A salon management platform where multiple salons are listed, salons register themselves, and customers book appointments at their chosen salon through the Lubist app.',
    image: {
      src: '/optimized/Images/lubist-services.webp',
      alt: 'Lubist website showing its service categories: spa and wellness, salon, men’s grooming and skin care',
      width: 1600,
      height: 770,
      caption: 'lubist.com · service categories',
    },
    highlights: [
      {
        title: 'Many salons, one platform',
        text: 'Multiple salons are added to Lubist, giving customers a single place to discover and compare them.',
      },
      {
        title: 'Salons register themselves',
        text: 'Self-serve registration lets any salon join the platform and manage its own presence.',
      },
      {
        title: 'Booking in seconds',
        text: 'Customers find verified salons, check real-time availability and book an appointment with their chosen salon via the Lubist app.',
      },
      {
        title: 'Every service, one search',
        text: 'Spa and wellness, salon, men’s grooming and skin care, each bookable with a verified salon near you.',
      },
    ],
    modules: [
      'Multi-salon',
      'Self-serve registration',
      'Appointment booking',
      'Mobile app',
      'Vendor & admin panels',
      'Geospatial discovery',
    ],
    proof: [
      { value: '3x', label: 'Booking volume' },
      { value: '4', label: 'Service categories' },
      { value: '3', label: 'Role-based panels' },
    ],
  },
  {
    id: 'yulo-stores',
    name: 'Yulo Stores',
    category: 'Restaurant OS · SaaS',
    url: 'https://www.yulostores.in/',
    cta: 'Visit yulostores.in',
    pitch:
      'The restaurant operating system: counter, kitchen, inventory, team, customers and numbers in one beautifully simple command centre.',
    image: {
      src: '/optimized/Images/yulo-site.webp',
      alt: 'YuloStores website: "Run your restaurant. Not ten different tools." with the Yulo Command dashboard showing sales, live orders and a sales chart',
      width: 1600,
      height: 774,
      caption: 'yulostores.in · dashboard shown with sample data',
    },
    highlights: [
      {
        title: 'One command centre, not ten tools',
        text: 'Counter, kitchen, inventory, team, customers and numbers brought together on a single platform.',
      },
      {
        title: 'Every order channel, live',
        text: 'Dine-in tables, delivery and takeaway orders tracked in real time, from new to preparing to ready.',
      },
      {
        title: 'Kitchen load and smart inventory',
        text: 'See how many orders are cooking and get alerted when stock needs attention.',
      },
      {
        title: 'Built for India, backed by humans',
        text: 'Designed for Indian restaurants, with no setup chaos and real human support.',
      },
    ],
    modules: ['Counter', 'Kitchen', 'Inventory', 'Team', 'Customers', 'Live analytics'],
  },
  {
    id: 'gyaanverse',
    name: 'Gyaanverse',
    category: 'EdTech · AI SaaS',
    url: 'https://app.gyaanverse.com/',
    cta: 'Open Gyaanverse',
    pitch:
      'The all-in-one EdTech OS that lets coaching institutes run their entire test program online, at a fraction of the cost.',
    image: {
      src: '/optimized/Images/gyaanverse.webp',
      alt: 'Gyaanverse landing page with an AI evaluation card that marks a student’s handwritten calculus solution and identifies the exact mistake',
      width: 1349,
      height: 744,
      caption: 'AI answer evaluation · sample student',
    },
    highlights: [
      {
        title: 'AI that finds the exact mistake',
        text: 'Students upload handwritten solutions; the AI marks them step by step, pinpoints where it went wrong and explains the fix.',
      },
      {
        title: 'Alternative solutions, not just marks',
        text: 'Each evaluation also shows a faster method, so every test doubles as a lesson.',
      },
      {
        title: 'The whole institute in one place',
        text: 'Host batches, automate fee transactions and analyse performance without stitching tools together.',
      },
    ],
    modules: ['Batches', 'Online tests', 'AI evaluation', 'Fee automation', 'Performance analytics'],
    proof: [
      { value: '800+', label: 'Institutes' },
      { value: '50,000+', label: 'Students' },
      { value: '99.9%', label: 'Uptime' },
    ],
    proofNote: 'Figures as published by Gyaanverse.',
  },
];

export interface HireReason {
  id: string;
  title: string;
  text: string;
  /** Which shipped products demonstrate this (empty = true of every project). */
  seenIn: string[];
}

/** "Why teams hire Vescavia": each point is tied to work above. */
export const hireReasons: HireReason[] = [
  {
    id: 'platforms',
    title: 'Complete platforms, not just pages',
    text: 'Vendor and admin panels, customer apps and the booking or order flows between them, designed and shipped as one system.',
    seenIn: ['Lubist', 'Yulo Stores'],
  },
  {
    id: 'ai',
    title: 'AI that does real work',
    text: 'Handwriting-to-feedback evaluation that finds the exact mistake and explains the correct approach.',
    seenIn: ['Gyaanverse'],
  },
  {
    id: 'operators',
    title: 'Built for the people who run it',
    text: 'Live orders, availability, inventory alerts and analytics so operators run the business from one screen.',
    seenIn: ['Yulo Stores', 'Lubist', 'Gyaanverse'],
  },
  {
    id: 'craft',
    title: 'Design and engineering, one team',
    text: 'Brand, motion and product are built together, so what ships feels as good as it works.',
    seenIn: [],
  },
];
