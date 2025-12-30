"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function HomePlans() {
    return (
        <section id="planes" className="py-24 relative overflow-hidden bg-surface/30">
            <div className="container max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Elegí tu forma de entrar al Club</h2>
                    <p className="text-xl text-text-muted">Una sola casa. Tres niveles de acceso.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 items-start">

                    {/* BRONCE */}
                    <div className="bg-surface border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-colors">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-white mb-2">Club Bronce</h3>
                            <p className="text-text-muted text-sm">Newsletters del Club para sostener el foco semana a semana.</p>
                        </div>
                        <div className="space-y-4 mb-8">
                            <li className="flex items-start gap-3 text-sm text-text-muted">
                                <Check className="w-5 h-5 text-white shrink-0" />
                                <span>Newsletters del Club</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-text-muted">
                                <Check className="w-5 h-5 text-white shrink-0" />
                                <span>Avisos y novedades</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-zinc-600">
                                <X className="w-5 h-5 shrink-0" />
                                <span>Sin Biblioteca ni Comunidad</span>
                            </li>
                        </div>
                        <Button variant="outline" className="w-full border-white/10 hover:bg-white/5">
                            Entrar en Bronce
                        </Button>
                    </div>

                    {/* PLATA */}
                    <div className="bg-surface border border-white/10 rounded-3xl p-8 relative hover:border-white/20 transition-all shadow-lg scale-105 z-10">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            Recomendado
                        </div>
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-white mb-2">Club Plata</h3>
                            <p className="text-text-muted text-sm">Todo el Club, con práctica real en vivo.</p>
                        </div>
                        <div className="space-y-4 mb-8">
                            <li className="flex items-start gap-3 text-sm text-white">
                                <Check className="w-5 h-5 text-green-400 shrink-0" />
                                <span>Biblioteca completa</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-white">
                                <Check className="w-5 h-5 text-green-400 shrink-0" />
                                <span>Videoteca + Libros</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-white">
                                <Check className="w-5 h-5 text-green-400 shrink-0" />
                                <span>Comunidad (Foro)</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-white font-medium">
                                <Check className="w-5 h-5 text-green-400 shrink-0" />
                                <span>Talleres Lunes, Miércoles y Viernes</span>
                            </li>
                        </div>
                        <Button className="w-full bg-white text-black hover:bg-gray-200">
                            Entrar en Plata
                        </Button>
                    </div>

                    {/* ORO */}
                    <div className="bg-gradient-to-b from-purple-900/20 to-surface border border-purple-500/20 rounded-3xl p-8 hover:border-purple-500/40 transition-colors">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                                Club Oro
                                <span className="text-purple-400 text-xs border border-purple-500/50 px-2 py-0.5 rounded uppercase">Full</span>
                            </h3>
                            <p className="text-text-muted text-sm">Todo lo anterior, más acompañamiento inmediato.</p>
                        </div>
                        <div className="space-y-4 mb-8">
                            <li className="flex items-start gap-3 text-sm text-text-muted">
                                <Check className="w-5 h-5 text-purple-400 shrink-0" />
                                <span>Todo Plata incluido</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-white font-bold">
                                <Check className="w-5 h-5 text-purple-400 shrink-0" />
                                <span>Tutor disponible 24/7</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-white">
                                <Check className="w-5 h-5 text-purple-400 shrink-0" />
                                <span>Modo "Ante..." y Anclas</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-white">
                                <Check className="w-5 h-5 text-purple-400 shrink-0" />
                                <span>Planes 7/15/30 días</span>
                            </li>
                        </div>
                        <Button className="w-full bg-purple-600 hover:bg-purple-500 text-white">
                            Entrar en Oro
                        </Button>
                    </div>

                </div>
            </div>
        </section>
    );
}
