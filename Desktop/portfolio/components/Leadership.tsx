"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { leadership } from "@/data/profile";

const BG_IMAGE = "/projects/work-bg.jpg";
const BG_FALLBACK =
  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2400&auto=format&fit=crop";

export default function Leadership() {
  const [bg, setBg] = useState(BG_IMAGE);

  useEffect(() => {
    const img = new window.Image();
    img.src = BG_IMAGE;
    img.onerror = () => setBg(BG_FALLBACK);
  }, []);

  return (
    <section id="leadership" className="relative py-12 px-6 overflow-hidden">
      {/* Cinematic space background to match Projects */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${bg})` }}
      />
      {/* Darkening veil to blend with Projects (top) and Skills (bottom) */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,8,22,0.96) 0%, rgba(5,8,22,0.65) 50%, rgba(5,8,22,0.96) 100%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
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
