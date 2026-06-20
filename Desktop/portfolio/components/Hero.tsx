"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowDown, Download, Mail, Sparkles } from "lucide-react";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { personalInfo } from "@/data/profile";

const NeuralUniverse = dynamic(() => import("./NeuralUniverse"), {
  ssr: false,
});
const ParticlesBackground = dynamic(() => import("./ParticlesBackground"), {
  ssr: false,
});

export default function Hero() {
  const { x, y } = useMouseParallax();

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-bg flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 bg-radial-glow" />
      <NeuralUniverse />
      <ParticlesBackground />

      <motion.div
        className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-accent2/20 blur-3xl animate-float-slower"
        style={{ x: x * 18, y: y * 12 }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full bg-accent/15 blur-3xl animate-float-slow"
        style={{ x: x * -22, y: y * -14 }}
      />

      <motion.div
        style={{ x: x * 8, y: y * 6 }}
        className="relative z-10 max-w-5xl px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-6 section-eyebrow"
        >
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span>{personalInfo.location}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: "easeOut" }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] text-textPrimary"
        >
          Building <span className="text-gradient">Intelligent Systems</span>
          <br />
          Through Research and Engineering
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-8 text-sm sm:text-base uppercase tracking-widest2 text-textSecondary"
        >
          AI &middot; Machine Learning &middot; Robotics &middot; Embedded Systems
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#research"
            className="px-7 py-3 rounded-full bg-accent text-bg font-medium text-sm tracking-wide hover:bg-accent/90 transition-colors duration-300"
          >
            View Research
          </a>
          <a
            href={personalInfo.cvPath}
            download
            className="px-7 py-3 rounded-full border border-textSecondary/30 text-textPrimary text-sm tracking-wide flex items-center gap-2 hover:border-accent hover:text-accent transition-colors duration-300"
          >
            <Download className="w-4 h-4" /> Download CV
          </a>
          <a
            href="#contact"
            className="px-7 py-3 rounded-full border border-textSecondary/30 text-textPrimary text-sm tracking-wide flex items-center gap-2 hover:border-accent2 hover:text-accent2 transition-colors duration-300"
          >
            <Mail className="w-4 h-4" /> Contact Me
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-textSecondary"
      >
        <span className="text-[10px] uppercase tracking-widest2">Scroll</span>
        <ArrowDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
}
