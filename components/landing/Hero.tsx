"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background z-0" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] animate-pulse z-0" />

            <div className="container relative z-10 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                        Pregúntale a <br />
                        <span className="text-primary">Neville Goddard</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-text-muted mb-8 max-w-2xl mx-auto">
                        Tu mentor de manifestación 24/7. Habla con él como si estuviera vivo hoy.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Link href="/dashboard">
                            <Button size="lg" className="w-full md:w-auto">
                                Comenzar Gratis
                            </Button>
                        </Link>
                        <Button variant="outline" size="lg" className="w-full md:w-auto">
                            Ver Cómo Funciona
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
