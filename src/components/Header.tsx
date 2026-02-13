import { Menu, Search, User, ShoppingBag } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-header text-header-foreground sticky top-0 z-50">
        <div className="flex items-center justify-between px-5 py-3">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1"
            aria-label="Menu"
          >
            <Menu size={22} />
          </button>

          <a href="/" className="absolute left-1/2 -translate-x-1/2">
            <span className="text-lg font-bold tracking-[0.25em] uppercase">
              AI NUPES
            </span>
          </a>

          <div className="flex items-center gap-4">
            <button aria-label="Search">
              <Search size={20} />
            </button>
            <button aria-label="Account">
              <User size={20} />
            </button>
            <button aria-label="Cart" className="relative">
              <ShoppingBag size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm pt-16"
          onClick={() => setMenuOpen(false)}
        >
          <nav className="flex flex-col items-start px-8 py-6 gap-5 text-sm font-medium tracking-wider uppercase">
            {["New Arrivals", "Shop All", "Best Sellers", "Fitted", "Stacked", "Cargo", "Shorts", "Tops"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-foreground hover:text-muted-foreground transition-colors"
                >
                  {item}
                </a>
              )
            )}
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
