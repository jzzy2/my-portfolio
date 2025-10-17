import { TypingText } from "./animate-ui/primitives/texts/typing";
import { cn } from "@/lib/utils";

interface GradientTypingTextProps {
  text: string;
  duration?: number;
  delay?: number;
  className?: string;
}

export function GradientTypingText({
  text,
  duration = 70,
  delay = 0,
  className,
}: GradientTypingTextProps) {
  return (
    <TypingText
      text={text}
      duration={duration}
      delay={delay}
      className={cn(
        "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500",
        "bg-clip-text text-transparent",
        className
      )}
    />
  );
}
