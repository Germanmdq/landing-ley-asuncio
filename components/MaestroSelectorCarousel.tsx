import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Users, Sparkles } from 'lucide-react';

interface Maestro {
    id: string;
    nombre: string;
    apellido: string;
    especialidad: string;
    categoria: string;
    emoji: string;
    frase: string;
    color: string;
}

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
}

const maestros: Maestro[] = [
    { id: 'neville', nombre: 'Neville', apellido: 'Goddard', especialidad: 'Ley de la Asunción', categoria: 'Manifestación', emoji: '🎩', frase: 'La imaginación es Dios en acción', color: '#7A5BA6' },
    { id: 'murphy', nombre: 'Joseph', apellido: 'Murphy', especialidad: 'Poder del Subconsciente', categoria: 'Manifestación', emoji: '📚', frase: 'Tu subconsciente es tu servidor fiel', color: '#3B82F6' },
    { id: 'shinn', nombre: 'Florence', apellido: 'Scovel Shinn', especialidad: 'Palabra Hablada', categoria: 'Manifestación', emoji: '✨', frase: 'El juego de la vida se juega con palabras', color: '#EC4899' },
    { id: 'behrend', nombre: 'Genevieve', apellido: 'Behrend', especialidad: 'Visualización Creativa', categoria: 'Manifestación', emoji: '🌟', frase: 'Tu visualización atrae tu realidad', color: '#8B5CF6' },
    { id: 'wattles', nombre: 'Wallace', apellido: 'Wattles', especialidad: 'Ciencia de Hacerse Rico', categoria: 'Prosperidad', emoji: '💎', frase: 'Existe una Ciencia para hacerse rico', color: '#10B981' },
    { id: 'hill', nombre: 'Napoleon', apellido: 'Hill', especialidad: 'Piense y Hágase Rico', categoria: 'Prosperidad', emoji: '🏆', frase: 'Lo que la mente puede concebir, puede lograr', color: '#F59E0B' },
    { id: 'collier', nombre: 'Robert', apellido: 'Collier', especialidad: 'Secreto de las Edades', categoria: 'Prosperidad', emoji: '📊', frase: 'Visualiza, cree, recibe', color: '#06B6D4' },
    { id: 'haanel', nombre: 'Charles', apellido: 'Haanel', especialidad: 'Master Key System', categoria: 'Prosperidad', emoji: '🔑', frase: 'La llave maestra del universo', color: '#EAB308' },
    { id: 'holmes', nombre: 'Ernest', apellido: 'Holmes', especialidad: 'Ciencia de la Mente', categoria: 'New Thought', emoji: '🧠', frase: 'Cambia tu pensamiento, cambia tu vida', color: '#6366F1' },
    { id: 'troward', nombre: 'Thomas', apellido: 'Troward', especialidad: 'Filosofía Mental', categoria: 'New Thought', emoji: '🎓', frase: 'El pensamiento es la única causa', color: '#8B5CF6' },
    { id: 'fox', nombre: 'Emmet', apellido: 'Fox', especialidad: 'Poder del Pensamiento', categoria: 'New Thought', emoji: '🦊', frase: 'No hay problemas, solo oportunidades', color: '#F97316' },
    { id: 'bloodworth', nombre: 'Venice', apellido: 'Bloodworth', especialidad: 'Clave Mental', categoria: 'New Thought', emoji: '💫', frase: 'La llave eres tú mismo', color: '#A855F7' },
    { id: 'allen', nombre: 'James', apellido: 'Allen', especialidad: 'Como Hombre Piensa', categoria: 'Filosofía', emoji: '📖', frase: 'Como piensas, así eres', color: '#475569' },
    { id: 'trine', nombre: 'Ralph Waldo', apellido: 'Trine', especialidad: 'Armonía con el Infinito', categoria: 'Filosofía', emoji: '☮️', frase: 'En sintonía con el Infinito', color: '#14B8A6' },
    { id: 'marden', nombre: 'Orison Swett', apellido: 'Marden', especialidad: 'Empuje & Éxito', categoria: 'Filosofía', emoji: '🎯', frase: 'El éxito es tu destino natural', color: '#DC2626' },
    { id: 'larson', nombre: 'Christian', apellido: 'Larson', especialidad: 'Ideal Hecho Real', categoria: 'Filosofía', emoji: '🌈', frase: 'Tu ideal puede ser real', color: '#7C3AED' },
    { id: 'atkinson', nombre: 'William W.', apellido: 'Atkinson', especialidad: 'Ley de Atracción', categoria: 'Poder Mental', emoji: '🧲', frase: 'Los pensamientos son cosas', color: '#DC2626' },
    { id: 'brown', nombre: 'Henry H.', apellido: 'Brown', especialidad: 'New Thought Práctico', categoria: 'Poder Mental', emoji: '⚡', frase: 'El poder está en el ahora', color: '#F59E0B' },
    { id: 'hamblin', nombre: 'Henry T.', apellido: 'Hamblin', especialidad: 'Poder Interno', categoria: 'Poder Mental', emoji: '💪', frase: 'Tu poder interno es ilimitado', color: '#059669' },
    { id: 'andersen', nombre: 'U.S.', apellido: 'Andersen', especialidad: 'Tres Palabras Mágicas', categoria: 'Poder Mental', emoji: '🪄', frase: 'The Magic In Your Mind', color: '#8B5CF6' },
    { id: 'hicks', nombre: 'Abraham', apellido: 'Hicks', especialidad: 'Ley de Atracción Moderna', categoria: 'Canalización', emoji: '🔮', frase: 'Reach for a better feeling thought', color: '#EC4899' },
    { id: 'delmar', nombre: 'Eugene', apellido: 'Del Mar', especialidad: 'Telepatía Mental', categoria: 'Canalización', emoji: '👁️', frase: 'La mente no conoce distancias', color: '#6366F1' },
    { id: 'lanyon', nombre: 'Walter', apellido: 'Lanyon', especialidad: 'Consciousness', categoria: 'Canalización', emoji: '🌀', frase: 'La consciencia es todo', color: '#06B6D4' },
    { id: 'mulford', nombre: 'Prentice', apellido: 'Mulford', especialidad: 'Fuerzas del Pensamiento', categoria: 'Canalización', emoji: '🌊', frase: 'Pensamientos son fuerzas reales', color: '#0EA5E9' },
    { id: 'buchanan', nombre: 'Uriel', apellido: 'Buchanan', especialidad: 'Sanación Metafísica', categoria: 'Canalización', emoji: '🕊️', frase: 'La sanación viene de dentro', color: '#10B981' },
];

