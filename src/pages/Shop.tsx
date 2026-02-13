import { useState } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

import tee95thFront from "@/assets/products/tee-95th-front.jpg";
import tee95thBack from "@/assets/products/tee-95th-back.jpg";
import krimsonFittedFront from "@/assets/products/krimson-fitted-front.jpg";
import krimsonFittedSide from "@/assets/products/krimson-fitted-side.jpg";
import flexKreamKap from "@/assets/products/flex-kream-kap.jpg";
import flexKrimsonKap from "@/assets/products/flex-krimson-kap.jpg";
import kreamTee1 from "@/assets/products/kream-tee-1.jpg";
import kreamTee2 from "@/assets/products/kream-tee-2.jpg";
import kreamSocks from "@/assets/products/kream-socks.jpg";
import ktrZip from "@/assets/products/ktr-zip.jpg";
import dryFitPolo from "@/assets/products/dry-fit-polo.jpg";

interface Product {
  image: string;
  name: string;
  price: string;
  category: string;
}

const allProducts: Product[] = [
  { image: tee95thFront, name: '95th ANNIVERSARY "KREAM" Tee — Cream', price: "$65.00", category: "Tees" },
  { image: tee95thBack, name: '95th ANNIVERSARY "KREAM" Tee — Back Print', price: "$65.00", category: "Tees" },
  { image: kreamTee1, name: "K-Diamond Outline Tee — Cream", price: "$55.00", category: "Tees" },
  { image: kreamTee2, name: "K-Diamond Filled Tee — Cream", price: "$55.00", category: "Tees" },
  { image: krimsonFittedFront, name: "KRIMSON K-Diamond Fitted Hat", price: "$55.00", category: "Headwear" },
  { image: krimsonFittedSide, name: 'KRIMSON "Achievers" Fitted Hat', price: "$55.00", category: "Headwear" },
  { image: flexKreamKap, name: "KREAM FlexFit K-Diamond Kap", price: "$45.00", category: "Headwear" },
  { image: flexKrimsonKap, name: "KRIMSON FlexFit K-Diamond Kap", price: "$45.00", category: "Headwear" },
  { image: ktrZip, name: "KRIMSON Quarter-Zip Sweater", price: "$95.00", category: "Outerwear" },
  { image: dryFitPolo, name: "KRIMSON Dry-Fit Polo", price: "$75.00", category: "Polos" },
  { image: kreamSocks, name: "KREAM K-Diamond Socks", price: "$18.00", category: "Accessories" },
];

const categories = ["All", "Headwear", "Tees", "Outerwear", "Polos", "Accessories"];

const Shop = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? allProducts
      : allProducts.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header solid />

      <main className="pt-28 md:pt-32 pb-20">
        {/* Page title */}
        <div className="px-6 md:px-14 mb-8">
          <h1 className="font-display text-4xl md:text-6xl tracking-tight text-foreground">
            SHOP ALL
          </h1>
          <p className="text-muted-foreground text-sm mt-2">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Filters */}
        <div className="px-6 md:px-14 mb-10 flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`text-[12px] tracking-[0.15em] uppercase font-medium px-4 py-2 border transition-colors ${
                activeFilter === cat
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-foreground border-border hover:border-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="px-6 md:px-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {filtered.map((product, i) => (
            <ProductCard key={i} image={product.image} name={product.name} price={product.price} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
