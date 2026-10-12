import React, { useRef } from 'react';
import { SectionId } from '../types';
import { motion, useInView } from 'framer-motion';
import { ShoppingBag, Music, Dumbbell, Code2, Play, Film, ArrowRight } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';
import ScrollRail from './ui/ScrollRail';
import SwipeCarousel from './ui/SwipeCarousel';
import ShippedProjects from './ShippedProjects';
import { useIsMobile } from '../hooks/useIsMobile';

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

const videoReels = [
  { title: 'Wedding Aesthetics', duration: '00:44', video: '/optimized/vd8.mp4', poster: '/optimized/posters/vd8.jpg' },
  { title: 'Abstract Motion Graphics', duration: '00:13', video: '/optimized/vd2.mp4', poster: '/optimized/posters/vd2.jpg' },
  { title: 'Ad-Creation for Courses', duration: '00:29', video: '/optimized/vd6.mp4', poster: '/optimized/posters/vd6.jpg' },
  { title: '2.5D Animation', duration: '00:10', video: '/optimized/vd4.mp4', poster: '/optimized/posters/vd4.jpg' },
  { title: 'Motion Graphics', duration: '00:07', video: '/optimized/vd3.mp4', poster: '/optimized/posters/vd3.jpg' },
  { title: 'Product Edits', duration: '00:29', video: '/optimized/vd10.mp4', poster: '/optimized/posters/vd10.jpg' },
  { title: 'Event Promotions', duration: '00:37', video: '/optimized/vd7.mp4', poster: '/optimized/posters/vd7.jpg' },
  { title: 'Brand Manifesto', duration: '00:10', video: '/optimized/vd1.mp4', poster: '/optimized/posters/vd1.jpg' },
  { title: 'Interface Showcase', duration: '00:58', video: '/optimized/vd9.mp4', poster: '/optimized/posters/vd9.jpg' },
  { title: 'Digital Horizons', duration: '00:30', video: '/optimized/vd5.mp4', poster: '/optimized/posters/vd5.jpg' },
];

interface VideoCardProps {
  reel: (typeof videoReels)[0];
  isActive: boolean;
  isMobile: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({ reel, isActive, isMobile }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { margin: '200px' });
  const [hasLoaded, setHasLoaded] = React.useState(false);

  React.useEffect(() => {
    if ((isInView || isActive) && !hasLoaded) {
      setHasLoaded(true);
    }
  }, [isInView, isActive, hasLoaded]);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const shouldPlay = isMobile ? isActive : isInView;

    if (shouldPlay && hasLoaded) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isInView, hasLoaded, isActive, isMobile]);

  return (
    <motion.div
      ref={containerRef}
      className={`group relative h-[360px] w-[240px] shrink-0 snap-center overflow-hidden rounded-[1.75rem] bg-black shadow-2xl ring-1 ring-black/10 transition-all duration-500 dark:ring-white/10 md:h-[580px] md:w-[380px] ${
        isActive ? 'scale-105 shadow-glow-lg' : ''
      }`}
      initial="rest"
      whileHover="hover"
      animate={isActive ? 'hover' : 'rest'}
    >
      <video
        ref={videoRef}
        src={hasLoaded ? reel.video : undefined}
        poster={reel.poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={reel.title}
        className={`h-full w-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100 ${
          isActive ? 'scale-105 opacity-100' : ''
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

      {/* Play affordance */}
      <div
        className={`pointer-events-none absolute inset-0 z-20 flex items-center justify-center transition-all duration-500 ${
          isActive ? 'scale-100 opacity-100' : 'scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100'
        }`}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white shadow-[0_0_40px_rgba(255,255,255,0.18)] backdrop-blur-md">
          <Play fill="currentColor" size={20} className="ml-1" />
        </div>
      </div>

      {/* Caption */}
      <div className="absolute bottom-0 left-0 z-30 w-full p-4 md:p-6">
        <div className="flex items-end justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 backdrop-blur-md">
          <motion.h3
            variants={{ rest: { y: 0 }, hover: { y: -2 } }}
            className="text-sm font-semibold tracking-tight text-white md:text-base"
          >
            {reel.title}
          </motion.h3>
          <span className="eyebrow !text-[10px] shrink-0 text-white/70">{reel.duration}</span>
        </div>
      </div>
    </motion.div>
  );
};

const Reels: React.FC = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [reelsActiveIndex, setReelsActiveIndex] = React.useState(0);
  const isMobile = useIsMobile();

  const handleReelsScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!isMobile) return;
    const itemWidth = 240 + 16; // card width + gap
    const next = Math.round(e.currentTarget.scrollLeft / itemWidth);
    if (next !== reelsActiveIndex) setReelsActiveIndex(next);
  };

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

        {/* Motion gallery */}
        <div className="mb-12 md:mb-24">
          <div className="mb-4 flex items-center justify-between md:mb-6">
            <div className="flex items-center gap-2.5">
              <span className="neo flex h-9 w-9 items-center justify-center rounded-xl text-accent-text">
                <Film size={16} aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold tracking-tight text-black dark:text-white">Motion Gallery</span>
            </div>
            <div className="hidden items-center gap-2 md:flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              <span className="eyebrow !text-[10px] text-gray-500 dark:text-gray-400">Hover to Preview</span>
            </div>
            <div className="eyebrow flex items-center gap-1 !text-[10px] text-gray-500 dark:text-gray-400 md:hidden">
              Swipe <ArrowRight size={10} aria-hidden="true" />
            </div>
          </div>

          <div
            ref={galleryRef}
            onScroll={handleReelsScroll}
            className="no-scrollbar -mx-6 w-auto snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain px-6 pb-6 pt-3 md:mx-0 md:px-0 md:pb-8"
          >
            <div className="flex w-max gap-4 md:gap-6">
              {videoReels.map((reel, i) => (
                <VideoCard key={reel.video} reel={reel} isActive={isMobile && i === reelsActiveIndex} isMobile={isMobile} />
              ))}
            </div>
          </div>

          {/* Visible scroller: drag the thumb, click the track, or use the arrows */}
          <ScrollRail targetRef={galleryRef} label="motion gallery" />
        </div>

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
