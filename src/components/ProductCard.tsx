interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  soldOut?: boolean;
}

const ProductCard = ({ image, name, price, soldOut = false }: ProductCardProps) => {
  return (
    <a
      href="#"
      className="group flex-shrink-0 w-[200px] md:w-[260px] cursor-pointer"
    >
      <div className="relative overflow-hidden bg-secondary aspect-[3/4] mb-3">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover product-image-hover"
        />
        {soldOut && (
          <div className="absolute top-3 left-3 bg-background text-foreground text-[10px] font-bold tracking-wider uppercase px-3 py-1">
            Sold Out
          </div>
        )}
      </div>
      <h3 className="text-xs font-semibold tracking-wide uppercase text-foreground truncate">
        {name}
      </h3>
      <p className="text-xs text-muted-foreground mt-0.5">{price}</p>
    </a>
  );
};

export default ProductCard;
