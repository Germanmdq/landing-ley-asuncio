import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function ComunidadLayout({ children }: { children: React.ReactNode }) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Tier check
    const tier = user.user_metadata?.tier || 'bronce';

    if (tier === 'bronce') {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
                <div className="max-w-md space-y-6 bg-[#111] border border-white/10 p-8 rounded-2xl">
                    <h1 className="text-2xl font-bold text-white">Acceso Restringido</h1>
                    <p className="text-white/60">
                        La Comunidad es un espacio exclusivo para miembros <strong className="text-white">Plata</strong> y <strong className="text-amber-400">Oro</strong>.
                    </p>
                    <div className="pt-4">
                        <Link
                            href="/#planes"
                            className="block w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all"
                        >
                            Ver Planes
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {children}
        </div>
    );
}
