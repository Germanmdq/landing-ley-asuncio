"use client";

import { useState, useTransition } from 'react';
import { createThread } from '@/app/actions/forum';
import RichTextEditor from './RichTextEditor';
import ImageUpload from './ImageUpload';
import { useRouter } from 'next/navigation';

export default function ThreadComposer({ categories }: { categories: any[] }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categoryId, setCategoryId] = useState(categories[0]?.id || '');
    const [images, setImages] = useState<string[]>([]);
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!title || !content || !categoryId) {
            setError('Por favor completa todos los campos.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('categoryId', categoryId);
        formData.append('images', JSON.stringify(images));

        startTransition(async () => {
            const result = await createThread(null, formData);
            if (!result.success) {
                setError(result.message || 'Error desconocido');
            } else {
                router.push('/comunidad');
                router.refresh();
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-[#111] border border-white/10 p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-white">Crear Nuevo Tema</h2>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <div className="space-y-2">
                <label className="text-sm font-medium text-white/60">Categoría</label>
                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-white/30"
                >
                    {categories.map((cat: any) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-white/60">Título</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Escribe un título claro..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-white/30"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-white/60">Contenido</label>
                <RichTextEditor
                    content={content}
                    onChange={setContent}
                    placeholder="Comparte tu experiencia o duda..."
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-white/60">Imágenes (opcional)</label>
                <ImageUpload onImagesChange={setImages} currentImages={images} />
            </div>

            <div className="flex justify-end pt-2">
                <button
                    type="submit"
                    disabled={isPending}
                    className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all disabled:opacity-50"
                >
                    {isPending ? 'Publicando...' : 'Publicar Tema'}
                </button>
            </div>
        </form>
    );
}
