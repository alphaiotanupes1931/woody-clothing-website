import { useState, useEffect } from "react";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 bg-foreground text-background w-10 h-10 flex items-center justify-center shadow-lg hover:bg-foreground/90 transition-all animate-fade-in text-xs font-semibold tracking-wider"
      aria-label="Back to top"
    >
      ↑
    </button>
  );
};

export default BackToTop;
