import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import heroVideo from "@/assets/hero-video.mp4";

const MARQUEE_TEXT = "BUILT FOR ACHIEVERS \u00A0\u00B7\u00A0 AI NUPES \u00A0\u00B7\u00A0 EST. 1931 \u00A0\u00B7\u00A0 ";

const HeroSection = () => {
  const [videoReady, setVideoReady] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!videoReady) return;
    const t = setTimeout(() => setRevealed(true), 400);
    return () => clearTimeout(t);
  }, [videoReady]);

  const marqueeContent = MARQUEE_TEXT.repeat(8);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-foreground">
      {/* Video background */}
      <video
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        onCanPlayThrough={() => setVideoReady(true)}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
        style={{
          filter: "brightness(0.5)",
          opacity: revealed ? 1 : 0,
        }}
      />

      {/* Scrolling marquee band */}
      <div
        className="absolute z-20 left-0 right-0 top-1/2 -translate-y-1/2 overflow-hidden transition-all duration-1000 delay-300"
        style={{
          opacity: revealed ? 1 : 0,
        }}
      >
        {/* Dark band behind marquee */}
        <div className="bg-foreground/70 backdrop-blur-sm py-5 md:py-7">
          <div className="animate-marquee-left whitespace-nowrap">
            <span className="font-display text-[10vw] md:text-[5vw] tracking-[0.12em] text-primary-foreground leading-none">
              {marqueeContent}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom content overlay */}
      <div className="absolute z-10 bottom-0 left-0 right-0 p-8 md:p-14 lg:p-20">
        {/* Krimson accent line */}
        <div
          className="h-[2px] bg-krimson mb-6 transition-all duration-700 delay-700 ease-out"
          style={{
            width: revealed ? "60px" : "0px",
            opacity: revealed ? 1 : 0,
          }}
        />

        <p
          className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-primary-foreground/60 mb-3 transition-all duration-700 delay-[900ms]"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(12px)",
          }}
        >
          Alpha Iota Chapter &middot; Morgan State University
        </p>

        <h2
          className="font-display text-[8vw] md:text-[3.5vw] leading-[0.9] tracking-wide text-primary-foreground mb-6 transition-all duration-700 delay-[1100ms]"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(16px)",
          }}
        >
          WEAR THE LEGACY
        </h2>

        <div
          className="transition-all duration-700 delay-[1300ms]"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(12px)",
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
    </section>
  );
};

export default HeroSection;
