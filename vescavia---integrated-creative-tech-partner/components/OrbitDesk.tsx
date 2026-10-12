import React from 'react';
import { motion } from 'framer-motion';
import { Layers, ShieldCheck, Sparkles, Workflow } from 'lucide-react';
import { SectionId } from '../types';
import { orbitDesk } from '../content/orbitdesk';
import OrbitRings from './ui/OrbitRings';
import WaitlistForm from './ui/WaitlistForm';
import SwipeCarousel from './ui/SwipeCarousel';

const pillarIcons: Record<string, React.ReactNode> = {
  unified: <Layers size={22} />,
  intelligent: <Sparkles size={22} />,
  secure: <ShieldCheck size={22} />,
};

const IconNode: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="glass flex h-12 w-12 items-center justify-center rounded-2xl text-accent-text shadow-lg ">
    {children}
  </span>
);

const GlowDot: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span
    className={`block h-2.5 w-2.5 rounded-full bg-gradient-to-br from-accent to-accent-2 shadow-glow ${className}`}
  />
);

/** Abstract product window orbited by feature satellites. Decorative only. */
const OrbitScene: React.FC = () => (
  <div className="relative mx-auto w-full max-w-[520px]" aria-hidden="true">
    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full pool-mix" />

    <OrbitRings
      rings={[
        {
          inset: '0%',
          duration: 90,
          dashed: true,
          satellites: [{ angle: 38, node: <GlowDot /> }],
        },
        {
          inset: '9%',
          duration: 60,
          reverse: true,
          satellites: [
            { angle: 120, node: <IconNode><Workflow size={20} /></IconNode> },
            { angle: 300, node: <IconNode><ShieldCheck size={20} /></IconNode> },
          ],
        },
        {
          inset: '20%',
          duration: 42,
          satellites: [
            { angle: 60, node: <IconNode><Sparkles size={20} /></IconNode> },
            { angle: 235, node: <GlowDot /> },
          ],
        },
      ]}
    >
      {/* Product window */}
      <div className="glass sheen absolute left-1/2 top-1/2 w-[42%] -translate-x-1/2 -translate-y-1/2 rounded-2xl p-3 shadow-glow">
        <div className="mb-2.5 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-400/80" />
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400/80" />
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
          <span className="ml-auto h-1.5 w-1/3 rounded-full bg-black/10 dark:bg-white/15" />
        </div>
        <div className="flex gap-2">
          <div className="flex w-1/4 flex-col gap-1.5">
            <span className="h-2 rounded-full bg-gradient-to-r from-accent to-accent-2" />
            <span className="h-2 rounded-full bg-black/10 dark:bg-white/10" />
            <span className="h-2 w-3/4 rounded-full bg-black/10 dark:bg-white/10" />
            <span className="h-2 w-1/2 rounded-full bg-black/10 dark:bg-white/10" />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <div className="grid grid-cols-3 gap-1.5">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-5 rounded-md bg-black/[0.06] dark:bg-white/[0.08]" />
              ))}
            </div>
            <div className="flex h-12 items-end gap-1 rounded-md bg-black/[0.05] p-1.5 dark:bg-white/[0.06]">
              {[38, 62, 44, 78, 54, 90, 68].map((h, i) => (
                <span
                  key={i}
                  style={{ height: `${h}%` }}
                  className="flex-1 rounded-sm bg-gradient-to-t from-accent to-accent-2 opacity-85"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </OrbitRings>

    {/* Floating glass tags */}
    <div className="glass-pill absolute right-[2%] top-[6%] hidden animate-float items-center gap-2 rounded-2xl px-3.5 py-2.5 shadow-xl sm:flex">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
      </span>
      <span className="eyebrow !text-[10px] text-black dark:text-white">Launching soon</span>
    </div>
    <div className="glass-pill absolute bottom-[8%] left-[2%] hidden animate-float-delayed items-center gap-2.5 rounded-2xl px-3.5 py-2.5 shadow-xl sm:flex">
      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-2">
        <img src="/Logo.png" alt="" width={14} height={14} className="h-3.5 w-3.5 object-contain logo-on-accent" />
      </span>
      <span className="eyebrow !text-[10px] text-black dark:text-white">Built by Vescavia</span>
    </div>
  </div>
);

const OrbitDesk: React.FC = () => {
  return (
    <section id={SectionId.ORBITDESK} aria-labelledby="orbitdesk-title" className="relative py-12 md:py-28">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="glass relative overflow-hidden rounded-[2rem] md:rounded-[3rem]"
        >
          {/* Inner light */}
          <div className="pointer-events-none absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full pool-a" />
          <div className="pointer-events-none absolute -bottom-48 -right-32 h-[30rem] w-[30rem] rounded-full pool-b" />

          <div className="relative grid grid-cols-1 items-center gap-10 p-5 sm:p-10 md:gap-14 md:p-14 lg:grid-cols-12 lg:gap-8 lg:p-20">
            <div className="min-w-0 lg:col-span-6">
              <div className="mb-7 flex flex-wrap items-center gap-3">
                <span className="glass-pill inline-flex items-center gap-2.5 rounded-full px-4 py-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  <span className="eyebrow text-black dark:text-white">{orbitDesk.status}</span>
                </span>
                <span className="eyebrow text-gray-500 dark:text-gray-400">{orbitDesk.eyebrow}</span>
              </div>

              <h2
                id="orbitdesk-title"
                className="text-gradient text-gradient-flow pb-2 text-[clamp(3.4rem,11vw,7.25rem)] font-semibold leading-[0.95] tracking-[-0.055em]"
              >
                {orbitDesk.name}
              </h2>
              <p className="mt-2 text-2xl font-medium tracking-tight text-black dark:text-white md:text-3xl">
                {orbitDesk.tagline}
              </p>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-600 dark:text-gray-400 md:text-lg">
                {orbitDesk.summary}
              </p>

              <div className="mt-9">
                <WaitlistForm />
              </div>
            </div>

            <div className="hidden min-w-0 md:block lg:col-span-6">
              <OrbitScene />
            </div>
          </div>

          <div className="hairline" />

          <div className="relative p-5 md:p-14 lg:px-20">
            <SwipeCarousel
              items={orbitDesk.pillars}
              label={`${orbitDesk.name} pillars`}
              inset={5}
              className="md:grid md:grid-cols-3 md:gap-4"
            >
              {(pillar, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="glass-pill glass-interactive rounded-3xl p-6"
                >
                  <span className="neo mb-4 flex h-12 w-12 items-center justify-center rounded-2xl text-accent-text md:mb-5">
                    {pillarIcons[pillar.id]}
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight text-black dark:text-white">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{pillar.description}</p>
                </motion.div>
              )}
            </SwipeCarousel>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OrbitDesk;
