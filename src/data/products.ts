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
      "Nuestro pan estrella, fermentado 24 horas con masa madre viva. Corteza crujiente color caramelo, miga alveolada y aroma tostado que perfuma toda la cocina. Ideal para tostadas, bocadillos o acompañar una buena sopa.",
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
      "Hojaldre francés elaborado a mano con mantequilla europea AOP. Más de 27 capas doradas que crujen al primer bocado y una miga tierna y aireada por dentro. El clásico perfecto para tu café de la mañana.",
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
      "Bizcocho húmedo de cacao 70% cubierto con ganache oscuro y virutas de chocolate. Denso, aterciopelado y con un final ligeramente amargo. Una tajada intensa para los verdaderos amantes del chocolate.",
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
      "Espirales esponjosas rellenas de canela de Ceylán y azúcar moreno, terminadas con un glaseado suave de vainilla que se derrite tibio. Se sirven recién salidos del horno para acompañar el café.",
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
      "Galletas quebradizas horneadas en pequeños lotes, con mantequilla dorada y semillas de vainilla bourbon. Ligeras, con borde caramelizado y un final delicado. Perfectas para el té de la tarde.",
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
      "Baguette artesanal de corteza fina y crujiente, con miga alveolada y ligeramente ácida. Elaborada según la receta tradicional francesa y horneada sobre piedra para el aroma justo.",
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
      "Espresso italiano de grano de origen único tostado en casa, coronado con leche vaporizada sedosa y arte latte. Notas de cacao, avellana y un final dulce y cremoso.",
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
