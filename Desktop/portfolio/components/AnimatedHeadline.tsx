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
      className="font-light text-white text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] leading-[1.15] tracking-normal max-w-4xl mx-auto"
      style={{ fontFamily: "var(--font-cormorant)" }}
    >
      Thinking at the edge of what&#x27;s{" "}
      <span className="relative inline-block text-left align-baseline ml-2 sm:ml-3 w-[145px] sm:w-[190px] md:w-[240px] lg:w-[320px]">
        <AnimatePresence mode="wait">
          <motion.span
            key={WORDS[i]}
            initial={{ opacity: 0, y: "0.3em", filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: "-0.3em", filter: "blur(6px)" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-block headline-shimmer font-semibold"
          >
            {WORDS[i]}.
          </motion.span>
        </AnimatePresence>
      </span>
    </motion.h1>
  );
}
