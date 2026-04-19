'use client';

import { motion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: 'slide' | 'scale';
};

export function AnimatedReveal({ children, className, delay = 0, variant = 'slide' }: Props) {
  const initial = variant === 'scale'
    ? { opacity: 0, scale: 0.95 }
    : { opacity: 0, y: 20 };

  const animate = variant === 'scale'
    ? { opacity: 1, scale: 1 }
    : { opacity: 1, y: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
