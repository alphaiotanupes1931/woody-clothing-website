import { useEffect, useRef, useState, ReactNode } from "react";

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  splitWords?: boolean;
}

const TextReveal = ({ children, className = "", splitWords = false }: TextRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // If splitWords and children is a string, split it into word spans
  if (splitWords && typeof children === "string") {
    const words = children.split(" ");
    return (
      <div ref={ref} className={`overflow-hidden flex flex-wrap gap-x-[0.3em] ${className}`}>
        {words.map((word, i) => (
          <span key={i} className="overflow-hidden inline-block">
            <span
              className="inline-block transition-all ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                transform: visible ? "translateY(0)" : "translateY(110%)",
                opacity: visible ? 1 : 0,
                transitionDuration: "800ms",
                transitionDelay: `${i * 60}ms`,
              }}
            >
              {word}
            </span>
          </span>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default TextReveal;
