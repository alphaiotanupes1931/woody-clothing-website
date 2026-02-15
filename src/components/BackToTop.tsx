import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

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
      className="fixed bottom-6 right-6 z-40 bg-foreground text-background p-3 shadow-lg hover:bg-foreground/90 transition-all animate-fade-in"
      aria-label="Back to top"
    >
      <ChevronUp size={18} strokeWidth={2} />
    </button>
  );
};

export default BackToTop;