"use client";

import { useState, useTransition } from 'react';
import { replyToThread } from '@/app/actions/forum';
import RichTextEditor from './RichTextEditor';
import ImageUpload from './ImageUpload';
import { useRouter } from 'next/navigation';

export default function ReplyComposer({ threadId }: { threadId: string }) {
    const [content, setContent] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleSubmit = async () => {
        if (!content) return;

        const formData = new FormData();
        formData.append('content', content);
        formData.append('threadId', threadId);
        formData.append('images', JSON.stringify(images));

        startTransition(async () => {
            const res = await replyToThread(null, formData);
            if (res?.success) {
                setContent('');
                setImages([]);
                router.refresh();
            }
        });
    };

    return (
        <div className="mt-8 space-y-4">
            <h3 className="text-lg font-bold text-white">Responder</h3>
            <div className="bg-[#111] border border-white/10 rounded-2xl p-4 space-y-4">
                <RichTextEditor
                    content={content}
                    onChange={setContent}
                    placeholder="Escribe tu respuesta..."
                />
                <ImageUpload onImagesChange={setImages} currentImages={images} maxImages={3} />
                <div className="flex justify-end">
                    <button
                        onClick={handleSubmit}
                        disabled={isPending || !content}
                        className="px-4 py-2 bg-white text-black font-bold rounded-lg hover:bg-white/90 disabled:opacity-50 text-sm"
                    >
                        {isPending ? 'Enviando...' : 'Responder'}
                    </button>
                </div>
            </div>
        </div>
    );
}
