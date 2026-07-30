import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import heroBakery from "@/assets/hero-bakery.jpg";
import { useUser } from "@/lib/user-context";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Iniciar sesión · Casa del Horno" },
      {
        name: "description",
        content: "Entra a tu cuenta de Casa del Horno para pedir pan artesanal.",
      },
      { property: "og:title", content: "Iniciar sesión · Casa del Horno" },
      {
        property: "og:description",
        content: "Entra a tu cuenta de Casa del Horno.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn({ name: email.split("@")[0] || "Cliente", email });
    navigate({ to: "/home" });
  };

  return (
    <div className="relative min-h-[100dvh] flex flex-col bg-tone-50 overflow-hidden">
      {/* Top hero image with brand */}
      <div className="relative h-[46vh] min-h-[300px] w-full overflow-hidden rounded-b-[2.5rem]">
        <img
          src={heroBakery}
          alt="Pan artesanal recién horneado"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-tone-900/40 via-tone-900/20 to-tone-900/80" />

        {/* Brand */}
        <div className="absolute top-0 left-0 right-0 px-6 pt-12 flex items-center gap-3">
          <div className="grid place-items-center h-11 w-11 rounded-full bg-accent text-accent-foreground font-display text-lg font-bold shadow-lg shadow-accent/30">
            C
          </div>
          <div className="text-white">
            <p className="font-display text-lg leading-tight">Casa del Horno</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/80">
              Panadería artesanal
            </p>
          </div>
        </div>

        {/* Headline overlay */}
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <span className="inline-block text-[10px] uppercase tracking-[0.25em] bg-white/15 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
            Recién horneado
          </span>
          <h1 className="font-display text-4xl leading-[1.05] mt-3 drop-shadow-md">
            Del horno<br />a tu mesa.
          </h1>
        </div>
      </div>

      {/* Form card */}
      <div className="flex-1 px-6 pt-7 pb-8 flex flex-col">
        <div>
          <h2 className="font-display text-2xl text-tone-900">Bienvenido</h2>
          <p className="text-sm text-tone-600 mt-1">
            Inicia sesión para pedir pan fresquito cada mañana.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <div className="group flex items-center gap-3 rounded-2xl bg-white border border-tone-200 px-4 py-3 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20 transition">
            <Mail className="h-5 w-5 text-tone-400 group-focus-within:text-accent transition" />
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] uppercase tracking-widest text-tone-500">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="w-full bg-transparent text-tone-900 placeholder:text-tone-400 focus:outline-none text-base"
              />
            </div>
          </div>

          <div className="group flex items-center gap-3 rounded-2xl bg-white border border-tone-200 px-4 py-3 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20 transition">
            <Lock className="h-5 w-5 text-tone-400 group-focus-within:text-accent transition" />
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] uppercase tracking-widest text-tone-500">
                Contraseña
              </label>
              <input
                type={showPass ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent text-tone-900 placeholder:text-tone-400 focus:outline-none text-base"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="text-tone-400 hover:text-tone-600 shrink-0"
              aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPass ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-xs text-tone-600 hover:text-accent font-medium">
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-accent text-accent-foreground py-4 font-semibold text-base shadow-lg shadow-accent/30 active:scale-[0.98] transition"
          >
            Iniciar sesión
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>

        <div className="mt-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-tone-200" />
          <span className="text-[10px] uppercase tracking-widest text-tone-500">o continúa con</span>
          <div className="h-px flex-1 bg-tone-200" />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="rounded-2xl bg-white border border-tone-200 py-3 text-sm font-medium text-tone-800 hover:bg-tone-50 active:scale-[0.98] transition"
          >
            Google
          </button>
          <button
            type="button"
            className="rounded-2xl bg-white border border-tone-200 py-3 text-sm font-medium text-tone-800 hover:bg-tone-50 active:scale-[0.98] transition"
          >
            Apple
          </button>
        </div>

        <p className="mt-auto pt-6 text-center text-sm text-tone-600">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-accent font-semibold">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