export default function MaestroSelectorCarousel({ onSelect }: { onSelect: (maestroId: string) => void }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [particles, setParticles] = useState<Particle[]>([]);

    const currentMaestro = maestros[currentIndex];

    useEffect(() => {
        const newParticles: Particle[] = [];
        for (let i = 0; i < 50; i++) {
            newParticles.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 4 + 2,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.3,
            });
        }
        setParticles(newParticles);
    }, [currentIndex]);

    useEffect(() => {
        const interval = setInterval(() => {
            setParticles(prev =>
                prev.map(p => ({
                    ...p,
                    x: (p.x + p.speedX + 100) % 100,
                    y: (p.y + p.speedY + 100) % 100,
                }))
            );
        }, 50);
        return () => clearInterval(interval);
    }, []);

    const next = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev + 1) % maestros.length);
        setTimeout(() => setIsAnimating(false), 300);
    };

    const prev = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev - 1 + maestros.length) % maestros.length);
        setTimeout(() => setIsAnimating(false), 300);
    };

    const goTo = (index: number) => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex(index);
        setTimeout(() => setIsAnimating(false), 300);
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative overflow-hidden">

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {particles.map(particle => (
                    <div
                        key={particle.id}
                        className="absolute rounded-full transition-all duration-1000 ease-linear"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            backgroundColor: currentMaestro.color,
                            opacity: particle.opacity,
                            filter: 'blur(1px)',
                            boxShadow: `0 0 ${particle.size * 2}px ${currentMaestro.color}`,
                        }}
                    />
                ))}
            </div>

            <div
                className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl transition-all duration-1000"
                style={{
                    background: `radial-gradient(circle, ${currentMaestro.color}80 0%, transparent 70%)`
                }}
            />
            <div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl transition-all duration-1000"
                style={{
                    background: `radial-gradient(circle, ${currentMaestro.color}80 0%, transparent 70%)`
                }}
            />

            <div className="max-w-6xl w-full relative z-10">

                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Sparkles className="text-[#7A5BA6] animate-pulse" size={32} />
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-[#7A5BA6] to-[#8B5CF6] bg-clip-text text-transparent">
                            Los Maestros
                        </h1>
                        <Sparkles className="text-[#8B5CF6] animate-pulse" size={32} />
                    </div>
                    <p className="text-gray-400 text-lg">25 sabios, infinita sabiduría</p>
                </div>

                <div className="relative">

                    <button
                        onClick={prev}
                        disabled={isAnimating}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all disabled:opacity-50 z-20 backdrop-blur-sm border border-white/20"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        onClick={next}
                        disabled={isAnimating}
                        className="absolute right-0 top-1/2 translate-x-16 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all disabled:opacity-50 z-20 backdrop-blur-sm border border-white/20"
                    >
                        <ChevronRight size={24} />
                    </button>

                    <div
                        className={`relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 transition-all duration-300 ${isAnimating ? 'scale-95 opacity-70' : 'scale-100 opacity-100'
                            }`}
                        style={{
                            boxShadow: `0 0 80px ${currentMaestro.color}40, inset 0 0 80px ${currentMaestro.color}10`
                        }}
                    >

                        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                            {[...Array(20)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute w-1 h-1 rounded-full animate-float-slow"
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        top: `${Math.random() * 100}%`,
                                        backgroundColor: currentMaestro.color,
                                        opacity: Math.random() * 0.6 + 0.2,
                                        animationDelay: `${Math.random() * 3}s`,
                                        animationDuration: `${Math.random() * 3 + 2}s`,
                                        filter: `blur(${Math.random() * 2}px)`,
                                    }}
                                />
                            ))}
                        </div>

                        <div className="relative z-10">

                            <div className="text-center mb-8">
                                <div
                                    className="text-9xl mb-4 animate-float inline-block"
                                    style={{
                                        filter: `drop-shadow(0 0 30px ${currentMaestro.color}80)`,
                                    }}
                                >
                                    {currentMaestro.emoji}
                                </div>
                            </div>

                            <div className="text-center mb-6">
                                <div className="text-2xl text-gray-400 mb-2">
                                    {currentMaestro.nombre}
                                </div>
                                <h2
                                    className="text-6xl font-bold mb-4 animate-glow"
                                    style={{
                                        color: currentMaestro.color,
                                        textShadow: `0 0 40px ${currentMaestro.color}80`
                                    }}
                                >
                                    {currentMaestro.apellido}
                                </h2>
                                <div className="text-xl text-gray-300">
                                    {currentMaestro.especialidad}
                                </div>
                            </div>

                            <div className="text-center mb-8">
                                <div className="text-2xl italic text-gray-400 max-w-2xl mx-auto">
                                    "{currentMaestro.frase}"
                                </div>
                            </div>

                            <div className="flex justify-center mb-8">
                                <div
                                    className="px-6 py-2 rounded-full text-sm font-semibold backdrop-blur-sm"
                                    style={{
                                        backgroundColor: `${currentMaestro.color}20`,
                                        color: currentMaestro.color,
                                        border: `1px solid ${currentMaestro.color}60`,
                                        boxShadow: `0 0 20px ${currentMaestro.color}30`
                                    }}
                                >
                                    {currentMaestro.categoria}
                                </div>
                            </div>

                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={() => onSelect(currentMaestro.id)}
                                    className="px-12 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 relative overflow-hidden group"
                                    style={{
                                        backgroundColor: currentMaestro.color,
                                        color: 'white',
                                        boxShadow: `0 0 30px ${currentMaestro.color}60`
                                    }}
                                >
                                    <span className="relative z-10">
                                        Hablar con {currentMaestro.nombre}
                                    </span>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-2 mt-8 flex-wrap max-w-4xl mx-auto">
                    {maestros.map((maestro, index) => (
                        <button
                            key={maestro.id}
                            onClick={() => goTo(index)}
                            className={`transition-all ${index === currentIndex
                                    ? 'w-12 h-3'
                                    : 'w-3 h-3 hover:w-6'
                                } rounded-full`}
                            style={{
                                backgroundColor: index === currentIndex
                                    ? currentMaestro.color
                                    : 'rgba(255,255,255,0.2)',
                                boxShadow: index === currentIndex
                                    ? `0 0 10px ${currentMaestro.color}`
                                    : 'none'
                            }}
                            title={maestro.nombre + ' ' + maestro.apellido}
                        />
                    ))}
                </div>

                <div className="text-center mt-6 text-gray-500">
                    {currentIndex + 1} / {maestros.length}
                </div>

            </div>

            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-slow {
          0%, 100% { 
            transform: translate(0, 0); 
            opacity: 0.2;
          }
          50% { 
            transform: translate(10px, -20px); 
            opacity: 0.8;
          }
        }
        @keyframes glow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.2); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 5s ease-in-out infinite; }
        .animate-glow { animation: glow 3s ease-in-out infinite; }
      `}</style>
        </div>
    );
}
