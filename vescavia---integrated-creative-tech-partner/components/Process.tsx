import React, { useRef } from 'react';
import { SectionId } from '../types';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { Search, PenTool, Rocket, Activity, Repeat, Code } from 'lucide-react';

const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
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
    <section ref={containerRef} id={SectionId.PROCESS} className="py-40 bg-vescavia-light dark:bg-vescavia-black overflow-hidden relative transition-colors duration-300">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-32"
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
            className="grid grid-cols-1 md:grid-cols-4 gap-12"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                variants={itemVariants}
                className="relative z-10 group will-change-transform"
              >
                <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white dark:bg-black border border-black/10 dark:border-white/10 hover:border-eccentric-blue/40 dark:hover:border-vescavia-purple/40 transition-all duration-500 h-full relative hover:-translate-y-4 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                  
                  {/* Icon Circle */}
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-8 shadow-lg ${step.color} relative z-10 group-hover:scale-110 transition-transform duration-300`}>
                    {step.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold uppercase mb-3 tracking-wide text-black dark:text-white group-hover:text-eccentric-blue transition-colors">
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
                  {index !== steps.length - 1 && (
                     <div className="md:hidden w-px h-12 bg-black/10 dark:bg-white/10 mt-8 mx-auto" />
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Background Rotating Element */}
          <motion.div 
             style={{ rotate, scale }}
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-dashed border-black/5 dark:border-white/5 rounded-full pointer-events-none -z-10 will-change-transform"
          />
        </div>
      </div>
    </section>
  );
};

export default Process;