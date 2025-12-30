"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star } from 'lucide-react';

export default function Testimonials() {
    const testimonials = [
        {
            name: "Laura M.",
            role: "Estudiante de Metafísica",
            image: "/landing-v3/testimonial_user_1_1766182913759.png",
            text: "Increíble. Antes pasaba horas buscando en YouTube qué dijo Neville sobre la dieta mental. Ahora le pregunto al tutor y me da la cita exacta con la técnica. Me cambió la forma de estudiar.",
            stars: 5
        },
        {
            name: "Carlos R.",
            role: "Emprendedor",
            image: "/landing-v3/testimonial_user_2_1766182928512.png",
            text: "La integración con la Concordancia Strong es una locura. Entender el significado original de las palabras en la Biblia me dio una profundidad que no encontré en ningún curso de 500 dólares.",
            stars: 5
        },
        {
            name: "Roberto G.",
            role: "Practicante Senior",
            image: "/landing-v3/testimonial_user_3_1766182943698.png",
            text: "Tengo 20 años leyendo a Murphy y Troward. Pensé que no necesitaba esto, pero la velocidad para encontrar referencias cruzadas entre maestros es algo que no existe en ningún otro lado.",
            stars: 5
        }
    ];

    return (
        <section className="py-16 md:py-32 px-4 bg-surface/10">
            <div className="container max-w-7xl mx-auto">
                <div className="text-center mb-12 md:mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Lo que dicen los estudiantes</h2>
                    <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto">
                        Más de 1,000 personas ya están usando el Tutor para profundizar en su camino espiritual.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] bg-white/5 border border-white/10 flex flex-col"
                        >
                            <div className="flex gap-1 mb-4 md:mb-6">
                                {[...Array(t.stars)].map((_, j) => (
                                    <Star key={j} size={14} className="fill-primary text-primary" />
                                ))}
                            </div>

                            <p className="text-base md:text-lg text-gray-200 mb-6 md:mb-8 flex-1 leading-relaxed italic">
                                "{t.text}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-primary/20">
                                    <Image
                                        src={t.image}
                                        alt={t.name}
                                        width={48}
                                        height={48}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-sm md:text-base">{t.name}</h4>
                                    <p className="text-[10px] md:text-xs text-text-muted uppercase tracking-widest">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
