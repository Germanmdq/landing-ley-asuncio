"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

function Portal({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return createPortal(children, document.body);
}

function IconMenu(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

function IconX(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

export default function Navbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);


    // iOS-friendly scroll lock (overflow:hidden solo a veces NO alcanza)
    useEffect(() => {
        if (!open) return;

        const scrollY = window.scrollY;

        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = "0";
        document.body.style.right = "0";
        document.body.style.width = "100%";

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("keydown", onKeyDown);

            const top = document.body.style.top;
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.left = "";
            document.body.style.right = "";
            document.body.style.width = "";

            const y = top ? Math.abs(parseInt(top, 10)) : 0;
            window.scrollTo(0, y || scrollY);
        };
    }, [open]);

    const mobileMenu = useMemo(() => {
        if (!open) return null;

        return (
            <Portal>
                {/* TODO el menú vive en ESTA capa fixed. No hay “partes” abajo y arriba. */}
                <div className="md:hidden fixed inset-0 z-[2147483647]">
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/70"
                        onClick={() => setOpen(false)}
                    />

                    {/* Drawer */}
                    <aside
                        className={`
              absolute top-0 right-0 h-[100dvh] w-[85vw] max-w-[360px]
              bg-[#0a0a0a] border-l border-white/10
              shadow-2xl
              translate-x-0
            `}
                        style={{
                            paddingTop: "env(safe-area-inset-top)",
                            paddingBottom: "env(safe-area-inset-bottom)",
                        }}
                    >
                        {/* Header */}
                        <div className="h-16 px-4 flex items-center justify-between border-b border-white/10">
                            <span className="text-white/90 font-semibold text-lg">Menú</span>
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="h-10 w-10 inline-flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/80"
                                aria-label="Cerrar menú"
                            >
                                <IconX className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Links */}
                        <nav className="px-4 py-5 space-y-2">
                            <Link
                                href="/tutor"
                                onClick={() => setOpen(false)}
                                className="block px-4 py-3 rounded-xl bg-primary text-black font-bold text-center"
                            >
                                Mi Escritorio
                            </Link>

                            <Link
                                href="/"
                                onClick={() => setOpen(false)}
                                className="block px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/90"
                            >
                                Inicio
                            </Link>

                            <Link
                                href="/#como-funciona"
                                onClick={() => setOpen(false)}
                                className="block px-4 py-3 rounded-xl hover:bg-white/5 text-white/80"
                            >
                                Cómo funciona
                            </Link>

                            <Link
                                href="/#precio"
                                onClick={() => setOpen(false)}
                                className="block px-4 py-3 rounded-xl hover:bg-white/5 text-white/80"
                            >
                                Precio
                            </Link>

                            <div className="pt-4 mt-4 border-t border-white/10 space-y-2">
                                <Link
                                    href="/signin"
                                    onClick={() => setOpen(false)}
                                    className="block px-4 py-3 rounded-xl hover:bg-white/5 text-white/80"
                                >
                                    Iniciar sesión
                                </Link>

                                <Link
                                    href="/signup"
                                    onClick={() => setOpen(false)}
                                    className="block px-4 py-3 rounded-xl bg-white text-black font-semibold text-center"
                                >
                                    Crear cuenta
                                </Link>
                            </div>
                        </nav>
                    </aside>
                </div>
            </Portal>
        );
    }, [open]);

    // Don't show Navbar on dashboard or admin pages
    const isDashboard = pathname?.includes('dashboard') || pathname?.includes('admin') || pathname?.includes('biblioteca');
    if (isDashboard) {
        return null;
    }

    return (
        <>
            {/* Navbar */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur border-b border-white/10">
                <div className="h-16 max-w-6xl mx-auto px-4 flex items-center justify-between">
                    <Link href="/" className="text-white font-semibold tracking-tight">
                        Sabiduría Online
                    </Link>

                    {/* Desktop */}
                    <nav className="hidden md:flex items-center gap-6 text-white/70">
                        <Link className="hover:text-white" href="/#como-funciona">Cómo funciona</Link>
                        <Link className="hover:text-white" href="/#precio">Precio</Link>
                        <Link className="hover:text-white" href="/mi-escritorio">Mi Escritorio</Link>
                        <Link className="hover:text-white" href="/login">Entrar</Link>
                        <Link className="px-4 py-2 rounded-xl bg-white text-black font-semibold" href="/signup">
                            Empezar
                        </Link>
                    </nav>

                    {/* Mobile button */}
                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className="md:hidden h-10 w-10 inline-flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/90"
                        aria-label="Abrir menú"
                    >
                        <IconMenu className="h-6 w-6" />
                    </button>
                </div>
            </header>

            {/* Spacer para que el contenido no quede debajo del navbar fixed */}
            <div className="h-16" />

            {/* Mobile menu portal */}
            {mobileMenu}
        </>
    );
}
