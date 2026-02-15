import { Link } from "react-router-dom";
import { useState } from "react";
import heroCrowd from "@/assets/hero-crowd3.png";

const HeroSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden bg-foreground">
      {!imageLoaded && (
        <div className="absolute inset-0 bg-foreground animate-pulse" />
      )}
      <img
        src={heroCrowd}
        alt="AI Nupes New Arrivals"
        className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700"
        style={{
          opacity: imageLoaded ? 1 : 0,
          filter: "brightness(0.45)",
        }}
        onLoad={() => setImageLoaded(true)}
      />

      <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-14 lg:p-20">
        <h1 className="font-display text-[13vw] md:text-[7vw] lg:text-[5.5vw] leading-none tracking-wide text-primary-foreground opacity-0 animate-[fadeSlideUp_0.8s_ease-out_0.2s_forwards]">
          NEW ARRIVALS
        </h1>
        <p className="text-sm md:text-base text-primary-foreground/70 mt-3 font-light opacity-0 animate-[fadeSlideUp_0.6s_ease-out_0.5s_forwards]">
          Built for Achievers.
        </p>
        <div className="mt-5 opacity-0 animate-[fadeSlideUp_0.6s_ease-out_0.7s_forwards]">
          <Link
            to="/shop"
            className="inline-block bg-primary-foreground text-foreground px-8 py-3 text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-primary-foreground/90 transition-all duration-300"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
