import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";

const apparelSizes = ["S", "M", "L", "XL", "2XL"];
const hatSizes = ["6 7/8", "7", "7 1/8", "7 1/4", "7 3/8", "7 1/2", "7 5/8"];
const oneSize = ["One Size"];

function getSizesForCategory(category: string): string[] {
  if (category === "Headwear") return hatSizes;
  if (category === "Accessories") return oneSize;
  return apparelSizes;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : undefined;
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [imageLoaded, setImageLoaded] = useState(false);

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

  const sizes = getSizesForCategory(product.category);
  const isSingleSize = sizes.length === 1 && sizes[0] === "One Size";

  const handleAddToCart = () => {
    if (!isSingleSize && !selectedSize) {
      toast.error("Please select a size");
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header solid />

      <main className="pt-24 md:pt-32 pb-20">
        <div className="px-4 md:px-14 mb-4 md:mb-6">
          <Link
            to="/shop"
            className="inline-flex items-center gap-1 text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft size={14} strokeWidth={1.5} />
            Back to Shop
          </Link>
        </div>

        <div className="px-4 md:px-14 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-14">
          {/* Product Image */}
          <div className="relative bg-secondary aspect-[3/4] overflow-hidden">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-secondary animate-pulse" />
            )}
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
              {product.category}
            </p>
            <h1 className="font-display text-2xl md:text-5xl tracking-tight text-foreground mb-2 md:mb-3">
              {product.name}
            </h1>
            <p className="text-lg text-foreground mb-6 md:mb-8">{product.price}</p>

            {/* Size Selector */}
            {!isSingleSize && (
              <div className="mb-6">
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-foreground mb-3">
                  Size {selectedSize && `— ${selectedSize}`}
                </p>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[48px] px-3 py-2.5 text-xs font-medium tracking-wider border transition-colors ${
                        selectedSize === size
                          ? "bg-foreground text-background border-foreground"
                          : "bg-background text-foreground border-border hover:border-foreground"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleAddToCart}
              className="w-full bg-foreground text-background px-10 py-4 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-foreground/90 transition-colors active:scale-[0.98]"
            >
              Add to Cart
            </button>

            <div className="mt-8 md:mt-10 border-t border-border pt-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {product.description || "Premium quality. Designed for those who move with purpose."}
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