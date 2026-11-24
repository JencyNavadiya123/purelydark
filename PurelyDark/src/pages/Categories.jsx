import PageHero from "../components/layout/PageHero";
import CategoryCard from "../components/category/CategoryCard";
import { StaggerGroup, StaggerItem } from "../components/common/Reveal";
import { categories } from "../data/categories";

export default function Categories() {
  return (
    <>
      <PageHero
        eyebrow="Explore"
        title="Our Categories"
        subtitle="Fifteen distinct expressions of dark chocolate — each with its own character, cocoa intensity and story."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Categories" }]}
        seed={3}
      />
      <section className="section">
        <div className="container-luxe">
          <StaggerGroup className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {categories.map((c) => (
              <StaggerItem key={c.id}>
                <CategoryCard category={c} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  );
}
