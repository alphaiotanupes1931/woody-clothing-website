import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const reviews = [
  {
    name: "Marcus T.",
    title: "Best fitted hat I own",
    text: "The KRIMSON fitted is unmatched. The K-Diamond patch is clean, the suede finish is premium, and the 'Achievers of the Impossible' stitching on the side is a nice touch. Wore it to probate and got nothing but compliments.",
  },
  {
    name: "Darius W.",
    title: "95th Anniversary tee is fire",
    text: "Copped the KREAM tee as soon as it dropped. The cream colorway with the krimson print is sharp. Fabric is heavyweight and the fit is boxy just how I like it. Already ordered a second one.",
  },
  {
    name: "Anthony L.",
    title: "Quarter-Zip is a must-have",
    text: "The KRIMSON quarter-zip sweater is perfect for chapter events. Looks polished, feels comfortable, and the K-Diamond logo is subtle but hits. Quality is top tier for the price.",
  },
  {
    name: "Jamal R.",
    title: "FlexFit Kap stays on rotation",
    text: "I got both the Kream and Krimson FlexFit kaps. They fit perfectly and the diamond patch pops. Lightweight enough for summer but still structured. These are daily wears for me.",
  },
  {
    name: "Chris B.",
    title: "Polo game elevated",
    text: "The Dry-Fit Polo is exactly what I needed for game days and cookouts. The krimson color is deep and rich, and the K-Diamond embroidery is crisp. Breathable material too.",
  },
  {
    name: "DeShawn P.",
    title: "Socks complete the fit",
    text: "Don't sleep on the KREAM socks. The cream with the K-Diamond logo is subtle flex. Comfortable, good length, and they pair perfectly with the fitted hats. Had to grab multiple pairs.",
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
