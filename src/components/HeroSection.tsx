import { Link } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";

import lifestyleKdiamondFront1 from "@/assets/lifestyle/lifestyle-kdiamond-front-1.jpg";
import lifestyleQuarterzip from "@/assets/lifestyle/lifestyle-quarterzip.jpg";
import lifestyleKdiamondFront3 from "@/assets/lifestyle/lifestyle-kdiamond-front-3.jpg";
import lifestyleAchievers from "@/assets/lifestyle/lifestyle-achievers.jpg";
import lifestyle95thBack from "@/assets/lifestyle/lifestyle-95th-back.jpg";

const slides = [
  {
    image: lifestyleKdiamondFront1,
    objectPosition: "center top",
    headline: "THE AI COLLECTION",
    subtitle: "Est. 1931 · Alpha Iota",
    cta: "Shop Now",
  },
  {
    image: lifestyleQuarterzip,
    objectPosition: "center top",
    headline: "BUILT FOR ACHIEVERS",
    subtitle: "Premium Quality · Limited Run",
    cta: "Shop the Drop",
  },
  {
    image: lifestyleKdiamondFront3,
    objectPosition: "center top",
    headline: "K-DIAMOND COLLECTION",
    subtitle: "Designed with Purpose",
    cta: "Explore",
  },
  {
    image: lifestyleAchievers,
    objectPosition: "center top",
    headline: "NOT YOUR TYPICAL",
    subtitle: "95 Years of Excellence",
    cta: "Shop Tees",
  },
  {
    image: lifestyle95thBack,
    objectPosition: "center top",
    headline: "95TH ANNIVERSARY",
    subtitle: "Celebrate the Legacy",
    cta: "Register Now",
  },
];

const DURATION = 5500;

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(new Array(slides.length).fill(false));
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef(Date.now());

  const goTo = useCallback((index: number) => {
    setCurrent(index);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  // Auto-advance
  useEffect(() => {
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(elapsed / DURATION, 1);
      setProgress(pct);
      if (pct >= 1) next();
    }, 50);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [next]);

  // Parallax
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.bottom > 0) setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleImageLoad = (index: number) => {
    setImagesLoaded((prev) => {
      const copy = [...prev];
      copy[index] = true;
      return copy;
    });
  };

  const slide = slides[current];

  return (
    <section ref={sectionRef} className="relative w-full h-[100svh] overflow-hidden bg-foreground max-w-[100vw]">
      {/* All images stacked — crossfade via opacity */}
      {slides.map((s, i) => (
        <img
          key={i}
          src={s.image}
          alt=""
          onLoad={() => handleImageLoad(i)}
          className="absolute inset-0 w-full h-[115%] object-cover transition-opacity duration-[1.2s] ease-in-out will-change-[opacity,transform]"
          style={{
            objectPosition: s.objectPosition,
            opacity: i === current && imagesLoaded[i] ? 1 : 0,
            filter: "brightness(0.55)",
            transform: `translateY(${scrollY * 0.25}px) scale(${i === current ? 1.05 : 1})`,
            transition: `opacity 1.2s ease-in-out, transform 6s ease-out`,
          }}
        />
      ))}

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/30 to-transparent z-[1]" />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col justify-end h-full px-6 pb-16 md:px-14 md:pb-20 lg:px-20 lg:pb-24 will-change-transform"
        style={{
          opacity: Math.max(0, 1 - scrollY / 350),
          transform: `translateY(${scrollY * 0.12}px)`,
        }}
      >

        {/* Headline — large and dramatic */}
        <h1
          key={`head-${current}`}
          className="font-display text-[15vw] md:text-[8vw] lg:text-[6vw] leading-[0.85] tracking-wider text-primary-foreground mb-4 opacity-0 animate-[fadeSlideUp_0.7s_ease-out_0.15s_forwards]"
        >
          {slide.headline}
        </h1>

        {/* CTA */}
        <div
          key={`cta-${current}`}
          className="opacity-0 animate-[fadeSlideUp_0.5s_ease-out_0.4s_forwards]"
        >
          <Link
            to="/shop"
            className="inline-block border border-primary-foreground/60 text-primary-foreground px-10 py-4 md:px-8 md:py-3.5 text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-primary-foreground hover:text-foreground transition-all duration-500"
          >
            {slide.cta}
          </Link>
        </div>

        {/* Slide indicators with progress */}
        <div className="flex items-center gap-3 mt-10 md:mt-12">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="group relative h-[2px] cursor-pointer"
              style={{ width: i === current ? 48 : 24 }}
              aria-label={`Go to slide ${i + 1}`}
            >
              <div className="absolute inset-0 bg-primary-foreground/25 rounded-full" />
              <div
                className="absolute inset-y-0 left-0 bg-primary-foreground rounded-full transition-all duration-100"
                style={{
                  width: i === current ? `${progress * 100}%` : i < current ? "100%" : "0%",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
