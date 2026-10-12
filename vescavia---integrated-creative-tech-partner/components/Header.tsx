import React, { useEffect, useState } from 'react';
import { SectionId } from '../types';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface NavLink {
  label: string;
  href: string;
  badge?: string;
}

const navLinks: NavLink[] = [
  { label: 'OrbitDesk', href: `#${SectionId.ORBITDESK}`, badge: 'Soon' },
  { label: 'Work', href: `#${SectionId.REELS}` },
  { label: 'Services', href: `#${SectionId.SOLUTIONS}` },
  { label: 'Process', href: `#${SectionId.PROCESS}` },
  { label: 'About', href: `#${SectionId.ABOUT}` },
  { label: 'Growth', href: `#${SectionId.CASE_STUDIES}` },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(SectionId.HERO);
  const [time, setTime] = useState('');
  const { theme, toggleTheme } = useTheme();

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const scrolled = latest > 50;
    if (scrolled !== isScrolled) setIsScrolled(scrolled);
  });

  // Scroll spy: the section crossing the upper third of the viewport is "active"
  useEffect(() => {
    const sections = Object.values(SectionId);
    const handleScroll = () => {
      const probe = window.innerHeight / 3;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const { top, bottom } = el.getBoundingClientRect();
        if (top <= probe && bottom > probe) {
          setActiveSection(id);
          break;
        }
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short',
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30_000);
    return () => clearInterval(interval);
  }, []);

  // Mobile menu: lock page scroll and close on Escape
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        className="pointer-events-none fixed left-0 right-0 top-0 z-50 flex justify-center"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 60, damping: 20 }}
      >
        <div className="pointer-events-auto w-full px-4 pt-3 md:pt-5">
          <div
            className={`glass mx-auto flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isScrolled
                ? 'max-w-5xl rounded-full px-4 py-2.5 md:px-5'
                : 'max-w-7xl rounded-[1.75rem] px-5 py-3.5 md:px-7 md:py-4'
            }`}
          >
            {/* Identity */}
            <div className="relative z-10 flex shrink-0 items-center gap-5">
              <a href="#hero" className="group flex items-center gap-3" aria-label="Vescavia home">
                <span className="relative">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2 shadow-glow transition-transform duration-300 group-hover:scale-105">
                    <img
                      src="/Logo.png"
                      alt=""
                      width={24}
                      height={24}
                      className="h-6 w-6 object-contain logo-on-accent"
                    />
                  </span>
                  <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400 dark:border-vescavia-black" />
                </span>
                <span className="flex flex-col">
                  <span className="text-[15px] font-semibold leading-none tracking-tight text-vescavia-dark-text dark:text-white">
                    Vescavia
                  </span>
                  <span className="eyebrow mt-1 !text-[9px] !tracking-[0.2em] text-gray-500 dark:text-gray-400">
                    Creative · Tech
                  </span>
                </span>
              </a>

              <div
                className={`hidden items-center gap-2 border-l border-black/10 pl-5 transition-all duration-300 dark:border-white/10 xl:flex ${
                  isScrolled ? 'pointer-events-none w-0 overflow-hidden border-none pl-0 opacity-0' : 'opacity-100'
                }`}
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                <span className="eyebrow !text-[10px] text-gray-500 dark:text-gray-400">{time}</span>
              </div>
            </div>

            {/* Navigation */}
            <nav
              aria-label="Primary"
              className="glass-pill hidden items-center gap-0.5 rounded-full p-1 lg:flex"
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors xl:px-4 ${
                      isActive
                        ? 'text-on-accent'
                        : 'text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-tab"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent-2 shadow-glow"
                        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                    {link.badge && (
                      <span
                        className={`relative z-10 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase leading-none tracking-wider ${
                          isActive
                            ? 'bg-on-accent/20 text-on-accent'
                            : 'bg-accent/15 text-accent-text'
                        }`}
                      >
                        {link.badge}
                      </span>
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="relative z-10 flex shrink-0 items-center gap-2 md:gap-3">
              <button
                type="button"
                onClick={toggleTheme}
                className="neo flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors hover:text-accent-text dark:text-gray-300 "
                aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              >
                {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
              </button>

              <a href={`#${SectionId.CONTACT}`} className="btn btn-primary hidden !px-5 !py-3 lg:inline-flex">
                <span className={isScrolled ? 'hidden xl:inline' : 'inline'}>Start Project</span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>

              <button
                type="button"
                className="neo flex h-10 w-10 items-center justify-center rounded-full text-black dark:text-white lg:hidden"
                onClick={() => setIsMobileMenuOpen((open) => !open)}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center overflow-y-auto bg-vescavia-light/95 px-6 py-24 text-vescavia-dark-text backdrop-blur-2xl dark:bg-vescavia-black/95 dark:text-vescavia-white lg:hidden"
          >
            <div className="ambient-base pointer-events-none absolute inset-0" />
            <div className="grid-bg pointer-events-none absolute inset-0" />

            <nav aria-label="Mobile" className="relative z-10 flex flex-col gap-1">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 border-b border-black/5 py-4 text-3xl font-semibold tracking-tight dark:border-white/5 ${
                      isActive ? 'text-gradient' : 'text-black dark:text-white'
                    }`}
                  >
                    {link.label}
                    {link.badge && (
                      <span className="rounded-full bg-accent/15 px-2 py-1 text-[10px] font-bold uppercase leading-none tracking-wider text-accent-text">
                        {link.badge}
                      </span>
                    )}
                  </motion.a>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="relative z-10 mt-10"
            >
              <a
                href={`#${SectionId.CONTACT}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn btn-primary w-full"
              >
                Start Project <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
