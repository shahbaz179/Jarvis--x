'use client';

import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial, Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';

function seeded(index: number) {
  return (Math.sin(index * 127.1) * 43758.5453) % 1;
}

function EnergyParticles() {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const array = new Float32Array(900);
    for (let i = 0; i < 300; i += 1) {
      const radius = 1.7 + Math.abs(seeded(i + 1)) * 2.4;
      const theta = Math.abs(seeded(i + 11)) * Math.PI * 2;
      const phi = Math.acos(2 * Math.abs(seeded(i + 23)) - 1);
      array[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      array[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      array[i * 3 + 2] = radius * Math.cos(phi);
    }
    return array;
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.08 + state.pointer.x * 0.18;
    points.current.rotation.x = state.pointer.y * 0.14;
  });

  return (
    <Points ref={points} positions={positions} stride={3}>
      <PointMaterial transparent color="#8dfbff" size={0.025} sizeAttenuation depthWrite={false} opacity={0.8} />
    </Points>
  );
}

function OrbCore() {
  const core = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (core.current) {
      core.current.rotation.x = state.clock.elapsedTime * 0.35 + state.pointer.y * 0.28;
      core.current.rotation.y = state.clock.elapsedTime * 0.42 + state.pointer.x * 0.36;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.6) * 0.035;
      core.current.scale.setScalar(pulse);
    }
    if (shell.current) {
      shell.current.rotation.x = -state.clock.elapsedTime * 0.18;
      shell.current.rotation.y = state.clock.elapsedTime * 0.22;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.18} floatIntensity={0.55}>
      <Sphere ref={core} args={[1.04, 96, 96]}>
        <meshStandardMaterial color="#00f6ff" emissive="#00d9ff" emissiveIntensity={2.8} roughness={0.18} metalness={0.28} transparent opacity={0.88} />
      </Sphere>
      <Sphere ref={shell} args={[1.24, 48, 48]}>
        <meshBasicMaterial color="#9bf8ff" wireframe transparent opacity={0.22} />
      </Sphere>
      {[0, 1, 2, 3].map((index) => (
        <Torus key={index} args={[1.62 + index * 0.18, 0.012, 18, 180]} rotation={[Math.PI / (2.7 + index * 0.25), index * 0.7, index * 0.36]}>
          <meshBasicMaterial color={index % 2 ? '#1d7cff' : '#00f6ff'} transparent opacity={0.5 - index * 0.055} />
        </Torus>
      ))}
      <pointLight color="#00f6ff" intensity={4.4} distance={8} />
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.42} />
      <spotLight position={[0, 4, 6]} angle={0.52} penumbra={0.8} intensity={3.2} color="#bffcff" />
      <pointLight position={[-4, -2, 4]} intensity={2.2} color="#1d7cff" />
      <OrbCore />
      <EnergyParticles />
    </>
  );
}

function Fallback() {
  return <div className="h-full w-full rounded-full bg-cyan-400/20 blur-3xl" />;
}

export default function JarvisOrb({ className = '' }: { className?: string }) {
  return (
    <div className={`relative h-full w-full ${className}`}>
      <Suspense fallback={<Fallback />}>
        <Canvas camera={{ position: [0, 0, 5.2], fov: 42 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}
