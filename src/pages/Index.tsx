import { useState, useCallback } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductCarousel from "@/components/ProductCarousel";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import FadeIn from "@/components/FadeIn";
import { allProducts, REGISTRATION_URL } from "@/data/products";
import { Link } from "react-router-dom";

import tee95thBackNoBg from "@/assets/products/tee-95th-back-nobg.png";
import lifestyleAchievers from "@/assets/lifestyle/lifestyle-achievers.jpg";
import lifestyleQuarterzip from "@/assets/lifestyle/lifestyle-quarterzip.jpg";
import lifestyleKdiamondFront1 from "@/assets/lifestyle/lifestyle-kdiamond-front-1.jpg";
import lifestyle95thBack from "@/assets/lifestyle/lifestyle-95th-back.jpg";
import krimsonFittedFront from "@/assets/products/krimson-fitted-front-1.jpg";
import krimsonFittedSide from "@/assets/products/krimson-fitted-side-2.jpg";

const newArrivals = allProducts.filter((p) => !p.registrationOnly).slice(0, 10);
const hatsAndAccessories = allProducts.filter((p) => (p.category === "Headwear" || p.category === "Accessories") && !p.registrationOnly);
const tops = allProducts.filter((p) => ["Tees", "Polos", "Outerwear"].includes(p.category));

const TiltImage = ({ src, alt }: { src: string; alt: string }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -20, y: x * 20 });
    setGlare({ x: (x + 0.5) * 100, y: (y + 0.5) * 100 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50 });
  }, []);

  return (
    <div
      className="w-full md:w-1/2 h-[260px] md:h-full flex items-center justify-center p-6 md:p-10 cursor-grab"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative max-h-full max-w-full"
        style={{
          transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${tilt.x !== 0 || tilt.y !== 0 ? 1.05 : 1})`,
          transition: tilt.x === 0 && tilt.y === 0
            ? "transform 0.6s cubic-bezier(0.16,1,0.3,1)"
            : "transform 0.1s ease-out",
        }}
      >
        <img
          src={src}
          alt={alt}
          className="max-h-[200px] md:max-h-[420px] object-contain drop-shadow-2xl"
        />
        <div
          className="absolute inset-0 pointer-events-none rounded-sm"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
            opacity: tilt.x !== 0 || tilt.y !== 0 ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        />
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />

      <main>
        <HeroSection />

        <ProductCarousel title="New Arrivals" products={newArrivals} />

        <FadeIn>
          <section className="relative w-full min-h-[60vh] md:h-[70vh] md:min-h-[400px] overflow-hidden bg-foreground flex flex-col md:flex-row items-center">
            <TiltImage src={tee95thBackNoBg} alt="95th Anniversary Tee" />
            <div className="w-full md:w-1/2 flex flex-col justify-center px-6 pb-10 md:pr-20 md:pb-0">
              <h2 className="font-display text-4xl md:text-6xl tracking-wide text-primary-foreground mb-3 leading-[0.9]">
                95TH ANNIVERSARY
              </h2>
              <p className="text-sm text-primary-foreground/75 mb-5 leading-relaxed font-light">
                Celebrating 95 years of Alpha Iota. The limited-edition KREAM tee honors our legacy, 1931 to 2026.
              </p>
              <a
                href="/shop"
                className="inline-block w-fit bg-background text-foreground px-10 py-4 md:px-8 md:py-3 text-[12px] md:text-xs font-semibold tracking-[0.2em] uppercase hover:bg-background/90 active:bg-background/80 transition-all duration-300 hover:tracking-[0.3em]"
              >
                SHOP NOW
              </a>
            </div>
          </section>
        </FadeIn>

        <ProductCarousel title="Accessories" products={hatsAndAccessories} />

        {/* Lifestyle Lookbook */}
        <FadeIn>
          <section className="px-4 md:px-14 py-10 md:py-16">
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-1">
              The AI Collection
            </p>
            <h2 className="font-display text-2xl md:text-3xl tracking-wide uppercase text-foreground mb-6 md:mb-8">
              THE LOOKBOOK
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
              <FadeIn delay={0} className="col-span-1 md:row-span-2 md:col-span-2">
                <Link to="/product/k-diamond-outline-tee-kream" className="group relative block aspect-[3/4] overflow-hidden">
                  <img src={lifestyleKdiamondFront1} alt="K-Diamond Tee lifestyle" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </FadeIn>
              <FadeIn delay={120}>
                <Link to="/product/krimson-quarter-zip-sweater" className="group relative block aspect-[3/4] overflow-hidden">
                  <img src={lifestyleQuarterzip} alt="Quarter-Zip lifestyle" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </FadeIn>
              <FadeIn delay={200}>
                <Link to="/product/achievers-kream-tee" className="group relative block aspect-[3/4] overflow-hidden">
                  <img src={lifestyleAchievers} alt="Achievers Tee lifestyle" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </FadeIn>
              <FadeIn delay={300} className="col-span-2">
                <a href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer" className="group relative block aspect-[3/4] overflow-hidden">
                  <img src={lifestyle95thBack} alt="95th Anniversary back" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              </FadeIn>
            </div>
          </section>
        </FadeIn>

        <ProductCarousel title="Tops" products={tops} />

        {/* Fitted Hat Feature */}
        <FadeIn>
          <section className="px-4 md:px-14 py-12 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-center">
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                <FadeIn delay={0}>
                  <div className="aspect-square overflow-hidden bg-secondary">
                    <img
                      src={krimsonFittedFront}
                      alt="KRIMSON Fitted Hat front"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </FadeIn>
                <FadeIn delay={120}>
                  <div className="aspect-square overflow-hidden bg-secondary">
                    <img
                      src={krimsonFittedSide}
                      alt="KRIMSON Fitted Hat side"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </FadeIn>
              </div>
              <FadeIn delay={200}>
                <div className="flex flex-col justify-center px-2 md:px-10">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
                    The AI Collection · Featured
                  </p>
                  <h2 className="font-display text-3xl md:text-5xl tracking-tight text-foreground mb-3 leading-[0.9]">
                    KRIMSON K-DIAMOND
                    <br />
                    FITTED HAT
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-md">
                    Structured six-panel fitted cap with the K-Diamond patch front and center. Premium wool blend, satin-lined interior, and a flat brim with green undervisor.
                  </p>
                  <Link
                    to="/product/krimson-k-diamond-fitted-hat"
                    className="inline-block w-fit bg-foreground text-background px-8 py-3.5 text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-foreground/90 transition-all duration-300"
                  >
                    Shop Now · $40
                  </Link>
                </div>
              </FadeIn>
            </div>
          </section>
        </FadeIn>

        {/* Registration CTA */}
        <FadeIn>
          <section className="bg-foreground text-primary-foreground py-14 md:py-20 text-center px-6">
            <h2 className="font-display text-3xl md:text-5xl tracking-wide mb-4">
              95TH ANNIVERSARY CELEBRATION
            </h2>
            <p className="text-sm text-primary-foreground/70 max-w-md mx-auto mb-6 leading-relaxed">
              Register for the Alpha Iota 95th Anniversary Celebration to receive exclusive merch and event access.
            </p>
            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-fill-sweep inline-block bg-background text-foreground px-10 py-4 text-xs font-semibold tracking-[0.2em] uppercase transition-transform duration-300 hover:tracking-[0.3em]"
            >
              Register Now
            </a>
          </section>
        </FadeIn>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
