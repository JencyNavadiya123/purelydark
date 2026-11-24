import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import PageHero from "../components/layout/PageHero";
import { StaggerGroup, StaggerItem } from "../components/common/Reveal";
import collections from "../data/collections";

export default function Collections() {
  return (
    <>
      <PageHero
        eyebrow="Curated"
        title="Our Collections"
        subtitle="Thoughtfully composed selections — from everyday signatures to rare, limited editions."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Collections" }]}
        seed={8}
      />
      <section className="section">
        <div className="container-luxe">
          <StaggerGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {collections.map((c) => (
              <StaggerItem key={c.id}>
                <Link
                  to={`/collections/${c.slug}`}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-3xl border border-white/5"
                >
                  <img src={c.image} alt={c.name} loading="lazy" className="zoom-media h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <span className="badge-dark mb-3">{c.count} pieces</span>
                    <h3 className="font-serif text-2xl text-cream">{c.name}</h3>
                    <p className="clamp-2 mt-2 text-sm text-cream/60">{c.description}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm text-gold">
                      Explore
                      <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  );
}
