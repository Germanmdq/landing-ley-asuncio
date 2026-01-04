import { createClient } from '@/utils/supabase/server';
import { ArrowLeft, Video, Headphones, BookOpen, Lock } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export default async function LibraryItemPage({ params }: { params: { id: string } }) {
    const supabase = createClient();

    // Get library item
    const { data: item } = await supabase
        .from('library')
        .select('*')
        .eq('id', params.id)
        .single();

    if (!item) {
        notFound();
    }

    const Icon = item.type === 'video' ? Video : item.type === 'audio' ? Headphones : BookOpen;

    return (
        <main className="min-h-screen bg-[#050505] text-white pb-20">
            {/* Back button */}
            <div className="max-w-4xl mx-auto px-6 py-6">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Volver a la biblioteca
                </Link>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 rounded-lg bg-primary/20 text-primary">
                            <Icon className="w-6 h-6" />
                        </div>
                        {item.access_tier === 'oro' && (
                            <span className="text-sm bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full border border-yellow-500/20 flex items-center gap-2">
                                <Lock className="w-4 h-4" />
                                Contenido Oro
                            </span>
                        )}
                        <span className="text-sm text-white/40 capitalize">
                            {item.type === 'video' ? 'Video' : item.type === 'audio' ? 'Audio' : 'Lectura'}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        {item.title}
                    </h1>

                    {item.description && (
                        <p className="text-lg text-white/60 leading-relaxed">
                            {item.description}
                        </p>
                    )}
                </div>

                {/* Content Area */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12">
                    {/* Video */}
                    {item.type === 'video' && item.external_link && (
                        <div className="aspect-video bg-black rounded-lg overflow-hidden mb-6">
                            {item.external_link.includes('youtube.com') || item.external_link.includes('youtu.be') ? (
                                <iframe
                                    src={item.external_link.replace('watch?v=', 'embed/')}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : (
                                <video
                                    src={item.external_link}
                                    controls
                                    className="w-full h-full"
                                />
                            )}
                        </div>
                    )}

                    {/* Audio */}
                    {item.type === 'audio' && item.external_link && (
                        <div className="mb-6">
                            <audio
                                src={item.external_link}
                                controls
                                className="w-full"
                            />
                        </div>
                    )}

                    {/* Book/Article content */}
                    {item.type === 'book' && item.external_link && (
                        <div className="text-center">
                            <a
                                href={item.external_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold rounded-xl hover:bg-primary/90 transition-all"
                            >
                                <BookOpen className="w-5 h-5" />
                                Ver Material
                            </a>
                        </div>
                    )}

                    {/* If no URL */}
                    {!item.external_link && (
                        <div className="text-center py-12 text-white/40">
                            <p>Este contenido estará disponible próximamente.</p>
                        </div>
                    )}

                    {/* Additional info */}
                    {item.description && item.external_link && (
                        <div className="mt-8 pt-8 border-t border-white/10">
                            <h3 className="font-bold mb-3">Acerca de este contenido</h3>
                            <p className="text-white/70 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    )}
                </div>

                {/* Related content could go here */}
                <div className="mt-12 text-center">
                    <Link
                        href="/biblioteca"
                        className="text-primary hover:text-primary/80 transition-colors"
                    >
                        Ver más contenido →
                    </Link>
                </div>
            </div>
        </main>
    );
}
