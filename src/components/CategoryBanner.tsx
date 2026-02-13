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
    <section className="relative w-full h-[70vh] min-h-[400px] overflow-hidden">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/30 to-transparent" />
      <div className="absolute bottom-10 left-6 md:left-12 z-10 max-w-lg">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-3">
          {title}
        </h2>
        <p className="text-sm text-foreground/75 mb-5 leading-relaxed">
          {description}
        </p>
        <a
          href={ctaLink}
          className="inline-block bg-primary text-primary-foreground px-8 py-3 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors"
        >
          {ctaText}
        </a>
      </div>
    </section>
  );
};

export default CategoryBanner;
