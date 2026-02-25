import { Link } from "react-router-dom";
import { REGISTRATION_URL } from "@/data/products";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* Main footer content */}
      <div className="px-6 md:px-12 py-14 md:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Top section: Brand + Registration */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-14">
            <div>
              <h3 className="font-display text-4xl md:text-5xl tracking-wide mb-3">
                AI NUPES
              </h3>
              <p className="text-sm text-primary-foreground/60 tracking-wide">
                Built for Achievers.
              </p>
            </div>
            <div className="text-left md:text-right">
              <p className="text-xs text-primary-foreground/50 uppercase tracking-[0.2em] mb-3">
                95th Anniversary Celebration
              </p>
              <a
                href={REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs font-semibold tracking-[0.2em] uppercase border border-primary-foreground/30 px-6 py-3 hover:bg-primary-foreground hover:text-foreground transition-all duration-300"
              >
                Register Now
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-primary-foreground/15 mb-12" />

          {/* Link columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div>
              <h4 className="text-[10px] font-bold tracking-[0.25em] uppercase text-primary-foreground/40 mb-5">
                Shop
              </h4>
              <ul className="space-y-3">
                <li><Link to="/shop" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Shop All</Link></li>
                <li><Link to="/shop?category=Headwear" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Headwear</Link></li>
                <li><Link to="/shop?category=Tees" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Tees</Link></li>
                <li><Link to="/shop?category=Polos" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Polos</Link></li>
                <li><Link to="/shop?category=Outerwear" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Outerwear</Link></li>
                <li><Link to="/shop?category=Accessories" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Accessories</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold tracking-[0.25em] uppercase text-primary-foreground/40 mb-5">
                About
              </h4>
              <ul className="space-y-3">
                <li><Link to="/our-story" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Our Story</Link></li>
                <li><Link to="/our-story" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Alpha Iota Chapter</Link></li>
                <li><Link to="/our-story" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">95th Anniversary</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold tracking-[0.25em] uppercase text-primary-foreground/40 mb-5">
                Support
              </h4>
              <ul className="space-y-3">
                <li><Link to="/faqs" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">FAQs</Link></li>
                <li><Link to="/contact" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Contact Us</Link></li>
                <li><Link to="/shipping-returns" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Shipping & Returns</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold tracking-[0.25em] uppercase text-primary-foreground/40 mb-5">
                Follow Us
              </h4>
              <a
                href="https://www.instagram.com/ainupes1931"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10 px-6 md:px-12 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-primary-foreground/40 tracking-wider uppercase">
            © 2026 AI NUPES. All rights reserved.
          </p>
          <div className="text-right">
            <a
              href="https://reeddigitalgroup.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-primary-foreground/50 hover:text-primary-foreground tracking-[0.15em] uppercase transition-colors"
            >
              Built by Reed Digital Group
            </a>
            <a
              href="https://reeddigitalgroup.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[10px] text-primary-foreground/30 hover:text-primary-foreground/60 tracking-wider transition-colors mt-0.5"
            >
              reeddigitalgroup.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
