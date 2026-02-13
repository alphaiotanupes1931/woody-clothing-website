import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductCarousel from "@/components/ProductCarousel";
import CategoryBanner from "@/components/CategoryBanner";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";

import heroLifestyle from "@/assets/hero-crowd.png";
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

const newArrivals = [
  { image: hoodieMerlot, name: "MAISON Merlot Hoodie", price: "$150.00" },
  { image: jeansCaviar, name: '"CAVIAR 7" Jeans', price: "$98.00" },
  { image: tshirtMerlot, name: "SOUVENIR Merlot T-shirt", price: "$120.00" },
  { image: jeansFume, name: '"FUME" Jeans', price: "$98.00" },
  { image: jeansOud, name: '"OUD" Jeans', price: "$98.00" },
  { image: jeansPotala, name: "POTALA PALACE Jeans", price: "$98.00" },
  { image: jeansCosmos, name: "COSMOS Jeans", price: "$138.00" },
  { image: jeansTitan, name: '"TITAN" Jeans', price: "$98.00" },
];

const bestSellers = [
  { image: jeansCaviar, name: "NANODUST Stacked Jeans", price: "$120.00" },
  { image: jeansTitan, name: "ZINC Stacked Jeans", price: "$120.00" },
  { image: jeansCosmos, name: "ONYX Cargo Jeans", price: "$138.00" },
  { image: jeansOud, name: "CORTADO Jeans", price: "$98.00" },
  { image: jeansFume, name: "NETWORTH Jeans", price: "$138.00" },
  { image: jeansPotala, name: "YORU Baggy Jeans", price: "$98.00" },
  { image: tshirtMerlot, name: "KINETIC Black T-Shirt", price: "$88.00" },
  { image: hoodieMerlot, name: "SKYLETTER Fog T-Shirt", price: "$88.00" },
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

        <ProductCarousel title="Explore New Arrivals" products={newArrivals} />

        <ProductCarousel
          title="SERENEDE® Designed for comfort & style"
          products={bestSellers}
        />

        <CategoryBanner
          image={bannerFitted}
          title="FITTED JEANS"
          description="True to size waist. Fitted from the waist to the ankle. Go one size up for a looser, more relaxed fit."
        />

        <ProductCarousel
          title="[ Fitted Denim Collection ]"
          products={fittedCollection}
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
