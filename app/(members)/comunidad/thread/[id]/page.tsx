import { createClient } from '@/utils/supabase/server';
import ReplyComposer from '@/components/forum/ReplyComposer';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { ArrowLeft, User } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function ThreadPage({ params }: { params: { id: string } }) {
    const supabase = createClient();

    // Fetch Thread
    const { data: thread } = await supabase
        .from('forum_threads')
        .select(`
            *,
            category:forum_categories(name, slug)
        `)
        .eq('id', params.id)
        .single();

    if (!thread) {
        notFound();
    }

    // Fetch Replies
    const { data: replies } = await supabase
        .from('forum_replies')
        .select('*')
        .eq('thread_id', params.id)
        .order('created_at', { ascending: true });

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-center gap-4 mb-6">
                <Link
                    href="/comunidad"
                    className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-white/40 uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded">
                            {thread.category?.name}
                        </span>
                        <span className="text-xs text-white/40">
                            {formatDistanceToNow(new Date(thread.created_at), { addSuffix: true, locale: es })}
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Thread Content */}
            <article className="bg-[#111] border border-white/10 rounded-2xl p-6 md:p-8 mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">
                    {thread.title}
                </h1>

                {/* User Info (Placeholder as we don't have joined profiles easily) */}
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/5">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-300 font-bold border border-indigo-500/30">
                        <User className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-white font-medium text-sm">Usuario Miembro</p>
                        <p className="text-white/30 text-xs">Autor del tema</p>
                    </div>
                </div>

                <div
                    className="prose prose-invert max-w-none text-white/80 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: thread.body_text || '' }}
                />
            </article>

            {/* Replies List */}
            <div className="space-y-6 mb-12">
                <h3 className="text-lg font-bold text-white px-2">
                    Respuestas ({replies?.length || 0})
                </h3>

                {replies?.map((reply) => (
                    <div key={reply.id} className="flex gap-4">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40">
                                <User className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="flex-1 bg-white/5 border border-white/10 rounded-xl rounded-tl-none p-4">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-sm font-bold text-white/70">Usuario</span>
                                <span className="text-xs text-white/30">
                                    {formatDistanceToNow(new Date(reply.created_at), { addSuffix: true, locale: es })}
                                </span>
                            </div>
                            <div
                                className="prose prose-invert prose-sm max-w-none text-white/70"
                                dangerouslySetInnerHTML={{ __html: reply.body_text || '' }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Reply Composer */}
            <ReplyComposer threadId={thread.id} />
        </div>
    );
}
