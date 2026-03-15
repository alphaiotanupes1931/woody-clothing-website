import { useState, useEffect } from "react";
import { X, Loader2, ChevronDown, ArrowLeft } from "lucide-react";
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
const PROMO_END = new Date("2026-12-31T23:59:59");
const BUNDLE_PRICE = 259;

const apparelSizes = ["S", "M", "L", "XL", "2XL", "3XL"];

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY","DC"
];

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

  // Step: "sizes" or "info"
  const [step, setStep] = useState<"sizes" | "info">("sizes");

  // Customer info
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  useEffect(() => {
    if (window.location.pathname === "/admin") return;
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

  const handleContinueToInfo = () => {
    if (!teeSize || !poloSize || !zipSize) {
      toast.error("Please select all sizes before continuing.");
      return;
    }
    setStep("info");
  };

  const handleCheckout = async () => {
    if (!customerName.trim() || !customerEmail.trim() || !address.trim() || !city.trim() || !state || !zip.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!/^\d{5}$/.test(zip.trim())) {
      toast.error("Please enter a valid 5-digit ZIP code.");
      return;
    }

    setLoading(true);
    try {
      const checkoutItems = bundleItems.map((item) => {
        let size: string | null = null;
        if (item.sizeKey === "tee") size = teeSize;
        if (item.sizeKey === "polo") size = poloSize;
        if (item.sizeKey === "zip") size = zipSize;

        const imageUrl = item.image.startsWith("http")
          ? item.image
          : `${window.location.origin}${item.image}`;

        return {
          name: size ? `${item.name} (${size})` : item.name,
          price: 0,
          quantity: 1,
          image: imageUrl,
          size,
        };
      });

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
          bundleItems: checkoutItems,
          customerName: customerName.trim(),
          customerEmail: customerEmail.trim(),
          shippingAddress: {
            address: address.trim(),
            city: city.trim(),
            state,
            zip: zip.trim(),
          },
          shipping: { label: "Free Shipping", cost: 0, service: "free" },
          metadata: {
            bundle: "true",
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
  const allInfoFilled = customerName.trim() && customerEmail.trim() && address.trim() && city.trim() && state && zip.trim();

  const inputClass = "w-full bg-secondary border border-border text-foreground text-xs tracking-wider px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-foreground/30 placeholder:text-muted-foreground";

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
          className="pointer-events-auto w-full max-w-lg lg:max-w-2xl bg-background border border-border shadow-2xl max-h-[85vh] flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-foreground text-background px-4 py-2.5 sm:px-6 sm:py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              {step === "info" && (
                <button onClick={() => setStep("sizes")} className="text-background/50 hover:text-background transition-colors p-1">
                  <ArrowLeft size={16} strokeWidth={1.5} />
                </button>
              )}
              <div>
                <h2 className="text-sm sm:text-base font-bold tracking-[0.1em] uppercase leading-tight">
                  {step === "sizes" ? "Get the Whole Pack" : "Shipping Info"}
                </h2>
                <p className="text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-background/50">
                  {step === "sizes" ? "Limited Time • Ends 3/14/26" : "Step 2 of 2 • Free Shipping"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xl sm:text-2xl font-bold leading-none">$259</span>
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

          {step === "sizes" ? (
            <>
              {/* Items grid */}
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
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-[7px] sm:text-[8px] text-muted-foreground leading-tight mt-0.5 truncate">
                        {item.name.replace(/"/g, "")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Size selectors + CTA */}
              <div className="px-3 py-2.5 sm:px-5 sm:py-3 border-t border-border flex-shrink-0">
                <div className="flex flex-col sm:flex-row sm:items-end gap-2">
                  <div className="flex-1 grid grid-cols-3 gap-1.5">
                    <SizeSelector label="Tee" value={teeSize} onChange={setTeeSize} />
                    <SizeSelector label="Polo" value={poloSize} onChange={setPoloSize} />
                    <SizeSelector label="Zip" value={zipSize} onChange={setZipSize} />
                  </div>
                  <button
                    onClick={handleContinueToInfo}
                    disabled={!allSizesSelected}
                    className="sm:w-auto w-full bg-foreground text-background py-2.5 px-6 text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase hover:bg-foreground/90 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    {allSizesSelected ? "Continue" : "Select Sizes"}
                  </button>
                </div>
                <p className="text-center text-[7px] sm:text-[8px] text-muted-foreground mt-1.5 tracking-wider">
                  Excludes Fitted Hat • Free shipping included
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Customer info form */}
              <div className="flex-1 overflow-y-auto px-3 py-3 sm:px-5 sm:py-4 space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className={inputClass}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Street Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={inputClass}
                />
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={inputClass}
                  />
                  <div className="relative">
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className={`${inputClass} appearance-none pr-8 cursor-pointer`}
                    >
                      <option value="">State</option>
                      {US_STATES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
                  </div>
                  <input
                    type="text"
                    placeholder="ZIP"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    maxLength={5}
                    className={inputClass}
                  />
                </div>

                {/* Order summary */}
                <div className="border-t border-border pt-2.5 mt-1">
                  <p className="text-[8px] tracking-[0.2em] uppercase text-muted-foreground mb-1.5">Order Summary</p>
                  <div className="space-y-0.5 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>95th Anniversary Complete Pack (10 items)</span>
                      <span className="text-foreground font-medium">$259.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-foreground font-medium">FREE</span>
                    </div>
                    <div className="flex justify-between text-foreground font-semibold text-sm pt-1 border-t border-border mt-1">
                      <span>Total</span>
                      <span>$259.00</span>
                    </div>
                  </div>
                  <p className="text-[7px] text-muted-foreground mt-1">
                    Sizes: Tee {teeSize} · Polo {poloSize} · Zip {zipSize}
                  </p>
                </div>
              </div>

              {/* Checkout CTA */}
              <div className="px-3 py-2.5 sm:px-5 sm:py-3 border-t border-border flex-shrink-0">
                <button
                  onClick={handleCheckout}
                  disabled={loading || !allInfoFilled}
                  className="w-full bg-foreground text-background py-3 text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase hover:bg-foreground/90 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 size={13} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Complete Purchase · $259"
                  )}
                </button>
              </div>
            </>
          )}
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
