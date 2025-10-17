// HeroSection.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FloatingLogos } from "@/components/background-animate/floating-logos";
import { LoadingScreen } from "@/components/loading/LoadingScreen";
import { TypingText } from "@/components/animate-ui/primitives/texts/typing";
import { GradientTypingText } from "@/components/CustomGradiant";
import AboutSection from "../AboutSection";

export default function HeroSection() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const minLoad = 2000;
    const start = Date.now();
    const handleReady = () => {
      const remain = Math.max(0, minLoad - (Date.now() - start));
      setTimeout(() => setIsLoading(false), remain);
    };
    if (document.readyState === "complete") handleReady();
    else {
      window.addEventListener("load", handleReady);
      return () => window.removeEventListener("load", handleReady);
    }
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LoadingScreen visible theme="dark" size="md" />
        </motion.div>
      ) : (
        <motion.main
          key="hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative min-h-screen overflow-hidden bg-transparent"
        >
          <div
            id="hero"
            className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-20"
          >
            <div className="mb-16 max-w-3xl text-center">
              <TypingText
                text="Welcome to my web development portfolio."
                delay={0.5}
                duration={30}
                className="text-balance font-sans text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl"
              />
              <div className="text-center mt-4 mb-4">
                <GradientTypingText
                  text="I'm John Carlo Espina"
                  delay={1}
                  duration={60}
                  className="font-sans text-2xl font-bold tracking-tight sm:text-2xl md:text-3xl lg:text-4xl"
                />
              </div>
              <TypingText
                text="I'm a tech enthusiast and aspiring software engineer who loves learning how things work and building projects that push me to grow."
                delay={1.5}
                duration={10}
                className="text-balance font-sans text-base font-normal leading-relaxed tracking-normal text-white sm:text-sm md:text-base lg:text-3xl"
              />
            </div>
          </div>
          <AboutSection />
          <FloatingLogos />
        </motion.main>
      )}
    </AnimatePresence>
  );
}
