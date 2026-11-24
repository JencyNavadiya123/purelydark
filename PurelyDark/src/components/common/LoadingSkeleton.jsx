import { range } from "../../utils/format";

export function ProductCardSkeleton() {
  return (
    <div className="card overflow-hidden">
      <div className="skeleton aspect-square w-full" />
      <div className="space-y-3 p-5">
        <div className="skeleton h-3 w-1/3 rounded" />
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-4 w-1/2 rounded" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
      {range(count).map((i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function LineSkeleton({ className = "" }) {
  return <div className={`skeleton h-4 rounded ${className}`} />;
}

export default ProductGridSkeleton;
