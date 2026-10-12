import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CursorTrail from './components/CursorTrail';
import AmbientBackground from './components/AmbientBackground';
import { ThemeProvider } from './context/ThemeContext';

// Lazy load below-the-fold components for performance
const OrbitDesk = React.lazy(() => import('./components/OrbitDesk'));
const OrbitDeskToast = React.lazy(() => import('./components/OrbitDeskToast'));
// Preview-only colour picker (rendered only when the URL contains ?lab)
const PaletteLab = React.lazy(() => import('./components/PaletteLab'));

const showPaletteLab =
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('lab');
const About = React.lazy(() => import('./components/About'));
const Solutions = React.lazy(() => import('./components/Solutions'));
const Process = React.lazy(() => import('./components/Process'));
const Reels = React.lazy(() => import('./components/Reels'));
const CaseStudies = React.lazy(() => import('./components/CaseStudies'));
const Contact = React.lazy(() => import('./components/Contact'));
const Footer = React.lazy(() => import('./components/Footer'));

const SectionFallback: React.FC = () => (
  <div className="flex h-[50vh] items-center justify-center" role="status" aria-label="Loading">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
  </div>
);

const AppContent: React.FC = () => {
  useEffect(() => {
    // Smooth in-page navigation via event delegation
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      e.preventDefault();

      if (href && href.length > 1) {
        try {
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        } catch {
          // Not a valid selector — ignore rather than throw from a click handler
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-vescavia-light font-sans text-vescavia-dark-text transition-colors duration-300 selection:bg-accent selection:text-on-accent dark:bg-vescavia-black dark:text-vescavia-white">
      <a
        href="#main"
        className="sr-only z-[70] rounded-full bg-black px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <AmbientBackground />
      <CursorTrail />
      <div className="noise-overlay" aria-hidden="true" />

      <div className="relative z-10 flex flex-col">
        <Header />
        <main id="main" className="flex-grow">
          <Hero />

          <React.Suspense fallback={<SectionFallback />}>
            <OrbitDesk /> {/* Flagship product — coming soon */}
            <Reels /> {/* Work / Portfolio */}
            <Solutions /> {/* Services */}
            <Process /> {/* Process */}
            <About /> {/* About */}
            <CaseStudies /> {/* Proof */}
            <Contact /> {/* CTA */}
            <Footer />
          </React.Suspense>
        </main>
      </div>

      <React.Suspense fallback={null}>
        <OrbitDeskToast />
        {showPaletteLab && <PaletteLab />}
      </React.Suspense>
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
