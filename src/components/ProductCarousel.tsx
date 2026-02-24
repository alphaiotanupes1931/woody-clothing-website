import { useRef } from "react";
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

  return (
    <section className="py-6 md:py-14">
      <div className="flex items-center justify-between px-4 md:px-14 mb-4 md:mb-6">
        <TextReveal splitWords className="font-display text-2xl md:text-3xl tracking-wide uppercase text-foreground">
          {title}
        </TextReveal>
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
