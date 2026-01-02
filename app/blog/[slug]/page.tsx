// ... imports ...
import { createClient } from '@/utils/supabase/server';
import { Metadata } from 'next';
import Link from 'next/link';
import LexicalRenderer from '@/components/LexicalRenderer';

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const supabase = createClient();

    const { data: post } = await supabase
        .from('posts')
        .select('title, meta')
        .eq('slug', params.slug)
        .single();

    if (!post) {
        return {
            title: 'Artículo no encontrado',
        };
    }

    const meta = post.meta || {};

    return {
        title: `${post.title} | El Club de la Imaginación`,
        description: meta.description || '',
    };
}

export default async function ArticuloPage({
    params
}: {
    params: { slug: string }
}) {
    const supabase = createClient();

    const { data: post } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', params.slug)
        .eq('_status', 'published')
        .single();

    if (!post) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <h1 className="text-2xl text-white">Artículo no encontrado</h1>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-background pb-20">
            {/* Hero with Title only (since Image ID handling is complex without join) */}
            <div className="relative h-[40vh] bg-surface flex items-center justify-center border-b border-white/10">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-background opacity-50" />
                <div className="relative z-10 px-4 max-w-4xl text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        {post.title}
                    </h1>
                    {post.publishedAt && (
                        <p className="text-text-muted">
                            {new Date(post.publishedAt).toLocaleDateString('es-ES', { dateStyle: 'long' })}
                        </p>
                    )}
                </div>
            </div>

            {/* Contenido */}
            <article className="max-w-3xl mx-auto px-6 py-12">
                <div className="prose prose-invert prose-lg max-w-none">
                    <LexicalRenderer content={post.content} />
                </div>

                <div className="mt-16 pt-8 border-t border-white/10 text-center">
                    <Link href="/blog" className="text-text-muted hover:text-white transition-colors">
                        ← Volver a la Biblioteca
                    </Link>
                </div>
            </article>
        </main>
    );
}
