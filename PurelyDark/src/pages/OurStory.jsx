import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Leaf, Target, Sparkles, Quote } from "lucide-react";
import Reveal from "../components/common/Reveal";
import SectionHeading from "../components/common/SectionHeading";
import StoryVideo from "../components/video/StoryVideo";
import Newsletter from "../components/common/Newsletter";
import { img, VIDEOS } from "../utils/assets";

/* Editorial alternating image/text block with a ghost index number */
function StoryBlock({ index, eyebrow, title, text, image, reverse }) {
  return (
    <section className="section-tight">
      <div className="container-luxe grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Image */}
        <Reveal
          variant={reverse ? "right" : "left"}
          className={`group ${reverse ? "lg:order-2" : ""}`}
        >
          <div className="glow-hover relative overflow-hidden rounded-3xl border border-gold/15">
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1.2s] ease-luxe group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/40 to-transparent" />
          </div>
        </Reveal>

        {/* Text */}
        <Reveal
          variant={reverse ? "left" : "right"}
          delay={0.12}
          className={`relative ${reverse ? "lg:order-1" : ""}`}
        >
          {/* Ghost number */}
          <span
            aria-hidden
            className="pointer-events-none absolute -top-14 -left-2 select-none font-serif text-[7rem] font-extrabold leading-none text-gold/[0.06] sm:-top-16 sm:text-[9rem]"
          >
            {String(index).padStart(2, "0")}
          </span>
          <span className="eyebrow relative">
            <span className="gold-rule" /> {String(index).padStart(2, "0")} · {eyebrow}
          </span>
          <h2 className="heading-md relative mt-3">{title}</h2>
          <p className="lede relative mt-4">{text}</p>
        </Reveal>
      </div>
    </section>
  );
}

const blocks = [
  { eyebrow: "Our Beginning", title: "A small atelier, a large dream", text: "In 1994, in a modest atelier scented with roasting cocoa, our founder set out to prove that dark chocolate could be an art form. One stone grinder, a handful of beans, and an uncompromising standard.", seed: 0 },
  { eyebrow: "The Inspiration", title: "The inspiration behind our brand", text: "A journey through the cocoa plantations of Madagascar changed everything. There, chocolate was not a commodity but a culture — and we vowed to honour it in every bar we make.", seed: 2 },
  { eyebrow: "Our Passion", title: "Our passion for dark chocolate", text: "We believe the darkest chocolate tells the truest story of the cocoa. No milk to soften it, no excess sugar to mask it — only the pure, complex voice of the bean.", seed: 4 },
  { eyebrow: "Bean to Bar", title: "From cocoa bean to chocolate", text: "Every bar travels the same deliberate path: harvest, ferment, dry, roast, grind, conche, temper, mould. We control each step, because greatness lives in the details.", seed: 5 },
  { eyebrow: "Sourcing", title: "Selecting premium cocoa beans", text: "We taste hundreds of lots to select a few. Our relationships with growers span decades, built on fair prices and a shared devotion to quality.", seed: 9 },
  { eyebrow: "Quality", title: "Our quality promise", text: "Every batch is tasted, tested and judged against a single question: is this the finest chocolate we can make today? If not, it does not leave our kitchen.", seed: 11 },
];

const timeline = [
  ["1994", "The atelier opens with a single stone grinder."],
  ["2001", "First single-origin Madagascar bar released."],
  ["2009", "Awarded Gold at the International Chocolate Awards."],
  ["2015", "Direct-trade partnerships established across 15 origins."],
  ["2020", "Carbon-neutral production achieved."],
  ["Today", "225+ fine chocolates, shipped worldwide."],
];

const values = [
  { Icon: Leaf, title: "Sustainability & Ethical Sourcing", text: "Direct-trade partnerships, fair prices, and carbon-neutral production. We protect the land that feeds our craft." },
  { Icon: Target, title: "Our Mission & Vision", text: "To elevate dark chocolate to the status it deserves — and to make every bar a reason to pause and savour." },
  { Icon: Sparkles, title: "Our Philosophy", text: "Let the cocoa speak. We add nothing that hides it and remove nothing that defines it." },
];

/* Scroll-animated vertical timeline — the gold spine draws itself as you
   scroll, and each node pops in with a glow. */
