import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import testimonials from "../../data/testimonials";
import RatingStars from "./RatingStars";
import SectionHeading from "./SectionHeading";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const t = testimonials[i];

  const go = (d) => {
    setDir(d);
    setI((prev) => (prev + d + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section bg-cocoa/30">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Kind Words"
          title="Loved by connoisseurs worldwide"
          className="mb-14"
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <Quote size={56} className="mx-auto mb-6 text-gold/30" />
          <div className="min-h-[200px]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.blockquote
                key={t.id}
                initial={{ opacity: 0, x: dir * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -50 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-display text-2xl leading-relaxed text-cream sm:text-3xl">
                  “{t.quote}”
                </p>
                <footer className="mt-8 flex flex-col items-center gap-2">
                  <RatingStars rating={t.rating} size={16} />
                  <cite className="not-italic">
                    <span className="block font-serif text-lg text-gold">{t.name}</span>
                    <span className="text-sm text-cream/50">{t.role}</span>
                  </cite>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={() => go(-1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-cream/70 transition-colors hover:border-gold hover:text-gold"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDir(idx > i ? 1 : -1);
                    setI(idx);
                  }}
                  aria-label={`Testimonial ${idx + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    idx === i ? "w-6 bg-gold" : "w-2 bg-cream/25"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-cream/70 transition-colors hover:border-gold hover:text-gold"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
