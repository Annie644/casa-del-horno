import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TopAppBar } from "@/components/TopAppBar";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/data/products";

export const Route = createFileRoute("/bakery")({
  head: () => ({
    meta: [
      { title: "Nuestra panadería · Casa del Horno" },
      {
        name: "description",
        content: "Catálogo completo de panes, pasteles, galletas y bebidas artesanales.",
      },
      { property: "og:title", content: "Nuestra panadería · Casa del Horno" },
      {
        property: "og:description",
        content: "Explora todo lo que horneamos hoy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BakeryPage,
});

function BakeryPage() {
  const [active, setActive] = useState("all");
  const filtered = active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <>
      <TopAppBar />
      <main className="flex-1 px-5 pb-6">
        {/* Hero editorial */}
        <section className="mt-2">
          <p className="text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">
            Bread Box · No. 12
          </p>
          <h1 className="mt-2 font-display text-4xl leading-[1.05]">
            Nuestra
            <br />
            panadería.
          </h1>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            Horneado en piedra cada mañana. Recetas heredadas, ingredientes de temporada.
          </p>
        </section>

        {/* Filter pills */}
        <div className="mt-6 flex gap-2 overflow-x-auto -mx-5 px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((c) => {
            const isActive = active === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-tone-100 text-tone-800 hover:bg-tone-200"
                }`}
              >
                <span className="mr-1.5">{c.icon}</span>
                {c.name}
              </button>
            );
          })}
        </div>

        {/* Bento grid */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          {filtered.map((p, i) => {
            // Every 5th item spans two columns for asymmetric feel
            const wide = i % 5 === 0 && filtered.length > 3;
            return (
              <div key={p.id} className={wide ? "col-span-2" : ""}>
                <ProductCard product={p} size={wide ? "lg" : "md"} />
              </div>
            );
          })}
          {filtered.length === 0 && (
            <p className="col-span-2 text-center text-sm text-muted-foreground py-12">
              Sin productos en esta categoría.
            </p>
          )}
        </div>
      </main>
    </>
  );
}
