import React from 'react';

export interface OrbitSatellite {
  /** Position on the ring in degrees (0 = top, clockwise). */
  angle: number;
  node: React.ReactNode;
}

export interface OrbitRing {
  /** Distance from the container edge (CSS length or %). Larger inset = smaller ring. */
  inset: string;
  /** Seconds per full revolution. */
  duration: number;
  reverse?: boolean;
  dashed?: boolean;
  satellites?: OrbitSatellite[];
}

interface OrbitRingsProps {
  rings: OrbitRing[];
  className?: string;
  /** Rendered at the centre of the system (the "sun"). */
  children?: React.ReactNode;
}

/**
 * Concentric rotating rings with satellites that counter-rotate so their content stays upright.
 * Purely decorative, so it is hidden from assistive tech. Motion is disabled globally under
 * `prefers-reduced-motion` (see index.css).
 */
export const OrbitRings: React.FC<OrbitRingsProps> = ({ rings, className = '', children }) => (
  <div className={`relative aspect-square ${className}`} aria-hidden="true">
    {rings.map((ring, i) => (
      <div
        key={i}
        className={`orbit-ring ${ring.reverse ? 'orbit-ring--reverse' : ''} absolute rounded-full border border-black/[0.09] dark:border-white/[0.1] ${ring.dashed ? 'border-dashed' : ''}`}
        style={{ inset: ring.inset, ['--orbit-duration' as string]: `${ring.duration}s` } as React.CSSProperties}
      >
        {ring.satellites?.map((sat, j) => (
          <div key={j} className="absolute inset-0" style={{ transform: `rotate(${sat.angle}deg)` }}>
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
              <div style={{ transform: `rotate(${-sat.angle}deg)` }}>
                <div className={`orbit-counter ${ring.reverse ? 'orbit-counter--reverse' : ''}`}>{sat.node}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    ))}
    {children}
  </div>
);

export default OrbitRings;
