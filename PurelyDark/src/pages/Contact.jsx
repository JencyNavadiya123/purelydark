import { useState } from "react";
import { MapPin, Mail, Phone, Clock, Send } from "lucide-react";
import PageHero from "../components/layout/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import Accordion from "../components/common/Accordion";
import Reveal from "../components/common/Reveal";
import { useToast } from "../context/ToastContext";
import { img } from "../utils/assets";
import faqs from "../data/faq";

const initial = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const { toast } = useToast();

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.subject.trim()) e.subject = "Please add a subject";
    if (form.message.trim().length < 10) e.message = "Message must be at least 10 characters";
    return e;
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    toast("Thank you — we'll reply within 24 hours.");
    setForm(initial);
  };

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Contact Us"
        subtitle="Questions, collaborations or simply a shared love of chocolate — we'd love to hear from you."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Contact" }]}
        seed={10}
      />

      <section className="section">
        <div className="container-luxe grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          {/* Info */}
          <Reveal variant="left">
            <SectionHeading align="left" eyebrow="Reach Us" title="Visit or write to us" className="mb-8" />
            <ul className="space-y-6">
              {[
                [MapPin, "Atelier & Boutique", "18 Rue du Cacao, 75001 Paris, France"],
                [Mail, "Email", "hello@purelydark.com"],
                [Phone, "Phone", "+33 1 23 45 67 89"],
                [Clock, "Opening Hours", "Mon–Sat · 9:00 – 19:00"],
              ].map(([Icon, title, text]) => (
                <li key={title} className="flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold/30 text-gold">
                    <Icon size={20} />
                  </span>
                  <div>
                    <h4 className="font-serif text-lg text-cream">{title}</h4>
                    <p className="text-sm text-cream/60">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Form */}
          <Reveal variant="right">
            <form onSubmit={submit} noValidate className="card p-7 sm:p-9">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" error={errors.name}>
                  <input className="input-luxe" value={form.name} onChange={set("name")} placeholder="Your full name" />
                </Field>
                <Field label="Email" error={errors.email}>
                  <input type="email" className="input-luxe" value={form.email} onChange={set("email")} placeholder="your@email.com" />
                </Field>
              </div>
              <div className="mt-5">
                <Field label="Subject" error={errors.subject}>
                  <input className="input-luxe" value={form.subject} onChange={set("subject")} placeholder="How can we help?" />
                </Field>
              </div>
              <div className="mt-5">
                <Field label="Message" error={errors.message}>
                  <textarea rows={5} className="input-luxe resize-none" value={form.message} onChange={set("message")} placeholder="Tell us more…" />
                </Field>
              </div>
              <button type="submit" className="btn-gold mt-6 w-full">
                <Send size={16} /> Send Message
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* FAQ — distinct warm panel so it separates cleanly from the footer */}
      <section
        className="relative overflow-hidden py-16 sm:py-24 lg:py-28"
        style={{
          background:
            "radial-gradient(120% 90% at 100% 0%, #2c1a13 0%, #1b100b 55%, #130d09 100%)",
        }}
      >
        {/* Separating top hairline + soft gold glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
        <div className="pointer-events-none absolute -right-28 top-4 h-80 w-80 rounded-full bg-gold/10 blur-[140px]" />

        <div className="container-luxe relative z-[2]">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
            {/* Image column — magazine-style chocolate photo */}
            <Reveal variant="left" className="group lg:sticky lg:top-28">
              <div className="glow-hover relative overflow-hidden rounded-3xl border border-gold/20">
                <img
                  src={img(1, 1000, 1150)}
                  alt="Dark chocolate close-up"
                  loading="lazy"
                  className="h-[420px] w-full object-cover transition-transform duration-[1.3s] ease-luxe group-hover:scale-105 sm:h-[540px] lg:h-[620px]"
                />
                {/* Gradient + caption overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso via-espresso/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                  <span className="eyebrow">
                    <span className="gold-rule" /> Questions
                  </span>
                  <h2 className="heading-lg mt-3">Frequently asked</h2>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/75">
                    Everything you need to know about our chocolate, shipping and
                    care. Can't find it here? Just send us a note above.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Accordion cards */}
            <Reveal variant="right" delay={0.12}>
              <Accordion items={faqs} />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="label-luxe">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-caramel">{error}</span>}
    </label>
  );
}
