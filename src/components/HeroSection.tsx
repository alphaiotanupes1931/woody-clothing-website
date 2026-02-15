import { Link } from "react-router-dom";
import heroLifestyle from "@/assets/hero-lifestyle.png";
import heroHat from "@/assets/hero-hat-styled.jpg";
import heroMain from "@/assets/hero-main.jpg";

const HeroSection = () => {
  return (
    <section className="relative w-full bg-background">
      {/* Split-screen editorial hero */}
      <div className="h-screen flex flex-col md:flex-row">
        {/* Left: Typography on solid bg */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-foreground flex flex-col justify-end p-8 md:p-14 lg:p-20">
          <h1 className="font-display text-[15vw] md:text-[8vw] lg:text-[7vw] leading-[0.85] tracking-wide text-primary-foreground">
            NEW
            <br />
            ARRIVALS
          </h1>
          <p className="text-primary-foreground/50 text-xs tracking-[0.3em] uppercase mt-4 mb-6 font-light">
            Spring 2026 Collection
          </p>
          <Link
            to="/shop"
            className="inline-block w-fit border border-primary-foreground/40 text-primary-foreground px-8 py-3 text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-primary-foreground hover:text-foreground transition-colors"
          >
            SHOP NOW
          </Link>
        </div>

        {/* Right: Lifestyle image */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
          <img
            src={heroLifestyle}
            alt="New Arrivals"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
