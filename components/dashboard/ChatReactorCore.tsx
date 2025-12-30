'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ChatReactorCoreProps {
    maestro: string;
}

export default function ChatReactorCore({ maestro }: ChatReactorCoreProps) {
    const [message, setMessage] = useState('');

    const messages = [
        "Neville está pensando su respuesta..."
    ];

    useEffect(() => {
        let i = 0;
        setMessage(messages[0]);
        const interval = setInterval(() => {
            i = (i + 1) % messages.length;
            setMessage(messages[i]);
        }, 2000);
        return () => clearInterval(interval);
    }, [maestro]);

    return (
        <div className="flex flex-col items-center justify-center py-8 w-full">

            {/* Mini Reactor */}
            <div className="relative w-16 h-16 flex items-center justify-center mb-4">
                {/* Core */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        boxShadow: [
                            '0 0 10px rgba(6,182,212,0.5)',
                            '0 0 25px rgba(6,182,212,0.8)',
                            '0 0 10px rgba(6,182,212,0.5)'
                        ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-4 h-4 bg-cyan-500 rounded-full blur-[2px] z-10"
                />

                {/* Orbit 1 */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute w-8 h-8 border border-cyan-500/50 rounded-full border-t-transparent"
                />

                {/* Orbit 2 */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute w-12 h-12 border border-indigo-500/40 rounded-full border-b-transparent"
                />

                {/* Orbit 3 */}
                <motion.div
                    animate={{ rotate: 180 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute w-16 h-16 border border-purple-500/30 rounded-full border-l-transparent"
                />
            </div>

            {/* Status Text */}
            <motion.div
                key={message}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-xs text-cyan-400/80 font-mono tracking-wider"
            >
                {message}
            </motion.div>

        </div>
    );
}
