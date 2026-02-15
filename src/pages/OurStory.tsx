import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import FadeIn from "@/components/FadeIn";
import TextReveal from "@/components/TextReveal";
import { Link } from "react-router-dom";
import heroCrowd from "@/assets/hero-crowd2.png";
import logo from "@/assets/logo.png";

const values = [
  { title: "God", description: "The spiritual foundation of the organization." },
  { title: "Family", description: "The importance of familial ties and support." },
  { title: "School", description: "A focus on academic pursuits and intellectual growth." },
  { title: "Kappa", description: "The commitment to the brotherhood and objectives of Kappa Alpha Psi." },
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

        {/* Values */}
        <section className="bg-foreground py-16 md:py-24 mb-20 md:mb-28">
          <div className="px-4 md:px-14 max-w-5xl mx-auto">
            <TextReveal>
              <h2 className="font-display text-3xl md:text-5xl tracking-wide text-primary-foreground text-center mb-12 md:mb-16">
                WHAT WE STAND FOR
              </h2>
            </TextReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {values.map((value, i) => (
                <FadeIn key={value.title} delay={i * 100}>
                  <div className="border border-primary-foreground/10 p-6 md:p-8 group hover:border-primary-foreground/30 transition-colors duration-500">
                    <h3 className="font-display text-2xl tracking-wide text-primary-foreground mb-3 group-hover:tracking-wider transition-all duration-500">
                      {value.title}
                    </h3>
                    <p className="text-sm text-primary-foreground/60 leading-relaxed">
                      {value.description}
                    </p>
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