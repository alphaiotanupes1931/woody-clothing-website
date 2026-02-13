interface HeroSectionProps {
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink?: string;
}

const HeroSection = ({ image, title, subtitle, ctaText, ctaLink = "#" }: HeroSectionProps) => {
  return (
    <section className="relative w-full h-[70vh] min-h-[400px] overflow-hidden bg-[hsl(0,0%,75%)]">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover object-[35%_35%]"
      />
      <div className="absolute inset-0 bg-primary/25" />
      <div className="absolute bottom-14 left-6 md:left-14 z-10">
        <h1 className="font-display text-5xl md:text-8xl tracking-wide text-primary-foreground mb-1 leading-[0.9]">
          {title}
        </h1>
        <p className="text-sm md:text-base text-primary-foreground/80 mb-6 font-light">
          {subtitle}
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

export default HeroSection;
