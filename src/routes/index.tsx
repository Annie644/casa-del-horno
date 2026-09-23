import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Casa del Horno · Panadería artesanal" },
      { name: "description", content: "Pide pan y repostería artesanal recién horneados." },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Casa del Horno · Panadería artesanal" },
      { property: "og:description", content: "Pide pan y repostería artesanal recién horneados." },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  beforeLoad: () => {
    throw redirect({ to: "/login" });
  },
});
