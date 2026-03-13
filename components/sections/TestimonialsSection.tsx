"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";

const COLORS = ["#00d4ff", "#7c3aed", "#f59e0b", "#00d4ff"] as const;
const GLOW: ("cyan" | "violet" | "amber")[] = [
  "cyan",
  "violet",
  "amber",
  "cyan",
];

export function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const isInView = useInView(ref, { once: true, margin: "-15%" });
  const { lang } = useLanguage();
  const t = translations.testimonials;
  const items = t.items;

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 70% 50%, var(--glow-violet) 0%, transparent 60%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="section-label mb-6"
          >
            {t.label[lang]}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-display-md"
          >
            {t.headline[lang][0]}
            <br />
            <span className="gradient-text-violet">{t.headline[lang][1]}</span>
          </motion.h2>
        </div>

        {/* Featured quote */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto mb-12"
          >
            <GlassPanel glowColor={GLOW[active]}>
              <div className="p-10 text-center">
                <div
                  className="font-display text-8xl leading-none mb-2 opacity-20 font-bold"
                  style={{ color: COLORS[active] }}
                >
                  &ldquo;
                </div>
                <p
                  className="text-xl leading-relaxed font-light mb-8 italic"
                  style={{ color: "var(--text-2)" }}
                >
                  {items[active].quote[lang]}
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-sm"
                    style={{
                      background: `${COLORS[active]}15`,
                      border: `1px solid ${COLORS[active]}30`,
                      color: COLORS[active],
                    }}
                  >
                    {items[active].avatar}
                  </div>
                  <div className="text-left">
                    <div
                      className="font-semibold text-sm"
                      style={{ color: "var(--text)" }}
                    >
                      {items[active].author}
                    </div>
                    <div className="text-xs" style={{ color: "var(--text-2)" }}>
                      {items[active].title[lang]}
                    </div>
                    <div
                      className="text-[0.65rem] mt-0.5"
                      style={{ color: COLORS[active] }}
                    >
                      {items[active].region}
                    </div>
                  </div>
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex justify-center gap-3 mb-10">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Témoignage ${i + 1}`}
              className="group p-2"
            >
              <div
                className="rounded-full transition-all duration-300 relative"
                style={{
                  width: i === active ? 32 : 8,
                  height: 8,
                  backgroundColor: i === active ? COLORS[i] : "var(--border-2)",
                }}
              >
                {i === active && (
                  <div
                    className="absolute inset-0 rounded-full animate-ping opacity-50"
                    style={{ backgroundColor: COLORS[i] }}
                  />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Cards row */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.2 + i * 0.08,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-left p-4 rounded-xl transition-all duration-300"
              style={{
                background: i === active ? `${COLORS[i]}08` : "var(--surface)",
                border: `1px solid ${i === active ? COLORS[i] + "25" : "var(--border)"}`,
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-3"
                style={{ background: `${COLORS[i]}15`, color: COLORS[i] }}
              >
                {item.avatar}
              </div>
              <div
                className="text-xs font-medium"
                style={{ color: "var(--text-2)" }}
              >
                {item.author}
              </div>
              <div
                className="text-[0.6rem] mt-0.5"
                style={{ color: "var(--text-3)" }}
              >
                {item.region.split(" / ")[0]}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
