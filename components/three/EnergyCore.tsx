"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles, Float, Text, Line, Billboard } from "@react-three/drei";
import * as THREE from "three";

interface EnergyCoreProps {
  mouseX?: number;
  mouseY?: number;
  scrollY?: number;
}

const NODE_TYPES = [
  { label: "Banque", color: "#00d4ff" },
  { label: "Mobile Money", color: "#f59e0b" },
  { label: "Fintech", color: "#7c3aed" },
  { label: "Service Public", color: "#10b981" },
];

// Create more nodes to match the busy network look
const NODES = Array.from({ length: 14 }).map((_, i) => {
  const type = NODE_TYPES[i % NODE_TYPES.length];
  // Mix of inner and outer nodes
  const isInner = i % 3 === 0;
  const radius = isInner
    ? 1.0 + Math.random() * 0.8
    : 2.0 + Math.random() * 1.5;
  const angle = (i / 14) * Math.PI * 2 + (Math.random() * 0.2 - 0.1);
  return {
    ...type,
    radius,
    angle,
    speed: (Math.random() * 0.05 + 0.02) * (i % 2 === 0 ? 1 : -1),
    size: isInner ? 0.08 : 0.05,
    id: i,
  };
});

function NetworkNode({
  node,
  coreRef,
}: {
  node: (typeof NODES)[0];
  coreRef: React.RefObject<THREE.Group | null>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const packetInRef = useRef<THREE.Mesh>(null);
  const packetOutRef = useRef<THREE.Mesh>(null);

  const [points, setPoints] = useState<[THREE.Vector3, THREE.Vector3]>([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, 0),
  ]);

  const sphereMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: node.color,
      emissive: node.color,
      emissiveIntensity: 0.8,
      roughness: 0.1,
      metalness: 0.8,
    });
  }, [node.color]);

  const ringMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: node.color,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
  }, [node.color]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Calculate position - very slow rotation around center on a flat plane
    const currentAngle = node.angle + t * 0.05 * node.speed;
    const x = Math.cos(currentAngle) * node.radius;
    const z = Math.sin(currentAngle) * node.radius;
    const y = 0; // Flat floor

    groupRef.current.position.set(x, y, z);

    // Update line points - straight from core base to node base
    if (coreRef.current) {
      setPoints([
        new THREE.Vector3(0, 0, 0), // Base of core
        new THREE.Vector3(x, y, z), // Base of node
      ]);
    }

    // Pulse the floor ring
    if (ringRef.current) {
      const scale = 1 + Math.sin(t * 3 + node.angle) * 0.1;
      ringRef.current.scale.set(scale, scale, scale);
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.4 + Math.sin(t * 3 + node.angle) * 0.4;
    }

    // Update data packets (data flow visualization)
    if (packetInRef.current && packetOutRef.current) {
      // Flow from Node to Core (Inward)
      const progressIn = (t * 0.4 + node.angle) % 1;
      packetInRef.current.position
        .copy(groupRef.current.position)
        .multiplyScalar(1 - progressIn);
      const matIn = packetInRef.current.material as THREE.MeshBasicMaterial;
      matIn.opacity = Math.sin(progressIn * Math.PI) * 0.8;

      // Flow from Core to Node (Outward)
      const progressOut = (t * 0.4 + node.angle + 0.5) % 1;
      packetOutRef.current.position
        .copy(groupRef.current.position)
        .multiplyScalar(progressOut);
      const matOut = packetOutRef.current.material as THREE.MeshBasicMaterial;
      matOut.opacity = Math.sin(progressOut * Math.PI) * 0.8;
    }
  });

  return (
    <>
      <group ref={groupRef}>
        {/* Hovering Node Sphere/Icon */}
        <Float
          speed={2}
          rotationIntensity={0.5}
          floatIntensity={1}
          floatingRange={[-0.02, 0.02]}
        >
          <mesh material={sphereMaterial} position={[0, 0.2, 0]}>
            <sphereGeometry args={[node.size, 32, 32]} />
          </mesh>
        </Float>

        {/* Glowing Base Ring on the floor */}
        <mesh
          ref={ringRef}
          material={ringMaterial}
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
        >
          <torusGeometry args={[node.size * 2.5, 0.005, 16, 64]} />
        </mesh>

        <Billboard position={[0, 0.35, 0]}>
          <Text
            fontSize={0.06}
            color={node.color}
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.005}
            outlineColor="#000000"
          >
            {node.label}
          </Text>
        </Billboard>
      </group>

      <Line
        points={points}
        color={node.color}
        transparent
        opacity={0.6}
        lineWidth={1.5}
      />

      {/* Data Packets flowing between core and nodes */}
      <mesh ref={packetInRef}>
        <sphereGeometry args={[0.015, 16, 16]} />
        <meshBasicMaterial
          color={node.color}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={packetOutRef}>
        <sphereGeometry args={[0.015, 16, 16]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

function CoreGeometry({ mouseX = 0, mouseY = 0 }: EnergyCoreProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const coreGroupRef = useRef<THREE.Group>(null);
  const baseRingRef = useRef<THREE.Mesh>(null);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color("#00d4ff") },
        uColor2: { value: new THREE.Color("#7c3aed") },
        uDistortion: { value: 0.08 },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uDistortion;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vNoise;

        // Simple noise
        float hash(vec3 p) {
          p = fract(p * 0.3183099 + 0.1);
          p *= 17.0;
          return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
        }

        float noise(vec3 p) {
          vec3 i = floor(p);
          vec3 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(mix(hash(i), hash(i+vec3(1,0,0)), f.x),
                mix(hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)), f.x), f.y),
            mix(mix(hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)), f.x),
                mix(hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)), f.x), f.y), f.z
          );
        }

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;

          vec3 pos = position;
          float n = noise(pos * 2.0 + uTime * 0.3);
          float n2 = noise(pos * 4.0 - uTime * 0.2);
          vNoise = n;

          pos += normal * (n * uDistortion + n2 * uDistortion * 0.5);

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vNoise;

        void main() {
          vec3 viewDir = normalize(cameraPosition - vPosition);
          float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 3.0);

          float t = sin(uTime * 0.5 + vNoise * 6.28) * 0.5 + 0.5;
          vec3 color = mix(uColor1, uColor2, t);
          color = mix(color, vec3(1.0), fresnel * 0.7);

          float alpha = fresnel * 0.9 + 0.05;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.FrontSide,
      depthWrite: false,
    });
  }, []);

  const outerGlowMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color("#00d4ff") },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        varying vec3 vNormal;
        void main() {
          vec3 viewDir = normalize(cameraPosition - vNormal);
          float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.0);
          float pulse = sin(uTime * 1.5) * 0.15 + 0.85;
          float alpha = fresnel * 0.4 * pulse;
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Update shader uniforms
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.uTime.value = t;
      }
    }

    if (glowRef.current) {
      const material = glowRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.uTime.value = t;
      }
    }

    // Mouse-reactive rotation for the core
    if (meshRef.current) {
      meshRef.current.rotation.x +=
        (mouseY * 0.4 - meshRef.current.rotation.x) * 0.05;
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.y +=
        (mouseX * 0.4 - meshRef.current.rotation.y) * 0.02;
    }

    if (wireRef.current) {
      wireRef.current.rotation.x = meshRef.current?.rotation.x ?? 0;
      wireRef.current.rotation.y = (meshRef.current?.rotation.y ?? 0) - t * 0.2;
      wireRef.current.rotation.z = t * 0.1;
    }

    // Pulse the central base ring
    if (baseRingRef.current) {
      const scale = 1 + Math.sin(t * 2) * 0.1;
      baseRingRef.current.scale.set(scale, scale, scale);
      const mat = baseRingRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.5 + Math.sin(t * 2) * 0.5;
    }
  });

  return (
    <group ref={coreGroupRef} rotation={[0.8, 0, 0]}>
      {/* Central Hub Core (Floating above floor) */}
      <Float
        speed={1.5}
        rotationIntensity={0}
        floatIntensity={0.5}
        floatingRange={[-0.05, 0.05]}
      >
        <group position={[0, 0.4, 0]}>
          {/* Outer glow sphere */}
          <mesh ref={glowRef} scale={1.4} material={outerGlowMaterial}>
            <icosahedronGeometry args={[0.35, 4]} />
          </mesh>

          {/* Core icosahedron */}
          <mesh ref={meshRef} material={shaderMaterial}>
            <icosahedronGeometry args={[0.35, 6]} />
          </mesh>

          {/* Wireframe overlay */}
          <mesh ref={wireRef} scale={1.05}>
            <icosahedronGeometry args={[0.35, 2]} />
            <meshBasicMaterial
              color="#00d4ff"
              wireframe
              transparent
              opacity={0.15}
            />
          </mesh>
        </group>
      </Float>

      {/* Central Base Ring (On the floor) */}
      <mesh
        ref={baseRingRef}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
      >
        <torusGeometry args={[0.6, 0.008, 16, 64]} />
        <meshBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Network Nodes and Connections */}
      {NODES.map((node) => (
        <NetworkNode key={node.id} node={node} coreRef={coreGroupRef} />
      ))}

      {/* Lighting */}
      <pointLight
        color="#00d4ff"
        intensity={4}
        distance={10}
        position={[0, 2, 0]}
      />
      <pointLight
        color="#7c3aed"
        intensity={3}
        distance={8}
        position={[-2, 1, 2]}
      />
      <pointLight
        color="#ffffff"
        intensity={1}
        distance={5}
        position={[0, 4, 3]}
      />
    </group>
  );
}

function ParticleCloud() {
  const points = useRef<THREE.Points>(null);

  const [{ positions }] = useState(() => {
    const count = 1000;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const r = 1 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      // Keep particles mostly near the flat plane
      const y = (Math.random() - 0.5) * 2;
      positions[i * 3] = r * Math.cos(theta);
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = r * Math.sin(theta);
    }

    return { positions };
  });

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={points} rotation={[0.8, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#00d4ff"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export function EnergyCore({
  mouseX = 0,
  mouseY = 0,
  scrollY = 0,
}: EnergyCoreProps) {
  return (
    <group
      scale={[1 - scrollY * 0.0003, 1 - scrollY * 0.0003, 1 - scrollY * 0.0003]}
      position={[0, -0.5, 0]} // Shift entire scene down slightly
    >
      <CoreGeometry mouseX={mouseX} mouseY={mouseY} />
      <ParticleCloud />
      <Sparkles
        count={80}
        scale={8}
        size={1.5}
        speed={0.2}
        color="#00d4ff"
        opacity={0.6}
      />
    </group>
  );
}
