import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductCarousel from "@/components/ProductCarousel";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import FadeIn from "@/components/FadeIn";
import { allProducts, REGISTRATION_URL } from "@/data/products";

import tee95thBackNoBg from "@/assets/products/tee-95th-back-nobg.png";
import AnimatedCounter from "@/components/AnimatedCounter";

const newArrivals = allProducts.filter((p) => !p.registrationOnly).slice(0, 10);
const hats = allProducts.filter((p) => p.category === "Headwear" && !p.registrationOnly);
const tops = allProducts.filter((p) => ["Tees", "Polos", "Outerwear"].includes(p.category));
const accessories = allProducts.filter((p) => p.category === "Accessories");

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
            <div className="w-full md:w-1/2 h-[220px] md:h-full flex items-center justify-center p-4 md:p-8 parallax-container">
              <img
                src={tee95thBackNoBg}
                alt="95th Anniversary Tee"
                className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-700 parallax-float"
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

        <ProductCarousel title="Hats" products={hats} />
        <ProductCarousel title="Tops" products={tops} />
        <ProductCarousel title="Accessories" products={accessories} />

        {/* Stats counter bar */}
        <FadeIn>
          <section className="bg-secondary py-10 md:py-14">
            <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto text-center px-6">
              <div>
                <AnimatedCounter end={95} suffix="+" className="font-display text-3xl md:text-5xl text-foreground" />
                <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-muted-foreground mt-1">Years of Legacy</p>
              </div>
              <div>
                <AnimatedCounter end={1931} className="font-display text-3xl md:text-5xl text-foreground" />
                <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-muted-foreground mt-1">Founded</p>
              </div>
              <div>
                <AnimatedCounter end={500} suffix="+" className="font-display text-3xl md:text-5xl text-foreground" />
                <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-muted-foreground mt-1">Members Strong</p>
              </div>
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
