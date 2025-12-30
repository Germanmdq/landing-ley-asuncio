"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, TrendingDown, Gem } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Pricing() {
    const plans = [
        {
            name: "Plan Mensual",
            price: "15",
            period: "/mes",
            desc: "Ideal para empezar tu camino.",
            features: [
                "Acceso completo",
                "Tutor personal 24/7",
                "Lectura en Texto y Audio",
                "Memoria de conversación",
                "Biblia + Strong's",
                "Acceso a 26 maestros"
            ],
            highlight: false,
            cta: "Comenzar Ahora"
        },
        {
            name: "Plan Anual",
            price: "150",
            period: "/año",
            desc: "Un solo pago, acceso total.",
            features: [
                "Todo lo del Plan Mensual",
                "Ahorrá 2 meses",
                "Soporte prioritario",
                "Planes personalizados",
                "Creación de imágenes IA",
                "Exportar historial a PDF"
            ],
            highlight: true,
            cta: "Elegir Plan Anual"
        },
        {
            name: "Acceso de por Vida",
            price: "250",
            period: " único",
            desc: "Acceso eterno y futuro.",
            features: [
                "Pago único para siempre",
                "Todas las actualizaciones futuras",
                "Nuevos maestros y funciones",
                "Acceso a eventos exclusivos",
                "Sin suscripciones",
                "Tu tutor para siempre"
            ],
            highlight: false,
            cta: "Acceso de por Vida"
        }
    ];

    return (
        <section className="py-20 md:py-32 px-4 bg-surface/30">
            <div className="container max-w-6xl mx-auto">
                <div className="text-center mb-16 md:mb-24">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-text-muted text-sm font-medium mb-8">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span>El Verdadero Valor</span>
                    </div>
                    <h2 className="text-3xl md:text-6xl font-bold mb-8 tracking-tight">Invertí en tu conciencia</h2>
                    <div className="max-w-3xl mx-auto space-y-6 text-lg md:text-xl text-text-muted leading-relaxed">
                        <p>¿Cuánto vale recordar quién sos a las <span className="text-white font-medium">2 AM?</span></p>
                        <p>¿Cuánto vale comprender una palabra en su <span className="text-white font-medium">significado original?</span></p>
                        <p>¿Cuánto vale volver a tu centro cuando <span className="text-white font-medium">todo afuera se mueve?</span></p>
                        <div className="h-px w-24 bg-primary/30 mx-auto my-8" />
                        <p className="text-white font-bold text-2xl">Esto no es un gasto. Es una inversión en tu estado de ser.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`relative p-8 md:p-10 rounded-[2.5rem] border flex flex-col ${plan.highlight
                                ? 'bg-primary/5 border-primary/30 shadow-[0_0_50px_rgba(var(--primary-rgb),0.1)]'
                                : 'bg-white/5 border-white/10'
                                }`}
                        >
                            {plan.highlight && (
                                <div className="absolute top-0 right-0 p-6">
                                    <div className="bg-primary text-black text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter">
                                        Más Popular
                                    </div>
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                                <p className="text-sm text-text-muted">{plan.desc}</p>
                            </div>

                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-4xl md:text-5xl font-bold">${plan.price}</span>
                                <span className="text-text-muted">{plan.period}</span>
                            </div>

                            <ul className="space-y-4 mb-10 flex-1">
                                {plan.features.map((feature, j) => (
                                    <li key={j} className="flex items-center gap-3 text-sm">
                                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                                        <span className="text-gray-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                size="lg"
                                className={`w-full h-14 rounded-2xl font-bold transition-all ${plan.highlight
                                    ? 'bg-primary text-black hover:bg-primary/90 shadow-lg shadow-primary/20'
                                    : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                            >
                                {plan.cta}
                            </Button>
                        </motion.div>
                    ))}
                </div>

                {/* Value Comparison */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto p-6 md:p-12 rounded-3xl md:rounded-[3rem] bg-primary/5 border border-primary/20 mt-12 md:mt-20"
                >
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                        <div className="flex-1 text-center md:text-left">
                            <h4 className="text-xl md:text-2xl font-bold mb-4 flex items-center justify-center md:justify-start gap-2">
                                <TrendingDown className="text-primary" />
                                Comparado con otras opciones
                            </h4>
                            <p className="text-sm md:text-base text-text-muted leading-relaxed">
                                Comprar los 900+ libros físicos te costaría más de <span className="text-white font-bold">$13,500 USD</span>.
                                Un curso de manifestación promedio sale <span className="text-white font-bold">$500 USD</span> y solo cubre un autor.
                                <br className="hidden md:block" /><br className="hidden md:block" />
                                Con Sabiduría Online, tenés TODO por el precio de una pizza al mes.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 md:gap-4 w-full md:w-auto">
                            <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-black/40 border border-white/5 text-center">
                                <p className="text-[10px] text-text-muted mb-1 uppercase">Libros</p>
                                <p className="text-lg md:text-xl font-bold text-red-400">$13k+</p>
                            </div>
                            <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-black/40 border border-white/5 text-center">
                                <p className="text-[10px] text-text-muted mb-1 uppercase">Cursos</p>
                                <p className="text-lg md:text-xl font-bold text-red-400">$500</p>
                            </div>
                            <div className="col-span-2 p-3 md:p-4 rounded-xl md:rounded-2xl bg-primary/20 border border-primary/30 text-center">
                                <p className="text-[10px] text-primary mb-1 uppercase">Sabiduría Online</p>
                                <p className="text-xl md:text-2xl font-bold text-white">$15</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
