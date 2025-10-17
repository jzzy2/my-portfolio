"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  type HTMLMotionProps,
  type SpringOptions,
  type Transition,
} from "framer-motion"; // <── use framer-motion, not motion/react
import { cn } from "@/lib/utils";

/* ---------- helpers ---------- */
type StarLayerProps = HTMLMotionProps<"div"> & {
  count: number;
  size: number;
  transition: Transition;
  starColor: string;
};

function generateStars(count: number, starColor: string) {
  const shadows: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 4000) - 2000;
    const y = Math.floor(Math.random() * 4000) - 2000;
    shadows.push(`${x}px ${y}px ${starColor}`);
  }
  return shadows.join(", ");
}

/* ---------- star layer ---------- */
function StarLayer({ count, size, transition, starColor }: StarLayerProps) {
  const [boxShadow, setBoxShadow] = React.useState("");

  React.useEffect(() => {
    setBoxShadow(generateStars(count, starColor));
  }, [count, starColor]);

  return (
    <motion.div
      animate={{ y: [0, -2000] }}
      transition={transition}
      className="absolute inset-0 h-[2000px] w-full"
    >
      {/* two identical layers give an infinite scroll illusion */}
      <div className="absolute rounded-full" style={{ width: size, height: size, boxShadow }} />
      <div
        className="absolute top-[2000px] rounded-full"
        style={{ width: size, height: size, boxShadow }}
      />
    </motion.div>
  );
}

/* ---------- exported wrapper ---------- */
export type StarsBackgroundProps = React.ComponentProps<"div"> & {
  factor?: number;
  speed?: number;
  transition?: SpringOptions;
  starColor?: string;
  pointerEvents?: boolean;
};

export function StarsBackground({
  children,
  className,
  factor = 0.05,
  speed = 50,
  transition = { stiffness: 50, damping: 20 },
  starColor = "#fff",
  pointerEvents = true,
  ...props
}: StarsBackgroundProps) {
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const springX = useSpring(offsetX, transition);
  const springY = useSpring(offsetY, transition);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      offsetX.set(-(e.clientX - cx) * factor);
      offsetY.set(-(e.clientY - cy) * factor);
    },
    [factor, offsetX, offsetY]
  );

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn("absolute inset-0 w-full h-full overflow-hidden", className)}
      {...props}
    >
      <motion.div
        style={{ x: springX, y: springY }}
        className={cn({ "pointer-events-none": !pointerEvents })}
      >
        <StarLayer
          count={1000}
          size={1}
          starColor={starColor}
          transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
        />
        <StarLayer
          count={400}
          size={2}
          starColor={starColor}
          transition={{ repeat: Infinity, duration: speed * 2, ease: "linear" }}
        />
        <StarLayer
          count={200}
          size={3}
          starColor={starColor}
          transition={{ repeat: Infinity, duration: speed * 3, ease: "linear" }}
        />
      </motion.div>
      {children}
    </div>
  );
}
