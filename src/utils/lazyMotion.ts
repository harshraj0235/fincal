// Lazy load Framer Motion to reduce initial bundle
import { LazyMotion, domAnimation, m } from 'framer-motion';

// Export motion components for use
export { LazyMotion, domAnimation, m };

// Reduced animation presets for better performance
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.3 }
};

// Disable animations on slow devices
export const shouldReduceMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Simple animation wrapper
export const AnimatePresence = ({ children }: any) => {
  if (shouldReduceMotion()) return children;
  return children;
};

