import { Link } from "react-router-dom";
import { useState } from "react";
import heroLifestyle from "@/assets/hero-lifestyle.png";

const HeroSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="relative w-full bg-background">
      <div className="min-h-screen md:h-[110vh] flex flex-col md:flex-row">
        {/* Left: Typography on solid bg */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-foreground flex flex-col justify-end p-8 md:p-14 lg:p-20">
          <h1
            className="font-display text-[15vw] md:text-[8vw] lg:text-[7vw] leading-[0.85] tracking-wide text-primary-foreground opacity-0 animate-[fadeSlideUp_0.8s_ease-out_0.2s_forwards]"
          >
            NEW
            <br />
            ARRIVALS
          </h1>
          <div className="mt-6 opacity-0 animate-[fadeSlideUp_0.6s_ease-out_0.6s_forwards]">
            <Link
              to="/shop"
              className="inline-block w-fit border border-primary-foreground/40 text-primary-foreground px-8 py-3 text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-primary-foreground hover:text-foreground transition-all duration-300 hover:tracking-[0.35em]"
            >
              SHOP NOW
            </Link>
          </div>
        </div>

        {/* Right: Lifestyle image */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full overflow-hidden relative">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-secondary animate-pulse" />
          )}
          <img
            src={heroLifestyle}
            alt="New Arrivals"
            className={`w-full h-full object-cover object-top transition-all duration-1000 ${
              imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;