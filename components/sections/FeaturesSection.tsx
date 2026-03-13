"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";

const GLOBE_DOTS = [
  { left: "25%", top: "22%", duration: 1.8, delay: 0 },
  { left: "72%", top: "35%", duration: 2.1, delay: 0.4 },
  { left: "40%", top: "70%", duration: 1.6, delay: 0.8 },
  { left: "65%", top: "68%", duration: 2.3, delay: 0.2 },
  { left: "30%", top: "50%", duration: 1.9, delay: 1.0 },
];

function SpeedVisual({ stat }: { stat: string }) {
  return (
    <div className="relative h-28 flex items-center justify-center overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <motion.div key={i} className="absolute h-px rounded-full"
          style={{ width: 60 + i * 28, background: `linear-gradient(90deg, transparent, rgba(0,212,255,${0.55 - i * 0.08}), transparent)`, top: `${18 + i * 14}%` }}
          animate={{ x: [-200, 200] }}
          transition={{ duration: 1.2 - i * 0.15, repeat: Infinity, delay: i * 0.2, ease: "linear" }} />
      ))}
      <div className="relative z-10 font-display text-4xl font-bold text-[#00d4ff] glow-text-cyan">{stat}</div>
    </div>
  );
}

function ShieldVisual() {
  return (
    <div className="relative h-28 flex items-center justify-center">
      {[...Array(3)].map((_, i) => (
        <motion.div key={i} className="absolute rounded-full border"
          style={{ width: 50 + i * 34, height: 50 + i * 34, borderColor: `rgba(124,58,237,${0.4 - i * 0.1})` }}
          animate={{ scale: [1, 1.06, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.3 }} />
      ))}
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="relative text-violet-500">
        <rect x="6" y="14" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="rgba(124,58,237,0.15)" />
        <path d="M10 14V10C10 6.686 12.686 4 16 4C19.314 4 22 6.686 22 10V14" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16" cy="21" r="2" fill="currentColor" />
      </svg>
    </div>
  );
}

function GlobeVisual({ stat }: { stat: string }) {
  return (
    <div className="relative h-28 flex items-center justify-center">
      <motion.div className="w-20 h-20 rounded-full border border-amber/30 flex items-center justify-center"
        animate={{ rotateY: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ transformStyle: "preserve-3d" }}>
        <div className="absolute inset-0 rounded-full border border-amber/15" style={{ transform: "rotateX(60deg)" }} />
        <div className="absolute inset-0 rounded-full border border-amber/15" style={{ transform: "rotateX(-60deg)" }} />
        <div className="text-amber text-xl font-display font-bold">{stat}</div>
      </motion.div>
      {GLOBE_DOTS.map((dot, i) => (
        <motion.div key={i} className="absolute w-1.5 h-1.5 rounded-full bg-amber"
          style={{ left: dot.left, top: dot.top }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: dot.duration, repeat: Infinity, delay: dot.delay }} />
      ))}
    </div>
  );
}

function CheckVisual({ stat }: { stat: string; steps: string[] }) {
  const steps = ["01", "02", "03", "04"];
  return (
    <div className="relative h-28 flex items-center justify-center">
      <div className="flex items-center gap-3">
        {steps.map((s, i) => (
          <motion.div key={s} initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: i * 0.15, type: "spring" }}
            className="flex flex-col items-center gap-1.5">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold font-mono"
              style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", color: "#00d4ff" }}>
              {s}
            </div>
            {i < steps.length - 1 && (
              <div className="absolute" style={{ top: "50%", left: `calc(${(i + 0.5) / steps.length * 100}% + 18px)`, width: 20, height: 1, background: "rgba(0,212,255,0.2)" }} />
            )}
          </motion.div>
        ))}
        <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.6, type: "spring" }}
          className="ml-2 font-display text-2xl font-bold text-[#00d4ff]">
          {stat}
        </motion.div>
      </div>
    </div>
  );
}

const COLORS = ["#00d4ff", "#7c3aed", "#f59e0b", "#00d4ff"] as const;
const GLOW_COLORS = ["cyan", "violet", "amber", "cyan"] as const;

export function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const { lang } = useLanguage();
  const t = translations.features;

  const visuals = [
    <SpeedVisual key="speed" stat={t.items[0].stat[lang]} />,
    <ShieldVisual key="shield" />,
    <GlobeVisual key="globe" stat={t.items[2].stat[lang]} />,
    <CheckVisual key="check" stat={t.items[3].stat[lang]} steps={[]} />,
  ];

  return (
    <section ref={ref} id="features" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 50% at 50% 0%, var(--glow-cyan) 0%, transparent 60%)" }}
        aria-hidden />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="section-label mb-6">
            {t.label[lang]}
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="font-display text-display-md">
            {t.headline[lang][0]}
            <br />
            <span className="gradient-text-cyan">{t.headline[lang][1]}</span>
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {t.items.map((item, i) => (
            <GlassPanel key={i} glowColor={GLOW_COLORS[i]} delay={i * 0.1} className="h-full">
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <span className="text-[0.65rem] font-medium tracking-[0.2em] uppercase"
                    style={{ color: `${COLORS[i]}99` }}>
                    {item.label[lang]}
                  </span>
                  <div className="text-right">
                    <div className="font-display text-2xl font-bold" style={{ color: COLORS[i] }}>{item.stat[lang]}</div>
                    <div className="text-[0.6rem] uppercase tracking-wider mt-0.5" style={{ color: "var(--text-3)" }}>{item.statLabel[lang]}</div>
                  </div>
                </div>

                {visuals[i]}

                <div className="mt-6 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
                  <h3 className="font-display text-2xl font-bold mb-3 whitespace-pre-line" style={{ color: COLORS[i] }}>
                    {item.headline[lang]}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
                    {item.description[lang]}
                  </p>
                </div>
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}
