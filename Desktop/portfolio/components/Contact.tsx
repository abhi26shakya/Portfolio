"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Phone, Download } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { personalInfo } from "@/data/profile";

const links = [
  {
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "abhishek-shakya-42bab8212",
    href: personalInfo.linkedin,
    icon: Linkedin,
  },
  {
    label: "GitHub",
    value: "abhi26shakya",
    href: personalInfo.github,
    icon: Github,
  },
  {
    label: "Phone",
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone.replace(/\s/g, "")}`,
    icon: Phone,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-32 px-6 bg-bg overflow-hidden"
    >
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-accent/10 blur-3xl"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <div className="max-w-4xl mx-auto relative z-10">
        <SectionHeading eyebrow="Let's Talk" title="Get in Touch" align="center" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center text-textSecondary text-lg mt-8 max-w-xl mx-auto"
        >
          Open to research collaborations, internships, and conversations at
          the edge of AI, robotics, and embedded systems.
        </motion.p>

        <div className="grid sm:grid-cols-2 gap-5 mt-14">
          {links.map((link, i) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.label === "LinkedIn" || link.label === "GitHub" ? "_blank" : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="card-glow glass rounded-xl p-5 flex items-center gap-4"
              >
                <div className="p-2.5 rounded-lg bg-accent2/10 text-accent2">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest2 text-textSecondary">
                    {link.label}
                  </p>
                  <p className="text-textPrimary mt-1 text-sm sm:text-base break-all">
                    {link.value}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mt-14"
        >
          <a
            href={personalInfo.cvPath}
            download
            className="px-8 py-3.5 rounded-full bg-accent text-bg font-medium text-sm tracking-wide flex items-center gap-2 hover:bg-accent/90 transition-colors duration-300"
          >
            <Download className="w-4 h-4" /> Download CV
          </a>
        </motion.div>
      </div>
    </section>
  );
}
