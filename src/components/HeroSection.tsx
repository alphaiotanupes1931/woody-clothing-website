interface HeroSectionProps {
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink?: string;
}

const HeroSection = ({ image, title, subtitle, ctaText, ctaLink = "#" }: HeroSectionProps) => {
  return (
    <section className="relative w-full h-[85vh] min-h-[500px] overflow-hidden bg-foreground">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-contain"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
      <div className="absolute bottom-12 left-6 md:left-12 z-10">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-2">
          {title}
        </h1>
        <p className="text-sm md:text-base text-foreground/80 mb-5">
          {subtitle}
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

export default HeroSection;
