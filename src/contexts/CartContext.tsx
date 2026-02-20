import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface CartItem {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
  size?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  cartTotal: string;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  cartBounce: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function parsePrice(price: string): number {
  return parseFloat(price.replace(/[^0-9.]/g, ""));
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);

  const triggerBounce = useCallback(() => {
    setCartBounce(true);
    setTimeout(() => setCartBounce(false), 600);
  }, []);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    const cartId = item.size ? `${item.id}-${item.size}` : item.id;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === cartId);
      if (existing) {
        return prev.map((i) =>
          i.id === cartId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, id: cartId, quantity: 1 }];
    });
    triggerBounce();
    setCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const cartTotal = items
    .reduce((sum, i) => sum + parsePrice(i.price) * i.quantity, 0)
    .toFixed(2);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, cartTotal, cartOpen, setCartOpen, cartBounce }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
