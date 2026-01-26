import React, { useRef } from 'react';
import { SectionId } from '../types';
import { Fingerprint, Aperture, BarChart3, Layers, BrainCircuit, ArrowRight } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const solutions = [
  {
    id: 'pillar-1',
    title: 'Brand Strategy & Management',
    description: 'We shape how your brand is perceived, remembered, and chosen. From positioning and messaging to identity systems that stay consistent as you scale. Clarity, differentiation, and long-term brand equity.',
    icon: <Fingerprint size={28} />,
    tags: ['Positioning', 'Identity', 'Messaging', 'Guidelines'],
    color: 'group-hover:text-black dark:group-hover:text-white',
    borderColor: 'group-hover:border-black/50 dark:group-hover:border-white/50',
    bgGradient: 'from-black/5 dark:from-white/5',
    glowShadow: 'group-hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]',
    iconGlow: 'rgba(128,128,128,0.3)'
  },
  {
    id: 'pillar-2',
    title: 'Content & Visual Storytelling',
    description: 'We turn ideas into narratives that hold attention and build emotional connection — across formats, platforms, and campaigns. Stories designed to be felt, remembered, and acted upon.',
    icon: <Aperture size={28} />,
    tags: ['Video', 'Social', 'Copywriting', 'Motion'],
    color: 'group-hover:text-pink-600 dark:group-hover:text-pink-400',
    borderColor: 'group-hover:border-pink-400/50',
    bgGradient: 'from-pink-500/10',
    glowShadow: 'group-hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]',
    iconGlow: 'rgba(236,72,153,0.4)'
  },
  {
    id: 'pillar-3',
    title: 'Performance & Growth Campaigns',
    description: 'We design and optimize growth systems that turn attention into measurable outcomes — not vanity metrics. Creative driven by strategy. Results driven by data.',
    icon: <BarChart3 size={28} />,
    tags: ['Paid Media', 'SEO', 'Analytics', 'CRO'],
    color: 'group-hover:text-eccentric-blue dark:group-hover:text-eccentric-blue',
    borderColor: 'group-hover:border-eccentric-blue/50',
    bgGradient: 'from-eccentric-blue/10',
    glowShadow: 'group-hover:shadow-[0_0_30px_rgba(42,69,245,0.15)]',
    iconGlow: 'rgba(42,69,245,0.4)'
  },
  {
    id: 'pillar-4',
    title: 'Digital Products & Software',
    description: 'We design and build digital experiences that don\'t just look good — they work hard. Fast, scalable, and built to convert. Websites and platforms as growth assets, not brochures.',
    icon: <Layers size={28} />,
    tags: ['Web Dev', 'App Dev', 'UX/UI', 'Headless'],
    color: 'group-hover:text-vescavia-purple',
    borderColor: 'group-hover:border-vescavia-purple/50',
    bgGradient: 'from-vescavia-purple/10',
    glowShadow: 'group-hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]',
    iconGlow: 'rgba(124,58,237,0.4)'
  },
  {
    id: 'pillar-5',
    title: 'AI & Intelligent Systems',
    description: 'We integrate automation and AI where it creates real leverage — improving speed, efficiency, and decision-making. Smarter workflows. Stronger systems. Competitive edge.',
    icon: <BrainCircuit size={28} />,
    tags: ['Automation', 'LLMs', 'Workflows', 'Python'],
    color: 'group-hover:text-emerald-500',
    borderColor: 'group-hover:border-emerald-500/50',
    bgGradient: 'from-emerald-500/10',
    glowShadow: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]',
    iconGlow: 'rgba(16,185,129,0.4)'
  },
];

