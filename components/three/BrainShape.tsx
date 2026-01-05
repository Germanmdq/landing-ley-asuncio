'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface BrainShapeProps {
  position: [number, number, number];
  color: string;
  scale?: number;
}

export function BrainShape({ position, color, scale = 1, ...props }: BrainShapeProps & any) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t / 3) * 0.3;
    groupRef.current.rotation.x = Math.cos(t / 4) * 0.2;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={groupRef} position={position} scale={scale} {...props}>
        {/* Esfera central del cerebro */}
        <Sphere args={[1, 32, 32]}>
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.6} />
        </Sphere>

        {/* Bultos que simulan los pliegues del cerebro */}
        <Sphere args={[0.6, 16, 16]} position={[0.5, 0.3, 0.2]}>
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.6} />
        </Sphere>
        <Sphere args={[0.5, 16, 16]} position={[-0.4, 0.4, 0.1]}>
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.6} />
        </Sphere>
        <Sphere args={[0.4, 16, 16]} position={[0.2, -0.5, 0.3]}>
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.6} />
        </Sphere>
        <Sphere args={[0.45, 16, 16]} position={[-0.3, -0.3, -0.2]}>
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.6} />
        </Sphere>
      </group>
    </Float>
  );
}
