import { useState } from "react";

interface TechBadgeProps {
  tech: string;
  delay?: number;
  isVisible?: boolean;
  color?: string;
  font?: string;
  fontWeight?: string;
  textColor?: string;
}

export function TechBadge({
  tech,
  delay = 0,
  isVisible = false,
  color = "",
  font = "",
  fontWeight = "",
  textColor = "",
}: TechBadgeProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className={`group relative inline-block transition-all duration-700 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        className={`
          relative inline-flex items-center
          px-5 py-2.5 font-mono text-sm font-bold transition-all duration-300
          border 
          ${color} ${textColor}
          ${font}
          ${fontWeight}
          ${isHovered ? "scale-105 shadow-lg shadow-foreground/10" : ""}
        `}
      >
        {tech}
        <span
          className={`absolute bottom-0 left-0 h-px transition-all duration-300 ${color} ${
            isHovered ? "w-full" : "w-0"
          }`}
        />
      </span>
    </span>
  );
}
