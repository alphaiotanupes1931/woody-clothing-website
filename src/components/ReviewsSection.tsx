import { useRef } from "react";
import FadeIn from "./FadeIn";

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

  return (
    <section className="py-14 md:py-20">
      <div className="px-5 md:px-10 mb-8">
        <h2 className="text-sm md:text-base font-bold tracking-[0.2em] uppercase text-foreground">
          Customer Reviews
        </h2>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-5 px-5 md:px-10 overflow-x-auto carousel-scroll"
      >
        {reviews.map((review, i) => (
          <FadeIn key={i} delay={i * 100}>
            <div className="flex-shrink-0 w-[80vw] max-w-[300px] md:w-[360px] md:max-w-none border border-border p-5 md:p-6 snap-start">
              <div className="flex gap-1 mb-3 text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-semibold">
                ★★★★★
              </div>
              <h3 className="text-sm font-bold text-foreground mb-2">
                {review.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                {review.text}
              </p>
              <p className="text-xs font-semibold text-foreground">
                – {review.name}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
