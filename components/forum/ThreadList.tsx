import Link from 'next/link';
import { MessageSquare, Pin, Lock, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface Thread {
    id: string;
    title: string;
    created_at: string;
    pinned: boolean;
    locked: boolean;
    author: {
        full_name?: string;
        email?: string;
    } | null; // Supabase join might return null if no relation found or RLS
    // In a real join, author info comes from auth.users which is tricky to join directly without a public profile table.
    // For now we might not have author name if we rely strictly on auth.users which is private.
    // We usually create a 'profiles' table. Assuming for now we might just show 'Usuario' if name missing.
}

export default function ThreadList({ threads }: { threads: any[] }) {
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
                    className="block bg-[#111] border border-white/10 p-4 rounded-xl hover:border-white/30 transition-all group"
                >
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 pt-1">
                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
                                <User className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                {thread.pinned && <Pin className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />}
                                {thread.locked && <Lock className="w-3.5 h-3.5 text-red-400" />}
                                <h3 className="text-white font-medium group-hover:text-primary transition-colors truncate">
                                    {thread.title}
                                </h3>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-white/40">
                                <span>
                                    {formatDistanceToNow(new Date(thread.created_at), { addSuffix: true, locale: es })}
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                    <MessageSquare className="w-3 h-3" /> Responder
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
