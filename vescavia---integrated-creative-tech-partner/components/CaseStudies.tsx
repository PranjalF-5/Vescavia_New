import React, { useRef } from 'react';
import { SectionId, CaseStudy } from '../types';
import { ArrowUpRight, TrendingUp, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import OptimizedImage from './OptimizedImage';
import SectionHeader from './ui/SectionHeader';

const cases: CaseStudy[] = [
  {
    id: 'cs1',
    client: 'Lubist',
    title: 'Lubist',
    challenge: 'Fragmented booking systems & poor local discovery.',
    system: 'Multi-Panel Architecture + Geospatial Tech',
    outcome: 'Unified eco-system for vendors, admins & users.',
    metricValue: '3x',
    metricLabel: 'Booking Volume',
    image: '/optimized/Images/lubist.webp',
    link: 'https://www.lubist.com/',
  },
  {
    id: 'cs2',
    client: 'Gyaanverse',
    title: 'Gyaanverse',
    challenge: 'Institutes stitching together separate tools for tests, fees and performance, with slow manual answer-checking.',
    system: 'Institute OS + AI Answer Evaluation',
    outcome: 'One platform for batches, online tests, fee automation and AI-marked, step-by-step feedback.',
    metricValue: '800+',
    metricLabel: 'Institutes',
    image: '/optimized/Images/gyaanverse-eval.webp',
    link: 'https://app.gyaanverse.com/',
  },
];

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
  isActive: boolean;
  isMobile: boolean;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ study, index, isActive, isMobile }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  // Image parallax + a gentle, staggered card drift for depth against the page flow
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  const cardDrift = index % 2 === 0 ? [36, -36] : [16, -16];
  const cardParallaxY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : cardDrift);

  const Card = (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ delay: index * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ y: cardParallaxY }}
      className={`glass group relative grid min-w-[85vw] snap-center grid-cols-1 overflow-hidden rounded-[1.75rem] md:min-w-0 md:grid-cols-12 ${
        isActive ? 'shadow-glow' : ''
      }`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-900 md:col-span-3 md:h-auto md:min-h-[220px]">
        <motion.div
          style={{ y: isMobile ? 0 : parallaxY }}
          className="absolute inset-0 -top-[12%] h-[124%] w-full"
        >
          <OptimizedImage
            src={study.image}
            alt={`${study.client} — ${study.title}`}
            className={`h-full w-full object-cover transition-all duration-700 ${
              isActive
                ? 'scale-110 opacity-100 grayscale-0'
                : 'scale-100 opacity-90 grayscale group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0'
            }`}
          />
        </motion.div>
      </div>

      {/* Story */}
      <div className="flex flex-col justify-center border-b border-black/10 p-6 dark:border-white/10 md:col-span-6 md:border-b-0 md:border-r md:p-9">
        <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
          <div className="eyebrow !text-[10px] text-gray-500 dark:text-gray-400">Client: {study.client}</div>
          <div className="eyebrow !text-[10px] text-accent-text">System: {study.system}</div>
        </div>

        <h3 className="mb-5 flex items-center gap-2 text-xl font-semibold leading-tight tracking-tight text-black transition-colors group-hover:text-accent-text dark:text-white md:text-2xl">
          {study.title}
          {study.link && (
            <ArrowUpRight
              size={18}
              aria-hidden="true"
              className="opacity-0 transition-opacity group-hover:opacity-100"
            />
          )}
        </h3>

        <div className="grid grid-cols-1 gap-4 text-sm text-gray-600 dark:text-gray-400 md:grid-cols-2">
          <div>
            <span className="eyebrow mb-1.5 block !text-[10px] text-black dark:text-white">The Challenge</span>
            {study.challenge}
          </div>
          <div>
            <span className="eyebrow mb-1.5 block !text-[10px] text-black dark:text-white">The Outcome</span>
            {study.outcome}
          </div>
        </div>
      </div>

      {/* Metric */}
      <div className="relative flex flex-col justify-center overflow-hidden bg-gradient-to-br from-accent/10 to-accent-2/10 p-6 md:col-span-3 md:p-8">
        <div className="mb-3 flex items-center gap-2 text-accent-text">
          <TrendingUp size={16} aria-hidden="true" />
          <span className="eyebrow !text-[10px]">Metric</span>
        </div>
        <div className="text-gradient mb-1 text-4xl font-semibold leading-none tracking-tight md:text-5xl">
          {study.metricValue}
        </div>
        <div className="eyebrow !text-[10px] text-gray-600 dark:text-gray-300">{study.metricLabel}</div>
      </div>
    </motion.div>
  );

  if (study.link) {
    return (
      <a
        href={study.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-[1.75rem] outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        {Card}
      </a>
    );
  }

  return Card;
};

const CaseStudies: React.FC = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container || window.innerWidth >= 768) return;
    const itemWidth = container.clientWidth * 0.85; // cards are 85vw wide
    const next = Math.round(container.scrollLeft / itemWidth);
    if (next !== activeIndex) setActiveIndex(next);
  };

  return (
    <section
      id={SectionId.CASE_STUDIES}
      className="relative overflow-hidden border-y border-black/5 bg-white/30 py-20 dark:border-white/[0.06] dark:bg-white/[0.015] md:py-32"
    >
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="6-Month Case Studies"
          title={
            <>
              Growth <span className="text-gradient">Arcs</span>
            </>
          }
          aside={
            <>
              <a href={`#${SectionId.CONTACT}`} className="btn btn-glass hidden md:inline-flex">
                Start your growth story <ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <span className="eyebrow flex items-center gap-1 !text-[10px] text-gray-500 dark:text-gray-400 md:hidden">
                Swipe <ArrowRight size={10} aria-hidden="true" />
              </span>
            </>
          }
          className="mb-12 md:mb-16"
        />

        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-8 md:mx-0 md:block md:space-y-6 md:overflow-visible md:px-0 md:pb-0"
        >
          {cases.map((study, index) => (
            <CaseStudyCard
              key={study.id}
              study={study}
              index={index}
              isMobile={isMobile}
              isActive={isMobile && index === activeIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
