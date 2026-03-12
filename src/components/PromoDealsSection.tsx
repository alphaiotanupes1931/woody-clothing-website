import { useState } from "react";
import { ChevronDown, Tag } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import FadeIn from "./FadeIn";

import dryFitPolo from "@/assets/products/dry-fit-polo.jpg";
import kreamPerformancePolo from "@/assets/products/kream-performance-polo.jpg";
import kreamSocks from "@/assets/products/kream-socks.jpg";
import krimsonBucketFront from "@/assets/products/krimson-bucket-front.jpg";
import krimsonSkully from "@/assets/products/krimson-skully.jpg";
import kreamTeeAchievers from "@/assets/products/kream-tee-achievers.jpg";
import kreamTeeCorner from "@/assets/products/kream-tee-corner.png";
import kreamTee1 from "@/assets/products/kream-tee-1.jpg";
import kreamTeeAi95 from "@/assets/products/kream-tee-ai95.jpg";
import krimsonTee95th from "@/assets/products/krimson-tee-95th.jpg";

const apparelSizes = ["S", "M", "L", "XL", "2XL", "3XL", "4XL"];

const teeOptions = [
  { name: '"Achievers" KREAM Tee', image: kreamTeeAchievers, id: "achievers-kream-tee" },
  { name: '95th ANNIVERSARY "KREAM" Tee', image: kreamTeeCorner, id: "95th-anniversary-kream-tee" },
  { name: "K-Diamond Outline Tee, Kream", image: kreamTee1, id: "k-diamond-outline-tee-kream" },
  { name: "AI 95th Large Logo Tee", image: kreamTeeAi95, id: "ai-95th-large-logo-tee" },
  { name: "KRIMSON 95th Anniversary Tee", image: krimsonTee95th, id: "krimson-95th-anniversary-tee" },
];

interface DealConfig {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  images: string[];
  needsSize?: boolean;
  needsTeeSelection?: boolean;
  teeCount?: number;
}

const deals: DealConfig[] = [
  {
    id: "2-polos",
    title: "2 Polos",
    subtitle: "Both dry-fit polos",
    price: 70,
    originalPrice: 90,
    images: [dryFitPolo, kreamPerformancePolo],
    needsSize: true,
  },
  {
    id: "2-shirts",
    title: "2 Shirts",
    subtitle: "Pick any 2 tees",
    price: 55,
    originalPrice: 62,
    images: [kreamTeeAchievers, kreamTee1],
    needsSize: true,
    needsTeeSelection: true,
    teeCount: 2,
  },
  {
    id: "3-socks",
    title: "3 Socks",
    subtitle: "K-Diamond Socks (3 pairs)",
    price: 20,
    originalPrice: 27,
    images: [kreamSocks],
  },
  {
    id: "bucket-skully",
    title: "Bucket & Skully",
    subtitle: "Both headwear pieces",
    price: 40,
    originalPrice: 42,
    images: [krimsonBucketFront, krimsonSkully],
  },
];

