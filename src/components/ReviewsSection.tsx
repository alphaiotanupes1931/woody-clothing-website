import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const reviews = [
  {
    name: "Brandon C.",
    title: "Only Will Buy Serenede!",
    text: "Hands down, some of the best looking and very affordable designer pants you can purchase. So many designs and options to choose from. Very modern with excellent quality.",
  },
  {
    name: "Brandon J.",
    title: "Definitely live up to the hype!",
    text: "The quality is good, details, and they fit just right! They're stretch jeans and naturally tight so go a size up. Don't hesitate to buy these jeans.",
  },
  {
    name: "Kevin W.",
    title: "Great Rating",
    text: "Great fit, Great quality, Great delivery time. Overall just a great company that provides high quality products.",
  },
  {
    name: "Henry M.",
    title: "Excellent jeans",
    text: "I have 6 pairs of Serenede jeans and I plan on buying more soon! Fabric is amazing and keeps me fresher than my peers.",
  },
  {
    name: "Jayden C.",
    title: "Best jeans ever",
    text: "Best jeans I ever purchased so I had to buy more. They fit perfect. Good quality nice thick denim also with good stretch.",
  },
  {
    name: "Jessie Y.",
    title: "Perfect jeans",
    text: "I'm a big guy so finding jeans that fit and fit with style is hard. The ankle part of the jeans aren't loose or baggy but also not too tight. Highly recommend.",
  },
];

const ReviewsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = direction === "left" ? -350 : 350;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="py-14 md:py-20">
      <div className="flex items-center justify-between px-5 md:px-10 mb-8">
        <h2 className="text-sm md:text-base font-bold tracking-[0.2em] uppercase text-foreground">
          Customer Reviews
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 border border-border hover:bg-secondary transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 border border-border hover:bg-secondary transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-5 px-5 md:px-10 overflow-x-auto carousel-scroll"
      >
        {reviews.map((review, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[300px] md:w-[360px] border border-border p-6"
          >
            <div className="flex gap-0.5 mb-3">
              {Array(5)
                .fill(null)
                .map((_, j) => (
                  <Star
                    key={j}
                    size={14}
                    className="fill-foreground text-foreground"
                  />
                ))}
            </div>
            <h3 className="text-sm font-bold text-foreground mb-2">
              {review.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              {review.text}
            </p>
            <p className="text-xs font-semibold text-foreground">
              — {review.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
