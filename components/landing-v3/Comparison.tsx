"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { X, Check, Info } from 'lucide-react';

export default function Comparison() {
    return (
        <section className="py-16 md:py-32 px-4 bg-surface/30">
            <div className="container max-w-6xl mx-auto">
                <div className="text-center mb-12 md:mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">¿Por qué no usar ChatGPT?</h2>
                    <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto">
                        La IA genérica suele "alucinar" o mezclar conceptos. Para tu camino espiritual, necesitás la palabra exacta del maestro.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-stretch">
                    {/* ChatGPT Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white/5 border border-white/10 rounded-3xl md:rounded-[2rem] p-6 md:p-8 flex flex-col"
                    >
                        <div className="flex items-center gap-3 mb-6 md:mb-8">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-500/20 flex items-center justify-center">
                                <X className="text-gray-400 w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-400">ChatGPT / IA Genérica</h3>
                        </div>

                        <div className="space-y-6 flex-1">
                            <div className="p-4 md:p-6 rounded-2xl bg-black/40 border border-white/5">
                                <p className="text-[10px] md:text-sm text-gray-500 mb-2 italic">Usuario: "¿Cómo hago la técnica de la tijera de podar de Neville?"</p>
                                <p className="text-sm md:text-base text-gray-300 leading-relaxed">"La técnica consiste en visualizar que cortás las cosas malas de tu vida con una tijera imaginaria antes de dormir..."</p>
                                <div className="mt-4 flex items-center gap-2 text-red-400 text-[10px] md:text-xs font-bold uppercase tracking-wider">
                                    <Info size={14} /> Respuesta Genérica / Incompleta
                                </div>
                            </div>

                            <ul className="space-y-3 md:space-y-4">
                                {[
                                    "Mezcla autores y conceptos",
                                    "No cita fuentes reales",
                                    "Inventa frases que el maestro nunca dijo",
                                    "Respuestas superficiales"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-500 text-sm md:text-base">
                                        <X className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Tutor Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-primary/5 border border-primary/20 rounded-3xl md:rounded-[2rem] p-6 md:p-8 flex flex-col relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4">
                            <div className="bg-primary text-black text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter">
                                Recomendado
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mb-6 md:mb-8">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                <Check className="text-primary w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-white">Sabiduría Online</h3>
                        </div>

                        <div className="space-y-6 flex-1">
                            <div className="p-4 md:p-6 rounded-2xl bg-black/60 border border-primary/20 shadow-[0_0_30px_rgba(var(--primary-rgb),0.1)]">
                                <p className="text-[10px] md:text-sm text-gray-500 mb-2 italic">Usuario: "¿Cómo hago la técnica de la tijera de podar de Neville?"</p>
                                <p className="text-sm md:text-base text-gray-200 leading-relaxed">"Neville explica en su conferencia de 1954 que no es solo 'cortar', sino REVISAR el día: 'Al final del día, repasá cada incidente y reescribilo como te hubiera gustado que fuera...'"</p>
                                <div className="mt-4 flex items-center gap-2 text-primary text-[10px] md:text-xs font-bold uppercase tracking-wider">
                                    <Check size={14} /> Fuente: "The Pruning Shears of Revision" (1954)
                                </div>
                            </div>

                            <ul className="space-y-3 md:space-y-4">
                                {[
                                    "Citas textuales de 900+ obras",
                                    "Contexto histórico y fecha exacta",
                                    "Diferencia entre los 26 maestros",
                                    "Técnicas paso a paso sin errores"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-200 text-sm md:text-base">
                                        <Check className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
