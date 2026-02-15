import { Link } from "react-router-dom";

import heroHat from "@/assets/hero-hat-styled.jpg";
import heroLifestyle from "@/assets/hero-lifestyle.png";
import heroMain from "@/assets/hero-main.jpg";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen bg-background pt-24 md:pt-28">
      {/* Top: large feature image with overlaid text */}
      <div className="px-4 md:px-10">
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-secondary">
          <img
            src={heroLifestyle}
            alt="New Arrivals"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-10">
            <h1 className="font-display text-5xl md:text-8xl lg:text-9xl tracking-wide text-primary-foreground leading-[0.85]">
              NEW
              <br />
              ARRIVALS
            </h1>
            <Link
              to="/shop"
              className="inline-block bg-background text-foreground px-8 py-3 text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-background/90 transition-colors mt-4"
            >
              SHOP NOW
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom: two-column mosaic */}
      <div className="px-4 md:px-10 mt-3 grid grid-cols-2 gap-3 pb-4">
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary group">
          <img
            src={heroHat}
            alt="Fitted Hats Collection"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5">
            <p className="font-display text-2xl md:text-4xl text-primary-foreground tracking-wide leading-none">
              HEADWEAR
            </p>
          </div>
        </div>

        <div className="relative aspect-[3/4] overflow-hidden bg-secondary group">
          <img
            src={heroMain}
            alt="Lifestyle Collection"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5">
            <p className="font-display text-2xl md:text-4xl text-primary-foreground tracking-wide leading-none">
              APPAREL
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
