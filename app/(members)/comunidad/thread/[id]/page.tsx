import { createClient } from '@/utils/supabase/server';
import ReplyComposer from '@/components/forum/ReplyComposer';
import LikeButton from '@/components/forum/LikeButton';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { ArrowLeft, User, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function ThreadPage({ params }: { params: { id: string } }) {
    const supabase = createClient();

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();

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

    // Fetch Thread Likes Count
    const { count: threadLikesCount } = await supabase
        .from('forum_likes')
        .select('*', { count: 'exact', head: true })
        .eq('thread_id', params.id);

    // Check if current user liked the thread
    let userLikedThread = false;
    if (user) {
        const { data: userLike } = await supabase
            .from('forum_likes')
            .select('id')
            .eq('user_id', user.id)
            .eq('thread_id', params.id)
            .single();
        userLikedThread = !!userLike;
    }

    // Fetch Replies
    const { data: replies } = await supabase
        .from('forum_replies')
        .select('*')
        .eq('thread_id', params.id)
        .order('created_at', { ascending: true });

    // Fetch likes for all replies
    const replyIds = replies?.map(r => r.id) || [];
    const { data: allLikes } = await supabase
        .from('forum_likes')
        .select('reply_id, user_id')
        .in('reply_id', replyIds.length > 0 ? replyIds : ['']);

    // Create map of reply likes
    const replyLikesMap = new Map<string, { count: number; userLiked: boolean }>();
    allLikes?.forEach(like => {
        if (!like.reply_id) return;
        const current = replyLikesMap.get(like.reply_id) || { count: 0, userLiked: false };
        current.count++;
        if (user && like.user_id === user.id) {
            current.userLiked = true;
        }
        replyLikesMap.set(like.reply_id, current);
    });

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

                {/* Images */}
                {thread.images && thread.images.length > 0 && (
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {thread.images.map((url: string, idx: number) => (
                            <img
                                key={idx}
                                src={url}
                                alt={`Imagen ${idx + 1}`}
                                className="rounded-lg border border-white/10 w-full object-cover"
                            />
                        ))}
                    </div>
                )}

                {/* Actions */}
                <div className="mt-6 pt-6 border-t border-white/5 flex items-center gap-4">
                    <LikeButton
                        threadId={thread.id}
                        initialLikes={threadLikesCount || 0}
                        initialLiked={userLikedThread}
                    />
                    <div className="flex items-center gap-1.5 text-white/40 text-sm">
                        <MessageCircle className="w-4 h-4" />
                        <span>{replies?.length || 0} respuestas</span>
                    </div>
                </div>
            </article>

            {/* Replies List */}
            <div className="space-y-6 mb-12">
                <h3 className="text-lg font-bold text-white px-2">
                    Respuestas ({replies?.length || 0})
                </h3>

                {replies?.map((reply) => {
                    const replyLikes = replyLikesMap.get(reply.id) || { count: 0, userLiked: false };
                    return (
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

                                {/* Reply Images */}
                                {reply.images && reply.images.length > 0 && (
                                    <div className="mt-4 grid grid-cols-2 gap-2">
                                        {reply.images.map((url: string, idx: number) => (
                                            <img
                                                key={idx}
                                                src={url}
                                                alt={`Imagen ${idx + 1}`}
                                                className="rounded-lg border border-white/10 w-full object-cover max-h-48"
                                            />
                                        ))}
                                    </div>
                                )}

                                {/* Reply Actions */}
                                <div className="mt-4 pt-3 border-t border-white/5">
                                    <LikeButton
                                        replyId={reply.id}
                                        parentThreadId={thread.id}
                                        initialLikes={replyLikes.count}
                                        initialLiked={replyLikes.userLiked}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Reply Composer */}
            <ReplyComposer threadId={thread.id} />
        </div>
    );
}
