'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const menuLinks = [
  { name: 'INICIO', href: '/' },
  { name: 'BIBLIOTECA', href: '/blog' },
  { name: 'FORO', href: '/foro' },
  { name: 'TUTOR IA', href: '/tutor' },
  { name: 'MI CUENTA', href: '/cuenta' },
];

export const LusionMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Variantes para la animación de los links
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
    exit: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  };

  const linkVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { ease: 'easeOut', duration: 0.5 } },
    exit: { y: 20, opacity: 0 },
  };

  return (
    <>
      {/* Botón de Menú Fijo */}
      <nav className="fixed top-0 left-0 w-full z-[100] p-6 md:p-10 flex justify-between items-center mix-blend-difference pointer-events-none">
        <Link href="/" className="text-white text-xl md:text-2xl font-bold tracking-tighter pointer-events-auto">
          EL CLUB DE LA IMAGINACIÓN
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white text-black px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-110 transition-transform active:scale-95 pointer-events-auto"
        >
          {isOpen ? 'CERRAR' : 'MENÚ'}
        </button>
      </nav>

      {/* Overlay del Menú */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#f5f5f5] z-[90] flex flex-col md:flex-row"
          >
            {/* Sección Izquierda: Links Principales */}
            <div className="flex-1 flex flex-col justify-center px-10 md:px-20 border-r border-black/5">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="space-y-4"
              >
                {menuLinks.map((link) => (
                  <motion.div key={link.name} variants={linkVariants}>
                    <Link
                      href={link.href}
                      className="text-black text-4xl md:text-6xl lg:text-8xl font-medium hover:italic transition-all duration-300 block"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Sección Derecha: Newsletter y Extras */}
            <div className="w-full md:w-[400px] bg-white p-10 md:p-20 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
                  Dosis Mentales
                </h4>
                <p className="text-sm text-gray-600 mb-6">
                  Suscríbete a nuestro newsletter semanal con contenido exclusivo para expandir tu
                  mente
                </p>
                <Link
                  href="/#planes"
                  className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:scale-105 transition-transform"
                  onClick={() => setIsOpen(false)}
                >
                  Ver Planes
                  <span>→</span>
                </Link>
              </div>

              <div className="space-y-10 mt-10">
                <Link
                  href="/tutor"
                  className="flex items-center gap-4 group cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-8 h-8 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                    +
                  </div>
                  <span className="font-bold uppercase tracking-widest text-sm">TUTOR IA</span>
                </Link>

                <div className="text-[10px] text-gray-400 uppercase tracking-[0.3em] space-y-2">
                  <Link href="/blog" className="block hover:text-black transition-colors">
                    Biblioteca
                  </Link>
                  <Link href="/foro" className="block hover:text-black transition-colors">
                    Comunidad
                  </Link>
                  <Link href="/#planes" className="block hover:text-black transition-colors">
                    Planes
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
