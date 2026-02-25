import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const glowPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    let raf: number;
    const animate = () => {
      glowPos.current.x += (pos.current.x - glowPos.current.x) * 0.15;
      glowPos.current.y += (pos.current.y - glowPos.current.y) * 0.15;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glowPos.current.x - 16}px, ${glowPos.current.y - 16}px)`;
      }
      raf = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMove);
    raf = requestAnimationFrame(animate);
    document.body.style.cursor = "none";

    // Add cursor:none to all interactive elements
    const style = document.createElement("style");
    style.textContent = "a,button,input,textarea,select,[role=button]{cursor:none!important}";
    document.head.appendChild(style);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
      document.body.style.cursor = "";
      style.remove();
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-2 h-2 rounded-full bg-[hsl(var(--krimson))] mix-blend-difference"
        style={{ willChange: "transform" }}
      />
      <div
        ref={glowRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none w-8 h-8 rounded-full border border-[hsl(var(--krimson))/0.5] mix-blend-difference"
        style={{ willChange: "transform", transition: "width 0.2s, height 0.2s" }}
      />
    </>
  );
};

export default CustomCursor;
