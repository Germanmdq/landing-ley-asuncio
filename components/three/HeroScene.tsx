'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, Center, Sparkles } from '@react-three/drei';
import { PlusShape } from './PlusShape';

export default function HeroScene() {
  return (
    <div className="h-screen w-full bg-[#f5f5f5] relative">
      {/* Capa de Texto Superior (HTML) - El contenido ahora viene de LusionHero */}

      {/* Escena 3D */}
      <Canvas camera={{ position: [0, 0, 8], fov: 35 }}>
        <color attach="background" args={['#f5f5f5']} />
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#4444ff" />
        <pointLight position={[-10, -10, 5]} intensity={1} color="#ff44ff" />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />

        <Environment preset="city" />

        {/* Partículas brillantes flotantes */}
        <Sparkles count={100} scale={10} size={2} speed={0.3} opacity={0.4} color="#8b5cf6" />

        <Center position={[0, -1, 0]}>
          {/* Primera capa - Piezas grandes y protagonistas */}
          <PlusShape position={[-2, 1, 0]} color="#0000FF" scale={1.5} />
          <PlusShape position={[2, -0.5, 1]} color="#6366f1" scale={1.3} />
          <PlusShape position={[0, -1.5, 2]} color="#222222" scale={1.8} />

          {/* Segunda capa - Piezas medianas de soporte */}
          <PlusShape position={[-3, -2, -1]} color="#FFFFFF" scale={0.9} />
          <PlusShape position={[3, 2, -2]} color="#3b82f6" scale={1.1} />
          <PlusShape position={[1, 0.5, -1]} color="#888888" scale={0.8} />
          <PlusShape position={[-1, 2, 1]} color="#a78bfa" scale={1.0} />

          {/* Tercera capa - Piezas pequeñas en el fondo */}
          <PlusShape position={[4, -1, -3]} color="#e0e0e0" scale={0.5} />
          <PlusShape position={[-4, 0.5, -2.5]} color="#0000aa" scale={0.6} />
          <PlusShape position={[0, 3, -2]} color="#c4c4c4" scale={0.7} />
          <PlusShape position={[-2, -3, 0]} color="#5555ff" scale={0.8} />
          <PlusShape position={[2.5, 1.5, 2]} color="#1a1a1a" scale={1.2} />
        </Center>
      </Canvas>

      {/* Indicador de Scroll */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-black opacity-50 uppercase tracking-widest text-xs animate-bounce">
        Scroll to explore
      </div>
    </div>
  );
}
