import React, { useRef } from 'react';
import { SectionId, CaseStudy } from '../types';
import { ArrowUpRight, TrendingUp, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import OptimizedImage from './OptimizedImage';



const cases: CaseStudy[] = [
  {
    id: 'cs1',
    client: 'Lubist',
    title: 'Salon App Platform',
    challenge: 'Fragmented booking systems & poor local discovery.',
    system: 'Multi-Panel Architecture + Geospatial Tech',
    outcome: 'Unified eco-system for vendors, admins & users.',
    metric: '3x Booking Volume',
    image: '/optimized/Images/lubist.webp',
    link: 'https://www.lubist.com/'
  },
  {
    id: 'cs2',
    client: 'The Nikah Nest',
    title: 'Nikah Nest',
    challenge: 'Fragmented vendor discovery for niche market.',
    system: 'Integrated Vendor Marketplace',
    outcome: 'Streamlined wedding planning.',
    metric: 'Rapid User Growth',
    // Featured Case Study Image
    image: '/optimized/Images/Niakh-Nest.jpeg',
    link: 'https://www.thenikahnest.com/'
  }
];

const CaseStudies: React.FC = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    if (window.innerWidth >= 768) return;

    const scrollLeft = container.scrollLeft;
    const itemWidth = container.clientWidth * 0.85; // Approximate width (85vw)
    const newActiveIndex = Math.round(scrollLeft / itemWidth);

    if (newActiveIndex !== activeIndex) {
      setActiveIndex(newActiveIndex);
    }
  };

  return (
    <section id={SectionId.CASE_STUDIES} className="py-20 md:py-32 bg-white dark:bg-dark-surface text-black dark:text-white transition-colors duration-300 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 border-b border-black/10 dark:border-white/10 pb-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-2">
              Growth Arcs
            </h2>
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 font-mono">
              // 6-Month Case Studies
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-vescavia-purple dark:text-vescavia-purple font-bold uppercase tracking-widest hover:text-black dark:hover:text-white transition-colors text-xs">
            View Full Reports <ArrowUpRight size={16} />
          </button>
          <div className="md:hidden mt-4 text-[10px] font-mono uppercase tracking-widest text-gray-400 flex items-center gap-1">
            Swipe <ArrowRight size={10} />
          </div>
        </div>

        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="flex md:block snap-x snap-mandatory pb-8 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 gap-6 md:space-y-6 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
        >
          {cases.map((study, index) => (
            <CaseStudyCard key={study.id} study={study} index={index} isActive={isMobile && index === activeIndex} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CaseStudyCard: React.FC<{ study: CaseStudy; index: number; isActive: boolean; isMobile: boolean }> = ({ study, index, isActive, isMobile }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Enhanced Scroll Parallax for Image
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  // Card Container Parallax (Staggered based on index)
  // We move the card slightly up/down as we scroll to create depth vs the page flow
  const cardParallaxValues = index % 2 === 0 ? [50, -50] : [20, -20];
  const cardParallaxY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : cardParallaxValues);

  const CardContent = (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }}
      style={{ y: cardParallaxY, willChange: 'transform' }}
      className={`min-w-[85vw] md:min-w-0 snap-center group grid grid-cols-1 md:grid-cols-12 gap-0 border bg-gray-50 dark:bg-black transition-all duration-500 rounded-xl overflow-hidden shadow-sm relative z-10 will-change-transform cursor-pointer ${isActive ? 'border-vescavia-purple/50 dark:border-vescavia-purple/50 shadow-2xl scale-[1.02]' : 'border-black/10 dark:border-white/10 hover:border-vescavia-purple/50 dark:hover:border-vescavia-purple/50 hover:shadow-2xl'}`}
    >
      {/* Image Section */}
      <div className="md:col-span-3 relative h-48 md:h-2auto overflow-hidden bg-gray-200 dark:bg-gray-900">
        <motion.div
          style={{ y: !isMobile ? parallaxY : 0, willChange: 'transform' }}
          className="absolute inset-0 w-full h-[130%] -top-[15%]"
        >
          <OptimizedImage
            src={study.image}
            alt={study.title}
            className={`w-full h-full object-cover transition-all duration-700 ${isActive ? 'grayscale-0 opacity-100 scale-110' : 'grayscale opacity-80 dark:opacity-50 group-hover:grayscale-0 group-hover:opacity-100 scale-100 group-hover:scale-110'}`}
          />
        </motion.div>
        {/* Subtle overlay darkening that lifts on hover */}
        <div className={`absolute inset-0 transition-colors duration-500 pointer-events-none ${isActive ? 'bg-transparent' : 'bg-black/10 group-hover:bg-transparent'}`} />
      </div>

      {/* Content Section */}
      <div className="md:col-span-6 p-6 md:p-8 flex flex-col justify-center border-b md:border-b-0 md:border-r border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-sm z-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
          <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
            Client: {study.client}
          </div>
          <div className="font-mono text-[10px] text-eccentric-blue uppercase tracking-widest">
            System: {study.system}
          </div>
        </div>

        <h3 className="text-xl md:text-2xl font-bold uppercase mb-4 leading-tight group-hover:text-eccentric-blue dark:group-hover:text-eccentric-blue transition-colors flex items-center gap-2">
          {study.title} {study.link && <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-600 dark:text-gray-400">
          <div>
            <span className="block font-bold text-black dark:text-white uppercase mb-1">The Challenge</span>
            {study.challenge}
          </div>
          <div>
            <span className="block font-bold text-black dark:text-white uppercase mb-1">The Outcome</span>
            {study.outcome}
          </div>
        </div>
      </div>

      {/* Metric Section */}
      <div className="md:col-span-3 p-6 flex flex-col justify-center bg-black/5 dark:bg-white/5 group-hover:bg-vescavia-purple dark:group-hover:bg-vescavia-purple group-hover:text-white dark:group-hover:text-black transition-colors duration-300 z-10">
        <div className="flex items-center gap-2 mb-2 opacity-50 group-hover:opacity-100">
          <TrendingUp size={16} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Metric</span>
        </div>
        <div className="text-3xl md:text-4xl font-black mb-1 leading-none">
          {study.metric.split('%')[0]}%
        </div>
        <div className="text-[10px] font-bold uppercase tracking-widest opacity-70">
          {study.metric.split(' ').slice(1).join(' ')}
        </div>
      </div>
    </motion.div>
  );

  if (study.link) {
    return (
      <a href={study.link} target="_blank" rel="noopener noreferrer" className="block outline-none focus:ring-2 ring-vescavia-purple rounded-xl">
        {CardContent}
      </a>
    );
  }

  return CardContent;
}

export default CaseStudies;