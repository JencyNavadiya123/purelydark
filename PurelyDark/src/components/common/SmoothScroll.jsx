import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Lenis from "lenis";

/* ------------------------------------------------------------------
   SmoothScroll — site-wide momentum (inertial) scrolling via Lenis.

   Why: native scrolling jumps pixel-to-pixel, which makes every
   scroll-linked effect (parallax, scroll progress, image zoom) feel
   steppy. Lenis interpolates the scroll position each frame, so the
   whole page — and everything driven by its scroll — glides.

   • Drives the real document scroll, so framer-motion's `useScroll`
     keeps working with zero changes.
   • Fully disabled when the user prefers reduced motion.
   • Exposes the instance through context so route changes / "back to
     top" can scroll smoothly through the same engine.
   ------------------------------------------------------------------ */

const LenisContext = createContext(null);

export function useLenis() {
  return useContext(LenisContext);
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function SmoothScroll({ children }) {
  const [lenis, setLenis] = useState(null);
  const rafRef = useRef(0);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const instance = new Lenis({
      // Premium, slightly weighty feel — long but controlled glide.
      duration: 1.15,
      // Gentle exponential ease-out: fast start, soft settle.
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      // Let touch devices keep their native fling — only smooth the wheel.
      syncTouch: false,
    });

    setLenis(instance);
    // Also expose globally so lightweight callers (scroll cues, body-lock
    // drawers) can pause / resume or scroll without context plumbing.
    window.__lenis = instance;

    const raf = (time) => {
      instance.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafRef.current);
      instance.destroy();
      if (window.__lenis === instance) delete window.__lenis;
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
