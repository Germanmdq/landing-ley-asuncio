"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Laptop, Tablet, RefreshCw } from 'lucide-react';

export default function Devices() {
    const devices = [
        {
            icon: <Smartphone className="w-8 h-8" />,
            title: "En el celular",
            features: [
                "Preguntás mientras caminás",
                "Escuchás audios",
                "Leés versículos en cualquier momento"
            ]
        },
        {
            icon: <Laptop className="w-8 h-8" />,
            title: "En la computadora",
            features: [
                "Estudiás en profundidad",
                "Comparás textos",
                "Tomás notas"
            ]
        },
        {
            icon: <Tablet className="w-8 h-8" />,
            title: "En la tablet",
            features: [
                "Lectura nocturna",
                "Conferencias",
                "Navegación fluida"
            ]
        }
    ];

    return (
        <section className="py-20 md:py-32 px-4 bg-background">
            <div className="container max-w-6xl mx-auto">
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">🌍 Funciona en todos tus dispositivos</h2>
                    <p className="text-lg text-text-muted">Todo sincronizado. Empezás en un dispositivo, continuás en otro.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {devices.map((device, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-primary/30 transition-all group"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <div className="text-primary">{device.icon}</div>
                            </div>
                            <h3 className="text-xl font-bold mb-6">{device.title}</h3>
                            <ul className="space-y-4">
                                {device.features.map((feature, j) => (
                                    <li key={j} className="flex items-center gap-3 text-text-muted">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 p-6 rounded-2xl bg-primary/5 border border-primary/20 flex items-center justify-center gap-4 text-primary font-medium"
                >
                    <RefreshCw className="w-5 h-5 animate-spin-slow" />
                    <span>Sincronización en tiempo real garantizada</span>
                </motion.div>
            </div>
        </section>
    );
}
