import { motion } from "framer-motion";

/* Enter-only fade — the new page renders immediately and gently fades in.
   No exit animation and no AnimatePresence "wait", so there is never a
   black/blank screen or delay between pages. */
export default function PageTransition({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.main>
  );
}
