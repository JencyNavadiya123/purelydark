import PageHero from "../components/layout/PageHero";

/* Reusable legal document layout. */
export default function LegalPage({ title, label, breadcrumb, intro, sections = [], seed = 12 }) {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={title}
        subtitle={label}
        breadcrumb={breadcrumb}
        seed={seed}
        compact
      />
      <section className="section">
        <div className="container-luxe max-w-3xl">
          {intro && <p className="lede mb-10">{intro}</p>}
          <div className="space-y-10">
            {sections.map((s, i) => (
              <div key={i}>
                <h2 className="font-serif text-xl text-gold">
                  {i + 1}. {s.heading}
                </h2>
                <p className="mt-3 leading-relaxed text-cream/70">{s.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-xs text-cream/40">Last updated: {new Date().getFullYear()}</p>
        </div>
      </section>
    </>
  );
}
