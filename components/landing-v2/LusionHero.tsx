'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Importación dinámica del HeroScene para evitar problemas de SSR
const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full bg-[#f5f5f5] flex items-center justify-center">
      <div className="text-black">Cargando...</div>
    </div>
  ),
});

export default function LusionHero() {
  return (
    <div className="relative">
      {/* Escena 3D de fondo */}
      <Suspense
        fallback={
          <div className="h-screen w-full bg-[#f5f5f5] flex items-center justify-center">
            <div className="text-black">Cargando experiencia 3D...</div>
          </div>
        }
      >
        <HeroScene />
      </Suspense>

      {/* Contenido superpuesto */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 md:px-10 pointer-events-none">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Título principal - Con sombra para destacar sobre fondo claro */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-black tracking-tight leading-tight drop-shadow-sm">
            <span className="block">El Club de</span>
            <span className="block bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
              la Imaginación
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="text-lg md:text-xl text-black/70 max-w-3xl mx-auto font-medium">
            Un lugar para sostener el estado con práctica real
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 pointer-events-auto">
            <Link
              href="/#planes"
              className="group px-8 py-4 bg-black text-white font-bold rounded-full hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-lg"
            >
              Explorar Planes
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link
              href="/blog"
              className="px-8 py-4 bg-white text-black font-bold rounded-full border-2 border-black hover:bg-black hover:text-white transition-all shadow-md"
            >
              Ver Biblioteca
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
