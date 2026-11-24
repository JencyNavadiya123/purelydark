import { motion } from "framer-motion";
import Breadcrumb from "../common/Breadcrumb";
import BackgroundVideo from "../video/BackgroundVideo";
import { img } from "../../utils/assets";

const EASE = [0.22, 1, 0.36, 1];

/* Reusable page banner that clears the fixed header.
   Pass `video` for a cinematic background clip (falls back to `image`
   for the poster / reduced motion). Breadcrumb, eyebrow, title and
   subtitle reveal one-by-one with a staggered delay. */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumb,
  image,
  video,
  seed = 5,
  compact = false,
}) {
  const bg = image || img(seed, 1920, 800);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.16, delayChildren: 0.1 } },
  };
  const itemV = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
  };

  return (
    <section
      className={`relative flex items-end overflow-hidden ${
        compact ? "min-h-[46vh] pt-28" : "min-h-[58vh] pt-32"
      }`}
    >
      {/* Background: cinematic video, else static image */}
      {video ? (
        <BackgroundVideo
          video={{ ...video, poster: video.poster || bg }}
          overlay="none"
          eager
        />
      ) : (
        <img src={bg} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
      )}
      {/* Targeted darkening: strong where the text sits (bottom-left),
          clear where the video shows (center/right) so it stays visible. */}
      <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/35 to-espresso/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-espresso/80 via-espresso/25 to-transparent" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-[2] w-full"
        style={{ padding: "70px 7%" }}
      >
        {breadcrumb && (
          <motion.div variants={itemV} className="mb-5">
            <Breadcrumb items={breadcrumb} />
          </motion.div>
        )}
        <div className="max-w-2xl">
          {eyebrow && (
            <motion.span variants={itemV} className="eyebrow">
              <span className="gold-rule" />
              {eyebrow}
            </motion.span>
          )}
          <motion.h1 variants={itemV} className="heading-xl mt-3">
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p variants={itemV} className="lede mt-4">
              {subtitle}
            </motion.p>
          )}
        </div>
      </motion.div>
    </section>
  );
}
