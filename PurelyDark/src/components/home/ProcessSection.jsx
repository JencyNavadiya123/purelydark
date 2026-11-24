import SectionHeading from "../common/SectionHeading";
import VideoGallery from "../video/VideoGallery";
import { VIDEOS } from "../../utils/assets";

const steps = [
  { video: VIDEOS.beans, label: "01 · Harvesting the beans" },
  { video: VIDEOS.roasting, label: "02 · Slow roasting" },
  { video: VIDEOS.grinding, label: "03 · Grinding & conching" },
  { video: VIDEOS.pouring, label: "04 · Melting & tempering" },
  { video: VIDEOS.moulding, label: "05 · Pouring into moulds" },
  { video: VIDEOS.packaging, label: "06 · Luxury packaging" },
];

export default function ProcessSection() {
  return (
    <section className="section bg-cocoa/30">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Bean to Bar"
          title="Our chocolate-making process"
          subtitle="Seven deliberate steps, from a single cocoa pod to the final gold-wrapped bar."
          className="mb-14"
        />
        <VideoGallery items={steps} />
      </div>
    </section>
  );
}
