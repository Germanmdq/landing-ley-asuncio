"use client";

import { Calendar } from "lucide-react";
import Link from "next/link";

export default function WorkshopsSection() {
    return (
        <section className="py-24 px-4 bg-[#080808] border-y border-white/5">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
                        <Calendar className="w-3 h-3" /> En vivo
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        Talleres en vivo:<br />
                        <span className="text-white/40">Lunes, Miércoles y Viernes</span>
                    </h2>

                    <p className="text-xl text-white/60">
                        Práctica guiada para sostener el estado en la vida real.
                    </p>

                    <ul className="space-y-4">
                        {[
                            "Encuentro en vivo (práctica + explicación + cierre)",
                            "Espacio para preguntas",
                            "Material y continuidad (sin reiniciar cada semana)"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-white/80">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                                {item}
                            </li>
                        ))}
                    </ul>

                    <div className="pt-4">
                        <Link
                            href="/#planes"
                            className="text-white font-medium border-b border-white/30 hover:border-white transition-colors"
                        >
                            Ver Plan Plata
                        </Link>
                        <p className="mt-2 text-xs text-white/30 uppercase tracking-wider">
                            Disponible para Plata y Oro
                        </p>
                    </div>
                </div>

                {/* Visual Representation of Schedule */}
                <div className="grid grid-cols-1 gap-4">
                    {['Lunes', 'Miércoles', 'Viernes'].map((day, i) => (
                        <div key={day} className="bg-white/5 border border-white/10 p-6 rounded-xl flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-white">{day}</h3>
                                <p className="text-sm text-white/40">19:00 HS (ARG) · Zoom</p>
                            </div>
                            <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
