'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    category: 'Biblioteca • Conferencias',
    title: 'Biblioteca Curada',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format',
    link: '/blog',
  },
  {
    category: 'Comunidad • Foro',
    title: 'Comunidad Activa',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format',
    link: '/foro',
  },
  {
    category: 'IA • Tutor Personal',
    title: 'Tutor IA 24/7',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format',
    link: '/tutor',
  },
  {
    category: 'Newsletter • Contenido',
    title: 'Dosis Mentales',
    image: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=800&auto=format',
    link: '/dosis-mentales',
  },
];

const ProjectCard = ({ category, title, image, link }: typeof projects[0]) => {
  return (
    <Link
      href={link}
      className="project-card min-w-[300px] md:min-w-[450px] h-[600px] flex flex-col justify-between p-6 group cursor-pointer"
    >
      {/* Categoría */}
      <div className="overflow-hidden">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 group-hover:text-black transition-colors duration-500">
          {category}
        </p>
      </div>

      {/* Imagen con contenedor para el efecto Zoom */}
      <div className="flex-grow my-8 overflow-hidden bg-[#111] rounded-sm">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
        />
      </div>

      {/* Título y Flecha */}
      <div className="flex justify-between items-end border-b border-transparent group-hover:border-black/20 pb-4 transition-all">
        <h3 className="text-2xl md:text-3xl font-medium text-black tracking-tight">
          {title}
        </h3>
        <span className="text-2xl transform group-hover:translate-x-2 transition-transform duration-300">
          →
        </span>
      </div>
    </Link>
  );
};

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !triggerRef.current) return;

    const pin = gsap.fromTo(
      sectionRef.current,
      { translateX: 0 },
      {
        translateX: '-150vw',
        ease: 'none',
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: '2000 top',
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      }
    );

    return () => {
      pin.kill();
    };
  }, []);

  return (
    <section className="overflow-hidden bg-white">
      <div ref={triggerRef}>
        <div className="px-10 py-20">
          <h2 className="text-black text-xs uppercase tracking-[0.5em] mb-20 opacity-50">
            Qué incluye
          </h2>

          <div ref={sectionRef} className="flex gap-10 relative">
            {projects.map((proj, index) => (
              <ProjectCard key={index} {...proj} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
