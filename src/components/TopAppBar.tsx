import { Link, useRouter, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, LogOut, User as UserIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@/lib/user-context";

type Props = {
  /** "suppressed" hides nav icons; only brand shows */
  variant?: "default" | "suppressed";
  showBack?: boolean;
  title?: string;
  right?: React.ReactNode;
};

function UserMenu() {
  const { user, initial, signOut } = useUser();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Menú de usuario"
        aria-expanded={open}
        className="grid place-items-center h-10 w-10 rounded-full bg-accent text-accent-foreground font-display text-base font-bold shadow-md shadow-accent/25 active:scale-95 transition"
      >
        {initial}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 rounded-2xl glass-panel p-1.5 shadow-xl z-50">
          <div className="px-3 py-2">
            <p className="text-sm font-semibold truncate">
              {user?.name || "Invitado"}
            </p>
            {user?.email && (
              <p className="text-[11px] text-muted-foreground truncate">
                {user.email}
              </p>
            )}
          </div>
          <div className="h-px bg-tone-200 my-1" />
          <button
            onClick={() => {
              setOpen(false);
              navigate({ to: "/profile" });
            }}
            className="w-full flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-tone-800 hover:bg-tone-100 transition"
          >
            <UserIcon className="h-4 w-4" />
            Perfil
          </button>
          <button
            onClick={() => {
              setOpen(false);
              signOut();
              navigate({ to: "/login" });
            }}
            className="w-full flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-tone-800 hover:bg-tone-100 transition"
          >
            <LogOut className="h-4 w-4" />
            Salir
          </button>
        </div>
      )}
    </div>
  );
}

export function TopAppBar({ variant = "default", showBack, title, right }: Props) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 px-5 pt-4 pb-3 bg-background/80 backdrop-blur-xl">
      <div className="flex items-center gap-2 min-w-0">
        {showBack && (
          <button
            aria-label="Volver"
            onClick={() => router.history.back()}
            className="grid place-items-center h-10 w-10 shrink-0 rounded-full bg-tone-100 text-tone-800 hover:bg-tone-200 transition"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        <Link to="/home" className="min-w-0">
          <p className="font-display text-base leading-tight truncate">
            {title ?? "Casa del Horno"}
          </p>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Panadería artesanal
          </p>
        </Link>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {variant === "default" && right}
        <UserMenu />
      </div>
    </header>
  );
}
