import { useRef, useEffect, useState } from "react";

interface JustLandedItem {
  image: string;
  name: string;
  price: string;
  tag?: string;
}

interface JustLandedSectionProps {
  products: JustLandedItem[];
}

const JustLandedSection = ({ products }: JustLandedSectionProps) => {
  return (
    <section className="py-10 md:py-20">
      {/* Section header */}
      <div className="px-6 md:px-14 mb-8 md:mb-14">
        <div className="flex items-center gap-4 mb-2">
          <div className="h-px flex-1 bg-border" />
          <span className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground font-medium">
            Just Landed
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
        <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-center text-foreground tracking-tight">
          NEW ARRIVALS
        </h2>
      </div>

      {/* Parallax cards */}
      <div className="flex flex-col gap-6 md:gap-8 px-4 md:px-10">
        {products.map((product, i) => (
          <ParallaxCard key={i} product={product} index={i} />
        ))}
      </div>
    </section>
  );
};

const ParallaxCard = ({
  product,
  index,
}: {
  product: JustLandedItem;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Progress from 0 (just entering bottom) to 1 (leaving top)
      const progress = 1 - rect.top / windowHeight;
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxY = (1 - scrollProgress) * 30; // image moves slower
  const fadeIn = Math.min(1, scrollProgress * 1.5);

  return (
    <div
      ref={cardRef}
      className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden group cursor-pointer"
      style={{ opacity: fadeIn }}
    >
      {/* Parallax background image */}
      <div
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{ transform: `translateY(${parallaxY}px)` }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors duration-500" />

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
        {/* Tag */}
        {product.tag && (
          <span className="text-[10px] tracking-[0.3em] uppercase text-background/70 font-medium mb-2">
            {product.tag}
          </span>
        )}

        <h3 className="font-display text-3xl md:text-5xl lg:text-6xl text-background tracking-wide leading-none mb-2">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <p className="text-background/80 text-sm md:text-base font-medium">
            {product.price}
          </p>
          <span className="text-[11px] tracking-[0.2em] uppercase text-background/60 font-medium border-b border-background/30 pb-0.5 group-hover:text-background group-hover:border-background/60 transition-colors duration-300">
            Shop Now
          </span>
        </div>
      </div>

      {/* Index number */}
      <div className="absolute top-6 right-6 md:top-10 md:right-12">
        <span className="font-display text-6xl md:text-8xl text-background/10 leading-none">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
};

export default JustLandedSection;
