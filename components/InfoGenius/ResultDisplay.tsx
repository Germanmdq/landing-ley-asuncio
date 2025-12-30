'use client';

import { Download, Maximize2, ExternalLink, Send } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { GeneratedImage, ResearchResult } from '@/lib/geminiService';

interface ResultDisplayProps {
    image: GeneratedImage;
    research: ResearchResult;
    onRefine: (instruction: string) => void;
}

export default function ResultDisplay({ image, research, onRefine }: ResultDisplayProps) {
    const [refineInput, setRefineInput] = useState('');

    const handleRefine = () => {
        if (!refineInput.trim()) return;
        onRefine(refineInput);
        setRefineInput('');
    };

    return (
        <div className="w-full max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-700">

            {/* Main Image Frame */}
            <div className="relative group aspect-video w-full bg-background rounded-xl overflow-hidden border border-white/10 shadow-2xl mb-8">

                {/* Tech Corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary z-20" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary z-20" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary z-20" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary z-20" />

                <Image
                    src={image.imageUrl}
                    alt={image.prompt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Floating Actions */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="p-2 bg-black/50 backdrop-blur-md rounded-lg text-white hover:bg-primary/20 hover:text-white transition-colors">
                        <Maximize2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-black/50 backdrop-blur-md rounded-lg text-white hover:bg-primary/20 hover:text-white transition-colors">
                        <Download className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Edit Mode Bar */}
            <div className="bg-background/50 border border-white/10 rounded-xl p-4 mb-8 flex gap-4 items-center">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        value={refineInput}
                        onChange={(e) => setRefineInput(e.target.value)}
                        placeholder="Refinar imagen (ej: 'Agrega etiquetas rojas', 'Hazlo más oscuro')..."
                        className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                        onKeyDown={(e) => e.key === 'Enter' && handleRefine()}
                    />
                </div>
                <button
                    onClick={handleRefine}
                    className="bg-primary/10 hover:bg-primary/20 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                    <Send className="w-4 h-4" />
                    Refinar
                </button>
            </div>

            {/* Sources Grid */}
            <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
                    Fuentes de Investigación
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {research.searchResults.map((source, idx) => (
                        <a
                            key={idx}
                            href={`https://${source.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-background/50 border border-white/5 rounded-lg p-4 hover:border-primary/30 transition-colors group"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <span className="text-xs text-primary font-mono">FUENTE 0{idx + 1}</span>
                                <ExternalLink className="w-3 h-3 text-gray-600 group-hover:text-white transition-colors" />
                            </div>
                            <h4 className="text-sm font-medium text-gray-200 line-clamp-1 group-hover:text-white">
                                {source.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">{source.url}</p>
                        </a>
                    ))}
                </div>
            </div>

        </div>
    );
}
