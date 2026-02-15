import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import heroVideo from "@/assets/hero-video.mp4";

const HeroSection = () => {
  const [videoReady, setVideoReady] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (!videoReady) return;
    const t = setTimeout(() => setRevealed(true), 600);
    return () => clearTimeout(t);
  }, [videoReady]);

  // Subtle parallax on mouse move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const panelX = (mousePos.x - 0.5) * 8;
  const panelY = (mousePos.y - 0.5) * 6;

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen overflow-hidden bg-foreground"
    >
      {/* Video background */}
      <video
        ref={videoRef}
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        onCanPlayThrough={() => setVideoReady(true)}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          filter: "brightness(0.65)",
        }}
      />

      {/* Frosted glass panel */}
      <div className="relative z-10 flex items-center justify-center h-full px-6">
        <div
          className="relative backdrop-blur-xl bg-foreground/15 border border-primary-foreground/10 px-10 py-14 md:px-20 md:py-20 flex flex-col items-center text-center transition-all duration-1000 ease-out"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed
              ? `translateX(${panelX}px) translateY(${panelY}px) scale(1)`
              : "scale(0.92)",
            boxShadow: "0 8px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          {/* Logo / Chapter name */}
          <p
            className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-primary-foreground/60 mb-6 transition-all duration-700 delay-300"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translateY(0)" : "translateY(12px)",
            }}
          >
            Alpha Iota Chapter
          </p>

          {/* Main title */}
          <h1
            className="font-display text-[14vw] md:text-[7vw] lg:text-[5.5vw] leading-[0.85] tracking-[0.06em] text-primary-foreground transition-all duration-700 delay-500"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translateY(0)" : "translateY(20px)",
            }}
          >
            AI NUPES
          </h1>

          {/* Krimson accent line */}
          <div
            className="h-[2px] bg-krimson my-6 transition-all duration-700 delay-700 ease-out"
            style={{
              width: revealed ? "80px" : "0px",
              opacity: revealed ? 1 : 0,
            }}
          />

          {/* Tagline */}
          <p
            className="text-[10px] md:text-sm tracking-[0.3em] uppercase text-primary-foreground/80 font-light mb-8 transition-all duration-700 delay-[900ms]"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translateY(0)" : "translateY(12px)",
            }}
          >
            Built for Achievers
          </p>

          {/* CTA */}
          <div
            className="transition-all duration-700 delay-[1100ms]"
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
      </div>
    </section>
  );
};

export default HeroSection;
