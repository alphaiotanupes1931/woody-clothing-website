import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef, ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [phase, setPhase] = useState<"visible" | "fading-out" | "fading-in">("visible");
  const prevKey = useRef(location.key);

  useEffect(() => {
    if (location.key !== prevKey.current) {
      prevKey.current = location.key;
      setPhase("fading-out");
    }
  }, [location.key, children]);

  const handleTransitionEnd = () => {
    if (phase === "fading-out") {
      setDisplayChildren(children);
      setPhase("fading-in");
      // Force reflow then transition in
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPhase("visible");
        });
      });
    }
  };

  const style: React.CSSProperties =
    phase === "fading-out"
      ? { opacity: 0, transform: "scale(0.98)", transition: "opacity 250ms ease-out, transform 250ms ease-out" }
      : phase === "fading-in"
      ? { opacity: 0, transform: "scale(1.01)", transition: "none" }
      : { opacity: 1, transform: "scale(1)", transition: "opacity 350ms ease-out, transform 350ms ease-out" };

  return (
    <div style={style} onTransitionEnd={handleTransitionEnd}>
      {displayChildren}
    </div>
  );
};

export default PageTransition;
