import React, { useState, useEffect } from 'react';
import { SectionId } from '../types';
import { Menu, X, ArrowUpRight, Sun, Moon, Phone } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(SectionId.HERO);
  const [time, setTime] = useState('');
  const { theme, toggleTheme } = useTheme();

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = isScrolled;
    const current = latest > 50;
    if (previous !== current) {
      setIsScrolled(current);
    }
  });

  // Scroll Spy Logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = Object.values(SectionId);
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: 'Work', href: `#${SectionId.REELS}` },
    { label: 'Services', href: `#${SectionId.SOLUTIONS}` },
    { label: 'Process', href: `#${SectionId.PROCESS}` },
    { label: 'About', href: `#${SectionId.ABOUT}` },
    { label: 'Growth', href: `#${SectionId.CASE_STUDIES}` },

  ];

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      >
        <div className="w-full px-4 pt-4 md:pt-6 pointer-events-auto">
          <motion.div
            layout
            className={`mx-auto relative flex justify-between items-center backdrop-blur-xl border shadow-2xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled
              ? 'rounded-full px-6 py-3 max-w-6xl bg-white/80 dark:bg-black/80 border-black/5 dark:border-white/10'
              : 'rounded-2xl px-8 py-5 max-w-7xl bg-white/60 dark:bg-black/50 border-black/5 dark:border-white/10'
              }`}
          >
            {/* Background Noise Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-[length:128px]" />

            {/* Left: Identity */}
            <div className="flex items-center gap-6 z-10 shrink-0">
              <a href="#" className="group flex items-center gap-3 relative z-10">
                <div className="relative">
                  <div className="w-10 h-10 bg-black dark:bg-white text-white dark:text-black rounded flex items-center justify-center font-black font-mono text-lg group-hover:bg-vescavia-purple group-hover:text-white transition-colors duration-300 overflow-hidden">
                    <img src="/Logo.png" alt="Vescavia" className="w-full h-full object-contain p-1 invert dark:invert-0 group-hover:invert transition-all duration-300" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-eccentric-blue rounded-full animate-pulse border border-white dark:border-black" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base md:text-sm font-bold tracking-tight uppercase leading-none text-vescavia-dark-text dark:text-white">
                    Vescavia
                  </span>
                  <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest leading-none mt-1 group-hover:text-vescavia-purple transition-colors">
                    System Online
                  </span>
                </div>
              </a>

              {/* Desktop Time Display - Hidden on scroll to save space */}
              <div className={`hidden lg:flex items-center gap-2 border-l border-black/10 dark:border-white/10 pl-6 transition-all duration-300 origin-left ${isScrolled ? 'opacity-0 w-0 overflow-hidden pl-0 border-none scale-0' : 'opacity-100 scale-100'}`}>
                <div className="w-1.5 h-1.5 bg-eccentric-blue rounded-full animate-pulse" />
                <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                  {time}
                </span>
              </div>
            </div>

            {/* Center: Navigation - Flex Grow to take available space and center content */}
            <div className="flex-grow hidden md:flex justify-center px-4">
              <nav className="flex items-center gap-1 p-1.5 rounded-full border border-black/5 dark:border-white/5 bg-white/40 dark:bg-black/40 backdrop-blur-lg shadow-[inset_0_0_20px_rgba(255,255,255,0.1)]">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      className={`relative px-5 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors rounded-full whitespace-nowrap ${isActive
                        ? 'text-white dark:text-black'
                        : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                        }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="active-tab"
                          className="absolute inset-0 bg-black dark:bg-white rounded-full shadow-lg"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{link.label}</span>
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 md:gap-4 z-10 shrink-0">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <a
                href={`#${SectionId.CONTACT}`}
                className={`group hidden md:flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-5 py-2.5 rounded-full font-bold uppercase text-[10px] tracking-widest hover:bg-eccentric-blue dark:hover:bg-eccentric-blue hover:text-white dark:hover:text-white transition-all duration-300 ${isScrolled ? 'px-4 py-2' : ''}`}
              >
                <span className={`${isScrolled ? 'hidden lg:inline' : 'inline'}`}>Start Project</span>
                <Phone size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Mobile Toggle */}
              <button
                className="md:hidden p-2 text-black dark:text-white hover:text-vescavia-purple transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ willChange: "opacity, clip-path" }}
            className="fixed inset-0 z-40 bg-vescavia-light dark:bg-vescavia-black flex flex-col justify-center px-6 md:hidden text-vescavia-dark-text dark:text-vescavia-white"
          >
            {/* Background Grid */}
            <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

            <nav className="flex flex-col gap-6 relative z-10">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-4xl font-black uppercase tracking-tighter transition-all ${activeSection === link.href.substring(1)
                    ? 'text-vescavia-purple scale-105 origin-left'
                    : 'text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-400 dark:from-white dark:to-gray-600'
                    }`}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href={`#${SectionId.CONTACT}`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-4xl font-black uppercase tracking-tighter text-eccentric-blue"
              >
                Contact Us
              </motion.a>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-12 relative z-10"
            >
              <div className="w-full h-px bg-black/10 dark:bg-white/10 mb-8" />
              <div className="flex justify-between items-end">
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-xs text-eccentric-blue uppercase tracking-widest">System Status</span>
                  <span className="text-black dark:text-white font-bold text-sm flex items-center gap-2">
                    <span className="w-2 h-2 bg-eccentric-blue rounded-full animate-pulse" />
                    Operational
                  </span>
                </div>
                <a
                  href={`#${SectionId.CONTACT}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-6 py-3 bg-eccentric-blue text-white font-bold uppercase text-xs tracking-widest rounded-full"
                >
                  Start Project
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;