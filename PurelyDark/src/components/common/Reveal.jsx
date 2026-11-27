import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

/* Scroll-triggered reveal variants.
   variant: up | down | fade | left | right | scale | zoom | blur */
const VARIANTS = {
  up: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  down: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  left: { hidden: { opacity: 0, x: -50 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 50 }, show: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.92 }, show: { opacity: 1, scale: 1 } },
  zoom: { hidden: { opacity: 0, scale: 1.08 }, show: { opacity: 1, scale: 1 } },
  blur: {
    hidden: { opacity: 0, filter: "blur(14px)" },
    show: { opacity: 1, filter: "blur(0px)" },
  },
};

/* When the user prefers reduced motion we keep content fully visible and skip
   all movement — this also guarantees content is never trapped hidden. */
const STATIC = { hidden: { opacity: 1 }, show: { opacity: 1 } };

export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  duration = 0.7,
  className = "",
  once = true,
  margin = "-80px",
  as: Tag = motion.div,
}) {
  const reduce = useReducedMotion();
  const v = reduce ? STATIC : VARIANTS[variant] || VARIANTS.up;
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin }}
      transition={{
        duration: reduce ? 0 : duration,
        delay: reduce ? 0 : delay,
        ease: EASE,
      }}
      variants={v}
    >
      {children}
    </Tag>
  );
}

/* Staggered container for grids / lists. */
export function StaggerGroup({ children, className = "", stagger = 0.08, delayChildren = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: reduce ? 0 : stagger,
            delayChildren: reduce ? 0 : delayChildren,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "", variant = "up" }) {
  const reduce = useReducedMotion();
  const v = reduce ? STATIC : VARIANTS[variant] || VARIANTS.up;
  return (
    <motion.div
      className={className}
      variants={v}
      transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
