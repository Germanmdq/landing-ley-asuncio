"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, Heart, DollarSign, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Actionable() {
    const examples = [
        {
            icon: <Heart className="text-red-400" />,
            problem: "Tengo ansiedad antes de una reunión importante.",
            solution: "Técnica SATS paso a paso",
            answer: "No intentes 'calmarte'. Neville dice: 'Sentate y visualizá el apretón de manos final, sintiendo el alivio de que todo salió perfecto'. Repetí esa escena corta hasta que la ansiedad se convierta en certeza.",
            source: "At Your Command (1939)"
        },
        {
            icon: <DollarSign className="text-green-400" />,
            problem: "Necesito resolver un problema de dinero urgente.",
            solution: "Técnica del Sueño de Murphy",
            answer: "Antes de dormir, afirmá: 'Dios es mi fuente instantánea y eterna'. Murphy explica que al saturar el subconsciente en el estado previo al sueño, la solución aparece como una idea o coincidencia al día siguiente.",
            source: "The Power of Your Subconscious Mind"
        },
        {
            icon: <BookOpen className="text-blue-400" />,
            problem: "¿Qué significa 'Pedid y se os dará' realmente?",
            solution: "Significado Strong + Aplicación",
            answer: "En griego, 'Aiteite' (G154) implica pedir con la seguridad de quien ya tiene el derecho. No es un ruego, es un reclamo de tu herencia divina. Pedí DESDE el cumplimiento, no PARA el cumplimiento.",
            source: "Strong's G154 + Interpretación Metafísica"
        }
    ];

    return (
        <section className="py-16 md:py-32 px-4 bg-surface/10">
            <div className="container max-w-7xl mx-auto">
                <div className="text-center mb-12 md:mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">No solo responde, te explica qué hacer</h2>
                    <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto">
                        Transformamos la teoría en práctica inmediata. Respuestas accionables para tu vida diaria.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {examples.map((example, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-primary/30 transition-all duration-500 flex flex-col"
                        >
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-500">
                                {React.cloneElement(example.icon as React.ReactElement, { className: "w-5 h-5 md:w-6 md:h-6" })}
                            </div>

                            <div className="mb-4 md:mb-6">
                                <span className="text-[8px] md:text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2 block">Situación</span>
                                <p className="text-base md:text-lg font-medium text-white italic">"{example.problem}"</p>
                            </div>

                            <div className="flex-1 mb-6 md:mb-8">
                                <div className="flex items-center gap-2 mb-3 md:mb-4 text-primary">
                                    <Zap size={14} />
                                    <span className="text-[10px] md:text-sm font-bold uppercase tracking-wider">{example.solution}</span>
                                </div>
                                <p className="text-sm md:text-base text-text-muted leading-relaxed">
                                    {example.answer}
                                </p>
                            </div>

                            <div className="pt-4 md:pt-6 border-t border-white/5 flex items-center justify-between">
                                <span className="text-[10px] md:text-xs text-text-muted font-medium">{example.source}</span>
                                <ArrowRight className="text-primary w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto text-center mt-16 md:mt-24">
                    <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tighter">
                        Invertí en tu <span className="text-primary">poder</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-text-muted mb-12 max-w-2xl mx-auto leading-relaxed">
                        Tu tutor personal espiritual, disponible 24/7. <br />
                        No es una herramienta. Es un recordatorio de quién sos.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-12">
                        <Button size="lg" className="w-full md:w-auto h-16 px-10 text-lg font-bold bg-primary text-black hover:bg-primary/90 rounded-2xl shadow-xl shadow-primary/20">
                            PLAN MENSUAL – $15
                        </Button>
                        <Button size="lg" className="w-full md:w-auto h-16 px-10 text-lg font-bold bg-white text-black hover:bg-gray-100 rounded-2xl">
                            PLAN ANUAL – $150
                        </Button>
                        <Button size="lg" variant="outline" className="w-full md:w-auto h-16 px-10 text-lg font-bold border-white/10 hover:bg-white/5 rounded-2xl">
                            DE POR VIDA – $250
                        </Button>
                    </div>

                    <p className="text-sm text-text-muted italic">
                        Acceso inmediato. Sin contratos. Cancelá cuando quieras.
                    </p>
                </div>
            </div>
        </section>
    );
}
