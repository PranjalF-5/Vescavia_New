import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const SPOTLIGHT_SIZE = 720;

/**
 * Page-wide backdrop that every glass surface refracts: layered aurora gradients, a faint
 * grid, and (on pointer devices) a soft spotlight that follows the cursor.
 *
 * Everything animates with transforms only, and the spotlight is a translated element rather
 * than a re-painted full-screen gradient, so scrolling stays cheap.
 */
const AmbientBackground: React.FC = () => {
  const [hasPointer, setHasPointer] = useState(false);
  const x = useMotionValue(-SPOTLIGHT_SIZE);
  const y = useMotionValue(-SPOTLIGHT_SIZE);
  const springX = useSpring(x, { stiffness: 90, damping: 24, mass: 0.7 });
  const springY = useSpring(y, { stiffness: 90, damping: 24, mass: 0.7 });

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    setHasPointer(query.matches);
    const onChange = (e: MediaQueryListEvent) => setHasPointer(e.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!hasPointer) return;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX - SPOTLIGHT_SIZE / 2);
      y.set(e.clientY - SPOTLIGHT_SIZE / 2);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [hasPointer, x, y]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="ambient-base absolute inset-0" />

      <div
        className="ambient-blob ambient-blob--a animate-aurora-a -left-[12%] -top-[22%] h-[75vh] w-[75vh] opacity-70 dark:opacity-100"
      />
      <div
        className="ambient-blob ambient-blob--b animate-aurora-b -right-[14%] top-[28%] h-[65vh] w-[65vh] opacity-70 dark:opacity-100"
      />

      <div className="grid-bg absolute inset-0" />

      {hasPointer && (
        <motion.div
          className="ambient-spot absolute left-0 top-0 rounded-full will-change-transform"
          style={{ x: springX, y: springY, width: SPOTLIGHT_SIZE, height: SPOTLIGHT_SIZE }}
        />
      )}
    </div>
  );
};

export default AmbientBackground;
