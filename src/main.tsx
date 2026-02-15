import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import logo from "@/assets/logo.png";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");

  useEffect(() => {
    const enterTimer = setTimeout(() => setPhase("hold"), 600);
    const exitTimer = setTimeout(() => setPhase("exit"), 1800);
    const doneTimer = setTimeout(onComplete, 2400);
    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[200] bg-foreground flex flex-col items-center justify-center transition-opacity duration-600 ${
        phase === "exit" ? "opacity-0" : "opacity-100"
      }`}
    >
      <img
        src={logo}
        alt="AI Nupes"
        className={`h-16 md:h-20 transition-all duration-700 ${
          phase === "enter" ? "opacity-0 scale-90" : "opacity-100 scale-100"
        }`}
      />
      <p
        className={`text-primary-foreground/40 text-[10px] tracking-[0.4em] uppercase mt-4 transition-all duration-500 delay-300 ${
          phase === "enter" ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
        }`}
      >
        Built for Achievers
      </p>
    </div>
  );
};

const Root = () => {
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem("splash-shown");
  });

  const handleComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem("splash-shown", "true");
  };

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleComplete} />}
      <App />
    </>
  );
};

createRoot(document.getElementById("root")!).render(<Root />);