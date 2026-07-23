import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/products";

type Props = {
  product: Product;
  size?: "sm" | "md" | "lg" | "wide";
};

export function ProductCard({ product, size = "md" }: Props) {
  const heights: Record<NonNullable<Props["size"]>, string> = {
    sm: "h-40",
    md: "h-52",
    lg: "h-72",
    wide: "h-40",
  };

  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="group relative block overflow-hidden rounded-3xl bg-tone-100"
    >
      <div className={`relative ${heights[size]} w-full overflow-hidden`}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-tone-900/70 via-tone-900/10 to-transparent" />
        {product.tags[0] && (
          <span className="absolute top-3 left-3 rounded-full glass-panel px-2.5 py-1 text-[10px] font-medium text-tone-800">
            {product.tags[0]}
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 p-3">
          <p className="font-display text-white text-base leading-tight drop-shadow">
            {product.name}
          </p>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-accent font-semibold text-sm">
              ${product.price.toFixed(2)}
            </span>
            <span className="grid place-items-center h-7 w-7 rounded-full bg-accent text-accent-foreground text-sm font-bold">
              +
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
