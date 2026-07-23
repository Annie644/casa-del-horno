import { Link, useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";

type Props = {
  product: Product;
  size?: "sm" | "md" | "lg" | "wide";
};

export function ProductCard({ product, size = "md" }: Props) {
  const { add } = useCart();
  const navigate = useNavigate();

  const heights: Record<NonNullable<Props["size"]>, string> = {
    sm: "h-36 sm:h-40",
    md: "h-44 sm:h-52",
    lg: "h-60 sm:h-72",
    wide: "h-36 sm:h-40",
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add(product, 1);
    toast.success(`${product.name} agregado`, {
      description: "Ver carrito",
      action: {
        label: "Ir",
        onClick: () => navigate({ to: "/cart" }),
      },
    });
  };

  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-tone-100"
    >
      <div className={`relative ${heights[size]} w-full overflow-hidden`}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-tone-900/60 via-tone-900/10 to-transparent" />
        {product.tags[0] && (
          <span className="absolute top-3 left-3 rounded-full glass-panel px-2.5 py-1 text-[10px] font-medium text-tone-800">
            {product.tags[0]}
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-col gap-1 p-3">
        <p className="font-display text-tone-900 text-base leading-tight truncate">
          {product.name}
        </p>
        <p className="text-[11px] leading-snug text-muted-foreground line-clamp-2 min-h-[2.4em]">
          {product.description}
        </p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="font-display text-accent font-semibold text-base shrink-0">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAdd}
            aria-label={`Agregar ${product.name} al carrito`}
            className="inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground px-3 py-1.5 text-[11px] font-semibold shadow-sm active:scale-95 transition"
          >
            <Plus className="h-3.5 w-3.5" />
            Agregar
          </button>
        </div>
      </div>
    </Link>
  );
}
