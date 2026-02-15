// Tees
import kreamTeeAchievers from "@/assets/products/kream-tee-achievers.jpg";
import kreamTeeCorner from "@/assets/products/kream-tee-corner.png";
import tee95thFront from "@/assets/products/tee-95th-front.jpg";
import tee95thBack from "@/assets/products/tee-95th-back.jpg";
import kreamTee1 from "@/assets/products/kream-tee-1.jpg";
import kreamTee2 from "@/assets/products/kream-tee-2.jpg";

// Polos
import kreamWovenPolo from "@/assets/products/kream-woven-polo.jpg";
import krimsonWovenPolo from "@/assets/products/krimson-woven-polo.jpg";
import kreamPerformancePolo from "@/assets/products/kream-performance-polo.jpg";
import dryFitPolo from "@/assets/products/dry-fit-polo.jpg";

// Headwear
import krimsonBucketFront from "@/assets/products/krimson-bucket-front.jpg";
import krimsonFittedBack from "@/assets/products/krimson-fitted-back.jpg";
import krimsonFittedFront1 from "@/assets/products/krimson-fitted-front-1.jpg";
import krimsonFittedSide2 from "@/assets/products/krimson-fitted-side-2.jpg";
import krimsonSkully from "@/assets/products/krimson-skully.jpg";
import flexKreamKap from "@/assets/products/flex-kream-kap.jpg";
import flexKrimsonKap from "@/assets/products/flex-krimson-kap.jpg";

// Outerwear
import ktrZip from "@/assets/products/ktr-zip.jpg";

// Accessories
import kreamSocks from "@/assets/products/kream-socks.jpg";

export interface Product {
  id: string;
  image: string;
  name: string;
  price: string;
  category: string;
  soldOut?: boolean;
  description?: string;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const rawProducts = [
  { image: kreamTeeAchievers, name: '"Achievers" KREAM Tee', price: "$55.00", category: "Tees" },
  { image: kreamTeeCorner, name: "K-Diamond KREAM Tee", price: "$55.00", category: "Tees" },
  { image: tee95thFront, name: '95th ANNIVERSARY "KREAM" Tee — Cream', price: "$65.00", category: "Tees" },
  { image: tee95thBack, name: '95th ANNIVERSARY "KREAM" Tee — Back Print', price: "$65.00", category: "Tees" },
  { image: kreamTee1, name: "K-Diamond Outline Tee — Cream", price: "$55.00", category: "Tees" },
  { image: kreamTee2, name: "K-Diamond Filled Tee — Cream", price: "$55.00", category: "Tees" },
  { image: kreamWovenPolo, name: "KREAM Woven Polo", price: "$75.00", category: "Polos" },
  { image: krimsonWovenPolo, name: "KRIMSON Woven Polo", price: "$75.00", category: "Polos" },
  { image: kreamPerformancePolo, name: "KREAM Performance Polo", price: "$75.00", category: "Polos" },
  { image: dryFitPolo, name: "KRIMSON Dry-Fit Polo", price: "$75.00", category: "Polos" },
  { image: krimsonFittedFront1, name: "KRIMSON K-Diamond Fitted Hat", price: "$55.00", category: "Headwear" },
  { image: krimsonFittedSide2, name: 'KRIMSON "Achievers" Fitted Hat — Side', price: "$55.00", category: "Headwear" },
  { image: krimsonFittedBack, name: "KRIMSON Fitted Hat — Back", price: "$55.00", category: "Headwear" },
  { image: krimsonBucketFront, name: "KRIMSON K-Diamond Bucket Hat", price: "$45.00", category: "Headwear" },
  { image: krimsonSkully, name: "KRIMSON K-Diamond Skully", price: "$35.00", category: "Headwear" },
  { image: flexKreamKap, name: "KREAM FlexFit K-Diamond Kap", price: "$45.00", category: "Headwear" },
  { image: flexKrimsonKap, name: "KRIMSON FlexFit K-Diamond Kap", price: "$45.00", category: "Headwear" },
  { image: ktrZip, name: "KRIMSON Quarter-Zip Sweater", price: "$95.00", category: "Outerwear" },
  { image: kreamSocks, name: "KREAM K-Diamond Socks", price: "$18.00", category: "Accessories" },
];

export const allProducts: Product[] = rawProducts.map((p) => ({
  ...p,
  id: slugify(p.name),
}));

export function getProductById(id: string): Product | undefined {
  return allProducts.find((p) => p.id === id);
}
