import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import heroBakery from "@/assets/hero-bakery.jpg";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Iniciar sesión · El Buen Horno" },
      {
        name: "description",
        content: "Entra a tu cuenta de El Buen Horno para pedir pan artesanal.",
      },
      { property: "og:title", content: "Iniciar sesión · El Buen Horno" },
      {
        property: "og:description",
        content: "Entra a tu cuenta de El Buen Horno.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/" });
  };

  return (
    <div className="relative min-h-[100dvh] flex flex-col text-white">
      {/* Hero background layer */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroBakery}
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-tone-900/70 via-tone-900/60 to-tone-900/95" />
      </div>

      <div className="flex-1 flex flex-col px-6 pt-16 pb-8">
        <div className="flex items-center gap-3">
          <div className="grid place-items-center h-12 w-12 rounded-full bg-accent text-accent-foreground font-display text-xl font-bold">
            E
          </div>
          <div>
            <p className="font-display text-xl leading-tight">El Buen Horno</p>
            <p className="text-[11px] uppercase tracking-widest text-white/70">
              Panadería artesanal
            </p>
          </div>
        </div>

        <div className="mt-auto">
          <h1 className="font-display text-4xl leading-tight text-white">
            Del horno<br />a tu mesa.
          </h1>
          <p className="mt-3 text-sm text-white/75 max-w-xs">
            Inicia sesión para pedir pan recién horneado cada mañana.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-3">
            <div className="glass-dark rounded-2xl px-4 py-3">
              <label className="text-[10px] uppercase tracking-widest text-white/60">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="w-full bg-transparent text-white placeholder:text-white/40 focus:outline-none text-base"
              />
            </div>
            <div className="glass-dark rounded-2xl px-4 py-3">
              <label className="text-[10px] uppercase tracking-widest text-white/60">
                Contraseña
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent text-white placeholder:text-white/40 focus:outline-none text-base"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-accent text-accent-foreground py-4 font-semibold text-base shadow-lg shadow-accent/30 active:scale-[0.98] transition"
            >
              Iniciar sesión
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-white/70">
            ¿No tienes cuenta?{" "}
            <Link to="/" className="text-accent font-semibold">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
