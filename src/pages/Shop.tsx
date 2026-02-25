import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import ProductCard from "@/components/ProductCard";
import FadeIn from "@/components/FadeIn";
import { allProducts, REGISTRATION_URL } from "@/data/products";
import { ExternalLink } from "lucide-react";

const registrationProducts = allProducts.filter((p) => p.registrationOnly);
const shopProducts = allProducts.filter((p) => !p.registrationOnly);
const categories = ["All", "Headwear & Accessories", "Tees", "Polos", "Outerwear"];

const Shop = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const queryParam = searchParams.get("q");

  // Map individual category params to the combined filter
  const categoryMap: Record<string, string> = {
    "Headwear": "Headwear & Accessories",
    "Accessories": "Headwear & Accessories",
  };
  const mappedCategory = categoryParam ? (categoryMap[categoryParam] || categoryParam) : "All";
  const [activeFilter, setActiveFilter] = useState(mappedCategory);

  useEffect(() => {
    const mapped = categoryParam ? (categoryMap[categoryParam] || categoryParam) : null;
    if (mapped && categories.includes(mapped)) {
      setActiveFilter(mapped);
    }
  }, [categoryParam]);

  let filtered = activeFilter === "All"
    ? shopProducts
    : activeFilter === "Headwear & Accessories"
      ? shopProducts.filter((p) => p.category === "Headwear" || p.category === "Accessories")
      : shopProducts.filter((p) => p.category === activeFilter);

  // Search query filtering
  if (queryParam) {
    const q = queryParam.toLowerCase();
    const matchedCategory = categories.find(
      (cat) => cat.toLowerCase() === q || cat.toLowerCase().includes(q)
    );
    if (matchedCategory && matchedCategory !== "All") {
      filtered = shopProducts.filter((p) => p.category === matchedCategory);
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
        {/* Registration Exclusives Section */}
        {registrationProducts.length > 0 && (
          <FadeIn>
            <section className="px-4 md:px-14 mb-10 md:mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Registration Exclusives */}
                <div className="border border-border p-4 sm:p-5 md:p-8">
                  <div className="flex flex-col gap-3 mb-4 sm:mb-6">
                    <div>
                      <p className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-1">95th Anniversary</p>
                      <h2 className="font-display text-xl sm:text-2xl md:text-3xl tracking-tight text-foreground">
                        Registration Exclusives
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground max-w-xl leading-relaxed">
                      These items are exclusively available to brothers who have officially registered for the Alpha Iota 95th Anniversary Celebration.
                    </p>
                    <a
                      href={REGISTRATION_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-foreground/90 active:bg-foreground/80 transition-colors self-start"
                    >
                      Register Now
                      <ExternalLink size={12} strokeWidth={1.5} />
                    </a>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                    {registrationProducts.map((product, i) => (
                      <FadeIn key={product.id} delay={i * 80}>
                        <ProductCard
                          id={product.id}
                          image={product.image}
                          name={product.name}
                          price="Registration Only"
                        />
                      </FadeIn>
                    ))}
                  </div>
                </div>

                {/* Reed Digital Group Live Preview */}
                <div className="border border-border p-4 sm:p-5 md:p-8 flex flex-col">
                  <div className="mb-4">
                    <p className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-1">Powered By</p>
                    <h2 className="font-display text-xl sm:text-2xl md:text-3xl tracking-tight text-foreground">
                      Reed Digital Group
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                      Digital solutions for organizations that move with purpose.
                    </p>
                  </div>
                  <div className="flex-1 min-h-[280px] md:min-h-[320px] bg-secondary overflow-hidden border border-border">
                    <iframe
                      src="https://reeddigitalgroup.com"
                      title="Reed Digital Group"
                      className="w-full h-full border-0 pointer-events-none"
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin"
                    />
                  </div>
                  <a
                    href="https://reeddigitalgroup.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors self-start"
                  >
                    Visit Site
                    <ExternalLink size={12} strokeWidth={1.5} />
                  </a>
                </div>
              </div>
            </section>
          </FadeIn>
        )}

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

        <div className="px-4 md:px-14 mb-6 md:mb-10 flex gap-1.5 sm:gap-2 flex-nowrap overflow-x-auto carousel-scroll pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`whitespace-nowrap text-[11px] sm:text-[12px] tracking-[0.1em] sm:tracking-[0.15em] uppercase font-medium px-3 sm:px-4 py-2 border transition-all duration-200 ${
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
            <FadeIn key={product.id || i} delay={i * 80}>
              <ProductCard
                id={product.id}
                image={product.image}
                name={product.name}
                price={product.price}
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
