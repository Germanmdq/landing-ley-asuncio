import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export default async function AutorPage({ params }: { params: { slug: string } }) {
    const supabase = createClient();

    // Get author info
    const { data: autor } = await supabase
        .from('autores')
        .select('*')
        .eq('slug', params.slug)
        .single();

    if (!autor) {
        notFound();
    }

    // Get author's articles
    const { data: articulos } = await supabase
        .from('articulos')
        .select('*')
        .eq('autor_id', autor.id)
        .eq('estado', 'publicado')
        .order('created_at', { ascending: false });

    return (
        <main className="min-h-screen bg-[#050505] text-white pb-20">
            {/* Back button */}
            <div className="max-w-7xl mx-auto px-6 py-6">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Volver a la biblioteca
                </Link>
            </div>

            {/* Author Header */}
            <div className="relative py-16 px-6 border-b border-white/5 bg-gradient-to-b from-purple-900/20 to-transparent">
                <div className="max-w-4xl mx-auto text-center">
                    {autor.imagen_url && (
                        <img
                            src={autor.imagen_url}
                            alt={autor.nombre}
                            className="w-32 h-32 rounded-full object-cover mx-auto mb-6 border-4 border-white/20"
                        />
                    )}
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        {autor.nombre}
                    </h1>
                    {autor.biografia && (
                        <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
                            {autor.biografia}
                        </p>
                    )}
                    <div className="mt-6 text-white/40">
                        {articulos?.length || 0} artículos publicados
                    </div>
                </div>
            </div>

            {/* Articles Grid */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                {!articulos || articulos.length === 0 ? (
                    <div className="text-center text-white/40 py-20">
                        <p>Este autor aún no tiene artículos publicados.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articulos.map((post) => (
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
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
