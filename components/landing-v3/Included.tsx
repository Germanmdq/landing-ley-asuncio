"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const masters = [
    "Neville Goddard", "Joseph Murphy", "Emmet Fox",
    "Florence Scovel Shinn", "Abraham Hicks", "James Allen",
    "Ernest Holmes", "Charles Haanel", "Ralph Waldo Trine",
    "Robert Collier", "Thomas Troward", "Wallace Wattles",
    "Christian D. Larson", "William Walker Atkinson", "Prentice Mulford",
    "Genevieve Behrend", "Orison Swett Marden", "Napoleon Hill",
    "Elizabeth Towne", "Julia Seton", "Annie Rix Militz",
    "Emma Curtis Hopkins", "Malinda Cramer", "Nona L. Brooks",
    "Fenwicke Holmes", "Horatio Dresser"
];

export default function Included() {
    return (
        <section className="py-16 md:py-32 px-4">
            <div className="container max-w-7xl mx-auto">
                <div className="text-center mb-12 md:mb-20">
                    <h2 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6 tracking-tight">Todo lo que necesitás para tu maestría</h2>
                    <p className="text-lg md:text-xl text-text-muted max-w-3xl mx-auto">
                        Un ecosistema completo de sabiduría espiritual, indexado y listo para responderte.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-24">
                    {[
                        {
                            title: "26 Maestros",
                            desc: "Desde Neville hasta Abraham Hicks. Toda la línea del Nuevo Pensamiento."
                        },
                        {
                            title: "Biblia RV1960",
                            desc: "La versión clásica completa, lista para ser interpretada metafísicamente."
                        },
                        {
                            title: "Concordancia Strong",
                            desc: "8,674 palabras hebreas y 5,624 griegas con sus significados originales."
                        },
                        {
                            title: "900+ Obras",
                            desc: "Textos y audios originales. La biblioteca más grande en español."
                        }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-6 md:p-8 rounded-2xl md:rounded-[2rem] bg-white/5 border border-white/10 hover:border-primary/30 transition-colors group"
                        >
                            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">{feature.title}</h3>
                            <p className="text-sm md:text-base text-text-muted leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-3xl md:rounded-[3rem] p-8 md:p-12 border border-white/10">
                    <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center">Enseñanzas de los Grandes Maestros</h3>
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                        {masters.map((master, i) => (
                            <span
                                key={i}
                                className="px-4 py-2 md:px-6 md:py-3 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-sm font-medium hover:bg-primary hover:text-black transition-all cursor-default"
                            >
                                {master}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
