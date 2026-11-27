import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "./SmoothScroll";

export default function BackToTop() {
  const [show, setShow] = useState(false);
  const lenis = useLenis();
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const toTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          onClick={toTop}
          aria-label="Back to top"
          className="fixed bottom-6 left-6 z-[90] grid h-12 w-12 place-items-center rounded-full border border-gold/40 bg-chocolate/90 text-gold shadow-gold backdrop-blur transition-colors hover:bg-gold hover:text-espresso"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
