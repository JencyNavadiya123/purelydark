import BaseVideo from "./BaseVideo";
import { StaggerGroup, StaggerItem } from "../common/Reveal";

/* Grid of cinematic clips with labels. items: [{video, label}] */
export default function VideoGallery({ items = [] }) {
  return (
    <StaggerGroup
      stagger={0.16}
      delayChildren={0.1}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
    >
      {items.map((it, i) => (
        <StaggerItem key={i} variant="up" className="min-w-0">
          <div className="group relative overflow-hidden rounded-2xl border-2 border-white/40 transition-colors duration-500 hover:border-white/70">
            <BaseVideo
              src={it.video.src}
              webm={it.video.webm}
              poster={it.video.poster}
              overlay="soft"
              controls
              className="ratio-video"
            />
            {it.label && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] p-4 sm:p-5">
                <span className="font-serif text-base text-cream drop-shadow sm:text-lg">
                  {it.label}
                </span>
              </div>
            )}
          </div>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
