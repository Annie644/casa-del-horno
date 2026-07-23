export type PastOrder = {
  id: string;
  productName: string;
  date: string;
  itemCount: number;
  total: number;
  status: "Activa" | "Reciente" | "Entregada";
  image: string;
};

import sourdough from "@/assets/product-sourdough.jpg";
import croissant from "@/assets/product-croissant.jpg";
import cinnamon from "@/assets/product-cinnamon.jpg";

export const pastOrders: PastOrder[] = [
  {
    id: "EBH-2411",
    productName: "Masa Madre + 2 más",
    date: "Hoy, 08:20",
    itemCount: 3,
    total: 16.7,
    status: "Activa",
    image: sourdough,
  },
  {
    id: "EBH-2402",
    productName: "Croissant de Mantequilla",
    date: "Ayer, 09:15",
    itemCount: 4,
    total: 12.8,
    status: "Reciente",
    image: croissant,
  },
  {
    id: "EBH-2388",
    productName: "Rollo de Canela + 1 más",
    date: "12 abr, 07:50",
    itemCount: 2,
    total: 8.4,
    status: "Entregada",
    image: cinnamon,
  },
];
