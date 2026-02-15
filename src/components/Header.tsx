import { Menu, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Shop All", href: "/shop" },
  { label: "Headwear", href: "/shop?category=Headwear" },
  { label: "Tees", href: "/shop?category=Tees" },
  { label: "Polos", href: "/shop?category=Polos" },
  { label: "Outerwear", href: "/shop?category=Outerwear" },
  { label: "Accessories", href: "/shop?category=Accessories" },
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


  return (
    <>
      <header
        className="fixed top-[28px] left-0 right-0 z-50 transition-all duration-300 bg-background border-b border-border/30 text-foreground"
      >
        <div className="flex items-center justify-between px-6 py-3">
          <a href="/" className="flex-shrink-0">
            <img
              src={logo}
              alt="AI Nupes"
              className="h-10 transition-all duration-300"
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
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
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
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>

      </header>

      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-background pt-20"
          onClick={() => setMenuOpen(false)}
        >
          <nav className="flex flex-col items-start px-8 py-6 gap-5 text-sm font-medium tracking-wider uppercase">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-foreground hover:text-muted-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
