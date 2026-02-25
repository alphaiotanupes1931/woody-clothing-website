import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import FadeIn from "@/components/FadeIn";
import TextReveal from "@/components/TextReveal";

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
            Alpha Iota 95th Anniversary Commemorative Collection. Please review all policies carefully before placing your order.
          </p>

          <div className="space-y-12">
            {/* Shipping */}
            <FadeIn>
              <div>
                <h2 className="font-display text-2xl tracking-wide text-foreground mb-4">
                  Shipping (Pre-Order Policy)
                </h2>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed font-semibold">
                  This collection is pre-order only.
                </p>
                <ul className="space-y-3">
                  {[
                    "Orders placed on or before March 14 are expected to arrive no later than April 21, in time for the 95th Anniversary celebration.",
                    "Production will begin after the pre-order window closes.",
                    "Orders will ship within 5–7 business days once production is complete.",
                    "All customers will receive a tracking number via email once their order has shipped.",
                    "Orders placed after March 14 are not guaranteed to arrive prior to the 95th Anniversary, but will still be produced and shipped.",
                  ].map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                      <span className="w-1 h-1 rounded-full bg-foreground mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground mt-4 italic leading-relaxed">
                  We appreciate your patience as we prepare this limited commemorative release.
                </p>
              </div>
            </FadeIn>

            {/* Returns */}
            <FadeIn delay={100}>
              <div>
                <h2 className="font-display text-2xl tracking-wide text-foreground mb-4">
                  Returns, Exchanges & Refunds
                </h2>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Due to the custom and commemorative nature of the Alpha Iota 95th Anniversary Collection:
                </p>
                <ul className="space-y-3">
                  {[
                    "All sales are final.",
                    "No returns.",
                    "No exchanges.",
                    "No refunds.",
                  ].map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed font-semibold">
                      <span className="w-1 h-1 rounded-full bg-foreground mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                  Please review sizing, quantities, and order details carefully before completing your purchase.
                </p>
                <p className="text-xs text-muted-foreground mt-6 border-t border-border pt-4 leading-relaxed">
                  By completing your purchase, you acknowledge and agree to these terms and conditions.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default ShippingReturns;
