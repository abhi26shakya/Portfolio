// components/Projects.tsx
"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
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

  // Swap to remote fallback if the local image is missing.
  useEffect(() => {
    const img = new window.Image();
    img.src = BG_IMAGE;
    img.onerror = () => setBg(BG_FALLBACK);
  }, []);

  // Track vertical scroll across the tall section; while it's pinned,
  // progress 0 -> 1 drives the horizontal card translation.
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Measure how far the track must travel so the last card ends fully visible.
  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const distance = Math.max(0, track.scrollWidth - window.innerWidth);
    setMaxScroll(distance);
  }, []);

  useEffect(() => {
    const t = setTimeout(measure, 120);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  // Smooth the horizontal motion a touch so it feels cinematic, not rigid.
  const xRaw = useTransform(scrollYProgress, [0, 1], [0, -maxScroll]);
  const x = useSpring(xRaw, { stiffness: 120, damping: 30, mass: 0.4 });

  // Light up the dot for whichever card is closest to centre.
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const n = projects.length;
    if (n <= 1) return;
    const idx = Math.round(latest * (n - 1));
    setActiveIdx(Math.max(0, Math.min(n - 1, idx)));
  });

  // Arrows nudge the page scroll to the previous / next card's progress point.
  const goTo = (dir: 1 | -1) => {
    const el = targetRef.current;
    if (!el) return;
    const n = projects.length;
    const next = Math.max(0, Math.min(n - 1, activeIdx + dir));
    const rect = el.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;
    const scrollable = el.offsetHeight - window.innerHeight;
    const progress = next / (n - 1);
    window.scrollTo({
      top: sectionTop + progress * scrollable,
      behavior: "smooth",
    });
  };

  return (
    <section id="projects" ref={targetRef} className="relative h-[300vh] bg-bg">
      {/* Pinned viewport that holds the scene while the page scrolls through it */}
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
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

        {/* Darkening veil for legibility, tinted to your bg colour */}
        <div
          aria-hidden
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 28%, rgba(5,8,22,0.45) 0%, rgba(5,8,22,0.82) 68%, rgba(5,8,22,0.96) 100%)",
          }}
        />

        <div className="relative z-10 flex h-full flex-col justify-between py-12">
          {/* Heading */}
          <div className="mt-6 shrink-0 px-6 text-center">
            <span className="section-eyebrow">Builds</span>
            <h2 className="mt-3 font-display text-[clamp(2.5rem,5vw,4.25rem)] font-medium leading-tight text-textPrimary">
              Our Work So Far
            </h2>
          </div>

          {/* Horizontally translated track */}
          <div className="flex flex-1 items-center overflow-hidden">
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex gap-8 px-[12vw]"
            >
              {(projects as Project[]).map((project, i) => {
                const active = i === activeIdx;
                return (
                  <motion.a
                    key={project.title}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-glow glass group flex min-h-[400px] w-[78vw] shrink-0 flex-col rounded-3xl p-8 sm:w-[380px]"
                    animate={{
                      y: active ? -28 : 0,
                      scale: active ? 1 : 0.94,
                      opacity: active ? 1 : 0.6,
                    }}
                    transition={{ type: "spring", stiffness: 180, damping: 24 }}
                  >
                    <span className="section-eyebrow mb-5">
                      {String(i + 1).padStart(2, "0")} · Project
                    </span>

                    <h3 className="mb-4 font-display text-2xl leading-snug text-textPrimary sm:text-3xl">
                      {project.title}
                    </h3>

                    <p className="mb-auto text-sm leading-relaxed text-textSecondary line-clamp-5 sm:text-base">
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
          <div className="mb-4 flex shrink-0 items-center justify-center gap-5">
            <button
              onClick={() => goTo(-1)}
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
              onClick={() => goTo(1)}
              aria-label="Next project"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-textSecondary/20 bg-surface/50 text-textPrimary backdrop-blur transition-colors duration-300 hover:border-accent/50 hover:text-accent"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}