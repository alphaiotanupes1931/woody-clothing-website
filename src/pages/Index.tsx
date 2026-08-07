import { useState, useEffect } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import FadeIn from "@/components/FadeIn";
import MagneticButton from "@/components/MagneticButton";
import { FEATURED_PRODUCT } from "@/data/products";
import { Link } from "react-router-dom";

const product = FEATURED_PRODUCT;
const front = product.images?.[0] || product.image;
const back = product.images?.[1] || product.image;

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
      <section className="relative min-h-[100svh] flex items-center justify-center bg-foreground text-primary-foreground overflow-hidden">
        <img
          src={front}
          alt="Pain of the Game · AI in 5 Tee, front graphic"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          style={{ transform: `translateY(${scrollY * 0.2}px) scale(1.06)` }}
        />
        <div className="relative z-10 text-center px-6 pt-16 pb-24">
          <p className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-primary-foreground/70 mb-5">
            One Drop · One Tee
          </p>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl leading-[0.9] tracking-tight mb-5">
            PAIN OF THE GAME
          </h1>
          <p className="text-sm md:text-base text-primary-foreground/80 max-w-xl mx-auto leading-relaxed mb-9">
            AI in 5. Every ring earned, every fracture logged. Vintage-wash heavyweight tee · $40.
          </p>
          <MagneticButton>
            <Link
              to={`/product/${product.id}`}
              className="inline-block bg-primary-foreground text-foreground px-10 py-4 text-[11px] font-semibold tracking-[0.25em] uppercase hover:opacity-90 transition-opacity"
            >
              Shop the Tee
            </Link>
          </MagneticButton>
        </div>
      </section>

      {/* Front / Back */}
      <section className="px-4 md:px-14 py-16 md:py-24">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {[
              { src: front, label: "Front · The X-Ray" },
              { src: back, label: "Back · The Schedule" },
            ].map((shot) => (
              <Link
                key={shot.label}
                to={`/product/${product.id}`}
                className="group block"
              >
                <div className="bg-secondary aspect-[4/5] overflow-hidden">
                  <img
                    src={shot.src}
                    alt={`${product.name} · ${shot.label}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>
                <p className="mt-3 text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
                  {shot.label}
                </p>
              </Link>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Story */}
      <section className="px-6 md:px-14 pb-16 md:pb-24">
        <FadeIn>
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl md:text-5xl tracking-tight text-foreground mb-5">
              THE RECORD, WORN
            </h2>
            <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
              <p>
                Five rings on one hand · read like an x-ray. Fracture, dissension, disdain · the labels
                are the parts of the process nobody puts on a highlight reel.
              </p>
              <p>
                The back panel runs the schedule line by line, class by class. Names change, the standard
                does not.
              </p>
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to={`/product/${product.id}`}
                className="bg-foreground text-background px-8 py-4 text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-foreground/90 transition-colors"
              >
                Buy Now · $40
              </Link>
              <Link
                to="/shipping-returns"
                className="border border-border text-foreground px-8 py-4 text-[11px] font-semibold tracking-[0.25em] uppercase hover:border-foreground transition-colors"
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
