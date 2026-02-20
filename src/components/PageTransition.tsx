import { useLocation } from "react-router-dom";
import { useEffect, useState, ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState<"enter" | "exit">("enter");

  useEffect(() => {
    if (children !== displayChildren) {
      setTransitionStage("exit");
    }
  }, [children, displayChildren]);

  return (
    <div
      className={`transition-all duration-300 ease-out ${
        transitionStage === "enter"
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2"
      }`}
      onTransitionEnd={() => {
        if (transitionStage === "exit") {
          setDisplayChildren(children);
          setTransitionStage("enter");
        }
      }}
    >
      {displayChildren}
    </div>
  );
};

export default PageTransition;
