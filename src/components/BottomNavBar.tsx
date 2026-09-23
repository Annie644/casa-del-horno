import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Croissant, ShoppingBag, Clock } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const items = [
  { to: "/home", label: "Inicio", icon: Home },
  { to: "/bakery", label: "Bakery", icon: Croissant },
  { to: "/cart", label: "Carrito", icon: ShoppingBag },
  { to: "/orders", label: "Historial", icon: Clock },
] as const;

export function BottomNavBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { count } = useCart();

  return (
    <nav className="sticky bottom-0 z-30 pb-3 pt-2 px-4">
      <div className="glass-panel rounded-3xl flex items-center justify-between px-2 py-2">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || pathname.startsWith(to + "/");
          return (
            <Link
              key={to}
              to={to}
              className={`relative flex-1 flex flex-col items-center gap-1 py-2 rounded-2xl transition ${
                active ? "bg-primary text-primary-foreground" : "text-tone-700 hover:bg-tone-100"
              }`}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {to === "/cart" && count > 0 && (
                  <span className="absolute -top-2 -right-2 grid place-items-center h-4 min-w-4 px-1 rounded-full bg-accent text-accent-foreground text-[10px] font-bold">
                    {count}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
