import { Menu, ShoppingCart, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useCart } from "@/contexts/CartContext";
import logo from "@/assets/logo.png";

const categories = ["Headwear", "Tees", "Polos", "Outerwear", "Accessories"];

const navLinks = [
  { label: "Shop All", href: "/shop" },
  ...categories.map((cat) => ({
    label: cat,
    href: `/shop?category=${cat}`,
  })),
  { label: "Our Story", href: "/our-story" },
];

interface HeaderProps {
  solid?: boolean;
}

/* Particle burst component */
const ParticleBurst = ({ active }: { active: boolean }) => {
  if (!active) return null;
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * 360;
        const rad = (angle * Math.PI) / 180;
        const tx = Math.cos(rad) * 24;
        const ty = Math.sin(rad) * 24;
        return (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 w-1 h-1 rounded-full bg-[hsl(var(--krimson))]"
            style={{
              animation: "particleBurst 0.5s ease-out forwards",
              animationDelay: `${i * 20}ms`,
              ["--tx" as string]: `${tx}px`,
              ["--ty" as string]: `${ty}px`,
            }}
          />
        );
      })}
    </div>
  );
};

const Header = ({ solid = false }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(solid);
  const { totalItems, setCartOpen, cartBounce } = useCart();

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
        <div className="flex items-center justify-between px-4 md:px-6 py-2.5 md:py-3">
          <a href="/" className="flex-shrink-0 active:opacity-70 transition-opacity">
            <img
              src={logo}
              alt="AI Nupes"
              className="h-7 md:h-10 transition-all duration-300"
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

          <div className="flex items-center gap-3 md:gap-5">
            <button
              aria-label="Cart"
              className={`relative p-2 -m-2 active:opacity-70 transition-all ${cartBounce ? "animate-[cartBounce_0.5s_cubic-bezier(0.36,0.07,0.19,0.97)]" : ""}`}
              onClick={() => setCartOpen(true)}
            >
              <ShoppingCart size={20} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-[hsl(var(--krimson))] text-[hsl(var(--krimson-foreground))] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
              <ParticleBurst active={cartBounce} />
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 -m-2 active:opacity-70 transition-opacity"
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
        <nav className="flex flex-col items-start px-6 pt-24 gap-1">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-display tracking-wider uppercase text-foreground hover:text-muted-foreground active:text-muted-foreground transition-colors flex items-center gap-2 py-2 w-full"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Header;
