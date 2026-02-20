import { useEffect, useRef, useState } from "react";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
}

const ParallaxImage = ({ src, alt, className = "", speed = 0.15 }: ParallaxImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      if (rect.bottom < 0 || rect.top > viewH) return;
      const center = rect.top + rect.height / 2;
      const fromCenter = center - viewH / 2;
      setOffset(fromCenter * speed);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-100 ease-linear will-change-transform"
        style={{ transform: `translateY(${offset}px) scale(1.1)` }}
      />
    </div>
  );
};

export default ParallaxImage;
