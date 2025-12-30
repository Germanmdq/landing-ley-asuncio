"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, Mail, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-black pt-32 pb-12 px-4 border-t border-white/10">
            <div className="container max-w-7xl mx-auto">
                {/* Final CTA Section */}
                <div className="text-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-primary/20 via-purple-500/10 to-primary/20 p-12 md:p-20 rounded-[4rem] border border-primary/30 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />

                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tight">
                                Empezá tu maestría hoy.
                            </h2>
                            <p className="text-xl md:text-2xl text-text-muted max-w-2xl mx-auto mb-12">
                                No dejes tu camino espiritual al azar. Accedé a la fuente real y transformá tu realidad.
                            </p>

                            <div className="flex flex-wrap justify-center gap-4 mb-12">
                                <Button size="lg" className="h-16 px-8 bg-primary text-black font-bold rounded-2xl">Mensual $15</Button>
                                <Button size="lg" className="h-16 px-8 bg-white text-black font-bold rounded-2xl">Anual $150</Button>
                                <Button size="lg" className="h-16 px-8 bg-purple-600 text-white font-bold rounded-2xl">Por Vida $250</Button>
                            </div>

                            <div className="flex items-center justify-center gap-2 text-primary font-bold uppercase tracking-widest text-sm">
                                <ShieldCheck size={20} />
                                <span>Garantía de satisfacción de 7 días</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Footer Links & Info */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-bold mb-6 tracking-tighter">Sabiduría Online</h3>
                        <p className="text-text-muted max-w-sm mb-8">
                            El único sistema que te conecta directamente con las palabras exactas de 26 maestros espirituales a través de 900+ textos originales.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-black transition-all">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-black transition-all">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-primary">Producto</h4>
                        <ul className="space-y-4 text-text-muted text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Biblioteca</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Conferencias</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Biblia + Strong's</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Precios</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-primary">Soporte</h4>
                        <ul className="space-y-4 text-text-muted text-sm">
                            <li className="flex items-center gap-2">
                                <Mail size={14} />
                                <a href="mailto:soporte@neville.com" className="hover:text-white transition-colors">soporte@neville.com</a>
                            </li>
                            <li><a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Política de Privacidad</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 text-center text-xs text-text-muted">
                    <p>© 2024 Sabiduría Online. Hecho con dedicación para estudiantes serios de manifestación.</p>
                </div>
            </div>
        </footer>
    );
}
