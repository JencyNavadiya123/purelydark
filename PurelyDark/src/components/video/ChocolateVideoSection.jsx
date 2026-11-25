import { motion, useReducedMotion } from "framer-motion";
import BaseVideo from "./BaseVideo";

const EASE = [0.22, 1, 0.36, 1];

/* Full-width cinematic video band with elegant text overlay.
   Used for the chocolate-making process + story sections. */
export default function ChocolateVideoSection({
  video,
  eyebrow,
  title,
  text,
  height = "h-[70vh] min-h-[460px]",
  align = "center",
  controls = false,
}) {
  const reduce = useReducedMotion();
  const alignCls =
    align === "left"
      ? "items-start text-left"
      : align === "right"
      ? "items-end text-right"
      : "items-center text-center";

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.18,
        delayChildren: reduce ? 0 : 0.15,
      },
    },
  };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 34 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  };
  return (
    <section className={`relative ${height} w-full overflow-hidden`}>
      <BaseVideo
        src={video.src}
        webm={video.webm}
        poster={video.poster}
        overlay="gradient"
        controls={controls}
        className="absolute inset-0 h-full w-full"
      />
      <div className="container-luxe relative z-[2] flex h-full items-center">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className={`flex max-w-xl flex-col gap-4 ${alignCls} ${
            align === "right" ? "ml-auto" : align === "center" ? "mx-auto" : ""
          }`}
        >
          {eyebrow && (
            <motion.span variants={item} className="eyebrow">
              <span className="gold-rule" />
              {eyebrow}
            </motion.span>
          )}
          <motion.h2 variants={item} className="heading-lg">
            {title}
          </motion.h2>
          {text && (
            <motion.p variants={item} className="lede">
              {text}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
