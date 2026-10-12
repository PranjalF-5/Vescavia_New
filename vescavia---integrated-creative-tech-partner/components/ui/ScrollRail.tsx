import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ScrollRailProps {
  /** The horizontally scrolling element this rail controls. */
  targetRef: React.RefObject<HTMLElement | null>;
  /** Accessible name, e.g. "Motion gallery". */
  label: string;
  className?: string;
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * A visible scrollbar for a hidden-scrollbar carousel: click the track to jump, drag the
 * thumb to scrub, or use the previous/next buttons. The thumb is also a keyboard-operable
 * `scrollbar` (arrow keys, Home, End).
 */
const ScrollRail: React.FC<ScrollRailProps> = ({ targetRef, label, className = '' }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ startX: number; startScroll: number } | null>(null);
  const [thumb, setThumb] = useState({ size: 1, offset: 0 });
  const [edge, setEdge] = useState({ atStart: true, atEnd: true });
  const [dragging, setDragging] = useState(false);

  const measure = useCallback(() => {
    const el = targetRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const size = el.scrollWidth > 0 ? Math.min(1, el.clientWidth / el.scrollWidth) : 1;
    const offset = max > 0 ? (el.scrollLeft / max) * (1 - size) : 0;
    setThumb((prev) =>
      Math.abs(prev.size - size) < 0.002 && Math.abs(prev.offset - offset) < 0.002 ? prev : { size, offset },
    );
    setEdge({ atStart: el.scrollLeft <= 2, atEnd: max <= 2 || el.scrollLeft >= max - 2 });
  }, [targetRef]);

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;
    measure();
    el.addEventListener('scroll', measure, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    if (el.firstElementChild) observer.observe(el.firstElementChild);
    // Media and lazy content can change the scroll width after first paint.
    const settle = window.setTimeout(measure, 600);
    return () => {
      el.removeEventListener('scroll', measure);
      observer.disconnect();
      window.clearTimeout(settle);
    };
  }, [targetRef, measure]);

  const scrollByPage = (direction: 1 | -1) => {
    const el = targetRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction * el.clientWidth * 0.8,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  };

  const scrollToFraction = (fraction: number, smooth: boolean) => {
    const el = targetRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({
      left: Math.max(0, Math.min(max, fraction * max)),
      behavior: smooth && !prefersReducedMotion() ? 'smooth' : 'auto',
    });
  };

  // Click on the empty part of the track: centre the thumb on the pointer.
  const onTrackPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const travel = 1 - thumb.size;
    if (travel <= 0) return;
    const fraction = ((e.clientX - rect.left) / rect.width - thumb.size / 2) / travel;
    scrollToFraction(fraction, true);
  };

  const onThumbPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = targetRef.current;
    if (!el) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { startX: e.clientX, startScroll: el.scrollLeft };
    setDragging(true);
    el.style.scrollSnapType = 'none'; // free scrubbing; snapping resumes on release
  };

  const onThumbPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = targetRef.current;
    const track = trackRef.current;
    if (!drag.current || !el || !track) return;
    const travelPx = track.clientWidth * (1 - thumb.size);
    if (travelPx <= 0) return;
    const max = el.scrollWidth - el.clientWidth;
    const delta = ((e.clientX - drag.current.startX) / travelPx) * max;
    el.scrollLeft = drag.current.startScroll + delta;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    drag.current = null;
    setDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    const el = targetRef.current;
    if (el) el.style.scrollSnapType = '';
  };

  const onThumbKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const el = targetRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (e.key === 'ArrowRight') el.scrollBy({ left: 160 });
    else if (e.key === 'ArrowLeft') el.scrollBy({ left: -160 });
    else if (e.key === 'Home') el.scrollTo({ left: 0 });
    else if (e.key === 'End') el.scrollTo({ left: max });
    else return;
    e.preventDefault();
  };

  const scrollable = thumb.size < 0.999;
  const valueNow = Math.round(
    thumb.size >= 1 ? 0 : (thumb.offset / (1 - thumb.size)) * 100,
  );

  return (
    <div className={`flex items-center gap-3 sm:gap-4 ${className}`}>
      <button
        type="button"
        onClick={() => scrollByPage(-1)}
        disabled={edge.atStart}
        aria-label={`Scroll ${label} left`}
        className="neo flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-black transition-opacity disabled:cursor-not-allowed disabled:opacity-35 dark:text-white"
      >
        <ChevronLeft size={18} aria-hidden="true" />
      </button>

      {/* Larger invisible hit area around a slim visual track */}
      <div
        ref={trackRef}
        onPointerDown={onTrackPointerDown}
        className={`relative flex h-9 flex-1 cursor-pointer items-center ${scrollable ? '' : 'pointer-events-none opacity-40'}`}
      >
        <div className="neo-inset pointer-events-none absolute inset-x-0 h-2.5 rounded-full" aria-hidden="true" />
        <div
          role="scrollbar"
          aria-orientation="horizontal"
          aria-label={`${label} scroll position`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={valueNow}
          tabIndex={0}
          onPointerDown={onThumbPointerDown}
          onPointerMove={onThumbPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={onThumbKeyDown}
          style={{
            width: `${thumb.size * 100}%`,
            left: `${thumb.offset * 100}%`,
            touchAction: 'none',
          }}
          className={`absolute h-3.5 min-w-[2.5rem] rounded-full bg-gradient-to-r from-accent to-accent-2 shadow-glow ${
            dragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        />
      </div>

      <button
        type="button"
        onClick={() => scrollByPage(1)}
        disabled={edge.atEnd}
        aria-label={`Scroll ${label} right`}
        className="neo flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-black transition-opacity disabled:cursor-not-allowed disabled:opacity-35 dark:text-white"
      >
        <ChevronRight size={18} aria-hidden="true" />
      </button>
    </div>
  );
};

export default ScrollRail;
