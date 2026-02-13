import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductCarousel from "@/components/ProductCarousel";
import CategoryBanner from "@/components/CategoryBanner";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";

import heroVideo from "@/assets/hero-video.mp4";
import bannerFitted from "@/assets/banner-fitted.jpg";
import bannerStacked from "@/assets/banner-stacked.jpg";
import bannerCargo from "@/assets/banner-cargo.jpg";

import hoodieMerlot from "@/assets/products/hoodie-merlot.jpg";
import jeansCaviar from "@/assets/products/jeans-caviar.jpg";
import tshirtMerlot from "@/assets/products/tshirt-merlot.jpg";
import jeansFume from "@/assets/products/jeans-fume.jpg";
import jeansOud from "@/assets/products/jeans-oud.jpg";
import jeansPotala from "@/assets/products/jeans-potala.jpg";
import jeansCosmos from "@/assets/products/jeans-cosmos.jpg";
import jeansTitan from "@/assets/products/jeans-titan.jpg";
import tee95thFront from "@/assets/products/tee-95th-front.jpg";
import tee95thBack from "@/assets/products/tee-95th-back.jpg";
import tee95thBackNoBg from "@/assets/products/tee-95th-back-nobg.png";
import krimsonFittedFront from "@/assets/products/krimson-fitted-front.jpg";
import krimsonFittedSide from "@/assets/products/krimson-fitted-side.jpg";
import flexKreamKap from "@/assets/products/flex-kream-kap.jpg";
import flexKrimsonKap from "@/assets/products/flex-krimson-kap.jpg";
import kreamTee1 from "@/assets/products/kream-tee-1.jpg";
import kreamTee2 from "@/assets/products/kream-tee-2.jpg";
import kreamSocks from "@/assets/products/kream-socks.jpg";
import ktrZip from "@/assets/products/ktr-zip.jpg";
import dryFitPolo from "@/assets/products/dry-fit-polo.jpg";

const newArrivals = [
  { image: tee95thFront, name: '95th ANNIVERSARY "KREAM" Tee — Cream', price: "$65.00" },
  { image: tee95thBack, name: '95th ANNIVERSARY "KREAM" Tee — Back Print', price: "$65.00" },
  { image: krimsonFittedFront, name: 'KRIMSON K-Diamond Fitted Hat', price: "$55.00" },
  { image: krimsonFittedSide, name: 'KRIMSON "Achievers" Fitted Hat — Side', price: "$55.00" },
  { image: ktrZip, name: 'KRIMSON Quarter-Zip Sweater', price: "$95.00" },
  { image: dryFitPolo, name: 'KRIMSON Dry-Fit Polo', price: "$75.00" },
  { image: flexKreamKap, name: 'KREAM FlexFit K-Diamond Kap', price: "$45.00" },
  { image: flexKrimsonKap, name: 'KRIMSON FlexFit K-Diamond Kap', price: "$45.00" },
  { image: kreamTee1, name: 'K-Diamond Outline Tee — Cream', price: "$55.00" },
  { image: kreamTee2, name: 'K-Diamond Filled Tee — Cream', price: "$55.00" },
  { image: kreamSocks, name: 'KREAM K-Diamond Socks', price: "$18.00" },
];

const fittedCollection = [
  { image: jeansCaviar, name: '"SHADOW33" Jeans', price: "$98.00" },
  { image: jeansOud, name: '"SEDONA 2.0" Jeans', price: "$98.00" },
  { image: jeansFume, name: '"ROME" Black Jeans', price: "$108.00" },
  { image: jeansPotala, name: '"SEAFOAM" Jeans', price: "$98.00" },
  { image: jeansCosmos, name: "COSMOS Jeans", price: "$138.00" },
  { image: jeansTitan, name: "MOCHA Jeans", price: "$98.00" },
  { image: jeansCaviar, name: '"MIDNIGHT BLACK" Jeans', price: "$98.00" },
  { image: jeansOud, name: "NIGHTFALL Jeans", price: "$98.00" },
];

