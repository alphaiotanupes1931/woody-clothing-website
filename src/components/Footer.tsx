import { Instagram } from "lucide-react";

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
              {["New Arrivals", "Best Sellers", "Shop All", "Final Sale"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-foreground mb-4">
              Fit
            </h4>
            <ul className="space-y-2.5">
              {["Fitted", "Stacked", "Cargo", "Straight-Leg", "Baggy", "Shorts"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-foreground mb-4">
              Support
            </h4>
            <ul className="space-y-2.5">
              {["FAQs", "Track Order", "Start A Return", "Contact Us"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
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
              The perfect blend of comfort and style.
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-border px-5 md:px-10 py-5 text-center">
        <p className="text-[10px] text-muted-foreground tracking-wider uppercase">
          © 2025 SERENEDE®. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
