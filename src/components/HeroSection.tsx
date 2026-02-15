import { Link } from "react-router-dom";
import heroLifestyle from "@/assets/hero-lifestyle.png";
import heroHat from "@/assets/hero-hat-styled.jpg";
import heroMain from "@/assets/hero-main.jpg";

const HeroSection = () => {
  return (
    <section className="relative w-full bg-background">
      {/* Full-bleed hero with marquee */}
      <div className="relative w-full h-screen overflow-hidden">
        <img
          src={heroLifestyle}
          alt="New Arrivals"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-foreground/30" />

        {/* Scrolling marquee text — stacked */}
        <div className="absolute inset-0 flex flex-col justify-center overflow-hidden pointer-events-none select-none">
          <div className="animate-marquee-left whitespace-nowrap mb-2">
            <span className="font-display text-[12vw] md:text-[10vw] tracking-[0.04em] text-primary-foreground/90 mx-4">
              NEW ARRIVALS — NEW ARRIVALS — NEW ARRIVALS — NEW ARRIVALS — NEW ARRIVALS —
            </span>
          </div>
          <div className="animate-marquee-right whitespace-nowrap">
            <span className="font-display text-[12vw] md:text-[10vw] tracking-[0.04em] text-primary-foreground/20 mx-4">
              AI NUPES — AI NUPES — AI NUPES — AI NUPES — AI NUPES — AI NUPES —
            </span>
          </div>
        </div>

        {/* CTA at bottom */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
          <Link
            to="/shop"
            className="inline-block bg-background text-foreground px-10 py-3.5 text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-background/90 transition-colors"
          >
            SHOP NOW
          </Link>
        </div>
      </div>

      {/* Two-column category cards */}
      <div className="px-4 md:px-10 mt-3 grid grid-cols-2 gap-3 pb-4">
        <Link to="/shop" className="relative aspect-[3/4] overflow-hidden bg-secondary group block">
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
        </Link>

        <Link to="/shop" className="relative aspect-[3/4] overflow-hidden bg-secondary group block">
          <img
            src={heroMain}
            alt="Apparel Collection"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5">
            <p className="font-display text-2xl md:text-4xl text-primary-foreground tracking-wide leading-none">
              APPAREL
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
