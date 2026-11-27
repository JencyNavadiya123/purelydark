import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Star } from "lucide-react";
import HeroVideo from "../video/HeroVideo";
import CountUp from "../common/CountUp";
import useMediaQuery from "../../hooks/useMediaQuery";

const STATS = [
  { value: "225", suffix: "+", label: "Fine Chocolates" },
  { value: "15", label: "Single Origins" },
  { value: "4.9", star: true, label: "Rated by Connoisseurs" },
];

const fade = {
  hidden: { opacity: 0 },
  show: (i) => ({
    opacity: 1,
    transition: {
      duration: 1,
      delay: 0.35 + i * 0.28, // longer, more deliberate stagger → established feel
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Cinematic background video */}
      <HeroVideo />

      {/* Left/bottom darkening for text contrast — stronger on mobile */}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-espresso/85 via-espresso/45 to-transparent sm:from-espresso/75 sm:via-espresso/25 lg:from-espresso/60 lg:via-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-1/3 bg-gradient-to-t from-espresso/80 to-transparent" />

      {/* Cocoa particle dust */}
      <Particles />

      {/* Copy — padding 70px 7% (matches the page banners) */}
      <div className="relative z-[3] w-full" style={{ padding: "70px 7%" }}>
        <div className="max-w-2xl">
          <motion.span
            custom={0}
            variants={fade}
            initial="hidden"
            animate="show"
            className="eyebrow"
          >
            <span className="gold-rule" /> Maison du Cacao · Est. 1994
          </motion.span>

          <motion.h1
            custom={1}
            variants={fade}
            initial="hidden"
            animate="show"
            className="heading-xl mt-4 sm:mt-5"
          >
            Discover the Art of{" "}
            <span className="animate-sheen">Dark Chocolate</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fade}
            initial="hidden"
            animate="show"
            className="lede mt-5 max-w-lg sm:mt-6"
          >
            Pure Cocoa. Rich Experience. Unforgettable Taste. Single-origin bars,
            slow-conched and crafted in small batches for the devoted palate.
          </motion.p>

          <motion.div
            custom={3}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:gap-4"
          >
            <Link to="/collections" className="btn-gold w-full justify-center sm:w-auto">
              Explore Collection <ArrowRight size={16} />
            </Link>
            <Link to="/shop" className="btn-outline w-full justify-center sm:w-auto">
              Shop Now
            </Link>
          </motion.div>

          <motion.div
            custom={4}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-10 grid grid-cols-3 gap-x-3 gap-y-5 border-t border-white/10 pt-6 sm:mt-14 sm:flex sm:flex-wrap sm:items-center sm:gap-x-10 sm:pt-8"
          >
            {STATS.map((s, i) => (
              <div key={s.label} className="flex items-center gap-6 sm:gap-10">
                {i > 0 && (
                  <span className="hidden h-11 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent sm:block" />
                )}
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="stat-num text-[1.7rem] leading-none text-gold-grad sm:text-[2.6rem]">
                      <CountUp
                        value={parseFloat(s.value)}
                        decimals={s.value.includes(".") ? 1 : 0}
                        delay={1.6 + i * 0.15}
                        duration={1.6}
                      />
                    </span>
                    {s.suffix && (
                      <span className="stat-num text-lg text-gold/70 sm:text-2xl">{s.suffix}</span>
                    )}
                    {s.star && (
                      <Star size={16} className="ml-0.5 -translate-y-0.5 fill-gold text-gold sm:ml-1 sm:-translate-y-1 sm:h-[18px] sm:w-[18px]" />
                    )}
                  </div>
                  <div className="mt-1.5 text-[0.58rem] uppercase tracking-[0.18em] text-cream/55 sm:text-[0.65rem] sm:tracking-[0.22em]">
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll cue — clickable, glides to the next section */}
      <motion.button
        type="button"
        onClick={() => {
          const top = window.innerHeight - 70;
          if (window.__lenis) window.__lenis.scrollTo(top, { duration: 1.3 });
          else window.scrollTo({ top, behavior: "smooth" });
        }}
        aria-label="Scroll to explore"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.8 }}
        className="group absolute bottom-7 left-1/2 z-[4] flex -translate-x-1/2 flex-col items-center text-cream/50 transition-colors hover:text-gold"
      >
        <ChevronDown size={26} className="animate-bounce group-hover:text-gold" />
      </motion.button>
    </section>
  );
}

function Particles() {
  // Fewer particles on small screens for smoother performance
  const isSmall = useMediaQuery("(max-width: 640px)");
  const count = isSmall ? 8 : 18;
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const size = 2 + (i % 4);
        return (
          <span
            key={i}
            className="absolute rounded-full bg-gold/30"
            style={{
              width: size,
              height: size,
              left: `${(i * 53) % 100}%`,
              bottom: `-10px`,
              animation: `drift ${6 + (i % 6)}s linear ${i * 0.6}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}
