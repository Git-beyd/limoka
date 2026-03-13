"use client";

import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents, PerformanceMonitor } from "@react-three/drei";
import { EnergyCore } from "./EnergyCore";

interface HeroSceneProps {
  className?: string;
}

function SceneContent({ mouseX, mouseY, scrollY }: { mouseX: number; mouseY: number; scrollY: number }) {
  return (
    <>
      <ambientLight intensity={0.1} />
      <EnergyCore mouseX={mouseX} mouseY={mouseY} scrollY={scrollY} />
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </>
  );
}

export function HeroScene({ className = "" }: HeroSceneProps) {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX((e.clientX / window.innerWidth - 0.5) * 2);
      setMouseY((e.clientY / window.innerHeight - 0.5) * 2);
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className={`${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: 4, // ACESFilmicToneMapping
          toneMappingExposure: 1.2,
        }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
      >
        <PerformanceMonitor>
          <Suspense fallback={null}>
            <SceneContent mouseX={mouseX} mouseY={mouseY} scrollY={scrollY} />
          </Suspense>
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
}
