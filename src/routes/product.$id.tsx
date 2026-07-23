import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { TopAppBar } from "@/components/TopAppBar";
import { getProduct } from "@/data/products";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Producto no encontrado" }] };
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} · El Buen Horno` },
        { name: "description", content: product.description },
        { property: "og:title", content: `${product.name} · El Buen Horno` },
        { property: "og:description", content: product.description },
      ],
    };
  },
  component: ProductDetail,
  notFoundComponent: () => (
    <div className="px-6 py-24 text-center">
      <p className="font-display text-xl">Producto no encontrado</p>
    </div>
  ),
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const [qty, setQty] = useState(1);
  const { add } = useCart();
  const navigate = useNavigate();

  const handleAdd = () => {
    add(product, qty);
    toast.success(`${product.name} agregado al carrito`, {
      description: `Cantidad: ${qty}`,
    });
    navigate({ to: "/cart" });
  };

  return (
    <div className="relative">
      <TopAppBar variant="suppressed" showBack />

      <main className="px-5 pb-32">
        {/* Hero image */}
        <div className="relative h-80 -mx-5 overflow-hidden rounded-b-[2.5rem] bg-tone-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mt-5">
          <div className="flex items-start justify-between gap-4">
            <h1 className="font-display text-3xl leading-tight">
              {product.name}
            </h1>
            <p className="shrink-0 font-display text-2xl text-accent">
              ${product.price.toFixed(2)}
            </p>
          </div>

          {/* Bento tags */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            {product.tags.slice(0, 2).map((t: string, i: number) => (
              <div

                key={t}
                className={`rounded-2xl px-3 py-2 text-[11px] font-medium ${
                  i === 0
                    ? "col-span-2 bg-primary text-primary-foreground"
                    : "bg-tone-100 text-tone-800"
                }`}
              >
                {t}
              </div>
            ))}
            <div className="col-span-3 rounded-2xl bg-tone-100 px-3 py-2 text-[11px] font-medium text-tone-800">
              ⏱ {product.prepTime}
            </div>
          </div>

          {/* Description */}
          <section className="mt-6">
            <h2 className="font-display text-lg">Sobre este producto</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          </section>

          {/* Ingredients — tonal layering */}
          <section className="mt-6">
            <h2 className="font-display text-lg">Ingredientes</h2>
            <div className="mt-3 space-y-1.5">
              {product.ingredients.map((ing: string, i: number) => {
                const tones = [
                  "bg-tone-100 text-tone-800",
                  "bg-tone-200 text-tone-800",
                  "bg-tone-300 text-tone-900",
                  "bg-tone-400 text-tone-900",
                  "bg-tone-500 text-white",
                  "bg-tone-600 text-white",
                ];
                return (
                  <div
                    key={ing}
                    className={`rounded-2xl px-4 py-3 text-sm font-medium ${tones[i % tones.length]}`}
                  >
                    {ing}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      {/* Fixed bottom bar */}
      <div className="fixed bottom-0 inset-x-0 z-20 pointer-events-none">
        <div className="mobile-shell px-5 pb-6 pt-3">
          <div className="pointer-events-auto glass-panel rounded-3xl p-2 flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-2xl bg-tone-100 p-1">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid place-items-center h-9 w-9 rounded-xl bg-background text-tone-800"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-6 text-center font-semibold text-sm">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="grid place-items-center h-9 w-9 rounded-xl bg-background text-tone-800"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={handleAdd}
              className="flex-1 rounded-2xl bg-primary text-primary-foreground py-3 font-semibold text-sm active:scale-[0.98] transition"
            >
              Agregar · ${(product.price * qty).toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
