'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, Center } from '@react-three/drei';
import { BrainShape } from './BrainShape';

export default function HeroScene() {
  return (
    <div className="h-screen w-full bg-[#f5f5f5] relative">
      {/* Escena 3D */}
      <Canvas camera={{ position: [0, 0, 10], fov: 40 }}>
        <color attach="background" args={['#f5f5f5']} />
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.8} color="#6366f1" />
        <pointLight position={[-10, -10, 5]} intensity={1.2} color="#a78bfa" />
        <spotLight position={[0, 15, 8]} angle={0.3} penumbra={1} intensity={2} />

        <Environment preset="city" />

        <Center position={[0, 0, 0]}>
          {/* Cerebros a los lados - NO en el centro donde está el texto */}

          {/* Lado izquierdo superior */}
          <BrainShape position={[-5, 2, -2]} color="#8b5cf6" scale={1.2} />

          {/* Lado derecho superior */}
          <BrainShape position={[5, 2, -1]} color="#6366f1" scale={1.0} />

          {/* Lado izquierdo inferior */}
          <BrainShape position={[-4.5, -2, 1]} color="#a78bfa" scale={0.8} />

          {/* Lado derecho inferior */}
          <BrainShape position={[5, -1.5, 0]} color="#7c3aed" scale={0.9} />

          {/* Más atrás para profundidad */}
          <BrainShape position={[-3, 0, -4]} color="#c4b5fd" scale={0.6} />
          <BrainShape position={[4, 1, -3]} color="#ddd6fe" scale={0.7} />
        </Center>
      </Canvas>

      {/* Indicador de Scroll */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-black/60 uppercase tracking-widest text-xs animate-bounce">
        Scroll para explorar
      </div>
    </div>
  );
}