const SizeSelect = ({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none w-full bg-secondary border border-border text-foreground text-[11px] tracking-wider uppercase px-3 py-2 pr-7 focus:outline-none focus:ring-1 focus:ring-foreground/30 cursor-pointer"
    >
      <option value="">{label}</option>
      {apparelSizes.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
    <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
  </div>
);

const PromoDealsSection = () => {
  const { addToCart } = useCart();
  const [sizes, setSizes] = useState<Record<string, string>>({});
  const [teeSelections, setTeeSelections] = useState<[string, string]>(["", ""]);

  const setSize = (dealId: string, size: string) => setSizes((prev) => ({ ...prev, [dealId]: size }));

  const handleAddDealToCart = (deal: DealConfig) => {
    if (deal.needsSize && !sizes[deal.id]) {
      toast.error("Please select a size.");
      return;
    }
    if (deal.needsTeeSelection) {
      if (!teeSelections[0] || !teeSelections[1]) {
        toast.error("Please select both tees.");
        return;
      }
      if (teeSelections[0] === teeSelections[1]) {
        toast.error("Please select two different tees.");
        return;
      }
    }

    const size = sizes[deal.id] || undefined;

    if (deal.id === "2-polos") {
      const unitPrice = (deal.price / 2).toFixed(2);
      addToCart({ id: "krimson-dry-fit-polo", name: "KRIMSON Dry-Fit Polo", price: `$${unitPrice}`, image: dryFitPolo, size });
      addToCart({ id: "kream-dry-fit-polo", name: "KREAM Dry-Fit Polo", price: `$${unitPrice}`, image: kreamPerformancePolo, size });
    } else if (deal.id === "2-shirts") {
      const unitPrice = (deal.price / 2).toFixed(2);
      const selected = teeSelections.map((name) => teeOptions.find((t) => t.name === name)!);
      selected.forEach((t) => {
        addToCart({ id: t.id, name: t.name, price: `$${unitPrice}`, image: t.image, size });
      });
    } else if (deal.id === "3-socks") {
      // Add 3 socks as quantity 3 at deal unit price
      const unitPrice = (deal.price / 3).toFixed(2);
      addToCart({ id: "kream-k-diamond-socks", name: "KREAM K-Diamond Socks", price: `$${unitPrice}`, image: kreamSocks });
      // Add 2 more to get quantity 3
      addToCart({ id: "kream-k-diamond-socks", name: "KREAM K-Diamond Socks", price: `$${unitPrice}`, image: kreamSocks });
      addToCart({ id: "kream-k-diamond-socks", name: "KREAM K-Diamond Socks", price: `$${unitPrice}`, image: kreamSocks });
    } else if (deal.id === "bucket-skully") {
      // Split $40 between bucket ($24) and skully ($16) — proportional to original prices
      addToCart({ id: "krimson-k-diamond-bucket-hat", name: "KRIMSON K-Diamond Bucket Hat", price: "$22.86", image: krimsonBucketFront });
      addToCart({ id: "krimson-k-diamond-skully", name: "KRIMSON K-Diamond Skully", price: "$17.14", image: krimsonSkully });
    }

    toast.success(`${deal.title} deal added to cart!`);
  };

  return (
    <section className="px-4 md:px-14 mb-10 md:mb-16">
      <FadeIn>
        <div className="flex items-center gap-2 mb-5">
          <Tag size={16} className="text-muted-foreground" />
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl tracking-tight text-foreground">
            Bundle Deals
          </h2>
        </div>
      </FadeIn>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {deals.map((deal, i) => (
          <FadeIn key={deal.id} delay={i * 80}>
            <div className="border border-border p-3 md:p-4 flex flex-col h-full">
              {/* Images */}
              <div className={`grid ${deal.images.length > 1 ? "grid-cols-2" : "grid-cols-1"} gap-1 mb-3`}>
                {deal.images.map((img, j) => (
                  <div key={j} className="aspect-square overflow-hidden bg-secondary">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              {/* Info */}
              <h3 className="font-display text-sm md:text-base tracking-tight text-foreground">{deal.title}</h3>
              <p className="text-[10px] md:text-xs text-muted-foreground mb-3">{deal.subtitle}</p>

              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-display text-lg md:text-xl text-foreground">${deal.price}</span>
                <span className="text-xs line-through text-muted-foreground">${deal.originalPrice}</span>
              </div>

              <div className="mt-auto space-y-2">
                {/* Tee selection for 2-shirts deal */}
                {deal.needsTeeSelection && (
                  <div className="space-y-1.5">
                    {[0, 1].map((idx) => (
                      <div key={idx} className="relative">
                        <select
                          value={teeSelections[idx]}
                          onChange={(e) => {
                            const next = [...teeSelections] as [string, string];
                            next[idx] = e.target.value;
                            setTeeSelections(next);
                          }}
                          className="appearance-none w-full bg-secondary border border-border text-foreground text-[10px] tracking-wider px-2 py-1.5 pr-6 focus:outline-none focus:ring-1 focus:ring-foreground/30 cursor-pointer"
                        >
                          <option value="">Tee {idx + 1}</option>
                          {teeOptions.map((t) => (
                            <option key={t.name} value={t.name}>{t.name}</option>
                          ))}
                        </select>
                        <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                )}

                {deal.needsSize && (
                  <SizeSelect
                    value={sizes[deal.id] || ""}
                    onChange={(v) => setSize(deal.id, v)}
                    label="Size"
                  />
                )}

                <button
                  onClick={() => handleAddDealToCart(deal)}
                  className="w-full bg-foreground text-background py-2 text-[10px] md:text-[11px] font-semibold tracking-[0.15em] uppercase hover:bg-foreground/90 transition-colors active:scale-[0.98]"
                >
                  Add to Cart · ${deal.price}
                </button>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default PromoDealsSection;
