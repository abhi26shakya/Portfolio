"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import AnimatedHeadline from "@/components/AnimatedHeadline";
import Magnetic from "@/components/Magnetic";

interface WindElement {
  id: number;
  type: "spore" | "grass";
  size: number;
  left: number;
  bottom: number;
  delay: number;
  duration: number;
  rotationSpeed: number;
  initialRotation: number;
  color: string;
}

interface GrassBlade {
  id: number;
  xPos: number;
  height: number;
  width: number;
  swaySpeed: number;
  opacity: number;
  skew: number;
}

export default function Hero() {
  const { x, y } = useMouseParallax();
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<WindElement[]>([]);
  const [blades, setBlades] = useState<GrassBlade[]>([]);

  useEffect(() => {
    setMounted(true);

    // Generate random wind particles (both spores and floating grass blades)
    const totalElements = 36;
    const generatedParticles = Array.from({ length: totalElements }).map((_, i) => {
      const type: "spore" | "grass" = i % 2 === 0 ? "grass" : "spore";
      const size = type === "grass" 
        ? Math.random() * 3 + 4   // grass blades: size 4px to 7px wide
        : Math.random() * 3 + 1.5; // spores: size 1.5px to 4.5px
        
      const color = type === "grass"
        ? [
            "rgba(52, 211, 153, 0.5)", // emerald-400
            "rgba(16, 185, 129, 0.5)", // emerald-500
            "rgba(110, 231, 183, 0.45)", // emerald-300
            "rgba(5, 150, 105, 0.5)"   // emerald-600
          ][Math.floor(Math.random() * 4)]
        : "rgba(255, 255, 255, 0.35)"; // soft white spore
        
      return {
        id: i,
        type,
        size,
        left: Math.random() * 120 - 10, // distribute across screen horizontally
        bottom: Math.random() * 40 - 20,
        delay: Math.random() * 20,
        duration: type === "grass"
          ? Math.random() * 8 + 12 // grass drifts slightly slower/heavier (12s to 20s)
          : Math.random() * 6 + 10, // spores drift faster (10s to 16s)
        rotationSpeed: Math.random() * 6 + 6, // 6 to 12 seconds per full spin
        initialRotation: Math.random() * 360,
        color,
      };
    });
    setParticles(generatedParticles);

    // Generate random grass blades
    const generatedBlades = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      xPos: (i / 50) * 1200 + (Math.random() * 12 - 6),
      height: Math.random() * 32 + 52,
      width: Math.random() * 6 + 9,
      swaySpeed: Math.random() * 2.5 + 4.5,
      opacity: Math.random() * 0.35 + 0.65,
      skew: Math.random() * 5 - 2.5,
    }));
    setBlades(generatedBlades);
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-slate-950 flex items-center justify-center"
    >
      {/* Animated Space Backdrop (drifting and scaling slowly) */}
      <motion.div
        style={{
          x: x * 14,
          y: y * 10,
        }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute inset-0 bg-[url('/hero_background.png')] bg-cover bg-center scale-105 animate-space-drift" />
      </motion.div>

      {/* Lighter Cinematic Overlay for Clearer Background Visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#050816]/95 pointer-events-none" />

      {/* Floating space dust or background glow rings */}
      <motion.div
        className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-accent2/10 blur-3xl pointer-events-none"
        style={{ x: x * 8, y: y * 6 }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full bg-accent/5 blur-3xl pointer-events-none"
        style={{ x: x * -12, y: y * -8 }}
      />

      <motion.div
        style={{ x: x * 5, y: y * 4 }}
        className="relative z-10 max-w-5xl px-6 text-center mt-12"
      >
        {/* Elegant Serif Tagline */}
        <AnimatedHeadline />

        {/* Cinematic Sub-description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-8 text-xs sm:text-sm font-light uppercase tracking-[0.22em] text-white/90 max-w-2xl mx-auto leading-relaxed"
        >
          An undergraduate researcher pushing the frontier of artificial intelligence, brain connectomes, and electronic systems.
        </motion.p>

        {/* Floating Quick Action Link */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <Magnetic>
            <a
              href="#research"
              className="text-[10px] font-mono uppercase tracking-[0.25em] px-7 py-3 rounded-full border border-white/20 text-white bg-white/5 backdrop-blur hover:bg-white/10 hover:border-white/30 transition-all duration-300"
            >
              Explore Research
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* Swaying Grass Overlay at the Bottom */}
      {mounted && (
        <div className="absolute bottom-0 left-0 right-0 w-full h-24 pointer-events-none z-10 overflow-hidden flex items-end select-none">
          <svg
            viewBox="0 0 1200 120"
            className="w-full h-full text-[#031109] fill-current"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="grassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#082b17" />
                <stop offset="100%" stopColor="#031109" />
              </linearGradient>
            </defs>
            {blades.map((b) => (
              <path
                key={b.id}
                d={`M${b.xPos},120 Q${b.xPos + b.width / 2 + b.skew},${120 - b.height / 2} ${b.xPos + b.skew},${120 - b.height} Q${b.xPos + b.width / 2 + b.skew + 3},${120 - b.height / 2} ${b.xPos + b.width},120`}
                fill="url(#grassGrad)"
                style={{
                  animation: `swaySlow ${b.swaySpeed}s ease-in-out infinite`,
                  transformOrigin: `${b.xPos + b.width / 2}px 120px`,
                  opacity: b.opacity,
                }}
              />
            ))}
          </svg>
        </div>
      )}

      {/* Floating Spores & Grass Blades in the Wind */}
      {mounted &&
        particles.map((p) => (
          <div
            key={p.id}
            className="absolute pointer-events-none z-10 select-none"
            style={{
              left: `${p.left}%`,
              bottom: `${p.bottom}px`,
              animation: `floatWind ${p.duration}s linear infinite`,
              animationDelay: `-${p.delay}s`,
            }}
          >
            <div
              style={{
                width: p.type === "grass" ? `${p.size}px` : `${p.size}px`,
                height: p.type === "grass" ? `${p.size * 2.2}px` : `${p.size}px`,
                animation: `spinWind ${p.rotationSpeed}s linear infinite`,
                animationDelay: `-${p.delay}s`,
                transform: `rotate(${p.initialRotation}deg)`,
              }}
            >
              {p.type === "grass" ? (
                <svg viewBox="0 0 16 32" className="w-full h-full animate-pulse-slow">
                  <path
                    d="M2,32 C6,24 10,16 14,0 C10,10 6,20 2,32 Z"
                    fill={p.color}
                    style={{ filter: "drop-shadow(0 0 2px rgba(52, 211, 153, 0.3))" }}
                  />
                </svg>
              ) : (
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    backgroundColor: p.color,
                    boxShadow: "0 0 6px rgba(255, 255, 255, 0.4)",
                  }}
                />
              )}
            </div>
          </div>
        ))}
    </section>
  );
}
