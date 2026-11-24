import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../common/Reveal";
import { img } from "../../utils/assets";

export default function StoryPreview() {
  return (
    <section className="section bg-cocoa/30">
      <div className="container-luxe grid items-center gap-14 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <Reveal>
            <span className="eyebrow">
              <span className="gold-rule" /> Our Story
            </span>
            <h2 className="heading-lg mt-4">
              Three decades devoted to the darkest art
            </h2>
            <p className="lede mt-5">
              What began in a small atelier in 1994 has become a maison celebrated
              across the world. Our philosophy has never changed: let the cocoa speak.
              Honest chocolate, crafted slowly, with reverence for the bean and the
              hands that grow it.
            </p>
            <blockquote className="mt-7 border-l-2 border-gold pl-5 font-display text-xl italic text-cream/80">
              “Chocolate is not a product. It is a conversation between the earth and
              the palate.”
            </blockquote>
            <Link to="/our-story" className="btn-gold mt-8">
              Read our story <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
        <Reveal variant="right" className="order-1 lg:order-2">
          <div className="grid grid-cols-2 gap-4">
            <img src={img(9, 600, 800)} alt="" loading="lazy" className="mt-8 h-full w-full rounded-2xl object-cover" />
            <img src={img(13, 600, 800)} alt="" loading="lazy" className="h-full w-full rounded-2xl object-cover" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
