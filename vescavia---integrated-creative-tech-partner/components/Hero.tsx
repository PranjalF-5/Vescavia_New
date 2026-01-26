import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code, Cpu, Zap } from 'lucide-react';
import { SectionId } from '../types';
import TextReveal from './TextReveal';

const Hero: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Mouse follower effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smoother spring physics for the spotlight
  const springX = useSpring(mouseX, { damping: 40, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 40, stiffness: 200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const backgroundGradient = useMotionTemplate`radial-gradient(
    600px circle at ${springX}px ${springY}px,
    rgba(124, 58, 237, 0.12),
    transparent 80%
  )`;

  // Rotating Text Logic
  const [textIndex, setTextIndex] = useState(0);

  // Color Harmony Palette - Vivid and Distinct
  const rotatingItems = [
    { text: "Web Experiences", color: "text-eccentric-blue" },       // Tech Blue
    { text: "Brand Stories", color: "text-amber-500" },              // Warm Amber
    { text: "Epic Campaigns", color: "text-pink-600" },              // Creative Pink
    { text: "Digital Magic", color: "text-emerald-500" }             // Magic Green
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % rotatingItems.length);
    }, 4000); // Slower interval for readability
    return () => clearInterval(interval);
  }, [rotatingItems.length]);

  // Updated Marquee Items
  const marqueeItems = ["CREATIVE AGENCY", "BRAND BUILDERS", "DIGITAL INNOVATORS"];

  return (
    <section
      ref={targetRef}
      id={SectionId.HERO}
      // Optimized mobile padding: pt-28 pb-24 (was pt-32 pb-40)
      className="relative min-h-screen flex flex-col justify-center pt-28 pb-24 md:pt-32 md:pb-40 overflow-hidden bg-vescavia-light dark:bg-vescavia-black transition-colors duration-300"
    >

      {/* Interactive Mouse SpotLight */}
      <motion.div
        style={{ background: backgroundGradient }}
        className="fixed inset-0 pointer-events-none mix-blend-multiply dark:mix-blend-screen z-0 opacity-100"
      />

      {/* Aurora Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[60vh] bg-gradient-to-b from-eccentric-blue/5 to-transparent blur-3xl pointer-events-none" />

      {/* Parallax Background Blob */}
      <motion.div
        style={{ y: y1 }}
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-vescavia-purple/5 rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-screen z-0"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col gap-8 md:gap-10">

          <div className="max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 mb-6 md:mb-8"
            >
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md text-black dark:text-white font-mono text-[10px] uppercase tracking-widest shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-eccentric-blue animate-pulse shadow-[0_0_8px_#2A45F5]" />
                System Online v2.4
              </div>
              <div className="hidden md:flex gap-4">
                <span className="text-gray-500 dark:text-gray-600 font-mono text-[10px] uppercase tracking-widest flex items-center gap-1"><Cpu size={10} /> AI Integrated</span>
                <span className="text-gray-500 dark:text-gray-600 font-mono text-[10px] uppercase tracking-widest flex items-center gap-1"><Code size={10} /> Full Stack</span>
                <span className="text-gray-500 dark:text-gray-600 font-mono text-[10px] uppercase tracking-widest flex items-center gap-1"><Zap size={10} /> High Velocity</span>
              </div>
            </motion.div>

            <motion.div style={{ y: textY, opacity }} className="relative mb-2 flex flex-col items-start w-full">
              {/* Line 1: Static */}
              <TextReveal
                text="Your Creative"
                className="text-[9vw] md:text-7xl lg:text-[8rem] font-black uppercase tracking-tighter leading-[0.9] text-black dark:text-white relative z-10 dark:mix-blend-color-dodge transition-colors mb-2 whitespace-nowrap"
                delay={0}
              />

              {/* Line 2: Rotating Slogans */}
              <div className="h-[1.2em] relative overflow-hidden w-full text-[9vw] md:text-7xl lg:text-[8rem] font-black uppercase tracking-tighter leading-[0.9]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={textIndex}
                    initial={{ y: "110%", opacity: 0, filter: "blur(12px)" }}
                    animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: "-110%", opacity: 0, filter: "blur(12px)" }}
                    transition={{ duration: 0.8, ease: [0.2, 1, 0.4, 1] }} // Cinematic slow ease
                    className="absolute top-0 left-0"
                  >
                    <h2 className={`${rotatingItems[textIndex].color} whitespace-nowrap transition-colors duration-500`}>
                      {rotatingItems[textIndex].text}
                    </h2>
                  </motion.div>
                </AnimatePresence>
                {/* Invisible placeholder to maintain layout width/height prevents layout shift/collapse */}
                <h2 className="opacity-0 pointer-events-none whitespace-nowrap" aria-hidden="true">
                  Bold Brand Stories
                </h2>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
              className="text-lg md:text-2xl text-gray-600 dark:text-gray-400 font-light leading-relaxed max-w-2xl border-l-2 border-eccentric-blue pl-6 mb-10 md:mb-12 mt-8 md:mt-12"
            >
              We are the intersection of a <strong>Production House</strong> and a <strong>Tech Lab</strong>. We build integrated digital ecosystems—Web, AI, Video, & Design—that compound your brand's growth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-5"
            >
              <a
                href="#models"
                className="group relative px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest text-xs overflow-hidden rounded-md hover:scale-105 transition-transform duration-300 w-full sm:w-auto text-center"
              >
                <div className="absolute inset-0 bg-eccentric-blue transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Initialize Partnership <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </a>

            </motion.div>
          </div>
        </div>
      </div>

      {/* Unified Marquee - Faster, Smaller, More Visible */}
      <div className="absolute bottom-0 w-full border-t border-black/5 dark:border-white/5 bg-white/90 dark:bg-black/90 backdrop-blur-sm z-20">
        <div className="w-full py-3 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {/* Repeating the items enough times to fill screens without gaps */}
            {[...Array(6)].map((_, groupIndex) => (
              <div key={groupIndex} className="flex items-center">
                {marqueeItems.map((item, i) => (
                  <div key={`${groupIndex}-${i}`} className="flex items-center gap-6 mr-6">
                    <span className="text-xl md:text-3xl font-black text-black/80 dark:text-white/80 uppercase tracking-tighter">
                      {item}
                    </span>
                    {/* Separator Dot */}
                    <div className="w-1.5 h-1.5 bg-eccentric-blue rounded-full" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .bg-300% {
          background-size: 300% 300%;
        }
        .animate-shine {
          animation: shine 5s linear infinite;
        }
        @keyframes shine {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite; /* Slowed down slightly for elegance */
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default Hero;