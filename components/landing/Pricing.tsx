"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";

const plans = [
    {
        name: "Plan Mensual",
        price: "$15",
        period: "/mes",
        features: ["Mensajes ilimitados", "Biblioteca completa", "Planes ilimitados", "Acceso a 26 maestros"],
        cta: "Suscribirse",
        highlight: false
    },
    {
        name: "Plan Anual",
        price: "$100",
        period: "/año",
        features: ["Todo lo de Mensual", "Ahorra más de 40%", "Soporte prioritario", "Acceso anticipado"],
        cta: "Suscribirse y Ahorrar",
        highlight: true
    },
    {
        name: "Acceso de Por Vida",
        price: "$200",
        period: " pago único",
        features: ["Acceso ilimitado para siempre", "Todos los maestros actuales y futuros", "Soporte VIP", "Badge de fundador"],
        cta: "Obtener Acceso",
        highlight: false
    }
];

export default function Pricing() {
    return (
        <section className="py-20 bg-background">
            <div className="container px-4 mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                    Planes Simples
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
                    {plans.map((plan, index) => (
                        <Card
                            key={index}
                            className={`p-8 relative ${plan.highlight ? 'border-primary shadow-[0_0_30px_rgba(122,91,166,0.15)] scale-105 z-10' : 'border-white/10'}`}
                        >
                            {plan.highlight && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-black px-4 py-1 rounded-full text-sm font-bold">
                                    Más Popular
                                </div>
                            )}
                            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                            <div className="flex items-baseline mb-6">
                                <span className="text-4xl font-bold">{plan.price}</span>
                                <span className="text-text-muted ml-2">{plan.period}</span>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <Check className="w-5 h-5 text-primary" />
                                        <span className="text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                variant={plan.highlight ? "primary" : "outline"}
                                className="w-full"
                            >
                                {plan.cta}
                            </Button>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
