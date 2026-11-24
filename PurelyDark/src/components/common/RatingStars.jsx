import { Star } from "lucide-react";
import { classNames } from "../../utils/format";

export default function RatingStars({ rating = 0, size = 14, showValue = false, reviews }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5`}>
        {[0, 1, 2, 3, 4].map((i) => {
          const active = i < full || (i === full && half);
          return (
            <Star
              key={i}
              size={size}
              className={classNames(
                active ? "text-gold fill-gold" : "text-cream/25"
              )}
              style={active && i === full && half ? { clipPath: "inset(0 50% 0 0)" } : undefined}
            />
          );
        })}
      </div>
      {showValue && (
        <span className="text-xs text-cream/60">
          {rating.toFixed(1)}
          {reviews != null && <span className="text-cream/40"> ({reviews})</span>}
        </span>
      )}
    </div>
  );
}
