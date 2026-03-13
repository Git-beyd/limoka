"use client";

import { SmoothScrollProvider } from "./SmoothScrollProvider";
import { ThemeProvider } from "@/lib/context/ThemeContext";
import { LanguageProvider } from "@/lib/context/LanguageContext";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { FilmGrain } from "@/components/ui/FilmGrain";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SmoothScrollProvider>
          <FilmGrain />
          <CursorGlow />
          {children}
        </SmoothScrollProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
