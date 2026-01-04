'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { User, CreditCard, MessageSquare, BookOpen, LogOut, Video } from 'lucide-react';

export default function CuentaPage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login?redirect=/cuenta');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
                Cargando...
            </div>
        );
    }

    if (!user) return null;

    const handleSignOut = async () => {
        await logout();
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <div className="max-w-6xl mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold mb-2">Mi Cuenta</h1>
                <p className="text-white/60 mb-12">Gestiona tu membresía y contenido</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Perfil */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                <User className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-bold">Perfil</h3>
                                <p className="text-sm text-white/60 truncate">{user.email}</p>
                            </div>
                        </div>
                        <p className="text-sm text-white/40 mb-3">Información personal y preferencias</p>
                    </div>

                    {/* Membresía */}
                    <Link
                        href="/#planes"
                        className="bg-gradient-to-br from-primary/20 to-purple-600/20 border border-primary/30 rounded-2xl p-6 hover:border-primary/50 transition-colors"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center">
                                <CreditCard className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-bold">Membresía</h3>
                                <p className="text-sm text-white/60">Plan Bronce</p>
                            </div>
                        </div>
                        <p className="text-sm text-white/40">Ver planes y mejorar →</p>
                    </Link>

                    {/* Tutor IA */}
                    <Link
                        href="/tutor"
                        className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-colors"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                                <Video className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="font-bold">Tutor IA</h3>
                                <p className="text-sm text-white/60">Chat personalizado</p>
                            </div>
                        </div>
                        <p className="text-sm text-white/40">Conversar ahora →</p>
                    </Link>

                    {/* Foro */}
                    <Link
                        href="/comunidad"
                        className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-colors"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                                <MessageSquare className="w-6 h-6 text-purple-400" />
                            </div>
                            <div>
                                <h3 className="font-bold">Mis Temas</h3>
                                <p className="text-sm text-white/60">Foro de la comunidad</p>
                            </div>
                        </div>
                        <p className="text-sm text-white/40">Ver mis publicaciones →</p>
                    </Link>

                    {/* Biblioteca */}
                    <Link
                        href="/blog"
                        className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-colors"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-amber-400" />
                            </div>
                            <div>
                                <h3 className="font-bold">Biblioteca</h3>
                                <p className="text-sm text-white/60">Artículos y conferencias</p>
                            </div>
                        </div>
                        <p className="text-sm text-white/40">Explorar contenido →</p>
                    </Link>

                    {/* Cerrar Sesión */}
                    <button
                        onClick={handleSignOut}
                        className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 hover:bg-red-500/20 transition-colors text-left"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                                <LogOut className="w-6 h-6 text-red-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-red-400">Cerrar Sesión</h3>
                                <p className="text-sm text-white/60">Salir de tu cuenta</p>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}
