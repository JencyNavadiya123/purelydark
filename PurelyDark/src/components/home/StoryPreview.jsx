import { Link } from "react-router-dom";
import { ArrowRight, Quote } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { ScrollZoom } from "../common/Parallax";
import { img } from "../../utils/assets";

const EASE = [0.22, 1, 0.36, 1];

const STATS = [
  { v: "1994", l: "Est. in Paris" },
  { v: "15", l: "Single Origins" },
  { v: "225+", l: "Fine Creations" },
];

export default function StoryPreview() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.14,
        delayChildren: reduce ? 0 : 0.1,
      },
    },
  };
  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.7, ease: EASE } },
  };
  const media = {
    hidden: { opacity: 0, scale: reduce ? 1 : 0.94 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.9, ease: EASE, delay: reduce ? 0 : 0.15 },
    },
  };

  return (
    <section className="section relative overflow-hidden bg-cocoa/25">
      {/* ambient warmth */}
      <div className="pointer-events-none absolute inset-0 bg-radial-glow opacity-60" />
      <div className="pointer-events-none absolute -left-[12%] top-1/4 h-[45vh] w-[45vw] rounded-full bg-[radial-gradient(circle,rgba(198,154,82,0.1),transparent_70%)]" />

      <div className="container-luxe relative grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        {/* ---------- Text column (reveals line by line) ---------- */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-110px" }}
          className="order-1 min-w-0 lg:col-span-6"
        >
          <motion.span variants={item} className="eyebrow">
            <span className="gold-rule" /> Our Story
          </motion.span>

          <motion.h2 variants={item} className="heading-lg mt-5">
            Three decades devoted to the{" "}
            <span className="text-gold-grad">darkest art</span>
          </motion.h2>

          <motion.p variants={item} className="lede mt-5 max-w-xl">
            What began in a small atelier in 1994 has become a maison celebrated
            across the world. Our philosophy has never changed: let the cocoa
            speak. Honest chocolate, crafted slowly, with reverence for the bean
            and the hands that grow it.
          </motion.p>

          {/* Stat strip */}
          <motion.div
            variants={item}
            className="mt-9 grid max-w-xl grid-cols-3 gap-4 border-y border-gold/15 py-6"
          >
            {STATS.map((s) => (
              <div key={s.l} className="min-w-0">
                <div className="stat-num text-2xl leading-none text-gold-grad sm:text-4xl">
                  {s.v}
                </div>
                <div className="mt-2 text-[0.58rem] uppercase tracking-[0.2em] text-cream/55 sm:text-[0.62rem]">
                  {s.l}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Quote card */}
          <motion.blockquote
            variants={item}
            className="animated-gold-border relative mt-8 max-w-xl rounded-2xl bg-espresso/30 p-5 backdrop-blur sm:p-6"
          >
            <Quote
              size={26}
              className="absolute -top-3 left-5 fill-gold/80 text-gold/80"
            />
            <p className="font-display text-lg italic leading-relaxed text-cream/85">
              Chocolate is not a product. It is a conversation between the earth
              and the palate.
            </p>
          </motion.blockquote>

          <motion.div variants={item} className="mt-9 max-w-xl">
            <Link to="/our-story" className="btn-gold flex w-full justify-center">
              Read our story <ArrowRight size={16} />
            </Link>
          </motion.div>
        </motion.div>

        {/* ---------- Image composition ---------- */}
        <motion.div
          variants={media}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-90px" }}
          className="order-2 min-w-0 lg:col-span-6"
        >
          <div className="relative mx-auto max-w-sm sm:max-w-md lg:ml-auto lg:mr-0">
            {/* Primary framed image */}
            <div className="overflow-hidden rounded-[1.75rem] border border-gold/20 shadow-soft">
              <ScrollZoom className="h-full w-full">
                <img
                  src={img(9, 760, 950)}
                  alt="The PurelyDark atelier"
                  loading="lazy"
                  className="aspect-[4/5] h-full w-full object-cover"
                />
              </ScrollZoom>
            </div>

            {/* Offset secondary image */}
            <div className="absolute -bottom-10 -left-8 hidden w-44 overflow-hidden rounded-2xl border-2 border-gold/40 shadow-gold sm:block lg:w-52">
              <ScrollZoom from={1.22} className="h-full w-full">
                <img
                  src={img(13, 440, 440)}
                  alt="Hand-finished chocolates"
                  loading="lazy"
                  className="aspect-square h-full w-full object-cover"
                />
              </ScrollZoom>
            </div>

            {/* Est. 1994 medallion with a continuously rotating dashed ring */}
            <div className="absolute -right-4 -top-5 grid h-24 w-24 place-items-center rounded-full border border-gold/40 bg-espresso/85 text-center shadow-gold backdrop-blur sm:-right-6 sm:h-28 sm:w-28">
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-[5px] rounded-full border-2 border-dashed border-gold/80 [border-spacing:8px]"
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
              <div className="relative">
                <div className="font-serif text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                  Est.
                </div>
                <div className="font-serif text-2xl font-bold leading-none text-gold sm:text-3xl">
                  1994
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
