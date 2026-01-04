"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroV2() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center px-4 overflow-hidden">
            {/* Lusion-style animated background */}
            <div className="fixed inset-0 -z-10 bg-black">
                {/* Animated gradient orbs */}
                <motion.div
                    className="absolute top-0 left-0 w-full h-full"
                    animate={{
                        background: [
                            "radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
                            "radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
                            "radial-gradient(circle at 50% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
                            "radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
                        ]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute top-0 left-0 w-full h-full"
                    animate={{
                        background: [
                            "radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.1) 0%, transparent 50%)",
                            "radial-gradient(circle at 20% 80%, rgba(124, 58, 237, 0.1) 0%, transparent 50%)",
                            "radial-gradient(circle at 50% 20%, rgba(124, 58, 237, 0.1) 0%, transparent 50%)",
                            "radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.1) 0%, transparent 50%)",
                        ]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                {/* Grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto text-center space-y-12">
                {/* Main Heading - Lusion style */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-6"
                >
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none">
                        <span className="block text-white/90">El Club de</span>
                        <span className="block bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                            la Imaginación
                        </span>
                    </h1>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto font-light"
                >
                    Un lugar para sostener el estado con práctica real
                </motion.p>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
                >
                    <Link
                        href="/#planes"
                        className="group px-10 py-5 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-all flex items-center justify-center gap-3 text-lg"
                    >
                        Explorar
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
