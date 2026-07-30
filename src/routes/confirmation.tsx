import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { TopAppBar } from "@/components/TopAppBar";
import sourdough from "@/assets/product-sourdough.jpg";

export const Route = createFileRoute("/confirmation")({
  head: () => ({
    meta: [
      { title: "¡Pedido confirmado! · Casa del Horno" },
      {
        name: "description",
        content: "Tu pedido está en el horno. Gracias por elegirnos.",
      },
      { property: "og:title", content: "¡Pedido confirmado!" },
      { property: "og:description", content: "Tu pedido está en el horno." },
    ],
  }),
  component: ConfirmationPage,
});

function ConfirmationPage() {
  const orderId = "EBH-" + Math.floor(Math.random() * 9000 + 1000);
  const time = new Date().toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <TopAppBar variant="suppressed" />

      <main className="px-5 pb-10 flex-1 flex flex-col">
        {/* Success illustration */}
        <div className="mt-4 flex flex-col items-center text-center">
          <div className="relative">
            <div className="absolute inset-0 -m-6 rounded-full bg-accent/20 blur-2xl" />
            <div className="relative grid place-items-center h-24 w-24 rounded-full bg-accent text-accent-foreground shadow-lg shadow-accent/40 animate-in zoom-in duration-500">
              <Check className="h-12 w-12" strokeWidth={3} />
            </div>
          </div>

          <h1 className="mt-6 font-display text-3xl leading-tight">
            ¡Al horno!
          </h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-xs">
            Tu pedido fue confirmado. Te avisamos cuando esté listo.
          </p>
        </div>

        {/* Bento details */}
        <section className="mt-8 grid grid-cols-2 gap-3">
          <div className="col-span-2 rounded-3xl bg-primary text-primary-foreground p-4">
            <p className="text-[10px] uppercase tracking-widest text-primary-foreground/70">
              Número de orden
            </p>
            <p className="mt-1 font-display text-2xl">#{orderId}</p>
          </div>
          <div className="rounded-3xl bg-tone-100 p-4">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Hora
            </p>
            <p className="mt-1 font-display text-xl text-tone-900">{time}</p>
          </div>
          <div className="rounded-3xl bg-tone-100 p-4">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Estado
            </p>
            <p className="mt-1 font-display text-xl text-tone-900">Horneando</p>
          </div>
          <div className="col-span-2 relative overflow-hidden rounded-3xl h-40">
            <img
              src={sourdough}
              alt="Pan recién horneado"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-tone-900/70 to-transparent" />
            <p className="absolute bottom-3 left-4 font-display text-white text-lg">
              Recién salido del horno
            </p>
          </div>
        </section>

        {/* CTAs */}
        <div className="mt-auto pt-8 space-y-2">
          <Link
            to="/orders"
            className="block rounded-2xl bg-primary text-primary-foreground py-4 text-center font-semibold"
          >
            Ver mi pedido
          </Link>
          <Link
            to="/home"
            className="block rounded-2xl bg-tone-100 text-tone-900 py-4 text-center font-semibold"
          >
            Volver al inicio
          </Link>
        </div>
      </main>
    </>
  );
}
