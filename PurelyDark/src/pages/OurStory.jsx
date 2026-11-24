import { motion } from "framer-motion";
import Reveal from "../components/common/Reveal";
import SectionHeading from "../components/common/SectionHeading";
import StoryVideo from "../components/video/StoryVideo";
import ChocolateVideoSection from "../components/video/ChocolateVideoSection";
import Newsletter from "../components/common/Newsletter";
import Breadcrumb from "../components/common/Breadcrumb";
import { img, VIDEOS } from "../utils/assets";

/* Editorial alternating image/text block */
function StoryBlock({ index, eyebrow, title, text, image, reverse }) {
  return (
    <section className="section-tight">
      <div className="container-luxe grid items-center gap-12 lg:grid-cols-2">
        <Reveal variant={reverse ? "right" : "left"} className={reverse ? "lg:order-2" : ""}>
          <div className="overflow-hidden rounded-3xl border border-white/5">
            <img src={image} alt={title} loading="lazy" className="h-full w-full object-cover" />
          </div>
        </Reveal>
        <Reveal variant={reverse ? "left" : "right"} className={reverse ? "lg:order-1" : ""}>
          <span className="eyebrow">
            <span className="gold-rule" /> {String(index).padStart(2, "0")} · {eyebrow}
          </span>
          <h2 className="heading-md mt-3">{title}</h2>
          <p className="lede mt-4">{text}</p>
        </Reveal>
      </div>
    </section>
  );
}

const blocks = [
  { eyebrow: "Our Beginning", title: "A small atelier, a large dream", text: "In 1994, in a modest atelier scented with roasting cocoa, our founder set out to prove that dark chocolate could be an art form. One stone grinder, a handful of beans, and an uncompromising standard.", seed: 0 },
  { eyebrow: "The Inspiration", title: "The inspiration behind our brand", text: "A journey through the cocoa plantations of Madagascar changed everything. There, chocolate was not a commodity but a culture — and we vowed to honour it in every bar we make.", seed: 2 },
  { eyebrow: "Our Passion", title: "Our passion for dark chocolate", text: "We believe the darkest chocolate tells the truest story of the cocoa. No milk to soften it, no excess sugar to mask it — only the pure, complex voice of the bean.", seed: 4 },
  { eyebrow: "Bean to Bar", title: "From cocoa bean to chocolate", text: "Every bar travels the same deliberate path: harvest, ferment, dry, roast, grind, conche, temper, mould. We control each step, because greatness lives in the details.", seed: 5 },
  { eyebrow: "Sourcing", title: "Selecting premium cocoa beans", text: "We taste hundreds of lots to select a few. Our relationships with growers span decades, built on fair prices and a shared devotion to quality.", seed: 9 },
  { eyebrow: "Quality", title: "Our quality promise", text: "Every batch is tasted, tested and judged against a single question: is this the finest chocolate we can make today? If not, it does not leave our kitchen.", seed: 11 },
];

const timeline = [
  ["1994", "The atelier opens with a single stone grinder."],
  ["2001", "First single-origin Madagascar bar released."],
  ["2009", "Awarded Gold at the International Chocolate Awards."],
  ["2015", "Direct-trade partnerships established across 15 origins."],
  ["2020", "Carbon-neutral production achieved."],
  ["Today", "225+ fine chocolates, shipped worldwide."],
];

export default function OurStory() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[80vh] items-center overflow-hidden pt-28">
        <img src={img(9, 1920, 1080)} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/70 to-espresso/50" />
        <div className="container-luxe relative z-[2]">
          <div className="mb-6"><Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Our Story" }]} /></div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <span className="eyebrow"><span className="gold-rule" /> Est. 1994</span>
            <h1 className="heading-xl mt-4">The pursuit of perfect dark</h1>
            <p className="lede mt-5 max-w-xl">
              Three decades. Fifteen origins. One obsession — to make the finest dark chocolate in the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Immersive story video */}
      <StoryVideo
        video={VIDEOS.beans}
        eyebrow="The Journey of the Bean"
        title="It begins in the soil"
        text="Follow a single cocoa pod from a sun-dappled plantation to the heart of our kitchen."
        align="center"
      />

      {blocks.map((b, i) => (
        <StoryBlock key={i} index={i + 1} {...b} image={img(b.seed, 1000, 1100)} reverse={i % 2 === 1} />
      ))}

      {/* Craftsmanship video */}
      <ChocolateVideoSection
        video={VIDEOS.craftsmanship}
        eyebrow="The Art of Craftsmanship"
        title="Mastery, measured in decades"
        text="Our chocolatiers train for years before they temper their first batch unsupervised."
        align="left"
        controls
      />

      {/* Timeline */}
      <section className="section">
        <div className="container-luxe">
          <SectionHeading eyebrow="Our Journey" title="A brand, bar by bar" className="mb-16" />
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-gold/60 to-transparent sm:left-1/2" />
            {timeline.map(([year, text], i) => (
              <Reveal
                key={year}
                delay={i * 0.08}
                className={`relative mb-10 flex gap-6 sm:w-1/2 ${
                  i % 2 ? "sm:ml-auto sm:pl-10" : "sm:pr-10 sm:text-right sm:flex-row-reverse"
                }`}
              >
                <span className="absolute left-4 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full bg-gold sm:left-auto sm:right-0 sm:translate-x-1/2"
                  style={i % 2 ? { left: 0, right: "auto", transform: "translateX(-50%)" } : {}}
                />
                <div className="pl-10 sm:pl-0">
                  <div className="font-serif text-2xl text-gold">{year}</div>
                  <p className="mt-1 text-sm text-cream/70">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-cocoa/30">
        <div className="container-luxe grid gap-8 md:grid-cols-3">
          {[
            ["Sustainability & Ethical Sourcing", "Direct-trade partnerships, fair prices, and carbon-neutral production. We protect the land that feeds our craft."],
            ["Our Mission & Vision", "To elevate dark chocolate to the status it deserves — and to make every bar a reason to pause and savour."],
            ["Our Philosophy", "Let the cocoa speak. We add nothing that hides it and remove nothing that defines it."],
          ].map(([title, text], i) => (
            <Reveal key={title} delay={i * 0.1} className="card p-8">
              <div className="mb-4 font-serif text-5xl text-gold/30">0{i + 1}</div>
              <h3 className="font-serif text-xl text-cream">{title}</h3>
              <p className="mt-3 text-sm text-cream/60">{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Newsletter />
    </>
  );
}
