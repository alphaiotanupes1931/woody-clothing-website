import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { toast } from "sonner";
import FadeIn from "./FadeIn";

import kreamTeeAchievers from "@/assets/products/kream-tee-achievers.jpg";
import kreamTeeCorner from "@/assets/products/kream-tee-corner.png";
import kreamTee1 from "@/assets/products/kream-tee-1.jpg";
import kreamTeeAi95 from "@/assets/products/kream-tee-ai95.jpg";
import krimsonTee95th from "@/assets/products/krimson-tee-95th.jpg";
import dryFitPolo from "@/assets/products/dry-fit-polo.jpg";
import kreamPerformancePolo from "@/assets/products/kream-performance-polo.jpg";
import ktrZip from "@/assets/products/ktr-zip.jpg";

const PACK_PRICE = 175;
const ORIGINAL_PRICE = 217;
const apparelSizes = ["S", "M", "L", "XL", "2XL", "3XL", "4XL"];

const teeOptions = [
  { id: "achievers-kream-tee", name: '"Achievers" KREAM Tee', image: kreamTeeAchievers },
  { id: "95th-anniversary-kream-tee", name: '95th ANNIVERSARY "KREAM" Tee', image: kreamTeeCorner },
  { id: "k-diamond-outline-tee-kream", name: "K-Diamond Outline Tee, Kream", image: kreamTee1 },
  { id: "ai-95th-large-logo-tee", name: "AI 95th Large Logo Tee", image: kreamTeeAi95 },
  { id: "krimson-95th-anniversary-tee", name: "KRIMSON 95th Anniversary Tee", image: krimsonTee95th },
];

const previewItems = [
  { img: kreamTeeAchievers, label: "Pick 2 Shirts" },
  { img: dryFitPolo, label: "2 Polos" },
  { img: ktrZip, label: "Quarter-Zip" },
  { img: kreamPerformancePolo, label: "KREAM Polo" },
];

interface Props {
  addToCart: (item: { id: string; name: string; price: string; image: string; size?: string }) => void;
}

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

const CompletePackSection = ({ addToCart }: Props) => {
  const [teeSize, setTeeSize] = useState("");
  const [poloSize, setPoloSize] = useState("");
  const [zipSize, setZipSize] = useState("");
  const [selectedTees, setSelectedTees] = useState<string[]>([]);

  const toggleTee = (id: string) => {
    setSelectedTees((prev) => {
      if (prev.includes(id)) return prev.filter((t) => t !== id);
      if (prev.length >= 2) {
        toast.error("You can only pick 2 shirts.");
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleAddPack = () => {
    if (selectedTees.length !== 2) {
      toast.error("Please select 2 shirts.");
      return;
    }
    if (!teeSize || !poloSize || !zipSize) {
      toast.error("Please select all sizes before adding to cart.");
      return;
    }

    // 5 items total: 2 tees + 2 polos + 1 zip
    const unitPrice = (PACK_PRICE / 5).toFixed(2);

    // Add selected tees
    selectedTees.forEach((teeId) => {
      const tee = teeOptions.find((t) => t.id === teeId)!;
      addToCart({ id: `pack-${tee.id}`, name: tee.name, price: `$${unitPrice}`, image: tee.image, size: teeSize });
    });

    // Add 2 polos
    addToCart({ id: "pack-krimson-dry-fit-polo", name: "KRIMSON Dry-Fit Polo", price: `$${unitPrice}`, image: dryFitPolo, size: poloSize });
    addToCart({ id: "pack-kream-dry-fit-polo", name: "KREAM Dry-Fit Polo", price: `$${unitPrice}`, image: kreamPerformancePolo, size: poloSize });

    // Add quarter zip
    addToCart({ id: "pack-krimson-quarter-zip", name: "KRIMSON Quarter-Zip Sweater", price: `$${unitPrice}`, image: ktrZip, size: zipSize });

    toast.success("Pack added to cart!");
  };

  return (
    <FadeIn>
      <section className="px-4 md:px-14 py-16 md:py-24 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">New Pack Alert 🧨</p>
            <h2 className="font-display text-3xl md:text-5xl tracking-tight text-foreground leading-[0.9] mb-4">
              THE ESSENTIALS
              <br />
              PACK
            </h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed mb-2">
              Pick 2 shirts, get both polos & the quarter-zip — 5 pieces, one price, free shipping.
            </p>
            <div className="flex items-center justify-center gap-3 mt-4">
              <span className="text-muted-foreground line-through text-sm">${ORIGINAL_PRICE}</span>
              <span className="font-display text-4xl text-foreground">${PACK_PRICE}</span>
            </div>
          </div>

          {/* Preview images */}
          <div className="grid grid-cols-4 gap-2 md:gap-3 mb-10">
            {previewItems.map((item, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="aspect-square overflow-hidden bg-secondary">
                  <img src={item.img} alt={item.label} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground text-center mt-2 hidden md:block">{item.label}</p>
              </FadeIn>
            ))}
          </div>

          {/* Tee selection */}
          <div className="max-w-lg mx-auto mb-6">
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3 text-center">
              Pick 2 of 5 Shirts ({selectedTees.length}/2 selected)
            </p>
            <div className="grid grid-cols-5 gap-2">
              {teeOptions.map((tee) => {
                const isSelected = selectedTees.includes(tee.id);
                return (
                  <button
                    key={tee.id}
                    onClick={() => toggleTee(tee.id)}
                    className={`relative aspect-square overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                      isSelected ? "border-foreground ring-1 ring-foreground" : "border-border hover:border-foreground/40"
                    }`}
                  >
                    <img src={tee.image} alt={tee.name} className="w-full h-full object-cover" />
                    {isSelected && (
                      <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center">
                        <Check size={20} className="text-background" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="flex flex-wrap justify-center gap-1 mt-2">
              {teeOptions.map((tee) => (
                <span key={tee.id} className={`text-[8px] tracking-wide ${selectedTees.includes(tee.id) ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                  {tee.name.replace(/"/g, "")}
                </span>
              ))}
            </div>
          </div>

          {/* Size selectors */}
          <div className="max-w-md mx-auto mb-6">
            <div className="grid grid-cols-3 gap-2">
              <SizeSelect value={teeSize} onChange={setTeeSize} label="Shirt Size" />
              <SizeSelect value={poloSize} onChange={setPoloSize} label="Polo Size" />
              <SizeSelect value={zipSize} onChange={setZipSize} label="Zip Size" />
            </div>
            <p className="text-[9px] text-muted-foreground text-center mt-2 tracking-wider">
              Both shirts same size · Both polos same size
            </p>
          </div>

          <div className="text-center">
            <button
              onClick={handleAddPack}
              className="inline-block bg-foreground text-background px-10 py-4 text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-foreground/90 transition-all duration-300 cursor-pointer disabled:opacity-50"
            >
              Add to Cart · ${PACK_PRICE}
            </button>
            <p className="text-[10px] text-muted-foreground mt-3 tracking-wide">5 ITEMS · FREE SHIPPING · SAVE ${ORIGINAL_PRICE - PACK_PRICE}</p>
          </div>
        </div>
      </section>
    </FadeIn>
  );
};

export default CompletePackSection;
