"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";

const METRIC_DATA = [
  { value: 99.99, prefix: "", suffix: "%", decimals: 2, color: "#00d4ff" },
  { value: 50, prefix: "<", suffix: "ms", decimals: 0, color: "#7c3aed" },
  { value: 10, prefix: "", suffix: "M+", decimals: 0, color: "#f59e0b" },
  { value: 2, prefix: "$", suffix: "B+", decimals: 0, color: "#00d4ff" },
];

const CHART_DATA = [
  [55, 62, 58, 71, 68, 75, 73, 82, 79, 88, 85, 92],
  [42, 55, 50, 63, 60, 72, 69, 78, 76, 84, 82, 90],
  [68, 72, 70, 78, 76, 83, 81, 87, 85, 91, 89, 95],
];
const CHART_COLORS = ["#00d4ff", "#7c3aed", "#f59e0b"];
const MONTHS_FR = [
  "Jan",
  "Fév",
  "Mar",
  "Avr",
  "Mai",
  "Jun",
  "Jul",
  "Aoû",
  "Sep",
  "Oct",
  "Nov",
  "Déc",
];
const MONTHS_EN = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function MetricsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });
  const { lang } = useLanguage();
  const t = translations.metrics;

  return (
    <section ref={ref} id="metrics" className="relative py-32 overflow-hidden">
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, var(--glow-cyan) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
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
            <span className="gradient-text-cyan">{t.headline[lang][1]}</span>
          </motion.h2>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {METRIC_DATA.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: i * 0.1,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative p-6 rounded-2xl text-center group"
              style={{
                background: "var(--surface)",
                border: `1px solid ${m.color}15`,
              }}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${m.color}10 0%, transparent 60%)`,
                }}
              />
              <div
                className="font-display text-4xl lg:text-5xl font-bold mb-2"
                style={{ color: m.color, textShadow: `0 0 30px ${m.color}50` }}
              >
                <AnimatedCounter
                  trigger={isInView}
                  value={m.value}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  decimals={m.decimals}
                  duration={2.5}
                />
              </div>
              <div
                className="text-sm font-medium"
                style={{ color: "var(--text-2)" }}
              >
                {t.items[i].label[lang]}
              </div>
              <div className="text-xs mt-1" style={{ color: "var(--text-3)" }}>
                {t.items[i].sub[lang]}
              </div>
              <div
                className="absolute bottom-0 left-6 right-6 h-px rounded-full"
                style={{
                  background: `linear-gradient(90deg, transparent, ${m.color}30, transparent)`,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl overflow-hidden p-8"
          style={{
            background: "var(--surface)",
            border: "1px solid rgba(0,212,255,0.08)",
          }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <div
                className="text-sm font-semibold mb-1"
                style={{ color: "var(--text-2)" }}
              >
                {t.chart.label[lang]}
              </div>
              <div className="text-xs" style={{ color: "var(--text-3)" }}>
                {t.chart.sub[lang]}
              </div>
            </div>
            <div className="flex items-center gap-4">
              {t.chart.legend[lang].map((lbl, i) => (
                <div key={lbl} className="flex items-center gap-1.5">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: CHART_COLORS[i] }}
                  />
                  <span className="text-xs" style={{ color: "var(--text-3)" }}>
                    {lbl}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-40">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 40"
              preserveAspectRatio="none"
            >
              {[25, 50, 75].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={y / 2.5}
                  x2="100"
                  y2={y / 2.5}
                  stroke="var(--border)"
                  strokeWidth="0.5"
                />
              ))}
              {CHART_DATA.map((data, li) => {
                const pts = data
                  .map(
                    (v, i) =>
                      `${(i / (data.length - 1)) * 100},${40 - (v / 100) * 40}`,
                  )
                  .join(" ");
                return (
                  <motion.polyline
                    key={li}
                    points={pts}
                    fill="none"
                    stroke={CHART_COLORS[li]}
                    strokeWidth="0.8"
                    strokeOpacity="0.7"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{
                      delay: 0.5 + li * 0.2,
                      duration: 1.5,
                      ease: "easeOut",
                    }}
                  />
                );
              })}
            </svg>
            <div className="absolute bottom-[-20px] left-0 right-0 flex justify-between">
              {(lang === "fr" ? MONTHS_FR : MONTHS_EN).map((m) => (
                <span
                  key={m}
                  className="text-[0.55rem]"
                  style={{ color: "var(--text-3)" }}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
