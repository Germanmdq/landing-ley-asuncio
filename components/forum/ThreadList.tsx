import Link from 'next/link';
import { MessageSquare, Pin, Lock, User, Folder } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface Thread {
    id: string;
    title: string;
    created_at: string;
    pinned: boolean;
    locked: boolean;
    replyCount?: number;
    category?: {
        name: string;
        slug: string;
    };
}

export default function ThreadList({ threads }: { threads: Thread[] }) {
    if (!threads?.length) {
        return (
            <div className="text-center py-12 text-white/40 bg-white/5 rounded-xl border border-white/5 border-dashed">
                <p>No hay temas en esta categoría aún.</p>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {threads.map((thread) => (
                <Link
                    key={thread.id}
                    href={`/comunidad/thread/${thread.id}`}
                    className="block bg-white/5 border border-white/10 p-4 rounded-xl hover:border-white/30 hover:bg-white/10 transition-all group"
                >
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 pt-1">
                            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white/40">
                                <User className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                                {thread.pinned && <Pin className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />}
                                {thread.locked && <Lock className="w-3.5 h-3.5 text-red-400" />}
                                <h3 className="text-white font-medium group-hover:text-primary transition-colors truncate">
                                    {thread.title}
                                </h3>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-white/40 flex-wrap">
                                {thread.category && (
                                    <>
                                        <span className="flex items-center gap-1">
                                            <Folder className="w-3 h-3" /> {thread.category.name}
                                        </span>
                                        <span>•</span>
                                    </>
                                )}
                                <span>
                                    {formatDistanceToNow(new Date(thread.created_at), { addSuffix: true, locale: es })}
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                    <MessageSquare className="w-3 h-3" /> {thread.replyCount || 0} respuestas
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
