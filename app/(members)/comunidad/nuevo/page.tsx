import { createClient } from '@/utils/supabase/server';
import ThreadComposer from '@/components/forum/ThreadComposer';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function NewThreadPage() {
    const supabase = createClient();
    const { data: categories } = await supabase.from('forum_categories').select('*').order('order');

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <Link
                href="/comunidad"
                className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-6 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" /> Volver a la comunidad
            </Link>

            <ThreadComposer categories={categories || []} />
        </div>
    );
}
