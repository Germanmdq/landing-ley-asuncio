'use client';

import React from 'react';
import Head from 'next/head';
import { SectionHeader } from '@/components/airpods/SectionHeader';
import { ProductCard } from '@/components/airpods/ProductCard';
import { Button } from '@/components/airpods/Button';

export default function AirPodsPage() {
    return (
        <div className="min-h-screen bg-[#ffffff] font-sans">
            {/* Navbar Placeholder */}
            <nav className="sticky top-0 z-50 bg-[#ffffff]/80 backdrop-blur-md h-12 flex items-center justify-center border-b border-gray-100">
                <span className="text-gray-500 text-xs">Sabiduría Online</span>
            </nav>

            <main>
                {/* Hero Section */}
                <section className="pt-20 pb-12 md:pt-32 md:pb-24 px-4 text-center max-w-[1440px] mx-auto">
                    <p className="text-[#bf4800] font-semibold mb-4 text-xs tracking-widest uppercase">Disponible 24/7</p>
                    <h1 className="text-5xl md:text-8xl font-semibold text-[#1d1d1f] mb-6 tracking-tight leading-tight">
                        Tu tutor personal<br />
                        <span className="text-gray-400">espiritual.</span>
                    </h1>
                    <p className="text-xl md:text-3xl font-medium text-[#1d1d1f] max-w-3xl mx-auto leading-relaxed mb-10">
                        No es una herramienta. No es una biblioteca.<br />
                        Es un recordatorio constante de quién sos.
                    </p>

                    <div className="flex gap-4 justify-center mb-16">
                        <Button href="/login">Viví la experiencia</Button>
                        <Button href="#how-it-works" variant="link">Ver cómo funciona</Button>
                    </div>

                    <div className="w-full max-w-5xl mx-auto">
                        <img
                            src="/landing-v3/spiritual_tutor_flat_illustration_1766280606018.png"
                            alt="Spiritual Tutor"
                            className="w-full h-auto object-contain drop-shadow-2xl"
                        />
                    </div>
                </section>

                {/* Feature Banner - Intro */}
                <section className="py-20 px-4 bg-[#f5f5f7] mb-4 md:rounded-3xl max-w-[98%] mx-auto overflow-hidden relative">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-6xl font-semibold mb-4 text-[#1d1d1f]">Sabiduría Online.</h2>
                        <p className="text-xl md:text-2xl mb-8 font-medium text-gray-500">Icónicos. Ahora épicos.</p>
                        <div className="flex gap-6 justify-center">
                            <Button href="/register" variant="primary">Empezar ahora</Button>
                        </div>
                    </div>
                    <div className="relative h-[300px] md:h-[600px] w-full flex justify-center">
                        <img
                            src="/landing-v3/spiritual_tutor_modern_ui_mockup_es_1766278857169.png"
                            alt="Interface Mockup"
                            className="object-contain h-full drop-shadow-xl"
                        />
                    </div>
                </section>

                {/* Principles Grid (replacing Product Comparison) */}
                <section className="py-24 px-4 max-w-[1440px] mx-auto">
                    <SectionHeader title="Encuentra la verdad." className="mb-20 text-center md:text-left md:pl-12" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-200">

                        <ProductCard
                            title="No inventa"
                            subtitle="Respuestas basadas únicamente en textos reales."
                            imageSrc="/landing-v3/library_selection_view_1766180991044.png"
                            buyLink="/login"
                            learnMoreLink="#"
                            isNew={true}
                            features={[
                                "Fuentes originales",
                                "Sin alucinaciones",
                                "Citas verificables"
                            ]}
                        />

                        <ProductCard
                            title="No opina"
                            subtitle="Sin interpretaciones modernas o diluidas."
                            imageSrc="/landing-v3/library_selection_after_login_1766181052793.png"
                            buyLink="/login"
                            learnMoreLink="#"
                            features={[
                                "Neville Goddard",
                                "Nuevo Pensamiento",
                                "Interpretación bíblica"
                            ]}
                        />

                        <ProductCard
                            title="No adorna"
                            subtitle="La verdad directa de la fuente original."
                            imageSrc="/landing-v3/spiritual_tutor_hero_v2_1766182965272.png"
                            buyLink="/login"
                            learnMoreLink="#"
                            features={[
                                "Claridad absoluta",
                                "Directo al punto",
                                "Sin distracciones"
                            ]}
                        />

                        <ProductCard
                            title="Tu Centro"
                            subtitle="Te ayuda a recordar lo que siempre fuiste."
                            imageSrc="/landing-v3/spiritual_tutor_premium_ui_mockup_1766278392778.png"
                            buyLink="/login"
                            learnMoreLink="#"
                            isNew={true}
                            features={[
                                "Disponible 24/7",
                                "Privacidad total",
                                "Guía personalizada"
                            ]}
                        />

                    </div>
                </section>

                {/* Feature Highlights Grid */}
                <section className="py-24 px-4 max-w-[1440px] mx-auto">
                    <SectionHeader title="Descubre tu potencial." className="text-center mb-16" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Highlight 1 */}
                        <div className="bg-[#f5f5f7] rounded-3xl p-8 md:p-12 overflow-hidden relative min-h-[500px] flex flex-col justify-between group cursor-pointer transition-transform hover:scale-[1.01] duration-500">
                            <div>
                                <h3 className="text-3xl md:text-5xl font-semibold mb-4 text-[#1d1d1f]">Verdad<br />Directa.</h3>
                                <p className="text-lg text-gray-500 mb-8 max-w-sm">No querés opiniones mezcladas. Querés claridad.</p>
                            </div>
                            <div className="mt-auto self-center transform group-hover:scale-105 transition-transform duration-700">
                                <img src="/landing-v3/testimonial_user_1_1766182913759.png" alt="Testimonial" className="rounded-2xl shadow-lg w-full max-w-md" />
                            </div>
                        </div>

                        {/* Highlight 2 */}
                        <div className="bg-[#f5f5f7] rounded-3xl p-8 md:p-12 overflow-hidden relative min-h-[500px] flex flex-col justify-between group cursor-pointer transition-transform hover:scale-[1.01] duration-500">
                            <div>
                                <h3 className="text-3xl md:text-5xl font-semibold mb-4 text-[#1d1d1f]">Soporte<br />Incondicional.</h3>
                                <p className="text-lg text-gray-500 mb-8 max-w-sm">Imaginá que son las 2 de la mañana. Tenés una duda. Estamos acá.</p>
                            </div>
                            <div className="mt-auto self-center transform group-hover:scale-105 transition-transform duration-700">
                                <img src="/landing-v3/landing_pricing_and_cta_1766181895383.png" alt="Pricing" className="rounded-2xl shadow-lg w-full max-w-md" />
                            </div>
                        </div>

                    </div>
                </section>

                <footer className="bg-[#ffffff] py-12 text-center text-xs text-gray-400 border-t border-gray-100">
                    <p className="mb-2">Sabiduría Online. Todos los derechos reservados.</p>
                    <div className="flex justify-center gap-4 text-gray-500">
                        <a href="#" className="hover:underline">Privacidad</a>
                        <a href="#" className="hover:underline">Términos</a>
                        <a href="#" className="hover:underline">Contacto</a>
                    </div>
                </footer>

            </main>
        </div>
    );
}
