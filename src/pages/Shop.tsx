import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import ProductCard from "@/components/ProductCard";
import FadeIn from "@/components/FadeIn";
import { allProducts, REGISTRATION_URL } from "@/data/products";
import { ExternalLink, ChevronDown, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Bundle items (same as PromoModal)
import flexKrimsonKap from "@/assets/products/flex-krimson-kap.jpg";
import kreamTeeAchievers from "@/assets/products/kream-tee-achievers.jpg";
import kreamTeeCorner from "@/assets/products/kream-tee-corner.png";
import kreamTee1 from "@/assets/products/kream-tee-1.jpg";
import kreamTeeAi95 from "@/assets/products/kream-tee-ai95.jpg";
import ktrZip from "@/assets/products/ktr-zip.jpg";
import dryFitPolo from "@/assets/products/dry-fit-polo.jpg";
import kreamPerformancePolo from "@/assets/products/kream-performance-polo.jpg";
import kreamSocks from "@/assets/products/kream-socks.jpg";
import krimsonSkully from "@/assets/products/krimson-skully.jpg";

const BUNDLE_PRICE = 259;
const apparelSizes = ["S", "M", "L", "XL", "2XL", "3XL"];

const bundleItems = [
  { name: "KRIMSON FlexFit K-Diamond Kap", image: flexKrimsonKap },
  { name: '"Achievers" KREAM Tee', image: kreamTeeAchievers, needsSize: true, sizeKey: "tee" },
  { name: '95th ANNIVERSARY "KREAM" Tee', image: kreamTeeCorner, needsSize: true, sizeKey: "tee" },
  { name: "K-Diamond Outline Tee, Kream", image: kreamTee1, needsSize: true, sizeKey: "tee" },
  { name: "AI 95th Large Logo Tee", image: kreamTeeAi95, needsSize: true, sizeKey: "tee" },
  { name: "KRIMSON Quarter-Zip Sweater", image: ktrZip, needsSize: true, sizeKey: "zip" },
  { name: "KRIMSON Dry-Fit Polo", image: dryFitPolo, needsSize: true, sizeKey: "polo" },
  { name: "KREAM Dry-Fit Polo", image: kreamPerformancePolo, needsSize: true, sizeKey: "polo" },
  { name: "KREAM K-Diamond Socks (1 Pair)", image: kreamSocks },
  { name: "KRIMSON K-Diamond Skully", image: krimsonSkully },
];

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

  const [teeSize, setTeeSize] = useState("");
  const [poloSize, setPoloSize] = useState("");
  const [zipSize, setZipSize] = useState("");
  const [bundleLoading, setBundleLoading] = useState(false);

  const handleBundleCheckout = async () => {
    if (!teeSize || !poloSize || !zipSize) {
      toast.error("Please select all sizes before checking out.");
      return;
    }
    setBundleLoading(true);
    try {
      const checkoutItems = bundleItems.map((item) => {
        let size: string | null = null;
        if (item.sizeKey === "tee") size = teeSize;
        if (item.sizeKey === "polo") size = poloSize;
        if (item.sizeKey === "zip") size = zipSize;
        const imageUrl = item.image.startsWith("http") ? item.image : `${window.location.origin}${item.image}`;
        return { name: size ? `${item.name} (${size})` : item.name, price: 0, quantity: 1, image: imageUrl, size };
      });

      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          items: [{ name: "95th Anniversary Complete Pack", price: BUNDLE_PRICE, quantity: 1, image: checkoutItems[0].image }],
          bundleItems: checkoutItems,
          metadata: { bundle: "true", teeSize, poloSize, zipSize, items: bundleItems.map((i) => i.name).join(", ") },
        },
      });
      if (error) throw error;
      if (data?.url) window.location.href = data.url;
      else throw new Error("No checkout URL");
    } catch (err: any) {
      console.error("Bundle checkout error:", err);
      toast.error("Checkout failed. Please try again.");
    } finally {
      setBundleLoading(false);
    }
  };

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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4">
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
            </section>
          </FadeIn>
        )}

        {/* 95th Anniversary Complete Pack Section */}
        <FadeIn>
          <section className="px-4 md:px-14 mb-10 md:mb-16">
            <div className="border border-border bg-foreground text-background overflow-hidden">
              <div className="p-4 sm:p-5 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                  <div>
                    <p className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-background/50 mb-1">Limited Time • Ends 3/14/26</p>
                    <h2 className="font-display text-xl sm:text-2xl md:text-3xl tracking-tight">
                      95th Anniversary Complete Pack
                    </h2>
                    <p className="text-xs sm:text-sm text-background/60 mt-2 max-w-lg leading-relaxed">
                      Get the whole collection — 10 items including all tees, both polos, the quarter-zip, socks, skully, and flexfit kap. Free shipping included.
                    </p>
                  </div>
                  <div className="flex items-baseline gap-2 flex-shrink-0">
                    <span className="font-display text-3xl sm:text-4xl">${BUNDLE_PRICE}</span>
                    <span className="text-sm line-through text-background/40">$331</span>
                  </div>
                </div>

                {/* Items grid */}
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 mb-5">
                  {bundleItems.map((item, i) => (
                    <div key={i} className="relative">
                      <div className="aspect-square bg-background/10 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-[6px] sm:text-[7px] text-background/50 leading-tight mt-0.5 truncate">
                        {item.name.replace(/"/g, "")}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Size selectors + CTA */}
                <div className="flex flex-col sm:flex-row sm:items-end gap-3">
                  <div className="flex-1 grid grid-cols-3 gap-2 max-w-sm">
                    {[
                      { label: "Tee Size", value: teeSize, onChange: setTeeSize },
                      { label: "Polo Size", value: poloSize, onChange: setPoloSize },
                      { label: "Zip Size", value: zipSize, onChange: setZipSize },
                    ].map(({ label, value, onChange }) => (
                      <div key={label} className="relative">
                        <select
                          value={value}
                          onChange={(e) => onChange(e.target.value)}
                          className="appearance-none w-full bg-background/10 border border-background/20 text-background text-xs tracking-wider uppercase px-3 py-2.5 pr-8 focus:outline-none focus:ring-1 focus:ring-background/30 cursor-pointer"
                        >
                          <option value="" className="text-foreground">{label}</option>
                          {apparelSizes.map((s) => (
                            <option key={s} value={s} className="text-foreground">{s}</option>
                          ))}
                        </select>
                        <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-background/50" />
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleBundleCheckout}
                    disabled={bundleLoading || !teeSize || !poloSize || !zipSize}
                    className="bg-background text-foreground py-3 px-8 text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase hover:bg-background/90 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    {bundleLoading ? (
                      <><Loader2 size={13} className="animate-spin" /> Processing...</>
                    ) : (
                      teeSize && poloSize && zipSize ? `Checkout · $${BUNDLE_PRICE}` : "Select Sizes"
                    )}
                  </button>
                </div>
                <p className="text-[7px] sm:text-[8px] text-background/40 mt-2 tracking-wider">
                  Excludes Fitted Hat • Free shipping included
                </p>
              </div>
            </div>
          </section>
        </FadeIn>

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
