"use client";

import Link from "next/link";
import { Check } from "lucide-react";

export default function PlansV2() {
    return (
        <section id="planes" className="py-24 px-4 bg-background border-t border-white/5">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-white">Elegí tu forma de entrar</h2>
                    <p className="text-xl text-white/60">Una casa. Tres niveles de acceso.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {/* BRONCE */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col">
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-white mb-2">Club Bronce</h3>
                            <p className="text-white/50 text-sm">Para estar cerca y sostener el foco semana a semana.</p>
                        </div>
                        <ul className="space-y-3 mb-8 flex-1">
                            <li className="flex gap-3 text-white/70 text-sm">
                                <Check className="w-4 h-4 text-white/40" /> Newsletters del Club
                            </li>
                        </ul>
                        <Link
                            href="/signup?plan=bronce"
                            className="w-full py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 text-center transition-colors"
                        >
                            Entrar en Bronce
                        </Link>
                    </div>

                    {/* PLATA */}
                    <div className="bg-[#111] border border-white/20 rounded-2xl p-8 flex flex-col relative">
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-white mb-2">Club Plata</h3>
                            <p className="text-white/50 text-sm">Todo el Club, con práctica real y comunidad.</p>
                        </div>
                        <ul className="space-y-3 mb-8 flex-1">
                            {["Biblioteca completa", "Comunidad (foro)", "Blog completo", "Videos + libros", "Talleres en vivo L/M/V"].map((item, i) => (
                                <li key={i} className="flex gap-3 text-white/90 text-sm">
                                    <Check className="w-4 h-4 text-white" /> {item}
                                </li>
                            ))}
                            <li className="flex gap-3 text-white/30 text-sm line-through decoration-white/30">
                                <Check className="w-4 h-4 opacity-0" /> Acompañamiento Tutor
                            </li>
                        </ul>
                        <Link
                            href="/signup?plan=plata"
                            className="w-full py-3 bg-white text-black hover:bg-white/90 font-bold rounded-xl text-center transition-colors"
                        >
                            Entrar en Plata
                        </Link>
                    </div>

                    {/* ORO */}
                    <div className="bg-gradient-to-b from-amber-500/10 to-black border border-amber-500/30 rounded-2xl p-8 flex flex-col relative shadow-[0_0_30px_-10px_rgba(251,191,36,0.2)]">
                        <div className="absolute top-0 right-0 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
                            RECOMENDADO
                        </div>
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-amber-400 mb-2">Club Oro</h3>
                            <p className="text-white/50 text-sm">Todo Plata + acompañamiento inmediato cuando lo necesitás.</p>
                        </div>
                        <ul className="space-y-3 mb-8 flex-1">
                            <li className="flex gap-3 text-white/90 text-sm font-medium">
                                <Check className="w-4 h-4 text-amber-400" /> Todo Plata
                            </li>
                            <li className="flex gap-3 text-white/90 text-sm font-bold text-amber-100">
                                <Check className="w-4 h-4 text-amber-400" /> Tutor 24/7
                            </li>
                            <li className="flex gap-3 text-white/90 text-sm font-bold text-amber-100">
                                <Check className="w-4 h-4 text-amber-400" /> Modo “Ante…” + anclas
                            </li>
                            <li className="flex gap-3 text-white/90 text-sm font-bold text-amber-100">
                                <Check className="w-4 h-4 text-amber-400" /> Planes 7/15/30
                            </li>
                        </ul>
                        <Link
                            href="/signup?plan=oro"
                            className="w-full py-3 bg-amber-500 text-black hover:bg-amber-400 font-bold rounded-xl text-center transition-colors shadow-lg shadow-amber-900/20"
                        >
                            Entrar en Oro
                        </Link>
                    </div>
                </div>

                <div className="mt-12 text-center text-sm space-y-1">
                    <p className="text-white/60"><strong className="text-white">Plata</strong> es la casa completa.</p>
                    <p className="text-white/60"><strong className="text-white">Oro</strong> es la casa + el acompañamiento inmediato.</p>
                </div>
            </div>
        </section>
    );
}
