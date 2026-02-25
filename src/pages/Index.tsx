import { useState, useEffect, useCallback } from "react";
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
import krimsonFittedFront from "@/assets/products/krimson-fitted-front-1.jpg";
import krimsonFittedSide from "@/assets/products/krimson-fitted-side-2.jpg";

const newArrivals = allProducts.filter((p) => !p.registrationOnly).slice(0, 10);
const hatsAndAccessories = allProducts.filter((p) => (p.category === "Headwear" || p.category === "Accessories") && !p.registrationOnly);
const tops = allProducts.filter((p) => ["Tees", "Polos", "Outerwear"].includes(p.category));

const pillars = [
  { number: "01", title: "LEGACY", text: "95 years of excellence. Every stitch carries the weight of those who came before us.", width: "100%" },
  { number: "02", title: "BROTHERHOOD", text: "Built by brothers, worn by achievers. This isn't merch — it's identity.", width: "85%" },
  { number: "03", title: "CRAFT", text: "Premium materials, intentional design. No shortcuts, no compromises.", width: "70%" },
  { number: "04", title: "PURPOSE", text: "Achievers of the Impossible. We don't just wear it — we live it.", width: "55%" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <AnnouncementBar />
      <Header />

      <main>
        <HeroSection />

        <ProductCarousel title="New Arrivals" products={newArrivals} />

        <FadeIn>
          <section className="relative w-full min-h-[60vh] md:h-[70vh] md:min-h-[400px] overflow-hidden bg-foreground flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 h-[260px] md:h-full flex items-center justify-center p-6 md:p-10">
              <img
                src={tee95thBackNoBg}
                alt="95th Anniversary Tee"
                className="max-h-[200px] md:max-h-[420px] object-contain drop-shadow-2xl"
              />
            </div>
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

        {/* What We Stand For — Pyramid Hierarchy */}
        <FadeIn>
          <section className="bg-foreground text-primary-foreground py-16 md:py-28 px-4 md:px-14 overflow-hidden">
            <div className="max-w-5xl mx-auto">
              <div className="mb-14 md:mb-20">
                <p className="text-[10px] tracking-[0.3em] uppercase text-primary-foreground/40 mb-2">
                  The AI Collection
                </p>
                <h2 className="font-display text-4xl md:text-8xl tracking-tight text-primary-foreground leading-[0.85]">
                  WHAT WE
                  <br />
                  STAND FOR
                </h2>
              </div>

              <div className="flex flex-col items-start gap-0">
                {pillars.map((pillar, i) => (
                  <FadeIn key={i} delay={i * 180}>
                    <div
                      className="border-t border-primary-foreground/15 pt-6 pb-8 md:pt-8 md:pb-10 group"
                      style={{ width: "100%", maxWidth: pillar.width === "100%" ? "100%" : pillar.width }}
                    >
                      <div className="flex items-baseline gap-4 md:gap-6">
                        <span className="font-display text-5xl md:text-8xl text-primary-foreground/10 leading-none group-hover:text-[hsl(var(--krimson))] transition-colors duration-500">
                          {pillar.number}
                        </span>
                        <div>
                          <h3 className="font-display text-xl md:text-3xl tracking-[0.15em] text-primary-foreground mb-2">
                            {pillar.title}
                          </h3>
                          <p className="text-xs md:text-sm text-primary-foreground/50 leading-relaxed max-w-md">
                            {pillar.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
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
