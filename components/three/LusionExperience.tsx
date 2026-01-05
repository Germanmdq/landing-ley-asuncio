'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createFloatingField, createGlowPlane } from './LusionObjects';

interface LusionExperienceProps {
  scrollProgress: number;
}

export default function LusionExperience({ scrollProgress }: LusionExperienceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const experienceRef = useRef<any>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf5f5f5, 0.04);

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0.6, 7);

    // Lights
    const key = new THREE.DirectionalLight(0x8b5cf6, 1.2);
    key.position.set(4, 6, 4);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0x6366f1, 0.7);
    fill.position.set(-6, 2, -3);
    scene.add(fill);

    const amb = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(amb);

    // Objects
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 520px)').matches;
    const field = createFloatingField({ count: isMobile ? 90 : 180, radius: 9 });
    scene.add(field.mesh);

    const glow = createGlowPlane();
    scene.add(glow);

    // Pointer
    const pointer = { x: 0, y: 0, vx: 0, vy: 0 };
    const targetPointer = { x: 0, y: 0 };

    function onPointerMove(e: PointerEvent) {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      targetPointer.x = x;
      targetPointer.y = y;
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true } as any);

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;

      const dpr = Math.min(1.75, window.devicePixelRatio || 1);
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }

    let animationFrameId: number;
    function animate() {
      const t = performance.now() / 1000;
      const dt = 1 / 60;

      // Ease pointer
      pointer.vx += (targetPointer.x - pointer.x) * 0.09;
      pointer.vy += (targetPointer.y - pointer.y) * 0.09;
      pointer.x += pointer.vx * 0.18;
      pointer.y += pointer.vy * 0.18;
      pointer.vx *= 0.85;
      pointer.vy *= 0.85;

      // Scroll-driven camera
      const p = scrollProgress;
      camera.position.z = 7 - p * 2.4;
      camera.position.y = 0.6 - p * 0.9;
      camera.position.x = pointer.x * 0.55;

      camera.lookAt(pointer.x * 0.55, pointer.y * 0.25, 0);

      // Animate instanced capsules
      const dummy = new THREE.Object3D();
      const m = field.mesh;
      for (let i = 0; i < m.count; i++) {
        const sx = field.seeds[i * 4 + 0];
        const sy = field.seeds[i * 4 + 1];
        const sz = field.seeds[i * 4 + 2];
        const seed = field.seeds[i * 4 + 3];

        const bob = Math.sin(t * 0.9 + seed) * 0.22;
        const sway = Math.cos(t * 0.7 + seed) * 0.18;

        dummy.position.set(sx + pointer.x * 0.35, sy + bob + pointer.y * 0.15, sz);

        dummy.rotation.set(t * 0.45 + seed, t * 0.35 + seed + p * 1.2, t * 0.25 + sway);

        const s = 0.85 + Math.sin(t + seed) * 0.08;
        dummy.scale.setScalar(s);

        dummy.updateMatrix();
        m.setMatrixAt(i, dummy.matrix);
      }
      m.instanceMatrix.needsUpdate = true;

      // Glow pulses with scroll
      glow.material.opacity = 0.06 + (1 - Math.abs(p - 0.5) * 2) * 0.08;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    }

    resize();
    window.addEventListener('resize', resize);
    animate();

    experienceRef.current = { resize, dispose: () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', resize);
      renderer.dispose();
    }};

    return () => {
      experienceRef.current?.dispose();
    };
  }, [scrollProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{ pointerEvents: 'none' }}
    />
  );
}
