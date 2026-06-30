"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Research", href: "#research" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? "glass py-3" : "py-6 bg-transparent"
      }`}
    >
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a
            href="#hero"
            className="text-xl font-bold tracking-wide text-textPrimary neon-glow-hover"
            style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic" }}
          >
            Abhishek Kumar Shakya
          </a>
          <ul className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/70 hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="text-[10px] font-mono uppercase tracking-[0.2em] px-5 py-2.5 rounded-full border border-white/10 text-white bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            Connect
          </a>
        </nav>
      </motion.header>
  );
}
