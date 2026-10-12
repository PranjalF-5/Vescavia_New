import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  gradient?: boolean;
  /** Element to render. Use "span" when nested inside a heading you control. */
  as?: 'h2' | 'span';
}

const container: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: delay },
  }),
};

const child: Variants = {
  hidden: { opacity: 0, y: '50%', filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: '0%',
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const TextReveal: React.FC<TextRevealProps> = ({ text, className = '', delay = 0, gradient = false, as = 'h2' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const Component = as === 'span' ? motion.span : motion.h2;

  return (
    <Component
      ref={ref}
      style={{ display: 'flex', flexWrap: 'wrap', overflow: 'hidden' }}
      variants={container}
      custom={delay}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {text.split(' ').map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className={`mr-[0.25em] inline-block whitespace-nowrap ${
            gradient
              ? 'animate-shine bg-gradient-to-r from-accent-2 via-accent to-accent-2 bg-[length:300%_300%] bg-clip-text text-transparent'
              : ''
          }`}
        >
          {word}
        </motion.span>
      ))}
    </Component>
  );
};

export default TextReveal;
