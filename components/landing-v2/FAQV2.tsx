"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQV2() {
    const questions = [
        { q: "¿Qué incluye Bronce?", a: "Solo newsletters del Club para mantenerte conectado." },
        { q: "¿Qué incluye Plata?", a: "Acceso completo a la Biblioteca, Comunidad (foro), Blog, Videos, Libros y los Talleres en vivo L/M/V." },
        { q: "¿Qué suma Oro?", a: "Todo lo de Plata, más el Tutor 24/7 con acompañamiento “Ante…”, anclas y planes personalizados." },
        { q: "¿Las reuniones son siempre L/M/V?", a: "Sí. Lunes, miércoles y viernes. Horarios fijos para crear hábito." },
        { q: "¿Puedo subir de plan?", a: "Sí. En cualquier momento podés hacer upgrade desde tu cuenta." },
        { q: "¿El blog es público?", a: "Sí, es de acceso público. Pero dentro del Club tenés la comunidad y la práctica guiada para profundizar." }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 px-4 bg-background">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-12 text-center">Preguntas Frecuentes</h2>
                <div className="space-y-4">
                    {questions.map((item, i) => (
                        <div key={i} className="border border-white/10 rounded-xl bg-white/5 overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                            >
                                <span className="font-medium text-white/90">{item.q}</span>
                                {openIndex === i ? <Minus className="w-4 h-4 text-white/60" /> : <Plus className="w-4 h-4 text-white/60" />}
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: "auto" }}
                                        exit={{ height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 pt-0 text-white/60 text-sm leading-relaxed">
                                            {item.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
