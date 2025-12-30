"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function LibraryPreview() {
    const chips = [
        "Neville (Recomendado)",
        "Otros autores (26 voces)",
        "Ansiedad", "Dinero", "Relaciones", "Identidad", "Biblia metafísica",
        "Texto", "Video", "Libros"
    ];

    return (
        <section className="py-24 px-4 border-t border-white/5 bg-gradient-to-b from-[#050505] to-black">
            <div className="max-w-4xl mx-auto text-center space-y-12">
                <div className="space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Biblioteca viva</h2>
                    <p className="text-xl text-white/60">
                        Acá no venís a perderte: venís a encontrar el hilo.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3">
                    {chips.map((chip, i) => (
                        <span
                            key={i}
                            className={`
                                px-4 py-2 rounded-full text-sm font-medium border border-white/10
                                ${i === 0 ? 'bg-white text-black font-bold' : 'bg-white/5 text-white/80'}
                            `}
                        >
                            {chip}
                        </span>
                    ))}
                </div>

                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                    <Check className="w-4 h-4" />
                    <span className="font-semibold">Plata y Oro tienen acceso completo</span>
                </div>
            </div>
        </section>
    );
}
