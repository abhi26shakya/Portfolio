// components/About.tsx
"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { Cpu, GraduationCap, Award } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="relative py-24 px-6 bg-bg overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading eyebrow="Philosophy" title="Curiosity Before Expertise" />
        
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 mt-16 items-center">
          {/* Left Panel: Narrative */}
          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-display text-2xl sm:text-3xl md:text-[2.2rem] leading-snug text-textPrimary font-light italic"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              "I’m an engineering student driven by curiosity, innovation, and an entrepreneurial mindset."
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              className="text-textSecondary leading-relaxed text-base sm:text-lg max-w-2xl font-light"
            >
              I love building new ideas, exploring emerging technologies, and connecting with brilliant minds who challenge the way we think. For me, engineering is not just about solving problems—it’s about creating meaningful impact.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="pt-4"
            >
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent font-semibold">
                Let's build something crazy.
              </span>
            </motion.div>
          </div>

          {/* Right Panel: Feature Grid */}
          <div className="grid gap-5">
            {[
              {
                icon: GraduationCap,
                title: "Electronics & AI/ML",
                desc: "Pursuing ECE degree at MMMUT with a minor in Artificial Intelligence and Machine Learning.",
                color: "text-accent",
                bgGlow: "rgba(56, 189, 248, 0.05)",
              },
              {
                icon: Cpu,
                title: "Research & Simulation",
                desc: "Collaborating with USC researchers and interning at IIT Bombay on advanced circuit simulation.",
                color: "text-accent2",
                bgGlow: "rgba(139, 92, 246, 0.05)",
              },
              {
                icon: Award,
                title: "Autonomous Systems",
                desc: "Designing and building line-followers, drones, and IoT modules for collegiate competitions.",
                color: "text-emerald-400",
                bgGlow: "rgba(52, 211, 153, 0.05)",
              },
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: idx * 0.12 }}
                  whileHover={{ x: 6, scale: 1.01 }}
                  className="card-glow glass flex gap-5 p-6 rounded-2xl relative overflow-hidden"
                  style={{
                    backgroundColor: "rgba(15, 23, 42, 0.35)",
                  }}
                >
                  <div
                    className={`p-3 rounded-xl shrink-0 h-fit bg-white/5 border border-white/10 ${card.color}`}
                    style={{
                      boxShadow: `0 0 15px 0 ${card.bgGlow}`,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-medium text-textPrimary">
                      {card.title}
                    </h3>
                    <p className="text-textSecondary text-xs sm:text-sm mt-1 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
