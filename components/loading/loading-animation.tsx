"use client";

import { useEffect, useState } from "react";

export function LoadingAnimation() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="relative flex flex-col items-center gap-12">
        {/* Main geometric loader */}
        <div className="relative h-32 w-32">
          {/* Outer rotating square */}
          <div
            className="absolute inset-0 border-2 border-foreground"
            style={{
              animation: "rotate-square 3s cubic-bezier(0.4, 0, 0.2, 1) infinite",
              willChange: "transform",
            }}
          />

          {/* Inner pulsing ring */}
          <div
            className="absolute inset-4 border border-foreground/40"
            style={{
              animation: "pulse-ring 2s ease-in-out infinite",
              willChange: "transform, opacity",
            }}
          />

          {/* Center orbiting dots */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute h-2 w-2 bg-foreground"
                style={{
                  animation: `orbit ${2 + i * 0.5}s linear infinite`,
                  animationDelay: `${i * 0.3}s`,
                  willChange: "transform",
                }}
              />
            ))}
          </div>

          {/* Corner accents */}
          <div className="absolute -left-1 -top-1 h-3 w-3 border-l-2 border-t-2 border-foreground" />
          <div className="absolute -right-1 -top-1 h-3 w-3 border-r-2 border-t-2 border-foreground" />
          <div className="absolute -bottom-1 -left-1 h-3 w-3 border-b-2 border-l-2 border-foreground" />
          <div className="absolute -bottom-1 -right-1 h-3 w-3 border-b-2 border-r-2 border-foreground" />
        </div>

        {/* Progress indicator */}
        <div className="flex flex-col items-center gap-4">
          {/* Progress bar */}
          <div className="relative h-px w-64 overflow-hidden bg-foreground/10">
            <div
              className="absolute left-0 top-0 h-full bg-foreground transition-all duration-300 ease-out"
              style={{
                width: `${progress}%`,
                willChange: "width",
              }}
            />
          </div>

          {/* Progress text */}
          <div
            className="font-mono text-sm tracking-wider text-foreground/60"
            style={{
              animation: "fade-in-up 0.6s ease-out",
            }}
          >
            {progress}%
          </div>
        </div>

        {/* Animated lines */}
        <div className="absolute -left-32 top-1/2 h-px w-24 bg-foreground/20">
          <div
            className="h-full bg-foreground"
            style={{
              animation: "expand-line 2s ease-in-out infinite",
              willChange: "width",
            }}
          />
        </div>
        <div className="absolute -right-32 top-1/2 h-px w-24 bg-foreground/20">
          <div
            className="h-full bg-foreground"
            style={{
              animation: "expand-line 2s ease-in-out infinite",
              animationDelay: "1s",
              willChange: "width",
            }}
          />
        </div>
      </div>

      {/* Grid background effect */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.02]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>
    </div>
  );
}
