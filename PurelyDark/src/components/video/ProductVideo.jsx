import BaseVideo from "./BaseVideo";

/* Product showcase video with play/pause controls (content video). */
export default function ProductVideo({ video, className = "" }) {
  return (
    <BaseVideo
      src={video.src}
      webm={video.webm}
      poster={video.poster}
      controls
      loop
      rounded
      className={`ratio-square ${className}`}
    />
  );
}
