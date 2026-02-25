import { Link } from "react-router-dom";
import { CheckCircle, Package, ArrowRight, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ShippingInfo {
  method: string;
  estimate: string;
  cost: number;
}

const OrderConfirmation = () => {
  const orderNumber = `AI-${Date.now().toString().slice(-6)}`;
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("order-shipping");
    if (stored) {
      try {
        setShippingInfo(JSON.parse(stored));
      } catch {}
      sessionStorage.removeItem("order-shipping");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header solid />

      <main className="pt-28 md:pt-36 pb-20 px-4 md:px-14">
        <div className="max-w-lg mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-6 animate-fade-in">
            <CheckCircle size={64} strokeWidth={1} className="mx-auto text-[hsl(var(--krimson))]" />
          </div>

          <h1 className="font-display text-4xl md:text-6xl tracking-wide text-foreground mb-3 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            THANK YOU
          </h1>

          <p className="text-muted-foreground text-sm mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Your order has been placed successfully.
          </p>

          {/* Order Details Card */}
          <div className="border border-border p-6 md:p-8 text-left mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-3 mb-5">
              <Package size={20} strokeWidth={1.5} />
              <h2 className="text-xs font-bold tracking-[0.2em] uppercase">Order Details</h2>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Number</span>
                <span className="font-semibold">{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className="text-[hsl(var(--krimson))] font-medium">Confirmed</span>
              </div>
            </div>

            {/* Shipping Info */}
            {shippingInfo && (
              <div className="border-t border-border mt-5 pt-5">
                <div className="flex items-center gap-2 mb-3">
                  <Truck size={16} strokeWidth={1.5} />
                  <span className="text-xs font-bold tracking-[0.2em] uppercase">Shipping</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Method</span>
                    <span className="font-medium">{shippingInfo.method}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimated Delivery</span>
                    <span className="font-medium">{shippingInfo.estimate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping Cost</span>
                    <span className="font-medium">
                      {shippingInfo.cost === 0 ? "FREE" : `$${shippingInfo.cost.toFixed(2)}`}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {!shippingInfo && (
              <div className="border-t border-border mt-5 pt-5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Estimated Delivery</span>
                  <span className="font-medium">5–7 business days</span>
                </div>
              </div>
            )}

            <div className="border-t border-border mt-5 pt-5">
              <p className="text-xs text-muted-foreground leading-relaxed">
                A confirmation email will be sent with your tracking information once your order ships. Built for Achievers. Thank you for your support.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Link
              to="/shop"
              className="flex-1 bg-foreground text-background px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-foreground/90 transition-colors inline-flex items-center justify-center gap-2"
            >
              Continue Shopping
              <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
            <Link
              to="/"
              className="flex-1 border border-border text-foreground px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-secondary transition-colors inline-flex items-center justify-center"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderConfirmation;
