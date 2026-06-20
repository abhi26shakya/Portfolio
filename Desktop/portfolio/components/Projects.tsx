"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { projects } from "@/data/profile";

export default function Projects() {
  return (
    <section id="projects" className="relative py-32 px-6 bg-bg">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="Builds" title="Projects" />

        <div className="grid sm:grid-cols-2 gap-6 mt-16">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.1, ease: "easeOut" }}
              whileHover={{ y: -8 }}
              className="card-glow group relative rounded-2xl glass p-8 flex flex-col justify-between min-h-[260px] overflow-hidden"
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-accent/10 blur-2xl group-hover:bg-accent/20 transition-colors duration-500" />
              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl sm:text-3xl text-textPrimary leading-snug">
                    {project.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-textSecondary group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0" />
                </div>
                <p className="text-textSecondary mt-4 leading-relaxed">
                  {project.description}
                </p>
              </div>
              <div className="relative z-10 mt-6 flex flex-wrap items-center gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1.5 rounded-full bg-surface2/60 text-textSecondary border border-textSecondary/10"
                  >
                    {t}
                  </span>
                ))}
                <span className="ml-auto flex items-center gap-1.5 text-xs text-textSecondary group-hover:text-accent2 transition-colors duration-300">
                  <Github className="w-3.5 h-3.5" /> View Code
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
