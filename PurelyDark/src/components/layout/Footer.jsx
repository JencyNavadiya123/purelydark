import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Youtube, Send } from "lucide-react";
import Logo from "./Logo";
import BackgroundVideo from "../video/BackgroundVideo";
import { FOOTER_LINKS } from "../../data/nav";
import { VIDEOS } from "../../utils/assets";

export default function Footer() {
  return (
    <footer className="relative mt-16 w-full overflow-hidden">
      {/* Full-width looping chocolate background */}
      <div className="absolute inset-0 opacity-25">
        <BackgroundVideo video={VIDEOS.footer} overlay="gradient" />
      </div>

      {/* Inner content stays in a responsive container */}
      <div className="relative">
        <div className="grid w-full gap-12 px-5 py-16 sm:px-8 lg:px-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-cream/60">
              A maison devoted to the art of dark chocolate — single-origin cocoa,
              slow-conched, and crafted in small batches for the discerning palate.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-cream/70 transition-all hover:border-gold hover:text-gold"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-luxe text-gold">
                {title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-sm text-cream/60 transition-colors hover:text-gold">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div>
          {/* subtle gold rule instead of a white line */}
          <div className="mx-5 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent sm:mx-8 lg:mx-12" />
          <div className="flex w-full flex-col items-center justify-between gap-4 px-5 py-6 text-xs text-cream/40 sm:flex-row sm:px-8 lg:px-12">
            <p>© {new Date().getFullYear()} PurelyDark Maison du Cacao. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <Send size={13} className="text-gold" />
              <span>Crafted with passion · Bean to bar</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
