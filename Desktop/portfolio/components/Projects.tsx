// components/Projects.tsx
"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { ArrowRight, ArrowLeft, Github } from "lucide-react";
import { projects } from "@/data/profile";

type Project = {
  title: string;
  description: string;
  tech: string[];
  link: string;
};

const BG_IMAGE = "/projects/work-bg.jpg";
const BG_FALLBACK =
  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2400&auto=format&fit=crop";

export default function Projects() {
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [bg, setBg] = useState(BG_IMAGE);
  const [maxScroll, setMaxScroll] = useState(0);

  // If the local image is missing, swap to the remote fallback.
  useEffect(() => {
    const img = new Image();
    img.src = BG_IMAGE;
    img.onerror = () => setBg(BG_FALLBACK);
  }, []);

  // Set up vertical scroll tracking
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Calculate pixel-accurate translation distance
  useEffect(() => {
    const updateScroll = () => {
      const track = trackRef.current;
      if (!track) return;
      setMaxScroll(Math.max(0, track.scrollWidth - window.innerWidth));
    };

    // Run after a short timeout to ensure the layout has settled and track width is fully rendered
    const timer = setTimeout(updateScroll, 100);
    window.addEventListener("resize", updateScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateScroll);
    };
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxScroll]);

  // Sync active dots with scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const step = 1 / (projects.length - 1);
    const idx = Math.round(latest / step);
    setActiveIdx(Math.max(0, Math.min(projects.length - 1, idx)));
  });

  // Smooth scroll window to active index position
  const scrollByCard = (dir: 1 | -1) => {
    const parent = targetRef.current;
    if (!parent) return;
    const parentTop = parent.getBoundingClientRect().top + window.scrollY;
    // The sticky horizontal scroll happens over the 200vh height range (from scroll 0 to 1)
    const scrollRange = window.innerHeight * 2;
    const step = scrollRange / (projects.length - 1);
    const targetIdx = Math.max(0, Math.min(projects.length - 1, activeIdx + dir));
    window.scrollTo({
      top: parentTop + targetIdx * step + 5, // add small offset to ensure it triggers the scroll sync reliably
      behavior: "smooth",
    });
  };

  return (
    <div ref={targetRef} className="relative h-[300vh] bg-bg overflow-clip">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden z-10">
        {/* Cinematic background with a slow Ken-Burns drift */}
        <motion.div
          aria-hidden
          initial={{ scale: 1, y: 0 }}
          animate={{ scale: 1.08, y: -14 }}
          transition={{
            duration: 40,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bg})` }}
        />

        {/* Darkening veil so cards + text stay legible, tinted to your bg */}
        <div
          aria-hidden
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 28%, rgba(5,8,22,0.45) 0%, rgba(5,8,22,0.82) 68%, rgba(5,8,22,0.96) 100%)",
          }}
        />

        <div className="relative z-10 py-12 flex flex-col h-full justify-between">
          {/* Heading */}
          <div className="mt-8 px-6 text-center shrink-0">
            <span className="section-eyebrow">Builds</span>
            <h2 className="mt-3 font-display text-[clamp(2.5rem,5vw,4.25rem)] font-medium leading-tight text-textPrimary">
              Our Work So Far
            </h2>
          </div>

          {/* Horizontal carousel using transformed X positioning */}
          <div className="flex-1 flex items-center overflow-hidden">
            <motion.div
              ref={trackRef}
              className="flex gap-8 px-[12vw] pt-12 pb-6"
              style={{ x }}
            >
              {(projects as Project[]).map((project, i) => {
                const active = i === activeIdx;
                return (
                  <motion.a
                    key={project.title}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-glow glass group flex min-h-[380px] w-[80vw] shrink-0 flex-col rounded-3xl p-8 sm:w-[380px]"
                    animate={{
                      y: active ? -24 : 0,
                      scale: active ? 1 : 0.95,
                      opacity: active ? 1 : 0.65,
                    }}
                    transition={{ type: "spring", stiffness: 180, damping: 24 }}
                  >
                    <span className="section-eyebrow mb-5">
                      {String(i + 1).padStart(2, "0")} · Project
                    </span>

                    <h3 className="mb-4 font-display text-2xl sm:text-3xl leading-snug text-textPrimary">
                      {project.title}
                    </h3>

                    <p className="mb-auto leading-relaxed text-textSecondary line-clamp-4 text-sm sm:text-base">
                      {project.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-textSecondary/10 bg-surface2/60 px-3 py-1.5 text-xs text-textSecondary"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <span className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-textPrimary/95 px-4 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-bg transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-textPrimary">
                      <Github className="h-4 w-4" /> View Code
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </motion.a>
                );
              })}
            </motion.div>
          </div>

          {/* Nav arrows + progress dots */}
          <div className="mb-6 flex items-center justify-center gap-5 shrink-0">
            <button
              onClick={() => scrollByCard(-1)}
              aria-label="Previous project"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-textSecondary/20 bg-surface/50 text-textPrimary backdrop-blur transition-colors duration-300 hover:border-accent/50 hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            <div className="flex gap-2">
              {(projects as Project[]).map((p, i) => (
                <span
                  key={p.title}
                  className={`h-[7px] rounded-full transition-all duration-300 ${
                    i === activeIdx ? "w-6 bg-accent" : "w-[7px] bg-textSecondary/30"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => scrollByCard(1)}
              aria-label="Next project"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-textSecondary/20 bg-surface/50 text-textPrimary backdrop-blur transition-colors duration-300 hover:border-accent/50 hover:text-accent"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}