import { useParams, Link } from "react-router-dom";
import { getProductById } from "@/data/products";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronLeft } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : undefined;

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <AnnouncementBar />
        <Header solid />
        <main className="pt-28 md:pt-32 pb-20 px-6 md:px-14 text-center">
          <h1 className="font-display text-4xl text-foreground mb-4">Product Not Found</h1>
          <Link to="/shop" className="text-sm text-muted-foreground underline">
            Back to Shop
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header solid />

      <main className="pt-28 md:pt-32 pb-20">
        <div className="px-6 md:px-14 mb-6">
          <Link
            to="/shop"
            className="inline-flex items-center gap-1 text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft size={14} strokeWidth={1.5} />
            Back to Shop
          </Link>
        </div>

        <div className="px-6 md:px-14 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
          {/* Product Image */}
          <div className="bg-secondary aspect-[3/4] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
              {product.category}
            </p>
            <h1 className="font-display text-3xl md:text-5xl tracking-tight text-foreground mb-3">
              {product.name}
            </h1>
            <p className="text-lg text-foreground mb-8">{product.price}</p>

            <button className="w-full md:w-auto bg-foreground text-background px-10 py-4 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-foreground/90 transition-colors">
              Add to Cart
            </button>

            <div className="mt-10 border-t border-border pt-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Premium quality. Designed for those who move with purpose.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
