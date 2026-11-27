import { useRef, useState } from "react";
import { Send, Sparkles } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import BackgroundVideo from "../video/BackgroundVideo";
import { useToast } from "../../context/ToastContext";
import { VIDEOS } from "../../utils/assets";

const EASE = [0.22, 1, 0.36, 1];

/* A single line that reveals (fade + focus) driven by scroll position.
   `progress` is the section's scroll progress; [start,end] is this line's slot. */
function ScrollLine({ progress, start, end, reduce, as: Tag = motion.div, className, children }) {
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const scale = useTransform(progress, [start, end], [0.97, 1]);
  const blur = useTransform(progress, [start, end], [8, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;
  if (reduce) return <Tag className={className}>{children}</Tag>;
  return (
    <Tag className={className} style={{ opacity, scale, filter }}>
      {children}
    </Tag>
  );
}

/* Floating gold dust for the card */
function Particles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 12 }).map((_, i) => {
        const size = 2 + (i % 3);
        return (
          <span
            key={i}
            className="absolute rounded-full bg-gold/25"
            style={{
              width: size,
              height: size,
              left: `${(i * 61) % 100}%`,
              bottom: "-10px",
              animation: `drift ${7 + (i % 6)}s linear ${i * 0.7}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const reduce = useReducedMotion();
  const cardRef = useRef(null);

  // Scroll progress through the card — drives the line-by-line reveal.
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 0.85", "end 0.55"],
  });

  const submit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast("Please enter a valid email address", "info");
      return;
    }
    toast("Welcome to PurelyDark. Check your inbox.");
    setEmail("");
  };

  const card = {
    hidden: { opacity: 0, scale: reduce ? 1 : 0.96 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: EASE },
    },
  };

  return (
    <section className="section relative overflow-hidden">
      <div className="container-luxe">
        <motion.div
          ref={cardRef}
          variants={card}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="animated-gold-border relative overflow-hidden rounded-3xl border border-gold/20 px-5 py-12 text-center sm:rounded-[2rem] sm:px-16 sm:py-20"
          style={{
            background:
              "linear-gradient(135deg,#432a1a 0%,#2d1a11 45%,#1f130c 100%)",
          }}
        >
          {/* Gold top hairline */}
          <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
          {/* Chocolate video framed inside the top-left circle */}
          <div className="pointer-events-none absolute -left-8 -top-8 h-28 w-28 overflow-hidden rounded-full opacity-90 sm:-left-14 sm:-top-14 sm:h-48 sm:w-48">
            <BackgroundVideo video={VIDEOS.craftsmanship} overlay="none" />
            <div className="absolute inset-0 bg-espresso/15" />
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_34px_12px_rgba(31,19,12,0.92)]" />
          </div>

          {/* Decorative dashed corner rings — rotating, highlighted,
              each with a glowing dot that orbits along the ring */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-8 -top-8 h-28 w-28 rounded-full border-2 border-dashed border-gold/60 sm:-left-14 sm:-top-14 sm:h-48 sm:w-48"
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          >
            <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_12px_3px_rgba(198,154,82,0.7)]" />
          </motion.div>
          {/* Chocolate video framed inside the corner circle (focal point) */}
          <div className="pointer-events-none absolute -bottom-12 -right-8 h-32 w-32 overflow-hidden rounded-full opacity-90 sm:-bottom-20 sm:-right-14 sm:h-60 sm:w-60">
            <BackgroundVideo video={VIDEOS.craftsmanship} overlay="none" />
            <div className="absolute inset-0 bg-espresso/15" />
            {/* inner edge feather so it blends into the card */}
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_38px_12px_rgba(31,19,12,0.92)]" />
          </div>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -bottom-12 -right-8 h-32 w-32 rounded-full border-2 border-dashed border-gold/50 sm:-bottom-20 sm:-right-14 sm:h-60 sm:w-60"
            animate={reduce ? undefined : { rotate: -360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          >
            <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_10px_3px_rgba(198,154,82,0.6)]" />
          </motion.div>
          {/* Warm overhead glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-44 w-[65%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(198,154,82,0.2),transparent_70%)]" />
          <Particles />

          <div className="relative mx-auto max-w-xl">
            <ScrollLine
              progress={scrollYProgress}
              start={0.0}
              end={0.18}
              reduce={reduce}
              as={motion.span}
              className="eyebrow mx-auto justify-center"
            >
              <Sparkles size={14} /> The Inner Circle
            </ScrollLine>
            <ScrollLine
              progress={scrollYProgress}
              start={0.12}
              end={0.32}
              reduce={reduce}
              as={motion.h2}
              className="heading-md mt-4"
            >
              Join the <span className="text-gold-grad">PurelyDark</span> maison
            </ScrollLine>
            <ScrollLine
              progress={scrollYProgress}
              start={0.26}
              end={0.46}
              reduce={reduce}
              as={motion.p}
              className="lede mt-4"
            >
              Early access to limited editions, tasting notes from our
              chocolatiers, and 10% off your first order.
            </ScrollLine>
            <ScrollLine
              progress={scrollYProgress}
              start={0.4}
              end={0.6}
              reduce={reduce}
              className="mx-auto mt-8 max-w-md"
            >
              <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
                <div className="animated-gold-border relative flex-1 rounded-xl p-[2px]">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="input-luxe !rounded-[10px] !border-transparent"
                    aria-label="Email address"
                  />
                </div>
                <button type="submit" className="btn-gold shrink-0">
                  <Send size={16} /> Subscribe
                </button>
              </form>
            </ScrollLine>
            <ScrollLine
              progress={scrollYProgress}
              start={0.54}
              end={0.72}
              reduce={reduce}
              as={motion.p}
              className="mt-4 text-xs text-cream/40"
            >
              No spam, only chocolate. Unsubscribe anytime.
            </ScrollLine>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
