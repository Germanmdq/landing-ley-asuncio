'use client';

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const LusionExperience = dynamic(() => import('@/components/three/LusionExperience'), {
  ssr: false,
});

export default function LusionHeroV3() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / max));
      setScrollProgress(progress);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* WebGL Background */}
      <Suspense fallback={<div className="fixed inset-0 bg-[#f5f5f5]" />}>
        <LusionExperience scrollProgress={scrollProgress} />
      </Suspense>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-start px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="space-y-6 max-w-4xl">
          {/* Kicker */}
          <p className="text-sm md:text-base text-black/60 uppercase tracking-wider">
            Un espacio para sostener el estado mental
          </p>

          {/* Title */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-black tracking-tight leading-[0.95]">
            El Club de
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
              la Imaginación
            </span>
          </h1>

          {/* Lede */}
          <p className="text-lg md:text-xl text-black/70 max-w-2xl leading-relaxed">
            Biblioteca curada, tutor IA personalizado, y comunidad activa para expandir tu mente con
            práctica real.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 pt-6">
            <Link
              href="/#planes"
              className="group px-8 py-4 bg-black text-white font-bold rounded-full hover:scale-105 transition-all flex items-center gap-3 shadow-xl"
            >
              Explorar Planes
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link
              href="/blog"
              className="px-8 py-4 bg-white/80 backdrop-blur-sm text-black font-bold rounded-full border-2 border-black/20 hover:bg-white hover:border-black/40 transition-all shadow-lg"
            >
              Ver Biblioteca
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 text-black/50 text-xs uppercase tracking-widest animate-bounce">
          <span className="w-2 h-2 rounded-full bg-black/50 shadow-lg"></span>
          <span>Scroll para explorar</span>
        </div>
      </div>
    </div>
  );
}
