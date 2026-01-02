import { createClient } from '@/utils/supabase/server';
import { FileText, Users, MessageSquare, Library } from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboard() {
    const supabase = createClient();

    // Get counts
    const [articulos, autores, threads, library] = await Promise.all([
        supabase.from('articulos').select('id', { count: 'exact', head: true }),
        supabase.from('autores').select('id', { count: 'exact', head: true }),
        supabase.from('forum_threads').select('id', { count: 'exact', head: true }),
        supabase.from('library').select('id', { count: 'exact', head: true }),
    ]);

    const stats = [
        { label: 'Artículos', count: articulos.count || 0, icon: <FileText />, href: '/admin/articulos', color: 'blue' },
        { label: 'Autores', count: autores.count || 0, icon: <Users />, href: '/admin/autores', color: 'green' },
        { label: 'Temas Foro', count: threads.count || 0, icon: <MessageSquare />, href: '/comunidad', color: 'purple' },
        { label: 'Biblioteca', count: library.count || 0, icon: <Library />, href: '/admin/biblioteca', color: 'orange' },
    ];

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                <p className="text-text-muted">Resumen de tu contenido</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                    <Link
                        key={stat.label}
                        href={stat.href}
                        className="bg-surface border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-all hover:scale-105"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-lg bg-${stat.color}-500/20 flex items-center justify-center text-${stat.color}-400`}>
                                {stat.icon}
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">{stat.count}</div>
                        <div className="text-sm text-text-muted">{stat.label}</div>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-surface border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Acciones Rápidas</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <QuickAction href="/admin/articulos" title="Nuevo Artículo" description="Crear un nuevo post para el blog" />
                    <QuickAction href="/admin/autores" title="Agregar Autor" description="Registrar un nuevo autor" />
                    <QuickAction href="/admin/categorias" title="Categoría Foro" description="Crear categoría del foro" />
                </div>
            </div>
        </div>
    );
}

function QuickAction({ href, title, description }: { href: string; title: string; description: string }) {
    return (
        <Link
            href={href}
            className="p-4 rounded-lg border border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all"
        >
            <h3 className="font-bold text-white mb-1">{title}</h3>
            <p className="text-sm text-text-muted">{description}</p>
        </Link>
    );
}
