// components/Experience.tsx
"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { experience } from "@/data/profile";

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 px-6 bg-surface/40 overflow-hidden">
      {/* Subtle backdrop glows */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-accent2/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <SectionHeading eyebrow="Trajectory" title="Experience" />

        <div className="relative mt-16 pl-6 sm:pl-10">
          {/* Vertical timeline connector line */}
          <div className="absolute left-[5px] sm:left-[9px] top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent2 to-transparent" />

          <div className="space-y-12">
            {experience.map((item, i) => (
              <motion.div
                key={item.role + item.period}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
                className="relative"
              >
                {/* Timeline node dot centered exactly on the vertical line */}
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                  className="absolute left-[-19px] sm:-left-[31px] top-8 w-3.5 h-3.5 -translate-x-1/2 rounded-full bg-accent border-[2.5px] border-[#080c21] shadow-[0_0_12px_rgba(56,189,248,0.8)] z-10"
                />

                {/* Elegant Interactive Glass Card */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.005 }}
                  className="card-glow glass rounded-2xl p-6 sm:p-8 bg-slate-900/25 hover:bg-slate-900/35 transition-all duration-300 relative overflow-hidden"
                  style={{
                    borderColor: "rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent2 font-semibold">
                    {item.period}
                  </span>
                  
                  <h3 className="font-display text-2xl sm:text-3xl mt-2 text-textPrimary">
                    {item.role}
                  </h3>
                  
                  <p className="text-textSecondary text-sm sm:text-base mt-1">
                    {item.org} {item.location ? `• ${item.location}` : ""}
                  </p>
                  
                  {item.points && (
                    <ul className="list-disc pl-5 mt-5 space-y-2.5 text-textPrimary/80 max-w-3xl leading-relaxed text-sm sm:text-[15px]">
                      {item.points.map((point, index) => (
                        <li
                          key={index}
                          dangerouslySetInnerHTML={{ __html: point }}
                          className="marker:text-accent"
                        />
                      ))}
                    </ul>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
