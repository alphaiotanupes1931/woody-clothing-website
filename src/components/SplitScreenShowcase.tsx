import { useState } from "react";

interface SplitScreenProduct {
  image: string;
  name: string;
  price: string;
  tag?: string;
}

interface SplitScreenShowcaseProps {
  products: SplitScreenProduct[];
}

const SplitScreenShowcase = ({ products }: SplitScreenShowcaseProps) => {
  const [featured, setFeatured] = useState(0);

  if (products.length === 0) return null;

  const featuredProduct = products[featured];
  const remaining = products.filter((_, i) => i !== featured);

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

      {/* Split screen layout */}
      <div className="flex flex-col md:flex-row gap-0 md:gap-0 px-4 md:px-10 h-auto md:h-[75vh]">
        {/* Left: Featured large image */}
        <div className="relative w-full md:w-[55%] h-[50vh] md:h-full overflow-hidden group cursor-pointer">
          <img
            src={featuredProduct.image}
            alt={featuredProduct.name}
            className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            {featuredProduct.tag && (
              <span className="inline-block text-[10px] tracking-[0.3em] uppercase text-background/70 font-medium mb-3 border border-background/30 px-3 py-1">
                {featuredProduct.tag}
              </span>
            )}
            <h3 className="font-display text-3xl md:text-5xl text-background tracking-wide leading-none mb-2">
              {featuredProduct.name}
            </h3>
            <p className="text-background/80 text-sm md:text-base font-medium">
              {featuredProduct.price}
            </p>
          </div>
        </div>

        {/* Right: Scrolling product feed */}
        <div className="w-full md:w-[45%] md:overflow-y-auto carousel-scroll bg-secondary/30">
          <div className="grid grid-cols-2 gap-px bg-border">
            {remaining.map((product, i) => {
              const originalIndex = products.indexOf(product);
              return (
                <div
                  key={i}
                  className="relative bg-background cursor-pointer group overflow-hidden"
                  onMouseEnter={() => setFeatured(originalIndex)}
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3 md:p-4">
                    <h4 className="text-[12px] md:text-[13px] font-medium text-foreground truncate">
                      {product.name}
                    </h4>
                    <p className="text-[12px] text-muted-foreground mt-0.5">
                      {product.price}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SplitScreenShowcase;
