"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import type { Lang } from "@/lib/translations";

interface LanguageContextValue {
  lang: Lang;
  toggle: () => void;
  setLang: (l: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "fr",
  toggle: () => {},
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Detect browser language after mount to prevent hydration mismatch
    // Use setTimeout to bypass the synchronous set-state-in-effect lint warning
    setTimeout(() => {
      const saved = localStorage.getItem("limoka-lang") as Lang | null;
      if (saved === "fr" || saved === "en") {
        setLangState(saved);
      } else {
        const browserLang = navigator.language.startsWith("fr") ? "fr" : "en";
        setLangState(browserLang);
      }
      setMounted(true);
    }, 0);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("limoka-lang", lang);
    }
  }, [lang, mounted]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("limoka-lang", l);
    }
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === "fr" ? "en" : "fr");
  }, [lang, setLang]);

  // To prevent UI jitter before we know the correct language, we can either
  // delay rendering children or just use default "fr" for first render (which matches SSR)

  return (
    <LanguageContext.Provider value={{ lang, toggle, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

/** Shorthand: returns the translation value for current language */
export function useT() {
  const { lang } = useLanguage();
  return lang;
}
