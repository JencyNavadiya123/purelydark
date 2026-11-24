import { useParams, Navigate } from "react-router-dom";
import PageHero from "../components/layout/PageHero";
import ProductBrowser from "../components/product/ProductBrowser";
import { getCollectionBySlug, getCollectionProducts } from "../data/collections";
import { VIDEOS } from "../utils/assets";

export default function CollectionDetails() {
  const { collectionSlug } = useParams();
  const collection = getCollectionBySlug(collectionSlug);

  if (!collection) return <Navigate to="/collections" replace />;

  const products = getCollectionProducts(collection.slug);

  return (
    <>
      <PageHero
        eyebrow={`${collection.count} pieces`}
        title={collection.name}
        subtitle={collection.description}
        video={VIDEOS.chocolateBar}
        image={collection.banner}
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "Collections", to: "/collections" },
          { label: collection.name },
        ]}
      />
      <ProductBrowser products={products} />
    </>
  );
}
