import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import FadeIn from "@/components/FadeIn";
import TextReveal from "@/components/TextReveal";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header solid />

      <main className="pt-24 md:pt-32 pb-20">
        <section className="px-4 md:px-14 max-w-3xl mx-auto">
          <TextReveal>
            <h1 className="font-display text-4xl md:text-6xl tracking-wide text-foreground text-center mb-4">
              PRIVACY POLICY
            </h1>
          </TextReveal>
          <p className="text-sm text-muted-foreground text-center mb-12">
            Last updated: February 2026
          </p>

          <div className="space-y-10">
            <FadeIn>
              <div>
                <h2 className="font-display text-2xl tracking-wide text-foreground mb-4">
                  Information We Collect
                </h2>
                <ul className="space-y-3">
                  {[
                    "Name, email address, and shipping address when you place an order.",
                    "Payment information is processed securely through Stripe — we never store your card details.",
                    "Browsing data such as pages visited and device information to improve your experience.",
                    "Email address if you subscribe to our newsletter.",
                  ].map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                      <span className="w-1 h-1 rounded-full bg-foreground mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <div>
                <h2 className="font-display text-2xl tracking-wide text-foreground mb-4">
                  How We Use Your Information
                </h2>
                <ul className="space-y-3">
                  {[
                    "To process and fulfill your orders, including shipping notifications and tracking.",
                    "To communicate order updates and respond to support inquiries.",
                    "To send promotional emails if you opt in — you can unsubscribe at any time.",
                    "To improve our website and shopping experience.",
                  ].map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                      <span className="w-1 h-1 rounded-full bg-foreground mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div>
                <h2 className="font-display text-2xl tracking-wide text-foreground mb-4">
                  Third-Party Services
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  We use trusted third-party services to operate our store:
                </p>
                <ul className="space-y-3">
                  {[
                    "Stripe for secure payment processing.",
                    "USPS for shipping and delivery.",
                    "Google Analytics to understand site usage (anonymized data).",
                  ].map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                      <span className="w-1 h-1 rounded-full bg-foreground mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  These services have their own privacy policies governing how they handle your data.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={300}>
              <div>
                <h2 className="font-display text-2xl tracking-wide text-foreground mb-4">
                  Data Security
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We take reasonable measures to protect your personal information. All transactions are encrypted via SSL. We do not sell, trade, or rent your personal information to outside parties.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={400}>
              <div>
                <h2 className="font-display text-2xl tracking-wide text-foreground mb-4">
                  Your Rights
                </h2>
                <ul className="space-y-3">
                  {[
                    "You may request access to the personal data we hold about you.",
                    "You may request deletion of your personal data by contacting us.",
                    "You may opt out of marketing emails at any time.",
                  ].map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                      <span className="w-1 h-1 rounded-full bg-foreground mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={500}>
              <div>
                <h2 className="font-display text-2xl tracking-wide text-foreground mb-4">
                  Contact Us
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  If you have questions about this Privacy Policy, please contact us at{" "}
                  <a href="mailto:ainupes1931@gmail.com" className="underline hover:text-foreground transition-colors">
                    ainupes1931@gmail.com
                  </a>.
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

export default PrivacyPolicy;
