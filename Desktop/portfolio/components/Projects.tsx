// components/Projects.tsx
"use client";

import { motion } from "framer-motion";
import { Github, ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { projects } from "@/data/profile";

type Project = {
  title: string;
  description: string;
  tech: string[];
  link: string;
};

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 px-6 bg-bg overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading eyebrow="Builds" title="Our Work So Far" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {(projects as Project[]).map((project, i) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="card-glow glass group flex flex-col rounded-3xl p-6 sm:p-8 bg-slate-900/20 hover:bg-slate-900/30 transition-all duration-300 min-h-[380px] relative overflow-hidden"
              style={{
                borderColor: "rgba(255, 255, 255, 0.08)",
              }}
            >
              <span className="section-eyebrow mb-4">
                {String(i + 1).padStart(2, "0")} · Project
              </span>

              <h3 className="mb-3 font-display text-xl sm:text-2xl text-textPrimary leading-snug">
                {project.title}
              </h3>

              <p className="mb-6 text-sm leading-relaxed text-textSecondary line-clamp-4">
                {project.description}
              </p>

              <div className="mt-auto pt-6 flex flex-wrap gap-2 border-t border-white/5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-textSecondary/10 bg-surface2/60 px-3 py-1 text-[11px] text-textSecondary"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <span className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-textPrimary/95 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-bg transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-white hover:text-black">
                <Github className="h-4 w-4" /> View Code
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}