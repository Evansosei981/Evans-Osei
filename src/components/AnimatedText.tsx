import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

const Character: React.FC<{
  char: string;
  range: [number, number];
  progress: MotionValue<number>;
}> = ({ char, range, progress }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-0 select-none">{char === ' ' ? '\u00A0' : char}</span>
      <motion.span style={{ opacity }} className="absolute inset-0">
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    </span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const characters = text.split('');
  const total = characters.length;

  return (
    <p
      ref={containerRef}
      className={`text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px] mx-auto ${className}`}
      style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
    >
      {characters.map((char, index) => {
        const start = index / total;
        const end = start + 1 / total;
        return (
          <Character
            key={index}
            char={char}
            range={[start, end]}
            progress={scrollYProgress}
          />
        );
      })}
    </p>
  );
};
