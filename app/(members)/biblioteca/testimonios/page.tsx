'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Heart, TrendingUp, Home, Briefcase } from 'lucide-react';

const categories = [
    { id: 'all', name: 'Todos', icon: '✨' },
    { id: 'mystical_experience', name: 'Místico', icon: '🔮' },
    { id: 'health', name: 'Salud', icon: '🏥' },
    { id: 'money', name: 'Dinero', icon: '💰' },
    { id: 'relationships', name: 'Relaciones', icon: '💕' },
    { id: 'other', name: 'Otros', icon: '🌟' },
];

interface Testimonio {
    id: string;
    conferencia: string;
    año: string;
    categoria: string;
    testimonio: string;
    full_testimonio?: any;
    tecnica: string;
    resultado: string;
}

export default function TestimoniosPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [testimonios, setTestimonios] = useState<Testimonio[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/data/testimonios.json')
            .then(res => res.json())
            .then(data => {
                setTestimonios(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error loading testimonios:', err);
                setLoading(false);
            });
    }, []);

    const filteredTestimonios = useMemo(() => {
        return testimonios.filter(t => {
            const matchesCategory = selectedCategory === 'all' || t.categoria === selectedCategory;
            const matchesSearch =
                (t.testimonio && t.testimonio.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (t.conferencia && t.conferencia.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (t.tecnica && t.tecnica.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesCategory && matchesSearch;
        });
    }, [testimonios, selectedCategory, searchQuery]);

    if (loading) {
        return <div className="p-8 text-center text-text-muted">Cargando testimonios...</div>;
    }

    return (
        <div className="min-h-screen bg-background text-white">
            <div className="max-w-6xl mx-auto p-6">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">✨ Testimonios Reales</h1>
                    <p className="text-text-muted">
                        {testimonios.length} testimonios extraídos de las conferencias de Neville Goddard
                    </p>
                </div>

                {/* Search & Filters */}
                <div className="mb-6 space-y-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                        <input
                            type="text"
                            placeholder="Buscar testimonios..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-surface border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-text-muted focus:outline-none focus:border-primary"
                        />
                    </div>

                    {/* Categories */}
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${selectedCategory === cat.id
                                    ? 'bg-primary text-white'
                                    : 'bg-surface text-text-muted hover:bg-surface/80'
                                    }`}
                            >
                                <span className="mr-2">{cat.icon}</span>
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-surface border border-white/5 rounded-lg p-4">
                        <div className="text-2xl font-bold text-primary">{testimonios.length}</div>
                        <div className="text-sm text-text-muted">Total testimonios</div>
                    </div>
                    <div className="bg-surface border border-white/5 rounded-lg p-4">
                        <div className="text-2xl font-bold text-primary">{filteredTestimonios.length}</div>
                        <div className="text-sm text-text-muted">Mostrando</div>
                    </div>
                    <div className="bg-surface border border-white/5 rounded-lg p-4">
                        <div className="text-2xl font-bold text-primary">{categories.length - 1}</div>
                        <div className="text-sm text-text-muted">Categorías</div>
                    </div>
                </div>

                {/* Testimonios Grid */}
                <div className="space-y-4">
                    {filteredTestimonios.map(t => (
                        <div
                            key={t.id}
                            className="bg-surface border border-white/5 rounded-lg p-6 hover:border-primary/30 transition-colors"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-2xl">
                                            {categories.find(c => c.id === t.categoria)?.icon || '🌟'}
                                        </span>
                                        <span className="text-sm font-semibold text-primary uppercase">
                                            {categories.find(c => c.id === t.categoria)?.name || t.categoria}
                                        </span>
                                    </div>
                                    <div className="text-sm text-text-muted">
                                        {t.conferencia} ({t.año})
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full">
                                        {t.tecnica}
                                    </span>
                                </div>
                            </div>

                            {/* Testimonio */}
                            <div className="text-white leading-relaxed mb-4 space-y-2">
                                {t.full_testimonio ? (
                                    <>
                                        <p><strong>Problema:</strong> {t.full_testimonio.problem}</p>
                                        <p><strong>Lo que hicieron:</strong> {t.full_testimonio.what_they_did}</p>
                                        <p><strong>Resultado:</strong> {t.full_testimonio.outcome}</p>
                                    </>
                                ) : (
                                    <p>{t.testimonio}</p>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-green-400">✓ {t.resultado}</span>
                                {/* <button className="text-text-muted hover:text-primary transition-colors">
                  Guardar en cuaderno →
                </button> */}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredTestimonios.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-4xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold mb-2">No se encontraron testimonios</h3>
                        <p className="text-text-muted">Intenta con otra búsqueda o categoría</p>
                    </div>
                )}

            </div>
        </div>
    );
}
