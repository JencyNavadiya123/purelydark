import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "../common/SmoothScroll";

/* Reset scroll position on route change (ignores hash links).
   Uses Lenis when active so the reset is handled by the same scroll
   engine (no fighting between native + smooth scroll). */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();
  useEffect(() => {
    if (hash) return;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    }
  }, [pathname, hash, lenis]);
  return null;
}
