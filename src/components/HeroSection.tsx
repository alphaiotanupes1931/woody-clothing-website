import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import heroVideo from "@/assets/hero-video.mp4";

const TAGLINE = "BUILT FOR ACHIEVERS";

const HeroSection = () => {
  const [videoReady, setVideoReady] = useState(false);
  const [revealStage, setRevealStage] = useState(0); // 0=blur, 1=sharpening, 2=typing, 3=line, 4=cta
  const [typedCount, setTypedCount] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Stage progression after video loads
  useEffect(() => {
    if (!videoReady) return;

    // Stage 1: start sharpening
    const t1 = setTimeout(() => setRevealStage(1), 300);
    // Stage 2: start typing
    const t2 = setTimeout(() => setRevealStage(2), 1200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [videoReady]);

  // Typewriter effect
  useEffect(() => {
    if (revealStage < 2) return;
    if (typedCount >= TAGLINE.length) {
      // After typing finishes, show line then CTA
      const t3 = setTimeout(() => setRevealStage(3), 300);
      const t4 = setTimeout(() => setRevealStage(4), 900);
      return () => {
        clearTimeout(t3);
        clearTimeout(t4);
      };
    }

    const speed = TAGLINE[typedCount] === " " ? 40 : 70;
    const timer = setTimeout(() => setTypedCount((c) => c + 1), speed);
    return () => clearTimeout(timer);
  }, [revealStage, typedCount]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-foreground">
      {/* Video background */}
      <video
        ref={videoRef}
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        onCanPlayThrough={() => setVideoReady(true)}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-[2000ms] ease-out"
        style={{
          filter: revealStage >= 1 ? "blur(0px) brightness(0.55)" : "blur(20px) brightness(0.3)",
          transform: revealStage >= 1 ? "scale(1)" : "scale(1.1)",
        }}
      />

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        {/* Typed tagline */}
        <h1 className="font-display text-[12vw] md:text-[6vw] lg:text-[5vw] leading-none tracking-[0.15em] text-primary-foreground min-h-[1.2em]">
          {revealStage >= 2 ? (
            <>
              {TAGLINE.slice(0, typedCount)}
              <span
                className="inline-block w-[3px] h-[0.85em] bg-primary-foreground ml-1 align-middle"
                style={{
                  animation: typedCount >= TAGLINE.length ? "blink 1s step-end infinite" : "none",
                  opacity: typedCount >= TAGLINE.length ? undefined : 1,
                }}
              />
            </>
          ) : (
            <span className="opacity-0">.</span>
          )}
        </h1>

        {/* Krimson accent line */}
        <div
          className="h-[2px] bg-krimson mt-6 transition-all duration-700 ease-out"
          style={{
            width: revealStage >= 3 ? "120px" : "0px",
            opacity: revealStage >= 3 ? 1 : 0,
          }}
        />

        {/* CTA */}
        <div
          className="mt-8 transition-all duration-700 ease-out"
          style={{
            opacity: revealStage >= 4 ? 1 : 0,
            transform: revealStage >= 4 ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <Link
            to="/shop"
            className="inline-block border border-primary-foreground/40 text-primary-foreground px-10 py-3 text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-primary-foreground hover:text-foreground transition-all duration-300 hover:tracking-[0.35em]"
          >
            SHOP NOW
          </Link>
        </div>
      </div>

      {/* Cursor blink keyframe */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
