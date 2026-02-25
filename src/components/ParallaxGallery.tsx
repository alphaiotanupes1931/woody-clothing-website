import FadeIn from "./FadeIn";

import lifestyleAchievers from "@/assets/lifestyle/lifestyle-achievers.jpg";
import lifestyleQuarterzip from "@/assets/lifestyle/lifestyle-quarterzip.jpg";
import lifestyleKdiamondFront1 from "@/assets/lifestyle/lifestyle-kdiamond-front-1.jpg";
import lifestyle95thBack from "@/assets/lifestyle/lifestyle-95th-back.jpg";
import lifestyleKdiamondFront3 from "@/assets/lifestyle/lifestyle-kdiamond-front-3.jpg";

const images = [
  { src: lifestyleKdiamondFront1, alt: "K-Diamond lifestyle", speed: -30 },
  { src: lifestyleQuarterzip, alt: "Quarter-Zip lifestyle", speed: 20 },
  { src: lifestyleKdiamondFront3, alt: "K-Diamond front", speed: -15 },
  { src: lifestyleAchievers, alt: "Achievers lifestyle", speed: 25 },
  { src: lifestyle95thBack, alt: "95th Anniversary", speed: -20 },
];

const ParallaxGallery = () => {
  return (
    <FadeIn>
      <section className="py-12 md:py-20 overflow-hidden">
        <div className="px-4 md:px-14 mb-6">
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-1">
            The AI Collection
          </p>
          <h2 className="font-display text-2xl md:text-3xl tracking-wide uppercase text-foreground">
            IN THE WILD
          </h2>
        </div>

        <div className="flex gap-3 md:gap-4 px-4 md:px-14 overflow-x-auto carousel-scroll pb-4">
          {images.map((img, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="flex-shrink-0 w-[65vw] md:w-[320px] aspect-[3/4] overflow-hidden bg-secondary group">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </FadeIn>
  );
};

export default ParallaxGallery;
