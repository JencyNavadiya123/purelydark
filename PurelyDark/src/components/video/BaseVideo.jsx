import { useRef, useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";

/* ------------------------------------------------------------
   Core video primitive: lazy-loaded, poster fallback, muted
   autoplay-on-view, reduced-motion aware, optional controls.
   Every video on the site is built on this.
   ------------------------------------------------------------ */
export default function BaseVideo({
  src,
  webm,
  poster,
  className = "",
  overlay = "none", // none | soft | gradient
  controls = false,
  loop = true,
  objectClass = "video-cover",
  children,
  rounded = false,
  eager = false, // mount & load the video immediately (hero), no lazy wait
  posterInitial = true, // show the poster image while loading (set false to avoid a mismatched still)
}) {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const [inView, setInView] = useState(eager);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [failed, setFailed] = useState(false);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  // Lazy mount video only when near viewport (skipped when eager)
  useEffect(() => {
    if (reduced || eager) return;
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, eager]);

  // Pause when scrolled off-screen (perf)
  useEffect(() => {
    if (reduced || !inView) return;
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!controls) {
          if (e.isIntersecting && playing) v.play().catch(() => {});
          else v.pause();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [inView, reduced, controls, playing]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const overlayCls =
    overlay === "gradient" ? "video-overlay" : overlay === "soft" ? "video-overlay-soft" : "";

  return (
    <div
      ref={wrapRef}
      className={`video-wrap ${rounded ? "rounded-2xl" : ""} ${className}`}
    >
      {/* Poster: shown while loading (posterInitial) and always as reduced-motion/
          failure fallback. For the hero we skip the loading poster to avoid a
          mismatched still, leaving a dark background that the video fades over. */}
      {poster && (posterInitial || reduced || failed) && (
        <img
          src={poster}
          alt=""
          aria-hidden
          className={`video-poster ${loaded && !failed && !reduced ? "hide" : ""}`}
        />
      )}

      {inView && !reduced && !failed && (
        <video
          ref={videoRef}
          className={objectClass}
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.7s ease" }}
          autoPlay={!controls}
          muted
          loop={loop}
          playsInline
          preload={eager ? "auto" : "metadata"}
          poster={posterInitial ? poster : undefined}
          onLoadedData={() => setLoaded(true)}
          onLoadedMetadata={() => setLoaded(true)}
          onCanPlay={() => setLoaded(true)}
          onPlaying={() => setLoaded(true)}
          onError={() => setFailed(true)}
        >
          {webm && <source src={webm} type="video/webm" />}
          <source src={src} type="video/mp4" />
        </video>
      )}

      {overlayCls && <div className={overlayCls} />}

      {controls && inView && !reduced && !failed && (
        <button
          className="video-control"
          onClick={toggle}
          aria-label={playing ? "Pause video" : "Play video"}
        >
          {playing ? <Pause size={18} /> : <Play size={18} />}
        </button>
      )}

      {children}
    </div>
  );
}
