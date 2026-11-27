import BaseVideo from "./BaseVideo";

/* Full-bleed looping background video with gradient overlay for text. */
export default function BackgroundVideo({
  video,
  overlay = "gradient",
  className = "",
  eager = false,
  // Background videos skip the loading poster: a dark background shows and the
  // video fades straight in — no 1-second still image flashing first. The poster
  // is still used as the fallback on reduced-motion / slow devices / load error.
  posterInitial = false,
  children,
}) {
  return (
    <BaseVideo
      src={video.src}
      webm={video.webm}
      poster={video.poster}
      overlay={overlay}
      eager={eager}
      posterInitial={posterInitial}
      className={`absolute inset-0 h-full w-full ${className}`}
    >
      {children}
    </BaseVideo>
  );
}
