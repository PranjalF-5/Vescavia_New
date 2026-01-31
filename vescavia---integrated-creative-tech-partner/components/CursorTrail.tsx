import React, { useEffect, useRef, useState } from 'react';

const CursorTrail: React.FC = () => {
  const pathRef = useRef<SVGPathElement>(null);
  const pointsRef = useRef<{x: number, y: number}[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timerRef = useRef<number>(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize points
  useEffect(() => {
    if (isMobile) return;
    // Create a trail of 20 points
    const points = [];
    for (let i = 0; i < 20; i++) {
      points.push({ x: 0, y: 0 });
    }
    pointsRef.current = points;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      // If points are at 0,0 (initial state), snap them to mouse instantly
      // to avoid a line flying in from top-left corner
      if (pointsRef.current[0].x === 0 && pointsRef.current[0].y === 0) {
         pointsRef.current.forEach(p => { 
           p.x = e.clientX; 
           p.y = e.clientY; 
         });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    const animate = () => {
      const points = pointsRef.current;
      const mouse = mouseRef.current;

      // The "Head" of the snake follows the mouse with some easing (lag)
      // Increase the factor (0.5) to make it tighter, decrease for looser
      points[0].x += (mouse.x - points[0].x) * 0.5;
      points[0].y += (mouse.y - points[0].y) * 0.5;

      // Each subsequent point follows the previous one
      for (let i = 1; i < points.length; i++) {
        points[i].x += (points[i - 1].x - points[i].x) * 0.4;
        points[i].y += (points[i - 1].y - points[i].y) * 0.4;
      }

      // Construct SVG Path
      if (pathRef.current) {
        // Use quadratic bezier curves for smoothness
        let d = `M ${points[0].x} ${points[0].y}`;
        
        for (let i = 1; i < points.length - 1; i++) {
            const xc = (points[i].x + points[i + 1].x) / 2;
            const yc = (points[i].y + points[i + 1].y) / 2;
            d += ` Q ${points[i].x} ${points[i].y}, ${xc} ${yc}`;
        }
        
        // Connect to the last point
        if (points.length > 1) {
            d += ` T ${points[points.length - 1].x} ${points[points.length - 1].y}`;
        }

        pathRef.current.setAttribute('d', d);
      }
      
      timerRef.current = requestAnimationFrame(animate);
    };

    timerRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(timerRef.current);
    };
  }, [isMobile]);

  // Don't render on mobile
  if (isMobile) return null;

  return (
    <svg 
      className="pointer-events-none fixed inset-0 z-[9999] w-full h-full"
      style={{ mixBlendMode: 'screen' }}
    >
      <defs>
        <filter id="glow-trail" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <path 
        ref={pathRef}
        fill="none"
        stroke="var(--cursor-color)" 
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-60"
        filter="url(#glow-trail)"
      />
    </svg>
  );
};

export default CursorTrail;