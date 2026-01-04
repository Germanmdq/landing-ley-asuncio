import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { User, BookOpen, Search } from 'lucide-react';
import { Metadata } from 'next';
import BibliotecaClient from '@/components/biblioteca/BibliotecaClient';

export const metadata: Metadata = {
    title: 'Biblioteca | El Club de la Imaginación',
    description: 'Artículos, conferencias y enseñanzas de maestros espirituales.',
};

export const revalidate = 30; // Force fresh deployment

export default async function BibliotecaPage() {
    const supabase = createClient();

    // Get all authors
    const { data: autores } = await supabase
        .from('autores')
        .select('*')
        .order('nombre');

    // Get all articles
    const { data: allArticles } = await supabase
        .from('articulos')
        .select('id, autor_id, titulo, slug, estado')
        .eq('estado', 'publicado');

    // Get all library items (conferencias, audios, etc)
    const { data: libraryItems } = await supabase
        .from('library')
        .select('*');

    // Combine everything and count per author
    const autoresWithObras = autores?.map(autor => {
        // Articles by this author
        const articulos = allArticles?.filter(art => art.autor_id === autor.id) || [];

        // Library items by this author (match by author name)
        const library = libraryItems?.filter(item =>
            item.author?.toLowerCase().includes(autor.nombre.toLowerCase())
        ) || [];

        const totalObras = articulos.length + library.length;

        return {
            ...autor,
            totalObras,
            articulos: articulos.length,
            conferencias: library.length
        };
    }) || [];

    return (
        <main className="min-h-screen bg-[#050505] text-white pb-20">
            {/* Header */}
            <div className="relative py-20 px-6 text-center border-b border-white/5 bg-gradient-to-b from-purple-900/20 to-transparent">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Biblioteca del Club
                </h1>
                <p className="text-white/60 max-w-2xl mx-auto text-lg">
                    Explora las enseñanzas profundas de Neville Goddard y el material de estudio.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <BibliotecaClient autores={autoresWithObras || []} />
            </div>
        </main>
    );
}
