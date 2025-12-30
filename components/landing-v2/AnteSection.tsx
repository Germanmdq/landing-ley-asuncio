"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export default function AnteSection() {
    const buttons = [
        "Ante ansiedad",
        "Ante duda",
        "Ante un bajón",
        "Ante enojo",
        "Ante relaciones",
        "Ante dinero",
        "Antes de dormir (SATS)",
        "Antes de una decisión"
    ];

    return (
        <section className="py-24 px-4 bg-background relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
                        <Zap className="w-3 h-3" /> Solo Oro
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                        Cuando la mente se desordena,<br />volvés en minutos
                    </h2>
                    <p className="text-xl text-white/60">
                        Elegís tu momento. Recibís una guía. Guardás un ancla. Seguís un plan.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
                    {buttons.map((btn, i) => (
                        <button
                            key={i}
                            className="px-4 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/50 transition-all text-white/80 hover:text-white font-medium text-sm text-left"
                        >
                            {btn}
                        </button>
                    ))}
                </div>

                {/* Mini Demo Box */}
                <div className="max-w-2xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 relative">
                    <div className="absolute -top-3 left-6 px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-full">
                        Ejemplo
                    </div>
                    <blockquote className="space-y-4">
                        <p className="text-amber-500 font-medium text-sm uppercase tracking-wide">Ante ansiedad:</p>
                        <p className="text-white/80 text-lg leading-relaxed">
                            "Bajamos el cuerpo 30s, nombramos el estado, elegimos una frase ancla y una acción mínima. Guardamos el ancla para volver cuando lo necesites."
                        </p>
                    </blockquote>
                </div>
            </div>
        </section>
    );
}
