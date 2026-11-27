import { Link } from "react-router-dom";
import { Mail, Phone, Clock, ArrowRight } from "lucide-react";
import PageHero from "../components/layout/PageHero";
import Accordion from "../components/common/Accordion";
import Reveal from "../components/common/Reveal";
import faqs from "../data/faq";

const support = [
  { Icon: Mail, label: "Email", value: "hello@purelydark.com", href: "mailto:hello@purelydark.com" },
  { Icon: Phone, label: "Phone", value: "+33 1 23 45 67 89", href: "tel:+33123456789" },
  { Icon: Clock, label: "Hours", value: "Mon–Sat · 9:00 – 19:00" },
];

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

      {/* Warm backdrop so the section reads distinctly and doesn't merge with the footer */}
      <section
        className="section relative overflow-hidden"
        style={{
          background:
            "radial-gradient(120% 90% at 100% 0%, #2c1a13 0%, #1b100b 55%, #130d09 100%)",
        }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
        <div className="pointer-events-none absolute -left-28 top-10 h-80 w-80 rounded-full bg-gold/10 blur-[140px]" />

        <div className="container-luxe relative z-[2]">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            {/* ---- Sticky support sidebar (fills the empty space) ---- */}
            <Reveal variant="left" className="lg:sticky lg:top-28 lg:self-start">
              <span className="eyebrow">
                <span className="gold-rule" /> Help Centre
              </span>
              <h2 className="heading-lg mt-3">Answers, at your service</h2>
              <p className="lede mt-4">
                Browse the questions our maison is asked most. Still unsure? Our
                team is only a message away.
              </p>

              <div className="mt-8 rounded-2xl border border-gold/20 bg-choco-gradient p-6 sm:p-7">
                <h3 className="font-serif text-lg text-cream">Still have questions?</h3>
                <p className="mt-2 text-sm text-cream/60">
                  We reply within one business day.
                </p>

                <ul className="mt-5 space-y-3.5">
                  {support.map(({ Icon, label, value, href }) => {
                    const inner = (
                      <>
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/30 text-gold">
                          <Icon size={17} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[0.7rem] uppercase tracking-luxe text-cream/45">
                            {label}
                          </span>
                          <span className="block truncate text-sm text-cream/85">{value}</span>
                        </span>
                      </>
                    );
                    return (
                      <li key={label}>
                        {href ? (
                          <a href={href} className="flex items-center gap-3 transition-colors hover:text-gold">
                            {inner}
                          </a>
                        ) : (
                          <div className="flex items-center gap-3">{inner}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>

                <Link to="/contact" className="btn-gold mt-6 w-full !whitespace-normal text-center">
                  Contact Us <ArrowRight size={16} className="shrink-0" />
                </Link>
              </div>
            </Reveal>

            {/* ---- Accordion ---- */}
            <Reveal variant="right" delay={0.12}>
              <Accordion items={faqs} />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
