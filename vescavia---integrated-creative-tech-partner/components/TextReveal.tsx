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
      transition: { staggerChildren: 0.03, delayChildren: delay * i },
    }),
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: `110%`, // Start slightly below
      rotateX: 40, // Slight rotation for 3D feel
      filter: 'blur(10px)', // Blur in
    },
    visible: {
      opacity: 1,
      y: `0%`,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.h2
      ref={ref}
      style={{ display: "flex", flexWrap: "wrap", overflow: "hidden" }} // Overflow hidden is key for the "curtain" effect
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {text.split(" ").map((word, index) => (
        <span key={index} className="inline-block whitespace-nowrap mr-[0.25em] overflow-hidden relative">
          <span className="inline-block relative">
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={charIndex}
                variants={child}
                className={`inline-block ${gradient ? 'text-transparent bg-clip-text bg-gradient-to-r from-eccentric-blue via-vescavia-purple to-eccentric-blue bg-300% animate-shine' : ''}`}
              >
                {char}
              </motion.span>
            ))}
          </span>
        </span>
      ))}
    </motion.h2>
  );
};

export default TextReveal;