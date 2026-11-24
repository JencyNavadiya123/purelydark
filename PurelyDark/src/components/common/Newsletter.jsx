import { useState } from "react";
import { Send, Sparkles } from "lucide-react";
import Reveal from "./Reveal";
import { useToast } from "../../context/ToastContext";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const submit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast("Please enter a valid email address", "info");
      return;
    }
    toast("Welcome to PurelyDark. Check your inbox.");
    setEmail("");
  };

  return (
    <section className="section">
      <div className="container-luxe">
        <Reveal className="relative overflow-hidden rounded-3xl border border-gold/20 bg-choco-gradient px-6 py-14 text-center sm:px-16 sm:py-20">
          <div className="pointer-events-none absolute inset-0 bg-radial-glow" />
          <div className="relative mx-auto max-w-xl">
            <span className="eyebrow mx-auto justify-center">
              <Sparkles size={14} /> The Inner Circle
            </span>
            <h2 className="heading-md mt-4">
              Join the PurelyDark maison
            </h2>
            <p className="lede mt-4">
              Early access to limited editions, tasting notes from our chocolatiers,
              and 10% off your first order.
            </p>
            <form onSubmit={submit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="input-luxe flex-1"
                aria-label="Email address"
              />
              <button type="submit" className="btn-gold shrink-0">
                <Send size={16} /> Subscribe
              </button>
            </form>
            <p className="mt-4 text-xs text-cream/40">
              No spam, only chocolate. Unsubscribe anytime.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
