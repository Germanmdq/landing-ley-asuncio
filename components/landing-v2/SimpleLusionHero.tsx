'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function SimpleLusionHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (typeof window === 'undefined') return;

    import('three').then(async (THREE) => {
      if (!canvasRef.current) return;

      const canvas = canvasRef.current;
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
      camera.position.z = 7;

      // Lights
      scene.add(new THREE.AmbientLight(0xffffff, 0.5));
      const light = new THREE.DirectionalLight(0x8b5cf6, 1);
      light.position.set(4, 6, 4);
      scene.add(light);

      // Simple floating spheres
      const spheres: any[] = [];
      const geo = new THREE.SphereGeometry(0.3, 16, 16);
      const mat = new THREE.MeshStandardMaterial({ color: 0x8b5cf6, metalness: 0.5, roughness: 0.3 });

      for (let i = 0; i < 20; i++) {
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6 - 2
        );
        spheres.push(mesh);
        scene.add(mesh);
      }

      let frame = 0;
      function animate() {
        frame = requestAnimationFrame(animate);
        const t = performance.now() * 0.001;

        spheres.forEach((s, i) => {
          s.position.y += Math.sin(t + i) * 0.003;
          s.rotation.x = t * 0.3;
          s.rotation.y = t * 0.2;
        });

        renderer.render(scene, camera);
      }

      animate();

      return () => {
        cancelAnimationFrame(frame);
        renderer.dispose();
      };
    });
  }, []);

  if (!mounted) return <div className="h-screen w-full bg-[#f5f5f5]" />;

  return (
    <div className="relative min-h-screen bg-[#f5f5f5]">
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10" />

      <div className="relative z-10 min-h-screen flex flex-col justify-center items-start px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="space-y-6 max-w-4xl">
          <p className="text-sm md:text-base text-black/60 uppercase tracking-wider">
            Un espacio para sostener el estado mental
          </p>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-black tracking-tight leading-[0.95]">
            El Club de
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
              la Imaginación
            </span>
          </h1>

          <p className="text-lg md:text-xl text-black/70 max-w-2xl leading-relaxed">
            Biblioteca curada, tutor IA personalizado, y comunidad activa para expandir tu mente
          </p>

          <div className="flex flex-wrap gap-4 pt-6">
            <Link
              href="/#planes"
              className="px-8 py-4 bg-black text-white font-bold rounded-full hover:scale-105 transition-all flex items-center gap-3 shadow-xl"
            >
              Explorar Planes
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/blog"
              className="px-8 py-4 bg-white text-black font-bold rounded-full border-2 border-black/20 hover:border-black/40 transition-all shadow-lg"
            >
              Ver Biblioteca
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
