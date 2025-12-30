import { createClient } from '@/utils/supabase/server';
import ThreadList from '@/components/forum/ThreadList';
import { ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function CategoryPage({ params }: { params: { category: string } }) {
    const supabase = createClient();

    // Fetch Category info
    const { data: category } = await supabase
        .from('forum_categories')
        .select('*')
        .eq('slug', params.category)
        .single();

    if (!category) {
        notFound();
    }

    // Fetch Threads only for this category
    const { data: threads } = await supabase
        .from('forum_threads')
        .select('*')
        .eq('category_id', category.id)
        .order('created_at', { ascending: false });

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
            <div className="flex items-center gap-4">
                <Link
                    href="/comunidad"
                    className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-white">{category.name}</h1>
                    <p className="text-white/60">{category.description}</p>
                </div>
                <Link
                    href="/comunidad/nuevo"
                    className="px-4 py-2 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" /> Nuevo
                </Link>
            </div>

            <div className="bg-[#111] border border-white/5 rounded-2xl p-6 min-h-[50vh]">
                <ThreadList threads={threads || []} />
            </div>
        </div>
    );
}
