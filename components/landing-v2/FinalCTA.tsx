"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
    return (
        <section className="py-32 px-4 bg-background relative overflow-hidden text-center">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-transparent to-black z-0" />

            <div className="relative z-10 max-w-4xl mx-auto space-y-8">
                <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
                    No es contenido. Es camino.
                </h2>
                <p className="text-xl md:text-2xl text-white/60">
                    Si querés practicar en serio y sostener el estado, entrá al Club.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                    <Link
                        href="/#planes"
                        className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-xl hover:bg-white/10 transition-all font-medium"
                    >
                        Ver planes
                    </Link>
                    <Link
                        href="/signup"
                        className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all flex items-center justify-center gap-2"
                    >
                        Empezar ahora
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
