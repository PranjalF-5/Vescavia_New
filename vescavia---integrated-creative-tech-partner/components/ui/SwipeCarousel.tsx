import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useIsMobile } from '../../hooks/useIsMobile';

/** Slide widths below `md`. Kept as literal strings so Tailwind can see every class. */
const SLIDE_WIDTH = {
  /** Roughly one card plus a peek of the next. */
  default: 'max-md:w-[78vw] max-md:max-w-[22rem]',
  /** For content-heavy cards (projects). */
  wide: 'max-md:w-[82vw] max-md:max-w-[26rem]',
} as const;

/** Track bleed: lets cards scroll edge-to-edge past the section's horizontal padding. */
const INSET = {
  5: 'max-md:-mx-5 max-md:px-5 max-md:scroll-pl-5',
  6: 'max-md:-mx-6 max-md:px-6 max-md:scroll-pl-6',
  7: 'max-md:-mx-7 max-md:px-7 max-md:scroll-pl-7',
} as const;

interface SwipeCarouselProps<T> {
  items: readonly T[];
  /** Accessible name for the carousel, e.g. "Services". */
  label: string;
  /** Renders one card. `active` is only ever true on mobile, for the card currently in focus. */
  children: (item: T, index: number, active: boolean) => React.ReactNode;
  /**
   * Layout from `md` up (the track is a plain block there), e.g. `md:grid md:grid-cols-3 md:gap-6`.
   * Mobile-only behaviour lives in this component, so these classes never need resetting.
   */
  className?: string;
  /** Extra classes per slide, e.g. to span columns on desktop. */
  slideClassName?: string | ((index: number) => string);
  slideWidth?: keyof typeof SLIDE_WIDTH;
  /** Horizontal padding (in Tailwind units) of the parent the track should bleed through. */
  inset?: keyof typeof INSET;
  showDots?: boolean;
  /** Called on mobile whenever a different card becomes the focused one. */
  onActiveChange?: (index: number) => void;
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Cards in a horizontal swipe row on phones (scroll-snap, a peek of the next card, page dots)
 * and a normal layout from `md` up, controlled by the `className` the caller passes.
 */
function SwipeCarousel<T>({
  items,
  label,
  children,
  className = '',
  slideClassName,
  slideWidth = 'default',
  inset = 6,
  showDots = true,
  onActiveChange,
}: SwipeCarouselProps<T>) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [active, setActive] = useState(0);

  const onActiveChangeRef = useRef(onActiveChange);
  useEffect(() => {
    onActiveChangeRef.current = onActiveChange;
  }, [onActiveChange]);

  // The card that is most visible inside the track is the active one.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !isMobile || typeof IntersectionObserver === 'undefined') return;

    const slides = Array.from<Element>(track.children);
    const ratios = new Map<Element, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => ratios.set(entry.target, entry.intersectionRatio));

        let best = 0;
        let bestRatio = -1;
        slides.forEach((slide, i) => {
          const ratio = ratios.get(slide) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = i;
          }
        });

        // When several cards are fully visible, the scroll edges decide.
        const max = track.scrollWidth - track.clientWidth;
        if (max > 2 && track.scrollLeft >= max - 2) best = slides.length - 1;

        setActive((prev) => (prev === best ? prev : best));
      },
      { root: track, threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, [isMobile, items.length]);

  useEffect(() => {
    if (isMobile) onActiveChangeRef.current?.(active);
  }, [active, isMobile]);

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    const slide = track?.children[index] as HTMLElement | undefined;
    if (!track || !slide) return;
    const paddingLeft = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    track.scrollTo({
      left: slide.offsetLeft - paddingLeft,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  }, []);

  return (
    <div>
      <div
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        className={`no-scrollbar relative max-md:flex max-md:snap-x max-md:snap-mandatory max-md:gap-4 max-md:overflow-x-auto max-md:overflow-y-hidden max-md:overscroll-x-contain max-md:pb-6 max-md:pt-2 ${INSET[inset]} ${className}`}
      >
        {items.map((item, index) => {
          const extra = typeof slideClassName === 'function' ? slideClassName(index) : slideClassName ?? '';
          return (
            <div
              key={index}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${items.length}`}
              className={`flex snap-start max-md:shrink-0 ${SLIDE_WIDTH[slideWidth]} [&>*]:min-w-0 [&>*]:flex-1 ${extra}`}
            >
              {children(item, index, isMobile && index === active)}
            </div>
          );
        })}
      </div>

      {showDots && items.length > 1 && (
        <div className="-mt-2 flex items-center justify-center md:hidden" role="group" aria-label={`${label} pages`}>
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Show ${index + 1} of ${items.length}`}
              aria-current={index === active ? 'true' : undefined}
              className="flex h-7 w-7 items-center justify-center"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ease-out ${
                  index === active
                    ? 'w-5 bg-gradient-to-r from-accent to-accent-2'
                    : 'w-1.5 bg-black/20 dark:bg-white/25'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SwipeCarousel;
