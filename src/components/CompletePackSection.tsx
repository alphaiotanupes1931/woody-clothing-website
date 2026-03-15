import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";
import FadeIn from "./FadeIn";

import flexKrimsonKap from "@/assets/products/flex-krimson-kap.jpg";
import kreamTeeAchievers from "@/assets/products/kream-tee-achievers.jpg";
import ktrZip from "@/assets/products/ktr-zip.jpg";
import kreamSocks from "@/assets/products/kream-socks.jpg";
import kreamTeeCorner from "@/assets/products/kream-tee-corner.png";
import kreamTee1 from "@/assets/products/kream-tee-1.jpg";
import kreamTeeAi95 from "@/assets/products/kream-tee-ai95.jpg";
import krimsonTee95th from "@/assets/products/krimson-tee-95th.jpg";
import dryFitPolo from "@/assets/products/dry-fit-polo.jpg";
import kreamPerformancePolo from "@/assets/products/kream-performance-polo.jpg";

const PACK_PRICE = 259;
const apparelSizes = ["S", "M", "L", "XL", "2XL", "3XL"];

const packItems = [
  { id: "achievers-kream-tee", name: '"Achievers" KREAM Tee', image: kreamTeeAchievers, sizeKey: "tee" },
  { id: "95th-anniversary-kream-tee", name: '95th ANNIVERSARY "KREAM" Tee', image: kreamTeeCorner, sizeKey: "tee" },
  { id: "k-diamond-outline-tee-kream", name: "K-Diamond Outline Tee, Kream", image: kreamTee1, sizeKey: "tee" },
  { id: "ai-95th-large-logo-tee", name: "AI 95th Large Logo Tee", image: kreamTeeAi95, sizeKey: "tee" },
  { id: "krimson-95th-anniversary-tee", name: "KRIMSON 95th Anniversary Tee", image: krimsonTee95th, sizeKey: "tee" },
  { id: "krimson-dry-fit-polo", name: "KRIMSON Dry-Fit Polo", image: dryFitPolo, sizeKey: "polo" },
  { id: "kream-dry-fit-polo", name: "KREAM Dry-Fit Polo", image: kreamPerformancePolo, sizeKey: "polo" },
  { id: "krimson-quarter-zip-sweater", name: "KRIMSON Quarter-Zip Sweater", image: ktrZip, sizeKey: "zip" },
  { id: "krimson-flexfit-k-diamond-kap", name: "KRIMSON FlexFit K-Diamond Kap", image: flexKrimsonKap, sizeKey: null },
  { id: "kream-k-diamond-socks-pack", name: "KREAM K-Diamond Socks (3 pairs)", image: kreamSocks, sizeKey: null },
];

const previewItems = [
  { img: flexKrimsonKap, label: "FlexFit Kap" },
  { img: kreamTeeAchievers, label: "Achievers Tee" },
  { img: ktrZip, label: "Quarter-Zip" },
  { img: kreamSocks, label: "K-Diamond Socks" },
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

  const handleAddPack = () => {
    if (!teeSize || !poloSize || !zipSize) {
      toast.error("Please select all sizes before adding to cart.");
      return;
    }

    const unitPrice = (PACK_PRICE / packItems.length).toFixed(2);
    packItems.forEach((item) => {
      let size: string | undefined;
      if (item.sizeKey === "tee") size = teeSize;
      else if (item.sizeKey === "polo") size = poloSize;
      else if (item.sizeKey === "zip") size = zipSize;

      addToCart({
        id: `pack-${item.id}`,
        name: item.name,
        price: `$${unitPrice}`,
        image: item.image,
        size,
      });
    });
    toast.success("Complete Pack added to cart!");
  };

  return (
    <FadeIn>
      <section className="px-4 md:px-14 py-16 md:py-24 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">Limited Edition</p>
            <h2 className="font-display text-3xl md:text-5xl tracking-tight text-foreground leading-[0.9] mb-4">
              95TH ANNIVERSARY
              <br />
              COMPLETE PACK
            </h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed mb-2">
              Get the entire 95th Anniversary collection — 10 pieces including tees, polos, quarter-zip, hat, socks & skully. All for one price, with free shipping.
            </p>
            <div className="flex items-center justify-center gap-3 mt-4">
              <span className="text-muted-foreground line-through text-sm">$331</span>
              <span className="font-display text-4xl text-foreground">$259</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 md:gap-3 mb-10">
            {previewItems.map((item, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="aspect-square overflow-hidden bg-secondary">
                  <img
                    src={item.img}
                    alt={item.label}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground text-center mt-2 hidden md:block">{item.label}</p>
              </FadeIn>
            ))}
          </div>

          {/* Size selectors */}
          <div className="max-w-md mx-auto mb-6">
            <div className="grid grid-cols-3 gap-2">
              <SizeSelect value={teeSize} onChange={setTeeSize} label="Tee Size" />
              <SizeSelect value={poloSize} onChange={setPoloSize} label="Polo Size" />
              <SizeSelect value={zipSize} onChange={setZipSize} label="Zip Size" />
            </div>
            <p className="text-[9px] text-muted-foreground text-center mt-2 tracking-wider">
              Excludes Fitted Hat · All tees same size · Both polos same size
            </p>
          </div>

          <div className="text-center">
            <button
              onClick={handleAddPack}
              className="inline-block bg-foreground text-background px-10 py-4 text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-foreground/90 transition-all duration-300 cursor-pointer disabled:opacity-50"
            >
              Add to Cart · $259
            </button>
            <p className="text-[10px] text-muted-foreground mt-3 tracking-wide">10 ITEMS · FREE SHIPPING · SAVE $72</p>
          </div>
        </div>
      </section>
    </FadeIn>
  );
};

export default CompletePackSection;
