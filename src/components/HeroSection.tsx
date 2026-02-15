import { Link } from "react-router-dom";
import { useState } from "react";
import heroLifestyle from "@/assets/hero-lifestyle.png";

const HeroSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-foreground">
      {/* Full-bleed image */}
      <img
        src={heroLifestyle}
        alt="AI Nupes Collection"
        className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-1000"
        style={{
          opacity: imageLoaded ? 1 : 0,
          transform: imageLoaded ? "scale(1)" : "scale(1.05)",
          filter: "brightness(0.55)",
        }}
        onLoad={() => setImageLoaded(true)}
      />

      {/* Magazine-style overlay text */}
      <div className="relative z-10 flex flex-col justify-between h-full p-8 md:p-14 lg:p-20">
        {/* Top: Masthead */}
        <div>
          <h1
            className="font-display text-[20vw] md:text-[12vw] lg:text-[10vw] leading-[0.82] tracking-[0.04em] text-primary-foreground transition-all duration-700 delay-300"
            style={{
              opacity: imageLoaded ? 1 : 0,
              transform: imageLoaded ? "translateY(0)" : "translateY(30px)",
            }}
          >
            AI NUPES
          </h1>
          <div
            className="flex items-center gap-4 mt-4 transition-all duration-700 delay-500"
            style={{
              opacity: imageLoaded ? 1 : 0,
              transform: imageLoaded ? "translateY(0)" : "translateY(16px)",
            }}
          >
            <div className="h-[1px] w-10 bg-krimson" />
            <p className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-primary-foreground/60 font-light">
              Est. 1931 &middot; Morgan State University
            </p>
          </div>
        </div>

        {/* Bottom: Tagline + CTA */}
        <div>
          <p
            className="font-display text-[7vw] md:text-[3vw] lg:text-[2.5vw] leading-[0.9] tracking-[0.06em] text-primary-foreground mb-6 transition-all duration-700 delay-700"
            style={{
              opacity: imageLoaded ? 1 : 0,
              transform: imageLoaded ? "translateY(0)" : "translateY(20px)",
            }}
          >
            BUILT FOR
            <br />
            ACHIEVERS
          </p>
          <div
            className="transition-all duration-700 delay-[900ms]"
            style={{
              opacity: imageLoaded ? 1 : 0,
              transform: imageLoaded ? "translateY(0)" : "translateY(12px)",
            }}
          >
            <Link
              to="/shop"
              className="inline-block border border-primary-foreground/30 text-primary-foreground px-10 py-3 text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-primary-foreground hover:text-foreground transition-all duration-300 hover:tracking-[0.35em]"
            >
              Shop Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
