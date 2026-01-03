import { createClient } from '@/utils/supabase/server';
import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowLeft, BookOpen } from 'lucide-react';
import { notFound } from 'next/navigation';

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const supabase = createClient();

    const { data: post } = await supabase
        .from('articulos')
        .select('titulo, meta_description, imagen_portada')
        .eq('slug', params.slug)
        .single();

    if (!post) {
        return {
            title: 'Artículo no encontrado',
        };
    }

    return {
        title: `${post.titulo} | El Club de la Imaginación`,
        description: post.meta_description || '',
        openGraph: {
            title: post.titulo,
            description: post.meta_description || '',
            images: post.imagen_portada ? [post.imagen_portada] : [],
        },
    };
}

// Generate table of contents from HTML
function generateTableOfContents(html: string) {
    const headingRegex = /<h([2-3])[^>]*>(.*?)<\/h\1>/gi;
    const headings: { level: number; text: string; id: string }[] = [];
    let match;

    while ((match = headingRegex.exec(html)) !== null) {
        const level = parseInt(match[1]);
        const text = match[2].replace(/<[^>]*>/g, ''); // Remove any HTML tags
        const id = text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove accents
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');

        headings.push({ level, text, id });
    }

    return headings;
}

// Add IDs to headings in HTML
function addIdsToHeadings(html: string) {
    return html.replace(/<h([2-3])([^>]*)>(.*?)<\/h\1>/gi, (match, level, attrs, text) => {
        const plainText = text.replace(/<[^>]*>/g, '');
        const id = plainText
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');

        return `<h${level}${attrs} id="${id}">${text}</h${level}>`;
    });
}

export default async function ArticuloPage({ params }: { params: { slug: string } }) {
    const supabase = createClient();

    // Get article
    const { data: post } = await supabase
        .from('articulos')
        .select(`
            *,
            autor:autores(nombre, slug, imagen_url)
        `)
        .eq('slug', params.slug)
        .eq('estado', 'publicado')
        .single();

    if (!post) {
        notFound();
    }

    // Generate ToC
    const tableOfContents = generateTableOfContents(post.contenido);
    const contentWithIds = addIdsToHeadings(post.contenido);

    // Get related articles (same author, different article)
    const { data: relatedPosts } = await supabase
        .from('articulos')
        .select('id, titulo, slug, resumen, imagen_portada, tiempo_lectura')
        .eq('autor_id', post.autor_id)
        .eq('estado', 'publicado')
        .neq('id', post.id)
        .limit(3);

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

            {/* Hero with Title and Image */}
            <div className="relative min-h-[40vh] bg-gradient-to-b from-purple-900/20 to-transparent flex items-center justify-center border-b border-white/10 mb-12">
                {post.imagen_portada && (
                    <div className="absolute inset-0">
                        <img
                            src={post.imagen_portada}
                            alt={post.titulo}
                            className="w-full h-full object-cover opacity-20"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505]" />
                    </div>
                )}

                <div className="relative z-10 px-6 max-w-4xl text-center py-16">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        {post.titulo}
                    </h1>

                    {/* Meta info */}
                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/60">
                        {post.created_at && (
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>
                                    {new Date(post.created_at).toLocaleDateString('es-ES', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                        )}
                        {post.tiempo_lectura && (
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{post.tiempo_lectura} min de lectura</span>
                            </div>
                        )}
                        {post.autor && (
                            <Link
                                href={`/blog/autor/${post.autor.slug}`}
                                className="flex items-center gap-2 hover:text-white transition-colors"
                            >
                                <User className="w-4 h-4" />
                                <span>{post.autor.nombre}</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Content with sidebar */}
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-[1fr_300px] gap-12">
                    {/* Main content */}
                    <article>
                        {/* Summary */}
                        {post.resumen && (
                            <div className="bg-white/5 border-l-4 border-primary p-6 rounded-r-xl mb-8">
                                <p className="text-lg text-white/80 italic leading-relaxed">
                                    {post.resumen}
                                </p>
                            </div>
                        )}

                        {/* Article content */}
                        <div
                            className="prose prose-invert prose-lg max-w-none
                                       prose-headings:font-bold prose-headings:text-white
                                       prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                                       prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                                       prose-p:text-white/80 prose-p:leading-relaxed
                                       prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                                       prose-strong:text-white prose-strong:font-semibold
                                       prose-ul:text-white/80 prose-ol:text-white/80
                                       prose-li:my-2
                                       prose-blockquote:border-l-primary prose-blockquote:border-l-4
                                       prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:px-6
                                       prose-blockquote:not-italic prose-blockquote:text-white/70"
                            dangerouslySetInnerHTML={{ __html: contentWithIds }}
                        />

                        {/* Author bio */}
                        {post.autor && (
                            <div className="mt-16 pt-8 border-t border-white/10">
                                <Link
                                    href={`/blog/autor/${post.autor.slug}`}
                                    className="flex items-start gap-4 p-6 bg-white/5 border border-white/10 rounded-xl hover:border-white/30 hover:bg-white/10 transition-all group"
                                >
                                    {post.autor.imagen_url ? (
                                        <img
                                            src={post.autor.imagen_url}
                                            alt={post.autor.nombre}
                                            className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/20">
                                            <User className="w-8 h-8 text-white/40" />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <div className="text-sm text-white/40 mb-1">Escrito por</div>
                                        <div className="font-bold text-white group-hover:text-primary transition-colors">
                                            {post.autor.nombre}
                                        </div>
                                        <div className="text-sm text-white/60 mt-1">
                                            Ver todos los artículos →
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:sticky lg:top-6 h-fit space-y-8">
                        {/* Table of Contents */}
                        {tableOfContents.length > 0 && (
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                                    <BookOpen className="w-5 h-5" />
                                    Contenido
                                </h3>
                                <nav className="space-y-2">
                                    {tableOfContents.map((heading, index) => (
                                        <a
                                            key={index}
                                            href={`#${heading.id}`}
                                            className={`block text-sm hover:text-primary transition-colors ${
                                                heading.level === 2
                                                    ? 'text-white/80 font-medium'
                                                    : 'text-white/60 pl-4'
                                            }`}
                                        >
                                            {heading.text}
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        )}

                        {/* Related articles */}
                        {relatedPosts && relatedPosts.length > 0 && (
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                <h3 className="font-bold text-white mb-4">
                                    Artículos relacionados
                                </h3>
                                <div className="space-y-4">
                                    {relatedPosts.map((related) => (
                                        <Link
                                            key={related.id}
                                            href={`/blog/${related.slug}`}
                                            className="block group"
                                        >
                                            <div className="text-sm font-medium text-white group-hover:text-primary transition-colors line-clamp-2 mb-1">
                                                {related.titulo}
                                            </div>
                                            {related.resumen && (
                                                <p className="text-xs text-white/50 line-clamp-2">
                                                    {related.resumen}
                                                </p>
                                            )}
                                        </Link>
                                    ))}
                                </div>
                                <Link
                                    href={`/blog/autor/${post.autor?.slug}`}
                                    className="block mt-4 pt-4 border-t border-white/10 text-sm text-primary hover:text-primary/80 transition-colors"
                                >
                                    Ver todos los artículos →
                                </Link>
                            </div>
                        )}
                    </aside>
                </div>
            </div>
        </main>
    );
}
