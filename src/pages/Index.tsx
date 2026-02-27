import { useState, useEffect, useCallback, useRef } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";

import ProductCarousel from "@/components/ProductCarousel";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import FadeIn from "@/components/FadeIn";
import ParallaxGallery from "@/components/ParallaxGallery";
import MagneticButton from "@/components/MagneticButton";
import { allProducts, REGISTRATION_URL } from "@/data/products";
import { Link } from "react-router-dom";

import tee95thBackNoBg from "@/assets/products/tee-95th-back-nobg.png";
import krimsonFittedFront from "@/assets/products/krimson-fitted-front-1.jpg";
import krimsonFittedSide from "@/assets/products/krimson-fitted-side-2.jpg";

const newArrivals = allProducts.filter((p) => !p.registrationOnly).slice(0, 10);
const hatsAndAccessories = allProducts.filter((p) => (p.category === "Headwear" || p.category === "Accessories") && !p.registrationOnly);
const tops = allProducts.filter((p) => ["Tees", "Polos", "Outerwear"].includes(p.category));


const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.currentTime = 180;
    const handleTime = () => {
      if (el.currentTime >= 300) el.currentTime = 180;
    };
    el.addEventListener("timeupdate", handleTime);
    el.play().catch(() => {});
    return () => el.removeEventListener("timeupdate", handleTime);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <AnnouncementBar />
      <Header />

      <main>
        {/* Hero */}
        <section className="relative h-[85vh] w-full overflow-hidden bg-foreground">
          <div
            className="absolute inset-0 will-change-transform"
            style={{ transform: `translateY(${scrollY * 0.35}px)` }}
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-[115%] object-cover opacity-60"
              crossOrigin="anonymous"
            >
              <source src="https://res.cloudinary.com/ddfe8uqth/video/upload/v1/videoplayback_1_j2pk9p" type="video/mp4" />
            </video>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/20 to-transparent" />
          <div
            className="relative z-10 flex flex-col justify-end h-full px-6 md:px-14 pb-16 md:pb-24"
            style={{ transform: `translateY(${scrollY * -0.15}px)`, opacity: Math.max(0, 1 - scrollY / 600) }}
          >
            <h1 className="font-display text-3xl sm:text-4xl md:text-6xl tracking-[0.15em] text-primary-foreground leading-[0.9] opacity-0 animate-[fadeSlideUp_0.8s_ease-out_0.3s_forwards]">
              THE AI COLLECTION
            </h1>
            <Link
              to="/shop"
              className="mt-6 opacity-0 animate-[fadeSlideUp_0.6s_ease-out_0.7s_forwards] inline-block w-fit border border-primary-foreground/40 text-primary-foreground px-8 py-3 text-[10px] font-medium tracking-[0.3em] uppercase hover:bg-primary-foreground hover:text-foreground transition-all duration-500"
            >
              Shop Now
            </Link>
          </div>
        </section>

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
              <MagneticButton
                as="a"
                href="/shop"
                className="inline-block w-fit bg-background text-foreground px-10 py-4 md:px-8 md:py-3 text-[12px] md:text-xs font-semibold tracking-[0.2em] uppercase hover:bg-background/90 active:bg-background/80 transition-all duration-300 hover:tracking-[0.3em]"
              >
                SHOP NOW
              </MagneticButton>
            </div>
          </section>
        </FadeIn>

        <ProductCarousel title="Accessories" products={hatsAndAccessories} />



        <ParallaxGallery />

        <ProductCarousel title="Tops" products={tops} />

        {/* Brand Mission */}
        <FadeIn>
          <section className="px-4 md:px-14 py-16 md:py-24">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">The AI Collection</p>
                <h2 className="font-display text-3xl md:text-5xl tracking-tight text-foreground leading-[0.9] mb-5">
                  MORE THAN
                  <br />
                  JUST APPAREL
                </h2>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The AI Collection is the official lifestyle brand of the Alpha Iota chapter of Kappa Alpha Psi 
                  at Morgan State University. Every piece we create honors 95 years of brotherhood, leadership, 
                  and Black excellence.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your purchase directly supports chapter scholarships, community programming, and the next 
                  generation of achievers. This isn't merch, it's a movement.
                </p>
                <Link
                  to="/our-story"
                  className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-foreground border-b border-foreground pb-1 hover:opacity-70 transition-opacity"
                >
                  Read Our Story
                </Link>
              </div>
            </div>
          </section>
        </FadeIn>

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
