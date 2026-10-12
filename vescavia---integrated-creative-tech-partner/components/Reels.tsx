import React from 'react';
import { SectionId } from '../types';
import { motion } from 'framer-motion';
import { ShoppingBag, Music, Dumbbell, Code2 } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';
import SwipeCarousel from './ui/SwipeCarousel';
import ShippedProjects from './ShippedProjects';

const upcoming = [
  {
    id: '02',
    title: 'E-Commerce Platform',
    category: 'Retail Tech',
    desc: 'Next-generation shopping experience with AI-powered recommendations and seamless checkout flow.',
    icon: <ShoppingBag size={24} />,
    status: 'In Development',
    color: 'group-hover:text-accent-text-3',
  },
  {
    id: '03',
    title: 'Music Streaming App',
    category: 'Media & Entertainment',
    desc: 'Revolutionary music platform connecting artists with fans through immersive audio experiences.',
    icon: <Music size={24} />,
    status: 'In Development',
    color: 'group-hover:text-accent-text',
  },
  {
    id: '04',
    title: 'Fitness App',
    category: 'Health & Wellness',
    desc: 'Smart fitness companion with personalized workouts and real-time progress tracking.',
    icon: <Dumbbell size={24} />,
    status: 'In Development',
    color: 'group-hover:text-accent-text-2',
  },
];

const Reels: React.FC = () => {
  return (
    <section id={SectionId.REELS} className="relative overflow-hidden py-12 md:py-28">
      <div className="container relative z-10 mx-auto px-6">
        <SectionHeader
          eyebrow="Portfolio"
          title={
            <>
              Our <span className="text-gradient">Work</span>
            </>
          }
          aside={
            <p className="eyebrow max-w-[16rem] text-left leading-relaxed text-gray-500 dark:text-gray-400 md:text-right">
              Motion. Interaction. System.
              <br />
              The output of our lab.
            </p>
          }
          className="mb-8 md:mb-16"
        />

        {/* Featured case study (Lubist), shipped products and why teams hire us */}
        <ShippedProjects />

        {/* In the lab */}
        <div>
          <div className="mb-6 flex items-end justify-between border-b border-black/10 pb-4 dark:border-white/10 md:mb-10 md:pb-6">
            <h3 className="text-2xl font-semibold tracking-tight text-black dark:text-white">In The Lab</h3>
            <span className="eyebrow !text-[10px] text-gray-500 dark:text-gray-400">Current Builds</span>
          </div>

          <SwipeCarousel
            items={upcoming}
            label="Current builds"
            className="md:grid md:grid-cols-3 md:gap-6"
          >
            {(project, index, active) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`glass glass-interactive group rounded-3xl p-6 md:p-7 ${active ? '-translate-y-1' : ''}`}
              >
                <div className="relative z-10 mb-6 flex items-start justify-between md:mb-8">
                  <span className="font-mono text-4xl font-semibold text-black/10 transition-colors group-hover:text-black/20 dark:text-white/10 dark:group-hover:text-white/20">
                    {project.id}
                  </span>
                  <span
                    className={`neo flex h-12 w-12 items-center justify-center rounded-2xl text-gray-600 transition-colors duration-300 dark:text-gray-300 ${project.color}`}
                  >
                    {project.icon}
                  </span>
                </div>

                <div className="relative z-10 mb-5 md:mb-6">
                  <span className="eyebrow mb-2 block !text-[10px] text-gray-500 dark:text-gray-400">
                    {project.category}
                  </span>
                  <h4 className="mb-3 text-xl font-semibold tracking-tight text-black transition-colors group-hover:text-accent-text dark:text-white">
                    {project.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{project.desc}</p>
                </div>

                <div className="relative z-10 flex items-center justify-between border-t border-black/5 pt-5 dark:border-white/5">
                  <span className="eyebrow flex items-center gap-2 !text-[10px] text-gray-500 dark:text-gray-400">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                    {project.status}
                  </span>
                  <Code2 size={14} className="text-gray-400" aria-hidden="true" />
                </div>
              </motion.div>
            )}
          </SwipeCarousel>
        </div>
      </div>
    </section>
  );
};

export default Reels;
