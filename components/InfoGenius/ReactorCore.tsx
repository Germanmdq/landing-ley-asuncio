'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ReactorCoreProps {
    facts: string[];
}

export default function ReactorCore({ facts }: ReactorCoreProps) {
    const [currentFactIndex, setCurrentFactIndex] = useState(0);

    useEffect(() => {
        if (facts.length === 0) return;
        const interval = setInterval(() => {
            setCurrentFactIndex((prev) => (prev + 1) % facts.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [facts]);

    return (
        <div className="flex flex-col items-center justify-center h-[600px] w-full relative overflow-hidden bg-background/50 rounded-3xl border border-white/5">

            {/* Reactor Core Animation */}
            <div className="relative w-64 h-64 flex items-center justify-center mb-12">
                {/* Core */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        boxShadow: [
                            '0 0 20px rgba(255,255,255,0.3)',
                            '0 0 50px rgba(255,255,255,0.5)',
                            '0 0 20px rgba(255,255,255,0.3)'
                        ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-20 h-20 bg-primary rounded-full blur-sm z-10"
                />
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />

                {/* Orbit 1 */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute w-32 h-32 border-2 border-primary/30 rounded-full border-t-transparent"
                />

                {/* Orbit 2 */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    className="absolute w-48 h-48 border border-purple-500/30 rounded-full border-b-transparent"
                />

                {/* Orbit 3 */}
                <motion.div
                    animate={{ rotate: 180 }}
                    transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                    className="absolute w-60 h-60 border border-primary/20 rounded-full border-l-transparent"
                />

                {/* Particles */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white rounded-full"
                        initial={{ x: 0, y: 0, opacity: 0 }}
                        animate={{
                            x: (Math.random() - 0.5) * 200,
                            y: (Math.random() - 0.5) * 200,
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.5
                        }}
                    />
                ))}
            </div>

            {/* Facts Display */}
            <div className="h-24 flex items-center justify-center px-8 text-center max-w-2xl">
                <motion.div
                    key={currentFactIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-lg text-white font-light"
                >
                    <span className="text-primary font-bold block text-sm uppercase tracking-widest mb-2">
                        Procesando Sabiduría...
                    </span>
                    "{facts[currentFactIndex] || "Inicializando redes neuronales..."}"
                </motion.div>
            </div>

        </div>
    );
}
