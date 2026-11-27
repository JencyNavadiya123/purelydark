import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/* Lightweight count-up that animates a number from 0 → value on mount.
   GPU-free, cancels cleanly, and respects reduced motion. */
export default function CountUp({
  value,
  decimals = 0,
  duration = 1.6,
  delay = 0,
  className = "",
}) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);
  const rafRef = useRef(0);
  const timeoutRef = useRef(0);

  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      return;
    }
    let startTime = null;
    const tick = (t) => {
      if (startTime === null) startTime = t;
      const progress = Math.min((t - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setDisplay(value * eased);
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
      else setDisplay(value);
    };
    timeoutRef.current = window.setTimeout(() => {
      rafRef.current = requestAnimationFrame(tick);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, [value, decimals, duration, delay, reduce]);

  return <span className={className}>{display.toFixed(decimals)}</span>;
}
