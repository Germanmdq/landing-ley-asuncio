'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

interface MenuItem {
    label: string;
    ariaLabel?: string;
    link: string;
}

interface SocialItem {
    label: string;
    link: string;
}

interface StaggeredMenuProps {
    position?: 'left' | 'right';
    items: MenuItem[];
    socialItems?: SocialItem[];
    displaySocials?: boolean;
    displayItemNumbering?: boolean;
    menuButtonColor?: string;
    openMenuButtonColor?: string;
    changeMenuColorOnOpen?: boolean;
    colors?: [string, string];
    logoUrl?: string;
    accentColor?: string;
    onMenuOpen?: () => void;
    onMenuClose?: () => void;
}

export default function StaggeredMenu({
    position = 'right',
    items,
    socialItems = [],
    displaySocials = false,
    displayItemNumbering = false,
    menuButtonColor = '#fff',
    openMenuButtonColor = '#fff',
    changeMenuColorOnOpen = false,
    colors = ['#B19EEF', '#5227FF'],
    logoUrl,
    accentColor = '#ff6b6b',
    onMenuOpen,
    onMenuClose,
}: StaggeredMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
    const socialRef = useRef<(HTMLAnchorElement | null)[]>([]);
    const overlayRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    const openMenu = () => {
        setIsOpen(true);
        if (onMenuOpen) onMenuOpen();

        // Animate overlay
        gsap.to(overlayRef.current, {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
        });

        // Animate menu panel
        gsap.to(menuRef.current, {
            x: 0,
            duration: 0.6,
            ease: 'power3.out',
        });

        // Stagger menu items
        gsap.fromTo(
            itemsRef.current.filter(Boolean),
            {
                x: position === 'right' ? 50 : -50,
                opacity: 0,
            },
            {
                x: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.08,
                delay: 0.2,
                ease: 'power2.out',
            }
        );

        // Animate social items if present
        if (displaySocials && socialRef.current.length > 0) {
            gsap.fromTo(
                socialRef.current.filter(Boolean),
                {
                    y: 20,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.4,
                    stagger: 0.05,
                    delay: 0.5,
                    ease: 'power2.out',
                }
            );
        }
    };

    const closeMenu = () => {
        if (onMenuClose) onMenuClose();

        // Animate items out
        gsap.to(itemsRef.current.filter(Boolean), {
            x: position === 'right' ? 30 : -30,
            opacity: 0,
            duration: 0.3,
            stagger: 0.03,
            ease: 'power2.in',
        });

        if (displaySocials) {
            gsap.to(socialRef.current.filter(Boolean), {
                y: 10,
                opacity: 0,
                duration: 0.2,
                ease: 'power2.in',
            });
        }

        // Animate menu panel
        gsap.to(menuRef.current, {
            x: position === 'right' ? '100%' : '-100%',
            duration: 0.4,
            delay: 0.2,
            ease: 'power3.in',
        });

        // Animate overlay
        gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.3,
            delay: 0.1,
            onComplete: () => setIsOpen(false),
        });
    };

    useEffect(() => {
        // Lock scroll when menu is open
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const buttonColor = isOpen && changeMenuColorOnOpen ? openMenuButtonColor : menuButtonColor;

    return (
        <>
            {/* Menu Button */}
            <button
                onClick={toggleMenu}
                className="fixed top-6 z-[60] flex flex-col items-center justify-center w-12 h-12 space-y-1.5 transition-all"
                style={{
                    [position === 'right' ? 'right' : 'left']: '1.5rem',
                }}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
                <span
                    className="block w-6 h-0.5 transition-all duration-300"
                    style={{
                        backgroundColor: buttonColor,
                        transform: isOpen ? 'rotate(45deg) translateY(8px)' : 'none',
                    }}
                />
                <span
                    className="block w-6 h-0.5 transition-all duration-300"
                    style={{
                        backgroundColor: buttonColor,
                        opacity: isOpen ? 0 : 1,
                    }}
                />
                <span
                    className="block w-6 h-0.5 transition-all duration-300"
                    style={{
                        backgroundColor: buttonColor,
                        transform: isOpen ? 'rotate(-45deg) translateY(-8px)' : 'none',
                    }}
                />
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    ref={overlayRef}
                    className="fixed inset-0 z-[58] bg-black/50 backdrop-blur-sm"
                    style={{ opacity: 0 }}
                    onClick={closeMenu}
                />
            )}

            {/* Menu Panel */}
            {isOpen && (
                <div
                    ref={menuRef}
                    className="fixed top-0 bottom-0 z-[59] w-full max-w-md overflow-y-auto"
                    style={{
                        [position === 'right' ? 'right' : 'left']: 0,
                        background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
                        transform: position === 'right' ? 'translateX(100%)' : 'translateX(-100%)',
                    }}
                >
                    <div className="flex flex-col min-h-full p-8 pt-24">
                        {/* Logo */}
                        {logoUrl && (
                            <div className="mb-12">
                                <img src={logoUrl} alt="Logo" className="h-8" />
                            </div>
                        )}

                        {/* Menu Items */}
                        <nav className="flex-1 space-y-2">
                            {items.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.link}
                                    ref={(el) => {
                                        itemsRef.current[index] = el;
                                    }}
                                    onClick={closeMenu}
                                    aria-label={item.ariaLabel || item.label}
                                    className="block text-white text-4xl md:text-5xl font-bold hover:translate-x-2 transition-transform duration-300 py-2"
                                    style={{
                                        opacity: 0,
                                    }}
                                >
                                    {displayItemNumbering && (
                                        <span
                                            className="inline-block text-sm mr-4 opacity-60"
                                            style={{ color: accentColor }}
                                        >
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                    )}
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Social Items */}
                        {displaySocials && socialItems.length > 0 && (
                            <div className="mt-12 pt-8 border-t border-white/20">
                                <div className="flex gap-6">
                                    {socialItems.map((social, index) => (
                                        <a
                                            key={index}
                                            href={social.link}
                                            ref={(el) => {
                                                socialRef.current[index] = el;
                                            }}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white text-sm hover:opacity-70 transition-opacity"
                                            style={{
                                                opacity: 0,
                                                color: accentColor,
                                            }}
                                        >
                                            {social.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
