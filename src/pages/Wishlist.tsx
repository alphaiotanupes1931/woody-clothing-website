import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import ProductCard from "@/components/ProductCard";
import FadeIn from "@/components/FadeIn";
import { useWishlist } from "@/contexts/WishlistContext";
import { getProductById } from "@/data/products";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlist } = useWishlist();
  const products = wishlist
    .map((id) => getProductById(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getProductById>>[];

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header solid />

      <main className="pt-28 md:pt-32 pb-20">
        <FadeIn>
          <div className="px-4 md:px-14 mb-6 md:mb-8">
            <h1 className="font-display text-3xl md:text-6xl tracking-tight text-foreground">
              YOUR WISHLIST
            </h1>
            <p className="text-muted-foreground text-sm mt-2">
              {products.length} item{products.length !== 1 ? "s" : ""} saved
            </p>
          </div>
        </FadeIn>

        {products.length === 0 ? (
          <FadeIn>
            <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
              <Heart size={48} strokeWidth={1} className="text-muted-foreground/40 mb-4" />
              <p className="text-sm text-muted-foreground mb-6">
                You haven't saved anything yet. Tap the heart on any product to add it here.
              </p>
              <Link
                to="/shop"
                className="bg-foreground text-background px-8 py-3 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-foreground/90 transition-colors"
              >
                Browse Shop
              </Link>
            </div>
          </FadeIn>
        ) : (
          <div className="px-4 md:px-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6 md:gap-x-4 md:gap-y-8 stagger-children">
            {products.map((product, i) => (
              <FadeIn key={product.id} delay={i * 50}>
                <ProductCard
                  id={product.id}
                  image={product.image}
                  name={product.name}
                  price={product.registrationOnly ? "Registration Only" : product.price}
                />
              </FadeIn>
            ))}
          </div>
        )}
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default Wishlist;
