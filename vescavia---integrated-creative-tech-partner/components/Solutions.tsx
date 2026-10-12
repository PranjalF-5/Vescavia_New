import React, { useRef } from 'react';
import { SectionId } from '../types';
import { Fingerprint, Aperture, BarChart3, Layers, BrainCircuit, ArrowRight } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import SectionHeader from './ui/SectionHeader';
import SwipeCarousel from './ui/SwipeCarousel';
import { useIsMobile } from '../hooks/useIsMobile';

const solutions = [
  {
    id: 'pillar-1',
    title: 'Brand Strategy & Management',
    description:
      'We shape how your brand is perceived, remembered, and chosen. From positioning and messaging to identity systems that stay consistent as you scale. Clarity, differentiation, and long-term brand equity.',
    icon: <Fingerprint size={26} />,
    tags: ['Positioning', 'Identity', 'Messaging', 'Guidelines'],
    hoverText: 'group-hover:text-accent-text',
    activeText: 'text-accent-text',
    hoverBorder: 'hover:border-accent/50',
    activeBorder: 'border-accent/50',
    wash: 'from-accent/15',
    glow: 'group-hover:shadow-glow',
    tint: 'bg-accent/5',
  },
  {
    id: 'pillar-2',
    title: 'Content & Visual Storytelling',
    description:
      'We turn ideas into narratives that hold attention and build emotional connection — across formats, platforms, and campaigns. Stories designed to be felt, remembered, and acted upon.',
    icon: <Aperture size={26} />,
    tags: ['Video', 'Social', 'Copywriting', 'Motion'],
    hoverText: 'group-hover:text-accent-text-2',
    activeText: 'text-accent-text-2',
    hoverBorder: 'hover:border-accent-2/50',
    activeBorder: 'border-accent-2/50',
    wash: 'from-accent-2/15',
    glow: 'group-hover:shadow-glow-2',
    tint: 'bg-accent-2/5',
  },
  {
    id: 'pillar-3',
    title: 'Performance & Growth Campaigns',
    description:
      'We design and optimize growth systems that turn attention into measurable outcomes — not vanity metrics. Creative driven by strategy. Results driven by data.',
    icon: <BarChart3 size={26} />,
    tags: ['Paid Media', 'SEO', 'Analytics', 'CRO'],
    hoverText: 'group-hover:text-accent-text-3',
    activeText: 'text-accent-text-3',
    hoverBorder: 'hover:border-accent-3/50',
    activeBorder: 'border-accent-3/50',
    wash: 'from-accent-3/15',
    glow: 'group-hover:shadow-glow-3',
    tint: 'bg-accent-3/5',
  },
  {
    id: 'pillar-4',
    title: 'Digital Products & Software',
    description:
      "We design and build digital experiences that don't just look good — they work hard. Fast, scalable, and built to convert. Websites and platforms as growth assets, not brochures.",
    icon: <Layers size={26} />,
    tags: ['Web Dev', 'App Dev', 'UX/UI', 'Headless'],
    hoverText: 'group-hover:text-accent-text',
    activeText: 'text-accent-text',
    hoverBorder: 'hover:border-accent/50',
    activeBorder: 'border-accent/50',
    wash: 'from-accent/15',
    glow: 'group-hover:shadow-glow',
    tint: 'bg-accent/5',
  },
  {
    id: 'pillar-5',
    title: 'AI & Intelligent Systems',
    description:
      'We integrate automation and AI where it creates real leverage — improving speed, efficiency, and decision-making. Smarter workflows. Stronger systems. Competitive edge.',
    icon: <BrainCircuit size={26} />,
    tags: ['Automation', 'LLMs', 'Workflows', 'Python'],
    hoverText: 'group-hover:text-accent-text-2',
    activeText: 'text-accent-text-2',
    hoverBorder: 'hover:border-accent-2/50',
    activeBorder: 'border-accent-2/50',
    wash: 'from-accent-2/15',
    glow: 'group-hover:shadow-glow-2',
    tint: 'bg-accent-2/5',
  },
];

interface SolutionCardProps {
  suite: (typeof solutions)[0];
  index: number;
  isActive: boolean;
  isMobile: boolean;
}

