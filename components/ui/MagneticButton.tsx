"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  strength?: number;
  as?: "button" | "a";
  href?: string;
}

export function MagneticButton({
  children,
  className = "",
  style,
  onClick,
  strength = 0.35,
  as: Tag = "button",
  href,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    setPosition({ x: dx, y: dy });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      data-magnetic
      className="inline-block"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
    >
      {Tag === "a" ? (
        <a href={href} className={className} style={style} onClick={onClick}>
          {children}
        </a>
      ) : (
        <button className={className} style={style} onClick={onClick}>
          {children}
        </button>
      )}
    </motion.div>
  );
}
