import BaseVideo from "./BaseVideo";

/* Full-bleed looping background video with gradient overlay for text. */
export default function BackgroundVideo({
  video,
  overlay = "gradient",
  className = "",
  eager = false,
  children,
}) {
  return (
    <BaseVideo
      src={video.src}
      webm={video.webm}
      poster={video.poster}
      overlay={overlay}
      eager={eager}
      className={`absolute inset-0 h-full w-full ${className}`}
    >
      {children}
    </BaseVideo>
  );
}
