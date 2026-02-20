import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

interface ProductCardProps {
  id?: string;
  image: string;
  name: string;
  price: string;
  soldOut?: boolean;
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const ProductCard = ({ id, image, name, price, soldOut = false }: ProductCardProps) => {
  const productId = id || slugify(name);
  const [loaded, setLoaded] = useState(false);

  return (
    <Link
      to={`/product/${productId}`}
      className="group flex-shrink-0 w-[44vw] max-w-[180px] md:w-[260px] md:max-w-none cursor-pointer [.grid_&]:w-full [.grid_&]:max-w-none"
    >
      <div className="relative overflow-hidden bg-secondary aspect-[3/4] mb-3">
        {!loaded && (
          <div className="absolute inset-0 bg-secondary animate-pulse" />
        )}
        <img
          src={image}
          alt={name}
          loading="lazy"
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setLoaded(true)}
        />
        {soldOut && (
          <div className="absolute top-3 left-3 bg-foreground text-background text-[10px] font-bold tracking-wider uppercase px-3 py-1">
            Sold Out
          </div>
        )}
        {/* Quick view indicator */}
        {!soldOut && (
          <div className="absolute bottom-0 left-0 right-0 bg-foreground/90 text-background py-2.5 text-center text-[10px] font-semibold tracking-[0.2em] uppercase translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-1.5">
            <Plus size={12} strokeWidth={2} />
            Quick View
          </div>
        )}
      </div>
      <h3 className="text-[11px] md:text-[13px] font-medium text-foreground line-clamp-2 leading-snug group-hover:text-muted-foreground transition-colors duration-300 mt-2">
        {name}
      </h3>
      <p className="text-[11px] md:text-[13px] text-muted-foreground mt-0.5">{price}</p>
    </Link>
  );
};

export default ProductCard;