import { Link, useRouter } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

type Props = {
  /** "suppressed" hides nav icons; only brand shows */
  variant?: "default" | "suppressed";
  showBack?: boolean;
  title?: string;
  right?: React.ReactNode;
};

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
        <Link to="/" className="flex items-center gap-2 min-w-0">
          <div className="grid place-items-center h-9 w-9 shrink-0 rounded-full bg-primary text-primary-foreground font-display font-bold">
            E
          </div>
          {variant === "default" && !title && (
            <div className="min-w-0">
              <p className="font-display text-base leading-tight truncate">
                El Buen Horno
              </p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Panadería artesanal
              </p>
            </div>
          )}
          {title && (
            <p className="font-display text-lg truncate">{title}</p>
          )}
        </Link>
      </div>
      {variant === "default" && right}
    </header>
  );
}
