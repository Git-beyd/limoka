"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";

const wordVariants = {
  hidden: { y: "110%", opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.6 + i * 0.14,
      duration: 1,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const { lang } = useLanguage();
  const t = translations.hero;

  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const y = useTransform(scrollY, [0, 500], [0, -60]);

  const words = t.words[lang];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      aria-label={lang === "fr" ? "Section héro" : "Hero section"}
    >
      {/* Ambient bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 62% 50%, var(--glow-cyan) 0%, var(--glow-violet) 45%, transparent 75%)",
        }}
        aria-hidden
      />
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 62% 50%, black 30%, transparent 80%)",
        }}
        aria-hidden
      />

      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12"
        style={{ opacity, y }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-6 items-center min-h-[calc(100vh-5rem)]">
          {/* LEFT: Text */}
          <div className="flex flex-col justify-center py-16 lg:py-0">
            {/* Live badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex items-center gap-2 mb-8"
            >
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d4ff] opacity-50" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00d4ff]" />
              </span>
              <span className="section-label">{t.badge[lang]}</span>
            </motion.div>

            {/* Headline — 3 animated words */}
            <h1
              className="font-display leading-none mb-6"
              aria-label={words.join(" ")}
            >
              {words.map((word, i) => (
                <span key={word} className="block overflow-hidden">
                  <motion.span
                    custom={i}
                    variants={wordVariants}
                    initial="hidden"
                    animate="visible"
                    className="block"
                    style={{
                      fontSize: "clamp(2.5rem, 6vw, 6.5rem)",
                      fontWeight: 700,
                      letterSpacing: "-0.03em",
                      lineHeight: 0.93,
                      ...(i === 0 && { color: "var(--text)" }),
                      ...(i === 1 && {
                        background: "linear-gradient(135deg, #00d4ff, #0099cc)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }),
                      ...(i === 2 && {
                        background: "linear-gradient(135deg, #a855f7, #7c3aed)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }),
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.2,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-lg leading-relaxed font-light mb-10 max-w-lg"
              style={{ color: "var(--text-2)" }}
            >
              {t.sub[lang]}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.45,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-wrap gap-3"
            >
              <MagneticButton
                className="px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #00d4ff, #0099cc)",
                  color: "#030308",
                  boxShadow: "0 0 30px rgba(0,212,255,0.35)",
                }}
                href="#platform"
                as="a"
              >
                {t.cta1[lang]}
              </MagneticButton>
              <MagneticButton
                className="px-8 py-4 rounded-full text-sm font-medium transition-all duration-300"
                style={{
                  color: "var(--text-2)",
                  border: "1px solid var(--border-2)",
                  background: "var(--surface)",
                }}
                href="#features"
                as="a"
              >
                {t.cta2[lang]}
              </MagneticButton>
            </motion.div>

            {/* Scroll cue */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="flex items-center gap-3 mt-14"
            >
              <div
                className="relative h-12 w-px overflow-hidden"
                style={{ background: "var(--border-2)" }}
              >
                <motion.div
                  className="absolute top-0 left-0 w-full rounded-full bg-[#00d4ff]"
                  style={{ height: "40%" }}
                  animate={{ y: [0, 34, 0] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
              <span
                className="text-xs tracking-widest uppercase"
                style={{ color: "var(--text-3)" }}
              >
                {t.scroll[lang]}
              </span>
            </motion.div>
          </div>

          {/* RIGHT: Image Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -15, 0], // Floating animation
            }}
            transition={{
              opacity: { delay: 0.4, duration: 1.4, ease: [0.16, 1, 0.3, 1] },
              scale: { delay: 0.4, duration: 1.4, ease: [0.16, 1, 0.3, 1] },
              y: {
                delay: 1.8, // Start floating after entrance
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="relative flex items-center justify-center h-full w-full"
            aria-hidden
          >
            {/* Soft backdrop glow behind image */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(0,212,255,0.15) 0%, rgba(124,58,237,0.1) 50%, transparent 80%)",
                filter: "blur(40px)",
                transform: "scale(1.2)",
              }}
            />

            <div className="relative w-full flex justify-center items-center z-10">
              <Image
                src="/hero.png"
                alt="Limoka Hub Network"
                width={700}
                height={500}
                className="object-contain drop-shadow-[0_0_30px_rgba(0,212,255,0.2)]"
                priority
                unoptimized
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
