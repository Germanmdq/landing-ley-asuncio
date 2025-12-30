"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createPortal } from "react-dom";
import {
    MessageSquare,
    History,
    Library,
    BookOpen,
    Sparkles,
    Video,
    Star,
    Calendar,
    Settings,
    Menu,
    X,
    ChevronDown,
    ChevronRight,
    Shield,
    Lightbulb
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
    { icon: MessageSquare, label: 'Conversar', href: '/tutor' },
    // Biblioteca moved to top Navbar
    { icon: Lightbulb, label: 'Citas y Testimonios', href: '/sabiduria' },
    { icon: BookOpen, label: 'Blog', href: '/blog' },
    { icon: Calendar, label: 'Manifestaciones', href: '/tutor/cuaderno' },
    { icon: History, label: 'Historial', href: '/tutor/historial' },
    { icon: Sparkles, label: 'Imágenes', href: '/tutor/imagenes' },
    { icon: Video, label: 'Videos', href: '/videos' },
    { icon: Star, label: 'Favoritos', href: '/tutor/favoritos' },
    { icon: Calendar, label: 'Mi Plan', href: '/tutor/plan' },
    { icon: Settings, label: 'Cuenta', href: '/tutor/cuenta' },
    { icon: Shield, label: 'Admin', href: '/admin/articulos' },
];

function usePortalRoot(id = "portal-root") {
    const [root, setRoot] = useState<HTMLElement | null>(null);

    useEffect(() => {
        let el = document.getElementById(id) as HTMLElement | null;
        let created = false;

        if (!el) {
            el = document.createElement("div");
            el.id = id;
            document.body.appendChild(el);
            created = true;
        }

        setRoot(el);

        return () => {
            // Si lo creamos nosotros, lo limpiamos al desmontar
            if (created && el?.parentNode) el.parentNode.removeChild(el);
        };
    }, [id]);

    return root;
}

