"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { certifications } from "@/data/profile";

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-32 px-6 bg-surface/40">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow="Recognition" title="Certifications" />

        <div className="grid sm:grid-cols-2 gap-6 mt-16">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="card-glow rounded-2xl glass p-6 flex items-start gap-4"
            >
              <div className="p-2.5 rounded-lg bg-accent/10 text-accent shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-lg sm:text-xl text-textPrimary">
                  {cert.title}
                </h3>
                <p className="text-textSecondary text-sm mt-1">{cert.org}</p>
                <p className="text-accent2 text-xs mt-2 tracking-wide">
                  {cert.year}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
