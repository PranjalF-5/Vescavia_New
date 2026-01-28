import React, { useRef } from 'react';
import { SectionId } from '../types';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from 'framer-motion';
import { ArrowUpRight, Users, Heart, Star, ShoppingBag, Music, Dumbbell, Code2, Play, Film, Clock, ArrowRight } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

const stats = [
  { label: 'Active Users', value: '10K+', icon: Users },
  { label: 'Successful Matches', value: '500+', icon: Heart },
  { label: 'User Rating', value: '4.8★', icon: Star },
];

const stack = ['React', 'Node.js', 'MongoDB', 'AWS'];

const upcoming = [
  {
    id: '02',
    title: 'E-Commerce Platform',
    category: 'Retail Tech',
    desc: 'Next-generation shopping experience with AI-powered recommendations and seamless checkout flow.',
    icon: <ShoppingBag size={24} />,
    status: 'In Development',
    color: 'group-hover:text-pink-500'
  },
  {
    id: '03',
    title: 'Music Streaming App',
    category: 'Media & Entertainment',
    desc: 'Revolutionary music platform connecting artists with fans through immersive audio experiences.',
    icon: <Music size={24} />,
    status: 'In Development',
    color: 'group-hover:text-vescavia-purple'
  },
  {
    id: '04',
    title: 'Fitness App',
    category: 'Health & Wellness',
    desc: 'Smart fitness companion with personalized workouts and real-time progress tracking.',
    icon: <Dumbbell size={24} />,
    status: 'In Development',
    color: 'group-hover:text-emerald-500'
  },
];

const videoReels = [
  { title: "Cyber Aesthetics", duration: "00:44", video: "/optimized/vd8.mp4", progress: 75 },
  { title: "Neon Nights Campaign", duration: "00:13", video: "/optimized/vd2.mp4", progress: 40 },
  { title: "Future Vision", duration: "00:29", video: "/optimized/vd6.mp4", progress: 85 },
  { title: "Urban Rhythms", duration: "00:10", video: "/optimized/vd4.mp4", progress: 20 },
  { title: "Tech Launch 2024", duration: "00:07", video: "/optimized/vd3.mp4", progress: 90 },
  { title: "Creative Process", duration: "00:29", video: "/optimized/vd10.mp4", progress: 95 },
  { title: "Abstract Motion", duration: "00:37", video: "/optimized/vd7.mp4", progress: 45 },
  { title: "Brand Manifesto", duration: "00:10", video: "/optimized/vd1.mp4", progress: 70 },
  { title: "Interface Showcase", duration: "00:58", video: "/optimized/vd9.mp4", progress: 30 },
  { title: "Digital Horizons", duration: "00:30", video: "/optimized/vd5.mp4", progress: 60 },
];

