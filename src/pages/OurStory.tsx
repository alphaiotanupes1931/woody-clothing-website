import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import FadeIn from "@/components/FadeIn";
import TextReveal from "@/components/TextReveal";
import { Link } from "react-router-dom";

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
        {/* Page Title */}
        <section className="text-center mb-16 md:mb-24 px-4">
          <h1 className="font-display text-5xl md:text-8xl tracking-wide text-foreground mb-3">
            OUR STORY
          </h1>
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase">
            95 Years of Achievers
          </p>
        </section>

        {/* Intro */}
        <FadeIn>
          <section className="px-4 md:px-14 max-w-3xl mx-auto text-center mb-20 md:mb-28">
            <img src={logo} alt="AI Nupes" className="h-12 mx-auto mb-6 opacity-30" />
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              Alpha Iota isn't just a chapter, it's a brotherhood. For 95 years, we've shaped leaders, 
              built community, and pushed the standard of what it means to achieve. This is our story: 
              the journey of brothers who refused to settle, from 1931 to today.
            </p>
          </section>
        </FadeIn>

        {/* Who We Are — Brand Story */}
        <FadeIn>
          <section className="px-4 md:px-14 max-w-4xl mx-auto mb-20 md:mb-28">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">Who We Are</p>
                <h2 className="font-display text-3xl md:text-5xl tracking-tight text-foreground leading-[0.9] mb-5">
                  MORE THAN
                  <br />
                  A CLOTHING LINE
                </h2>
              </div>
              <div className="space-y-5">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The AI Collection is the official lifestyle brand of the Alpha Iota chapter of Kappa Alpha Psi Fraternity, Inc. 
                  at Morgan State University. Founded in 1931, our chapter has produced generations of leaders, innovators, 
                  and community builders who carry the motto "Achievement in Every Field of Human Endeavor."
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We created this brand to give our brothers, supporters, and community a way to wear that legacy with pride. 
                  Every piece we design reflects our values: excellence, brotherhood, and service. When you wear AI, you're not 
                  just wearing a logo. You're representing a 95-year tradition of Black excellence at one of the nation's 
                  most storied HBCUs.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  From campus to culture, The AI Collection bridges generations. Our pieces are designed for the boardroom, 
                  the yard, the cookout, and everywhere in between. We believe that how you present yourself matters, and 
                  our clothing is built to reflect the standard we've upheld for nearly a century.
                </p>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Our Mission */}
        <FadeIn>
          <section className="bg-secondary/30 py-16 md:py-24 px-4 md:px-14 mb-20 md:mb-28">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">Our Mission</p>
              <h2 className="font-display text-3xl md:text-5xl tracking-tight text-foreground mb-6 leading-[0.9]">
                CELEBRATING ACHIEVEMENT,
                <br />
                ONE PIECE AT A TIME
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
                Our mission is to honor the legacy of Alpha Iota through premium, intentionally designed apparel 
                that represents who we are and where we come from. We aim to strengthen the bond between current 
                brothers, alumni, and supporters while funding chapter initiatives that uplift the Morgan State community.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center max-w-2xl mx-auto">
                <div>
                  <p className="font-display text-4xl md:text-5xl text-foreground mb-1">95</p>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Years of Legacy</p>
                </div>
                <div>
                  <p className="font-display text-4xl md:text-5xl text-foreground mb-1">1931</p>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Founded at Morgan State</p>
                </div>
                <div>
                  <p className="font-display text-4xl md:text-5xl text-foreground mb-1">∞</p>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Brothers for Life</p>
                </div>
              </div>
            </div>
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
