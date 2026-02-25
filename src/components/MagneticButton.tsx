import { useRef, useCallback, MouseEvent, ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  as?: "button" | "a";
  strength?: number;
  [key: string]: any;
}

const MagneticButton = ({ children, className = "", as = "button", strength = 0.3, ...props }: MagneticButtonProps) => {
  const ref = useRef<HTMLElement>(null);

  const handleMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  }, [strength]);

  const handleLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0, 0)";
  }, []);

  const Tag = as as any;

  return (
    <Tag
      ref={ref}
      className={`transition-transform duration-300 ease-out ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default MagneticButton;
