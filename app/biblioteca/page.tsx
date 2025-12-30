
'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { books } from '@/data/library';
import { maestros } from '@/data/maestros';
import Link from 'next/link';

export default function BibliotecaPage() {
    const searchParams = useSearchParams();
    const autorSlug = searchParams.get('autor');

    // Find the author in our local metadata to get the display name and other info
    const maestro = useMemo(() => {
        if (!autorSlug) return null;
        // Strict match first
        const found = maestros.find(m => m.id === autorSlug);
        if (found) return found;

        // Fallback only if slug is 'neville-goddard' (legacy) or if we want a default for empty
        if (autorSlug === 'neville-goddard') return maestros.find(m => m.id === 'neville');

        return null;
    }, [autorSlug]);

    // Filter books by author name
    // Note: library.ts uses full names like "Neville Goddard", "Emmet Fox"
    // maestros.ts has nombre and apellido. We construct the full name to match.
    const authorBooks = useMemo(() => {
        if (!maestro) return [];
        const fullName = `${maestro.nombre} ${maestro.apellido}`;
        // Also try to match by just surname if full name doesn't work, or specific mapping
        return books.filter(book => book.author.includes(maestro.apellido) || book.author === fullName);
    }, [maestro]);

    if (!autorSlug) {
        return (
            <main className="min-h-screen bg-background py-20 px-6 flex items-center justify-center">
                <p className="text-white text-xl">Selecciona un autor para ver su biblioteca.</p>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-background py-20 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12">
                    <Link href="/blog" className="text-purple-400 hover:text-purple-300 mb-4 inline-block">
                        ← Volver al Blog
                    </Link>
                    <h1 className="text-5xl font-bold mb-4 text-white">
                        Biblioteca de {maestro ? `${maestro.nombre} ${maestro.apellido}` : autorSlug}
                    </h1>
                    <p className="text-secondary text-xl text-gray-400">
                        Colección de obras y enseñanzas.
                    </p>
                </div>

                {authorBooks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {authorBooks.map((book) => (
                            <div key={book.id} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all group">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-xs font-mono text-purple-400 border border-purple-500/30 px-2 py-1 rounded">
                                        {book.year}
                                    </span>
                                    <span className="text-xs text-gray-500 uppercase tracking-wider">
                                        {book.difficulty === 'foundational' ? 'Básico' :
                                            book.difficulty === 'intermediate' ? 'Intermedio' :
                                                book.difficulty === 'advanced' ? 'Avanzado' : book.difficulty}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                                    {book.title_es}
                                </h3>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {book.main_themes.map(theme => (
                                        <span key={theme} className="text-xs bg-black/30 text-gray-400 px-2 py-1 rounded-full">
                                            {theme}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
                        <p className="text-2xl mb-6 text-white">📚 Biblioteca en proceso de digitalización</p>
                        <p className="text-secondary text-gray-400">
                            Estamos catalogando los libros de este autor. Vuelve pronto.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}
