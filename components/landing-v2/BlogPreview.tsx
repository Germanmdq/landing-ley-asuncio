"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BlogPreview() {
    const posts = [
        {
            title: "SATS explicado simple: cómo practicar sin tensión",
            category: "Práctica"
        },
        {
            title: "Estados: por qué tu vida repite lo que sostenés",
            category: "Conceptos"
        },
        {
            title: "Vivir desde el final: una guía práctica de 7 días",
            category: "Guía"
        }
    ];

    return (
        <section className="py-24 px-4 bg-background border-t border-white/5">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="space-y-4 max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">El blog en español que no existe en otro lado</h2>
                        <p className="text-xl text-white/60">
                            Guías largas, prácticas y sin vueltas. Para entender y aplicar, no para inspirarte dos minutos.
                        </p>
                    </div>
                    <Link
                        href="/blog"
                        className="hidden md:flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors text-white"
                    >
                        Leer el Blog <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {posts.map((post, i) => (
                        <motion.article
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group cursor-pointer"
                        >
                            <Link href="/blog">
                                <div className="aspect-[4/3] bg-white/5 rounded-2xl mb-6 border border-white/5 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white/90 border border-white/10">
                                        {post.category}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors leading-tight mb-2">
                                    {post.title}
                                </h3>
                                <div className="flex items-center gap-2 text-sm text-white/40 group-hover:text-white/60 transition-colors">
                                    Leer artículo <ArrowRight className="w-3 h-3" />
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>

                <div className="mt-8 md:hidden text-center">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors text-white"
                    >
                        Leer el Blog <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
