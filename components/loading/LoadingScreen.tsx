"use client";
/**
 * LoadingScreen Component
 *
 * A production-ready, highly optimized loading screen for Next.js applications.
 *
 * Performance optimizations:
 * - Pure CSS animations using transform and opacity (GPU-accelerated)
 * - SVG-based graphics (resolution-independent, small bundle size)
 * - will-change hints for optimal rendering
 * - No layout-triggering properties (width, height, top, left)
 * - Respects prefers-reduced-motion for accessibility
 *
 * Accessibility features:
 * - ARIA live region for screen reader announcements
 * - role="status" for loading state
 * - Reduced motion fallback
 * - High contrast support
 *
 * Bundle size: ~8KB minified (excluding React/Next.js)
 */

import { useEffect, useState } from "react";

interface LoadingScreenProps {
  /** Controls visibility of the loading screen */
  visible: boolean;
  /** Theme variant - adapts colors for light/dark modes */
  theme?: "light" | "dark";
  /** Size variant for different use cases */
  size?: "sm" | "md" | "lg";
  /** Duration of exit animation in milliseconds */
  duration?: number;
  /** Callback fired when exit animation completes */
  onExited?: () => void;
}

export function LoadingScreen({
  visible,
  theme = "dark",
  size = "md",
  duration = 600,
  onExited,
}: LoadingScreenProps) {
  const [shouldRender, setShouldRender] = useState(visible);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      setIsExiting(false);
    } else if (shouldRender) {
      setIsExiting(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        onExited?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, shouldRender, duration, onExited]);

  if (!shouldRender) return null;

  // Size configurations
  const sizeConfig = {
    sm: { container: 120, stroke: 1.5, dots: 4 },
    md: { container: 160, stroke: 2, dots: 6 },
    lg: { container: 200, stroke: 2.5, dots: 8 },
  };

  const config = sizeConfig[size];

  return (
    <div
      className={`loading-screen-container ${isExiting ? "loading-screen-exit" : ""} ${
        theme === "light" ? "loading-screen-light" : "loading-screen-dark"
      }`}
      role="status"
      aria-live="polite"
      aria-label="Loading content"
    >
      {/* Screen reader only text */}
      <span className="sr-only">Loading, please wait...</span>

      {/* Main animation container */}
      <div
        className="loading-screen-content"
        style={{ width: config.container, height: config.container }}
      >
        {/* Layer 1: Morphing outer ring with rotation */}
        <svg
          className="loading-svg loading-layer-1"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            className="loading-morph-path"
            d="M50,10 L90,50 L50,90 L10,50 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth={config.stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Layer 2: Inner pulsing circle */}
        <svg
          className="loading-svg loading-layer-2"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle
            className="loading-pulse-circle"
            cx="50"
            cy="50"
            r="25"
            fill="none"
            stroke="currentColor"
            strokeWidth={config.stroke}
            opacity="0.6"
          />
        </svg>

        {/* Layer 3: Orbiting particles following bezier curves */}
        <div className="loading-particles">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="loading-particle"
              style={{
                animationDelay: `${i * 0.4}s`,
                width: config.dots,
                height: config.dots,
              }}
            />
          ))}
        </div>

        {/* Layer 4: Morphing inner paths */}
        <svg
          className="loading-svg loading-layer-3"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            className="loading-inner-morph"
            d="M30,50 Q50,30 70,50 T30,50"
            fill="none"
            stroke="currentColor"
            strokeWidth={config.stroke * 0.8}
            strokeLinecap="round"
            opacity="0.4"
          />
        </svg>
      </div>

      {/* Loading text with staggered fade */}
      <div className="loading-text-container">
        <span className="loading-text">Loading</span>
        <span className="loading-dots">
          <span style={{ animationDelay: "0s" }}>.</span>
          <span style={{ animationDelay: "0.2s" }}>.</span>
          <span style={{ animationDelay: "0.4s" }}>.</span>
        </span>
      </div>
    </div>
  );
}
