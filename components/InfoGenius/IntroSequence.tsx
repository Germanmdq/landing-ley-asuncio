'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface IntroSequenceProps {
    onComplete: () => void;
}

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
    const [phase, setPhase] = useState<'globe' | 'extraction' | 'convergence'>('globe');

    useEffect(() => {
        // Phase 1: Globe (0-2s)
        const timer1 = setTimeout(() => setPhase('extraction'), 2500);
        // Phase 2: Extraction (2-4s)
        const timer2 = setTimeout(() => setPhase('convergence'), 4500);
        // Phase 3: Complete (5.5s)
        const timer3 = setTimeout(onComplete, 5500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 bg-slate-950 flex items-center justify-center overflow-hidden">
            <div className="relative w-full h-full flex items-center justify-center">

                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

                <AnimatePresence mode="wait">
                    {phase === 'globe' && (
                        <motion.div
                            key="globe"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 1.5, opacity: 0 }}
                            transition={{ duration: 1 }}
                            className="relative"
                        >
                            {/* Wireframe Globe Simulation */}
                            <div className="w-64 h-64 rounded-full border border-primary/30 relative animate-[spin_10s_linear_infinite]">
                                <div className="absolute inset-0 rounded-full border border-primary/20 rotate-45" />
                                <div className="absolute inset-0 rounded-full border border-primary/20 -rotate-45" />
                                <div className="absolute inset-2 rounded-full border border-primary/10" />
                                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-primary/30" />
                                <div className="absolute left-1/2 top-0 h-full w-[1px] bg-primary/30" />
                            </div>
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center text-primary font-mono text-xs tracking-widest"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                INICIANDO NÚCLEO
                            </motion.div>
                        </motion.div>
                    )}

                    {phase === 'extraction' && (
                        <motion.div
                            key="extraction"
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            {/* Data Streams */}
                            {[...Array(12)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-1 h-32 bg-gradient-to-t from-transparent via-primary to-transparent"
                                    initial={{
                                        rotate: i * 30,
                                        y: 0,
                                        opacity: 0
                                    }}
                                    animate={{
                                        y: [0, -200],
                                        opacity: [0, 1, 0]
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        delay: i * 0.1,
                                        repeat: Infinity
                                    }}
                                />
                            ))}
                            <div className="text-primary font-mono text-xl tracking-[0.5em]">
                                EXTRACCION DE SABIDURIA
                            </div>
                        </motion.div>
                    )}

                    {phase === 'convergence' && (
                        <motion.div
                            key="convergence"
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <motion.div
                                initial={{ scale: 2, opacity: 0, filter: 'blur(10px)' }}
                                animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="w-[800px] h-[500px] border border-primary/50 bg-surface/50 backdrop-blur-md rounded-xl shadow-[0_0_50px_rgba(255,255,255,0.1)] flex items-center justify-center"
                            >
                                <h1 className="text-4xl font-bold text-white tracking-tighter">
                                    Sabiduría Online <span className="text-primary">Vision</span>
                                </h1>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    onClick={onComplete}
                    className="absolute bottom-10 right-10 text-white/50 hover:text-white text-sm uppercase tracking-widest transition-colors"
                >
                    Saltar Intro
                </button>
            </div>
        </div>
    );
}
