import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type User = { name: string; email: string };

type UserCtx = {
  user: User | null;
  initial: string;
  signIn: (user: User) => void;
  signOut: () => void;
};

const STORAGE_KEY = "ebh-user";

const Ctx = createContext<UserCtx | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw) as User);
    } catch {
      /* ignore */
    }
  }, []);

  const signIn = useCallback((u: User) => {
    setUser(u);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    } catch {
      /* ignore */
    }
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const initial = useMemo(() => {
    const source = user?.name?.trim() || user?.email?.trim() || "";
    return source ? source[0]!.toUpperCase() : "?";
  }, [user]);

  const value = useMemo(
    () => ({ user, initial, signIn, signOut }),
    [user, initial, signIn, signOut],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useUser() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
