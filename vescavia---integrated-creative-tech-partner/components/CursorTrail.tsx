import React, { useEffect, useRef, useState } from 'react';

const POINT_COUNT = 20;
const SETTLE_EPSILON = 0.15;

/**
 * Soft glowing cursor trail for pointer devices.
 * The animation loop only runs while the trail is catching up with the cursor, so an idle
 * pointer costs nothing. Disabled on touch screens and under `prefers-reduced-motion`.
 */
const CursorTrail: React.FC = () => {
  const pathRef = useRef<SVGPathElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const check = () => {
      const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setEnabled(finePointer && !reduced && window.innerWidth >= 1024);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const points = Array.from({ length: POINT_COUNT }, () => ({ x: 0, y: 0 }));
    const mouse = { x: 0, y: 0 };
    let initialised = false;
    let frame = 0;
    let running = false;

    const draw = () => {
      const path = pathRef.current;
      if (!path) return;
      let d = `M ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        d += ` Q ${points[i].x} ${points[i].y}, ${xc} ${yc}`;
      }
      d += ` T ${points[points.length - 1].x} ${points[points.length - 1].y}`;
      path.setAttribute('d', d);
    };

    const tick = () => {
      // Head eases toward the cursor; each point eases toward the one before it.
      points[0].x += (mouse.x - points[0].x) * 0.5;
      points[0].y += (mouse.y - points[0].y) * 0.5;
      let maxDelta = Math.abs(mouse.x - points[0].x) + Math.abs(mouse.y - points[0].y);

      for (let i = 1; i < points.length; i++) {
        const dx = points[i - 1].x - points[i].x;
        const dy = points[i - 1].y - points[i].y;
        points[i].x += dx * 0.4;
        points[i].y += dy * 0.4;
        maxDelta = Math.max(maxDelta, Math.abs(dx) + Math.abs(dy));
      }

      draw();

      if (maxDelta > SETTLE_EPSILON) {
        frame = requestAnimationFrame(tick);
      } else {
        running = false; // trail has caught up: stop until the pointer moves again
      }
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // First movement: snap every point to the cursor so no line flies in from the corner
      if (!initialised) {
        initialised = true;
        points.forEach((p) => {
          p.x = e.clientX;
          p.y = e.clientY;
        });
      }

      if (!running) {
        running = true;
        frame = requestAnimationFrame(tick);
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <svg aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999] h-full w-full">
      <defs>
        <filter id="glow-trail" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        ref={pathRef}
        fill="none"
        stroke="var(--cursor-color)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-50"
        filter="url(#glow-trail)"
      />
    </svg>
  );
};

export default CursorTrail;
