"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = ["known", "possible", "imagined", "built"];

export default function AnimatedHeadline() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % WORDS.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.h1
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 0.2, ease: "easeOut" }}
      className="font-light text-textPrimary text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] leading-[1.15] tracking-normal max-w-4xl mx-auto"
      style={{ fontFamily: "var(--font-cormorant)" }}
    >
      Thinking at the edge of what&#x27;s{" "}
      <span className="relative inline-block align-baseline ml-2 sm:ml-3">
        <AnimatePresence mode="wait">
          <motion.span
            key={WORDS[i]}
            initial={{ opacity: 0, y: "0.25em", filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: "-0.25em", filter: "blur(4px)" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="inline-block bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent font-medium pb-2 pr-1"
          >
            {WORDS[i]}.
          </motion.span>
        </AnimatePresence>
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 200, damping: 24 }}
          className="absolute left-0 bottom-1 h-[2px] w-[calc(100%-4px)] rounded-full bg-gradient-to-r from-accent to-accent2 shadow-[0_0_8px_rgba(56,189,248,0.4)] pointer-events-none"
        />
      </span>
    </motion.h1>
  );
}