function Timeline({ items }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 22,
    mass: 0.5,
  });

  return (
    <div ref={ref} className="relative mx-auto max-w-3xl">
      {/* Spine: faint static track + animated gold fill + travelling glow */}
      <div className="absolute left-4 top-0 h-full w-px overflow-hidden sm:left-1/2 sm:-translate-x-1/2">
        <div className="absolute inset-0 bg-white/10" />
        {/* Scroll-linked gold fill with a gentle pulsing glow */}
        <motion.div
          style={{ scaleY: fill }}
          animate={{
            boxShadow: [
              "0 0 8px rgba(198,154,82,0.4)",
              "0 0 18px rgba(198,154,82,0.75)",
              "0 0 8px rgba(198,154,82,0.4)",
            ],
          }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 origin-top bg-gradient-to-b from-gold via-gold/80 to-gold/40"
        />
        {/* Comet: a bright glow that continuously travels down the line */}
        <motion.div
          initial={{ top: "-12%" }}
          animate={{ top: "112%" }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 0.6,
          }}
          className="absolute left-0 h-20 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-cream to-transparent shadow-[0_0_16px_4px_rgba(247,239,224,0.55)]"
        />
      </div>

      {items.map(([year, text], i) => {
        const right = i % 2 === 1;
        return (
          <Reveal
            key={year}
            variant={right ? "right" : "left"}
            delay={i * 0.08}
            className={`relative mb-12 pl-12 last:mb-0 sm:w-1/2 sm:pl-0 ${
              right ? "sm:ml-auto sm:pl-12" : "sm:pr-12 sm:text-right"
            }`}
          >
            {/* Node wrapper keeps responsive position; inner dot animates */}
            <span
              className={`absolute top-2 -translate-x-1/2 ${
                right
                  ? "left-4 sm:left-0"
                  : "left-4 sm:left-auto sm:right-0 sm:translate-x-1/2"
              }`}
            >
              <span className="relative grid h-3.5 w-3.5 place-items-center">
                {/* Expanding beacon ring */}
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full border border-gold"
                  animate={{ scale: [1, 2.6], opacity: [0.6, 0] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: i * 0.25,
                  }}
                />
                {/* Core dot */}
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                  className="relative block h-3.5 w-3.5 rounded-full bg-gold ring-4 ring-gold/15 shadow-[0_0_14px_rgba(198,154,82,0.7)]"
                />
              </span>
            </span>
            <div className="font-serif text-2xl text-gold sm:text-3xl">{year}</div>
            <p className="mt-1.5 text-sm leading-relaxed text-cream/70">{text}</p>
          </Reveal>
        );
      })}
    </div>
  );
}

export default function OurStory() {
  return (
    <>
      {/* ---------------- Immersive story video ---------------- */}
      <StoryVideo
        video={VIDEOS.beans}
        eyebrow="The Journey of the Bean"
        title="It begins in the soil"
        text="Follow a single cocoa pod from a sun-dappled plantation to the heart of our kitchen."
        align="center"
      />

      {/* ---------------- Editorial story blocks ---------------- */}
      {blocks.map((b, i) => (
        <StoryBlock
          key={i}
          index={i + 1}
          {...b}
          image={img(b.seed, 1000, 1100)}
          reverse={i % 2 === 1}
        />
      ))}

      {/* ---------------- Founder's manifesto ---------------- */}
      <section
        className="section relative overflow-hidden"
        style={{
          background:
            "radial-gradient(130% 100% at 15% 0%, #4a3225 0%, #2e1f17 42%, #1c120d 100%)",
        }}
      >
        {/* Top & bottom hairlines for a framed, editorial feel */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        {/* Layered ambient gold glows */}
        <div className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-gold/15 blur-[130px]" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-caramel/10 blur-[120px]" />

        {/* Faint oversized decorative quote mark */}
        <Quote
          size={340}
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-16 hidden rotate-180 fill-gold/[0.04] text-gold/[0.04] lg:block"
        />

        <div className="container-luxe relative z-[2]">
          <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            {/* Portrait */}
            <Reveal variant="left" className="group">
              <div className="glow-hover relative mx-auto max-w-sm overflow-hidden rounded-3xl border border-gold/15">
                <img
                  src={img(3, 900, 1100)}
                  alt="Our founder in the atelier"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-luxe group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/50 to-transparent" />
                <div className="absolute bottom-5 left-6">
                  <div className="font-serif text-lg text-cream">Hélène Mercier</div>
                  <div className="text-xs uppercase tracking-luxe text-gold/80">
                    Founder &amp; Head Chocolatier
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Quote */}
            <Reveal variant="right" delay={0.12}>
              <span className="eyebrow">
                <span className="gold-rule" /> A Word From Our Founder
              </span>
              <Quote
                size={46}
                className="mt-6 fill-gold/70 text-gold/70"
                aria-hidden
              />
              <blockquote className="mt-4 font-display text-2xl font-light italic leading-snug text-cream/90 sm:text-3xl lg:text-[2.1rem]">
                “I never set out to build a brand. I set out to protect a flavour —
                the honest, unmasked voice of the cocoa. Thirty years on, every bar
                we make is still an answer to that single question: have we let the
                bean speak?”
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <span className="gold-rule" />
                <div>
                  <div className="font-serif text-lg text-gold">Hélène Mercier</div>
                  <div className="text-xs uppercase tracking-luxe text-cream/55">
                    Est. 1994 · Paris
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Timeline ---------------- */}
      <section className="section">
        <div className="container-luxe">
          <SectionHeading eyebrow="Our Journey" title="A brand, bar by bar" className="mb-16" />
          <Timeline items={timeline} />
        </div>
      </section>

      {/* ---------------- Values ---------------- */}
      <section className="section bg-cocoa/30">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="What We Stand For"
            title="Values poured into every bar"
            className="mb-14"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {values.map(({ Icon, title, text }, i) => (
              <Reveal key={title} variant="up" delay={i * 0.12} className="card group p-8">
                <div className="mb-5 flex items-center justify-between">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-espresso/40 text-gold transition-colors duration-500 group-hover:border-gold/60">
                    <Icon size={22} />
                  </span>
                  <span className="font-serif text-4xl text-gold/20 transition-colors duration-500 group-hover:text-gold/35 sm:text-5xl">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-serif text-xl text-cream">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/60">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
