"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { education } from "@/data/profile";

export default function Education() {
  return (
    <section id="education" className="relative py-32 px-6 bg-surface/40">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow="Foundation" title="Education" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-14 glass rounded-2xl p-8 sm:p-12"
        >
          <div className="flex items-start gap-5">
            <div className="p-3 rounded-xl bg-accent/10 text-accent shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display text-2xl sm:text-3xl text-textPrimary">
                {education.institution}
              </h3>
              <p className="text-textSecondary mt-1">{education.degree}</p>
              <p className="text-textSecondary">Minor: {education.minor}</p>
              <div className="flex flex-wrap gap-6 mt-5 text-sm">
                <span className="text-accent2">{education.duration}</span>
                <span className="text-accent">CGPA: {education.cgpa}</span>
              </div>
            </div>
          </div>

          <div className="hairline my-8" />

          <p className="section-eyebrow mb-4">Relevant Coursework</p>
          <div className="flex flex-wrap gap-3">
            {education.coursework.map((course, i) => (
              <motion.span
                key={course}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="text-xs sm:text-sm px-4 py-2 rounded-full border border-textSecondary/20 text-textSecondary hover:border-accent/50 hover:text-accent transition-colors duration-300"
              >
                {course}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
