import { motion, useReducedMotion } from "framer-motion";

/* Enter-only fade + gentle rise — the new page renders immediately and
   smoothly eases up into place. No exit animation and no AnimatePresence
   "wait", so there is never a black/blank screen or delay between pages.
   Reduced-motion users get an instant, movement-free render. */
export default function PageTransition({ children }) {
  const reduce = useReducedMotion();
  return (
    <motion.main
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0.2 : 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}
