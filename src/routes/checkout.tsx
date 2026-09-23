import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CreditCard, Wallet, Banknote, Lock } from "lucide-react";
import { TopAppBar } from "@/components/TopAppBar";
import { useCart } from "@/lib/cart-context";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Pago · Casa del Horno" },
      { name: "description", content: "Completa tu pedido de forma segura." },
      { property: "og:title", content: "Pago · Casa del Horno" },
      { property: "og:description", content: "Finaliza tu pedido." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CheckoutPage,
});

const methods = [
  { id: "card", label: "Tarjeta", icon: CreditCard },
  { id: "cash", label: "Efectivo", icon: Banknote },
  { id: "wallet", label: "Wallet", icon: Wallet },
] as const;

function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [method, setMethod] = useState<(typeof methods)[number]["id"]>("card");
  const navigate = useNavigate();
  const shipping = items.length ? 2.5 : 0;
  const total = subtotal + shipping;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    clear();
    navigate({ to: "/confirmation" });
  };

  return (
    <div className="min-h-[100dvh] bg-tone-50">
      <TopAppBar showBack />

      <form onSubmit={handleConfirm} className="px-5 pb-8">
        {/* Header */}
        <section className="mt-2">
          <p className="text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">
            Paso final
          </p>
          <h1 className="mt-1 font-display text-3xl text-tone-900">Pago</h1>
          <p className="mt-1 text-sm text-tone-600">
            {items.length} {items.length === 1 ? "producto" : "productos"} · listos para hornear
          </p>
        </section>

        {/* Method selection */}
        <section className="mt-6">
          <h2 className="font-display text-base text-tone-900">Método de pago</h2>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {methods.map((m) => {
              const Icon = m.icon;
              const active = method === m.id;
              return (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={`flex flex-col items-center gap-2 rounded-2xl p-3 transition ${
                    active
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "bg-white border border-tone-200 text-tone-800"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{m.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Payment details */}
        {method === "card" && (
          <section className="mt-5 space-y-3">
            <h2 className="font-display text-base text-tone-900">Datos de la tarjeta</h2>
            <Field label="Nombre del titular" placeholder="Tu nombre" />
            <Field
              label="Número de tarjeta"
              placeholder="0000 0000 0000 0000"
              inputMode="numeric"
            />
            <div className="grid grid-cols-2 gap-3">
              <Field label="MM / AA" placeholder="12 / 27" />
              <Field label="CVV" placeholder="123" inputMode="numeric" />
            </div>
          </section>
        )}
        {method === "cash" && (
          <section className="mt-5 rounded-2xl bg-white border border-tone-200 p-4 text-sm text-tone-800">
            Paga en efectivo al recibir. Ten el monto exacto listo.
          </section>
        )}
        {method === "wallet" && (
          <section className="mt-5 rounded-2xl bg-white border border-tone-200 p-4 text-sm text-tone-800">
            Confirma el pago desde tu app de wallet al finalizar.
          </section>
        )}

        {/* Glass order summary */}
        <section className="mt-6">
          <div className="glass-panel rounded-3xl p-5">
            <div className="flex items-center justify-between">
              <p className="font-display text-lg text-tone-900">Resumen</p>
              <span className="text-[10px] uppercase tracking-widest text-tone-500">
                Pedido
              </span>
            </div>
            <div className="mt-3 space-y-1.5">
              {items.slice(0, 3).map((i) => (
                <div
                  key={i.product.id}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="truncate text-tone-800">
                    {i.qty}× {i.product.name}
                  </span>
                  <span className="text-tone-900 font-medium">
                    ${(i.product.price * i.qty).toFixed(2)}
                  </span>
                </div>
              ))}
              {items.length > 3 && (
                <p className="text-xs text-tone-500">
                  +{items.length - 3} más
                </p>
              )}
              {items.length === 0 && (
                <p className="text-sm text-tone-500">Tu carrito está vacío.</p>
              )}
            </div>
            <div className="mt-3 pt-3 border-t border-tone-200/70 space-y-1.5 text-sm">
              <Row label="Subtotal" value={subtotal} />
              <Row label="Envío" value={shipping} />
              <div className="flex items-center justify-between pt-2 font-display text-xl text-tone-900">
                <span>Total</span>
                <span className="text-accent">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Confirm CTA */}
        <section className="mt-6 space-y-3">
          <button
            type="submit"
            disabled={items.length === 0}
            className="w-full rounded-2xl bg-accent text-accent-foreground py-4 font-semibold text-base shadow-lg shadow-accent/30 active:scale-[0.98] transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Lock className="h-4 w-4" />
            Confirmar y pagar · ${total.toFixed(2)}
          </button>
          <p className="text-center text-[11px] text-tone-500">
            Pago 100% seguro · Transacción encriptada
          </p>
        </section>
      </form>
    </div>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between text-tone-700">
      <span>{label}</span>
      <span>${value.toFixed(2)}</span>
    </div>
  );
}

function Field({
  label,
  placeholder,
  inputMode,
}: {
  label: string;
  placeholder: string;
  inputMode?: "numeric" | "text";
}) {
  return (
    <label className="block rounded-2xl bg-white border border-tone-200 px-4 py-2.5">
      <span className="text-[10px] uppercase tracking-widest text-tone-500">
        {label}
      </span>
      <input
        type="text"
        inputMode={inputMode}
        placeholder={placeholder}
        className="mt-0.5 w-full bg-transparent focus:outline-none text-base text-tone-900 placeholder:text-tone-400"
      />
    </label>
  );
}
