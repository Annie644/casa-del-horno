import { createFileRoute } from "@tanstack/react-router";
import { LifeBuoy } from "lucide-react";
import { toast } from "sonner";
import { TopAppBar } from "@/components/TopAppBar";
import { OrderCard } from "@/components/OrderCard";
import { pastOrders } from "@/data/orders";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "Historial · Casa del Horno" },
      {
        name: "description",
        content: "Tus pedidos activos y recientes en Casa del Horno.",
      },
      { property: "og:title", content: "Historial · Casa del Horno" },
      { property: "og:description", content: "Tus pedidos anteriores." },
    ],
  }),
  component: OrdersPage,
});

function OrdersPage() {
  const active = pastOrders.filter((o) => o.status === "Activa");
  const recent = pastOrders.filter((o) => o.status !== "Activa");

  return (
    <>
      <TopAppBar />
      <main className="flex-1 px-5 pb-6">
        <section className="mt-2">
          <p className="text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">
            Tus pedidos
          </p>
          <h1 className="mt-1 font-display text-3xl">Historial</h1>
        </section>

        {active.length > 0 && (
          <section className="mt-6">
            <h2 className="font-display text-base mb-3">En curso</h2>
            <div className="space-y-3">
              {active.map((o) => (
                <OrderCard key={o.id} order={o} />
              ))}
            </div>
          </section>
        )}

        <section className="mt-6">
          <h2 className="font-display text-base mb-3">Anteriores</h2>
          <div className="space-y-3">
            {recent.map((o) => (
              <OrderCard key={o.id} order={o} />
            ))}
          </div>
        </section>

        {/* Support */}
        <section className="mt-8">
          <button
            onClick={() =>
              toast("Soporte no disponible por ahora", {
                description: "Escríbenos a hola@elbuenhorno.com",
              })
            }
            className="w-full flex items-center gap-3 rounded-3xl bg-tone-100 p-4 text-left hover:bg-tone-200 transition"
          >
            <div className="grid place-items-center h-11 w-11 rounded-2xl bg-background text-primary">
              <LifeBuoy className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-display text-base">¿Necesitas ayuda?</p>
              <p className="text-xs text-muted-foreground">
                Contacta a nuestro equipo de soporte
              </p>
            </div>
          </button>
        </section>
      </main>
    </>
  );
}
