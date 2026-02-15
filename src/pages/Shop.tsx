import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { allProducts } from "@/data/products";

const categories = ["All", "Headwear", "Tees", "Polos", "Outerwear", "Accessories"];

const Shop = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const queryParam = searchParams.get("q");

  const [activeFilter, setActiveFilter] = useState(categoryParam || "All");

  useEffect(() => {
    if (categoryParam && categories.includes(categoryParam)) {
      setActiveFilter(categoryParam);
    }
  }, [categoryParam]);

  let filtered = activeFilter === "All"
    ? allProducts
    : allProducts.filter((p) => p.category === activeFilter);

  // Search query filtering
  if (queryParam) {
    const q = queryParam.toLowerCase();
    // Check if query matches a category name
    const matchedCategory = categories.find(
      (cat) => cat.toLowerCase() === q || cat.toLowerCase().includes(q)
    );
    if (matchedCategory && matchedCategory !== "All") {
      filtered = allProducts.filter((p) => p.category === matchedCategory);
    } else {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header solid />

      <main className="pt-28 md:pt-32 pb-20">
        <div className="px-6 md:px-14 mb-8">
          <h1 className="font-display text-4xl md:text-6xl tracking-tight text-foreground">
            SHOP ALL
          </h1>
          <p className="text-muted-foreground text-sm mt-2">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

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