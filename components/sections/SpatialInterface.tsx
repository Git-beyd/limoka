"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";

const TX_ROWS = [
  {
    from: "M-Pesa",
    to: "Airtel Money",
    amount: "CDF 45 000",
    time: "0.031s",
    ok: true,
  },
  {
    from: "Rawbank",
    to: "EquityBCDC",
    amount: "USD 1,200",
    time: "0.048s",
    ok: true,
  },
  {
    from: "Orange Money",
    to: "Afrimoney",
    amount: "CDF 12 500",
    time: "0.029s",
    ok: true,
  },
  {
    from: "Illicocash",
    to: "Trust Merchant Bank",
    amount: "USD 250",
    time: "0.038s",
    ok: false,
  },
  {
    from: "DGI (Impôts)",
    to: "Banque Centrale",
    amount: "CDF 750 000",
    time: "0.041s",
    ok: true,
  },
];

const NODES = [
  { x: "18%", y: "22%", label: "Kinshasa", color: "#00d4ff" },
  { x: "45%", y: "14%", label: "Lubumbashi", color: "#7c3aed" },
  { x: "70%", y: "28%", label: "Goma", color: "#00d4ff" },
  { x: "28%", y: "64%", label: "Kisangani", color: "#f59e0b" },
  { x: "60%", y: "68%", label: "Bukavu", color: "#7c3aed" },
  { x: "80%", y: "52%", label: "Kananga", color: "#00d4ff" },
];
const CONNECTIONS = [
  [0, 1],
  [1, 2],
  [0, 3],
  [1, 4],
  [2, 5],
  [3, 4],
  [4, 5],
];
const CHART_BARS = [78, 92, 68, 95, 82, 88, 75, 97, 84, 91, 79, 96];

