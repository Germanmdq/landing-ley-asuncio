"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export default function AnteTeaser() {
    const triggers = [
        "Ante ansiedad",
        "Ante duda",
        "Ante un bajón",
        "Ante enojo",
        "Ante relaciones",
        "Ante dinero",
        "Antes de dormir (SATS)",
        "Antes de una decisión"
    ];

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container max-w-6xl mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row gap-16 items-center">

                    <div className="flex-1">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                                Cuando la mente se va, <br />
                                <span className="text-purple-400">esto te trae de vuelta.</span>
                            </h2>
                            <p className="text-xl text-text-muted mb-8 leading-relaxed">
                                Elegís tu momento y recibís una guía clara para volver al estado correcto.
                                <br /><br />
                                <span className="text-white font-medium">Solo para miembros Oro:</span> Guardás anclas. Seguís planes de 7, 15 o 30 días. Volvés cuando lo necesitás.
                            </p>

                            <div className="p-6 bg-surface border border-border rounded-xl mb-8">
                                <p className="text-sm text-text-muted mb-2 font-mono uppercase tracking-wider">La diferencia</p>
                                <p className="text-white/90 italic">
                                    "Plata es la casa completa. Oro es la casa + la mano en el hombro cuando la mente se te va."
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    <div className="flex-1 w-full">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none" />

                            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                                Modo Ante...
                            </h3>

                            <div className="grid grid-cols-2 gap-3">
                                {triggers.map((trigger, i) => (
                                    <div
                                        key={i}
                                        className="bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg p-3 text-sm text-text-muted hover:text-white transition-colors cursor-default"
                                    >
                                        {trigger}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/10 text-center">
                                <p className="text-sm text-text-muted mb-4">Disponible en el Plan Oro</p>
                                <Button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium py-6 rounded-xl">
                                    Acceder al Acompañamiento
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
