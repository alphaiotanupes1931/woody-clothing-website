import { Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { REGISTRATION_URL } from "@/data/products";

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
              <li><Link to="/faqs" className="text-xs text-muted-foreground hover:text-foreground transition-colors">FAQs</Link></li>
              <li><Link to="/contact" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping-returns" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Shipping & Returns</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-foreground mb-4">
              Follow Us
            </h4>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/ainupes1931" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram size={18} />
              </a>
            </div>
            <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mt-6 leading-relaxed">
              The AI Collection
            </p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Built for Achievers.
            </p>
          </div>
        </div>
        {/* Registration link */}
        <div className="mt-10 pt-8 border-t border-border text-center">
          <p className="text-xs text-muted-foreground mb-3">
            Attending the 95th Anniversary Celebration?
          </p>
          <a
            href={REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold tracking-[0.15em] uppercase text-foreground hover:text-muted-foreground transition-colors underline underline-offset-4"
          >
            Register Here
          </a>
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
