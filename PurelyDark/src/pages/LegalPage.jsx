import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Mail, ShieldCheck } from "lucide-react";
import PageHero from "../components/layout/PageHero";
import Reveal from "../components/common/Reveal";

const EASE = [0.22, 1, 0.36, 1];

const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/* Smoothly scrolls to a section, clearing the sticky header.
   Routes through Lenis when active so it matches the site's momentum feel. */
function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -120, duration: 1.1 });
  else {
    const y = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}

/* ------------------------------------------------------------------
   Reusable legal document layout — premium two-column reading view.
   • Sticky, numbered table of contents that tracks the active section.
   • Each clause rendered as a warm card with a numbered gold badge + icon.
   • Closing "questions?" contact card.
   ------------------------------------------------------------------ */
export default function LegalPage({
  title,
  label,
  breadcrumb,
  intro,
  sections = [],
  seed = 12,
  updated,
}) {
  const items = useMemo(
    () => sections.map((s, i) => ({ ...s, id: slugify(s.heading), n: i + 1 })),
    [sections]
  );
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items
      .map((s) => document.getElementById(s.id))
      .filter(Boolean);
    if (!els.length) return undefined;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [items]);

  const onNav = useCallback(
    (id) => (e) => {
      e.preventDefault();
      setActive(id);
      scrollToId(id);
    },
    []
  );

  const lastUpdated = updated || `${new Date().getFullYear()}`;

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
        <div className="container-luxe">
          <div className="grid gap-10 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-16">
            {/* ---- Sticky table of contents (desktop) ---- */}
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <p className="eyebrow mb-5">
                  <span className="gold-rule" />
                  On this page
                </p>
                <nav className="flex flex-col gap-1">
                  {items.map((s) => {
                    const on = active === s.id;
                    return (
                      <a
                        key={s.id}
                        href={`#${s.id}`}
                        onClick={onNav(s.id)}
                        className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-300 ${
                          on
                            ? "bg-gold/10 text-gold"
                            : "text-cream/55 hover:text-cream"
                        }`}
                      >
                        <span
                          className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[0.7rem] font-semibold tabular-nums transition-colors duration-300 ${
                            on
                              ? "bg-gold text-espresso"
                              : "bg-white/5 text-cream/50 group-hover:text-cream"
                          }`}
                        >
                          {s.n}
                        </span>
                        <span className="leading-tight">{s.heading}</span>
                      </a>
                    );
                  })}
                </nav>

                <div className="mt-8 flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-xs text-cream/45">
                  <ShieldCheck size={15} className="shrink-0 text-gold/70" />
                  <span>Last updated {lastUpdated}</span>
                </div>
              </div>
            </aside>

            {/* ---- Document body ---- */}
            <div className="min-w-0">
              {intro && (
                <Reveal variant="fade">
                  <div className="relative mb-10 overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-br from-chocolate/80 to-espresso/40 p-6 sm:p-8">
                    <FileText
                      size={120}
                      className="pointer-events-none absolute -right-4 -top-6 text-gold/[0.06]"
                      strokeWidth={1}
                    />
                    <p className="relative lede">{intro}</p>
                  </div>
                </Reveal>
              )}

              {/* Mobile quick-nav chips */}
              <div className="mb-8 flex flex-wrap gap-2 lg:hidden">
                {items.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={onNav(s.id)}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-cream/60 transition-colors hover:border-gold/40 hover:text-gold"
                  >
                    {s.n}. {s.heading}
                  </a>
                ))}
              </div>

              <div className="flex flex-col gap-5">
                {items.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.article
                      key={s.id}
                      id={s.id}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.6, ease: EASE, delay: Math.min(i * 0.04, 0.2) }}
                      className="card scroll-mt-28 p-6 sm:p-8"
                    >
                      <div className="flex items-start gap-4 sm:gap-5">
                        <div className="relative grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-gold/25 bg-espresso/60">
                          {Icon ? (
                            <Icon size={20} className="text-gold" strokeWidth={1.6} />
                          ) : (
                            <span className="stat-num text-lg text-gold">{s.n}</span>
                          )}
                          <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-gold text-[0.65rem] font-bold tabular-nums text-espresso">
                            {s.n}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h2 className="font-serif text-lg text-cream sm:text-xl">
                            {s.heading}
                          </h2>
                          <p className="mt-2.5 leading-relaxed text-cream/65">
                            {s.body}
                          </p>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>

              {/* ---- Closing contact CTA ---- */}
              <Reveal variant="fade">
                <div className="mt-10 flex flex-col items-start gap-5 rounded-2xl border border-gold/20 bg-gradient-to-br from-cocoa/70 to-espresso/50 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold/10">
                      <Mail size={18} className="text-gold" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-cream">
                        Questions about this {title.toLowerCase().includes("privacy") ? "policy" : "document"}?
                      </h3>
                      <p className="mt-1 text-sm text-cream/55">
                        We're happy to clarify anything. Reach our team directly.
                      </p>
                    </div>
                  </div>
                  <Link to="/contact" className="btn-gold shrink-0">
                    Contact Us <ArrowRight size={16} />
                  </Link>
                </div>
              </Reveal>

              <p className="mt-8 text-xs text-cream/35 lg:hidden">
                Last updated: {lastUpdated}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
