'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface PlusShapeProps {
  position: [number, number, number];
  color: string;
  scale?: number;
}

export function PlusShape({ position, color, scale = 1, ...props }: PlusShapeProps & any) {
  const meshRef = useRef<THREE.Group>(null);

  // Animación sutil de rotación constante
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      Math.cos(t / 2) / 4,
      0.1
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      Math.sin(t / 4) / 4,
      0.1
    );
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={meshRef} position={position} scale={scale} {...props}>
        {/* Geometría de cruz: tres cajas cruzadas */}
        <mesh>
          <boxGeometry args={[1, 0.3, 0.3]} />
          <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[1, 0.3, 0.3]} />
          <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[1, 0.3, 0.3]} />
          <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
        </mesh>
      </group>
    </Float>
  );
}
