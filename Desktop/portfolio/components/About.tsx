"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const paragraphs = [
  "I am a B.Tech student in Electronics and Communication Engineering at MMMUT with a Minor in Artificial Intelligence and Machine Learning.",
  "My interests span artificial intelligence, machine learning, robotics, embedded systems, and intelligent technologies.",
  "I enjoy exploring the intersection of software, hardware, and research-driven innovation.",
];

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6 bg-bg">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow="Philosophy" title="Curiosity Before Expertise" />
        <div className="mt-14 space-y-8">
          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
              className="font-display text-2xl sm:text-3xl md:text-4xl leading-relaxed text-textPrimary/90 max-w-4xl"
            >
              {p}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
