import { useEffect, useRef } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";

/* Desktop-only custom cursor (dot + trailing ring). */
export default function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const isDesktop = useMediaQuery("(hover: hover) and (pointer: fine)");

  useEffect(() => {
    if (!isDesktop) return;
    let rx = 0, ry = 0, mx = 0, my = 0, raf;

    const move = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
      }
      const t = e.target;
      const interactive = t.closest("a, button, [role='button'], input, .cursor-pointer");
      ring.current?.classList.toggle("is-active", !!interactive);
    };
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ring.current) {
        const s = ring.current.classList.contains("is-active") ? 30 : 19;
        ring.current.style.transform = `translate(${rx - s}px, ${ry - s}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;
  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden />
      <div ref={ring} className="cursor-ring" aria-hidden />
    </>
  );
}
