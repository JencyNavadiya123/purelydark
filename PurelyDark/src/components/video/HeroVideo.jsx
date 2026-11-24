import BaseVideo from "./BaseVideo";
import { VIDEOS } from "../../utils/assets";

/* Full-screen cinematic hero background video.
   Loads eagerly with a DARK chocolate poster shown instantly (no blank
   dark gap on refresh), which then crossfades into the video — matched
   palette so there's no jarring swap. Poster also serves reduced-motion. */
export default function HeroVideo({ className = "", children }) {
  return (
    <BaseVideo
      src={VIDEOS.hero.src}
      webm={VIDEOS.hero.webm}
      poster={VIDEOS.hero.poster}
      overlay="gradient"
      eager
      posterInitial={false}
      className={`absolute inset-0 h-full w-full bg-choco-gradient ${className}`}
    >
      {children}
    </BaseVideo>
  );
}
