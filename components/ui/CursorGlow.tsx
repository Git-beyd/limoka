"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorGlow() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const isPointer = useRef(false);

  const springConfig = { stiffness: 400, damping: 28 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  const trailSpringConfig = { stiffness: 150, damping: 20 };
  const trailX = useSpring(cursorX, trailSpringConfig);
  const trailY = useSpring(cursorY, trailSpringConfig);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      isPointer.current = !!(
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-magnetic]")
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Trail — ambient glow blob */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          width: 300,
          height: 300,
          background:
            "radial-gradient(circle, rgba(0, 212, 255, 0.06) 0%, transparent 70%)",
        }}
        aria-hidden
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: 8,
          height: 8,
          backgroundColor: "#00d4ff",
        }}
        aria-hidden
      />
    </>
  );
}
