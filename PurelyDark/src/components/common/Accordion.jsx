import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

/* Card-style accordion — each question is its own surface that lifts and
   glows on hover, opens with a warm gold-gradient highlight, and reveals its
   answer with a smooth height spring. Items stagger in on scroll. */
export default function Accordion({ items = [] }) {
  const [open, setOpen] = useState(0);
  const reduce = useReducedMotion();

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <motion.div
            key={i}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
            className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 ease-luxe ${
              isOpen
                ? "border-gold/45 bg-gradient-to-br from-cocoa/80 to-espresso/70 shadow-gold"
                : "border-white/10 bg-espresso/30 hover:-translate-y-0.5 hover:border-gold/35 hover:bg-espresso/55"
            }`}
          >
            {/* Gold accent bar on the active item */}
            <span
              className={`absolute inset-y-0 left-0 w-[3px] origin-top bg-gold-gradient transition-transform duration-500 ${
                isOpen ? "scale-y-100" : "scale-y-0"
              }`}
            />

            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
              aria-expanded={isOpen}
            >
              <span
                className={`font-serif text-sm tabular-nums transition-colors duration-300 ${
                  isOpen ? "text-gold" : "text-gold/40 group-hover:text-gold/70"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 font-serif text-base text-cream sm:text-lg">
                {item.q}
              </span>
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                  isOpen
                    ? "rotate-45 border-gold bg-gold text-espresso"
                    : "border-gold/30 text-gold group-hover:border-gold/60 group-hover:scale-110"
                }`}
              >
                <Plus size={16} />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 pl-14 pr-10 text-sm leading-relaxed text-cream/65 sm:pl-16">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