const stackedCollection = [
  { image: jeansTitan, name: '"HAVENMIST" Stacked Jeans', price: "$110.00" },
  { image: jeansCosmos, name: "NEPTUNE Stacked Jeans", price: "$120.00" },
  { image: jeansCaviar, name: "ONYX Stacked Jeans", price: "$120.00" },
  { image: jeansPotala, name: '"SEABURST" Stacked Jeans', price: "$110.00" },
  { image: jeansOud, name: "NEXUS Stacked Jeans", price: "$120.00" },
  { image: jeansFume, name: '"CAVIAR" Wax Stacked Jeans', price: "$120.00" },
];

const cargoCollection = [
  { image: jeansCosmos, name: "ONYX Cargo Jeans", price: "$138.00" },
  { image: jeansOud, name: "WARSAINT Cargo Jeans", price: "$120.00" },
  { image: jeansFume, name: '"TIGERS EYE" Cargo Jeans', price: "$108.00" },
  { image: jeansPotala, name: "PANTHERA Cargo Jeans", price: "$108.00" },
  { image: jeansTitan, name: '"CURRENT" Cargo Jeans', price: "$116.00" },
  { image: jeansCaviar, name: '"WAVE" Cargo Jeans', price: "$116.00" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />

      <main>
        <HeroSection
          video={heroVideo}
          title="NEW ARRIVALS"
          subtitle="The perfect blend of comfort and style."
          ctaText="SHOP NOW"
        />

        <ProductCarousel title="New Arrivals" products={newArrivals} />

        <section className="relative w-full h-[70vh] min-h-[400px] overflow-hidden bg-foreground flex items-center">
          <div className="w-1/2 h-full flex items-center justify-center p-8">
            <img
              src={tee95thBackNoBg}
              alt="95th Anniversary Tee"
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-center pr-10 md:pr-20">
            <h2 className="font-display text-4xl md:text-6xl tracking-wide text-primary-foreground mb-3 leading-[0.9]">
              95TH ANNIVERSARY
            </h2>
            <p className="text-sm text-primary-foreground/75 mb-5 leading-relaxed font-light">
              Celebrating 95 years of Alpha Iota. The limited-edition KREAM tee honors our legacy, 1931 to 2026.
            </p>
            <a
              href="/shop"
              className="inline-block w-fit bg-background text-foreground px-8 py-3 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-background/90 transition-colors"
            >
              SHOP NOW
            </a>
          </div>
        </section>

        <ProductCarousel
          title="Hats"
          products={[
            { image: krimsonFittedFront, name: 'KRIMSON K-Diamond Fitted Hat', price: "$55.00" },
            { image: krimsonFittedSide, name: 'KRIMSON "Achievers" Fitted Hat', price: "$55.00" },
            { image: flexKreamKap, name: 'KREAM FlexFit K-Diamond Kap', price: "$45.00" },
            { image: flexKrimsonKap, name: 'KRIMSON FlexFit K-Diamond Kap', price: "$45.00" },
          ]}
        />

        <ProductCarousel
          title="Tops"
          products={[
            { image: tee95thFront, name: '95th ANNIVERSARY "KREAM" Tee — Cream', price: "$65.00" },
            { image: tee95thBack, name: '95th ANNIVERSARY "KREAM" Tee — Back', price: "$65.00" },
            { image: kreamTee1, name: 'K-Diamond Outline Tee — Cream', price: "$55.00" },
            { image: kreamTee2, name: 'K-Diamond Filled Tee — Cream', price: "$55.00" },
            { image: ktrZip, name: 'KRIMSON Quarter-Zip Sweater', price: "$95.00" },
            { image: dryFitPolo, name: 'KRIMSON Dry-Fit Polo', price: "$75.00" },
          ]}
        />

        <ProductCarousel
          title="Bottoms"
          products={[
            { image: kreamSocks, name: 'KREAM K-Diamond Socks', price: "$18.00" },
          ]}
        />

        <ReviewsSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
