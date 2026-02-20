import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Plus, Heart } from "lucide-react";

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
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hearted, setHearted] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <Link
      ref={cardRef}
      to={`/product/${productId}`}
      className="group flex-shrink-0 w-[44vw] max-w-[180px] md:w-[260px] md:max-w-none cursor-pointer [.grid_&]:w-full [.grid_&]:max-w-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 && tilt.y === 0 ? "transform 0.5s cubic-bezier(0.16,1,0.3,1)" : "transform 0.1s ease-out",
      }}
    >
      <div className="relative overflow-hidden bg-secondary aspect-[3/4] mb-3">
        {!loaded && (
          <div className="absolute inset-0 skeleton-shimmer" />
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
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setHearted(!hearted);
          }}
          className={`absolute top-3 right-3 p-1.5 rounded-full bg-background/80 backdrop-blur-sm transition-all duration-300 z-10 ${
            hearted ? "text-red-500 scale-110" : "text-foreground/60 hover:text-foreground opacity-0 group-hover:opacity-100"
          }`}
          style={hearted ? { animation: "heartPulse 0.4s ease-out" } : undefined}
          aria-label="Wishlist"
        >
          <Heart size={16} fill={hearted ? "currentColor" : "none"} strokeWidth={1.5} />
        </button>
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
