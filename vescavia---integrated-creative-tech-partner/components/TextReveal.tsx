import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  gradient?: boolean;
}

const TextReveal: React.FC<TextRevealProps> = ({ text, className = "", delay = 0, gradient = false }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay * i }, // Increased from 0.03
    }),
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: `50%`, // Reduced from 110%
      filter: 'blur(4px)', // Reduced from blur(10px)
    },
    visible: {
      opacity: 1,
      y: `0%`,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5, // Simpler timing instead of spring
        ease: [0.25, 0.1, 0.25, 1], // Ease-out curve
      },
    },
  };

  return (
    <motion.h2
      ref={ref}
      style={{ display: "flex", flexWrap: "wrap", overflow: "hidden" }}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {text.split(" ").map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className={`inline-block whitespace-nowrap mr-[0.25em] ${gradient ? 'text-transparent bg-clip-text bg-gradient-to-r from-eccentric-blue via-vescavia-purple to-eccentric-blue bg-300% animate-shine' : ''}`}
        >
          {word}
        </motion.span>
      ))}
    </motion.h2>
  );
};

export default TextReveal;