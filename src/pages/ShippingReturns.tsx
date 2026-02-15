import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import FadeIn from "@/components/FadeIn";
import TextReveal from "@/components/TextReveal";

const sections = [
  {
    title: "Shipping",
    items: [
      "Standard shipping: 5–7 business days (US only).",
      "Expedited shipping: 2–3 business days (available at checkout).",
      "All orders receive a tracking number via email once shipped.",
      "Orders are processed within 1–2 business days.",
    ],
  },
  {
    title: "Returns",
    items: [
      "Items may be returned within 30 days of delivery.",
      "Items must be unworn, unwashed, and in original packaging.",
      "Refunds are processed within 5–7 business days after we receive your return.",
      "Shipping costs are non-refundable.",
    ],
  },
  {
    title: "Exchanges",
    items: [
      "Exchanges are subject to availability.",
      "To request an exchange, contact us with your order number and preferred size/item.",
      "If your exchange item is unavailable, we'll issue a full refund.",
    ],
  },
];

const ShippingReturns = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header solid />

      <main className="pt-24 md:pt-32 pb-20">
        <section className="px-4 md:px-14 max-w-3xl mx-auto">
          <TextReveal>
            <h1 className="font-display text-4xl md:text-6xl tracking-wide text-foreground text-center mb-4">
              SHIPPING & RETURNS
            </h1>
          </TextReveal>
          <p className="text-sm text-muted-foreground text-center mb-12">
            Our policies to make sure you're taken care of.
          </p>

          <div className="space-y-12">
            {sections.map((section, i) => (
              <FadeIn key={section.title} delay={i * 100}>
                <div>
                  <h2 className="font-display text-2xl tracking-wide text-foreground mb-4">
                    {section.title}
                  </h2>
                  <ul className="space-y-3">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                        <span className="w-1 h-1 rounded-full bg-foreground mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default ShippingReturns;
