import { useState, useEffect } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import FadeIn from "@/components/FadeIn";
import ProductCard from "@/components/ProductCard";
import { allProducts } from "@/data/products";
import { Link } from "react-router-dom";
import heroImage from "@/assets/lifestyle/lifestyle-kdiamond-front-1.jpg";
import heroVideo from "@/assets/hero-main.mp4.asset.json";

/** Hero media · video with the photo as poster fallback. */
const HERO_VIDEO: string | null = heroVideo.url;

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <AnnouncementBar />
      <Header />

      {/* Hero */}
      <section className="relative min-h-[100svh] flex items-end bg-foreground overflow-hidden">
        {HERO_VIDEO ? (
          <video
            src={HERO_VIDEO}
            poster={heroImage}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={(e) => { void e.currentTarget.play().catch(() => {}); }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <img
            src={heroImage}
            alt="AI Nupes apparel"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center 30%", transform: `translateY(${scrollY * 0.15}px) scale(1.05)` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/25 to-foreground/40" />

        <div className="relative z-10 w-full px-6 md:px-14 pb-16 md:pb-24 text-primary-foreground">
          <p className="text-[10px] md:text-[11px] tracking-[0.35em] uppercase text-primary-foreground/70 mb-4">
            AI Nupes · The AI Collection
          </p>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl leading-[0.9] tracking-tight max-w-4xl mb-6">
            THE AI COLLECTION
          </h1>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="bg-primary-foreground text-foreground px-9 py-4 text-[11px] font-semibold tracking-[0.25em] uppercase hover:opacity-90 transition-opacity"
            >
              Shop Now
            </Link>
            <Link
              to="/our-story"
              className="border border-primary-foreground/40 px-9 py-4 text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-primary-foreground hover:text-foreground transition-colors"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="px-4 md:px-14 py-16 md:py-24">
        <FadeIn>
          <div className="flex items-end justify-between mb-8 md:mb-10">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
                Available Now
              </p>
              <h2 className="font-display text-3xl md:text-5xl tracking-tight text-foreground">
                SHOP THE DROP
              </h2>
            </div>
            <Link
              to="/shop"
              className="hidden sm:inline-block text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              View All
            </Link>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4 md:gap-x-3 md:gap-y-6 stagger-children">
          {allProducts.map((product, i) => (
            <FadeIn key={product.id} delay={i * 80}>
              <ProductCard
                id={product.id}
                image={product.image}
                name={product.name}
                price={product.price}
                soldOut={product.soldOut}
              />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Brand line */}
      <section className="border-t border-border px-6 md:px-14 py-16 md:py-24">
        <FadeIn>
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl md:text-5xl tracking-tight text-foreground mb-5">
              MADE TO LAST
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8">
              Heavyweight fabrics, considered graphics, limited runs. Every piece is made for brothers
              who move with purpose · nothing extra, nothing loud for the sake of it.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="bg-foreground text-background px-9 py-4 text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-foreground/90 transition-colors"
              >
                Shop Now
              </Link>
              <Link
                to="/shipping-returns"
                className="border border-border text-foreground px-9 py-4 text-[11px] font-semibold tracking-[0.25em] uppercase hover:border-foreground transition-colors"
              >
                Shipping Info
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
