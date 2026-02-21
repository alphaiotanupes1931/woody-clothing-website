import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById, allProducts, REGISTRATION_URL } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import SizeGuideModal from "@/components/SizeGuideModal";
import ProductCard from "@/components/ProductCard";
import FadeIn from "@/components/FadeIn";
import { ChevronLeft, Minus, Plus, ExternalLink, ChevronDown } from "lucide-react";
import { toast } from "sonner";

const AccordionItem = ({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-sm font-semibold tracking-[0.1em] uppercase text-foreground hover:text-muted-foreground transition-colors"
      >
        {title}
        <ChevronDown size={16} strokeWidth={1.5} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${open ? "max-h-[500px] opacity-100 pb-5" : "max-h-0 opacity-0"}`}
      >
        {children}
      </div>
    </div>
  );
};


const apparelSizes = ["S", "M", "L", "XL", "2XL", "3XL"];
const hatSizes = ["6 7/8", "7", "7 1/8", "7 1/4", "7 3/8", "7 1/2", "7 5/8"];
const oneSize = ["One Size"];

function getSizesForProduct(product: { category: string; sizeType?: string }): string[] {
  if (product.sizeType === "one-size") return oneSize;
  if (product.sizeType === "fitted-hat") return hatSizes;
  if (product.category === "Headwear") return hatSizes;
  if (product.category === "Accessories") return oneSize;
  return apparelSizes;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : undefined;
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

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

  const images = product.images && product.images.length > 1 ? product.images : [product.image];
  const sizes = getSizesForProduct(product);
  const isSingleSize = sizes.length === 1 && sizes[0] === "One Size";

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id && !p.registrationOnly)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (product.registrationOnly) return;
    if (!isSingleSize && !selectedSize) {
      toast.error("Please select a size");
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: isSingleSize ? undefined : selectedSize,
      });
    }
    toast.success(`${product.name} added to cart`);
    setQuantity(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header solid />
      <SizeGuideModal open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} category={product.category} />

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
          {/* Product Images */}
          <FadeIn>
            <div>
              <div className="relative bg-secondary aspect-[3/4] overflow-hidden">
                {!imageLoaded && (
                  <div className="absolute inset-0 skeleton-shimmer" />
                )}
                <img
                  src={images[activeImageIndex]}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-all duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
              {/* Thumbnail strip */}
              {images.length > 1 && (
                <div className="flex gap-2 mt-3">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => { setActiveImageIndex(i); setImageLoaded(false); }}
                      className={`w-16 h-20 md:w-20 md:h-24 overflow-hidden border-2 transition-all duration-300 ${
                        activeImageIndex === i ? "border-foreground scale-[1.02]" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </FadeIn>

          {/* Product Info */}
          <FadeIn delay={150}>
            <div className="flex flex-col justify-center px-2 md:px-0">
              <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                {product.category}
              </p>
              <h1 className="font-display text-2xl md:text-5xl tracking-tight text-foreground mb-2 md:mb-3">
                {product.name}
              </h1>

              {product.registrationOnly ? (
                /* Registration-only product */
                <div className="space-y-6">
                  <p className="text-sm font-semibold text-foreground uppercase tracking-wider">
                    Registration Exclusive
                  </p>
                  <div className="border border-border p-5 space-y-4">
                    {product.registrationNote?.split("\n\n").map((para, i) => (
                      <p key={i} className="text-sm text-muted-foreground leading-relaxed">{para}</p>
                    ))}
                    <a
                      href={REGISTRATION_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-foreground text-background px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-foreground/90 active:bg-foreground/80 transition-all duration-300 hover:tracking-[0.25em]"
                    >
                      Click Here to Register
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-lg text-foreground mb-6 md:mb-8">{product.price}</p>

                  {/* Size Selector */}
                  {!isSingleSize && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-xs font-semibold tracking-[0.15em] uppercase text-foreground">
                          Size {selectedSize && `: ${selectedSize}`}
                        </p>
                        <button
                          onClick={() => setSizeGuideOpen(true)}
                          className="text-[10px] tracking-wider uppercase text-muted-foreground hover:text-foreground underline transition-colors"
                        >
                          Size Guide
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`min-w-[48px] px-3 py-2.5 text-xs font-medium tracking-wider border transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                              selectedSize === size
                                ? "bg-foreground text-background border-foreground scale-110 shadow-md"
                                : "bg-background text-foreground border-border hover:border-foreground hover:scale-105"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {isSingleSize && (
                    <p className="text-xs text-muted-foreground mb-6 tracking-wider uppercase">One Size</p>
                  )}

                  {/* Quantity Selector */}
                  <div className="mb-6">
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-foreground mb-3">
                      Quantity
                    </p>
                    <div className="inline-flex items-center border border-border">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-3 hover:bg-secondary transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} strokeWidth={1.5} />
                      </button>
                      <span className="px-5 text-sm font-medium min-w-[48px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(Math.min(10, quantity + 1))}
                        className="p-3 hover:bg-secondary transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="btn-fill-sweep w-full bg-foreground text-background px-10 py-4 text-sm md:text-xs font-semibold tracking-[0.2em] uppercase active:scale-[0.98] transition-transform duration-200"
                  >
                    Add to Cart
                  </button>

                  <p className="text-[10px] tracking-wider uppercase text-muted-foreground text-center mt-3">
                    Pre-order · Ships after March 14
                  </p>
                </>
              )}

              {/* Accordion Dropdowns */}
              <div className="mt-8 md:mt-10 border-t border-border">
                <AccordionItem title="Details" defaultOpen>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {product.description || "Premium quality. Designed for those who move with purpose."}
                  </p>
                </AccordionItem>
                <AccordionItem title="Shipping & Returns">
                  <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                    <p className="font-semibold text-foreground">Pre-Order Policy</p>
                    <p>This collection is pre-order only. Orders placed on or before March 14 are expected to arrive no later than April 10.</p>
                    <p>Orders will ship within 5–7 business days once production is complete. All customers will receive a tracking number via email.</p>
                    <p className="font-semibold text-foreground mt-4">Returns & Refunds</p>
                    <p>All sales are final. No returns, no exchanges, no refunds. Please review sizing and order details carefully before purchasing.</p>
                  </div>
                </AccordionItem>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* You May Also Like */}
        {relatedProducts.length > 0 && (
          <FadeIn>
            <section className="mt-16 md:mt-24 px-4 md:px-14">
              <h2 className="font-display text-2xl md:text-3xl tracking-wide uppercase text-foreground mb-6 md:mb-8">
                You May Also Like
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} id={p.id} image={p.image} name={p.name} price={p.price} />
                ))}
              </div>
            </section>
          </FadeIn>
        )}
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default ProductDetail;
