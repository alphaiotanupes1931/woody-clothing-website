import { Link } from "react-router-dom";
import { useState } from "react";
import heroImage from "@/assets/hero-quarterzip.jpg";

const HeroSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="relative w-full h-[100svh] md:h-[90vh] overflow-hidden bg-background">
      {!imageLoaded && (
        <div className="absolute inset-0 bg-secondary animate-pulse" />
      )}

      {/* Model image — right-aligned on desktop, full on mobile */}
      <img
        src={heroImage}
        alt="KRIMSON Quarter-Zip Sweater"
        className="absolute inset-0 w-full h-full object-cover object-top md:object-[75%_top] transition-opacity duration-700"
        style={{ opacity: imageLoaded ? 1 : 0 }}
        onLoad={() => setImageLoaded(true)}
      />

      {/* Gradient overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent md:via-background/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent md:hidden" />

      <div className="relative z-10 flex flex-col justify-end h-full p-6 pb-14 md:p-14 md:pb-20 md:justify-center md:max-w-[50%]">
        <p className="text-[11px] md:text-xs tracking-[0.3em] uppercase text-muted-foreground font-medium mb-3 opacity-0 animate-[fadeSlideUp_0.6s_ease-out_0.2s_forwards]">
          Alpha Iota — Est. 1931
        </p>
        <h1 className="font-display text-[13vw] md:text-[5.5vw] lg:text-[4.5vw] leading-[0.9] tracking-wide text-foreground opacity-0 animate-[fadeSlideUp_0.8s_ease-out_0.3s_forwards]">
          NEW
          <br />
          ARRIVALS
        </h1>
        <p className="text-sm md:text-base text-muted-foreground mt-4 font-light opacity-0 animate-[fadeSlideUp_0.6s_ease-out_0.6s_forwards]">
          Built for Achievers.
        </p>
        <div className="mt-7 opacity-0 animate-[fadeSlideUp_0.6s_ease-out_0.8s_forwards]">
          <Link
            to="/shop"
            className="inline-block bg-foreground text-background px-10 py-4 md:px-8 md:py-3 text-[12px] md:text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-foreground/90 active:bg-foreground/80 transition-all duration-300"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
