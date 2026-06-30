// components/Navbar.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
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
          
          {/* Desktop links */}
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
          
          <div className="flex items-center gap-4">
            {/* Desktop Connect button */}
            <a
              href="#contact"
              className="hidden md:inline-block text-[10px] font-mono uppercase tracking-[0.2em] px-5 py-2.5 rounded-full border border-white/10 text-white bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              Connect
            </a>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex items-center justify-center p-2 text-white/80 hover:text-white transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Glass Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 md:hidden flex flex-col justify-center items-center bg-slate-950/98 backdrop-blur-2xl px-6 py-24"
          >
            <ul className="flex flex-col gap-6 text-center">
              {links.map((link, idx) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <a
                    onClick={() => setMenuOpen(false)}
                    href={link.href}
                    className="text-xl font-display uppercase tracking-[0.25em] text-white/80 hover:text-white transition-colors duration-300 font-light block py-2"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.05 }}
                className="pt-6"
              >
                <a
                  onClick={() => setMenuOpen(false)}
                  href="#contact"
                  className="text-xs font-mono uppercase tracking-[0.2em] px-8 py-3.5 rounded-full border border-white/20 text-white bg-white/5 backdrop-blur hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                >
                  Connect
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
