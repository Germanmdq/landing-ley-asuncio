import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { User, BookOpen, Video, Headphones } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Biblioteca | El Club de la Imaginación',
    description: 'Artículos, conferencias y enseñanzas de maestros espirituales.',
};

export const revalidate = 60;

export default async function BibliotecaPage() {
    const supabase = createClient();

    // Get all authors
    const { data: autores } = await supabase
        .from('autores')
        .select('*')
        .order('nombre');

    // Get all articles to count by author
    const { data: allArticles } = await supabase
        .from('articulos')
        .select('id, autor_id, estado')
        .eq('estado', 'publicado');

    // Count articles per author
    const articleCounts = allArticles?.reduce((acc, art) => {
        acc[art.autor_id] = (acc[art.autor_id] || 0) + 1;
        return acc;
    }, {} as Record<string, number>) || {};

    // Combine authors with article counts
    const autoresWithCounts = autores?.map(autor => ({
        ...autor,
        articleCount: articleCounts[autor.id] || 0
    }));

    // Get library items (conferencias, etc)
    const { data: libraryItems } = await supabase
        .from('library')
        .select('*')
        .limit(6)
        .order('created_at', { ascending: false });

    return (
        <main className="min-h-screen bg-[#050505] text-white pb-20">
            {/* Header */}
            <div className="relative py-20 px-6 text-center border-b border-white/5 bg-gradient-to-b from-purple-900/20 to-transparent">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Biblioteca del Club
                </h1>
                <p className="text-white/60 max-w-2xl mx-auto text-lg mb-8">
                    Explora las enseñanzas de maestros espirituales, conferencias de Neville Goddard y material de estudio.
                </p>

                {/* Chat Demo Button */}
                <Link
                    href="/tutor"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold rounded-xl hover:bg-primary/90 transition-all"
                >
                    💬 Chat con Maestros (Demo)
                </Link>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
                {/* Autores Section */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold">Autores</h2>
                    </div>

                    {!autoresWithCounts || autoresWithCounts.length === 0 ? (
                        <div className="text-center text-white/40 py-12 bg-white/5 rounded-xl border border-white/10 border-dashed">
                            <p>No hay autores disponibles aún.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {autoresWithCounts.map((autor) => (
                                <Link
                                    href={`/blog/autor/${autor.slug}`}
                                    key={autor.id}
                                    className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/30 hover:bg-white/10 transition-all"
                                >
                                    <div className="flex items-start gap-4">
                                        {autor.imagen_url ? (
                                            <img
                                                src={autor.imagen_url}
                                                alt={autor.nombre}
                                                className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/20">
                                                <User className="w-8 h-8 text-white/40" />
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors mb-1">
                                                {autor.nombre}
                                            </h3>
                                            <p className="text-sm text-white/40">
                                                {autor.articleCount} artículos
                                            </p>
                                        </div>
                                    </div>
                                    {autor.biografia && (
                                        <p className="text-sm text-white/60 mt-4 line-clamp-2">
                                            {autor.biografia}
                                        </p>
                                    )}
                                </Link>
                            ))}
                        </div>
                    )}
                </section>

                {/* Conferencias y Material Section */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold">Conferencias y Material</h2>
                        <Link
                            href="/biblioteca"
                            className="text-sm text-primary hover:text-primary/80 transition-colors"
                        >
                            Ver todo →
                        </Link>
                    </div>

                    {!libraryItems || libraryItems.length === 0 ? (
                        <div className="text-center text-white/40 py-12 bg-white/5 rounded-xl border border-white/10 border-dashed">
                            <p>Material en preparación.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {libraryItems.map((item) => {
                                const Icon = item.type === 'video' ? Video : item.type === 'audio' ? Headphones : BookOpen;

                                return (
                                    <Link
                                        href={`/biblioteca/${item.id}`}
                                        key={item.id}
                                        className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/30 hover:bg-white/10 transition-all group"
                                    >
                                        <div className="flex items-start gap-3 mb-4">
                                            <div className="p-2 rounded-lg bg-primary/20 text-primary">
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            {item.access_tier === 'oro' && (
                                                <span className="ml-auto text-xs bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded border border-yellow-500/20">
                                                    Oro
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="font-bold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                            {item.title}
                                        </h3>
                                        {item.description && (
                                            <p className="text-sm text-white/60 line-clamp-2">
                                                {item.description}
                                            </p>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
