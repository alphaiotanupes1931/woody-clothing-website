import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductCarousel from "@/components/ProductCarousel";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import FadeIn from "@/components/FadeIn";

import bannerFitted from "@/assets/banner-fitted.jpg";
import bannerStacked from "@/assets/banner-stacked.jpg";
import bannerCargo from "@/assets/banner-cargo.jpg";

// Tees
import kreamTeeAchievers from "@/assets/products/kream-tee-achievers.jpg";
import kreamTeeCorner from "@/assets/products/kream-tee-corner.png";
import tee95thFront from "@/assets/products/tee-95th-front.jpg";
import tee95thBack from "@/assets/products/tee-95th-back.jpg";
import tee95thBackNoBg from "@/assets/products/tee-95th-back-nobg.png";
import kreamTee1 from "@/assets/products/kream-tee-1.jpg";
import kreamTee2 from "@/assets/products/kream-tee-2.jpg";

// Polos
import kreamWovenPolo from "@/assets/products/kream-woven-polo.jpg";
import krimsonWovenPolo from "@/assets/products/krimson-woven-polo.jpg";
import kreamPerformancePolo from "@/assets/products/kream-performance-polo.jpg";
import dryFitPolo from "@/assets/products/dry-fit-polo.jpg";

// Headwear
import krimsonBucketFront from "@/assets/products/krimson-bucket-front.jpg";
import krimsonFittedBack from "@/assets/products/krimson-fitted-back.jpg";
import krimsonFittedFront1 from "@/assets/products/krimson-fitted-front-1.jpg";
import krimsonFittedSide2 from "@/assets/products/krimson-fitted-side-2.jpg";
import krimsonSkully from "@/assets/products/krimson-skully.jpg";
import krimsonFittedFront from "@/assets/products/krimson-fitted-front.jpg";
import krimsonFittedSide from "@/assets/products/krimson-fitted-side.jpg";
import flexKreamKap from "@/assets/products/flex-kream-kap.jpg";
import flexKrimsonKap from "@/assets/products/flex-krimson-kap.jpg";

// Outerwear
import ktrZip from "@/assets/products/ktr-zip.jpg";
import hoodieMerlot from "@/assets/products/hoodie-merlot.jpg";

// Accessories
import kreamSocks from "@/assets/products/kream-socks.jpg";

// Jeans
import jeansCaviar from "@/assets/products/jeans-caviar.jpg";
import jeansFume from "@/assets/products/jeans-fume.jpg";
import jeansOud from "@/assets/products/jeans-oud.jpg";
import jeansPotala from "@/assets/products/jeans-potala.jpg";
import jeansCosmos from "@/assets/products/jeans-cosmos.jpg";
import jeansTitan from "@/assets/products/jeans-titan.jpg";

const newArrivals = [
  { image: kreamTeeAchievers, name: '"Achievers" KREAM Tee', price: "$55.00" },
  { image: kreamTeeCorner, name: 'K-Diamond KREAM Tee', price: "$55.00" },
  { image: tee95thFront, name: '95th ANNIVERSARY "KREAM" Tee — Cream', price: "$65.00" },
  { image: krimsonFittedFront1, name: 'KRIMSON K-Diamond Fitted Hat', price: "$55.00" },
  { image: krimsonBucketFront, name: 'KRIMSON K-Diamond Bucket Hat', price: "$45.00" },
  { image: krimsonSkully, name: 'KRIMSON K-Diamond Skully', price: "$35.00" },
  { image: kreamWovenPolo, name: 'KREAM Woven Polo', price: "$75.00" },
  { image: krimsonWovenPolo, name: 'KRIMSON Woven Polo', price: "$75.00" },
  { image: kreamPerformancePolo, name: 'KREAM Performance Polo', price: "$75.00" },
  { image: ktrZip, name: 'KRIMSON Quarter-Zip Sweater', price: "$95.00" },
  { image: kreamSocks, name: 'KREAM K-Diamond Socks', price: "$18.00" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />

      <main>
        <HeroSection />

        <ProductCarousel title="New Arrivals" products={newArrivals} />

        <FadeIn>
          <section className="relative w-full min-h-[50vh] md:h-[70vh] md:min-h-[400px] overflow-hidden bg-foreground flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 h-[250px] md:h-full flex items-center justify-center p-6 md:p-8 parallax-container">
              <img
                src={tee95thBackNoBg}
                alt="95th Anniversary Tee"
                className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-700 parallax-float"
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center px-6 pb-8 md:pr-20 md:pb-0">
              <h2 className="font-display text-3xl md:text-6xl tracking-wide text-primary-foreground mb-3 leading-[0.9]">
                95TH ANNIVERSARY
              </h2>
              <p className="text-sm text-primary-foreground/75 mb-5 leading-relaxed font-light">
                Celebrating 95 years of Alpha Iota. The limited-edition KREAM tee honors our legacy, 1931 to 2026.
              </p>
              <a
                href="/shop"
                className="inline-block w-fit bg-background text-foreground px-8 py-3 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-background/90 transition-all duration-300 hover:tracking-[0.3em]"
              >
                SHOP NOW
              </a>
            </div>
          </section>
        </FadeIn>

        <ProductCarousel
          title="Hats"
          products={[
            { image: krimsonFittedFront1, name: 'KRIMSON K-Diamond Fitted Hat', price: "$55.00" },
            { image: krimsonFittedSide2, name: 'KRIMSON "Achievers" Fitted Hat — Side', price: "$55.00" },
            { image: krimsonFittedBack, name: 'KRIMSON Fitted Hat — Back', price: "$55.00" },
            { image: krimsonBucketFront, name: 'KRIMSON K-Diamond Bucket Hat', price: "$45.00" },
            { image: krimsonSkully, name: 'KRIMSON K-Diamond Skully', price: "$35.00" },
            { image: flexKreamKap, name: 'KREAM FlexFit K-Diamond Kap', price: "$45.00" },
            { image: flexKrimsonKap, name: 'KRIMSON FlexFit K-Diamond Kap', price: "$45.00" },
          ]}
        />

        <ProductCarousel
          title="Tops"
          products={[
            { image: kreamTeeAchievers, name: '"Achievers" KREAM Tee', price: "$55.00" },
            { image: kreamTeeCorner, name: 'K-Diamond KREAM Tee', price: "$55.00" },
            { image: tee95thFront, name: '95th ANNIVERSARY "KREAM" Tee — Cream', price: "$65.00" },
            { image: tee95thBack, name: '95th ANNIVERSARY "KREAM" Tee — Back', price: "$65.00" },
            { image: kreamTee1, name: 'K-Diamond Outline Tee — Cream', price: "$55.00" },
            { image: kreamTee2, name: 'K-Diamond Filled Tee — Cream', price: "$55.00" },
            { image: kreamWovenPolo, name: 'KREAM Woven Polo', price: "$75.00" },
            { image: krimsonWovenPolo, name: 'KRIMSON Woven Polo', price: "$75.00" },
            { image: kreamPerformancePolo, name: 'KREAM Performance Polo', price: "$75.00" },
            { image: dryFitPolo, name: 'KRIMSON Dry-Fit Polo', price: "$75.00" },
            { image: ktrZip, name: 'KRIMSON Quarter-Zip Sweater', price: "$95.00" },
          ]}
        />

        <ProductCarousel
          title="Bottoms"
          products={[
            { image: kreamSocks, name: 'KREAM K-Diamond Socks', price: "$18.00" },
          ]}
        />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
