'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Book, Quote } from 'lucide-react';

interface StrongWord {
    palabra: string;
    strong: string;
    hebreo?: string;
    griego?: string;
    significado: string;
    contextoNeville: string;
}

interface EnrichedQuote {
    id: string;
    versiculo: string;
    texto_es: string;
    texto_en: string;
    strongNumbers: string[];
    palabrasClave: StrongWord[];
    interpretacionNeville: string;
    conferencia: string;
    año: string;
    categoria: string;
}

export default function CitaBiblicaDetalle({ params }: { params: { id: string } }) {
    const [cita, setCita] = useState<EnrichedQuote | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app, we might fetch just this item, but since we have a static JSON
        // we'll fetch the list and find it. 
        // Ideally, generateStaticData should also generate individual JSONs for details.
        // For this MVP, we look it up in the main list or the enriched source.

        fetch('/data/citas-biblicas.json')
            .then(res => res.json())
            .then(data => {
                const found = data.find((c: any) => c.id === params.id);
                if (found && found.enriched && found.full_data) {
                    setCita(found.full_data);
                } else if (found) {
                    // Fallback for non-enriched quotes if we wanted to show them here too
                    // But for now, let's assume we only link here for enriched ones
                    console.log("Found but not enriched", found);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error loading cita:', err);
                setLoading(false);
            });
    }, [params.id]);

    if (loading) return <div className="p-8 text-center text-text-muted">Cargando detalle...</div>;
    if (!cita) return <div className="p-8 text-center text-text-muted">Cita no encontrada o no disponible con análisis profundo.</div>;

    return (
        <div className="min-h-screen bg-background text-white p-6">
            <div className="max-w-4xl mx-auto">

                <Link href="/dashboard/biblioteca/citas-biblicas" className="inline-flex items-center gap-2 text-text-muted hover:text-white mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Volver a Citas
                </Link>

                {/* Versículo */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-3">
                        <Book className="w-6 h-6 text-primary" />
                        <h1 className="text-2xl font-bold text-primary">
                            {cita.versiculo}
                        </h1>
                    </div>
                    <blockquote className="text-xl text-white italic border-l-4 border-primary pl-6 py-2 bg-surface/30 rounded-r-lg">
                        "{cita.texto_es}"
                    </blockquote>
                    {cita.texto_en && (
                        <p className="mt-2 text-text-muted italic pl-6">"{cita.texto_en}"</p>
                    )}
                </div>

                {/* Palabras Clave con Strong's */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        🔑 Palabras Clave <span className="text-sm font-normal text-text-muted">(Significado Original)</span>
                    </h2>
                    <div className="space-y-4">
                        {cita.palabrasClave.map((palabra, index) => (
                            <div
                                key={index}
                                className="bg-surface border border-white/5 rounded-lg p-5 hover:border-primary/20 transition-colors"
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <span className="text-lg font-semibold text-white">
                                            "{palabra.palabra}"
                                        </span>
                                        <span className="ml-3 text-sm text-text-muted font-mono">
                                            {palabra.hebreo || palabra.griego}
                                        </span>
                                    </div>
                                    <span className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full font-mono">
                                        {palabra.strong}
                                    </span>
                                </div>

                                {/* Significado Original */}
                                <div className="mb-4">
                                    <div className="text-[10px] tracking-wider text-primary/80 mb-1 uppercase">Significado Original</div>
                                    <p className="text-white/90">{palabra.significado}</p>
                                </div>

                                {/* Contexto de Neville */}
                                <div className="bg-purple-900/20 border-l-4 border-purple-500 pl-4 py-3 rounded-r">
                                    <div className="text-[10px] tracking-wider text-purple-400 mb-1 uppercase flex items-center gap-1">
                                        💡 Interpretación de Neville
                                    </div>
                                    <p className="text-white text-sm leading-relaxed">{palabra.contextoNeville}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Interpretación Completa de Neville */}
                <div className="bg-surface border border-white/10 rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        ✨ Interpretación Mística
                    </h2>
                    <p className="text-white leading-relaxed text-lg">
                        {cita.interpretacionNeville}
                    </p>
                    <div className="mt-6 pt-4 border-t border-white/5 text-sm text-text-muted flex justify-between items-center">
                        <span>Fuente: {cita.conferencia} ({cita.año})</span>
                        <span className="px-2 py-1 bg-white/5 rounded text-xs">{cita.categoria}</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
