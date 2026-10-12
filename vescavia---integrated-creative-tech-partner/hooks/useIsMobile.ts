import { useSyncExternalStore } from 'react';

/** Matches Tailwind's `md` breakpoint: everything below 768px is "mobile". */
const MOBILE_QUERY = '(max-width: 767.98px)';

const subscribe = (onChange: () => void) => {
  const query = window.matchMedia(MOBILE_QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};

const getSnapshot = () => window.matchMedia(MOBILE_QUERY).matches;
const getServerSnapshot = () => false;

/**
 * True below the `md` breakpoint. Driven by a media-query listener instead of a resize
 * handler, so it only re-renders when the breakpoint is actually crossed.
 */
export const useIsMobile = (): boolean => useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

export default useIsMobile;
