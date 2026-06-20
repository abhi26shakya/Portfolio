# Abhishek Kumar Shakya — Portfolio

A cinematic, research-lab-styled personal portfolio built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, GSAP, React Three Fiber, and tsParticles.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm run start
```

## Structure

- `app/` — Next.js App Router entry (`layout.tsx`, `page.tsx`, `globals.css`)
- `components/` — all section and UI components
- `data/profile.ts` — single source of truth for all personal content (edit this to update copy)
- `hooks/` — GSAP scroll-reveal and mouse-parallax hooks
- `public/Abhishek_Kumar_Shakya_CV.pdf` — file served by the "Download CV" buttons

## Notes

- Replace `public/Abhishek_Kumar_Shakya_CV.pdf` with an updated CV any time — the filename is referenced in `data/profile.ts` (`cvPath`).
- Edit `data/profile.ts` to update education, research, experience, projects, leadership, skills, or certifications without touching component code.
- Color tokens and fonts are defined in `tailwind.config.ts` and loaded in `app/layout.tsx`.
