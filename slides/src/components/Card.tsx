import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Card({ children, className = '', delay = 0 }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: false, amount: 0.3 }}
      className={`rounded-2xl border border-white/10 bg-card/90 backdrop-blur-md p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}
