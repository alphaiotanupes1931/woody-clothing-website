import { useCart } from "@/contexts/CartContext";
import { X, Minus, Plus, ShoppingBag, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { toast } from "sonner";

const CartDrawer = () => {
  const { items, cartOpen, setCartOpen, removeFromCart, updateQuantity, clearCart, totalItems, cartTotal } = useCart();
  const [loading, setLoading] = useState(false);

  if (!cartOpen) return null;

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const checkoutItems = items.map((item) => {
        const imageUrl = item.image.startsWith("http")
          ? item.image
          : `${window.location.origin}${item.image}`;
        const unitPrice = parseFloat(item.price.replace(/[^0-9.]/g, ""));
        
        // Socks: 3 for $20 deal
        let finalPrice = unitPrice;
        let finalQty = item.quantity;
        if (item.id.startsWith("kream-k-diamond-socks") && item.quantity >= 3) {
          const bundlesOf3 = Math.floor(item.quantity / 3);
          const remainder = item.quantity % 3;
          // Send as effective per-unit price
          const totalSocksPrice = bundlesOf3 * 20 + remainder * unitPrice;
          finalPrice = parseFloat((totalSocksPrice / item.quantity).toFixed(2));
        }
        
        return {
          name: item.name,
          price: finalPrice,
          quantity: finalQty,
          image: imageUrl,
        };
      });

      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { items: checkoutItems },
      });

      if (error) throw error;
      if (data?.url) {
        clearCart();
        setCartOpen(false);
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err: any) {
      console.error("Checkout error:", err);
      toast.error("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[100] bg-foreground/40 backdrop-blur-sm"
        onClick={() => setCartOpen(false)}
      />
      <div className="fixed top-0 right-0 z-[100] h-[100dvh] w-full max-w-md bg-background border-l border-border shadow-2xl flex flex-col animate-slide-in-right">
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h2 className="text-sm font-bold tracking-[0.2em] uppercase">
            Cart ({totalItems})
          </h2>
          <button onClick={() => setCartOpen(false)} aria-label="Close cart">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
            <ShoppingBag size={48} strokeWidth={1} className="text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">Your cart is empty</p>
            <Link
              to="/shop"
              onClick={() => setCartOpen(false)}
              className="bg-foreground text-background px-8 py-3 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-foreground/90 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 cart-item-enter">
                <div className="w-20 h-24 bg-secondary flex-shrink-0 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-medium text-foreground leading-tight">
                      {item.name}
                    </h3>
                    {item.size && (
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        Size: {item.size}
                      </p>
                    )}
                    {item.id.startsWith("kream-k-diamond-socks") && item.quantity >= 3 ? (
                      <p className="text-xs text-foreground font-medium mt-1">
                        3 for $20 <span className="text-muted-foreground line-through ml-1">${(parseFloat(item.price.replace(/[^0-9.]/g, "")) * item.quantity).toFixed(2)}</span>
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.price}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 border border-border">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 hover:bg-secondary transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} strokeWidth={1.5} />
                      </button>
                      <span className="text-xs font-medium min-w-[16px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 hover:bg-secondary transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} strokeWidth={1.5} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[10px] tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-border space-y-3">
            {/* Free shipping banner */}
            <div className="text-center text-[10px] tracking-wider uppercase text-muted-foreground bg-secondary py-2">
              {parseFloat(cartTotal) >= 100
                ? "✓ You qualify for free shipping!"
                : `$${(100 - parseFloat(cartTotal)).toFixed(2)} away from free shipping`}
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold tracking-wider uppercase text-xs">Subtotal</span>
              <span className="font-semibold">${cartTotal}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-foreground text-background py-4 md:py-4 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-foreground/90 transition-colors active:scale-[0.98] active:bg-foreground/80 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-safe"
            >
              {loading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Processing...
                </>
              ) : (
                "Checkout"
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
