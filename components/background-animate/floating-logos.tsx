"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  SiNextdotjs,
  SiPrisma,
  SiTypescript,
  SiNodedotjs,
  SiGit,
  SiPostgresql,
  SiFacebook,
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiSass,
  SiTailwindcss,
} from "react-icons/si";

interface LogoPosition {
  id: number;
  icon: React.ReactNode;
  x: number;
  y: number;
  delay: number;
  duration: number;
  color: string;
}

interface Position {
  x: number;
  y: number;
}

interface ExclusionZone {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

// --- Utility functions ---
function checkCollision(pos1: Position, pos2: Position, minDistance: number): boolean {
  const dx = pos1.x - pos2.x;
  const dy = pos1.y - pos2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < minDistance;
}

function isInExclusionZone(pos: Position, zone: ExclusionZone): boolean {
  return pos.x >= zone.xMin && pos.x <= zone.xMax && pos.y >= zone.yMin && pos.y <= zone.yMax;
}

export function FloatingLogos() {
  const [logos, setLogos] = useState<LogoPosition[]>([]);

  useEffect(() => {
    const MAX_ATTEMPTS = 100;
    const icons = [
      { icon: <SiNextdotjs />, color: "text-white", name: "Next.js" },
      { icon: <SiPrisma />, color: "text-white", name: "Prisma" },
      { icon: <SiTypescript />, color: "text-[#3178C6]", name: "TypeScript" },
      { icon: <SiNodedotjs />, color: "text-[#339933]", name: "Node.js" },
      { icon: <SiGit />, color: "text-[#F05032]", name: "Git" },
      { icon: <SiPostgresql />, color: "text-[#4169E1]", name: "PostgreSQL" },
      { icon: <SiFacebook />, color: "text-[#1877F2]", name: "Facebook" },
      { icon: <SiReact />, color: "text-[#61DAFB]", name: "React" },
      { icon: <SiJavascript />, color: "text-[#F7DF1E]", name: "JavaScript" },
      { icon: <SiHtml5 />, color: "text-[#E34F26]", name: "HTML5" },
      { icon: <SiCss3 />, color: "text-[#1572B6]", name: "CSS3" },
      { icon: <SiSass />, color: "text-[#CC6699]", name: "Sass" },
      { icon: <SiTailwindcss />, color: "text-[#06B6D4]", name: "Tailwind CSS" },
    ];

    const getExclusionZone = (): ExclusionZone => {
      if (typeof window === "undefined") return { xMin: 25, xMax: 75, yMin: 20, yMax: 70 };
      const w = window.innerWidth;
      if (w < 640) return { xMin: 10, xMax: 90, yMin: 25, yMax: 75 };
      if (w < 1024) return { xMin: 20, xMax: 80, yMin: 25, yMax: 75 };
      return { xMin: 25, xMax: 75, yMin: 20, yMax: 70 };
    };

    const getMinDistance = () => {
      if (typeof window === "undefined") return 10;
      const w = window.innerWidth;
      if (w < 640) return 14;
      if (w < 1024) return 10;
      return 8;
    };

    // Safe margin from viewport edges (in percentage)
    const SAFE_MARGIN = 5;

    const exclusionZone = getExclusionZone();
    const minDistance = getMinDistance();
    const placed: Position[] = [];

    const generatePosition = (attempts = 0): Position | null => {
      if (attempts >= MAX_ATTEMPTS) return null;

      const side = Math.floor(Math.random() * 4);
      let x: number, y: number;

      switch (side) {
        case 0: // left
          x = Math.random() * 13 + SAFE_MARGIN; // 5-18%
          y = Math.random() * (90 - 2 * SAFE_MARGIN) + SAFE_MARGIN; // 5-90%
          break;
        case 1: // right
          x = Math.random() * 13 + 82; // 82-95%
          y = Math.random() * (90 - 2 * SAFE_MARGIN) + SAFE_MARGIN; // 5-90%
          break;
        case 2: // top
          x = Math.random() * (90 - 2 * SAFE_MARGIN) + SAFE_MARGIN; // 5-90%
          y = Math.random() * 10 + SAFE_MARGIN; // 5-15%
          break;
        default: // bottom
          x = Math.random() * (90 - 2 * SAFE_MARGIN) + SAFE_MARGIN; // 5-90%
          y = Math.random() * 10 + 85; // 85-95%
          break;
      }

      if (isInExclusionZone({ x, y }, exclusionZone)) return generatePosition(attempts + 1);

      const hasCollision = placed.some((p) => checkCollision({ x, y }, p, minDistance));
      if (hasCollision) return generatePosition(attempts + 1);

      return { x, y };
    };

    const newPositions: LogoPosition[] = [];

    icons.forEach((iconObj, i) => {
      const pos = generatePosition();
      if (pos) {
        placed.push(pos);
        newPositions.push({
          id: i,
          icon: React.cloneElement(iconObj.icon as React.ReactElement, {
            className: "h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8",
          }),
          color: iconObj.color,
          x: pos.x,
          y: pos.y,
          delay: Math.random() * 2,
          duration: Math.random() * 3 + 5,
        });
      }
    });

    setLogos(newPositions);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {logos.map((logo) => (
        <motion.div
          key={logo.id}
          className={`absolute cursor-pointer pointer-events-auto`}
          style={{
            left: `${logo.x}vw`,
            top: `${logo.y}vh`,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          whileHover={{
            scale: 1.4,
            rotate: 5,
            transition: {
              duration: 0.2,
              type: "spring",
              stiffness: 400,
              damping: 10,
            },
          }}
          transition={{
            delay: logo.delay,
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          <motion.div
            className={`${logo.color} flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg p-3 sm:p-4`}
            animate={{
              y: ["0%", "-20%", "0%"],
            }}
            transition={{
              repeat: Infinity,
              duration: logo.duration,
              ease: "easeInOut",
            }}
          >
            {logo.icon}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
