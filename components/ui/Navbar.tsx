"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import StaggeredMenu from "./StaggeredMenu";

const menuItems = [
    { label: 'Inicio', ariaLabel: 'Ir al inicio', link: '/' },
    { label: 'Cómo funciona', ariaLabel: 'Ver cómo funciona', link: '/#como-funciona' },
    { label: 'Planes', ariaLabel: 'Ver planes', link: '/#planes' },
    { label: 'Biblioteca', ariaLabel: 'Explorar biblioteca', link: '/blog' },
    { label: 'Foro', ariaLabel: 'Ir al foro', link: '/foro' },
    { label: 'Dosis Mentales', ariaLabel: 'Suscribirse a Dosis Mentales', link: '/dosis-mentales' },
    { label: 'Entrar', ariaLabel: 'Iniciar sesión', link: '/login' },
];

const socialItems = [
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'Instagram', link: 'https://instagram.com' },
];

export default function Navbar() {
    const pathname = usePathname();

    // Don't show Navbar on dashboard or admin pages
    const isDashboard = pathname?.includes('dashboard') || pathname?.includes('admin') || pathname?.includes('tutor');
    if (isDashboard) {
        return null;
    }

    return (
        <>
            {/* Navbar */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur border-b border-white/10">
                <div className="h-16 max-w-6xl mx-auto px-4 flex items-center justify-between">
                    <Link href="/" className="text-white font-bold tracking-tight text-xl">
                        El Club de la Imaginación
                    </Link>

                    {/* Desktop */}
                    <nav className="hidden md:flex items-center gap-6 text-white/70">
                        <Link className="hover:text-white transition-colors" href="/#como-funciona">Cómo funciona</Link>
                        <Link className="hover:text-white transition-colors" href="/#planes">Planes</Link>
                        <Link className="hover:text-white transition-colors" href="/blog">Biblioteca</Link>
                        <Link className="hover:text-white transition-colors" href="/foro">Foro</Link>
                        <Link className="hover:text-white transition-colors" href="/dosis-mentales">Dosis Mentales</Link>
                        <Link className="px-4 py-2 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-colors" href="/login">
                            Entrar
                        </Link>
                    </nav>

                    {/* Mobile - Staggered Menu */}
                    <div className="md:hidden">
                        <StaggeredMenu
                            position="right"
                            items={menuItems}
                            socialItems={socialItems}
                            displaySocials={true}
                            displayItemNumbering={true}
                            menuButtonColor="#fff"
                            openMenuButtonColor="#fff"
                            changeMenuColorOnOpen={true}
                            colors={['#7c3aed', '#5b21b6']}
                            accentColor="#a78bfa"
                        />
                    </div>
                </div>
            </header>

            {/* Spacer para que el contenido no quede debajo del navbar fixed */}
            <div className="h-16" />
        </>
    );
}
