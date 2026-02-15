import { useState } from "react";
import { Link } from "react-router-dom";

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
      className="group flex-shrink-0 w-[160px] md:w-[260px] cursor-pointer [.grid_&]:w-full"
    >
      <div className="relative overflow-hidden bg-secondary aspect-[3/4] mb-3">
        {!loaded && (
          <div className="absolute inset-0 bg-secondary animate-pulse" />
        )}
        <img
          src={image}
          alt={name}
          loading="lazy"
          className={`w-full h-full object-cover product-image-hover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setLoaded(true)}
        />
        {soldOut && (
          <div className="absolute top-3 left-3 bg-foreground text-background text-[10px] font-bold tracking-wider uppercase px-3 py-1">
            Sold Out
          </div>
        )}
      </div>
      <h3 className="text-[12px] md:text-[13px] font-medium text-foreground truncate">
        {name}
      </h3>
      <p className="text-[12px] md:text-[13px] text-muted-foreground mt-0.5">{price}</p>
    </Link>
  );
};

export default ProductCard;