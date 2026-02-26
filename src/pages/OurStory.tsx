import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import FadeIn from "@/components/FadeIn";
import TextReveal from "@/components/TextReveal";
import { Link } from "react-router-dom";
import heroCrowd from "@/assets/hero-crowd2.png";
import logo from "@/assets/logo.png";

const pillars = [
  { number: "01", title: "LEGACY", text: "95 years of excellence. Every stitch carries the weight of those who came before us.", width: "100%" },
  { number: "02", title: "BROTHERHOOD", text: "Built by brothers, worn by achievers. This isn't merch, it's identity.", width: "85%" },
  { number: "03", title: "CRAFT", text: "Premium materials, intentional design. No shortcuts, no compromises.", width: "70%" },
  { number: "04", title: "PURPOSE", text: "Achievers of the Impossible. We don't just wear it, we live it.", width: "55%" },
];

const OurStory = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header solid />

      <main className="pt-24 md:pt-32 pb-20">
        {/* Hero */}
        <section className="relative h-[50vh] md:h-[60vh] overflow-hidden bg-foreground mb-16 md:mb-24">
          <img
            src={heroCrowd}
            alt="Alpha Iota Chapter"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <h1 className="font-display text-5xl md:text-8xl tracking-wide text-primary-foreground opacity-0 animate-[fadeSlideUp_0.8s_ease-out_0.2s_forwards]">
              OUR STORY
            </h1>
            <p className="text-primary-foreground/60 text-sm tracking-[0.3em] uppercase mt-3 opacity-0 animate-[fadeSlideUp_0.6s_ease-out_0.5s_forwards]">
              95 Years of Achievers
            </p>
          </div>
        </section>

        {/* Intro */}
        <FadeIn>
          <section className="px-4 md:px-14 max-w-3xl mx-auto text-center mb-20 md:mb-28">
            <img src={logo} alt="AI Nupes" className="h-12 mx-auto mb-6 opacity-30" />
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Alpha Iota isn't just a chapter, it's a brotherhood. For 95 years, we've shaped leaders, 
              built community, and pushed the standard of what it means to achieve. This is our story: 
              the journey of brothers who refused to settle, from 1931 to today.
            </p>
          </section>
        </FadeIn>

        {/* What We Stand For — Pyramid Hierarchy */}
        <section className="bg-foreground text-primary-foreground py-16 md:py-28 px-4 md:px-14 overflow-hidden mb-20 md:mb-28">
          <div className="max-w-5xl mx-auto">
            <div className="mb-14 md:mb-20">
              <p className="text-[10px] tracking-[0.3em] uppercase text-primary-foreground/40 mb-2">
                The AI Collection
              </p>
              <h2 className="font-display text-4xl md:text-8xl tracking-tight text-primary-foreground leading-[0.85]">
                WHAT WE
                <br />
                STAND FOR
              </h2>
            </div>

            <div className="flex flex-col items-start gap-6 md:gap-8">
              {pillars.map((pillar, i) => (
                <FadeIn key={i} delay={i * 180}>
                  <div
                    className="pt-0 pb-0 group"
                    style={{ width: "100%", maxWidth: pillar.width === "100%" ? "100%" : pillar.width }}
                  >
                    <div className="flex items-baseline gap-4 md:gap-6">
                      <span className="font-display text-5xl md:text-8xl text-primary-foreground/10 leading-none group-hover:text-[hsl(var(--krimson))] transition-colors duration-500">
                        {pillar.number}
                      </span>
                      <div>
                        <h3 className="font-display text-xl md:text-3xl tracking-[0.15em] text-primary-foreground mb-2">
                          {pillar.title}
                        </h3>
                        <p className="text-xs md:text-sm text-primary-foreground/50 leading-relaxed max-w-md">
                          {pillar.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <FadeIn>
          <section className="px-4 md:px-14 max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-5xl tracking-wide text-foreground mb-4">
              BUILT FOR ACHIEVERS
            </h2>
            <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
              Every piece in the AI Nupes collection is designed to honor the years of legacy. 
              Wear the tradition. Represent the standard.
            </p>
            <Link
              to="/shop"
              className="inline-block bg-foreground text-background px-10 py-4 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-foreground/90 transition-all duration-300 hover:tracking-[0.3em]"
            >
              Shop the Collection
            </Link>
          </section>
        </FadeIn>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default OurStory;
