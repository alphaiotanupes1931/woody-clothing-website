import { Link } from "react-router-dom";
import { useState } from "react";
import heroHat from "@/assets/hero-hat-nobg.png";

const HeroSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="w-full bg-background flex flex-col items-center justify-center min-h-[85vh] md:min-h-[90vh] px-6">
      {/* Hat with slow rotate */}
      <div className="relative flex items-center justify-center flex-1 w-full max-w-md">
        <img
          src={heroHat}
          alt="KRIMSON K-Diamond Fitted Hat"
          className="w-[280px] md:w-[340px] lg:w-[380px] object-contain transition-opacity duration-700 animate-[slowSpin_12s_linear_infinite]"
          style={{ opacity: imageLoaded ? 1 : 0 }}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      {/* CTA Button */}
      <div
        className="pb-16 transition-all duration-700 delay-300"
        style={{
          opacity: imageLoaded ? 1 : 0,
          transform: imageLoaded ? "translateY(0)" : "translateY(12px)",
        }}
      >
        <Link
          to="/shop"
          className="inline-block bg-foreground text-primary-foreground px-12 py-3.5 text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-foreground/85 transition-all duration-300 hover:tracking-[0.35em]"
        >
          Shop Now
        </Link>
      </div>

      <style>{`
        @keyframes slowSpin {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
