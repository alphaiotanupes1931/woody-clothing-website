import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import heroVideo from "@/assets/hero-video.mp4";

const HeroSection = () => {
  const [videoReady, setVideoReady] = useState(false);
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    if (!videoReady) return;
    const t1 = setTimeout(() => setCurtainOpen(true), 800);
    const t2 = setTimeout(() => setContentVisible(true), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [videoReady]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-foreground">
      {/* Video background (behind curtains) */}
      <video
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        onCanPlayThrough={() => setVideoReady(true)}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.6)" }}
      />

      {/* Left curtain */}
      <div
        className="absolute inset-y-0 left-0 w-1/2 bg-foreground z-20 transition-transform duration-[1400ms] ease-[cubic-bezier(0.76,0,0.24,1)] flex items-center justify-end pr-1"
        style={{
          transform: curtainOpen ? "translateX(-100%)" : "translateX(0)",
        }}
      >
        <span className="font-display text-[18vw] md:text-[10vw] leading-none tracking-[0.05em] text-primary-foreground select-none">
          AI
        </span>
      </div>

      {/* Right curtain */}
      <div
        className="absolute inset-y-0 right-0 w-1/2 bg-foreground z-20 transition-transform duration-[1400ms] ease-[cubic-bezier(0.76,0,0.24,1)] flex items-center justify-start pl-1"
        style={{
          transform: curtainOpen ? "translateX(100%)" : "translateX(0)",
        }}
      >
        <span className="font-display text-[18vw] md:text-[10vw] leading-none tracking-[0.05em] text-primary-foreground select-none">
          NUPES
        </span>
      </div>

      {/* Center seam line (visible before curtain opens) */}
      <div
        className="absolute inset-y-0 left-1/2 w-[1px] bg-primary-foreground/20 z-30 transition-opacity duration-500"
        style={{ opacity: curtainOpen ? 0 : 1 }}
      />

      {/* Content overlay (appears after curtains open) */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <p
          className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-primary-foreground/60 mb-4 transition-all duration-700"
          style={{
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          Alpha Iota Chapter
        </p>

        <h1
          className="font-display text-[16vw] md:text-[8vw] lg:text-[6vw] leading-[0.85] tracking-[0.08em] text-primary-foreground transition-all duration-700 delay-200"
          style={{
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          BUILT FOR
          <br />
          ACHIEVERS
        </h1>

        <div
          className="h-[2px] bg-krimson my-6 transition-all duration-700 delay-500 ease-out"
          style={{
            width: contentVisible ? "100px" : "0px",
            opacity: contentVisible ? 1 : 0,
          }}
        />

        <div
          className="transition-all duration-700 delay-700"
          style={{
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? "translateY(0)" : "translateY(12px)",
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
