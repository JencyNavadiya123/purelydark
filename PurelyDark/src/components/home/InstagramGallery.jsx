import { Instagram } from "lucide-react";
import SectionHeading from "../common/SectionHeading";
import { StaggerGroup, StaggerItem } from "../common/Reveal";
import { img } from "../../utils/assets";

export default function InstagramGallery() {
  return (
    <section className="section">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="@purelydark"
          title="Follow the obsession"
          subtitle="Join our community of dark chocolate devotees on Instagram."
          className="mb-12"
        />
        <StaggerGroup className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <StaggerItem key={i}>
              <a
                href="#"
                className="group relative block aspect-square overflow-hidden rounded-xl"
                aria-label="View on Instagram"
              >
                <img src={img(i + 5, 500, 500)} alt="" loading="lazy" className="zoom-media h-full w-full object-cover" />
                <span className="absolute inset-0 grid place-items-center bg-espresso/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Instagram size={22} className="text-gold" />
                </span>
              </a>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