function LiveFeed({
  t,
  lang,
}: {
  t: typeof translations.spatial;
  lang: "fr" | "en";
}) {
  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h3
          className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: "var(--text-2)" }}
        >
          {t.tx.label[lang]}
        </h3>
        <div className="flex items-center gap-1.5">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-green-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-[0.65rem] text-green-400/70">
            {t.tx.live[lang]}
          </span>
        </div>
      </div>
      <div className="space-y-2">
        {TX_ROWS.map((tx, i) => {
          const getColor = (name: string) => {
            if (name.includes("Wave")) return "#3b82f6";
            if (name.includes("MTN")) return "#eab308";
            if (name.includes("Orange")) return "#f97316";
            if (name.includes("M-Pesa")) return "#22c55e";
            if (name.includes("Ecobank")) return "#06b6d4";
            if (name.includes("Moov")) return "#0ea5e9";
            return "var(--text-3)";
          };

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center justify-between py-2"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: tx.ok ? "#22c55e" : "#f59e0b",
                    boxShadow: `0 0 4px ${tx.ok ? "#22c55e" : "#f59e0b"}`,
                  }}
                />

                <div className="flex items-center gap-1.5">
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center text-[0.45rem] font-bold"
                    style={{
                      backgroundColor: `${getColor(tx.from)}20`,
                      color: getColor(tx.from),
                      border: `1px solid ${getColor(tx.from)}40`,
                    }}
                  >
                    {tx.from.charAt(0)}
                  </div>
                  <span
                    className="text-[0.6rem] font-mono"
                    style={{ color: "var(--text-2)" }}
                  >
                    {tx.from}
                  </span>
                </div>

                <span
                  style={{ color: "var(--text-3)" }}
                  className="text-[0.6rem]"
                >
                  →
                </span>

                <div className="flex items-center gap-1.5">
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center text-[0.45rem] font-bold"
                    style={{
                      backgroundColor: `${getColor(tx.to)}20`,
                      color: getColor(tx.to),
                      border: `1px solid ${getColor(tx.to)}40`,
                    }}
                  >
                    {tx.to.charAt(0)}
                  </div>
                  <span
                    className="text-[0.6rem] font-mono"
                    style={{ color: "var(--text-2)" }}
                  >
                    {tx.to}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[0.7rem] font-semibold text-[#00d4ff]">
                  {tx.amount}
                </div>
                <div
                  className="text-[0.6rem] font-mono"
                  style={{ color: "var(--text-3)" }}
                >
                  {tx.time}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function NetworkMap({
  t,
  lang,
}: {
  t: typeof translations.spatial;
  lang: "fr" | "en";
}) {
  return (
    <div className="p-5">
      <div
        className="text-xs font-semibold tracking-widest uppercase mb-4"
        style={{ color: "var(--text-2)" }}
      >
        {t.network.label[lang]}
      </div>
      <div
        className="relative h-44 rounded-xl overflow-hidden"
        style={{ background: "var(--surface)" }}
      >
        <svg className="absolute inset-0 w-full h-full">
          {CONNECTIONS.map(([a, b], i) => (
            <motion.line
              key={i}
              x1={NODES[a].x}
              y1={NODES[a].y}
              x2={NODES[b].x}
              y2={NODES[b].y}
              stroke="rgba(0,212,255,0.15)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
            />
          ))}
        </svg>
        {NODES.map((node, i) => (
          <motion.div
            key={node.label}
            className="absolute flex flex-col items-center gap-1"
            style={{
              left: node.x,
              top: node.y,
              transform: "translate(-50%,-50%)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring" }}
          >
            <motion.div
              className="w-2.5 h-2.5 rounded-full"
              style={{
                backgroundColor: node.color,
                boxShadow: `0 0 8px ${node.color}`,
              }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
            />
            <span
              className="text-[0.55rem] whitespace-nowrap"
              style={{ color: "var(--text-3)" }}
            >
              {node.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Analytics({
  t,
  lang,
}: {
  t: typeof translations.spatial;
  lang: "fr" | "en";
}) {
  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h3
          className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: "var(--text-2)" }}
        >
          {t.analytics.label[lang]}
        </h3>
        <span className="text-[0.65rem] text-[#00d4ff] font-mono">+12.4%</span>
      </div>
      <div className="flex items-end gap-1 h-20">
        {CHART_BARS.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-sm"
            style={{
              background:
                "linear-gradient(to top, rgba(0,212,255,0.7), rgba(124,58,237,0.3))",
            }}
            initial={{ scaleY: 0, originY: "bottom" }}
            whileInView={{ scaleY: h / 100 }}
            viewport={{ once: true }}
            transition={{
              delay: i * 0.05,
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function SpatialInterface() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const { lang } = useLanguage();
  const t = translations.spatial;

  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y3 = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 30% 50%, var(--glow-violet) 0%, transparent 60%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="mb-16 max-w-xl">
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
            className="font-display text-display-md leading-tight"
          >
            {t.headline[lang][0]}
            <br />
            <span className="gradient-text-violet">{t.headline[lang][1]}</span>
            <br />
            {t.headline[lang][2]}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-base leading-relaxed mt-4 font-light"
            style={{ color: "var(--text-2)" }}
          >
            {t.sub[lang]}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 items-start">
          <motion.div style={{ y: y1 }}>
            <GlassPanel
              glowColor="cyan"
              delay={0}
              className="rounded-2xl overflow-hidden"
            >
              <LiveFeed t={t} lang={lang} />
            </GlassPanel>
          </motion.div>
          <motion.div style={{ y: y2 }} className="lg:mt-10">
            <GlassPanel
              glowColor="violet"
              delay={0.15}
              className="rounded-2xl overflow-hidden"
            >
              <NetworkMap t={t} lang={lang} />
            </GlassPanel>
          </motion.div>
          <motion.div style={{ y: y3 }}>
            <GlassPanel
              glowColor="amber"
              delay={0.3}
              className="rounded-2xl overflow-hidden"
            >
              <Analytics t={t} lang={lang} />
            </GlassPanel>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
