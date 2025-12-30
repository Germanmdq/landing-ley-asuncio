"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Moon, BookOpen, Clock, ArrowRight } from 'lucide-react';

export default function TwoAMSection() {
    return (
        <section className="py-24 relative overflow-hidden bg-surface/50 border-y border-white/5">
            <div className="container max-w-6xl mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium mb-6 border border-blue-500/20"
                    >
                        <Moon className="w-3 h-3" />
                        <span>Claridad Mental</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-5xl font-bold mb-6 text-white"
                    >
                        Imaginá que son las <span className="text-primary italic">2 de la mañana</span>.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-xl text-text-muted"
                    >
                        Tenés una duda. Una emoción. Un deseo. No querés ruido. Querés claridad. Querés volver al centro.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Sin vueltas.",
                            text: "Directo a lo esencial. Sin paja, sin teorías complejas innecesarias.",
                            icon: ArrowRight
                        },
                        {
                            title: "Con fuentes reales.",
                            text: "Material curado, práctica y método basado en la ley de la asunción.",
                            icon: BookOpen
                        },
                        {
                            title: "Con continuidad.",
                            text: "No es una charla suelta: es un proceso de transformación sostenido.",
                            icon: Clock
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="bg-black/20 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:border-white/20 transition-all group"
                        >
                            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                                <item.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                            <p className="text-text-muted leading-relaxed">
                                {item.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background noise/fog */}
            <div className="absolute inset-0 bg-[url('/landing-v3/noise.png')] opacity-[0.03] pointer-events-none" />
        </section>
    );
}
