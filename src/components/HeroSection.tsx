import { Link } from "react-router-dom";
import { useState } from "react";
import heroLifestyle from "@/assets/hero-lifestyle.png";

const HeroSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="w-full bg-background">
      {/* Image */}
      <div className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-secondary animate-pulse" />
        )}
        <img
          src={heroLifestyle}
          alt="AI Nupes Collection"
          className="w-full h-full object-cover object-top transition-all duration-700"
          style={{
            opacity: imageLoaded ? 1 : 0,
          }}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      {/* CTA */}
      <div className="flex justify-center py-6">
        <Link
          to="/shop"
          className="text-[11px] font-semibold tracking-[0.25em] uppercase text-foreground border-b border-foreground/30 pb-1 hover:border-foreground transition-all duration-300 hover:tracking-[0.35em]"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
