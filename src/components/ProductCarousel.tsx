import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import TextReveal from "./TextReveal";

interface Product {
  image: string;
  name: string;
  price: string;
  soldOut?: boolean;
}

interface ProductCarouselProps {
  title: string;
  products: Product[];
}

const ProductCarousel = ({ title, products }: ProductCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="py-6 md:py-14">
      <div className="flex items-center justify-between px-4 md:px-14 mb-4 md:mb-6">
        <TextReveal splitWords className="font-display text-2xl md:text-3xl tracking-wide uppercase text-foreground">
          {title}
        </TextReveal>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 hover:bg-secondary transition-colors rounded-full"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 hover:bg-secondary transition-colors rounded-full"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-2.5 md:gap-4 px-4 md:px-14 overflow-x-auto carousel-scroll snap-x snap-mandatory"
      >
        {products.map((product, i) => (
          <ProductCard key={i} {...product} />
        ))}
      </div>
    </section>
  );
};

export default ProductCarousel;