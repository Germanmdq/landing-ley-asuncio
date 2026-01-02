import Link from 'next/link';
import { Home, Users, FileText, MessageSquare, Library, Tags } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <aside className="w-64 bg-surface border-r border-white/10 p-6 flex flex-col">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-white mb-2">Admin Panel</h1>
                    <p className="text-sm text-text-muted">El Club de la Imaginación</p>
                </div>

                <nav className="space-y-2 flex-1">
                    <NavLink href="/admin/dashboard" icon={<Home />}>Dashboard</NavLink>
                    <NavLink href="/admin/autores" icon={<Users />}>Autores</NavLink>
                    <NavLink href="/admin/articulos" icon={<FileText />}>Artículos</NavLink>
                    <NavLink href="/admin/categorias" icon={<Tags />}>Categorías Foro</NavLink>
                    <NavLink href="/admin/biblioteca" icon={<Library />}>Biblioteca</NavLink>
                </nav>

                <div className="pt-4 border-t border-white/10">
                    <Link href="/" className="text-sm text-text-muted hover:text-white transition-colors">
                        ← Volver al sitio
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}

function NavLink({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all"
        >
            <span className="w-5 h-5">{icon}</span>
            <span>{children}</span>
        </Link>
    );
}
