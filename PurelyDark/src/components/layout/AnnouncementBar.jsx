import { Truck, Gem, Leaf, Sparkles } from "lucide-react";

const MESSAGES = [
  { icon: Truck, text: "Complimentary shipping on orders over Rs. 2000" },
  { icon: Sparkles, text: "New: Limited Edition single-origin bars now live" },
  { icon: Gem, text: "Hand-crafted in small batches · Bean to bar" },
  { icon: Leaf, text: "Ethically sourced cocoa from 15 origins" },
];

/* One half of the track. Messages are repeated so a single half always
   exceeds the viewport width — guarantees no gap on ultrawide screens. */
function Half() {
  const items = [...MESSAGES, ...MESSAGES];
  return (
    <div className="flex shrink-0 flex-nowrap items-center">
      {items.map(({ icon: Icon, text }, i) => (
        <span key={i} className="flex items-center whitespace-nowrap">
          <Icon size={13} aria-hidden="true" className="shrink-0 text-gold" />
          <span className="ml-2.5 text-[#D8C8B5]">{text}</span>
          <span aria-hidden="true" className="mx-6 text-gold/60 sm:mx-9">✦</span>
        </span>
      ))}
    </div>
  );
}

export default function AnnouncementBar() {
  return (
    <div
      className="announcement-bar fixed inset-x-0 top-0 z-[82] flex h-9 w-full items-center overflow-hidden bg-espresso text-[0.65rem] font-medium uppercase leading-none tracking-[0.12em] text-[#D8C8B5] sm:text-[0.7rem] sm:tracking-wider"
      role="region"
      aria-label="Store announcements"
    >
      <div className="animate-marquee flex w-max flex-nowrap items-center">
        <div aria-label="Announcements">
          <Half />
        </div>
        <div aria-hidden="true">
          <Half />
        </div>
      </div>
    </div>
  );
}
