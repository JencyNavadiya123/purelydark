import { useState } from "react";
import Hero from "../components/home/Hero";
import FeaturedCollections from "../components/home/FeaturedCollections";
import ShopByCategory from "../components/home/ShopByCategory";
import BestSellers from "../components/home/BestSellers";
import ProcessSection from "../components/home/ProcessSection";
import StoryPreview from "../components/home/StoryPreview";
import InstagramGallery from "../components/home/InstagramGallery";
import ChocolateVideoSection from "../components/video/ChocolateVideoSection";
import Testimonials from "../components/common/Testimonials";
import Newsletter from "../components/common/Newsletter";
import QuickViewModal from "../components/product/QuickViewModal";
import { getBestSellers } from "../data/products";
import { VIDEOS } from "../utils/assets";

export default function Home() {
  const [quickView, setQuickView] = useState(null);
  const bestSellers = getBestSellers(10);

  return (
    <>
      <Hero />
      <FeaturedCollections />
      <ShopByCategory />
      <BestSellers products={bestSellers} onQuickView={setQuickView} />
      <ProcessSection />

      {/* Cinematic craftsmanship video band */}
      <ChocolateVideoSection
        video={VIDEOS.craftsmanship}
        eyebrow="The Art of Craftsmanship"
        title="Patience, poured into every bar"
        text="Tempered by hand, conched for days, finished with a flawless snap. This is chocolate as it was meant to be made."
        align="center"
      />

      <StoryPreview />
      <Testimonials />
      <InstagramGallery />
      <Newsletter />

      <QuickViewModal product={quickView} open={!!quickView} onClose={() => setQuickView(null)} />
    </>
  );
}
