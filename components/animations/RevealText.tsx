'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealTextProps {
  children: string;
  className?: string;
}

const RevealText: React.FC<RevealTextProps> = ({ children, className = '' }) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const element = textRef.current;

    // Animación: las palabras suben desde y: 100% hasta y: 0%
    gsap.fromTo(
      element.querySelectorAll('.word'),
      { y: '100%' },
      {
        y: '0%',
        duration: 1,
        ease: 'power4.out',
        stagger: 0.1, // Hace que las palabras salgan una tras otra
        scrollTrigger: {
          trigger: element,
          start: 'top 80%', // Inicia cuando el texto está al 80% del viewport
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  // Dividimos el texto en palabras para animarlas individualmente
  const words = children.split(' ');

  return (
    <div ref={textRef} className={`flex flex-wrap gap-x-4 overflow-hidden py-2 ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span className="word inline-block translate-y-full">
            {word}
          </span>
        </span>
      ))}
    </div>
  );
};

export default RevealText;
