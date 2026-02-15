import { useCart } from "@/contexts/CartContext";
import { X, Minus, Plus } from "lucide-react";

const CartDrawer = () => {
  const { items, cartOpen, setCartOpen, removeFromCart, totalItems } = useCart();

  if (!cartOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[100] bg-foreground/40 backdrop-blur-sm"
        onClick={() => setCartOpen(false)}
      />
      <div className="fixed top-0 right-0 z-[100] h-full w-full max-w-md bg-background border-l border-border shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h2 className="text-sm font-bold tracking-[0.2em] uppercase">
            Cart ({totalItems})
          </h2>
          <button onClick={() => setCartOpen(false)} aria-label="Close cart">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-sm text-muted-foreground">Your cart is empty</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4">
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
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.price}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Qty: {item.quantity}
                    </span>
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
          <div className="px-6 py-5 border-t border-border">
            <button className="w-full bg-foreground text-background py-4 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-foreground/90 transition-colors">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
