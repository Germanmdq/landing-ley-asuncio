import { createClient } from '@/utils/supabase/server';
import { Book, Video, Mic, FileText, Lock } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 60;

export default async function BibliotecaPage() {
    const supabase = createClient();

    const { data: items, error } = await supabase
        .from('library')
        .select('*')
        .order('created_at', { ascending: false });

    // Helper to get icon
    const getIcon = (type: string) => {
        switch (type) {
            case 'video': return <Video className="w-5 h-5" />;
            case 'audio': return <Mic className="w-5 h-5" />;
            case 'book': return <Book className="w-5 h-5" />;
            default: return <FileText className="w-5 h-5" />;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-white mb-6">Biblioteca del Club</h1>
            <p className="text-text-muted mb-8">Material real, ordenado para practicar. Neville al centro.</p>

            {!items || items.length === 0 ? (
                <div className="p-12 text-center border border-dashed border-white/10 rounded-xl text-text-muted">
                    <p>La biblioteca se está cargando con nuevo material. Vuelve pronto.</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <Link
                            href={`/biblioteca/${item.id}`}
                            key={item.id}
                            className="bg-surface border border-white/10 p-6 rounded-xl group hover:border-primary/50 transition-colors block"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <span className={`p-2 rounded-lg bg-white/5 text-primary`}>
                                    {getIcon(item.type)}
                                </span>
                                {item.accessTier === 'oro' && (
                                    <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded border border-yellow-500/20 flex items-center gap-1">
                                        <Lock className="w-3 h-3" /> Oro
                                    </span>
                                )}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                            {item.description && (
                                <p className="text-sm text-text-muted line-clamp-2">{item.description}</p>
                            )}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
