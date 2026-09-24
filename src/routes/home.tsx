import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Bell } from "lucide-react";
import { TopAppBar } from "@/components/TopAppBar";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/data/products";
import { toast } from "sonner";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Casa del Horno · Pan recién horneado" },
      {
        name: "description",
        content: "Descubre nuestros panes, pasteles y bebidas artesanales. Pide desde tu móvil.",
      },
      { property: "og:title", content: "Casa del Horno" },
      {
        property: "og:description",
        content: "Pan recién horneado, del horno a tu puerta.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = products.filter((p) => p.featured);
  const rest = products.filter((p) => !p.featured);

  return (
    <>
      <TopAppBar
        showBack={false}
        right={
          <button
            onClick={() =>
              toast("Notificaciones", {
                description: "No tienes avisos nuevos.",
              })
            }
            aria-label="Notificaciones"
            className="grid place-items-center h-10 w-10 rounded-full bg-tone-100 text-tone-800"
          >
            <Bell className="h-5 w-5" />
          </button>
        }
      />

      <main className="flex-1 px-5 pb-6">
        <section className="pt-2">
          <p className="text-sm text-muted-foreground">Buenos días,</p>
          <h1 className="font-display text-3xl leading-tight">¿Qué horneamos hoy?</h1>
        </section>

        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-tone-100 px-4 py-3">
          <Search className="h-4 w-4 text-tone-600 shrink-0" />
          <input
            placeholder="Buscar pan, pasteles..."
            className="flex-1 bg-transparent focus:outline-none text-sm placeholder:text-tone-600"
          />
        </div>

        <section className="mt-6">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-lg">Categorías</h2>
            <Link to="/bakery" className="text-xs text-primary font-medium">
              Ver todo
            </Link>
          </div>
          <div className="mt-3 flex gap-3 overflow-x-auto -mx-5 px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((c) => (
              <Link
                key={c.id}
                to="/bakery"
                className="shrink-0 w-20 flex flex-col items-center gap-1.5 group"
              >
                <div className="grid place-items-center h-16 w-16 rounded-2xl bg-gradient-to-br from-tone-100 to-tone-200 text-2xl group-hover:from-tone-200 group-hover:to-tone-300 transition">
                  {c.icon}
                </div>
                <span className="text-xs font-medium text-tone-800">{c.name}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-lg">Recién horneado</h2>
            <Link to="/bakery" className="text-xs text-primary font-medium">
              Explorar
            </Link>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {featured[0] && (
              <div className="col-span-2">
                <ProductCard product={featured[0]} size="lg" />
              </div>
            )}
            {featured[1] && <ProductCard product={featured[1]} size="md" />}
            {featured[2] && <ProductCard product={featured[2]} size="md" />}
            {rest.slice(0, 2).map((p) => (
              <ProductCard key={p.id} product={p} size="sm" />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
