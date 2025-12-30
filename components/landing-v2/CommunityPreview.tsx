"use client";

import { motion } from "framer-motion";
import { MessageSquare, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CommunityPreview() {
    const threads = [
        {
            title: "SATS — ¿Cómo lo sostengo sin forzarlo?",
            preview: "Me pasa que quiero controlar… ¿cómo vuelvo a la sensación natural?",
            author: "M",
            replies: 12
        },
        {
            title: "Relaciones — Me disparé y reaccioné",
            preview: "Quiero volver al estado sin repetir el conflicto.",
            author: "J",
            replies: 8
        },
        {
            title: "Dinero — Estoy en duda constante",
            preview: "“¿Cómo sostener el estado cuando el número todavía no aparece?”",
            author: "A",
            replies: 24
        }
    ];

    return (
        <section className="py-24 px-4 border-t border-white/5 bg-white/[0.02]">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Comunidad que sostiene</h2>
                    <p className="text-xl text-white/60">La práctica se vuelve real cuando deja de ser solitaria.</p>
                </div>

                <div className="grid gap-4 max-w-3xl mx-auto">
                    {threads.map((thread, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-[#111] border border-white/10 rounded-xl p-6 flex gap-4 hover:border-white/20 transition-colors cursor-default"
                        >
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 font-bold border border-white/5">
                                    {thread.author}
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="text-white font-medium truncate pr-4">{thread.title}</h3>
                                    <span className="text-xs text-white/30 flex-shrink-0 flex items-center gap-1">
                                        <MessageSquare className="w-3 h-3" /> {thread.replies}
                                    </span>
                                </div>
                                <p className="text-white/50 text-sm truncate">{thread.preview}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="/comunidad"
                        className="inline-flex items-center gap-2 text-white font-medium border-b border-transparent hover:border-white transition-all pb-0.5"
                    >
                        Ver la Comunidad <ArrowRight className="w-4 h-4" />
                    </Link>
                    <p className="mt-3 text-xs text-white/30 uppercase tracking-wider">
                        Disponible para Plata y Oro
                    </p>
                </div>
            </div>
        </section>
    );
}
