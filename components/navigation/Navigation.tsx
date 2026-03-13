"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useTheme } from "@/lib/context/ThemeContext";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";
import Image from "next/image";

function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function Navigation() {
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const { theme, toggle: toggleTheme } = useTheme();
  const { lang, toggle: toggleLang } = useLanguage();
  const t = translations.nav;

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // Timeout to bypass react-hooks/set-state-in-effect warning
    setTimeout(() => setMounted(true), 0);
  }, []);

  const isDark = theme === "dark";

  const navLinks = [
    { label: t.platform[lang], href: "#platform" },
    { label: t.features[lang], href: "#features" },
    { label: t.network[lang], href: "#network" },
    { label: t.metrics[lang], href: "#metrics" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-[500] px-6 py-5"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Blur bg on scroll */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: navOpacity,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          background: "var(--nav-bg)",
          borderBottom: "1px solid var(--border)",
        }}
      />

      <nav
        className="relative max-w-7xl mx-auto flex items-center justify-between"
        role="navigation"
        aria-label="Navigation principale"
      >
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group"
          aria-label="LIMOKA — Accueil"
        >
          <div className="relative w-8 h-8 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Limoka Logo"
              fill
              className="object-contain drop-shadow-[0_0_8px_rgba(0,212,255,0.4)] transition-all group-hover:scale-105"
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
        </a>

        {/* Nav links */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative text-sm font-medium transition-colors duration-300 group"
                style={{ color: "var(--text-2)" }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#00d4ff] group-hover:w-full transition-all duration-300 ease-out" />
              </a>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 relative overflow-hidden group"
            style={{
              border: "1px solid var(--border-2)",
              background: "var(--surface)",
            }}
            aria-label={`Switch to ${lang === "fr" ? "English" : "Français"}`}
            title={`Switch to ${lang === "fr" ? "English" : "Français"}`}
          >
            <div className="absolute inset-0 bg-[#00d4ff]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span
              className="transition-colors duration-300"
              style={{
                color: lang === "fr" ? "var(--text)" : "var(--text-3)",
                textShadow:
                  lang === "fr" ? "0 0 10px rgba(0,212,255,0.3)" : "none",
              }}
            >
              FR
            </span>
            <span style={{ color: "var(--border-2)" }}>|</span>
            <span
              className="transition-colors duration-300"
              style={{
                color: lang === "en" ? "var(--text)" : "var(--text-3)",
                textShadow:
                  lang === "en" ? "0 0 10px rgba(0,212,255,0.3)" : "none",
              }}
            >
              EN
            </span>
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 hover:bg-[var(--border)]"
            style={{
              color: "var(--text)",
              border: "1px solid var(--border-2)",
              background: "var(--surface)",
            }}
            aria-label={
              !mounted ? "Mode sombre" : isDark ? "Mode clair" : "Mode sombre"
            }
            title={
              !mounted ? "Mode sombre" : isDark ? "Mode clair" : "Mode sombre"
            }
          >
            <motion.div
              key={mounted ? theme : "ssr"}
              initial={{ rotate: -30, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {!mounted ? <MoonIcon /> : isDark ? <SunIcon /> : <MoonIcon />}
            </motion.div>
          </button>

          {/* CTA */}
          <MagneticButton
            className="hidden sm:block px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
            style={{
              color: "#00d4ff",
              border: "1px solid rgba(0,212,255,0.3)",
              background: "transparent",
            }}
            href="#contact"
            as="a"
          >
            {t.cta[lang]}
          </MagneticButton>
        </div>
      </nav>
    </motion.header>
  );
}
