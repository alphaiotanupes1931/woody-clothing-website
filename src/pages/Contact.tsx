import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import FadeIn from "@/components/FadeIn";
import TextReveal from "@/components/TextReveal";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent", description: "We'll get back to you within 24–48 hours." });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header solid />

      <main className="pt-24 md:pt-32 pb-20">
        <section className="px-4 md:px-14 max-w-2xl mx-auto">
          <TextReveal>
            <h1 className="font-display text-4xl md:text-6xl tracking-wide text-foreground text-center mb-4">
              CONTACT US
            </h1>
          </TextReveal>
          <p className="text-sm text-muted-foreground text-center mb-12 leading-relaxed max-w-lg mx-auto">
            Whether you're a brother looking for custom chapter orders, an alumnus wanting to rep AI, 
            or a supporter with questions about our products, we're here to help. Reach out and our team 
            will get back to you within 24-48 hours.
          </p>

          {/* How We Can Help */}
          <FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
              <div className="text-center p-5 border border-border">
                <p className="font-display text-sm tracking-[0.15em] text-foreground mb-2">ORDERS & SIZING</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Questions about sizing, pre-orders, shipping timelines, or your existing order? We've got you.
                </p>
              </div>
              <div className="text-center p-5 border border-border">
                <p className="font-display text-sm tracking-[0.15em] text-foreground mb-2">CUSTOM & BULK</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Interested in custom chapter apparel or bulk orders for events and celebrations? Let's talk.
                </p>
              </div>
              <div className="text-center p-5 border border-border">
                <p className="font-display text-sm tracking-[0.15em] text-foreground mb-2">PARTNERSHIPS</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Brand collaborations, sponsorship inquiries, or media requests? We're open to connecting.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="mb-10 text-center">
              <p className="text-xs text-muted-foreground">
                You can also email us directly at{" "}
                <a href="mailto:ainupes1931@gmail.com" className="underline hover:text-foreground transition-colors">
                  ainupes1931@gmail.com
                </a>
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-foreground mb-2">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-border bg-background text-foreground text-sm px-4 py-3 focus:outline-none focus:border-foreground transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-border bg-background text-foreground text-sm px-4 py-3 focus:outline-none focus:border-foreground transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-foreground mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border border-border bg-background text-foreground text-sm px-4 py-3 focus:outline-none focus:border-foreground transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-foreground text-background px-10 py-4 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-foreground/90 transition-all duration-300 hover:tracking-[0.3em]"
              >
                Send Message
              </button>
            </form>
          </FadeIn>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default Contact;
