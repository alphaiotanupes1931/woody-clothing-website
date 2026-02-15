import { useState, useEffect } from "react";
import { X } from "lucide-react";

const NewsletterPopup = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("newsletter-dismissed");
    if (dismissed) return;

    const timer = setTimeout(() => setShow(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShow(false);
    sessionStorage.setItem("newsletter-dismissed", "true");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setSubmitted(true);
    setTimeout(handleClose, 2000);
  };

  if (!show) return null;

  return (
    <>
      <div className="fixed inset-0 z-[110] bg-foreground/50 backdrop-blur-sm" onClick={handleClose} />
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-background border border-border p-8 md:p-12 max-w-md w-full relative pointer-events-auto animate-scale-in">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X size={18} strokeWidth={1.5} />
          </button>

          {submitted ? (
            <div className="text-center py-4">
              <p className="font-display text-2xl text-foreground mb-2">WELCOME IN</p>
              <p className="text-sm text-muted-foreground">Check your inbox for your 10% off code.</p>
            </div>
          ) : (
            <>
              <h3 className="font-display text-3xl md:text-4xl text-foreground mb-2 tracking-wide">
                GET 10% OFF
              </h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Join the AI Nupes community. Be the first to know about new drops, exclusives, and chapter events.
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-foreground transition-colors"
                  maxLength={255}
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-foreground text-background py-3 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-foreground/90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-[10px] text-muted-foreground mt-4 text-center">
                No spam. Unsubscribe anytime.
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NewsletterPopup;