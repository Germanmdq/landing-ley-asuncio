import { createClient } from '@/utils/supabase/server';
import CategoryCard from '@/components/forum/CategoryCard';
import ThreadList from '@/components/forum/ThreadList';
import Link from 'next/link';
import { Plus, Search } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ComunidadPage() {
    const supabase = createClient();

    // Fetch Categories
    const { data: categories } = await supabase
        .from('forum_categories')
        .select('*')
        .order('order', { ascending: true });

    // Fetch all threads to count by category
    const { data: allThreads } = await supabase
        .from('forum_threads')
        .select('id, category_id');

    // Count threads per category
    const threadCounts = allThreads?.reduce((acc, thread) => {
        acc[thread.category_id] = (acc[thread.category_id] || 0) + 1;
        return acc;
    }, {} as Record<string, number>) || {};

    // Combine categories with thread counts
    const categoriesWithStats = categories?.map(cat => ({
        ...cat,
        threadCount: threadCounts[cat.id] || 0
    }));

    // Fetch Recent Threads with reply counts
    const { data: recentThreads } = await supabase
        .from('forum_threads')
        .select(`
            *,
            category:forum_categories(name, slug)
        `)
        .order('created_at', { ascending: false })
        .limit(10);

    // Get reply counts for each thread
    const threadIds = recentThreads?.map(t => t.id) || [];
    const { data: allReplies } = await supabase
        .from('forum_replies')
        .select('id, thread_id')
        .in('thread_id', threadIds.length > 0 ? threadIds : ['']);

    // Count replies per thread
    const replyCounts = allReplies?.reduce((acc, reply) => {
        acc[reply.thread_id] = (acc[reply.thread_id] || 0) + 1;
        return acc;
    }, {} as Record<string, number>) || {};

    // Combine threads with reply counts
    const threadsWithStats = recentThreads?.map(thread => ({
        ...thread,
        replyCount: replyCounts[thread.id] || 0
    }));

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">

            {/* Header + Actions */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-6 border-b border-white/10">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-white">Comunidad</h1>
                    <p className="text-white/60">Practicando y sosteniendo el estado juntos.</p>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    {/* Search placeholder - functional search would require client component + params */}
                    {/* <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input 
                            type="text" 
                            placeholder="Buscar temas..." 
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-white/30"
                        />
                    </div> */}
                    <Link
                        href="/comunidad/nuevo"
                        className="px-4 py-2 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" /> Nuevo Tema
                    </Link>
                </div>
            </div>

            {/* Categories Grid */}
            <section>
                <h2 className="text-lg font-bold text-white mb-4">Categorías</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoriesWithStats?.map((cat) => (
                        <CategoryCard key={cat.id} category={cat} />
                    ))}
                </div>
            </section>

            {/* Recent Activity */}
            <section>
                <h2 className="text-lg font-bold text-white mb-4">Actividad Reciente</h2>
                <ThreadList threads={threadsWithStats || []} />
            </section>
        </div>
    );
}
