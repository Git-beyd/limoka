"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";

function NetworkNodes() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const [{ nodePositions, linePositions, ambientNodePositions }] = useState(
    () => {
      const nodeCount = 120;
      const nodePositions = new Float32Array(nodeCount * 3);
      const nodes: THREE.Vector3[] = [];

      for (let i = 0; i < nodeCount; i++) {
        const x = (Math.random() - 0.5) * 16;
        const y = (Math.random() - 0.5) * 8;
        const z = (Math.random() - 0.5) * 6;
        nodePositions[i * 3] = x;
        nodePositions[i * 3 + 1] = y;
        nodePositions[i * 3 + 2] = z;
        nodes.push(new THREE.Vector3(x, y, z));
      }

      // Connect nearby nodes with lines
      const lineVerts: number[] = [];
      const threshold = 3.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (nodes[i].distanceTo(nodes[j]) < threshold) {
            lineVerts.push(nodes[i].x, nodes[i].y, nodes[i].z);
            lineVerts.push(nodes[j].x, nodes[j].y, nodes[j].z);
          }
        }
      }

      // Ambient large nodes positions
      const ambientNodePositions: [number, number, number][] = [];
      for (let i = 0; i < 8; i++) {
        ambientNodePositions.push([
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4,
        ]);
      }

      return {
        nodePositions,
        linePositions: new Float32Array(lineVerts),
        ambientNodePositions,
      };
    },
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.04;
      pointsRef.current.rotation.x = Math.sin(t * 0.03) * 0.15;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = t * 0.04;
      linesRef.current.rotation.x = Math.sin(t * 0.03) * 0.15;
    }
  });

  return (
    <group>
      {/* Nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            args={[nodePositions, 3]}
            attach="attributes-position"
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#00d4ff"
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Connections */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            args={[linePositions, 3]}
            attach="attributes-position"
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Ambient large nodes */}
      {ambientNodePositions.map((pos, i) => (
        <mesh key={`ambient-${i}`} position={pos}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#7c3aed" : "#00d4ff"}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}

      <ambientLight intensity={0.3} />
      <pointLight color="#00d4ff" intensity={2} position={[5, 3, 2]} />
      <pointLight color="#7c3aed" intensity={1.5} position={[-5, -3, 1]} />
    </group>
  );
}

export function NetworkScene({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <NetworkNodes />
          <AdaptiveDpr pixelated />
        </Suspense>
      </Canvas>
    </div>
  );
}
