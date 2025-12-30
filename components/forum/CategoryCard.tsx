import Link from 'next/link';
import { MessageSquare } from 'lucide-react';

interface CategoryCardProps {
    category: {
        id: string;
        name: string;
        slug: string;
        description: string;
        thread_count?: number;
    }
}

export default function CategoryCard({ category }: CategoryCardProps) {
    return (
        <Link
            href={`/comunidad/${category.slug}`}
            className="block p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group h-full"
        >
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-white group-hover:text-primary transition-colors">
                    {category.name}
                </h3>
                {/* <span className="text-xs text-white/40 flex items-center gap-1 bg-white/5 px-2 py-1 rounded-full">
                    <MessageSquare className="w-3 h-3" /> {category.thread_count || 0}
                </span> */}
            </div>
            <p className="text-sm text-white/60 line-clamp-2">
                {category.description}
            </p>
        </Link>
    );
}
