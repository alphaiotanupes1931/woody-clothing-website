import { Menu, Search, User, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "New Arrivals", href: "/#new-arrivals" },
  { label: "Shop All", href: "/shop" },
  { label: "Fitted Hats", href: "/#fitted-hats" },
  { label: "Accessories", href: "/#accessories" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-[28px] left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border/30 text-foreground"
            : "bg-transparent text-primary-foreground"
        }`}
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
            <button aria-label="Search">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button aria-label="Account">
              <User size={20} strokeWidth={1.5} />
            </button>
            <button aria-label="Cart" className="relative">
              <ShoppingBag size={20} strokeWidth={1.5} />
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
