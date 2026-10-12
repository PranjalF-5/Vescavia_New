import React from 'react';
import { SectionId } from '../types';
import { Compass, Telescope, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const values = [
  {
    icon: <Compass className="h-6 w-6" />,
    title: 'Mission',
    desc: 'To transform brands through bold creative thinking and flawless execution, making every project unforgettable.',
  },
  {
    icon: <Telescope className="h-6 w-6" />,
    title: 'Vision',
    desc: 'To be the agency that brands trust to turn their wildest ideas into digital reality.',
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: 'Values',
    desc: 'Creativity, integrity, innovation, and results. We never compromise on quality or authenticity.',
  },
];

const About: React.FC = () => {
  const [activeValueIndex, setActiveValueIndex] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);
  const valueContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleValueScroll = () => {
    const container = valueContainerRef.current;
    if (!container || window.innerWidth >= 768) return;
    const itemWidth = container.clientWidth * 0.8; // cards are 80vw wide
    const next = Math.round(container.scrollLeft / itemWidth);
    if (next !== activeValueIndex) setActiveValueIndex(next);
  };

  return (
    <section id={SectionId.ABOUT} className="relative z-10 overflow-hidden py-16 md:py-28">
      <div className="container mx-auto px-6">
        {/* Story */}
        <div className="mb-16 grid grid-cols-1 items-start gap-12 md:mb-20 md:gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="eyebrow mb-5 inline-flex items-center gap-2.5 text-accent-text">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Who We Are
            </div>
            <h2 className="text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-black dark:text-white md:text-7xl">
              Dreamers.
              <br />
              Creators.
              <br />
              <span className="text-gradient">Innovators.</span>
            </h2>
            <div className="mt-8 h-1 w-20 rounded-full bg-gradient-to-r from-accent to-accent-2" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="glass flex flex-col gap-5 rounded-[2rem] p-7 md:p-10"
          >
            <h3 className="text-2xl font-semibold tracking-tight text-black dark:text-white">Our Story</h3>
            <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300 md:text-lg">
              We&apos;re not your average digital agency. We&apos;re a collective of creative minds who believe that
              great work comes from pushing boundaries, challenging conventions, and never settling for
              &ldquo;good enough.&rdquo;
            </p>
            <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300 md:text-lg">
              Born from a desire to bridge the gap between aesthetic beauty and technical performance, Vescavia
              operates as an extension of your team—designing systems, not just assets.
            </p>
          </motion.div>
        </div>

        {/* Mission / Vision / Values */}
        <div>
          <div
            ref={valueContainerRef}
            onScroll={handleValueScroll}
            className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0"
          >
            {values.map((item, i) => {
              const isActive = isMobile && i === activeValueIndex;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className={`glass glass-interactive group min-w-[80vw] snap-center rounded-3xl p-8 md:min-w-0 ${
                    isActive ? '-translate-y-1' : ''
                  }`}
                >
                  <span
                    className={`neo mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-300 group-hover:text-accent-text ${
                      isActive ? 'text-accent-text' : 'text-black dark:text-white'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <h4 className="mb-3 text-xl font-semibold tracking-tight text-black dark:text-white">{item.title}</h4>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
          <div className="eyebrow mt-2 flex justify-center gap-2 !text-[10px] text-gray-500 dark:text-gray-400 md:hidden">
            Swipe to View <ArrowRight size={10} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
