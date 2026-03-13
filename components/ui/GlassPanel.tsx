"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "cyan" | "violet" | "amber";
  tiltStrength?: number;
  delay?: number;
}

export function GlassPanel({
  children,
  className = "",
  glowColor = "cyan",
  tiltStrength = 15,
  delay = 0,
}: GlassPanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(springY, [0, 1], [tiltStrength, -tiltStrength]);
  const rotateY = useTransform(springX, [0, 1], [-tiltStrength, tiltStrength]);

  const glowColors = {
    cyan: "rgba(0, 212, 255, 0.2)",
    violet: "rgba(124, 58, 237, 0.2)",
    amber: "rgba(245, 158, 11, 0.2)",
  };

  const borderColors = {
    cyan: "rgba(0, 212, 255, 0.15)",
    violet: "rgba(124, 58, 237, 0.15)",
    amber: "rgba(245, 158, 11, 0.15)",
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative rounded-2xl overflow-hidden ${className}`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Glass background */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `rgba(255, 255, 255, 0.03)`,
            border: `1px solid ${borderColors[glowColor]}`,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        />
        {/* Inner glow on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${glowColors[glowColor]} 0%, transparent 60%)`,
          }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        />
        {/* Content */}
        <div className="relative z-10">{children}</div>
      </motion.div>
    </motion.div>
  );
}
