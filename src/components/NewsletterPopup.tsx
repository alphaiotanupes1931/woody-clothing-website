import { useState, useEffect } from "react";
import { X } from "lucide-react";

const NewsletterPopup = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("newsletter-dismissed");
    if (dismissed) return;

    const timer = setTimeout(() => setShow(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setShow(false);
      setClosing(false);
      sessionStorage.setItem("newsletter-dismissed", "true");
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setSubmitted(true);
    setTimeout(handleClose, 2500);
  };

  if (!show) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-[110] bg-foreground/50 backdrop-blur-sm transition-opacity duration-300 ${closing ? "opacity-0" : "opacity-100 animate-fade-in"}`}
        onClick={handleClose}
      />
      <div className="fixed inset-0 z-[110] flex items-end md:items-center justify-center p-0 md:p-4 pointer-events-none">
        <div
          className={`bg-background border border-border p-6 md:p-12 max-w-md w-full relative pointer-events-auto rounded-t-xl md:rounded-none transition-all duration-300 ${
            closing
              ? "opacity-0 translate-y-4 scale-95"
              : "animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)] md:animate-[popIn_0.4s_cubic-bezier(0.16,1,0.3,1)]"
          }`}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors hover:rotate-90 duration-300"
            aria-label="Close"
          >
            <X size={18} strokeWidth={1.5} />
          </button>

          {submitted ? (
            <div className="text-center py-4 animate-fade-in">
              <p className="font-display text-2xl text-foreground mb-2">YOU'RE IN</p>
              <p className="text-sm text-muted-foreground">Welcome to the community. Stay tuned for updates.</p>
            </div>
          ) : (
            <>
              <h3 className="font-display text-3xl md:text-4xl text-foreground mb-2 tracking-wide">
                STAY IN THE LOOP
              </h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Subscribe to the AI Nupes newsletter for early access to new drops, exclusive deals, and chapter updates.
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-foreground transition-all duration-300 focus:shadow-[0_0_0_1px_hsl(var(--foreground)/0.1)]"
                  maxLength={255}
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-foreground text-background py-3 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-foreground/90 transition-all duration-200 active:scale-[0.98]"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-[10px] text-muted-foreground mt-4 text-center">
                No spam, ever. Unsubscribe anytime.
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NewsletterPopup;
