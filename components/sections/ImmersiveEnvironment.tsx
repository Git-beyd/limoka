"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";

const NetworkScene = dynamic(
  () => import("@/components/three/NetworkScene").then((m) => m.NetworkScene),
  { ssr: false, loading: () => null }
);

const LIGHT_DOTS = [
  { size: 4, color: "#00d4ff", left: "18%", top: "25%", yKeys: [0,-30,0,20,0], xKeys: [0,15,-10,5,0], dur: 9 },
  { size: 5, color: "#7c3aed", left: "30%", top: "65%", yKeys: [0,20,0,-25,0], xKeys: [0,-12,8,-4,0], dur: 11 },
  { size: 3, color: "#00d4ff", left: "55%", top: "20%", yKeys: [0,-20,0,15,0], xKeys: [0,8,-15,3,0],  dur: 8 },
  { size: 6, color: "#f59e0b", left: "72%", top: "55%", yKeys: [0,25,0,-20,0], xKeys: [0,-10,12,-6,0], dur: 12 },
  { size: 3, color: "#7c3aed", left: "85%", top: "30%", yKeys: [0,-15,0,18,0], xKeys: [0,10,-8,4,0],  dur: 10 },
  { size: 4, color: "#00d4ff", left: "45%", top: "75%", yKeys: [0,18,0,-22,0], xKeys: [0,-8,14,-5,0], dur: 13 },
];

export function ImmersiveEnvironment() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const { lang } = useLanguage();
  const t = translations.network;

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale   = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section ref={ref} id="network" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D background */}
      <div className="absolute inset-0" aria-hidden>
        <NetworkScene className="w-full h-full" />
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, transparent 20%, var(--bg) 80%)" }} />
      </div>

      {/* Floating light particles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {LIGHT_DOTS.map((d, i) => (
          <motion.div key={i} className="absolute rounded-full"
            style={{ width: d.size, height: d.size, backgroundColor: d.color, left: d.left, top: d.top,
              boxShadow: `0 0 ${d.size * 3}px ${d.color}` }}
            animate={{ y: d.yKeys, x: d.xKeys, opacity: [0.3, 0.8, 0.5, 0.9, 0.3] }}
            transition={{ duration: d.dur, repeat: Infinity, delay: i * 1.2, ease: "easeInOut" }} />
        ))}
      </div>

      <motion.div style={{ opacity, scale }} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="section-label mb-8">
          {t.label[lang]}
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-display-xl mb-8 leading-tight">
          {t.headline[lang][0]}
          <br /><span className="gradient-text-hero">{t.headline[lang][1]}</span>
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg leading-relaxed font-light mb-12 max-w-2xl mx-auto" style={{ color: "var(--text-2)" }}>
          {t.sub[lang]}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap justify-center gap-10">
          {t.stats[lang].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl font-bold mb-1 gradient-text-cyan">{stat.value}</div>
              <div className="text-xs tracking-widest uppercase" style={{ color: "var(--text-3)" }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
