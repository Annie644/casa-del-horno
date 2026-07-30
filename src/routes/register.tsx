import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import heroBakery from "@/assets/hero-bakery.jpg";
import { useUser } from "@/lib/user-context";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Crear cuenta · El Buen Horno" },
      {
        name: "description",
        content: "Regístrate en El Buen Horno para pedir pan artesanal fresco.",
      },
      { property: "og:title", content: "Crear cuenta · El Buen Horno" },
      {
        property: "og:description",
        content: "Crea tu cuenta en El Buen Horno.",
      },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const { signIn } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    if (password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    signIn({ name: name || email.split("@")[0] || "Cliente", email });
    toast.success(`¡Bienvenido, ${name || "amigo"}!`);
    navigate({ to: "/home" });
  };

  return (
    <div className="relative min-h-[100dvh] flex flex-col bg-tone-50 overflow-hidden">
      <div className="relative h-[28vh] min-h-[200px] w-full overflow-hidden rounded-b-[2.5rem]">
        <img
          src={heroBakery}
          alt="Pan artesanal"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-tone-900/40 to-tone-900/80" />
        <div className="absolute top-0 left-0 right-0 px-6 pt-12 flex items-center gap-3">
          <div className="grid place-items-center h-11 w-11 rounded-full bg-accent text-accent-foreground font-display text-lg font-bold shadow-lg shadow-accent/30">
            E
          </div>
          <div className="text-white">
            <p className="font-display text-lg leading-tight">El Buen Horno</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/80">
              Panadería artesanal
            </p>
          </div>
        </div>
        <div className="absolute bottom-5 left-6 right-6 text-white">
          <h1 className="font-display text-3xl leading-[1.05] drop-shadow-md">
            Crea tu cuenta
          </h1>
          <p className="text-sm text-white/85 mt-1">
            Únete y recibe pan fresco cada mañana.
          </p>
        </div>
      </div>

      <div className="flex-1 px-6 pt-6 pb-8 flex flex-col">
        <form onSubmit={handleSubmit} className="space-y-3">
          <Field
            icon={<User className="h-5 w-5" />}
            label="Nombre"
            type="text"
            value={name}
            onChange={setName}
            placeholder="Tu nombre"
          />
          <Field
            icon={<Mail className="h-5 w-5" />}
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="tu@correo.com"
          />
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
                placeholder="Mínimo 6 caracteres"
                className="w-full bg-transparent text-tone-900 placeholder:text-tone-400 focus:outline-none text-base"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="text-tone-400 hover:text-tone-600 shrink-0"
              aria-label={showPass ? "Ocultar" : "Mostrar"}
            >
              {showPass ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          <Field
            icon={<Lock className="h-5 w-5" />}
            label="Confirmar contraseña"
            type={showPass ? "text" : "password"}
            value={confirm}
            onChange={setConfirm}
            placeholder="Repite tu contraseña"
          />

          <button
            type="submit"
            className="mt-2 w-full flex items-center justify-center gap-2 rounded-2xl bg-accent text-accent-foreground py-4 font-semibold text-base shadow-lg shadow-accent/30 active:scale-[0.98] transition"
          >
            Crear cuenta
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>

        <p className="mt-auto pt-6 text-center text-sm text-tone-600">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-accent font-semibold">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

function Field({
  icon,
  label,
  type,
  value,
  onChange,
  placeholder,
}: {
  icon: React.ReactNode;
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="group flex items-center gap-3 rounded-2xl bg-white border border-tone-200 px-4 py-3 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20 transition">
      <span className="text-tone-400 group-focus-within:text-accent transition">
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <label className="block text-[10px] uppercase tracking-widest text-tone-500">
          {label}
        </label>
        <input
          type={type}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-tone-900 placeholder:text-tone-400 focus:outline-none text-base"
        />
      </div>
    </div>
  );
}
