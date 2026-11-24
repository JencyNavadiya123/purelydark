import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, X } from "lucide-react";
import { useToast } from "../../context/ToastContext";

export default function ToastContainer() {
  const { toasts, remove } = useToast();
  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[120] flex w-[min(92vw,360px)] flex-col gap-3">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.9 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glass pointer-events-auto flex items-center gap-3 rounded-xl px-4 py-3 shadow-soft"
          >
            {t.type === "info" ? (
              <Info size={18} className="shrink-0 text-gold" />
            ) : (
              <CheckCircle2 size={18} className="shrink-0 text-gold" />
            )}
            <p className="flex-1 text-sm text-cream">{t.message}</p>
            <button
              onClick={() => remove(t.id)}
              className="text-cream/50 transition-colors hover:text-cream"
              aria-label="Dismiss"
            >
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
