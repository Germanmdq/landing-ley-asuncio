'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, Book, Quote } from 'lucide-react';

interface Cita {
    id: string;
    versiculo: string;
    texto: string;
    explicacion: string;
    conferencia: string;
    año: string;
    concepto: string;
    enriched?: boolean;
}

export default function CitasBiblicasPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBook, setSelectedBook] = useState('all');
    const [citas, setCitas] = useState<Cita[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/data/citas-biblicas.json')
            .then(res => res.json())
            .then(data => {
                setCitas(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error loading citas:', err);
                setLoading(false);
            });
    }, []);

    const librosDisponibles = useMemo(() => {
        const books = new Set(citas.map(c => c.versiculo.split(' ')[0]));
        return ['all', ...Array.from(books).sort()];
    }, [citas]);

    const filteredCitas = useMemo(() => {
        return citas.filter(c => {
            const matchesBook = selectedBook === 'all' || c.versiculo.startsWith(selectedBook);
            const matchesSearch =
                (c.versiculo && c.versiculo.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (c.explicacion && c.explicacion.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (c.concepto && c.concepto.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesBook && matchesSearch;
        });
    }, [citas, selectedBook, searchQuery]);

    if (loading) {
        return <div className="p-8 text-center text-text-muted">Cargando citas bíblicas...</div>;
    }

    return (
        <div className="min-h-screen bg-background text-white">
            <div className="max-w-6xl mx-auto p-6">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">📖 Citas Bíblicas</h1>
                    <p className="text-text-muted">
                        Interpretación mística de la Biblia según Neville Goddard
                    </p>
                </div>

                {/* Search */}
                <div className="mb-6">
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                        <input
                            type="text"
                            placeholder="Buscar por versículo o concepto..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-surface border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-text-muted focus:outline-none focus:border-primary"
                        />
                    </div>

                    {/* Books filter */}
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {librosDisponibles.map(libro => (
                            <button
                                key={libro}
                                onClick={() => setSelectedBook(libro)}
                                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${selectedBook === libro
                                    ? 'bg-primary text-white'
                                    : 'bg-surface text-text-muted hover:bg-surface/80'
                                    }`}
                            >
                                {libro === 'all' ? '📚 Todos' : `📖 ${libro}`}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Citas */}
                <div className="space-y-6">
                    {filteredCitas.map(c => (
                        <div
                            key={c.id}
                            className={`bg-surface border rounded-lg p-6 transition-colors ${c.enriched ? 'border-primary/40 hover:border-primary' : 'border-white/5 hover:border-primary/30'}`}
                        >
                            {/* Versículo */}
                            <div className="flex items-start gap-4 mb-4">
                                <Quote className={`w-8 h-8 flex-shrink-0 mt-1 ${c.enriched ? 'text-primary' : 'text-primary/70'}`} />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="text-sm font-semibold text-primary">
                                            {c.versiculo}
                                        </div>
                                        {c.enriched && (
                                            <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded-full font-bold tracking-wide">
                                                STRONG'S
                                            </span>
                                        )}
                                    </div>
                                    <blockquote className="text-lg text-white italic border-l-4 border-primary pl-4 mb-4">
                                        "{c.texto}"
                                    </blockquote>
                                </div>
                            </div>

                            {/* Explicación de Neville */}
                            <div className="bg-background/50 rounded-lg p-4 mb-4">
                                <div className="text-xs text-primary mb-2 uppercase font-semibold">
                                    Interpretación de Neville
                                </div>
                                <p className="text-white leading-relaxed">
                                    {c.explicacion}
                                </p>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-3 text-text-muted">
                                    <span>🎯 {c.concepto}</span>
                                    <span>•</span>
                                    <span>{c.conferencia} ({c.año})</span>
                                </div>
                                {c.enriched && (
                                    <a href={`/dashboard/biblioteca/citas-biblicas/${c.id}`} className="text-primary hover:underline font-medium flex items-center gap-1">
                                        Ver análisis profundo →
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredCitas.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-4xl mb-4">📖</div>
                        <h3 className="text-xl font-semibold mb-2">No se encontraron citas</h3>
                        <p className="text-text-muted">Intenta con otra búsqueda</p>
                    </div>
                )}

            </div>
        </div>
    );
}
