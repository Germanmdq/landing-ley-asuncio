"use client";

import { Card } from "@/components/ui/Card";
import { MessageSquare, BookOpen, Sparkles, Brain, Heart, Zap, Image as ImageIcon, History, Layers } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        icon: MessageSquare,
        title: "Chat en Primera Persona",
        description: "Habla directamente con Neville, no con un bot que habla 'de' él."
    },
    {
        icon: BookOpen,
        title: "300+ Conferencias",
        description: "Acceso instantáneo a toda su sabiduría, indexada y contextualizada."
    },
    {
        icon: Zap,
        title: "Técnicas Paso a Paso",
        description: "Instrucciones claras para aplicar la Ley de Asunción."
    },
    {
        icon: Brain,
        title: "Interpretación Bíblica",
        description: "Entiende la Biblia como un mapa psicológico, no histórico."
    },
    {
        icon: Heart,
        title: "Testimonios Reales",
        description: "Casos de éxito de sus conferencias para inspirarte."
    },
    {
        icon: Sparkles,
        title: "Planes Personalizados",
        description: "Rutinas diarias de imaginación diseñadas para tu meta."
    },
    {
        icon: ImageIcon,
        title: "Imágenes Simbólicas",
        description: "Visualiza conceptos complejos con metáforas visuales."
    },
    {
        icon: History,
        title: "Memoria del Usuario",
        description: "Neville recuerda tus conversaciones y tu progreso."
    },
    {
        icon: Layers,
        title: "Biblioteca Completa",
        description: "Organiza y guarda tus conferencias favoritas."
    }
];

export default function Features() {
    return (
        <section className="py-20 bg-background">
            <div className="container px-4 mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                    Todo lo que necesitas para <span className="text-primary">Asumir</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card hoverEffect className="h-full">
                                <feature.icon className="w-10 h-10 text-primary mb-4" />
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-text-muted">{feature.description}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
