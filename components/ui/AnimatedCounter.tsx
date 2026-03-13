"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useLanguage } from "@/lib/context/LanguageContext";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
  trigger?: boolean;
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 2.5,
  className = "",
  trigger,
}: AnimatedCounterProps) {
  const { lang } = useLanguage();
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const internalIsInView = useInView(ref, { once: true, margin: "-20% 0px" });

  const isInView = trigger !== undefined ? trigger : internalIsInView;

  const startTime = useRef<number | null>(null);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isInView) return;

    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = (timestamp - startTime.current) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      setCurrent(easedProgress * value);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setCurrent(value);
      }
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isInView, value, duration]);

  const locale = lang === "fr" ? "fr-FR" : "en-US";
  const formatted =
    decimals > 0
      ? current.toFixed(decimals)
      : Math.floor(current).toLocaleString(locale);

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
