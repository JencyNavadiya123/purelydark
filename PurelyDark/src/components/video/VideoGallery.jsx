import BaseVideo from "./BaseVideo";
import { StaggerGroup, StaggerItem } from "../common/Reveal";

/* Grid of cinematic clips with labels. items: [{video, label}] */
export default function VideoGallery({ items = [] }) {
  return (
    <StaggerGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it, i) => (
        <StaggerItem key={i}>
          <div className="group relative overflow-hidden rounded-2xl border border-white/5">
            <BaseVideo
              src={it.video.src}
              webm={it.video.webm}
              poster={it.video.poster}
              overlay="soft"
              controls
              className="ratio-video"
            />
            {it.label && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] p-5">
                <span className="font-serif text-lg text-cream drop-shadow">{it.label}</span>
              </div>
            )}
          </div>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
