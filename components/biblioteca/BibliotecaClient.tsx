'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Search, BookOpen, Video, Headphones, FileText } from 'lucide-react';

interface Autor {
    id: string;
    nombre: string;
    slug: string;
    biografia: string;
    imagen_url: string;
    totalObras: number;
    articulos: number;
    conferencias: number;
}

export default function BibliotecaClient({ autores }: { autores: Autor[] }) {
    const [searchTerm, setSearchTerm] = useState('');

    // Filter authors by search term
    const filteredAutores = autores.filter(autor =>
        autor.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {/* Search Bar */}
            <div className="mb-12">
                <div className="relative max-w-2xl mx-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                        type="text"
                        placeholder="Buscar por autor..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-primary/50 transition-colors"
                    />
                </div>
            </div>

            {/* Authors Grid */}
            {filteredAutores.length === 0 ? (
                <div className="text-center text-white/40 py-12 bg-white/5 rounded-xl border border-white/10 border-dashed">
                    <p>No se encontraron autores con ese nombre.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAutores.map((autor) => (
                        <div
                            key={autor.id}
                            className="group bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-primary/50 hover:bg-white/10 transition-all"
                        >
                            {/* Author Header */}
                            <div className="flex flex-col items-center text-center mb-6">
                                {autor.imagen_url ? (
                                    <img
                                        src={autor.imagen_url}
                                        alt={autor.nombre}
                                        className="w-24 h-24 rounded-full object-cover border-4 border-white/20 mb-4"
                                    />
                                ) : (
                                    <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center border-4 border-white/20 mb-4">
                                        <User className="w-12 h-12 text-white/40" />
                                    </div>
                                )}
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    {autor.nombre}
                                </h3>
                                {autor.biografia && (
                                    <p className="text-sm text-white/60 line-clamp-3 mb-4">
                                        {autor.biografia}
                                    </p>
                                )}
                            </div>

                            {/* Content Stats */}
                            <div className="flex justify-center gap-6 mb-6 pb-6 border-b border-white/10">
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-1 text-primary mb-1">
                                        <FileText className="w-4 h-4" />
                                        <span className="text-2xl font-bold">{autor.articulos}</span>
                                    </div>
                                    <p className="text-xs text-white/40">Artículos</p>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-1 text-primary mb-1">
                                        <Video className="w-4 h-4" />
                                        <span className="text-2xl font-bold">{autor.conferencias}</span>
                                    </div>
                                    <p className="text-xs text-white/40">Conferencias</p>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <Link
                                href={`/blog/autor/${autor.slug}`}
                                className="block w-full py-3 px-6 bg-primary text-black font-bold text-center rounded-xl hover:bg-primary/90 transition-all group-hover:scale-105 transform"
                            >
                                Ver su obra
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
