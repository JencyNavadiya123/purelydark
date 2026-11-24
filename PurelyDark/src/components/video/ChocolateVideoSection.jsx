import { motion } from "framer-motion";
import BaseVideo from "./BaseVideo";

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
  const alignCls =
    align === "left"
      ? "items-start text-left"
      : align === "right"
      ? "items-end text-right"
      : "items-center text-center";
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
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`flex max-w-xl flex-col gap-4 ${alignCls} ${
            align === "right" ? "ml-auto" : align === "center" ? "mx-auto" : ""
          }`}
        >
          {eyebrow && (
            <span className="eyebrow">
              <span className="gold-rule" />
              {eyebrow}
            </span>
          )}
          <h2 className="heading-lg">{title}</h2>
          {text && <p className="lede">{text}</p>}
        </motion.div>
      </div>
    </section>
  );
}
