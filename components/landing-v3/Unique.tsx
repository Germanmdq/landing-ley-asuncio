"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

export default function Unique() {
    const features = [
        { name: "Citas textuales de 900+ obras", tutor: true, others: false },
        { name: "Contexto histórico y fecha exacta", tutor: true, others: false },
        { name: "Diferencia entre los 26 maestros", tutor: true, others: false },
        { name: "Técnicas paso a paso sin errores", tutor: true, others: "Difícil" },
        { name: "Interpretación metafísica Biblia", tutor: true, others: false },
        { name: "Concordancia Strong integrada", tutor: true, others: false },
        { name: "Sin anuncios ni distracciones", tutor: true, others: false }
    ];

    return (
        <section className="py-20 md:py-32 px-4">
            <div className="container max-w-5xl mx-auto">
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">¿Por qué es diferente?</h2>
                    <p className="text-lg md:text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
                        La mayoría de las herramientas generan respuestas <span className="text-white font-medium italic">probables.</span> <br className="hidden md:block" />
                        Este tutor funciona distinto: <span className="text-primary font-bold">No imagina respuestas.</span> <br className="hidden md:block" />
                        Recupera información real, la conecta y te la devuelve con claridad.
                    </p>
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/5">
                                <th className="p-10 text-lg font-bold">Funcionalidad</th>
                                <th className="p-10 text-lg font-bold text-primary text-center">Sabiduría Online</th>
                                <th className="p-10 text-lg font-bold text-text-muted text-center">Otros (YouTube/PDFs)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {features.map((feature, i) => (
                                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                    <td className="p-10 text-base text-gray-300 font-medium leading-tight">{feature.name}</td>
                                    <td className="p-10 text-center">
                                        <div className="flex justify-center">
                                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                                <Check className="text-primary w-6 h-6" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-10 text-center text-text-muted">
                                        {typeof feature.others === 'string' ? (
                                            <span className="text-sm font-medium">{feature.others}</span>
                                        ) : (
                                            <div className="flex justify-center">
                                                <X className="text-gray-600 w-6 h-6" />
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile List */}
                <div className="md:hidden space-y-4">
                    {features.map((feature, i) => (
                        <div key={i} className="p-6 rounded-[2rem] bg-white/5 border border-white/10">
                            <h4 className="text-white font-bold mb-6 text-lg leading-tight">{feature.name}</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 flex flex-col items-center text-center">
                                    <Check className="text-primary w-6 h-6 mb-2" />
                                    <span className="text-[10px] text-primary font-bold uppercase tracking-widest">Sabiduría Online</span>
                                </div>
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center">
                                    {typeof feature.others === 'string' ? (
                                        <span className="text-sm font-bold text-text-muted mb-2 h-6 flex items-center">{feature.others}</span>
                                    ) : (
                                        <X className="text-gray-600 w-6 h-6 mb-2" />
                                    )}
                                    <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Otros</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-sm text-text-muted italic">
                        (Para quien quiera saber más: técnicamente esto funciona con un sistema llamado RAG, que recupera información real antes de responder. Pero no necesitás saber eso para usarlo.)
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { title: "vs Audible", desc: "No podés hacerle preguntas a un audiolibro." },
                        { title: "vs YouTube", desc: "Sin anuncios, sin clickbait, solo la verdad." },
                        { title: "vs Google", desc: "Google te da links, nosotros te damos la respuesta." }
                    ].map((item, i) => (
                        <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-primary/20 transition-colors">
                            <h4 className="font-bold mb-3 text-base">{item.title}</h4>
                            <p className="text-sm text-text-muted">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
