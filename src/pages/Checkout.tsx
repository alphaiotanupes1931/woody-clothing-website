import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { allProducts } from "@/data/products";
import { computePackage } from "@/data/productShipping";
import { toast } from "sonner";
import { Loader2, Truck, ArrowLeft, Package, ShieldCheck } from "lucide-react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ShippingRate {
  id: string;
  service: string;
  label: string;
  estimate: string;
  price: number;
  currency: string;
}

const FREE_SHIPPING_THRESHOLD = 149;

const Checkout = () => {
  const { items, cartTotal, clearCart, totalItems } = useCart();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const [rates, setRates] = useState<ShippingRate[]>([]);
  const [selectedRate, setSelectedRate] = useState<ShippingRate | null>(null);
  const [ratesLoading, setRatesLoading] = useState(false);
  const [ratesFetched, setRatesFetched] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const subtotal = parseFloat(cartTotal);
  const freeGroundShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) navigate("/shop");
  }, [items.length, navigate]);

  // Compute package specs from cart items
  const getPackageSpec = useCallback(() => {
    const cartSpecs = items.map((item) => {
      const baseId = item.id.split("-").slice(0, -1).join("-") || item.id;
      const product = allProducts.find(
        (p) => p.id === baseId || p.id === item.id || item.id.startsWith(p.id)
      );
      return {
        category: product?.category || "Tees",
        quantity: item.quantity,
      };
    });
    return computePackage(cartSpecs);
  }, [items]);

  // Fetch shipping rates when zip is 5 digits
  const fetchRates = useCallback(async (zipCode: string) => {
    if (zipCode.length !== 5) return;
    setRatesLoading(true);
    setRatesFetched(false);
    try {
      const pkg = getPackageSpec();
      const { data, error } = await supabase.functions.invoke("get-shipping-rates", {
        body: {
          destZip: zipCode,
          destState: state,
          destCity: city,
          weight: pkg.weight,
          length: pkg.length,
          width: pkg.width,
          height: pkg.height,
        },
      });

      if (error) throw error;

      let fetchedRates: ShippingRate[] = data?.rates || [];

      // If free shipping applies, set Ground Advantage to $0
      if (freeGroundShipping) {
        fetchedRates = fetchedRates.map((r) =>
          r.service === "usps_ground_advantage" || r.service === "flat_rate"
            ? { ...r, price: 0, label: r.label + " — FREE" }
            : r
        );
      }

      setRates(fetchedRates);
      // Auto-select cheapest
      if (fetchedRates.length > 0) {
        const cheapest = fetchedRates.reduce((a, b) => (a.price <= b.price ? a : b));
        setSelectedRate(cheapest);
      }
      setRatesFetched(true);
    } catch (err) {
      console.error("Failed to fetch rates:", err);
      // Fallback
      const fallback: ShippingRate = {
        id: "fallback",
        service: "flat_rate",
        label: freeGroundShipping ? "Standard Shipping — FREE" : "Standard Shipping",
        estimate: "5–7 business days",
        price: freeGroundShipping ? 0 : 9.99,
        currency: "USD",
      };
      setRates([fallback]);
      setSelectedRate(fallback);
      setRatesFetched(true);
    } finally {
      setRatesLoading(false);
    }
  }, [getPackageSpec, state, city, freeGroundShipping]);

  useEffect(() => {
    if (zip.length === 5) {
      fetchRates(zip);
    } else {
      setRates([]);
      setSelectedRate(null);
      setRatesFetched(false);
    }
  }, [zip, fetchRates]);

  const shippingCost = selectedRate?.price || 0;
  const orderTotal = (subtotal + shippingCost).toFixed(2);

  const handleCheckout = async () => {
    if (!name || !email || !address || !city || !state || !zip) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!selectedRate) {
      toast.error("Please select a shipping option.");
      return;
    }

    setCheckoutLoading(true);
    try {
      const checkoutItems = items.map((item) => {
        const imageUrl = item.image.startsWith("http")
          ? item.image
          : `${window.location.origin}${item.image}`;
        const unitPrice = parseFloat(item.price.replace(/[^0-9.]/g, ""));

        let finalPrice = unitPrice;
        if (item.id.startsWith("kream-k-diamond-socks") && item.quantity >= 3) {
          const bundlesOf3 = Math.floor(item.quantity / 3);
          const remainder = item.quantity % 3;
          const totalSocksPrice = bundlesOf3 * 20 + remainder * unitPrice;
          finalPrice = parseFloat((totalSocksPrice / item.quantity).toFixed(2));
        }

        return {
          name: item.name,
          price: finalPrice,
          quantity: item.quantity,
          image: imageUrl,
        };
      });

      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          items: checkoutItems,
          shipping: {
            cost: shippingCost,
            label: selectedRate.label,
            service: selectedRate.service,
            estimate: selectedRate.estimate,
          },
          customerEmail: email,
          customerName: name,
          shippingAddress: { address, city, state, zip },
        },
      });

      if (error) throw error;
      if (data?.url) {
        // Store shipping info for confirmation page
        sessionStorage.setItem(
          "order-shipping",
          JSON.stringify({
            method: selectedRate.label,
            estimate: selectedRate.estimate,
            cost: shippingCost,
          })
        );
        clearCart();
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err: any) {
      console.error("Checkout error:", err);
      toast.error("Checkout failed. Please try again.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header solid />

      <main className="pt-28 md:pt-36 pb-20 px-4 md:px-14">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            Back
          </button>

          <h1 className="font-display text-4xl md:text-5xl tracking-wide text-foreground mb-10">
            CHECKOUT
          </h1>

          <div className="grid md:grid-cols-5 gap-10">
            {/* LEFT: Form */}
            <div className="md:col-span-3 space-y-8">
              {/* Contact */}
              <section>
                <h2 className="text-xs font-bold tracking-[0.2em] uppercase mb-4">Contact</h2>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                  />
                </div>
              </section>

              {/* Shipping Address */}
              <section>
                <h2 className="text-xs font-bold tracking-[0.2em] uppercase mb-4">Shipping Address</h2>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Street Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                  />
                  <div className="grid grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="col-span-1 border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={state}
                      onChange={(e) => setState(e.target.value.toUpperCase().slice(0, 2))}
                      maxLength={2}
                      className="col-span-1 border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                    />
                    <input
                      type="text"
                      placeholder="ZIP Code"
                      value={zip}
                      onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
                      maxLength={5}
                      className="col-span-1 border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                    />
                  </div>
                </div>
              </section>

              {/* Shipping Options */}
              <section>
                <h2 className="text-xs font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
                  <Truck size={16} strokeWidth={1.5} />
                  Shipping Method
                </h2>

                {zip.length < 5 && (
                  <p className="text-xs text-muted-foreground">Enter your ZIP code to see shipping options.</p>
                )}

                {ratesLoading && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground py-4">
                    <Loader2 size={14} className="animate-spin" />
                    Fetching live USPS rates...
                  </div>
                )}

                {ratesFetched && rates.length > 0 && (
                  <div className="space-y-2">
                    {rates.map((rate) => (
                      <label
                        key={rate.id}
                        className={`flex items-center justify-between border px-4 py-3 cursor-pointer transition-colors ${
                          selectedRate?.id === rate.id
                            ? "border-foreground bg-secondary/50"
                            : "border-border hover:border-foreground/30"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shipping"
                            checked={selectedRate?.id === rate.id}
                            onChange={() => setSelectedRate(rate)}
                            className="accent-foreground"
                          />
                          <div>
                            <span className="text-sm font-medium">{rate.label}</span>
                            <p className="text-[10px] text-muted-foreground">{rate.estimate}</p>
                          </div>
                        </div>
                        <span className="text-sm font-semibold">
                          {rate.price === 0 ? "FREE" : `$${rate.price.toFixed(2)}`}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </section>
            </div>

            {/* RIGHT: Order Summary */}
            <div className="md:col-span-2">
              <div className="border border-border p-5 sticky top-36">
                <h2 className="text-xs font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
                  <Package size={16} strokeWidth={1.5} />
                  Order Summary ({totalItems})
                </h2>

                <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-14 h-16 bg-secondary flex-shrink-0 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">{item.name}</p>
                        {item.size && <p className="text-[10px] text-muted-foreground">Size: {item.size}</p>}
                        <p className="text-[10px] text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-xs font-medium">{item.price}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${cartTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {!ratesFetched
                        ? "—"
                        : shippingCost === 0
                        ? "FREE"
                        : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-base border-t border-border pt-2 mt-2">
                    <span>Total</span>
                    <span>${orderTotal}</span>
                  </div>
                </div>

                {freeGroundShipping && (
                  <div className="mt-3 text-center text-[10px] tracking-wider uppercase text-muted-foreground bg-secondary py-2">
                    ✓ Free ground shipping applied
                  </div>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={checkoutLoading || !selectedRate}
                  className="w-full mt-4 bg-foreground text-background py-4 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-foreground/90 transition-colors active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {checkoutLoading ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Complete Purchase"
                  )}
                </button>

                <div className="mt-3 flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
                  <ShieldCheck size={12} strokeWidth={1.5} />
                  Secure checkout powered by Stripe
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
