"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const paragraphs = [
  "I’m an engineering student driven by curiosity, innovation, and an entrepreneurial mindset. I love building new ideas, exploring emerging technologies, and connecting with brilliant minds who challenge the way we think. For me, engineering is not just about solving problems—it’s about creating meaningful impact.",
  "Let's build something crazy.",
];

export default function About() {
  return (
    <section id="about" className="relative py-20 px-6 bg-bg">
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
              className="font-display text-lg sm:text-xl md:text-2xl leading-relaxed text-textPrimary/90 max-w-3xl"
            >
              {p}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
