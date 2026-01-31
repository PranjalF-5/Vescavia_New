import React, { useRef } from 'react';
import { SectionId } from '../types';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { Search, PenTool, Rocket, Activity, Repeat, Code } from 'lucide-react';

const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    if (window.innerWidth >= 768) return; // Disable on desktop

    const scrollLeft = container.scrollLeft;
    const itemWidth = container.clientWidth * 0.85; // Approximate width (85vw)
    const newActiveIndex = Math.round(scrollLeft / itemWidth);

    if (newActiveIndex !== activeIndex) {
      setActiveIndex(newActiveIndex);
    }
  };

  React.useEffect(() => {
    // Determine initial state based on screen size
    // On desktop, we don't want any item auto-selected (so -1)
    // On mobile, we want the first item selected (0)
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setActiveIndex(-1);
      } else {
        // Only reset to 0 if it was -1 (meaning coming from desktop state) or if it's initial load
        // But for simplicity/safety to match mobile scroll behavior, we can let handleScroll take over
        // or just ensure we don't overwrite user scroll.
        // For this specific request, just ensuring desktop starts inactive is enough.
      }
    };

    // Check on mount
    if (window.innerWidth >= 768) {
      setActiveIndex(-1);
    }

    // Optional: Update on resize if strict responsiveness is needed
    // window.addEventListener('resize', handleResize);
    // return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const steps = [
    {
      title: 'Discover',
      desc: 'Audit. Comp Analysis. KPIs.',
      icon: <Search className="text-white dark:text-black" size={20} />,
      color: 'bg-black dark:bg-white'
    },
    {
      title: 'Design',
      desc: 'Roadmaps. Strategy. Briefs.',
      icon: <PenTool className="text-white" size={20} />,
      color: 'bg-vescavia-purple'
    },
    {
      title: 'Deploy',
      desc: 'Build. Edit. Ship. Launch.',
      icon: <Code className="text-white" size={20} />,
      color: 'bg-eccentric-blue'
    },
    {
      title: 'Iterate',
      desc: 'Analyze Data. Optimize. Repeat.',
      icon: <Activity className="text-black dark:text-white" size={20} />,
      color: 'bg-white border border-black/10 dark:bg-dark-surface dark:border-white/20'
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 80, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 20
      }
    }
  };

  return (
    <section ref={containerRef} id={SectionId.PROCESS} className="py-16 md:py-24 bg-vescavia-light dark:bg-vescavia-black overflow-hidden relative transition-colors duration-300">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-10 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-eccentric-blue/30 bg-eccentric-blue/10 text-eccentric-blue font-mono text-[10px] uppercase tracking-widest">
            <Repeat size={10} />
            <span>The Infinite Loop</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-black dark:text-white">
            We Design <span className="text-vescavia-purple dark:text-vescavia-purple">Systems</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Continuous integration for your brand assets.</p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Connecting Path */}
          <div className="hidden md:block absolute top-[50%] left-0 w-full h-[1px] bg-black/10 dark:bg-white/10 -translate-y-1/2 z-0">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
              className="h-full w-full bg-gradient-to-r from-vescavia-purple via-eccentric-blue to-vescavia-purple"
            />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-15%" }}
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex md:grid md:grid-cols-4 gap-6 md:gap-12 py-12 px-6 md:px-0 relative z-20 overflow-x-auto snap-x snap-mandatory no-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
          >
            {steps.map((step, index) => {
              const isActive = index === activeIndex;
              return (
                <motion.div
                  key={step.title}
                  variants={itemVariants}
                  className="relative z-10 group will-change-transform min-w-[85vw] md:min-w-0 snap-center"
                >
                  <div className={`flex flex-col items-center text-center p-8 rounded-2xl bg-white dark:bg-black border transition-all duration-500 h-full relative ${isActive ? 'border-eccentric-blue/40 dark:border-vescavia-purple/40 -translate-y-4 shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)]' : 'border-black/10 dark:border-white/10 hover:border-eccentric-blue/40 dark:hover:border-vescavia-purple/40 hover:-translate-y-4 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)]'}`}>

                    {/* Icon Circle */}
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-8 shadow-lg ${step.color} relative z-10 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                      {step.icon}
                    </div>

                    <h3 className={`text-2xl font-bold uppercase mb-3 tracking-wide text-black dark:text-white transition-colors group-hover:text-eccentric-blue`}>
                      {step.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed font-mono uppercase tracking-wide">
                      {step.desc}
                    </p>

                    {/* Step Number Background */}
                    <div className="absolute top-4 right-4 text-[10px] font-black text-black/5 dark:text-white/5 font-mono">
                      0{index + 1}
                    </div>

                    {/* Mobile Connector */}

                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Background Rotating Element */}
        <motion.div
          style={{ rotate, scale }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-dashed border-black/5 dark:border-white/5 rounded-full pointer-events-none -z-10 will-change-transform"
        />
      </div>
    </section >
  );
};

export default Process;