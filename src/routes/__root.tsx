import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider } from "../lib/cart-context";
import { UserProvider } from "../lib/user-context";
import { BottomNavBar } from "../components/BottomNavBar";

function NotFoundComponent() {
  return (
    <div className="mobile-shell flex flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-display text-7xl text-primary">404</p>
      <p className="mt-4 font-display text-xl">Página no encontrada</p>
      <p className="mt-2 text-sm text-muted-foreground">La ruta que buscas no existe.</p>
      <Link
        to="/home"
        className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
      >
        Volver al inicio
      </Link>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="mobile-shell flex flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-display text-xl">Algo salió del horno</p>
      <p className="mt-2 text-sm text-muted-foreground">Intenta de nuevo en un momento.</p>
      <div className="mt-6 flex gap-2">
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
      { title: "Casa del Horno · Panadería artesanal" },
      {
        name: "description",
        content:
          "Pedidos online de pan recién horneado, pastelería y café de especialidad. Del horno a tu puerta.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Casa del Horno · Panadería artesanal" },
      {
        property: "og:description",
        content: "Pedidos online de pan recién horneado, pastelería y café de especialidad.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#f7f1e6" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/icono.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function AppFrame() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  // Hide bottom nav on onboarding screens only
  const hideNav =
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/confirmation";

  return (
    <div className="mobile-shell flex flex-col bg-background">
      <div className="flex-1 flex flex-col pb-2">
        <Outlet />
      </div>
      {!hideNav && <BottomNavBar />}
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <CartProvider>
          <AppFrame />
          <Toaster
            position="top-center"
            toastOptions={{
              className: "!glass-panel !rounded-2xl !text-tone-900 !font-medium",
            }}
          />
        </CartProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}
