"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Briefcase, Moon, ArrowRight } from 'lucide-react';

export default function UseCases() {
    const cases = [
        {
            icon: <Sun className="w-6 h-6" />,
            time: "Antes del trabajo",
            query: "Necesito empezar el día con claridad",
            result: "Salmo, significado original y enfoque práctico"
        },
        {
            icon: <Briefcase className="w-6 h-6" />,
            time: "Un problema en el trabajo",
            query: "Mi jefe me genera conflicto",
            result: "Versículo + interpretación de Neville + ejercicio de imaginación"
        },
        {
            icon: <Moon className="w-6 h-6" />,
            time: "Antes de dormir",
            query: "Quiero manifestar algo esta semana",
            result: "Versículo + técnica nocturna guiada"
        }
    ];

    return (
        <section className="py-20 md:py-32 px-4 bg-surface/10">
            <div className="container max-w-5xl mx-auto">
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">✨ Casos de uso reales</h2>
                    <p className="text-lg text-text-muted">Esto no es teoría. Es práctica consciente.</p>
                </div>

                <div className="space-y-6">
                    {cases.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="group p-6 md:p-10 rounded-[2rem] bg-white/5 border border-white/10 hover:border-primary/30 transition-all"
                        >
                            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
                                <div className="flex items-center gap-4 min-w-[240px]">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-xs text-text-muted uppercase tracking-widest font-bold">{item.time}</p>
                                        <p className="text-lg font-bold">"{item.query}"</p>
                                    </div>
                                </div>

                                <div className="hidden md:block">
                                    <ArrowRight className="text-primary/30 group-hover:translate-x-2 transition-transform" />
                                </div>

                                <div className="flex-1 p-4 md:p-6 rounded-2xl bg-black/40 border border-white/5">
                                    <p className="text-primary font-medium leading-relaxed">
                                        {item.result}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
