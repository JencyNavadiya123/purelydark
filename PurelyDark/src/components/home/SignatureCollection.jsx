import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../common/Reveal";
import ProductSlider from "../product/ProductSlider";
import { getCollectionProducts } from "../../data/collections";

export default function SignatureCollection({ onQuickView }) {
  const products = getCollectionProducts("signature-collection").slice(0, 8);
  return (
    <section className="section relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-radial-glow" />
      <div className="container-luxe relative">
        <div className="mb-12 grid items-end gap-6 lg:grid-cols-[1fr_auto]">
          <Reveal>
            <span className="eyebrow">
              <span className="gold-rule" /> The Signature
            </span>
            <h2 className="heading-lg mt-4 max-w-xl">
              The bars that made our name
            </h2>
            <p className="lede mt-4 max-w-lg">
              Our most celebrated expressions — the house classics connoisseurs return to again and again.
            </p>
          </Reveal>
          <Link to="/collections/signature-collection" className="btn-gold whitespace-nowrap">
            Shop signature <ArrowRight size={16} />
          </Link>
        </div>
        <ProductSlider products={products} onQuickView={onQuickView} />
      </div>
    </section>
  );
}
