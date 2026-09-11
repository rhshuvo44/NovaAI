import type { Variants, Transition } from "framer-motion";

export const defaultTransition: Transition = {
  duration: 0.4,
  ease: [0.25, 0.1, 0.25, 1],
};

export const springTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 24,
};

export const entrance: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { ...defaultTransition, delay },
  }),
};

export const entranceSmall: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { ...defaultTransition, delay },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { ...defaultTransition, delay },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { ...defaultTransition, delay },
  }),
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { ...defaultTransition, delay },
  }),
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

export const floatKeyframes: { y: number[] } = {
  y: [0, -8, 0],
};

export const floatTransition = {
  duration: 4,
  repeat: Infinity,
  ease: "easeInOut" as const,
};

export type FloatKeyframes = typeof floatKeyframes;
