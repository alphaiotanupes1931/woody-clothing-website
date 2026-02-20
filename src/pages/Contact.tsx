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
          <p className="text-sm text-muted-foreground text-center mb-12">
            Questions, feedback, or just want to connect? Drop us a line or email us at{" "}
            <a href="mailto:ainupes1931@gmail.com" className="underline hover:text-foreground transition-colors">
              ainupes1931@gmail.com
            </a>
          </p>

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