const VideoCard = ({ reel, index, isActive }: { reel: typeof videoReels[0], index: number, isActive: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { margin: "200px 0px" });
  const [hasLoaded, setHasLoaded] = React.useState(false);

  React.useEffect(() => {
    if (isInView && !hasLoaded) {
      setHasLoaded(true);
    }
  }, [isInView, hasLoaded]);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView && hasLoaded) {
      video.play().catch(() => { });
    } else {
      video.pause();
    }
  }, [isInView, hasLoaded]);

  return (
    <motion.div
      ref={containerRef}
      key={index}
      className={`relative w-[240px] h-[360px] md:w-[380px] md:h-[580px] rounded-2xl overflow-hidden group shrink-0 bg-black shadow-2xl snap-center transition-all duration-500 ${isActive ? 'scale-105 shadow-[0_20px_50px_rgba(42,69,245,0.3)]' : ''}`}
      initial="rest"
      whileHover="hover"
      animate={isActive ? "hover" : "rest"}
      style={{ willChange: "transform" }}
    >
      <video
        ref={videoRef}
        src={hasLoaded ? reel.video : undefined}
        muted
        loop
        playsInline
        preload="none"
        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 ${isActive ? 'scale-105 opacity-100' : ''}`}
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />

      {/* Play Button Overlay */}
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 z-20 pointer-events-none ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100'}`}>
        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-[0_0_30px_rgba(255,255,255,0.2)]">
          <Play fill="currentColor" size={20} className="ml-1" />
        </div>
      </div>

      {/* Info & Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 z-30">
        <motion.h3
          variants={{
            rest: { y: 0 },
            hover: { y: -5 }
          }}
          className="text-lg md:text-xl font-bold text-white uppercase mb-3 drop-shadow-md"
        >
          {reel.title}
        </motion.h3>

        <div className="flex items-center gap-3">
          {/* Duration Pill */}
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-white uppercase tracking-widest border border-white/20 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md shrink-0">
            <Clock size={10} className="text-eccentric-blue" />
            {reel.duration}
          </div>

          {/* EXPANDING Progress Bar Container */}
          <motion.div
            variants={{
              rest: { width: "30%" },
              hover: { width: "100%" }
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="h-1.5 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-eccentric-blue to-vescavia-purple rounded-full shadow-[0_0_10px_rgba(42,69,245,0.5)]"
              initial={{ width: 0 }}
              whileInView={{ width: `${reel.progress}%` }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const Reels: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);

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
    const itemWidth = container.clientWidth * 0.8; // Approximate width (80vw)
    const newActiveIndex = Math.round(scrollLeft / itemWidth);

    if (newActiveIndex !== activeIndex) {
      setActiveIndex(newActiveIndex);
    }
  };

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"]
  });
  /* Parallax removed for manual scroll */

  return (
    <section id={SectionId.REELS} ref={scrollRef} className="py-20 md:py-32 bg-vescavia-light dark:bg-vescavia-black relative transition-colors duration-300 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 border-b border-black/10 dark:border-white/10 pb-8"
        >
          <div>
            <div className="font-mono text-xs text-eccentric-blue dark:text-eccentric-blue uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-eccentric-blue rounded-full animate-pulse"></span>
              Portfolio
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black dark:text-white">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-eccentric-blue to-vescavia-purple">Work</span>
            </h2>
          </div>
          <div className="w-full md:w-auto text-left md:text-right mt-4 md:mt-0">
            <p className="text-gray-500 dark:text-gray-400 font-mono text-xs uppercase tracking-widest leading-relaxed">
              Motion. Interaction. System.<br />
              The output of our lab.
            </p>
          </div>
        </motion.div>

        {/* --- REELS SECTION --- */}
        <div className="mb-16 md:mb-32">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Film size={18} className="text-vescavia-purple" />
              <span className="text-xs font-bold uppercase tracking-widest text-black dark:text-white">Motion Gallery</span>
            </div>
            <div className="hidden md:flex gap-2 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-vescavia-purple animate-pulse"></span>
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Hover to Preview</span>
            </div>
            <div className="md:hidden flex items-center gap-1 text-[10px] text-gray-400 font-mono uppercase">
              Swipe <ArrowRight size={10} />
            </div>
          </div>

          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="w-full overflow-x-auto snap-x snap-mandatory pb-8 px-4 md:px-0 scrollbar-hide"
          >
            <motion.div
              className="flex gap-4 md:gap-6 w-max"
            >
              {videoReels.map((reel, i) => (
                <VideoCard key={i} reel={reel} index={i} isActive={isMobile && i === activeIndex} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Featured Project */}
        <div className="mb-16 md:mb-32">
          <div className="flex items-center gap-2 mb-8">
            <span className="w-2 h-2 bg-vescavia-purple rounded-full animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-vescavia-purple">Featured Case Study</span>
          </div>

          <motion.a
            href="https://www.thenikahnest.com/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group grid grid-cols-1 lg:grid-cols-12 gap-0 border border-black/10 dark:border-white/10 bg-white dark:bg-dark-surface rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-vescavia-purple/30 transition-all duration-500 block"
          >
            {/* Image Side */}
            <div className="lg:col-span-7 relative min-h-[300px] md:min-h-[400px] lg:min-h-[600px] overflow-hidden bg-gray-100 dark:bg-gray-900">
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10 lg:hidden" />
              <OptimizedImage
                src="/optimized/Images/Niakh-Nest.jpeg"
                alt="The Nikah Nest Interface"
                loading="lazy"
                decoding="async"
                width={800}
                height={600}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              {/* Vignette Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,rgba(0,0,0,0.8)_100%)] pointer-events-none z-10 opacity-70 group-hover:opacity-50 transition-opacity duration-500" />
              <div className="absolute top-6 left-6 z-20">
                <span className="px-4 py-2 bg-white/90 dark:bg-black/90 backdrop-blur-md text-black dark:text-white text-[10px] font-bold uppercase tracking-widest rounded-full border border-black/5 dark:border-white/10 shadow-lg">
                  Web Development
                </span>
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between bg-white dark:bg-dark-surface relative z-10">
              {/* Noise Texture */}
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

              <div className="relative">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl md:text-5xl font-black uppercase tracking-tight text-black dark:text-white leading-none mb-4 group-hover:text-vescavia-purple transition-colors">
                    The Nikah Nest
                  </h3>
                  <div className="p-2 md:p-3 rounded-full bg-black/5 dark:bg-white/5 group-hover:bg-vescavia-purple group-hover:text-white transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                </div>

                <p className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-8 border-l-2 border-vescavia-purple pl-4">
                  Web Development & Brand Design
                </p>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 text-sm md:text-base">
                  A comprehensive digital platform for Muslim matrimony, connecting individuals seeking meaningful relationships. We created a beautiful, user-friendly website with advanced matching algorithms, secure profiles, and seamless communication features.
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-10">
                  {stack.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded text-[10px] font-mono font-bold text-gray-600 dark:text-gray-400 uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 border-t border-black/10 dark:border-white/10 pt-8 relative">
                {stats.map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <div className="flex items-center gap-1 mb-2 text-vescavia-purple">
                      <stat.icon size={14} />
                    </div>
                    <span className="text-lg md:text-2xl font-black text-black dark:text-white mb-1">
                      {stat.value}
                    </span>
                    <span className="text-[8px] md:text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.a>
        </div>

        {/* More Projects List */}
        <div>
          <div className="flex justify-between items-end mb-12 border-b border-black/10 dark:border-white/10 pb-6">
            <h3 className="text-2xl font-black uppercase tracking-tight text-black dark:text-white">
              In The Lab
            </h3>
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
              Current Builds
            </span>
          </div>

          {/* Mobile Horizontal Scroll */}
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-8 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 no-scrollbar pointer-events-auto will-change-scroll"
          >
            {upcoming.map((project, index) => {
              const isActive = isMobile && index === activeIndex;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`min-w-[80vw] md:min-w-0 snap-center group relative p-8 rounded-2xl bg-white dark:bg-white/5 border transition-all duration-300 ${isActive ? 'border-black/30 dark:border-white/20 -translate-y-2 shadow-xl scale-[1.02]' : 'border-black/10 dark:border-white/5 hover:border-black/30 dark:hover:border-white/20 hover:-translate-y-2 hover:shadow-xl'}`}
                >
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                  <div className="flex justify-between items-start mb-8 relative z-10">
                    <span className={`font-mono text-4xl font-black transition-colors ${isActive ? 'text-black/10 dark:text-white/10' : 'text-black/5 dark:text-white/5 group-hover:text-black/10 dark:group-hover:text-white/10'}`}>
                      {project.id}
                    </span>
                    <div className={`p-3 rounded-xl bg-black/5 dark:bg-white/5 text-black dark:text-white transition-colors duration-300 ${project.color} shadow-sm ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                      {project.icon}
                    </div>
                  </div>

                  <div className="mb-4 relative z-10">
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2 block">
                      {project.category}
                    </span>
                    <h4 className={`text-xl font-bold uppercase text-black dark:text-white mb-3 transition-colors ${isActive ? 'text-vescavia-purple' : 'group-hover:text-vescavia-purple'}`}>
                      {project.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {project.desc}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-black/5 dark:border-white/5 flex justify-between items-center relative z-10">
                    <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse"></span>
                      {project.status}
                    </span>
                    <Code2 size={14} className={`text-gray-300 transition-colors ${isActive ? 'text-black dark:text-white' : 'group-hover:text-black dark:group-hover:text-white'}`} />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Reels;