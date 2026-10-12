import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, BrainCircuit, Cpu, Code, Film, Globe, PenTool, Sparkles, Zap } from 'lucide-react';
import { SectionId } from '../types';
import TextReveal from './TextReveal';
import OrbitRings from './ui/OrbitRings';
import { orbitDesk } from '../content/orbitdesk';

const rotatingItems = [
  // Each phrase sweeps a different pair of the active palette's gradient stops
  { text: 'Web Experiences', gradient: 'from-grad-1 to-grad-2' },
  { text: 'Brand Stories', gradient: 'from-grad-2 to-grad-3' },
  { text: 'Epic Campaigns', gradient: 'from-grad-3 to-grad-1' },
  { text: 'Digital Magic', gradient: 'from-grad-1 via-grad-2 to-grad-3' },
];

const marqueeItems = ['Creative Agency', 'Brand Builders', 'Digital Innovators'];

const disciplines = [
  { label: 'Web', Icon: Globe },
  { label: 'AI', Icon: BrainCircuit },
  { label: 'Video', Icon: Film },
  { label: 'Design', Icon: PenTool },
];

const DisciplineChip: React.FC<{ label: string; Icon: React.ComponentType<{ size?: number }> }> = ({ label, Icon }) => (
  <div className="glass-pill flex items-center gap-2 whitespace-nowrap rounded-full py-2 pl-2.5 pr-4 shadow-lg">
    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-on-accent">
      <Icon size={14} />
    </span>
    <span className="text-xs font-semibold tracking-wide text-black dark:text-white">{label}</span>
  </div>
);

