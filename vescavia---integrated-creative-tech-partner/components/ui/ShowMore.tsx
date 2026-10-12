import React, { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ShowMoreProps {
  children: React.ReactNode;
  moreLabel?: string;
  lessLabel?: string;
  /** Classes for the outer wrapper. */
  className?: string;
}

/**
 * Collapses its children behind a "Show more" toggle on phones. From `md` up the content is
 * always visible and the toggle is hidden, so desktop layout is untouched.
 *
 * The height animates with the `grid-template-rows: 0fr -> 1fr` technique, so no measuring is
 * needed. While collapsed the content is `visibility: hidden`, which also keeps it out of the
 * tab order and away from screen readers.
 */
const ShowMore: React.FC<ShowMoreProps> = ({
  children,
  moreLabel = 'Show more',
  lessLabel = 'Show less',
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const regionId = useId();

  return (
    <div className={className}>
      <div
        id={regionId}
        className={`grid transition-[grid-template-rows,opacity,visibility] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:visible md:grid-rows-[1fr] md:opacity-100 ${
          open ? 'visible grid-rows-[1fr] opacity-100' : 'invisible grid-rows-[0fr] opacity-0'
        }`}
      >
        {/* The padding / negative margin pair gives box-shadows room before overflow clips them */}
        <div className="-m-3 min-h-0 overflow-hidden p-3">{children}</div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={regionId}
        className="eyebrow mt-1 inline-flex min-h-[2.75rem] items-center gap-1.5 !text-[11px] text-accent-text md:hidden"
      >
        {open ? lessLabel : moreLabel}
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
    </div>
  );
};

export default ShowMore;
