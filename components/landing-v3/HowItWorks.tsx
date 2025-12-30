"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Lightbulb, UserPlus, LogIn, Target, BookOpen, Search } from 'lucide-react';

export default function HowItWorks() {
    const steps = [
        {
            icon: <Target className="w-8 h-8" />,
            title: "Paso 1: Elegí tu maestro",
            desc: "Seleccioná con quién querés conversar. Neville, Murphy o la Biblia misma."
        },
        {
            icon: <MessageSquare className="w-8 h-8" />,
            title: "Paso 2: Una pregunta honesta",
            desc: "No necesitás conocimientos previos. Solo empezá a conversar."
        }
    ];

    return (
        <section className="py-20 md:py-32 px-4">
            <div className="container max-w-6xl mx-auto">
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Cómo empezar (Simple y rápido)</h2>
                    <p className="text-lg text-text-muted">No necesitás tarjeta para explorar. Solo una pregunta honesta.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-24 md:mb-32">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="relative p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-primary/30 transition-colors group"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <div className="text-primary">{step.icon}</div>
                            </div>
                            <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                            <p className="text-text-muted leading-relaxed">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Personalized Plans Section */}
                <div className="bg-primary/5 border border-primary/20 rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden">

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                                <Target className="w-4 h-4" />
                                <span>Tutorías y Planes Personalizados</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold mb-6">Este tutor te reconoce.</h3>
                            <p className="text-lg text-text-muted mb-8 leading-relaxed">
                                Guarda tu historial, recuerda lo que estás trabajando y puede acompañarte con planes personalizados de 7, 15 o 30 días.
                            </p>
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-black/40 border border-white/5 italic text-gray-400">
                                    "Marge, ¿cómo vas con lo que elegiste trabajar?"
                                </div>
                                <p className="text-sm text-primary font-medium">No es una conversación aislada. Es un proceso consciente.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {[
                                "Planes de 7, 15 o 30 días",
                                "Prácticas diarias específicas",
                                "Ejercicios nocturnos (SATS, afirmaciones)",
                                "Seguimiento de progreso real"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                    </div>
                                    <span className="font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Visual Example */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 md:mt-24 p-6 md:p-12 rounded-3xl md:rounded-[3rem] bg-black border border-white/10 shadow-2xl overflow-hidden relative"
                >
                    <div className="absolute bottom-0 right-0 p-4 md:p-8 opacity-10 block pointer-events-none">
                        <Search className="w-32 h-32 md:w-48 md:h-48" />
                    </div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                        <div>
                            <div className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] md:text-xs font-bold mb-4 md:mb-6 uppercase tracking-wider">
                                Ejemplo Real
                            </div>
                            <h4 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">"¿Cómo usar la técnica SATS?"</h4>
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <p className="text-[10px] md:text-sm text-text-muted mb-2 uppercase font-bold tracking-tight">Respuesta del Tutor:</p>
                                    <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                                        "El SATS (State Akin To Sleep) es un estado somnoliento donde la mente es más receptiva.
                                        Neville recomienda estos pasos: 1. Relajate... 2. Visualizá una escena corta... 3. Repetila hasta dormir."
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 text-primary text-xs md:text-sm font-medium">
                                    <BookOpen size={14} />
                                    <span>Fuente: Feeling is the Secret (1944)</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                            </div>
                            <div className="space-y-3">
                                <div className="h-3 w-3/4 bg-white/10 rounded" />
                                <div className="h-3 w-full bg-white/10 rounded" />
                                <div className="h-3 w-5/6 bg-white/10 rounded" />
                                <div className="h-3 w-1/2 bg-primary/20 rounded" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
