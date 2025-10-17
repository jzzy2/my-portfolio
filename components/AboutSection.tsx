// AboutSection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { TechCategory } from "./about-components/TechCategory";
import SocialMedia from "./about-components/SocialMedia";
import Introduction from "./about-components/Introduction";

const techStack = {
  frontend: [
    "ReactJS",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "SASS",
    "HTML",
    "CSS3",
  ],
  backend: ["Node.js", "Prisma", "Express.js", "PostgresSQL"],
  tools: ["Git", "Visual Studio Code", "Postman", "Figma", "Cursor"],
};

const categoryStyles = {
  frontend: { color: "bg-blue-600 border-blue-600", text: "text-blue-100" },
  backend: { color: "bg-green-600 border-green-600", text: "text-green-100" },
  tools: { color: "bg-purple-600 border-purple-600", text: "text-purple-100" },
};

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.5 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative mx-auto min-h-screen max-w-6xl px-6 py-20 md:px-12 md:py-32"
    >
      {/* Animated bg elements */}
      <div className="absolute left-1/4 top-20 h-64 w-64 animate-float bg-foreground/5 blur-3xl" />
      <div className="absolute bottom-20 right-1/4 h-80 w-80 animate-float bg-foreground/5 blur-3xl [animation-delay:2s]" />
      {/* *** removed corner accent line divs here *** */}

      {/* Content */}
      <div className="relative space-y-16">
        <Introduction isVisible={isVisible} />
        <div
          className={`
            space-y-8 transition-all duration-1000 delay-300
            ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}
          `}
        >
          <div className="space-y-2">
            <div className="h-1 w-12 bg-foreground" />
            <h3 className="text-balance font-sans text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-2xl md:text-3xl lg:text-4xl">
              Tech Stack
            </h3>
          </div>
          <div className="space-y-8">
            <TechCategory
              label="Frontend"
              techs={techStack.frontend}
              isVisible={isVisible}
              color={categoryStyles.frontend.color}
              textColor={categoryStyles.frontend.text}
            />
            <TechCategory
              label="Backend"
              techs={techStack.backend}
              isVisible={isVisible}
              color={categoryStyles.backend.color}
              textColor={categoryStyles.backend.text}
            />
            <TechCategory
              label="Tools"
              techs={techStack.tools}
              isVisible={isVisible}
              color={categoryStyles.tools.color}
              textColor={categoryStyles.tools.text}
            />
          </div>
        </div>
        <div
          className={`
            transition-all duration-1000 delay-500
            ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}
          `}
        >
          <SocialMedia />
        </div>
      </div>
      {/* Bottom accent line */}
      <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
    </section>
  );
}
