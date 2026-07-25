import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Clock, Flame, ShoppingBag, Heart, Wheat } from "lucide-react";
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
  const [liked, setLiked] = useState(false);
  const { add } = useCart();
  const navigate = useNavigate();

  const handleAdd = () => {
    add(product, qty);
    toast.success(`${product.name} agregado`, {
      description: `Cantidad: ${qty} · $${(product.price * qty).toFixed(2)}`,
      action: { label: "Ver carrito", onClick: () => navigate({ to: "/cart" }) },
    });
  };

  const handleBuyNow = () => {
    add(product, qty);
    navigate({ to: "/cart" });
  };

  return (
    <div className="relative bg-background">
      <TopAppBar variant="suppressed" showBack />

      <main className="pb-6">
        {/* Hero image */}
        <div className="relative h-[320px] overflow-hidden rounded-b-[2.5rem] bg-tone-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-tone-900/40 via-transparent to-transparent" />
          <button
            onClick={() => setLiked((v) => !v)}
            aria-label="Guardar favorito"
            className="absolute top-4 right-4 grid place-items-center h-11 w-11 rounded-full bg-white/90 backdrop-blur-md shadow-lg active:scale-95 transition"
          >
            <Heart
              className={`h-5 w-5 transition ${liked ? "fill-accent text-accent" : "text-tone-700"}`}
            />
          </button>

          <div className="absolute bottom-4 left-5">
            <span className="rounded-full bg-white/95 backdrop-blur-md px-3 py-1.5 text-[11px] font-semibold text-tone-800 shadow-md">
              🔥 Recién horneado
            </span>
          </div>
        </div>

        <div className="px-5 mt-6">
          {/* Title + price */}
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-widest text-tone-500 font-medium">
                {product.category}
              </p>
              <h1 className="font-display text-3xl leading-tight mt-1 text-tone-900">
                {product.name}
              </h1>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-[10px] uppercase tracking-widest text-tone-500">Precio</p>
              <p className="font-display text-2xl text-accent leading-tight">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Info bento */}
          <div className="mt-5 grid grid-cols-3 gap-2">
            <div className="rounded-2xl bg-tone-100 p-3 flex flex-col gap-1">
              <Clock className="h-4 w-4 text-primary" />
              <p className="text-[10px] uppercase tracking-wider text-tone-500">Listo en</p>
              <p className="text-sm font-semibold text-tone-900">{product.prepTime}</p>
            </div>
            <div className="rounded-2xl bg-tone-100 p-3 flex flex-col gap-1">
              <Flame className="h-4 w-4 text-accent" />
              <p className="text-[10px] uppercase tracking-wider text-tone-500">Horneado</p>
              <p className="text-sm font-semibold text-tone-900">Hoy</p>
            </div>
            <div className="rounded-2xl bg-tone-100 p-3 flex flex-col gap-1">
              <Wheat className="h-4 w-4 text-tone-700" />
              <p className="text-[10px] uppercase tracking-wider text-tone-500">Origen</p>
              <p className="text-sm font-semibold text-tone-900">Local</p>
            </div>
          </div>

          {product.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {product.tags.map((t: string) => (
                <span
                  key={t}
                  className="rounded-full bg-primary/10 text-primary px-3 py-1 text-[11px] font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          <section className="mt-6">
            <h2 className="font-display text-lg text-tone-900">Sobre este producto</h2>
            <p className="mt-2 text-sm leading-relaxed text-tone-600">
              {product.description}
            </p>
          </section>

          <section className="mt-6">
            <div className="flex items-baseline justify-between">
              <h2 className="font-display text-lg text-tone-900">Ingredientes</h2>
              <span className="text-[11px] text-tone-500">{product.ingredients.length} items</span>
            </div>
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
                    className={`rounded-2xl px-4 py-3 text-sm font-medium flex items-center gap-3 ${tones[i % tones.length]}`}
                  >
                    <span className="text-xs opacity-60 w-5">0{i + 1}</span>
                    <span>{ing}</span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Inline quantity + Add (always visible in flow) */}
          <section className="mt-8">
            <div className="rounded-3xl bg-tone-100 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-tone-500">Cantidad</p>
                  <p className="font-display text-xl text-tone-900 mt-0.5">
                    ${(product.price * qty).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-1 rounded-2xl bg-background p-1 shadow-sm">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="grid place-items-center h-10 w-10 rounded-xl text-tone-800 hover:bg-tone-200 active:scale-95 transition"
                    aria-label="Disminuir"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-semibold text-base tabular-nums">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="grid place-items-center h-10 w-10 rounded-xl text-tone-800 hover:bg-tone-200 active:scale-95 transition"
                    aria-label="Aumentar"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-5 gap-2">
                <button
                  onClick={handleAdd}
                  className="col-span-2 rounded-2xl bg-white border border-tone-200 text-tone-900 py-3.5 font-semibold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Agregar
                </button>
                <button
                  onClick={handleBuyNow}
                  className="col-span-3 rounded-2xl bg-primary text-primary-foreground py-3.5 font-semibold text-sm shadow-lg shadow-primary/25 active:scale-[0.98] transition"
                >
                  Comprar ahora
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

    </div>
  );
}

