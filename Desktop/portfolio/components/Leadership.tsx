"use client";

import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { leadership } from "@/data/profile";

export default function Leadership() {
  return (
    <section id="leadership" className="relative py-20 px-6 bg-surface/40">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow="Influence" title="Leadership" />

        <div className="grid sm:grid-cols-3 gap-6 mt-16">
          {leadership.map((item, i) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className="card-glow rounded-2xl glass p-7"
            >
              <div className="p-2.5 w-fit rounded-lg bg-accent2/10 text-accent2">
                <Compass className="w-5 h-5" />
              </div>
              <p className="text-xs uppercase tracking-widest2 text-accent mt-5">
                {item.year}
              </p>
              <h3 className="font-display text-xl sm:text-2xl mt-2 text-textPrimary">
                {item.role}
              </h3>
              <p className="text-textSecondary mt-2 text-sm leading-relaxed">
                {item.org}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
