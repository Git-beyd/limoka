"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";

const ORBS = [
  { size: 600, color: "rgba(0,212,255,0.10)", x: "18%",  y: "40%", delay: 0 },
  { size: 500, color: "rgba(124,58,237,0.08)", x: "76%", y: "58%", delay: 2 },
  { size: 380, color: "rgba(0,212,255,0.07)", x: "50%",  y: "18%", delay: 4 },
];

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const { lang } = useLanguage();
  const t = translations.cta;

  const scale  = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.96]);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section ref={ref} id="contact" className="relative min-h-screen flex items-center justify-center overflow-hidden py-32">
      {/* Orbs */}
      {ORBS.map((orb, i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{ width: orb.size, height: orb.size, left: orb.x, top: orb.y,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: "blur(40px)", transform: "translate(-50%,-50%)" }}
          animate={{ scale: [1,1.15,1], opacity: [0.8,1,0.8] }}
          transition={{ duration: 6 + orb.delay, repeat: Infinity, delay: orb.delay, ease: "easeInOut" }}
          aria-hidden />
      ))}

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-10"
        style={{ backgroundImage: `linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 80%)" }}
        aria-hidden />

      {/* Scan lines */}
      {[30, 52, 72].map((top, i) => (
        <motion.div key={i} className="absolute left-0 right-0 h-px pointer-events-none"
          style={{ background: `linear-gradient(90deg, transparent, var(--scan-line), transparent)`, top: `${top}%` }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 1.5, ease: "easeInOut" }}
          aria-hidden />
      ))}

      <motion.div style={{ scale }} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="section-label mb-8">
          {t.label[lang]}
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-display-xl mb-8 leading-tight">
          {t.headline[lang][0]}
          <br />{t.headline[lang][1]}
          <br /><span className="gradient-text-hero">{t.headline[lang][2]}</span>
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg leading-relaxed font-light max-w-xl mx-auto mb-14" style={{ color: "var(--text-2)" }}>
          {t.sub[lang]}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagneticButton
            className="w-full sm:w-auto px-10 py-5 rounded-full text-base font-semibold transition-all duration-300"
            style={{ background: "linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)", color: "#030308",
              boxShadow: "0 0 40px rgba(0,212,255,0.4), 0 0 80px rgba(0,212,255,0.15)" }}
            as="a" href="#">
            {t.cta1[lang]}
          </MagneticButton>
          <MagneticButton
            className="w-full sm:w-auto px-10 py-5 rounded-full text-base font-medium transition-all duration-300"
            style={{ color: "var(--text-2)", border: "1px solid var(--border-2)", background: "var(--surface)", backdropFilter: "blur(12px)" }}
            as="a" href="#">
            {t.cta2[lang]}
          </MagneticButton>
        </motion.div>

        {/* Trust badges */}
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-6">
          {t.badges[lang].map((badge) => (
            <div key={badge} className="flex items-center gap-2 text-xs" style={{ color: "var(--text-3)" }}>
              <div className="w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: "rgba(0,212,255,0.12)", border: "1px solid rgba(0,212,255,0.2)" }}>
                <div className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
              </div>
              {badge}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
