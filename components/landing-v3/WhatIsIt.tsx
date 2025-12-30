"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

export default function WhatIsIt() {
    return (
        <section className="py-20 md:py-32 px-4 bg-surface/20">
            <div className="container max-w-4xl mx-auto">
                <div className="flex flex-col items-center text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6"
                    >
                        <div className="w-4 h-4 rounded-full bg-primary" />
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">¿QUÉ ES?</h2>
                </div>

                <div className="space-y-12 md:space-y-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <p className="text-2xl md:text-3xl font-light text-text-muted leading-relaxed">
                                Imaginá que son las <span className="text-white font-medium italic">2 de la mañana.</span>
                            </p>
                            <p className="text-lg md:text-xl text-text-muted">
                                Tenés una duda. Una emoción. Un deseo. <br />
                                No querés opiniones mezcladas ni respuestas genéricas.
                            </p>
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 text-primary">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    <span className="text-xl font-bold">Querés verdad.</span>
                                </div>
                                <div className="flex items-center gap-3 text-primary">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    <span className="text-xl font-bold">Querés claridad.</span>
                                </div>
                                <div className="flex items-center gap-3 text-primary">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    <span className="text-xl font-bold">Querés volver a tu centro.</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-10 backdrop-blur-sm"
                        >
                            <p className="text-lg md:text-xl leading-relaxed text-gray-200">
                                <span className="text-primary font-bold">Sabiduría Online</span> es un tutor espiritual conversacional que te acompaña en tiempo real con las enseñanzas originales de <span className="text-white font-semibold">Neville Goddard</span> y otros grandes maestros del Nuevo Pensamiento, junto con la Biblia interpretada metafísicamente.
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: "No inventa.", desc: "Respuestas basadas únicamente en textos reales." },
                            { title: "No opina.", desc: "Sin interpretaciones modernas o diluidas." },
                            { title: "No adorna.", desc: "La verdad directa de la fuente original." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center"
                            >
                                <h4 className="text-xl font-bold mb-3 text-primary">{item.title}</h4>
                                <p className="text-sm text-text-muted">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <p className="text-xl md:text-2xl text-text-muted leading-relaxed">
                            Te responde desde las fuentes reales y te guía a aplicar lo que leés en tu vida diaria.
                        </p>
                        <div className="h-px w-24 bg-primary/30 mx-auto my-8" />
                        <p className="text-2xl md:text-3xl font-bold text-white">
                            Esto no te enseña algo nuevo. <br />
                            <span className="text-primary">Te ayuda a recordar lo que siempre fuiste.</span>
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
