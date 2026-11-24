import { Link } from "react-router-dom";
import PageHero from "../components/layout/PageHero";
import Accordion from "../components/common/Accordion";
import faqs from "../data/faq";

export default function FAQ() {
  return (
    <>
      <PageHero
        eyebrow="Help Centre"
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about our chocolate, shipping and care."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "FAQ" }]}
        seed={11}
        compact
      />
      <section className="section">
        <div className="container-luxe max-w-3xl">
          <Accordion items={faqs} />
          <div className="mt-12 rounded-2xl border border-gold/20 bg-choco-gradient p-8 text-center">
            <h3 className="font-serif text-xl text-cream">Still have questions?</h3>
            <p className="mt-2 text-sm text-cream/60">Our team is always happy to help.</p>
            <Link to="/contact" className="btn-gold mt-5">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
