"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-16 md:pt-32 md:pb-32 px-4 overflow-hidden">

            <div className="container max-w-7xl mx-auto relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
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
                        className="text-5xl md:text-8xl font-bold mb-8 tracking-tighter leading-[0.9]"
                    >
                        Tu tutor personal <span className="text-primary">espiritual</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl md:text-3xl text-text-muted max-w-3xl mx-auto mb-12 space-y-2 font-light"
                    >
                        <p>No es una herramienta.</p>
                        <p>No es una biblioteca.</p>
                        <p className="text-white font-medium">Es un recordatorio constante de quién sos.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
                    >
                        <Button size="lg" className="w-full sm:w-auto h-14 md:h-16 px-8 md:px-10 text-base md:text-lg font-bold bg-primary text-black hover:bg-primary/90 rounded-2xl shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)]">
                            Viví una Experiencia Única
                        </Button>
                        <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 md:h-16 px-8 md:px-10 text-base md:text-lg font-bold border-white/10 hover:bg-white/5 rounded-2xl">
                            Ver Cómo Funciona
                        </Button>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="relative max-w-5xl mx-auto"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                    <div className="rounded-3xl md:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative group">
                        <Image
                            src="/landing-v3/spiritual_tutor_flat_illustration_1766280606018.png"
                            alt="Spiritual Tutor Illustration"
                            width={1200}
                            height={675}
                            className="w-full h-auto transform group-hover:scale-105 transition-transform duration-[2s]"
                        />
                        <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500" />
                    </div>
                </motion.div>
            </div>
        </section >
    );
}
