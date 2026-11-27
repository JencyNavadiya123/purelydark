import { motion, useReducedMotion } from "framer-motion";
import { classNames } from "../../utils/format";

const EASE = [0.22, 1, 0.36, 1];

/* Section heading that reveals its eyebrow → title → subtitle line by line
   on scroll. Used across the whole site, so this drives consistent
   top-to-bottom staggered reveals on every page. */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
  light = false,
}) {
  const reduce = useReducedMotion();
  const alignCls =
    align === "center"
      ? "items-center text-center mx-auto"
      : align === "right"
      ? "items-end text-right ml-auto"
      : "items-start text-left";

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.14,
        delayChildren: reduce ? 0 : 0.05,
      },
    },
  };
  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.65, ease: EASE } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={classNames("flex flex-col gap-4 max-w-2xl", alignCls, className)}
    >
      {eyebrow && (
        <motion.span variants={item} className="eyebrow">
          <span className="gold-rule" />
          {eyebrow}
        </motion.span>
      )}
      <motion.h2 variants={item} className={light ? "heading-lg" : "heading-lg"}>
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p variants={item} className="lede">
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
