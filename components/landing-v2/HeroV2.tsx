"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Sparkles, Users, BookOpen, MessageCircle } from "lucide-react";

const SpiralAnimation = dynamic(() => import('@/components/ui/SpiralAnimation').then(mod => ({ default: mod.SpiralAnimation })), {
    ssr: false,
});

export default function HeroV2() {
    return (
        <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 overflow-hidden pt-20">
            {/* Spiral Background */}
            <div className="absolute inset-0 -z-10">
                <SpiralAnimation />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
                {/* Badges */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-wrap justify-center gap-3 text-sm font-medium text-white/60"
                >
                    <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                        <BookOpen className="w-3.5 h-3.5" /> Blog Profundo
                    </span>
                    <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                        <Users className="w-3.5 h-3.5" /> Comunidad Activa
                    </span>
                    <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                        <MessageCircle className="w-3.5 h-3.5" /> Acompañamiento
                    </span>
                </motion.div>

                {/* Main Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="space-y-4"
                >
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                        El Club de la Imaginación
                    </h1>
                    <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                        Un lugar para sostener el estado con práctica real: biblioteca, comunidad, talleres y acompañamiento inmediato cuando lo necesitás.
                    </p>
                </motion.div>

                {/* The 3 Lines Punch */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col md:flex-row gap-4 justify-center items-center text-white/50 text-sm md:text-base"
                >
                    <p>No es un curso pasajero.</p>
                    <span className="hidden md:block text-white/20">•</span>
                    <p>No es una biblioteca suelta.</p>
                    <span className="hidden md:block text-white/20">•</span>
                    <p className="text-white/90 font-medium">Es un camino sostenido.</p>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
                >
                    <Link
                        href="/signup"
                        className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all flex items-center justify-center gap-2 group shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
                    >
                        Empezar Ahora
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        href="/#planes"
                        className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-xl hover:bg-white/10 transition-all font-medium backdrop-blur-sm"
                    >
                        Ver planes
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
