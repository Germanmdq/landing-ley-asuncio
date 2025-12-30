'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Atom, Search, Settings, Sparkles, ChevronDown } from 'lucide-react';
import IntroSequence from './IntroSequence';
import ReactorCore from './ReactorCore';
import ResultDisplay from './ResultDisplay';
import { researchTopic, generateImage, ResearchResult, GeneratedImage } from '@/lib/geminiService';

interface InfoGeniusGeneratorProps {
    onExit?: () => void;
}

export default function InfoGeniusGenerator({ onExit }: InfoGeniusGeneratorProps) {
    const [mode, setMode] = useState<'intro' | 'input' | 'processing' | 'result'>('intro');
    const [topic, setTopic] = useState('');
    const [perspective, setPerspective] = useState('Primera Persona (POV)');
    const [aesthetic, setAesthetic] = useState('Realista');
    const [language, setLanguage] = useState('Español');

    const [researchResult, setResearchResult] = useState<ResearchResult | null>(null);
    const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);

    const handleStart = async () => {
        if (!topic.trim()) return;

        setMode('processing');

        try {
            // Step 1: Research
            const research = await researchTopic(topic, perspective, aesthetic, language);
            setResearchResult(research);

            // Step 2: Generate Image
            const image = await generateImage(research.imagePrompt);
            setGeneratedImage(image);

            setMode('result');
        } catch (error) {
            console.error("Error in generation flow:", error);
            // Handle error state appropriately
            setMode('input');
        }
    };

    const handleRefine = async (instruction: string) => {
        // For now, just regenerate with modified prompt (mock logic)
        if (!researchResult) return;

        setMode('processing');
        const newPrompt = `${researchResult.imagePrompt}. Modificación: ${instruction}`;
        const image = await generateImage(newPrompt);
        setGeneratedImage(image);
        setMode('result');
    };

    if (mode === 'intro') {
        return <IntroSequence onComplete={() => setMode('input')} />;
    }

    return (
        <div className="min-h-screen bg-background text-white font-sans selection:bg-primary/30">

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/5 bg-background/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                        <span className="font-bold tracking-tight">Generador de <span className="text-primary">Imágenes</span></span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                        {onExit && (
                            <button
                                onClick={onExit}
                                className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider"
                            >
                                Salir
                            </button>
                        )}
                    </div>
                </div>
            </header>

            <main className="pt-24 pb-12 px-6 min-h-screen flex flex-col">

                <AnimatePresence mode="wait">
                    {mode === 'input' && (
                        <motion.div
                            key="input"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full"
                        >
                            {/* Hero */}
                            <div className="text-center mb-12">
                                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 tracking-tight">
                                    Visualiza lo Desconocido
                                </h1>
                                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                                    Transforma tus deseos en imágenes cinematográficas usando inteligencia artificial avanzada.
                                </p>
                            </div>

                            {/* Input Complex */}
                            <div className="w-full bg-slate-900/50 border border-white/10 rounded-2xl p-2 shadow-2xl shadow-primary/10 backdrop-blur-sm">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={topic}
                                        onChange={(e) => setTopic(e.target.value)}
                                        placeholder="¿Qué deseas manifestar? (ej: 'Mi casa en la playa', 'Salud perfecta')"
                                        className="w-full bg-transparent text-xl md:text-2xl p-6 text-white placeholder:text-slate-600 focus:outline-none"
                                        onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                        <Sparkles className="w-6 h-6 text-primary/50" />
                                    </div>
                                </div>

                                {/* Settings Bar */}
                                <div className="border-t border-white/5 p-4 flex flex-wrap gap-4 justify-between items-center bg-black/20 rounded-b-xl">
                                    <div className="flex flex-wrap gap-4">
                                        {/* Perspective Selector */}
                                        <div className="relative group">
                                            <select
                                                value={perspective}
                                                onChange={(e) => setPerspective(e.target.value)}
                                                className="appearance-none bg-white/5 hover:bg-white/10 text-gray-300 pl-4 pr-10 py-2 rounded-lg text-sm border border-white/5 focus:border-primary/50 focus:outline-none transition-colors cursor-pointer"
                                            >
                                                <option>Primera Persona (POV)</option>
                                                <option>Tercera Persona</option>
                                                <option>Cinematográfico</option>
                                                <option>Onírico</option>
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                                        </div>

                                        {/* Aesthetic Selector */}
                                        <div className="relative group">
                                            <select
                                                value={aesthetic}
                                                onChange={(e) => setAesthetic(e.target.value)}
                                                className="appearance-none bg-white/5 hover:bg-white/10 text-gray-300 pl-4 pr-10 py-2 rounded-lg text-sm border border-white/5 focus:border-primary/50 focus:outline-none transition-colors cursor-pointer"
                                            >
                                                <option>Realista</option>
                                                <option>Minimalista</option>
                                                <option>Futurista</option>
                                                <option>Vintage</option>
                                                <option>Render 3D</option>
                                                <option>Boceto</option>
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                                        </div>

                                        {/* Language Selector */}
                                        <div className="relative group">
                                            <select
                                                value={language}
                                                onChange={(e) => setLanguage(e.target.value)}
                                                className="appearance-none bg-white/5 hover:bg-white/10 text-gray-300 pl-4 pr-10 py-2 rounded-lg text-sm border border-white/5 focus:border-primary/50 focus:outline-none transition-colors cursor-pointer"
                                            >
                                                <option>Inglés</option>
                                                <option>Español</option>
                                                <option>Francés</option>
                                                <option>Alemán</option>
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleStart}
                                        className="bg-gradient-to-r from-primary to-purple-600 text-black px-8 py-2 rounded-lg font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
                                    >
                                        INICIAR
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {mode === 'processing' && (
                        <motion.div
                            key="processing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex-1 flex items-center justify-center"
                        >
                            <ReactorCore facts={researchResult?.facts || []} />
                        </motion.div>
                    )}

                    {mode === 'result' && generatedImage && researchResult && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex-1 w-full"
                        >
                            <div className="mb-8 flex items-center gap-4">
                                <button
                                    onClick={() => setMode('input')}
                                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                                >
                                    ← Nueva Visualización
                                </button>
                                <div className="h-4 w-[1px] bg-white/10" />
                                <h2 className="text-xl font-semibold text-white">{topic}</h2>
                            </div>

                            <ResultDisplay
                                image={generatedImage}
                                research={researchResult}
                                onRefine={handleRefine}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

            </main>
        </div>
    );
}
