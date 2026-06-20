declare module "*.css";

import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abhishek Kumar Shakya — AI Researcher & Engineer",
  description:
    "Building intelligent systems through research and engineering. AI, Machine Learning, Robotics, and Embedded Systems.",
  keywords: [
    "Abhishek Kumar Shakya",
    "AI Researcher",
    "Machine Learning Engineer",
    "Robotics",
    "MMMUT",
  ],
  openGraph: {
    title: "Abhishek Kumar Shakya — AI Researcher & Engineer",
    description:
      "Building intelligent systems through research and engineering.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-body bg-bg text-textPrimary antialiased">
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
