"use client";

import { motion } from "framer-motion";
import { FlaskConical, Users, BadgeCheck } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { research } from "@/data/profile";

export default function Research() {
  return (
    <section id="research" className="relative py-20 px-6 bg-bg overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-accent2/10 blur-3xl pointer-events-none" />
      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading eyebrow="Frontier" title="Research" />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          whileHover={{ y: -6 }}
          className="card-glow mt-14 rounded-3xl glass p-8 sm:p-12"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3 text-accent">
              <FlaskConical className="w-5 h-5" />
              <span className="text-xs uppercase tracking-widest2">
                {research.status}
              </span>
            </div>
            <BadgeCheck className="w-5 h-5 text-accent2" />
          </div>

          <h3 className="font-display text-3xl sm:text-4xl md:text-5xl mt-6 text-textPrimary leading-snug">
            {research.title}
          </h3>

          <p className="text-textSecondary text-lg mt-6 max-w-3xl leading-relaxed">
            {research.description}
          </p>

          <div className="hairline my-8" />

          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <p className="section-eyebrow mb-3">Institutions</p>
              <ul className="space-y-2">
                {research.organizations.map((org) => (
                  <li key={org} className="text-textPrimary/90">
                    {org}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="section-eyebrow mb-3 flex items-center gap-2">
                <Users className="w-3.5 h-3.5" /> Collaborators
              </p>
              <ul className="space-y-2">
                {research.collaborators.map((c) => (
                  <li key={c} className="text-textPrimary/90">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
