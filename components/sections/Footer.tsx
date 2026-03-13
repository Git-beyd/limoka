"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";

export function Footer() {
  const { lang } = useLanguage();
  const t = translations.footer;
  const links = t.links[lang];

  return (
    <footer
      className="relative overflow-hidden"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, var(--glow-cyan) 0%, transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: `linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="Limoka Logo"
                  fill
                  className="object-contain drop-shadow-[0_0_8px_rgba(0,212,255,0.4)]"
                />
              </div>
              <span
                className="font-display font-bold text-[1.1rem] tracking-wider"
                style={{
                  background: `linear-gradient(135deg, var(--text) 0%, #00d4ff 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                LIMOKA
              </span>
            </div>
            <p
              className="text-sm leading-relaxed max-w-xs mb-6"
              style={{ color: "var(--text-3)" }}
            >
              {t.tagline[lang]}
            </p>
            <div className="flex items-center gap-1.5">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-green-400"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-xs text-green-400/60">
                {t.status[lang]}
              </span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([cat, items]) => (
            <div key={cat}>
              <h3
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "var(--text-3)" }}
              >
                {cat}
              </h3>
              <ul className="space-y-3">
                {(items as string[]).map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm transition-colors duration-200"
                      style={{ color: "var(--text-3)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--text-2)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--text-3)")
                      }
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          className="h-px mb-8"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0,212,255,0.15), rgba(124,58,237,0.15), transparent)",
          }}
        />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "var(--text-3)" }}>
            {t.rights[lang]}
          </p>
          <div className="flex items-center gap-2">
            <div
              className="text-[0.65rem] font-mono px-2 py-1 rounded"
              style={{
                background: "rgba(0,212,255,0.05)",
                border: "1px solid rgba(0,212,255,0.1)",
                color: "rgba(0,212,255,0.5)",
              }}
            >
              v2.4.1
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
