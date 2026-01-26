import React from 'react';
import { SectionId } from '../types';
import { Compass, Telescope, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const team = [
  {
    name: 'Elena Vescavia',
    role: 'Founder & ECD',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop'
  },
  {
    name: 'David Chen',
    role: 'Head of Technology',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop'
  },
  {
    name: 'Sarah Miller',
    role: 'Lead Strategist',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop'
  },
];

const values = [
  {
    icon: <Compass className="w-6 h-6" />,
    title: 'Mission',
    desc: 'To transform brands through bold creative thinking and flawless execution, making every project unforgettable.'
  },
  {
    icon: <Telescope className="w-6 h-6" />,
    title: 'Vision',
    desc: 'To be the agency that brands trust to turn their wildest ideas into digital reality.'
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Values',
    desc: 'Creativity, integrity, innovation, and results. We never compromise on quality or authenticity.'
  }
];

const About: React.FC = () => {
  const [activeValueIndex, setActiveValueIndex] = React.useState(0);
  const [activeTeamIndex, setActiveTeamIndex] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);
  const valueContainerRef = React.useRef<HTMLDivElement>(null);
  const teamContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleValueScroll = () => {
    if (!valueContainerRef.current) return;
    const container = valueContainerRef.current;
    if (window.innerWidth >= 768) return;

    const scrollLeft = container.scrollLeft;
    const itemWidth = container.clientWidth * 0.8; // Approximate width (80vw)
    const newActiveIndex = Math.round(scrollLeft / itemWidth);

    if (newActiveIndex !== activeValueIndex) {
      setActiveValueIndex(newActiveIndex);
    }
  };

  const handleTeamScroll = () => {
    if (!teamContainerRef.current) return;
    const container = teamContainerRef.current;
    if (window.innerWidth >= 768) return;

    const scrollLeft = container.scrollLeft;
    const itemWidth = container.clientWidth * 0.7; // Approximate width (70vw)
    const newActiveIndex = Math.round(scrollLeft / itemWidth);

    if (newActiveIndex !== activeTeamIndex) {
      setActiveTeamIndex(newActiveIndex);
    }
  };

  return (
    <section id={SectionId.ABOUT} className="py-24 md:py-32 bg-vescavia-light dark:bg-vescavia-black relative z-10 transition-colors duration-300 overflow-hidden">
      <div className="container mx-auto px-6">

        {/* Header & Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 mb-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="font-mono text-xs text-vescavia-purple uppercase tracking-widest mb-4">
              // Who We Are
            </div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-black dark:text-white mb-6">
              Dreamers.<br />
              Creators.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-eccentric-blue to-vescavia-purple">Innovators.</span>
            </h2>
            <div className="h-1 w-20 bg-black dark:bg-white mt-8" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <h3 className="text-2xl font-bold uppercase text-black dark:text-white">Our Story</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              We're not your average digital agency. We're a collective of creative minds who believe that great work comes from pushing boundaries, challenging conventions, and never settling for "good enough."
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Born from a desire to bridge the gap between aesthetic beauty and technical performance, Vescavia operates as an extension of your team—designing systems, not just assets.
            </p>
          </motion.div>
        </div>

        {/* MVV - Horizontal Scroll on Mobile */}
        <div className="mb-32">
          <div
            ref={valueContainerRef}
            onScroll={handleValueScroll}
            className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-6 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 no-scrollbar will-change-scroll"
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
                  className={`min-w-[80vw] md:min-w-0 snap-center p-8 border rounded-2xl transition-colors group ${isActive ? 'border-vescavia-purple/50 bg-white dark:bg-white/5 shadow-lg' : 'border-black/10 dark:border-white/10 bg-white dark:bg-white/5 hover:border-vescavia-purple/50 dark:hover:border-vescavia-purple/50'}`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 transition-colors duration-300 ${isActive ? 'bg-vescavia-purple text-white' : 'bg-black/5 dark:bg-white/10 text-black dark:text-white group-hover:bg-vescavia-purple group-hover:text-white'}`}>
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-black uppercase mb-4 text-black dark:text-white">{item.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>
          <div className="md:hidden flex justify-center mt-2 opacity-30 text-[10px] uppercase font-mono tracking-widest gap-2">
            Swipe to View <ArrowRight size={10} />
          </div>
        </div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-black/10 dark:border-white/10 pt-24"
        >
          <div className="flex justify-between items-end mb-12">
            <h3 className="text-4xl font-black uppercase tracking-tighter text-black dark:text-white">Meet The Team</h3>
            <p className="hidden md:block font-mono text-xs text-gray-500 uppercase tracking-widest">The minds behind the magic</p>
          </div>

          <div
            ref={teamContainerRef}
            onScroll={handleTeamScroll}
            className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-6 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 no-scrollbar will-change-scroll"
          >
            {team.map((member, i) => {
              const isActive = isMobile && i === activeTeamIndex;
              return (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.8 }}
                  className="group relative min-w-[70vw] md:min-w-0 snap-center"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-900 mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      decoding="async"
                      width={400}
                      height={500}
                      className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${isActive ? 'grayscale-0 scale-105' : 'grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105'}`}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 flex items-end p-6 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                      <div className={`transform transition-transform duration-300 ${isActive ? 'translate-y-0' : 'translate-y-4 group-hover:translate-y-0'}`}>
                        <span className="block text-white text-[10px] font-mono uppercase tracking-widest mb-1">{member.role}</span>
                      </div>
                    </div>
                  </div>
                  <h4 className="text-lg font-bold uppercase text-black dark:text-white">{member.name}</h4>
                  <span className={`text-xs font-mono uppercase tracking-widest transition-colors ${isActive ? 'text-vescavia-purple' : 'text-gray-500 group-hover:text-vescavia-purple'}`}>{member.role}</span>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;