import { Link } from "react-router-dom";
import { Send, Mail, MapPin } from "lucide-react";
import Logo from "./Logo";
import Reveal from "../common/Reveal";
import BackgroundVideo from "../video/BackgroundVideo";
import { FOOTER_LINKS } from "../../data/nav";
import { VIDEOS } from "../../utils/assets";

export default function Footer() {
  return (
    <footer className="relative mt-16 w-full overflow-hidden">
      {/* Full-width looping chocolate background */}
      <div className="absolute inset-0 opacity-80">
        <BackgroundVideo video={VIDEOS.footer} overlay="gradient" />
      </div>
      {/* Light darkening layer so text stays readable over the video */}
      <div className="pointer-events-none absolute inset-0 bg-espresso/30" />

      {/* Top gold hairline */}
      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Inner content stays in a responsive container */}
      <div className="relative">
        <Reveal
          variant="up"
          className="grid w-full gap-12 px-5 py-16 sm:px-8 lg:px-12 md:grid-cols-[1.4fr_repeat(3,1fr)]"
        >
          <div className="max-w-xs">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-cream/60">
              A maison devoted to the art of dark chocolate — single-origin cocoa,
              slow-conched, and crafted in small batches for the discerning palate.
            </p>

            {/* Contact details */}
            <ul className="mt-6 space-y-2.5 text-sm text-cream/60">
              <li className="flex items-center gap-3">
                <Mail size={15} className="shrink-0 text-gold" />
                <a
                  href="mailto:bonjour@purelydark.com"
                  className="transition-colors hover:text-gold"
                >
                  bonjour@purelydark.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={15} className="shrink-0 text-gold" />
                <span>Maison du Cacao · Paris, France</span>
              </li>
            </ul>

          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-luxe text-gold">
                <span className="h-px w-5 bg-gold/50" />
                {title}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="group inline-flex items-center text-sm text-cream/60 transition-colors hover:text-gold"
                    >
                      <span className="mr-0 h-px w-0 bg-gold transition-all duration-300 group-hover:mr-2 group-hover:w-4" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>

        <div>
          {/* subtle gold rule instead of a white line */}
          <div className="mx-5 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent sm:mx-8 lg:mx-12" />
          <div className="flex w-full flex-col items-center justify-between gap-4 px-5 py-6 text-xs text-cream/40 sm:flex-row sm:px-8 lg:px-12">
            <p>
              © {new Date().getFullYear()} PurelyDark Maison du Cacao. All rights
              reserved.
            </p>
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
