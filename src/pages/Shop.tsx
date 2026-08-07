import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import ProductCard from "@/components/ProductCard";
import FadeIn from "@/components/FadeIn";
import { allProducts } from "@/data/products";

const Shop = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header solid />

      <main className="pt-28 md:pt-32 pb-20">
        <FadeIn>
          <div className="px-4 md:px-14 mb-6 md:mb-8">
            <h1 className="font-display text-3xl md:text-6xl tracking-tight text-foreground">
              SHOP
            </h1>
            <p className="text-muted-foreground text-sm mt-2">
              {allProducts.length} product{allProducts.length !== 1 ? "s" : ""}
            </p>
          </div>
        </FadeIn>

        <div className="px-4 md:px-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6 md:gap-x-4 md:gap-y-8 stagger-children">
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
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default Shop;
