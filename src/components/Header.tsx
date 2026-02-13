import { Menu, Search, User, ShoppingBag } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";

const navLinks = ["New Arrivals", "Shop All", "Best Sellers", "Fitted Hats", "Accessories"];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-header text-header-foreground sticky top-0 z-50 border-b border-border">
        <div className="flex items-center justify-between px-6 py-3">
          <a href="/" className="flex-shrink-0">
            <img src={logo} alt="AI Nupes" className="h-10" />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <a
                key={item}
                href="#"
                className="text-[13px] font-medium tracking-wide uppercase text-foreground hover:text-muted-foreground transition-colors"
              >
                {item}
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
                key={item}
                href="#"
                className="text-foreground hover:text-muted-foreground transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
