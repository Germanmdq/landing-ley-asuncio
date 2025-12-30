"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Languages, BookOpen, Quote } from 'lucide-react';

export default function BibleStrong() {
    return (
        <section className="py-16 md:py-32 px-4 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-blue-500/5 blur-[100px] md:blur-[150px] rounded-full -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="container max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] md:text-sm font-bold mb-6 md:mb-8">
                            <Languages size={18} />
                            <span>BIBLIA + CONCORDANCIA STRONG</span>
                        </div>
                        <h2 className="text-3xl md:text-6xl font-bold mb-6 md:mb-8 tracking-tight">
                            No leas solo la traducción. <br className="hidden md:block" />
                            <span className="text-blue-400">Entendé el origen.</span>
                        </h2>
                        <p className="text-lg md:text-xl text-text-muted mb-8 md:mb-10 leading-relaxed">
                            Integrado con la Concordancia Strong (8,674 palabras hebreas + 5,624 griegas).
                            Descubrí el significado real detrás de cada versículo con la interpretación metafísica de los maestros.
                        </p>

                        <div className="space-y-4 md:space-y-6">
                            {[
                                "Búsqueda instantánea por palabra o versículo",
                                "Significados originales en hebreo y griego",
                                "Interpretación de Neville y Murphy para cada pasaje",
                                "Diccionario etimológico espiritual"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 md:gap-4">
                                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-400" />
                                    </div>
                                    <span className="text-base md:text-lg text-gray-200">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="bg-surface border border-white/10 rounded-3xl md:rounded-[2.5rem] p-6 md:p-12 shadow-2xl relative overflow-hidden">

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6 md:mb-8">
                                    <BookOpen className="text-blue-400 w-5 h-5 md:w-6 md:h-6" />
                                    <span className="text-[10px] md:text-sm font-bold text-text-muted uppercase tracking-widest">Ejemplo: Éxodo 3:14</span>
                                </div>

                                <div className="mb-8 md:mb-10">
                                    <Quote className="text-blue-500/30 mb-4 w-8 h-8 md:w-10 md:h-10" />
                                    <p className="text-xl md:text-3xl font-serif italic text-white leading-snug">
                                        "Y respondió Dios a Moisés: <span className="text-blue-400 font-bold">YO SOY EL QUE SOY</span>."
                                    </p>
                                </div>

                                <div className="space-y-4 md:space-y-6">
                                    <div className="p-4 md:p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-[10px] font-bold text-blue-400 uppercase">Strong's H1961</span>
                                            <span className="text-[10px] text-text-muted">Hebreo: הָיָה</span>
                                        </div>
                                        <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                                            Significado: Existir, llegar a ser, acontecer. No es un nombre estático, es un VERBO de acción y existencia pura.
                                        </p>
                                    </div>

                                    <div className="p-4 md:p-6 rounded-2xl bg-purple-500/5 border border-purple-500/20">
                                        <span className="text-[10px] font-bold text-purple-400 uppercase mb-2 md:mb-3 block">Interpretación Metafísica</span>
                                        <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                                            "Moisés es tu conciencia. El 'Yo Soy' es tu conciencia de ser. Dios no es alguien afuera, es tu propia conciencia reclamando su poder."
                                            <span className="block mt-2 text-purple-400 font-medium">— Neville Goddard</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
