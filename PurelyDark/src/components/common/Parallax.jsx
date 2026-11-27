import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";

/**
 * ScrollReveal — content fades + eases in driven by its own scroll position
 * (not a one-shot trigger). As the element rises through the viewport it
 * reveals progressively, and reverses when scrolled back up.
 */
export function ScrollReveal({
  children,
  className = "",
  from = 0.9,
  to = 0.6,
  scaleFrom = 0.94,
  as: Tag = motion.div,
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${from}`, `start ${to}`],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [scaleFrom, 1]);

  if (reduce) {
    return (
      <Tag ref={ref} className={className}>
        {children}
      </Tag>
    );
  }
  return (
    <Tag ref={ref} className={className} style={{ opacity, scale }}>
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------
   Scroll-linked motion helpers. All effects are GPU-friendly
   (transform / opacity only), smoothed with a spring, and fully
   disabled when the user prefers reduced motion.
   ------------------------------------------------------------------ */

/**
 * Parallax — drifts its children vertically as the section scrolls past.
 * `speed` ~ fraction of the travel (0.1–0.3 feels premium). Negative = reverse.
 */
export function Parallax({
  children,
  speed = 0.15,
  className = "",
  as: Tag = motion.div,
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const range = speed * 100;
  const raw = useTransform(scrollYProgress, [0, 1], [`${-range}%`, `${range}%`]);
  const y = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <Tag ref={ref} className={className} style={reduce ? undefined : { y }}>
      {children}
    </Tag>
  );
}

/**
 * ScrollZoom — subtly scales its children as they move through the viewport.
 * Keep the content inside an `overflow-hidden` wrapper so the scale stays clean.
 */
export function ScrollZoom({
  children,
  from = 1.12,
  to = 1,
  className = "",
  as: Tag = motion.div,
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [from, to]);
  const scale = useSpring(raw, { stiffness: 100, damping: 30, mass: 0.5 });

  return (
    <Tag
      ref={ref}
      className={className}
      style={reduce ? undefined : { scale }}
    >
      {children}
    </Tag>
  );
}

export default Parallax;
