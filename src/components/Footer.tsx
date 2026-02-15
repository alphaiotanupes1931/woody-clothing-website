import { Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border">
      <div className="px-5 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-foreground mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5">
              <li><Link to="/shop" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Shop All</Link></li>
              <li><Link to="/shop?category=Headwear" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Headwear</Link></li>
              <li><Link to="/shop?category=Tees" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Tees</Link></li>
              <li><Link to="/shop?category=Polos" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Polos</Link></li>
              <li><Link to="/shop?category=Outerwear" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Outerwear</Link></li>
              <li><Link to="/shop?category=Accessories" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Accessories</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-foreground mb-4">
              About
            </h4>
            <ul className="space-y-2.5">
              <li><Link to="/our-story" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Our Story</Link></li>
              <li><Link to="/our-story" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Alpha Iota Chapter</Link></li>
              <li><Link to="/our-story" className="text-xs text-muted-foreground hover:text-foreground transition-colors">95th Anniversary</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-foreground mb-4">
              Support
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">FAQs</a></li>
              <li><a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Shipping & Returns</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-foreground mb-4">
              Follow Us
            </h4>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram size={18} />
              </a>
            </div>
            <p className="text-xs text-muted-foreground mt-6 leading-relaxed">
              Built for Achievers.
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-border px-5 md:px-10 py-5 text-center">
        <p className="text-[10px] text-muted-foreground tracking-wider uppercase">
          © 2026 AI NUPES. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;