"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { skills } from "@/data/profile";

function NetworkPanel({
  category,
  items,
  delay,
}: {
  category: string;
  items: string[];
  delay: number;
}) {
  const width = 320;
  const height = 220;
  const center = { x: width / 2, y: 36 };

  const nodePositions = items.map((_, i) => {
    const cols = Math.ceil(items.length / 2);
    const row = Math.floor(i / cols);
    const col = i % cols;
    const spacingX = width / (cols + 1);
    return {
      x: spacingX * (col + 1),
      y: 110 + row * 56,
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay }}
      className="card-glow rounded-2xl glass p-6"
    >
      <p className="font-display text-xl sm:text-2xl text-textPrimary mb-2">
        {category}
      </p>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        {nodePositions.map((pos, i) => (
          <motion.line
            key={`line-${i}`}
            x1={center.x}
            y1={center.y}
            x2={pos.x}
            y2={pos.y}
            stroke="#38bdf8"
            strokeOpacity={0.35}
            strokeWidth={1}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.35 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: delay + i * 0.07 }}
          />
        ))}

        <motion.circle
          cx={center.x}
          cy={center.y}
          r={7}
          fill="#8b5cf6"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay }}
        />
        <motion.circle
          cx={center.x}
          cy={center.y}
          r={14}
          fill="none"
          stroke="#8b5cf6"
          strokeOpacity={0.4}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, delay }}
        />

        {nodePositions.map((pos, i) => (
          <g key={`node-${i}`}>
            <motion.circle
              cx={pos.x}
              cy={pos.y}
              r={4.5}
              fill="#38bdf8"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: delay + i * 0.07 + 0.3 }}
            />
            <motion.text
              x={pos.x}
              y={pos.y + 18}
              textAnchor="middle"
              fontSize="10.5"
              fill="#94a3b8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: delay + i * 0.07 + 0.4 }}
            >
              {items[i]}
            </motion.text>
          </g>
        ))}
      </svg>
    </motion.div>
  );
}

export default function Skills() {
  const categories = Object.entries(skills);

  return (
    <section id="skills" className="relative py-32 px-6 bg-bg">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="Capability" title="Skills" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {categories.map(([category, items], i) => (
            <NetworkPanel
              key={category}
              category={category}
              items={items}
              delay={i * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
