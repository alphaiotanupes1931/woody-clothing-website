import { useState, useEffect } from "react";
import { X, Loader2, ChevronDown, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

import kreamTeeAchievers from "@/assets/products/kream-tee-achievers.jpg";
import kreamTeeCorner from "@/assets/products/kream-tee-corner.png";
import kreamTee1 from "@/assets/products/kream-tee-1.jpg";
import kreamTeeAi95 from "@/assets/products/kream-tee-ai95.jpg";
import krimsonTee95th from "@/assets/products/krimson-tee-95th.jpg";
import ktrZip from "@/assets/products/ktr-zip.jpg";
import dryFitPolo from "@/assets/products/dry-fit-polo.jpg";
import kreamPerformancePolo from "@/assets/products/kream-performance-polo.jpg";

const PROMO_START = new Date("2026-02-21T00:00:00");
const PROMO_END = new Date("2026-12-31T23:59:59");
const BUNDLE_PRICE = 175;

const apparelSizes = ["S", "M", "L", "XL", "2XL", "3XL", "4XL"];

const teeOptions = [
  { id: "achievers-kream-tee", name: '"Achievers" KREAM Tee', image: kreamTeeAchievers },
  { id: "95th-anniversary-kream-tee", name: '95th ANNIVERSARY "KREAM" Tee', image: kreamTeeCorner },
  { id: "k-diamond-outline-tee-kream", name: "K-Diamond Outline Tee, Kream", image: kreamTee1 },
  { id: "ai-95th-large-logo-tee", name: "AI 95th Large Logo Tee", image: kreamTeeAi95 },
  { id: "krimson-95th-anniversary-tee", name: "KRIMSON 95th Anniversary Tee", image: krimsonTee95th },
];

interface BundleItem {
  name: string;
  image: string;
  sizeKey: "tee" | "polo" | "zip";
}

const fixedItems: BundleItem[] = [
  { name: "KRIMSON Dry-Fit Polo", image: dryFitPolo, sizeKey: "polo" },
  { name: "KREAM Dry-Fit Polo", image: kreamPerformancePolo, sizeKey: "polo" },
  { name: "KRIMSON Quarter-Zip Sweater", image: ktrZip, sizeKey: "zip" },
];

const SizeSelector = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none w-full bg-secondary border border-border text-foreground text-xs tracking-wider uppercase px-3 py-2.5 pr-8 focus:outline-none focus:ring-1 focus:ring-foreground/30 cursor-pointer"
    >
      <option value="">{label}</option>
      {apparelSizes.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
    <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
  </div>
);

const PromoModal = () => {
  const [show, setShow] = useState(false);
  const [closing, setClosing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [teeSize, setTeeSize] = useState("");
  const [poloSize, setPoloSize] = useState("");
  const [zipSize, setZipSize] = useState("");
  const [selectedTees, setSelectedTees] = useState<string[]>([]);

  useEffect(() => {
    if (window.location.pathname === "/admin") return;
    const now = new Date();
    if (now < PROMO_START || now > PROMO_END) return;
    if (sessionStorage.getItem("promo-dismissed")) return;
    const timer = setTimeout(() => setShow(true), 8000);
    return () => clearTimeout(timer);
  }, []);

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

  const handleClose = () => {
    setClosing(true);
    sessionStorage.setItem("promo-dismissed", "true");
    setTimeout(() => { setShow(false); setClosing(false); }, 300);
  };

  const handleCheckout = async () => {
    if (selectedTees.length !== 2) { toast.error("Please select 2 shirts."); return; }
    if (!teeSize || !poloSize || !zipSize) { toast.error("Please select all sizes."); return; }

    setLoading(true);
    try {
      const selectedTeeItems = selectedTees.map((id) => teeOptions.find((t) => t.id === id)!);

      const checkoutItems = [
        ...selectedTeeItems.map((t) => ({
          name: `${t.name} (${teeSize})`,
          price: 0, quantity: 1,
          image: t.image.startsWith("http") ? t.image : `${window.location.origin}${t.image}`,
          size: teeSize,
        })),
        ...fixedItems.map((item) => {
          const size = item.sizeKey === "polo" ? poloSize : zipSize;
          return {
            name: `${item.name} (${size})`,
            price: 0, quantity: 1,
            image: item.image.startsWith("http") ? item.image : `${window.location.origin}${item.image}`,
            size,
          };
        }),
      ];

      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          items: [{ name: "Essentials Pack (5 Items)", price: BUNDLE_PRICE, quantity: 1, image: checkoutItems[0].image }],
          bundleItems: checkoutItems,
          collectShipping: true,
          shipping: { label: "Free Shipping", cost: 0, service: "free" },
          metadata: {
            bundle: "true",
            teeSize, poloSize, zipSize,
            selectedTees: selectedTees.join(", "),
            items: checkoutItems.map((i) => i.name).join(", "),
          },
        },
      });

      if (error) throw error;
      if (data?.url) window.location.href = data.url;
      else throw new Error("No checkout URL returned");
    } catch (err: any) {
      console.error("Promo checkout error:", err);
      toast.error("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  const allReady = selectedTees.length === 2 && teeSize && poloSize && zipSize;

  return (
    <>
      <div
        className={`fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${closing ? "opacity-0" : "opacity-100"}`}
        onClick={handleClose}
      />
      <div
        className={`fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6 pointer-events-none transition-all duration-300 ${closing ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
        style={{ animation: closing ? undefined : "promoSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        <div className="pointer-events-auto w-full max-w-lg lg:max-w-2xl bg-background border border-border shadow-2xl max-h-[85vh] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="relative bg-foreground text-background px-4 py-2.5 sm:px-6 sm:py-3 flex items-center justify-between flex-shrink-0">
            <div>
              <h2 className="text-sm sm:text-base font-bold tracking-[0.1em] uppercase leading-tight"><h2 className="text-sm sm:text-base font-bold tracking-[0.1em] uppercase leading-tight">New Pack Alert</h2>
              <p className="text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-background/50">Free Shipping Included</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xl sm:text-2xl font-bold leading-none">${BUNDLE_PRICE}</span>
                <span className="text-xs line-through text-background/40 ml-1.5">$217</span>
              </div>
              <button onClick={handleClose} className="text-background/50 hover:text-background transition-colors p-1" aria-label="Close promo">
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-3 py-2.5 sm:px-5 sm:py-3">
            {/* Pick 2 shirts */}
            <p className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
              Pick 2 of 5 Shirts ({selectedTees.length}/2)
            </p>
            <div className="grid grid-cols-5 gap-1.5 mb-4">
              {teeOptions.map((tee) => {
                const isSelected = selectedTees.includes(tee.id);
                return (
                  <button key={tee.id} onClick={() => toggleTee(tee.id)} className={`relative aspect-square overflow-hidden border-2 transition-all cursor-pointer ${isSelected ? "border-foreground ring-1 ring-foreground" : "border-border hover:border-foreground/40"}`}>
                    <img src={tee.image} alt={tee.name} className="w-full h-full object-cover" />
                    {isSelected && (
                      <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center">
                        <Check size={18} className="text-background" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Fixed items */}
            <p className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground mb-2">Also Included</p>
            <div className="grid grid-cols-3 gap-1.5">
              {fixedItems.map((item, i) => (
                <div key={i} style={{ animation: `promoItemFade 0.3s ease-out ${0.03 * i}s both` }}>
                  <div className="aspect-square bg-secondary overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-[7px] sm:text-[8px] text-muted-foreground leading-tight mt-0.5 truncate">{item.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Size selectors + CTA */}
          <div className="px-3 py-2.5 sm:px-5 sm:py-3 border-t border-border flex-shrink-0">
            <div className="flex flex-col sm:flex-row sm:items-end gap-2">
              <div className="flex-1 grid grid-cols-3 gap-1.5">
                <SizeSelector label="Shirt" value={teeSize} onChange={setTeeSize} />
                <SizeSelector label="Polo" value={poloSize} onChange={setPoloSize} />
                <SizeSelector label="Zip" value={zipSize} onChange={setZipSize} />
              </div>
              <button
                onClick={handleCheckout}
                disabled={!allReady || loading}
                className="sm:w-auto w-full bg-foreground text-background py-2.5 px-6 text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase hover:bg-foreground/90 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {loading ? (<><Loader2 size={13} className="animate-spin" />Processing...</>) : allReady ? `Checkout · $${BUNDLE_PRICE}` : "Select Items & Sizes"}
              </button>
            </div>
            <p className="text-center text-[7px] sm:text-[8px] text-muted-foreground mt-1.5 tracking-wider">
              5 Items · Free shipping · Stripe handles payment & shipping
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes promoSlideUp { from { opacity: 0; transform: translateY(20px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes promoItemFade { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </>
  );
};

export default PromoModal;
