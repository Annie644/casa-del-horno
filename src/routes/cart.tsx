import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { TopAppBar } from "@/components/TopAppBar";
import { useCart } from "@/lib/cart-context";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Carrito · Casa del Horno" },
      { name: "description", content: "Revisa tu pedido antes de pagar." },
      { property: "og:title", content: "Carrito · Casa del Horno" },
      { property: "og:description", content: "Tu pedido de panadería." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, subtotal } = useCart();
  const shipping = items.length ? 2.5 : 0;
  const total = subtotal + shipping;

  return (
    <>
      <TopAppBar />
      <main className="flex-1 px-5 pb-6">
        <section className="mt-2">
          <p className="text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">
            Tu pedido
          </p>
          <h1 className="mt-1 font-display text-3xl">Carrito</h1>
        </section>

        {items.length === 0 ? (
          <div className="mt-16 flex flex-col items-center text-center">
            <div className="grid place-items-center h-20 w-20 rounded-3xl bg-tone-100">
              <ShoppingBag className="h-8 w-8 text-tone-600" />
            </div>
            <p className="mt-4 font-display text-lg">Aún vacío</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Explora la panadería y añade algo delicioso.
            </p>
            <Link
              to="/bakery"
              className="mt-6 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold"
            >
              Ir a la panadería
            </Link>
          </div>
        ) : (
          <>
            {/* Items — no dividers, tonal layering */}
            <div className="mt-5 rounded-3xl overflow-hidden">
              {items.map((item, i) => {
                const tones = [
                  "bg-tone-50",
                  "bg-tone-100",
                  "bg-tone-200",
                  "bg-tone-100",
                ];
                return (
                  <div
                    key={item.product.id}
                    className={`${tones[i % tones.length]} px-3 py-3 flex gap-3 items-center`}
                  >
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-background">
                      <img
                        src={item.product.image}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display truncate">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        ${item.product.price.toFixed(2)} c/u
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex items-center gap-1 rounded-full bg-background p-0.5">
                          <button
                            onClick={() =>
                              setQty(item.product.id, item.qty - 1)
                            }
                            className="grid place-items-center h-7 w-7 rounded-full text-tone-800"
                            aria-label="Restar"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold">
                            {item.qty}
                          </span>
                          <button
                            onClick={() =>
                              setQty(item.product.id, item.qty + 1)
                            }
                            className="grid place-items-center h-7 w-7 rounded-full text-tone-800"
                            aria-label="Sumar"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button
                          onClick={() => remove(item.product.id)}
                          aria-label="Eliminar"
                          className="grid place-items-center h-7 w-7 rounded-full bg-background text-tone-700"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="font-semibold text-sm text-tone-900">
                      ${(item.product.price * item.qty).toFixed(2)}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="mt-5 rounded-3xl bg-card border border-tone-100 p-4 space-y-2">
              <Row label="Subtotal" value={subtotal} />
              <Row label="Envío" value={shipping} />
              <div className="h-px bg-tone-100 my-1" />
              <Row label="Total" value={total} strong />
            </div>

            <Link
              to="/checkout"
              className="mt-5 block rounded-2xl bg-primary text-primary-foreground py-4 text-center font-semibold text-base active:scale-[0.98] transition"
            >
              Proceder al pago
            </Link>
          </>
        )}
      </main>
    </>
  );
}

function Row({
  label,
  value,
  strong,
}: {
  label: string;
  value: number;
  strong?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between ${strong ? "font-display text-lg" : "text-sm text-muted-foreground"}`}
    >
      <span>{label}</span>
      <span className={strong ? "text-tone-900" : ""}>
        ${value.toFixed(2)}
      </span>
    </div>
  );
}
