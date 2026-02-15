import { Menu, ShoppingCart, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { allProducts } from "@/data/products";
import logo from "@/assets/logo.png";

const categories = ["Headwear", "Tees", "Polos", "Outerwear", "Accessories"];

function getCategoryCount(category: string): number {
  return allProducts.filter((p) => p.category === category).length;
}

const navLinks = [
  { label: "Shop All", href: "/shop", count: allProducts.length },
  ...categories.map((cat) => ({
    label: cat,
    href: `/shop?category=${cat}`,
    count: getCategoryCount(cat),
  })),
];

interface HeaderProps {
  solid?: boolean;
}

const Header = ({ solid = false }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(solid);
  const { totalItems, setCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(solid || window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [solid]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed top-[28px] left-0 right-0 z-50 transition-all duration-300 bg-background border-b border-border/30 text-foreground"
      >
        <div className="flex items-center justify-between px-4 md:px-6 py-3">
          <a href="/" className="flex-shrink-0">
            <img
              src={logo}
              alt="AI Nupes"
              className="h-8 md:h-10 transition-all duration-300"
            />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[13px] font-medium tracking-wide uppercase hover:opacity-70 transition-opacity"
              >
                {item.label}
                <span className="text-[10px] text-muted-foreground ml-1">({item.count})</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4 md:gap-5">
            <button
              aria-label="Cart"
              className="relative"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingCart size={20} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[hsl(var(--krimson))] text-[hsl(var(--krimson-foreground))] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-1"
              aria-label="Menu"
            >
              {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-background transition-transform duration-300 ease-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col items-start px-6 pt-24 gap-6">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-lg font-display tracking-wider uppercase text-foreground hover:text-muted-foreground transition-colors flex items-center gap-2"
            >
              {item.label}
              <span className="text-xs text-muted-foreground font-sans">({item.count})</span>
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Header;