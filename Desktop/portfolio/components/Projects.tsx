// components/Projects.tsx
"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Github } from "lucide-react";
import { projects } from "@/data/profile";

type Project = {
  title: string;
  description: string;
  tech: string[];
  link: string;
};

/**
 * Cinematic background for the section.
 * Uses a local image from /public if you have one (recommended),
 * otherwise falls back to an Unsplash deep-space image.
 * Drop a file at public/projects/work-bg.jpg to use your own.
 */
const BG_IMAGE = "/projects/work-bg.jpg";
const BG_FALLBACK =
  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2400&auto=format&fit=crop";

export default function Projects() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [bg, setBg] = useState(BG_IMAGE);

  // If the local image is missing, swap to the remote fallback.
  useEffect(() => {
    const img = new Image();
    img.src = BG_IMAGE;
    img.onerror = () => setBg(BG_FALLBACK);
  }, []);

  // Elevate whichever card sits closest to the horizontal centre.
  const updateActive = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const center = scroller.scrollLeft + scroller.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const cardCenter = el.offsetLeft + el.offsetWidth / 2;
      const dist = Math.abs(cardCenter - center);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActiveIdx(best);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    updateActive();
    scroller.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      scroller.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [updateActive]);

  const scrollByCard = (dir: 1 | -1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const card = cardRefs.current[0];
    const amount = card ? card.offsetWidth + 24 : 380;
    scroller.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section id="projects" className="relative isolate overflow-hidden bg-bg">
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

      <div className="relative z-10 py-32">
        {/* Heading */}
        <div className="mb-4 px-6 text-center">
          <span className="section-eyebrow">Builds</span>
          <h2 className="mt-3 font-display text-[clamp(2.5rem,5vw,4.25rem)] font-medium leading-tight text-textPrimary">
            Our Work So Far
          </h2>
        </div>

        {/* Horizontal carousel */}
        <div
          ref={scrollerRef}
          role="list"
          className="mt-12 flex gap-6 overflow-x-auto pb-10 pt-12 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {/* leading spacer lets the first card reach centre */}
          <div aria-hidden className="shrink-0 basis-[max(1.5rem,calc(50vw-210px))]" />

          {(projects as Project[]).map((project, i) => {
            const active = i === activeIdx;
            return (
              <motion.a
                key={project.title}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                role="listitem"
                className="card-glow glass group flex min-h-[400px] w-[84vw] shrink-0 flex-col rounded-3xl p-8 sm:w-[380px]"
                style={{ scrollSnapAlign: "center" }}
                animate={{
                  y: active ? -36 : 0,
                  scale: active ? 1 : 0.96,
                  opacity: active ? 1 : 0.72,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 26 }}
              >
                <span className="section-eyebrow mb-5">
                  {String(i + 1).padStart(2, "0")} · Project
                </span>

                <h3 className="mb-4 font-display text-3xl leading-snug text-textPrimary">
                  {project.title}
                </h3>

                <p className="mb-auto leading-relaxed text-textSecondary line-clamp-5">
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

          {/* trailing spacer lets the last card reach centre */}
          <div aria-hidden className="shrink-0 basis-[max(1.5rem,calc(50vw-210px))]" />
        </div>

        {/* Nav arrows + progress dots */}
        <div className="mt-10 flex items-center justify-center gap-5">
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
                className={`h-[7px] rounded-full transition-all duration-300 ${i === activeIdx ? "w-6 bg-accent" : "w-[7px] bg-textSecondary/30"
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
    </section>
  );
}