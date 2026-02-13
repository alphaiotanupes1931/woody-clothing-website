interface CategoryBannerProps {
  image: string;
  title: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
}

const CategoryBanner = ({
  image,
  title,
  description,
  ctaText = "SHOP NOW",
  ctaLink = "#",
}: CategoryBannerProps) => {
  return (
    <section className="relative w-full h-[70vh] min-h-[400px] overflow-hidden bg-foreground">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-contain"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
      <div className="absolute bottom-10 left-6 md:left-14 z-10 max-w-lg">
        <h2 className="font-display text-4xl md:text-6xl tracking-wide text-primary-foreground mb-3 leading-[0.9]">
          {title}
        </h2>
        <p className="text-sm text-primary-foreground/75 mb-5 leading-relaxed font-light">
          {description}
        </p>
        <a
          href={ctaLink}
          className="inline-block bg-background text-foreground px-8 py-3 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-background/90 transition-colors"
        >
          {ctaText}
        </a>
      </div>
    </section>
  );
};

export default CategoryBanner;
