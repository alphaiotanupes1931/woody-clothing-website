import { useEffect, useRef } from "react";
import cursorImg from "@/assets/cursor-yo.webp";

const CustomCursor = () => {
  const imgRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (imgRef.current) {
        imgRef.current.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 4}px)`;
      }
    };

    document.addEventListener("mousemove", handleMove);
    document.body.style.cursor = "none";

    const style = document.createElement("style");
    style.textContent = "a,button,input,textarea,select,[role=button]{cursor:none!important}";
    document.head.appendChild(style);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.body.style.cursor = "";
      style.remove();
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <div
      ref={imgRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{ willChange: "transform" }}
    >
      <img
        src={cursorImg}
        alt=""
        className="w-8 h-auto drop-shadow-md"
        draggable={false}
      />
    </div>
  );
};

export default CustomCursor;
