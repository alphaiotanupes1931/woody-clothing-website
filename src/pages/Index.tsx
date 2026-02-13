import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductCarousel from "@/components/ProductCarousel";
import CategoryBanner from "@/components/CategoryBanner";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";

import heroLifestyle from "@/assets/hero-crowd2.png";
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
          image={heroLifestyle}
          title="NEW ARRIVALS"
          subtitle="The perfect blend of comfort and style."
          ctaText="SHOP NOW"
        />

        <ProductCarousel title="New Arrivals" products={newArrivals} />

        <CategoryBanner
          image={tee95thBack}
          title="95TH ANNIVERSARY"
          description="Celebrating 95 years of Alpha Iota. The limited-edition KREAM tee honors our legacy — 1931 to 2026."
        />

        <ProductCarousel
          title="[ Anniversary Collection ]"
          products={newArrivals.filter((_, i) => [0, 1, 8, 9].includes(i))}
        />

        <CategoryBanner
          image={bannerStacked}
          title="STACKED JEANS"
          description="Explore our stacked jeans collection, featuring true-to-size waists and wide ankle openings for a stylish, flared finish."
        />

        <ProductCarousel
          title="Stacked Collection"
          products={stackedCollection}
        />

        <CategoryBanner
          image={bannerCargo}
          title="CARGO PANTS"
          description="Discover our cargo denim collection, designed with true-to-size waists. For a relaxed, looser fit, simply go one size up."
        />

        <ProductCarousel
          title="Cargo Collection"
          products={cargoCollection}
        />

        <ReviewsSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
