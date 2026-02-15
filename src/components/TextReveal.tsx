import { useEffect, useRef, useState, ReactNode } from "react";

interface TextRevealProps {
  children: ReactNode;
  className?: string;
}

const TextReveal = ({ children, className = "" }: TextRevealProps) => {
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