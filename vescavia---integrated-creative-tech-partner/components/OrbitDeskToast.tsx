import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { SectionId } from '../types';
import { orbitDesk } from '../content/orbitdesk';

const STORAGE_KEY = 'vescavia-orbitdesk-toast-dismissed';
const SHOW_AFTER_MS = 2800;

const readDismissed = (): boolean => {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
};

/**
 * One-time, non-blocking announcement for first-time visitors. It never covers the page,
 * can be dismissed, and stays dismissed on later visits. Compact on phones so it never
 * hides the hero call-to-action.
 */
const OrbitDeskToast: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (readDismissed()) return;
    const timer = window.setTimeout(() => setVisible(true), SHOW_AFTER_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* non-fatal: the toast may reappear next visit */
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          role="region"
          aria-label={`${orbitDesk.name} announcement`}
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="glass glass-overlay fixed bottom-3 left-3 right-3 z-[55] rounded-3xl p-3.5 shadow-2xl sm:bottom-6 sm:left-auto sm:right-6 sm:w-[22rem] sm:p-4"
        >
          <button
            type="button"
            onClick={dismiss}
            aria-label={`Dismiss ${orbitDesk.name} announcement`}
            className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-black/5 hover:text-black dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <X size={16} />
          </button>

          {/* On phones the whole message is the link; on larger screens a button sits below */}
          <a
            href={`#${SectionId.ORBITDESK}`}
            onClick={dismiss}
            className="flex items-center gap-3 pr-9 sm:items-start"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-2 shadow-glow">
              <img
                src="/Logo.png"
                alt=""
                width={22}
                height={22}
                className="h-[22px] w-[22px] object-contain logo-on-accent"
              />
            </span>
            <span className="min-w-0">
              <span className="eyebrow block !text-[10px] text-accent-text">
                {orbitDesk.status}
              </span>
              <span className="mt-0.5 flex items-center gap-1.5 text-[15px] font-semibold tracking-tight text-black dark:text-white sm:text-base">
                {orbitDesk.name} is on its way
                <ArrowRight size={14} aria-hidden="true" className="shrink-0 sm:hidden" />
              </span>
              <span className="mt-1 hidden text-sm leading-relaxed text-gray-600 dark:text-gray-400 sm:block">
                {orbitDesk.tagline} Be first to know when we launch.
              </span>
            </span>
          </a>

          <a
            href={`#${SectionId.ORBITDESK}`}
            onClick={dismiss}
            className="btn btn-primary mt-4 hidden w-full !py-3 sm:inline-flex"
          >
            See what&apos;s coming <ArrowRight size={15} aria-hidden="true" />
          </a>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default OrbitDeskToast;
