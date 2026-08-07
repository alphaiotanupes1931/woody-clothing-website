import painFront from "@/assets/products/pain-front.jpg";
import painBack from "@/assets/products/pain-back.jpg";

export interface Product {
  id: string;
  image: string;
  images?: string[];
  name: string;
  price: string;
  category: string;
  soldOut?: boolean;
  description?: string;
  sizeType?: "apparel" | "fitted-hat" | "one-size";
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const rawProducts: Omit<Product, "id">[] = [
  {
    image: painFront,
    images: [painFront, painBack],
    name: "Pain of the Game · AI in 5 Tee",
    price: "$40.00",
    category: "Tees",
    sizeType: "apparel",
    description:
      "Vintage-wash heavyweight cotton tee. The front carries an x-ray study of the hand · five AI rings, every fracture, every strain, every ache earned along the way. The back runs the schedule: line after line, class after class, the ones who took the hits and kept moving.\n\nPain of the Game is not a slogan. It is the record.\n\n• Material: 100% Cotton\n• Fabric Weight: 300 GSM (8.8 oz)\n• Wash: Vintage / Garment Washed\n• Fit: Relaxed / Standard\n• Collar: Ribbed Crewneck\n• Print: Front & full back panel",
  },
];

export const allProducts: Product[] = rawProducts.map((p) => ({
  ...p,
  id: slugify(p.name),
}));

export function getProductById(id: string): Product | undefined {
  return allProducts.find((p) => p.id === id);
}

export const FEATURED_PRODUCT = allProducts[0];
