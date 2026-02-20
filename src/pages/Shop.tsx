import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import ProductCard from "@/components/ProductCard";
import FadeIn from "@/components/FadeIn";
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
        <FadeIn>
          <div className="px-4 md:px-14 mb-6 md:mb-8">
            <h1 className="font-display text-3xl md:text-6xl tracking-tight text-foreground">
              SHOP ALL
            </h1>
            <p className="text-muted-foreground text-sm mt-2">
              {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>
        </FadeIn>

        <div className="px-4 md:px-14 mb-8 md:mb-10 flex gap-2 flex-wrap overflow-x-auto carousel-scroll pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`text-[12px] tracking-[0.15em] uppercase font-medium px-4 py-2 border transition-all duration-200 ${
                activeFilter === cat
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-foreground border-border hover:border-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="px-4 md:px-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6 md:gap-x-4 md:gap-y-8 stagger-children" key={activeFilter + (queryParam || "")}>
          {filtered.map((product, i) => (
            <FadeIn key={product.id || i} delay={i * 50}>
              <ProductCard
                id={product.id}
                image={product.image}
                name={product.name}
                price={product.registrationOnly ? "Registration Only" : product.price}
              />
            </FadeIn>
          ))}
        </div>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default Shop;