const Hero: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % rotatingItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const current = rotatingItems[textIndex];

  return (
    <section
      ref={targetRef}
      id={SectionId.HERO}
      className="relative flex min-h-screen min-h-svh flex-col justify-center overflow-hidden pb-28 pt-32 md:pb-32 md:pt-36"
    >
      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <motion.div
            style={{ y: contentY, opacity: contentOpacity }}
            className="min-w-0 lg:col-span-7"
          >
            {/* OrbitDesk announcement — first thing every visitor sees */}
            <motion.a
              href={`#${SectionId.ORBITDESK}`}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="glass-pill group mb-6 inline-flex max-w-full items-center gap-3 rounded-full py-1.5 pl-1.5 pr-4 text-sm shadow-lg transition-transform hover:-translate-y-0.5 md:mb-8"
            >
              <span className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent to-accent-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-on-accent">
                <Sparkles size={11} aria-hidden="true" />
                New
              </span>
              <span className="truncate font-medium text-black dark:text-white">
                Introducing <span className="text-gradient font-semibold">{orbitDesk.name}</span>
                <span className="hidden sm:inline"> — {orbitDesk.status}</span>
              </span>
              <ArrowRight
                size={15}
                aria-hidden="true"
                className="shrink-0 text-gray-500 transition-transform group-hover:translate-x-1 dark:text-gray-400"
              />
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="mb-6 hidden flex-wrap gap-x-5 gap-y-2 md:flex"
            >
              {[
                { Icon: Cpu, label: 'AI Integrated' },
                { Icon: Code, label: 'Full Stack' },
                { Icon: Zap, label: 'High Velocity' },
              ].map(({ Icon, label }) => (
                <span
                  key={label}
                  className="eyebrow flex items-center gap-1.5 !text-[10px] text-gray-500 dark:text-gray-400"
                >
                  <Icon size={11} aria-hidden="true" /> {label}
                </span>
              ))}
            </motion.div>

            {/* Sized so the longest rotating phrase ("Web Experiences") always fits its column */}
            <h1 className="text-[clamp(2.5rem,10.5vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-black dark:text-white lg:text-[clamp(2.75rem,5.6vw,5.5rem)]">
              <TextReveal as="span" text="Your Creative" delay={0.1} className="relative z-10" />

              {/* Rotating line (decorative; the sr-only text carries the meaning) */}
              <span aria-hidden="true" className="relative mt-1 block h-[1.18em] w-full overflow-hidden leading-[1.1]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={textIndex}
                    initial={{ y: '110%', opacity: 0, filter: 'blur(10px)' }}
                    animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: '-110%', opacity: 0, filter: 'blur(10px)' }}
                    transition={{ duration: 0.75, ease: [0.2, 1, 0.4, 1] }}
                    className={`absolute left-0 top-0 whitespace-nowrap bg-gradient-to-r bg-clip-text pb-[0.08em] text-transparent ${current.gradient}`}
                  >
                    {current.text}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="sr-only">: web experiences, brand stories, epic campaigns and digital magic.</span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.7, duration: 0.9, ease: 'easeOut' }}
              className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-gray-600 dark:text-gray-300 md:mt-10 md:text-xl"
            >
              We are the intersection of a{' '}
              <strong className="font-semibold text-black dark:text-white">Production House</strong> and a{' '}
              <strong className="font-semibold text-black dark:text-white">Tech Lab</strong>. We build integrated
              digital ecosystems—Web, AI, Video, &amp; Design—that compound your brand&apos;s growth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.6 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
            >
              <a href={`#${SectionId.CONTACT}`} className="btn btn-primary group w-full sm:w-auto">
                Initialize Partnership
                <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </a>
              <a href={`#${SectionId.ORBITDESK}`} className="btn btn-glass group w-full sm:w-auto">
                <Sparkles size={15} aria-hidden="true" className="text-accent-text" />
                Explore {orbitDesk.name}
                <ArrowUpRight
                  size={15}
                  aria-hidden="true"
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </motion.div>
          </motion.div>

          {/* Integrated-ecosystem orbit: the four disciplines circling Vescavia */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:col-span-5 lg:block"
          >
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full pool-a" />
            <OrbitRings
              className="mx-auto w-full max-w-[500px]"
              rings={[
                { inset: '0%', duration: 70, dashed: true },
                {
                  inset: '8%',
                  duration: 48,
                  reverse: true,
                  satellites: [
                    { angle: 90, node: <DisciplineChip {...disciplines[1]} /> },
                    { angle: 270, node: <DisciplineChip {...disciplines[3]} /> },
                  ],
                },
                {
                  inset: '26%',
                  duration: 34,
                  satellites: [
                    { angle: 0, node: <DisciplineChip {...disciplines[0]} /> },
                    { angle: 180, node: <DisciplineChip {...disciplines[2]} /> },
                  ],
                },
              ]}
            >
              <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                <span className="absolute h-full w-full animate-pulse-ring rounded-full border border-accent/50" />
                <span className="absolute h-full w-full animate-pulse-ring rounded-full border border-accent-2/50 [animation-delay:1.3s]" />
                <span className="glass sheen relative flex h-24 w-24 items-center justify-center rounded-full">
                  <img
                    src="/Logo.png"
                    alt=""
                    width={44}
                    height={44}
                    className="h-11 w-11 object-contain dark:brightness-0 dark:invert"
                  />
                </span>
              </div>
            </OrbitRings>
          </motion.div>
        </div>
      </div>

      {/* Marquee */}
      <div className="absolute bottom-0 z-20 w-full border-t border-black/5 bg-white/40 backdrop-blur-md dark:border-white/[0.06] dark:bg-white/[0.02]">
        <div className="marquee-mask w-full overflow-hidden py-3.5">
          <div className="flex w-max animate-marquee-fast whitespace-nowrap md:animate-marquee" aria-hidden="true">
            {[...Array(6)].map((_, groupIndex) => (
              <div key={groupIndex} className="flex items-center">
                {marqueeItems.map((item) => (
                  <div key={`${groupIndex}-${item}`} className="mr-8 flex items-center gap-8">
                    <span className="text-lg font-semibold tracking-tight text-black/70 dark:text-white/70 md:text-2xl">
                      {item}
                    </span>
                    <span className="h-1.5 w-1.5 rotate-45 bg-gradient-to-br from-accent to-accent-2" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
