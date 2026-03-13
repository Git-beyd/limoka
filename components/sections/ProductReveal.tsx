"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";

function DashboardMockup({ lang }: { lang: "fr" | "en" }) {
  const t = translations.platform;
  const stats = [
    {
      label: t.volumeLabel[lang],
      value: "$2.4B",
      change: "+12.4%",
      color: "#00d4ff",
    },
    {
      label: t.txLabel[lang],
      value: "10.2M",
      change: "+8.1%",
      color: "#7c3aed",
    },
    {
      label: t.successLabel[lang],
      value: "99.97%",
      change: "+0.02%",
      color: "#f59e0b",
    },
  ];

  const txRows = [
    {
      from: "Wave",
      to: "MTN MoMo",
      amount: "XOF 45 000",
      time: "0.031s",
      ok: true,
    },
    {
      from: "Ecobank",
      to: "UBA Bank",
      amount: "NGN 1.2M",
      time: "0.048s",
      ok: true,
    },
    {
      from: "Orange",
      to: "Airtel Money",
      amount: "KES 12 500",
      time: "0.029s",
      ok: false,
    },
  ];

  return (
    <div
      className="rounded-3xl overflow-hidden p-6"
      style={{
        background: "var(--glass-bg-strong)",
        border: "1px solid var(--glass-border-strong)",
        backdropFilter: "blur(40px)",
      }}
    >
      {/* Titlebar */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-3 h-3 rounded-full bg-red-400/40" />
        <div className="w-3 h-3 rounded-full bg-yellow-400/40" />
        <div className="w-3 h-3 rounded-full bg-green-400/40" />
        <div
          className="flex-1 mx-4 h-5 rounded"
          style={{ background: "var(--surface-2)" }}
        >
          <span
            className="text-[0.65rem] font-mono px-3 leading-5 block"
            style={{ color: "var(--text-3)" }}
          >
            admin.limoka-rdc.org/dashboard
          </span>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl p-4"
            style={{ background: "var(--surface)" }}
          >
            <div
              className="text-[0.6rem] uppercase tracking-wider mb-2"
              style={{ color: "var(--text-3)" }}
            >
              {s.label}
            </div>
            <div
              className="text-xl font-display font-bold"
              style={{ color: s.color }}
            >
              {s.value}
            </div>
            <div className="text-[0.65rem] text-green-400/70 mt-1">
              {s.change}
            </div>
          </div>
        ))}
      </div>

      {/* Mini chart */}
      <div
        className="rounded-xl p-4 mb-4"
        style={{ background: "var(--surface)" }}
      >
        <div className="text-xs mb-3" style={{ color: "var(--text-3)" }}>
          {t.chartLabel[lang]}
        </div>
        <div className="flex items-end gap-1 h-14">
          {[
            40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88, 72, 92, 68, 98, 80,
            94, 78, 100, 82, 96, 76, 91,
          ].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm"
              style={{
                height: `${h}%`,
                background: `linear-gradient(to top, rgba(0,212,255,0.6), rgba(0,212,255,0.1))`,
                opacity: 0.6 + (i / 24) * 0.4,
              }}
            />
          ))}
        </div>
      </div>

      {/* Live feed */}
      <div className="space-y-2">
        {txRows.map((tx, i) => {
          // Determine a color based on the institution name for a more visual feel
          const getColor = (name: string) => {
            if (name.includes("Wave")) return "#3b82f6"; // blue
            if (name.includes("MTN")) return "#eab308"; // yellow
            if (name.includes("Orange")) return "#f97316"; // orange
            if (name.includes("M-Pesa")) return "#22c55e"; // green
            if (name.includes("Ecobank")) return "#06b6d4"; // cyan
            return "var(--text-3)";
          };

          return (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-lg"
              style={{ background: "var(--surface)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: tx.ok ? "#22c55e" : "#f59e0b",
                    boxShadow: `0 0 6px ${tx.ok ? "#22c55e" : "#f59e0b"}`,
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
                    className="text-xs font-mono"
                    style={{ color: "var(--text-2)" }}
                  >
                    {tx.from}
                  </span>
                </div>

                <span style={{ color: "var(--text-3)" }} className="text-xs">
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
                    className="text-xs font-mono"
                    style={{ color: "var(--text-2)" }}
                  >
                    {tx.to}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#00d4ff]">
                  {tx.amount}
                </span>
                <span
                  className="text-[0.6rem] font-mono"
                  style={{ color: "var(--text-3)" }}
                >
                  {tx.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ProductReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const { lang } = useLanguage();
  const t = translations.platform;

  const yMockup = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" });

  const callouts = [
    {
      label: lang === "fr" ? "Transfert instantané" : "Instant Transfer",
      value: "<50ms",
      position: "top-[12%] right-[-4%]",
      color: "#00d4ff",
    },
    {
      label: lang === "fr" ? "Présence mondiale" : "Global Reach",
      value: "190+ pays",
      position: "bottom-[18%] left-[-6%]",
      color: "#7c3aed",
    },
    {
      label: "Uptime SLA",
      value: "99.99%",
      position: "top-[55%] right-[-8%]",
      color: "#f59e0b",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="platform"
      className="relative py-32 overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, var(--glow-violet) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left: text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-label mb-6">{t.label[lang]}</div>
            <h2 className="font-display text-display-lg mb-6 leading-tight">
              {t.headline[lang][0]}
              <br />
              <span className="gradient-text-violet">
                {t.headline[lang][1]}
              </span>
            </h2>
            <p
              className="text-lg leading-relaxed mb-8 max-w-md font-light"
              style={{ color: "var(--text-2)" }}
            >
              {t.sub[lang]}
            </p>
            <div className="space-y-4">
              {t.features[lang].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    delay: 0.2 + i * 0.1,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex items-center gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] shadow-[0_0_6px_#00d4ff] flex-shrink-0" />
                  <span className="text-sm" style={{ color: "var(--text-2)" }}>
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: dashboard */}
        <motion.div style={{ y: yMockup }} className="relative">
          <DashboardMockup lang={lang} />
          {callouts.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.3 + i * 0.15,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`absolute ${c.position} rounded-xl px-4 py-3 min-w-[140px]`}
              style={{
                background: "var(--glass-bg-strong)",
                border: `1px solid ${c.color}20`,
                backdropFilter: "blur(20px)",
              }}
            >
              <div
                className="text-[0.6rem] uppercase tracking-widest mb-1"
                style={{ color: `${c.color}99` }}
              >
                {c.label}
              </div>
              <div
                className="text-lg font-display font-bold"
                style={{ color: c.color }}
              >
                {c.value}
              </div>
              <div
                className="absolute w-2 h-2 rounded-full -right-1 top-1/2 -translate-y-1/2"
                style={{
                  backgroundColor: c.color,
                  boxShadow: `0 0 8px ${c.color}`,
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
