"use client";

import { motion } from "framer-motion";
import { Library, Users, Video, MessageCircle } from "lucide-react";

export default function PillarsSection() {
    const pillars = [
        {
            icon: Library,
            title: "Biblioteca del Club",
            text: "Material real, ordenado para practicar. Neville al centro. Otras voces cuando querés ampliar."
        },
        {
            icon: Users,
            title: "Comunidad (Foro)",
            text: "Preguntás, compartís y sostenés el proceso con otros. Sin humo. Sin show. Con práctica."
        },
        {
            icon: Video,
            title: "Talleres en vivo",
            text: "Reuniones lunes, miércoles y viernes para practicar en comunidad y no soltar el hilo."
        },
        {
            icon: MessageCircle,
            title: "Acompañamiento “Ante…”",
            text: "Cuando la mente se te va, esto te trae de vuelta. Disponible 24/7 (solo Oro)."
        }
    ];

    return (
        <section className="py-24 px-4 bg-background relative overflow-hidden">
            <div className="max-w-6xl mx-auto space-y-16 relative z-10">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                        Todo vive adentro del Club
                    </h2>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        No venís a consumir contenido. Venís a practicar, sostener y volver al centro.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {pillars.map((pillar, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group"
                        >
                            <div className="h-12 w-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
                                <pillar.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{pillar.title}</h3>
                            <p className="text-white/60 leading-relaxed text-sm">
                                {pillar.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
