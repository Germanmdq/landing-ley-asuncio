"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ() {
    const faqs = [
        {
            q: "¿Puedo cancelar mi suscripción cuando quiera?",
            a: "Sí, por supuesto. No hay contratos ni permanencia mínima. Podés cancelar con un solo click desde tu panel de usuario."
        },
        {
            q: "¿Funciona sin conexión a internet?",
            a: "Necesitás conexión para chatear con el tutor, pero podés descargar los audios de las conferencias para escucharlos offline en cualquier momento."
        },
        {
            q: "¿Van a agregar más maestros en el futuro?",
            a: "Sí, estamos constantemente indexando nuevas obras. Todas las actualizaciones y nuevos autores son totalmente gratis para los suscriptores activos."
        },
        {
            q: "¿Qué versión de la Biblia utilizan?",
            a: "Utilizamos la Reina Valera 1960 (RV1960), que es la versión estándar y más respetada para el estudio metafísico en español."
        },
        {
            q: "¿El sistema está solo en español?",
            a: "Sí, todo el sistema, las respuestas del tutor y los 900+ textos están en español (o traducidos profesionalmente al español)."
        }
    ];

    return (
        <section className="py-16 md:py-32 px-4">
            <div className="container max-w-3xl mx-auto">
                <div className="text-center mb-12 md:mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight">Preguntas Frecuentes</h2>
                    <p className="text-lg md:text-xl text-text-muted">Todo lo que necesitás saber antes de empezar.</p>
                </div>

                <div className="space-y-3 md:space-y-4">
                    {faqs.map((faq, i) => (
                        <FAQItem key={i} question={faq.q} answer={faq.a} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-white/10 rounded-xl md:rounded-2xl overflow-hidden bg-white/5">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-4 md:p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
            >
                <span className="font-bold text-sm md:text-lg text-gray-200">{question}</span>
                {isOpen ? <ChevronUp className="text-primary w-4 h-4 md:w-5 md:h-5" /> : <ChevronDown className="text-text-muted w-4 h-4 md:w-5 md:h-5" />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="p-4 md:p-6 pt-0 text-xs md:text-base text-text-muted leading-relaxed border-t border-white/5 mt-2">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
