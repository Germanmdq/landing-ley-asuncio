'use client';

import { useState } from 'react';
import { Video, Download, Trash2, Plus, Play, Pause } from 'lucide-react';

interface GeneratedVideo {
    id: string;
    desire: string;
    prompt: string;
    videoUrl: string;
    thumbnailUrl: string;
    duration: string;
    createdAt: Date;
    technique: string;
}

export default function VideosPage() {
    // Videos de ejemplo pre-generados
    const [videos, setVideos] = useState<GeneratedVideo[]>([
        {
            id: '1',
            desire: 'Vivir en una casa frente al mar',
            prompt: 'Cámara POV en primera persona: despertar en una cama king size con vista al océano turquesa a través de ventanales. La cámara se mueve lentamente hacia la ventana. Manos aparecen abriendo las cortinas blancas. Vista panorámica de playa dorada y palmeras. Caminar descalzo hacia el balcón. Sostener taza de café caliente. Respirar profundo sintiendo la brisa marina. Atardecer dorado. Sensación de paz absoluta y logro.',
            videoUrl: '/videos/manifestation-1.mp4',
            thumbnailUrl: '/images/video-thumb-1.jpg',
            duration: '5:30',
            createdAt: new Date('2024-12-02'),
            technique: 'SATS - Visualización inmersiva'
        },
        {
            id: '2',
            desire: 'Ser un escritor exitoso',
            prompt: 'Cámara POV en primera persona: manos escribiendo en laptop en escritorio elegante. Notificación en pantalla: "Tu libro es #1 en Amazon". Manos toman café celebrando. Cámara gira hacia estante con múltiples libros propios. Smartphone vibra mostrando mensajes de felicitación. Mirar por ventana con luz dorada de mañana. Regresar a laptop y seguir escribiendo con satisfacción. Sensación de plenitud creativa.',
            videoUrl: '/videos/escritor.mp4',
            thumbnailUrl: '/images/video-thumb-2.jpg',
            duration: '6:15',
            createdAt: new Date('2024-11-29'),
            technique: 'Asunción - Sentir el éxito'
        },
        {
            id: '3',
            desire: 'Viajar por el mundo libremente',
            prompt: 'Cámara POV en primera persona: manos sosteniendo pasaporte abierto lleno de sellos. Sentado en sala VIP de aeropuerto. Mirar tablero electrónico mostrando vuelos a Tokio, París, Bali. Tomar copa de champagne. Caminar hacia ventana viendo aviones despegar. Revisar maleta de cuero vintage. Recibir notificación de embarque en business class. Caminar por terminal elegante. Subir a avión. Sensación de libertad absoluta.',
            videoUrl: '/videos/manifestation-2.mp4',
            thumbnailUrl: '/images/video-thumb-3.jpg',
            duration: '7:00',
            createdAt: new Date('2024-11-26'),
            technique: 'Revisión - Vivir el viaje'
        }
    ]);

    const [selectedVideo, setSelectedVideo] = useState<GeneratedVideo | null>(null);
    const [showGenerateModal, setShowGenerateModal] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const deleteVideo = (id: string) => {
        if (confirm('¿Seguro que quieres eliminar este video?')) {
            setVideos(videos.filter(vid => vid.id !== id));
        }
    };

    const downloadVideo = (videoUrl: string, desire: string) => {
        const link = document.createElement('a');
        link.href = videoUrl;
        link.download = `${desire.substring(0, 30)}.mp4`;
        link.click();
    };

    return (
        <div className="p-4 md:p-6 max-w-full overflow-x-hidden">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                        <Video className="w-8 h-8 text-primary" />
                        Videos de Manifestación
                    </h1>
                    <p className="text-text-muted">
                        Visualizaciones inmersivas en primera persona de tus deseos cumplidos
                    </p>
                </div>
                <button
                    onClick={() => setShowGenerateModal(true)}
                    className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform"
                >
                    <Plus className="w-5 h-5" />
                    Generar Video
                </button>
            </div>

            {/* Banner de feature exclusiva */}
            <div className="bg-gradient-to-r from-primary/20 to-primary-dark/20 border border-primary/30 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                        🎬
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">Feature Exclusivo de Usuario Fundador</h3>
                        <p className="text-white/80 mb-3">
                            Como usuario fundador, tenés acceso a generar videos inmersivos de 5-8 minutos en primera persona.
                            Estos videos están diseñados específicamente para SATS y visualización profunda.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div className="bg-white/5 rounded-lg p-3">
                                <div className="text-primary font-semibold mb-1">🎥 POV Real</div>
                                <div className="text-sm text-white/70">Primera persona para máxima inmersión</div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-3">
                                <div className="text-primary font-semibold mb-1">⏱️ 5-8 minutos</div>
                                <div className="text-sm text-white/70">Duración perfecta para SATS</div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-3">
                                <div className="text-primary font-semibold mb-1">🎬 Veo AI</div>
                                <div className="text-sm text-white/70">Calidad cinematográfica</div>
                            </div>
                        </div>
                        <p className="text-sm text-primary mt-4">
                            💡 Tip: Mira estos videos antes de dormir con auriculares para una experiencia SATS completa
                        </p>
                    </div>
                </div>
            </div>

            {/* Grid de videos */}
            {videos.length === 0 ? (
                <div className="text-center py-20 bg-card rounded-xl border border-white/5">
                    <Video className="w-16 h-16 text-primary mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-bold mb-2">Aún no has generado videos</h3>
                    <p className="text-text-muted mb-6">
                        Crea tu primer video de manifestación para experimentar la visualización inmersiva
                    </p>
                    <button
                        onClick={() => setShowGenerateModal(true)}
                        className="bg-primary px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                    >
                        Generar Primer Video
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((video) => (
                        <div
                            key={video.id}
                            className="group bg-card rounded-xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all"
                        >
                            {/* Thumbnail/Video preview */}
                            <div
                                className="relative aspect-video cursor-pointer bg-black overflow-hidden"
                                onClick={() => setSelectedVideo(video)}
                                onMouseEnter={(e) => {
                                    const videoElement = e.currentTarget.querySelector('video');
                                    if (videoElement) videoElement.play();
                                }}
                                onMouseLeave={(e) => {
                                    const videoElement = e.currentTarget.querySelector('video');
                                    if (videoElement) {
                                        videoElement.pause();
                                        videoElement.currentTime = 0;
                                    }
                                }}
                            >
                                <video
                                    src={video.videoUrl}
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                />

                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform z-10">
                                        <Play className="w-8 h-8 text-white ml-1" />
                                    </div>
                                </div>

                                {/* Duration badge */}
                                <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-1 rounded text-xs font-semibold z-10">
                                    {video.duration}
                                </div>

                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white font-semibold mt-20">Reproducir</span>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-4">
                                <h3 className="font-bold mb-2 line-clamp-2">{video.desire}</h3>
                                <p className="text-sm text-primary mb-3">{video.technique}</p>
                                <p className="text-xs text-text-muted mb-4">
                                    {video.createdAt.toLocaleDateString('es-AR', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </p>

                                {/* Acciones */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => downloadVideo(video.videoUrl, video.desire)}
                                        className="flex-1 flex items-center justify-center gap-2 bg-primary/20 hover:bg-primary/30 text-primary px-3 py-2 rounded-lg text-sm transition-colors"
                                    >
                                        <Download className="w-4 h-4" />
                                        Descargar
                                    </button>
                                    <button
                                        onClick={() => deleteVideo(video.id)}
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

            {/* Modal de reproducción */}
            {selectedVideo && (
                <div
                    className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
                    onClick={() => setSelectedVideo(null)}
                >
                    <div
                        className="bg-card rounded-xl max-w-5xl w-full max-h-[95vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6">
                            {/* Video player */}
                            <div className="aspect-video bg-black rounded-xl mb-6 overflow-hidden relative group">
                                <video
                                    src={selectedVideo.videoUrl}
                                    controls
                                    autoPlay
                                    className="w-full h-full object-contain"
                                >
                                    Tu navegador no soporta el elemento de video.
                                </video>
                            </div>

                            {/* Info detallada */}
                            <h2 className="text-2xl font-bold mb-4">{selectedVideo.desire}</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex items-center gap-6 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Video className="w-4 h-4 text-primary" />
                                        <span className="text-white/70">Duración: {selectedVideo.duration}</span>
                                    </div>
                                    <div className="text-white/70">
                                        {selectedVideo.createdAt.toLocaleDateString('es-AR', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-primary mb-2">Técnica asociada:</h3>
                                    <p className="text-white/80">{selectedVideo.technique}</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-primary mb-2">Prompt de generación:</h3>
                                    <p className="text-white/70 text-sm italic">"{selectedVideo.prompt}"</p>
                                </div>

                                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                                        💡 Cómo usar este video para SATS:
                                    </h3>
                                    <ol className="text-sm text-white/80 space-y-2 list-decimal list-inside">
                                        <li>Ponte auriculares y acuéstate cómodo</li>
                                        <li>Reproduce el video antes de dormir</li>
                                        <li>Siente que ERES la persona en el video</li>
                                        <li>Déjate llevar por las sensaciones</li>
                                        <li>Duerme manteniendo esa sensación</li>
                                    </ol>
                                </div>
                            </div>

                            {/* Acciones */}
                            <div className="flex gap-3">
                                <button
                                    onClick={() => downloadVideo(selectedVideo.videoUrl, selectedVideo.desire)}
                                    className="flex-1 bg-primary hover:bg-primary-dark px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                                >
                                    <Download className="w-5 h-5" />
                                    Descargar Video
                                </button>
                                <button
                                    onClick={() => setSelectedVideo(null)}
                                    className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de generar (placeholder - en producción conectaría con Veo API) */}
            {showGenerateModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-card p-6 rounded-xl max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4">Generar Nuevo Video</h2>
                        <p className="text-text-muted mb-6">
                            Esta feature estará disponible próximamente. Podrás generar videos inmersivos de 5-8 minutos usando Veo AI.
                        </p>
                        <button
                            onClick={() => setShowGenerateModal(false)}
                            className="w-full bg-primary px-4 py-2 rounded-lg"
                        >
                            Entendido
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
