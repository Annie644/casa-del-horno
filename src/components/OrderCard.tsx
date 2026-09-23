import type { PastOrder } from "@/data/orders";

const statusStyles: Record<PastOrder["status"], string> = {
  Activa: "bg-accent text-accent-foreground",
  Reciente: "bg-tone-200 text-tone-800",
  Entregada: "bg-tone-100 text-tone-700",
};

export function OrderCard({ order }: { order: PastOrder }) {
  return (
    <article className="flex gap-3 p-3 rounded-3xl bg-card border border-tone-100">
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-tone-100">
        <img src={order.image} alt="" loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Orden #{order.id}
            </p>
            <p className="font-display truncate text-base">{order.productName}</p>
          </div>
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusStyles[order.status]}`}
          >
            {order.status}
          </span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <p className="text-xs text-muted-foreground">
            {order.date} · {order.itemCount} items
          </p>
          <p className="font-semibold text-sm text-tone-800">${order.total.toFixed(2)}</p>
        </div>
      </div>
    </article>
  );
}