const SolutionCard: React.FC<SolutionCardProps> = ({ suite, index, isActive, isMobile }) => {
  const ref = useRef<HTMLDivElement>(null);

  // 3D tilt (desktop only)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 110, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 110, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);
  const sheenX = useTransform(mouseXSpring, [-0.5, 0.5], ['-60%', '60%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ delay: index * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1200 }}
      className="h-full md:min-h-[380px]"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        className={`glass group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] p-6 transition-[border-color] duration-500 md:p-9 ${suite.hoverBorder} ${
          isActive ? suite.activeBorder : ''
        }`}
      >
        {/* Colour wash that blooms on hover */}
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${suite.wash} to-transparent transition-opacity duration-500 ${
            isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        />

        {/* Holographic sheen */}
        <motion.div
          style={{ x: sheenX }}
          className={`pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-transparent via-white/10 to-transparent transition-opacity duration-300 md:block ${
            isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        />

        <div className="relative z-10 flex flex-grow flex-col" style={{ transform: 'translateZ(18px)' }}>
          <div className="mb-5 flex items-start justify-between md:mb-7">
            <motion.span
              variants={{
                hover: {
                  scale: [1, 1.08, 1],
                  transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                },
              }}
              className={`neo flex h-14 w-14 items-center justify-center rounded-2xl text-gray-500 transition-colors duration-300 dark:text-gray-300 ${suite.hoverText} ${suite.glow} ${
                isActive ? suite.activeText : ''
              }`}
            >
              {suite.icon}
            </motion.span>
            <span className="eyebrow rounded-full border border-black/10 px-2.5 py-1 !text-[10px] text-gray-500 dark:border-white/10 dark:text-gray-400">
              0{index + 1}
            </span>
          </div>

          <h3
            className={`mb-3 text-xl font-semibold leading-tight tracking-tight text-black transition-colors dark:text-white md:text-2xl ${suite.hoverText} ${
              isActive ? suite.activeText : ''
            }`}
          >
            {suite.title}
          </h3>

          <p className="mb-6 max-w-lg text-sm leading-relaxed text-gray-600 dark:text-gray-400 md:mb-8">{suite.description}</p>

          <div className="mt-auto">
            <div className="eyebrow mb-3 hidden !text-[10px] text-gray-500 dark:text-gray-400 md:block">Key Disciplines</div>
            <div className="flex flex-wrap gap-2">
              {suite.tags.map((tag) => (
                <span
                  key={tag}
                  className="glass-pill eyebrow cursor-default rounded-full px-3 py-1.5 !text-[10px] !tracking-[0.1em] text-gray-600 dark:text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Solutions: React.FC = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const isMobile = useIsMobile();

  // On phones the section picks up the tint of the card being swiped to
  const activeTint = isMobile ? solutions[activeIndex]?.tint ?? '' : '';

  return (
    <section
      id={SectionId.SOLUTIONS}
      className={`relative z-20 overflow-hidden py-12 transition-colors duration-500 md:py-28 ${activeTint}`}
    >
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Service Pillars"
          title={
            <>
              Our <span className="text-gradient">Services</span>
            </>
          }
          description="Comprehensive digital solutions that drive real results."
          aside={
            <span className="eyebrow flex items-center gap-1.5 !text-[10px] text-gray-500 dark:text-gray-400">
              <span className="md:hidden">Swipe</span>
              <span className="hidden md:inline">Hover</span> to explore
              <ArrowRight size={10} className="md:hidden" aria-hidden="true" />
            </span>
          }
          className="mb-6 md:mb-14"
        />

        <SwipeCarousel
          items={solutions}
          label="Services"
          onActiveChange={setActiveIndex}
          className="md:grid md:grid-cols-2 md:items-stretch md:gap-7"
          slideClassName={(index) =>
            index === solutions.length - 1 ? 'md:col-span-2 md:mx-auto md:w-1/2' : ''
          }
        >
          {(suite, index, active) => (
            <SolutionCard suite={suite} index={index} isMobile={isMobile} isActive={active} />
          )}
        </SwipeCarousel>
      </div>
    </section>
  );
};

export default Solutions;