const SolutionCard: React.FC<{ suite: typeof solutions[0], index: number, isLast: boolean }> = ({ suite, index, isLast }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable tilt on mobile for better scrolling experience
    if (typeof window !== 'undefined' && window.innerWidth < 768) return; 

    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, filter: "blur(5px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      style={{ perspective: 1000 }} // Key for 3D effect
      className={`h-full min-w-[85vw] md:min-w-0 snap-center ${isLast ? 'md:col-span-2 md:w-1/2 md:mx-auto' : ''}`}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
          rotateX: typeof window !== 'undefined' && window.innerWidth >= 768 ? rotateX : 0, 
          rotateY: typeof window !== 'undefined' && window.innerWidth >= 768 ? rotateY : 0,
          transformStyle: "preserve-3d"
        }}
        className={`group relative p-8 md:p-10 rounded-3xl bg-white dark:bg-dark-surface border border-black/5 dark:border-white/5 transition-colors duration-500 overflow-visible h-full flex flex-col ${suite.borderColor} hover:shadow-2xl`}
      >
        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] rounded-3xl" />

        {/* Holographic Sheen Effect */}
        <motion.div 
          style={{ 
            background: useTransform(
              mouseXSpring, 
              [-0.5, 0.5], 
              ["linear-gradient(to right, transparent, rgba(255,255,255,0), transparent)", "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)"]
            ),
            x: useTransform(mouseXSpring, [-0.5, 0.5], ["-100%", "100%"]) 
          }}
          className="hidden md:block absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
        />

        {/* Intensifying Background Gradient */}
        <motion.div 
          variants={{
            hover: { opacity: 1 }
          }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className={`absolute inset-0 bg-gradient-to-br ${suite.bgGradient} to-transparent pointer-events-none rounded-3xl`} 
          style={{ transform: "translateZ(-20px)" }}
        />
        
        <div className="relative z-10 flex-grow flex flex-col" style={{ transform: "translateZ(20px)" }}>
          <div className="flex justify-between items-start mb-6 md:mb-8">
            {/* Animated Pulsing Icon */}
            <motion.div 
              variants={{
                hover: { 
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    `0 0 0px ${suite.iconGlow}`,
                    `0 0 20px ${suite.iconGlow}`,
                    `0 0 0px ${suite.iconGlow}`
                  ],
                  transition: { 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }
                }
              }}
              className={`w-12 h-12 md:w-14 md:h-14 bg-gray-100 dark:bg-black/50 rounded-2xl border border-black/5 dark:border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300 ${suite.color} ${suite.glowShadow} shadow-lg`}
            >
              {suite.icon}
            </motion.div>
            <span className="font-mono text-[10px] text-gray-500 dark:text-gray-600 uppercase tracking-widest border border-black/5 dark:border-white/5 px-2 py-1 rounded group-hover:border-black/20 dark:group-hover:border-white/20 transition-colors">
              0{index + 1}
            </span>
          </div>
          
          <h3 className={`text-xl md:text-2xl font-bold uppercase leading-tight mb-3 md:mb-4 transition-colors ${suite.color}`}>
            {suite.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 md:mb-8 max-w-lg">
            {suite.description}
          </p>

          <div className="mt-auto">
             <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-3">
                Key Disciplines:
             </div>
             <div className="flex flex-wrap gap-2">
                {suite.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded text-[10px] font-mono text-gray-500 dark:text-gray-300 group-hover:border-black/20 dark:group-hover:border-white/20 transition-colors cursor-default">
                     {tag}
                  </span>
                ))}
             </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Solutions: React.FC = () => {
  return (
    <section id={SectionId.SOLUTIONS} className="py-24 md:py-32 bg-vescavia-light dark:bg-vescavia-black relative z-10 transition-colors duration-300 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 md:mb-6 text-black dark:text-white">
              OUR <span className="text-vescavia-purple">SERVICES</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              Comprehensive digital solutions that drive real results.
            </p>
          </div>
          <div className="flex flex-col items-end mt-6 md:mt-0">
             <div className="font-mono text-eccentric-blue dark:text-vescavia-purple text-xs uppercase tracking-widest border border-eccentric-blue/30 dark:border-vescavia-purple/30 px-3 py-1 rounded-full mb-2">
              // Service Pillars
             </div>
             <span className="text-[10px] text-gray-500 font-mono uppercase flex items-center gap-1">
               <span className="md:hidden">Swipe</span><span className="hidden md:inline">Scroll</span> to explore <ArrowRight size={10} className="md:hidden" />
             </span>
          </div>
        </div>

        {/* Horizontal Scroll on Mobile / Grid on Desktop */}
        <div className="flex md:grid md:grid-cols-2 gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-8 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
          {solutions.map((suite, index) => (
             <SolutionCard 
                key={suite.id} 
                suite={suite} 
                index={index} 
                isLast={index === solutions.length - 1}
             />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;