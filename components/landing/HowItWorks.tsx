"use client";

import { motion } from "framer-motion";

const steps = [
    {
        number: "01",
        title: "Cuéntale tu deseo",
        description: "Sé específico sobre lo que quieres manifestar en tu vida."
    },
    {
        number: "02",
        title: "Recibe guía personalizada",
        description: "Neville te explicará qué técnica usar y cómo aplicarla."
    },
    {
        number: "03",
        title: "Practica diariamente",
        description: "Sigue el plan de acción y los ejercicios de imaginación."
    },
    {
        number: "04",
        title: "Vive en el final",
        description: "Mantén la asunción hasta que se endurezca en un hecho."
    }
];

export default function HowItWorks() {
    return (
        <section className="py-20 relative overflow-hidden">
            <div className="container px-4 mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                    Cómo Funciona
                </h2>

                <div className="max-w-4xl mx-auto">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="flex gap-8 mb-12 last:mb-0"
                        >
                            <div className="flex-shrink-0 w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center text-2xl font-bold text-primary bg-primary/10">
                                {step.number}
                            </div>
                            <div className="pt-2">
                                <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                                <p className="text-text-muted text-lg">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
