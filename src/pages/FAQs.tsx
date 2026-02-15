import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import FadeIn from "@/components/FadeIn";
import TextReveal from "@/components/TextReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is AI Nupes?",
    answer:
      "AI Nupes is the official lifestyle and apparel brand of the Alpha Iota chapter of Kappa Alpha Psi Fraternity, Inc. Every piece honors 95 years of brotherhood, achievement, and legacy.",
  },
  {
    question: "How do I find my size?",
    answer:
      "Each product page includes a Size Guide button with detailed measurements. We recommend measuring a garment you already own and comparing. When in doubt, size up for a relaxed fit.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping takes 5–7 business days within the US. Expedited options are available at checkout. You'll receive a tracking number once your order ships.",
  },
  {
    question: "Can I return or exchange an item?",
    answer:
      "Yes — unworn items in original packaging can be returned within 30 days of delivery. Exchanges are subject to availability. See our Shipping & Returns page for full details.",
  },
  {
    question: "Are these items officially licensed?",
    answer:
      "All AI Nupes products are designed by and for members of the Alpha Iota chapter. They are chapter merchandise, not nationally licensed goods.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Currently we only ship within the United States. International shipping may be available in the future.",
  },
  {
    question: "How can I contact support?",
    answer:
      "Visit our Contact page or email us directly. We typically respond within 24–48 hours.",
  },
];

const FAQs = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header solid />

      <main className="pt-24 md:pt-32 pb-20">
        <section className="px-4 md:px-14 max-w-3xl mx-auto">
          <TextReveal>
            <h1 className="font-display text-4xl md:text-6xl tracking-wide text-foreground text-center mb-4">
              FAQs
            </h1>
          </TextReveal>
          <p className="text-sm text-muted-foreground text-center mb-12">
            Everything you need to know about AI Nupes.
          </p>

          <FadeIn>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-border">
                  <AccordionTrigger className="text-sm font-semibold tracking-wide text-foreground hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default FAQs;
