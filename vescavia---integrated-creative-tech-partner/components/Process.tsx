import React, { useRef } from 'react';
import { SectionId } from '../types';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { Search, PenTool, Activity, Code } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';

const steps = [
  {
    title: 'Discover',
    desc: 'Audit. Comp Analysis. KPIs.',
    icon: <Search size={22} />,
    badge: 'from-slate-700 to-slate-900 text-white dark:from-slate-200 dark:to-white dark:text-black',
  },
  {
    title: 'Design',
    desc: 'Roadmaps. Strategy. Briefs.',
    icon: <PenTool size={22} />,
    badge: 'from-accent-3 to-accent text-on-accent',
  },
  {
    title: 'Deploy',
    desc: 'Build. Edit. Ship. Launch.',
    icon: <Code size={22} />,
    badge: 'from-accent to-accent-2 text-on-accent',
  },
  {
    title: 'Iterate',
    desc: 'Analyze Data. Optimize. Repeat.',
    icon: <Activity size={22} />,
    badge: 'from-accent-2 to-accent-3 text-on-accent',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.22, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 60, damping: 20 },
  },
};

const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // -1 = nothing preselected (desktop); on mobile the swiped-to card is active
  const [activeIndex, setActiveIndex] = React.useState(() =>
    typeof window !== 'undefined' && window.innerWidth >= 768 ? -1 : 0,
  );

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container || window.innerWidth >= 768) return;
    const itemWidth = container.clientWidth * 0.85; // cards are 85vw wide
    const next = Math.round(container.scrollLeft / itemWidth);
    if (next !== activeIndex) setActiveIndex(next);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section
      ref={containerRef}
      id={SectionId.PROCESS}
      className="relative overflow-hidden py-16 md:py-28"
    >
      <div className="container relative z-10 mx-auto px-6">
        <SectionHeader
          align="center"
          eyebrow="The Infinite Loop"
          title={
            <>
              We Design <span className="text-gradient">Systems</span>
            </>
          }
          description="Continuous integration for your brand assets."
          className="mb-10 md:mb-20"
        />

        <div className="relative mx-auto max-w-6xl">
          {/* Connecting path */}
          <div className="absolute left-0 top-1/2 z-0 hidden h-px w-full -translate-y-1/2 bg-black/10 dark:bg-white/10 md:block">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
              className="h-full w-full bg-gradient-to-r from-accent via-accent-2 to-accent"
            />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-15%' }}
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="no-scrollbar relative z-20 -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 py-12 md:mx-0 md:grid md:grid-cols-4 md:gap-8 md:overflow-visible md:px-0"
          >
            {steps.map((step, index) => {
              const isActive = index === activeIndex;
              return (
                <motion.div
                  key={step.title}
                  variants={itemVariants}
                  className="group relative z-10 min-w-[85vw] snap-center md:min-w-0"
                >
                  <div
                    className={`glass glass-interactive relative flex h-full flex-col items-center rounded-3xl p-8 text-center ${
                      isActive ? '-translate-y-2' : ''
                    }`}
                  >
                    <span
                      className={`mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br shadow-glow transition-transform duration-300 group-hover:scale-110 ${step.badge} ${
                        isActive ? 'scale-110' : ''
                      }`}
                    >
                      {step.icon}
                    </span>

                    <h3 className="mb-3 text-2xl font-semibold tracking-tight text-black transition-colors group-hover:text-accent-text dark:text-white ">
                      {step.title}
                    </h3>
                    <p className="eyebrow !text-[11px] !tracking-[0.1em] leading-relaxed text-gray-500 dark:text-gray-400">
                      {step.desc}
                    </p>

                    <span className="absolute right-5 top-4 font-mono text-xs font-semibold text-black/15 dark:text-white/15">
                      0{index + 1}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Background rotating ring */}
      <motion.div
        // framer-motion owns `transform`, so the centring offset is expressed here, not as Tailwind classes
        style={{ x: '-50%', y: '-50%', rotate, scale }}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] rounded-full border border-dashed border-black/10 will-change-transform dark:border-white/10"
      />
    </section>
  );
};

export default Process;
