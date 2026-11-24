import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { classNames } from "../../utils/format";

/* Product gallery with thumbnails + hover zoom (desktop). */
export default function ProductGallery({ images = [], alt = "" }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState({ x: 50, y: 50, on: false });
  const ref = useRef(null);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setZoom({ x, y, on: true });
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => setZoom((z) => ({ ...z, on: false }))}
        className="relative aspect-square overflow-hidden rounded-2xl border border-white/5 bg-cocoa/40"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={images[active]}
            alt={alt}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="h-full w-full object-cover"
            style={{
              transform: zoom.on ? "scale(1.8)" : "scale(1)",
              transformOrigin: `${zoom.x}% ${zoom.y}%`,
              transition: "transform 0.25s ease-out",
            }}
          />
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            className={classNames(
              "aspect-square overflow-hidden rounded-xl border transition-all duration-300",
              i === active
                ? "border-gold ring-1 ring-gold"
                : "border-white/10 opacity-70 hover:opacity-100"
            )}
          >
            <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
