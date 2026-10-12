import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  /** Optional content aligned to the opposite edge on wide screens. */
  aside?: React.ReactNode;
  className?: string;
}

/** Consistent eyebrow + headline + description block used by every section. */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
  aside,
  className = '',
}) => {
  const centered = align === 'center';
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${centered ? 'items-center text-center md:flex-col md:items-center md:justify-center' : ''} ${className}`}
    >
      <div className={centered ? 'mx-auto max-w-3xl' : 'max-w-3xl'}>
        <div className={`eyebrow mb-5 inline-flex items-center gap-2.5 text-accent-text`}>
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          {eyebrow}
        </div>
        <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-black dark:text-white md:text-6xl">
          {title}
        </h2>
        {description && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-400 md:text-lg">
            {description}
          </p>
        )}
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </motion.div>
  );
};

export default SectionHeader;
