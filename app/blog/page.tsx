// ... imports ...
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Biblioteca | El Club de la Imaginación',
    description: 'Artículos y enseñanzas sobre la Ley de la Asunción y el poder de la mente.',
};

export const revalidate = 60;

export default async function BlogIndexPage() {
    const supabase = createClient();

    // Query 'articulos' table
    const { data: posts, error } = await supabase
        .from('articulos')
        .select('*')
        .eq('estado', 'publicado')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching articles:", error);
        return <div className="min-h-screen flex items-center justify-center text-white">Error cargando la biblioteca.</div>;
    }

    return (
        <main className="min-h-screen bg-background text-white pb-20">
            {/* Header */}
            <div className="relative py-20 px-6 text-center border-b border-white/5 bg-gradient-to-b from-purple-900/20 to-transparent">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    Biblioteca del Club
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    Explora las enseñanzas profundas de Neville Goddard y el material de estudio.
                </p>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                {!posts || posts.length === 0 ? (
                    <div className="text-center text-gray-500 py-20">
                        <p>No hay artículos publicados todavía.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => {
                            return (
                                <Link
                                    href={`/blog/${post.slug}`}
                                    key={post.id}
                                    className="group flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
                                >
                                    {/* Image */}
                                    <div className="relative h-48 w-full overflow-hidden bg-white/5">
                                        {post.imagen_portada ? (
                                            <img
                                                src={post.imagen_portada}
                                                alt={post.titulo}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-purple-900/50 to-black flex items-center justify-center text-white/20">
                                                <span className="text-sm">Lectura</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 p-6 flex flex-col">
                                        <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                                            <div className="flex items-center gap-1">
                                                <Calendar size={12} />
                                                <span>
                                                    {post.created_at ? new Date(post.created_at).toLocaleDateString('es-ES', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    }) : 'Sin fecha'}
                                                </span>
                                            </div>
                                        </div>

                                        <h2 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors line-clamp-2">
                                            {post.titulo}
                                        </h2>

                                        <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-1">
                                            {post.resumen || post.meta_description || 'Sin descripción previa.'}
                                        </p>

                                        <div className="flex items-center text-primary text-sm font-medium mt-auto">
                                            Leer artículo <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
}
