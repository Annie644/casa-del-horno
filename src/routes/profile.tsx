import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Bell,
  ChevronRight,
  Clock3,
  LogOut,
  Mail,
  MapPin,
  Pencil,
  Save,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { TopAppBar } from "@/components/TopAppBar";
import { pastOrders } from "@/data/orders";
import { useUser } from "@/lib/user-context";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Mi perfil · Casa del Horno" },
      {
        name: "description",
        content: "Consulta y actualiza tu perfil de Casa del Horno.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Mi perfil · Casa del Horno" },
      {
        property: "og:description",
        content: "Consulta y actualiza tu perfil de Casa del Horno.",
      },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const navigate = useNavigate();
  const { user, initial, signIn, signOut } = useUser();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    setName(user?.name ?? "");
    setEmail(user?.email ?? "");
  }, [user]);

  const cancelEditing = () => {
    setName(user?.name ?? "");
    setEmail(user?.email ?? "");
    setEditing(false);
  };

  const saveProfile = (event: React.FormEvent) => {
    event.preventDefault();
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    if (!cleanName || !cleanEmail) return;
    signIn({ name: cleanName, email: cleanEmail });
    setEditing(false);
    toast.success("Perfil actualizado");
  };

  const logOut = () => {
    signOut();
    navigate({ to: "/login" });
  };

  return (
    <>
      <TopAppBar />
      <main className="flex-1 px-5 pb-7">
        <section className="pt-3 text-center">
          <div className="relative mx-auto grid h-24 w-24 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <span className="font-display text-4xl font-semibold">{initial}</span>
            <span className="absolute bottom-1 right-0 grid h-8 w-8 place-items-center rounded-full border-4 border-background bg-accent text-accent-foreground">
              <Pencil className="h-3.5 w-3.5" />
            </span>
          </div>
          <h1 className="mt-4 font-display text-3xl text-tone-900">{user?.name || "Mi perfil"}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {user?.email || "Completa tus datos personales"}
          </p>
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-tone-100 px-3 py-1.5 text-xs font-semibold text-tone-700">
            <ShieldCheck className="h-3.5 w-3.5 text-accent" />
            Cliente de Casa del Horno
          </span>
        </section>

        <section className="mt-7 grid grid-cols-2 gap-3" aria-label="Resumen de cuenta">
          <button
            type="button"
            onClick={() => navigate({ to: "/orders" })}
            className="rounded-2xl bg-tone-100 p-4 text-left transition active:scale-[0.98]"
          >
            <Clock3 className="h-5 w-5 text-primary" />
            <p className="mt-3 font-display text-2xl text-tone-900">{pastOrders.length}</p>
            <p className="text-xs text-muted-foreground">Pedidos realizados</p>
          </button>
          <div className="rounded-2xl bg-tone-200 p-4 text-left">
            <MapPin className="h-5 w-5 text-primary" />
            <p className="mt-3 font-display text-2xl text-tone-900">0</p>
            <p className="text-xs text-muted-foreground">Direcciones guardadas</p>
          </div>
        </section>

        <section className="mt-7">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-xl">Datos personales</h2>
            {!editing && (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
              >
                <Pencil className="h-3.5 w-3.5" />
                Editar
              </button>
            )}
          </div>

          <form onSubmit={saveProfile} className="space-y-2">
            <ProfileField
              icon={<UserRound className="h-5 w-5" />}
              label="Nombre"
              type="text"
              value={name}
              editing={editing}
              onChange={setName}
            />
            <ProfileField
              icon={<Mail className="h-5 w-5" />}
              label="Correo electrónico"
              type="email"
              value={email}
              editing={editing}
              onChange={setEmail}
            />

            {editing && (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-tone-100 py-3 text-sm font-semibold text-tone-700"
                >
                  <X className="h-4 w-4" />
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-accent py-3 text-sm font-semibold text-accent-foreground shadow-md shadow-accent/20"
                >
                  <Save className="h-4 w-4" />
                  Guardar
                </button>
              </div>
            )}
          </form>
        </section>

        <section className="mt-7">
          <h2 className="mb-3 font-display text-xl">Preferencias</h2>
          <div className="overflow-hidden rounded-2xl bg-tone-100">
            <button
              type="button"
              onClick={() => toast("Podrás añadir tu dirección al realizar un pedido")}
              className="flex w-full items-center gap-3 px-4 py-4 text-left"
            >
              <MapPin className="h-5 w-5 text-primary" />
              <span className="flex-1 text-sm font-medium">Direcciones de entrega</span>
              <ChevronRight className="h-4 w-4 text-tone-400" />
            </button>
            <div className="mx-4 h-px bg-tone-200" />
            <div className="flex items-center gap-3 px-4 py-4">
              <Bell className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium">Notificaciones</p>
                <p className="text-xs text-muted-foreground">Ofertas y estado de pedidos</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={notifications}
                aria-label="Activar notificaciones"
                onClick={() => setNotifications((value) => !value)}
                className={`relative h-7 w-12 rounded-full transition ${notifications ? "bg-accent" : "bg-tone-300"}`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-background shadow-sm transition ${notifications ? "left-6" : "left-1"}`}
                />
              </button>
            </div>
          </div>
        </section>

        <button
          type="button"
          onClick={logOut}
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl border border-destructive/20 bg-destructive/5 py-3.5 text-sm font-semibold text-destructive transition active:scale-[0.98]"
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </button>
      </main>
    </>
  );
}

function ProfileField({
  icon,
  label,
  type,
  value,
  editing,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  type: string;
  value: string;
  editing: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex items-center gap-3 rounded-2xl bg-tone-50 px-4 py-3.5 ring-1 ring-tone-200 focus-within:ring-accent">
      <span className="text-tone-500">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] uppercase tracking-widest text-tone-500">{label}</span>
        <input
          type={type}
          required
          disabled={!editing}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="mt-0.5 w-full bg-transparent text-sm font-medium text-tone-900 outline-none disabled:opacity-100"
        />
      </span>
    </label>
  );
}
