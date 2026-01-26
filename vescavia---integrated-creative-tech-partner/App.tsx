import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CursorTrail from './components/CursorTrail';
import { ThemeProvider } from './context/ThemeContext';

// Lazy load below-the-fold components for performance
const About = React.lazy(() => import('./components/About'));
const Solutions = React.lazy(() => import('./components/Solutions'));
const Process = React.lazy(() => import('./components/Process'));
const Reels = React.lazy(() => import('./components/Reels'));
const CaseStudies = React.lazy(() => import('./components/CaseStudies'));
const Contact = React.lazy(() => import('./components/Contact'));
const Footer = React.lazy(() => import('./components/Footer'));

const AppContent: React.FC = () => {
  useEffect(() => {
    // Smooth scroll behavior for anchor links using Event Delegation
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');

      if (anchor) {
        const href = anchor.getAttribute('href');

        // Prevent default behavior for all hash links to stop jump
        e.preventDefault();

        // Only try to scroll if it's a valid selector (length > 1 means it has an ID after #)
        if (href && href.length > 1 && href !== '#') {
          try {
            const targetElement = document.querySelector(href);
            if (targetElement) {
              targetElement.scrollIntoView({
                behavior: 'smooth'
              });
            }
          } catch (error) {
            console.warn(`Invalid selector prevented: ${href}`);
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="min-h-screen bg-vescavia-light dark:bg-vescavia-black font-sans text-vescavia-dark-text dark:text-vescavia-white selection:bg-vescavia-purple selection:text-white transition-colors duration-300">
      {/* Custom Cursor Trail */}
      <CursorTrail />

      {/* Cinematic Noise Overlay */}
      <div
        className="fixed inset-0 z-50 pointer-events-none opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none z-0 grid-bg opacity-10 dark:opacity-20" />

      <div className="relative z-10 flex flex-col">
        <Header />
        <main className="flex-grow">
          {/* Reordered for better UX Flow */}
          <Hero />

          <React.Suspense fallback={<div className="h-[50vh] flex items-center justify-center"><div className="w-8 h-8 border-2 border-eccentric-blue rounded-full animate-spin border-t-transparent"></div></div>}>
            <Reels />         {/* Work/Portfolio first - high impact */}
            <Solutions />     {/* Services - What we do */}
            <Process />       {/* Process - How we do it */}
            <About />         {/* About - Who we are */}
            <CaseStudies />   {/* Results - Proof */}
            <Contact />       {/* Contact - CTA */}
            <Footer />
          </React.Suspense>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;