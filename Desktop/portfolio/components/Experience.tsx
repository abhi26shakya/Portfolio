"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { experience } from "@/data/profile";

export default function Experience() {
  return (
    <section id="experience" className="relative py-32 px-6 bg-surface/40">
      <div className="max-w-4xl mx-auto">
        <SectionHeading eyebrow="Trajectory" title="Experience" />

        <div className="relative mt-16 pl-8 sm:pl-12">
          <div className="absolute left-[5px] sm:left-[9px] top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent2 to-transparent" />

          <div className="space-y-16">
            {experience.map((item, i) => (
              <motion.div
                key={item.role + item.period}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
                className="relative"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                  className="absolute -left-8 sm:-left-12 top-1.5 w-3 h-3 rounded-full bg-accent shadow-[0_0_12px_rgba(56,189,248,0.8)]"
                />
                <p className="text-xs uppercase tracking-widest2 text-accent2">
                  {item.period}
                </p>
                <h3 className="font-display text-2xl sm:text-3xl mt-2 text-textPrimary">
                  {item.role}
                </h3>
                <p className="text-textSecondary mt-1">{item.org}</p>
                <p className="text-textPrimary/80 mt-3 max-w-2xl leading-relaxed">
                  {item.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
