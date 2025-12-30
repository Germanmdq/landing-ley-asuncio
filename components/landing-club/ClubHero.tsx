"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function ClubHero() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-16 md:pt-32 md:pb-32 px-4 overflow-hidden">

            <div className="container max-w-7xl mx-auto relative z-10 text-center">
                <div className="max-w-4xl mx-auto mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-text-muted text-sm font-medium mb-8"
                    >
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span>Disponible 24/7</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-8xl font-bold mb-8 tracking-tighter leading-[0.9] text-white"
                    >
                        El Club de la <span className="text-primary block md:inline">Imaginación</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl md:text-2xl text-text-muted max-w-3xl mx-auto mb-12 space-y-2 font-light"
                    >
                        <p className="font-medium text-white/90">Un espacio completo para acompañarte: práctica, biblioteca, comunidad y un tutor disponible cuando lo necesitás.</p>
                        <hr className="w-16 border-white/10 mx-auto my-6" />
                        <p className="text-lg">No es un curso pasajero.</p>
                        <p className="text-lg">No es una biblioteca suelta.</p>
                        <p className="text-white font-medium text-lg">Es un camino sostenido.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
                    >
                        <Link href="#planes" className="w-full sm:w-auto">
                            <Button size="lg" className="w-full h-14 md:h-16 px-8 md:px-10 text-base md:text-lg font-bold bg-white text-black hover:bg-gray-200 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all">
                                Empezar
                            </Button>
                        </Link>
                        <Link href="/como-funciona" className="w-full sm:w-auto">
                            <Button size="lg" variant="outline" className="w-full h-14 md:h-16 px-8 md:px-10 text-base md:text-lg font-bold border-white/20 bg-transparent text-white hover:bg-white/5 rounded-full backdrop-blur-sm">
                                Ver cómo funciona
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Background elements (optional subtle effects) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none opacity-40">
                <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px] animate-blob" />
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] animate-blob animation-delay-2000" />
            </div>
        </section >
    );
}
