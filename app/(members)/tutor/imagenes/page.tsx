'use client';

import { useState } from 'react';
import { Sparkles, Download, Trash2, Plus } from 'lucide-react';
import Image from 'next/image';
import InfoGeniusGenerator from '@/components/InfoGenius/InfoGeniusGenerator';

interface GeneratedImage {
    id: string;
    desire: string;
    prompt: string;
    imageUrl: string;
    createdAt: Date;
    technique: string;
}

export default function ImagenesPage() {
    // Imágenes de ejemplo pre-generadas
    const [images, setImages] = useState<GeneratedImage[]>([
        {
            id: '1',
            desire: 'Vivir en una casa frente al mar',
            prompt: 'Vista en primera persona mirando a través de grandes ventanales hacia una playa prístina y océano turquesa al atardecer, manos sosteniendo una taza de café caliente en primer plano, sensación de paz y logro absoluto',
            imageUrl: '/images/manifestation-1.jpg',
            createdAt: new Date('2024-12-01'),
            technique: 'SATS - Visualización antes de dormir'
        },
        {
            id: '2',
            desire: 'Ser un escritor exitoso',
            prompt: 'Vista en primera persona con manos sobre el teclado escribiendo, libros con MI NOMBRE como autor en el estante de fondo, taza de café humeando, luz dorada de la mañana, sensación de plenitud creativa',
            imageUrl: '/images/manifestation-2.jpg',
            createdAt: new Date('2024-11-28'),
            technique: 'Asunción - Vivir desde el fin'
        },
        {
            id: '3',
            desire: 'Viajar por el mundo libremente',
            prompt: 'Vista en primera persona con manos sosteniendo pasaporte lleno de sellos coloridos, sentado en sala VIP de aeropuerto, tablero mostrando destinos exóticos (Tokio, París, Bali), sensación de libertad absoluta',
            imageUrl: '/images/manifestation-3.jpg',
            createdAt: new Date('2024-11-25'),
            technique: 'Revisión - Reescribir el día'
        }
    ]);

    const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);
    const [showGenerateModal, setShowGenerateModal] = useState(false);

    const deleteImage = (id: string) => {
        if (confirm('¿Seguro que quieres eliminar esta imagen?')) {
            setImages(images.filter(img => img.id !== id));
        }
    };

    const downloadImage = (imageUrl: string, desire: string) => {
        // Simular descarga
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = `${desire.substring(0, 30)}.jpg`;
        link.click();
    };

    if (showGenerateModal) {
        return (
            <div className="fixed inset-0 z-50 bg-background">
                <InfoGeniusGenerator onExit={() => setShowGenerateModal(false)} />
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 max-w-full overflow-x-hidden">
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-12">
                <div className="mb-6">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
                        <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-primary" />
                        Imágenes de Manifestación
                    </h1>
                    <p className="text-lg text-text-muted max-w-2xl mx-auto">
                        Visualiza tus deseos cumplidos con imágenes generadas por IA
                    </p>
                </div>
                <button
                    onClick={() => setShowGenerateModal(true)}
                    className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-primary/20"
                >
                    <Plus className="w-6 h-6" />
                    Generar Imagen
                </button>
            </div>


            {/* Grid de imágenes */}
            {images.length === 0 ? (
                <div className="text-center py-20 bg-card rounded-xl border border-white/5">
                    <Sparkles className="w-16 h-16 text-primary mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-bold mb-2">Aún no has generado imágenes</h3>
                    <p className="text-text-muted mb-6">
                        Crea tu primera imagen de manifestación para visualizar tu deseo cumplido
                    </p>
                    <button
                        onClick={() => setShowGenerateModal(true)}
                        className="bg-primary px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                    >
                        Generar Primera Imagen
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((image, index) => (
                        <div
                            key={image.id}
                            className="group bg-card rounded-xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all hover:scale-105"
                        >
                            {/* Imagen */}
                            <div
                                className="relative aspect-square cursor-pointer"
                                onClick={() => setSelectedImage(image)}
                            >
                                <Image
                                    src={image.imageUrl}
                                    alt={image.desire}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    priority={index === 0}
                                    className="object-cover"
                                />
                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                                    <span className="text-white font-semibold">Ver detalles</span>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-4">
                                <h3 className="font-bold mb-2 line-clamp-2">{image.desire}</h3>
                                <p className="text-sm text-primary mb-3">{image.technique}</p>
                                <p className="text-xs text-text-muted mb-4">
                                    {image.createdAt.toLocaleDateString('es-AR', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </p>

                                {/* Acciones */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => downloadImage(image.imageUrl, image.desire)}
                                        className="flex-1 flex items-center justify-center gap-2 bg-primary/20 hover:bg-primary/30 text-primary px-3 py-2 rounded-lg text-sm transition-colors"
                                    >
                                        <Download className="w-4 h-4" />
                                        Descargar
                                    </button>
                                    <button
                                        onClick={() => deleteImage(image.id)}
                                        className="flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-2 rounded-lg text-sm transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal de detalles */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div
                        className="bg-card rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6">
                            {/* Imagen grande */}
                            <div className="aspect-video relative rounded-xl mb-6 overflow-hidden">
                                <Image
                                    src={selectedImage.imageUrl}
                                    alt={selectedImage.desire}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Info detallada */}
                            <h2 className="text-2xl font-bold mb-4">{selectedImage.desire}</h2>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <h3 className="text-sm font-semibold text-primary mb-2">Técnica usada:</h3>
                                    <p className="text-white/80">{selectedImage.technique}</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-primary mb-2">Prompt de generación:</h3>
                                    <p className="text-white/70 text-sm italic">"{selectedImage.prompt}"</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-primary mb-2">Fecha de creación:</h3>
                                    <p className="text-white/80">
                                        {selectedImage.createdAt.toLocaleDateString('es-AR', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>

                            {/* Acciones */}
                            <div className="flex gap-3">
                                <button
                                    onClick={() => downloadImage(selectedImage.imageUrl, selectedImage.desire)}
                                    className="flex-1 bg-primary hover:bg-primary-dark px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                                >
                                    <Download className="w-5 h-5" />
                                    Descargar Imagen
                                </button>
                                <button
                                    onClick={() => setSelectedImage(null)}
                                    className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
