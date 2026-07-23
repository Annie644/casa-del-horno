import sourdough from "@/assets/product-sourdough.jpg";
import croissant from "@/assets/product-croissant.jpg";
import cake from "@/assets/product-cake.jpg";
import cinnamon from "@/assets/product-cinnamon.jpg";
import cookies from "@/assets/product-cookies.jpg";
import baguette from "@/assets/product-baguette.jpg";
import coffee from "@/assets/product-coffee.jpg";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  tags: string[];
  featured?: boolean;
  ingredients: string[];
  prepTime: string;
};

export const categories = [
  { id: "all", name: "Todo", icon: "🥐" },
  { id: "breads", name: "Panes", icon: "🍞" },
  { id: "pastries", name: "Pasteles", icon: "🍰" },
  { id: "cookies", name: "Galletas", icon: "🍪" },
  { id: "drinks", name: "Bebidas", icon: "☕" },
];

export const products: Product[] = [
  {
    id: "sourdough",
    name: "Masa Madre",
    description:
      "Nuestro pan estrella, fermentado durante 24 horas para lograr una corteza crujiente y una miga alveolada de sabor profundo.",
    price: 6.5,
    category: "breads",
    image: sourdough,
    tags: ["Recién horneado", "Fermentación lenta", "Artesanal"],
    featured: true,
    ingredients: ["Harina de trigo", "Masa madre", "Agua de manantial", "Sal marina"],
    prepTime: "24h fermentación",
  },
  {
    id: "croissant",
    name: "Croissant de Mantequilla",
    description:
      "Hojaldre francés elaborado con mantequilla europea, láminas doradas y crujientes por fuera, tiernas por dentro.",
    price: 3.2,
    category: "pastries",
    image: croissant,
    tags: ["Recién horneado", "Mantequilla", "Clásico"],
    featured: true,
    ingredients: ["Harina", "Mantequilla europea", "Leche", "Levadura", "Huevo"],
    prepTime: "Horneado 6am",
  },
  {
    id: "cake",
    name: "Tarta de Chocolate",
    description:
      "Bizcocho de cacao intenso con ganache oscuro. Una tajada densa y aterciopelada para los amantes del chocolate.",
    price: 5.9,
    category: "pastries",
    image: cake,
    tags: ["Chocolate", "Sin conservantes"],
    ingredients: ["Cacao 70%", "Mantequilla", "Huevo", "Azúcar mascabado", "Harina"],
    prepTime: "Preparado hoy",
  },
  {
    id: "cinnamon",
    name: "Rollo de Canela",
    description:
      "Rollos esponjosos con canela de Ceylán y un glaseado suave de vainilla. Ideal para acompañar el café.",
    price: 4.2,
    category: "pastries",
    image: cinnamon,
    tags: ["Recién horneado", "Canela Ceylán"],
    featured: true,
    ingredients: ["Harina", "Canela de Ceylán", "Mantequilla", "Azúcar moreno", "Vainilla"],
    prepTime: "Horneado 7am",
  },
  {
    id: "cookies",
    name: "Galletas de Mantequilla",
    description:
      "Galletas quebradizas de mantequilla dorada, con notas de vainilla. Perfectas para el té de la tarde.",
    price: 2.8,
    category: "cookies",
    image: cookies,
    tags: ["Artesanal", "Sin conservantes"],
    ingredients: ["Harina", "Mantequilla", "Azúcar glass", "Vainilla", "Sal"],
    prepTime: "Preparado hoy",
  },
  {
    id: "baguette",
    name: "Baguette Tradicional",
    description:
      "Baguette de corteza fina y crujiente, miga aireada. Elaborada según la receta tradicional francesa.",
    price: 3.5,
    category: "breads",
    image: baguette,
    tags: ["Recién horneado", "Tradicional"],
    ingredients: ["Harina de trigo", "Agua", "Levadura natural", "Sal marina"],
    prepTime: "Horneado 6am",
  },
  {
    id: "coffee",
    name: "Cappuccino de Especialidad",
    description:
      "Espresso italiano con leche vaporizada y arte latte. Grano de origen único tostado en casa.",
    price: 3.9,
    category: "drinks",
    image: coffee,
    tags: ["Origen único", "Recién molido"],
    ingredients: ["Espresso doble", "Leche entera", "Especialidad de temporada"],
    prepTime: "Preparado al momento",
  },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}
