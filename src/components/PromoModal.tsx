import { useState, useEffect } from "react";
import { X, Loader2, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Product images
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


const PROMO_START = new Date("2026-02-21T00:00:00");
const PROMO_END = new Date("2026-03-14T23:59:59");
const BUNDLE_PRICE = 249;

const apparelSizes = ["S", "M", "L", "XL", "2XL", "3XL"];

interface BundleItem {
  name: string;
  image: string;
  needsSize?: boolean;
  sizeKey?: string;
}

const bundleItems: BundleItem[] = [
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

const SizeSelector = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none w-full bg-secondary border border-border text-foreground text-xs tracking-wider uppercase px-3 py-2.5 pr-8 focus:outline-none focus:ring-1 focus:ring-foreground/30 cursor-pointer"
    >
      <option value="">{label}</option>
      {apparelSizes.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
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

  useEffect(() => {
    const now = new Date();
    if (now < PROMO_START || now > PROMO_END) return;
    if (sessionStorage.getItem("promo-dismissed")) return;

    const timer = setTimeout(() => setShow(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setClosing(true);
    sessionStorage.setItem("promo-dismissed", "true");
    setTimeout(() => {
      setShow(false);
      setClosing(false);
    }, 300);
  };

  const handleCheckout = async () => {
    if (!teeSize || !poloSize || !zipSize) {
      toast.error("Please select all sizes before checking out.");
      return;
    }

    setLoading(true);
    try {
      const checkoutItems = bundleItems.map((item) => {
        let sizeSuffix = "";
        if (item.sizeKey === "tee") sizeSuffix = ` (${teeSize})`;
        if (item.sizeKey === "polo") sizeSuffix = ` (${poloSize})`;
        if (item.sizeKey === "zip") sizeSuffix = ` (${zipSize})`;

        const imageUrl = item.image.startsWith("http")
          ? item.image
          : `${window.location.origin}${item.image}`;

        return {
          name: `${item.name}${sizeSuffix}`,
          price: 0, // individual price zeroed; bundle total set below
          quantity: 1,
          image: imageUrl,
        };
      });

      // Set the first item's price to the bundle total so Stripe shows $199
      checkoutItems[0].price = BUNDLE_PRICE;
      // Rename first item to reflect the bundle
      checkoutItems[0].name = `95th Anniversary Complete Pack · $${BUNDLE_PRICE}`;

      // Send as a single bundle line item for cleaner checkout
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          items: [
            {
              name: `95th Anniversary Complete Pack`,
              price: BUNDLE_PRICE,
              quantity: 1,
              image: checkoutItems[0].image,
            },
          ],
          metadata: {
            bundle: true,
            teeSize,
            poloSize,
            zipSize,
            items: bundleItems.map((i) => i.name).join(", "),
          },
        },
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err: any) {
      console.error("Promo checkout error:", err);
      toast.error("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  const allSizesSelected = teeSize && poloSize && zipSize;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${closing ? "opacity-0" : "opacity-100"}`}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6 pointer-events-none transition-all duration-300 ${closing ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
        style={{ animation: closing ? undefined : "promoSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        <div
          className="pointer-events-auto w-full max-w-lg lg:max-w-2xl bg-background border border-border shadow-2xl max-h-[70vh] flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header — compact */}
          <div className="relative bg-foreground text-background px-4 py-2.5 sm:px-6 sm:py-3 flex items-center justify-between flex-shrink-0">
            <div>
              <div>
                <h2 className="text-sm sm:text-base font-bold tracking-[0.1em] uppercase leading-tight">
                  Get the Whole Pack
                </h2>
                <p className="text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-background/50">
                  Limited Time • Ends 3/14/26
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xl sm:text-2xl font-bold leading-none">$249</span>
                <span className="text-xs line-through text-background/40 ml-1.5">$331</span>
              </div>
              <button
                onClick={handleClose}
                className="text-background/50 hover:text-background transition-colors p-1"
                aria-label="Close promo"
              >
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Items grid — compact thumbnails */}
          <div className="flex-1 overflow-y-auto px-3 py-2.5 sm:px-5 sm:py-3">
            <p className="text-[8px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
              10 Items Included
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
              {bundleItems.map((item, i) => (
                <div
                  key={i}
                  className="group relative"
                  style={{ animation: `promoItemFade 0.3s ease-out ${0.03 * i}s both` }}
                >
                  <div className="aspect-square bg-secondary overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-[7px] sm:text-[8px] text-muted-foreground leading-tight mt-0.5 truncate">
                    {item.name.replace(/"/g, "")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Size selectors + CTA — horizontal */}
          <div className="px-3 py-2.5 sm:px-5 sm:py-3 border-t border-border flex-shrink-0">
            <div className="flex flex-col sm:flex-row sm:items-end gap-2">
              <div className="flex-1 grid grid-cols-3 gap-1.5">
                <SizeSelector label="Tee" value={teeSize} onChange={setTeeSize} />
                <SizeSelector label="Polo" value={poloSize} onChange={setPoloSize} />
                <SizeSelector label="Zip" value={zipSize} onChange={setZipSize} />
              </div>
              <button
                onClick={handleCheckout}
                disabled={loading || !allSizesSelected}
                className="sm:w-auto w-full bg-foreground text-background py-2.5 px-6 text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase hover:bg-foreground/90 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {loading ? (
                  <>
                    <Loader2 size={13} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  allSizesSelected ? "Checkout · $249" : "Select Sizes"
                )}
              </button>
            </div>
            <p className="text-center text-[7px] sm:text-[8px] text-muted-foreground mt-1.5 tracking-wider">
              Excludes Fitted Hat • Free shipping included
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes promoSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes promoItemFade {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
};

export default PromoModal;