export default function Sidebar({ isDemo = false }: { isDemo?: boolean }) {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    const [expandedItems, setExpandedItems] = useState<string[]>(['/dashboard/biblioteca']); // Default expand library
    const { user, logout } = useAuth();
    const portalRoot = usePortalRoot();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Error logging out', error);
        }
    };

    const toggleExpand = (href: string, e: React.MouseEvent) => {
        e.preventDefault();
        setExpandedItems(prev =>
            prev.includes(href)
                ? prev.filter(item => item !== href)
                : [...prev, href]
        );
    };

    // (Opcional) cerrá con Escape
    useEffect(() => {
        if (!mobileMenuOpen) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setMobileMenuOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [mobileMenuOpen]);

    const renderNavItem = (item: any, isMobile = false) => {
        const isActive = pathname === item.href || (item.submenu && item.submenu.some((sub: any) => pathname === sub.href));
        const isExpanded = expandedItems.includes(item.href);
        const hasSubmenu = item.submenu && item.submenu.length > 0;

        return (
            <div key={item.href}>
                <Link
                    href={item.href}
                    onClick={(e) => {
                        if (hasSubmenu) {
                            toggleExpand(item.href, e);
                        } else if (isMobile) {
                            setMobileMenuOpen(false);
                        }
                    }}
                    className={`
                        flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 group
                        ${isActive
                            ? 'bg-white/10 text-white border border-white/5 shadow-[0_0_20px_rgba(255,255,255,0.05)]'
                            : 'text-text-muted hover:bg-white/5 hover:text-white'
                        }
                    `}
                >
                    <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                    </div>
                    {hasSubmenu && (
                        isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
                    )}
                </Link>

                {/* Submenu */}
                {hasSubmenu && isExpanded && (
                    <div className="ml-9 mt-1 space-y-1 border-l border-white/10 pl-2">
                        {item.submenu.map((sub: any) => {
                            const isSubActive = pathname === sub.href;
                            return (
                                <Link
                                    key={sub.href}
                                    href={sub.href}
                                    onClick={() => isMobile && setMobileMenuOpen(false)}
                                    className={`
                                        flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all
                                        ${isSubActive
                                            ? 'text-white bg-white/5'
                                            : 'text-text-muted hover:text-white hover:bg-white/5'
                                        }
                                    `}
                                >
                                    <span>{sub.label}</span>
                                    {sub.badge && (
                                        <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded border border-primary/20">
                                            {sub.badge}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    };

    const mobileUI = useMemo(() => {
        const targetRoot = portalRoot || (typeof document !== 'undefined' ? document.body : null);
        if (!targetRoot) return null;

        return createPortal(
            <>
                {/* MOBILE HEADER */}
                <header className="md:hidden fixed top-0 left-0 right-0 bg-[#0a0a0a] border-b border-white/5 z-[2147483647]">
                    <div className="flex items-center justify-between px-4 py-3">
                        {/* Logo */}
                        <h1 className="text-lg font-bold">El Club</h1>

                        {/* Hamburger button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                            aria-label="Menú"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </header>

                {/* MOBILE OVERLAY */}
                {mobileMenuOpen && (
                    <div
                        className="md:hidden fixed inset-0 bg-black/80 z-[2147483646]"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                )}

                {/* MOBILE MENU DRAWER */}
                <aside
                    className={`
            md:hidden fixed top-0 right-0 h-[100dvh] w-72 bg-[#0a0a0a]
            border-l border-white/5 z-[2147483647] flex flex-col
            transform transition-transform duration-200 ease-out
            ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}
          `}
                >
                    {/* Header simple con botón de cerrar */}
                    <div className="p-4 flex justify-end border-b border-white/5">
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/70"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Navigation - Flat List */}
                    <nav className="flex-1 p-4 overflow-y-auto">
                        <div className="space-y-1">
                            {navItems.map(item => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`
                                        flex items-center gap-3 px-4 py-4 rounded-xl transition-all
                                        ${pathname === item.href
                                            ? 'bg-white/10 text-white border border-white/5'
                                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                                        }
                                    `}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span className="font-medium text-lg">{item.label}</span>
                                </Link>
                            ))}

                            <div className="my-4 border-t border-white/5 pt-4 space-y-1">
                                <Link
                                    href="/"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-4 py-4 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-all"
                                >
                                    <Sparkles className="w-5 h-5" />
                                    <span className="font-medium text-lg">Volver al Inicio</span>
                                </Link>

                                <button
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        handleLogout();
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-4 rounded-xl text-red-400/80 hover:bg-red-500/10 transition-all"
                                >
                                    <X className="w-5 h-5" />
                                    <span className="font-medium text-lg">Cerrar Sesión</span>
                                </button>
                            </div>
                        </div>
                    </nav>

                    {/* User Info at the bottom */}
                    <div className="p-6 border-t border-white/5 bg-white/[0.02]">
                        <div className="flex items-center gap-3">
                            {user?.user_metadata?.avatar_url ? (
                                <img src={user.user_metadata.avatar_url} alt={user.user_metadata.full_name || 'User'} className="w-10 h-10 rounded-full" />
                            ) : (
                                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                                    <span className="text-primary font-bold">{user?.user_metadata?.full_name?.[0] || user?.email?.[0] || 'U'}</span>
                                </div>
                            )}
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-medium text-white truncate">{user?.user_metadata?.full_name || 'Usuario'}</p>
                                <p className="text-xs text-white/40 truncate">{user?.email}</p>
                            </div>
                        </div>
                    </div>
                </aside>
            </>,
            targetRoot
        );
    }, [portalRoot, mobileMenuOpen, user, handleLogout, pathname]);

    return (
        <>
            {/* DESKTOP SIDEBAR */}
            <aside className={`hidden md:flex flex-col w-64 bg-black/20 backdrop-blur-xl border-r border-white/5 z-20 ${isDemo ? 'h-full' : 'fixed left-0 top-0 h-screen'}`}>
                {/* Logo */}
                <div className="p-6 border-b border-white/5">
                    <h1 className="text-xl font-bold tracking-tight">El Club de la Imaginación</h1>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-2">
                        {navItems.map(item => renderNavItem(item))}
                    </div>
                </nav>

                {/* User section */}
                <div className="p-4 border-t border-white/5">
                    <div className="flex items-center gap-3 px-4 py-3 mb-2">
                        {user?.user_metadata?.avatar_url ? (
                            <img src={user.user_metadata.avatar_url} alt={user.user_metadata.full_name || 'User'} className="w-10 h-10 rounded-full" />
                        ) : (
                            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                                <span className="text-primary font-bold">{user?.user_metadata?.full_name?.[0] || user?.email?.[0] || 'U'}</span>
                            </div>
                        )}
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-medium truncate">{user?.user_metadata?.full_name || 'Usuario'}</p>
                            <p className="text-xs text-text-muted truncate">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 text-xs text-red-400 hover:bg-red-500/10 py-2 rounded-lg transition-colors"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* MOBILE UI - Only on client to avoid hydration mismatch */}
            {mounted ? mobileUI : null}
        </>
    );
}
