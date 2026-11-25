import { Leaf, Award, Globe2, Sparkles } from "lucide-react";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";
import { ScrollZoom } from "../common/Parallax";
import { img } from "../../utils/assets";

const items = [
  { icon: Globe2, title: "Single-Origin Cocoa", text: "Beans sourced from the world's finest terroirs — Madagascar to Ecuador." },
  { icon: Leaf, title: "Pure & Natural", text: "No artificial flavours, no preservatives. Only what belongs in fine chocolate." },
  { icon: Award, title: "Award-Winning Craft", text: "Recognised by international academies of chocolate excellence." },
  { icon: Sparkles, title: "Slow-Conched", text: "Up to 72 hours of conching for an impossibly smooth finish." },
];

export default function IngredientsSection() {
  return (
    <section className="section">
      <div className="container-luxe grid items-center gap-14 lg:grid-cols-2">
        <Reveal variant="left">
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-white/5">
              <ScrollZoom className="h-full w-full">
                <img src={img(4, 1000, 1200)} alt="Premium cocoa ingredients" loading="lazy" className="h-full w-full object-cover" />
              </ScrollZoom>
            </div>
            <div className="glass absolute -bottom-6 -right-4 hidden rounded-2xl p-5 sm:block">
              <div className="font-serif text-3xl text-gold">100%</div>
              <div className="text-xs uppercase tracking-wider text-cream/60">Traceable cocoa</div>
            </div>
          </div>
        </Reveal>

        <div>
          <SectionHeading
            align="left"
            eyebrow="The Ingredients"
            title="Only the finest enters our kitchen"
            subtitle="Great chocolate begins long before the kitchen. We obsess over every bean, every origin, every gram of cocoa butter."
            className="mb-10"
          />
          <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {items.map((it, i) => (
              <Reveal key={it.title} delay={i * 0.1} className="flex gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold/30 text-gold">
                  <it.icon size={20} />
                </span>
                <div>
                  <h4 className="font-serif text-lg text-cream">{it.title}</h4>
                  <p className="mt-1 text-sm text-cream/60">{it.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
