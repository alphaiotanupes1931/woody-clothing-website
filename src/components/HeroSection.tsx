import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import heroImage from "@/assets/hero-quarterzip.jpg";

const HeroSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.bottom > 0) {
        setScrollY(window.scrollY);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[100svh] md:h-[90vh] overflow-hidden bg-foreground">
      {!imageLoaded && (
        <div className="absolute inset-0 bg-foreground animate-pulse" />
      )}

      {/* Model image with parallax */}
      <img
        src={heroImage}
        alt="KRIMSON Quarter-Zip Sweater"
        className="absolute inset-0 w-full h-[120%] object-cover object-top transition-opacity duration-700 will-change-transform"
        style={{
          opacity: imageLoaded ? 1 : 0,
          filter: "brightness(0.55)",
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
        onLoad={() => setImageLoaded(true)}
      />

      {/* Text fades out on scroll */}
      <div
        className="relative z-10 flex flex-col justify-end h-full p-6 pb-12 md:p-14 lg:p-20 will-change-transform"
        style={{
          opacity: Math.max(0, 1 - scrollY / 400),
          transform: `translateY(${scrollY * 0.15}px)`,
        }}
      >
        <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-primary-foreground/40 mb-2 opacity-0 animate-[fadeSlideUp_0.6s_ease-out_0.1s_forwards]">
          Est. 1931 · Alpha Iota
        </p>
        <h1 className="font-display text-[14vw] md:text-[7vw] lg:text-[5.5vw] leading-none tracking-wide text-primary-foreground opacity-0 animate-[fadeSlideUp_0.8s_ease-out_0.2s_forwards]">
          THE AI COLLECTION
        </h1>
        <p className="text-sm md:text-base text-primary-foreground/70 mt-3 font-light opacity-0 animate-[fadeSlideUp_0.6s_ease-out_0.5s_forwards]">
          Built for Achievers.
        </p>
        <div className="mt-6 opacity-0 animate-[fadeSlideUp_0.6s_ease-out_0.7s_forwards]">
          <Link
            to="/shop"
            className="inline-block bg-primary-foreground text-foreground px-10 py-4 md:px-8 md:py-3 text-[12px] md:text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-primary-foreground/90 active:bg-primary-foreground/80 transition-all duration-300"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
