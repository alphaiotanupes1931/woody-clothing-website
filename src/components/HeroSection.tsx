import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import heroHat from "@/assets/hero-hat-nobg.png";

const HeroSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMouse({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  };

  const handleMouseLeave = () => setMouse({ x: 0, y: 0 });

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full bg-background flex flex-col items-center justify-center min-h-[85vh] md:min-h-[90vh] px-6 cursor-default"
    >
      {/* Hat with parallax drift */}
      <div className="relative flex items-center justify-center flex-1 w-full max-w-md">
        <img
          src={heroHat}
          alt="KRIMSON K-Diamond Fitted Hat"
          className="w-[280px] md:w-[340px] lg:w-[380px] object-contain transition-all duration-300 ease-out"
          style={{
            opacity: imageLoaded ? 1 : 0,
            transform: `translate(${mouse.x * 20}px, ${mouse.y * 15}px) rotate(${mouse.x * 3}deg)`,
          }}
          onLoad={() => setImageLoaded(true)}
        />
        {/* Shadow */}
        <div
          className="absolute bottom-4 w-[160px] h-[12px] rounded-full bg-foreground/8 blur-md transition-all duration-300 ease-out"
          style={{
            transform: `translate(${mouse.x * 10}px, 0) scaleX(${1 - Math.abs(mouse.x) * 0.15})`,
          }}
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
    </section>
  );
};

export default HeroSection;
