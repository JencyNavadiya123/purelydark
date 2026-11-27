import PageHero from "../components/layout/PageHero";
import CategoryCard from "../components/category/CategoryCard";
import { ScrollReveal } from "../components/common/Parallax";
import { categories } from "../data/categories";
import { VIDEOS } from "../utils/assets";

export default function Categories() {
  return (
    <>
      <PageHero
        eyebrow="Explore"
        title="Our Categories"
        subtitle="Fifteen distinct expressions of dark chocolate — each with its own character, cocoa intensity and story."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Categories" }]}
        video={VIDEOS.pouring}
        videoOpacity={1}
        seed={3}
      />
      <section className="section">
        <div className="container-luxe">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {categories.map((c) => (
              <ScrollReveal key={c.id}>
                <CategoryCard category={c} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
