'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, Center } from '@react-three/drei';
import { PlusShape } from './PlusShape';

export default function HeroScene() {
  return (
    <div className="h-screen w-full bg-[#f5f5f5] relative">
      {/* Capa de Texto Superior (HTML) - El contenido ahora viene de LusionHero */}

      {/* Escena 3D */}
      <Canvas camera={{ position: [0, 0, 8], fov: 35 }}>
        <color attach="background" args={['#f5f5f5']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />

        <Environment preset="city" />

        <Center position={[0, -1, 0]}>
          {/* Generación de piezas en posiciones estratégicas como en Lusion */}
          <PlusShape position={[-2, 1, 0]} color="#0000FF" scale={1.2} />
          <PlusShape position={[2, -0.5, 1]} color="#FFFFFF" scale={0.8} />
          <PlusShape position={[0, -1.5, 2]} color="#222222" scale={1.5} />
          <PlusShape position={[-3, -2, -1]} color="#FFFFFF" scale={0.6} />
          <PlusShape position={[3, 2, -2]} color="#0000FF" scale={0.9} />
          <PlusShape position={[1, 0.5, -1]} color="#888888" scale={0.7} />
        </Center>
      </Canvas>

      {/* Indicador de Scroll */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-black opacity-50 uppercase tracking-widest text-xs">
        Scroll to explore
      </div>
    </div>
  );
}
