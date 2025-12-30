'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

interface Maestro {
    id: string;
    nombre: string;
    apellido: string;
    titulo: string;
    especialidad: string;
    frase: string;
    categoria: string;
    emoji: string;
    gradient: string;
}

const maestros: Maestro[] = [
    {
        id: 'neville',
        nombre: 'Neville',
        apellido: 'Goddard',
        titulo: 'El Maestro de la Imaginación',
        especialidad: 'Ley de la Asunción',
        frase: 'La imaginación es el único Dios.',
        categoria: 'Manifestación',
        emoji: '🎩',
        gradient: 'from-[#7A5BA6] to-[#9D7BB8]'
    },
    {
        id: 'murphy',
        nombre: 'Joseph',
        apellido: 'Murphy',
        titulo: 'El Poder del Subconsciente',
        especialidad: 'Programación Mental',
        frase: 'Tu subconsciente acepta lo que crees.',
        categoria: 'Manifestación',
        emoji: '📚',
        gradient: 'from-blue-600 to-blue-400'
    },
    {
        id: 'shinn',
        nombre: 'Florence',
        apellido: 'Scovel Shinn',
        titulo: 'El Poder de la Palabra',
        especialidad: 'Decretos y Afirmaciones',
        frase: 'El juego de la vida se gana con palabras.',
        categoria: 'Manifestación',
        emoji: '✨',
        gradient: 'from-pink-600 to-pink-400'
    },
    {
        id: 'wattles',
        nombre: 'Wallace',
        apellido: 'Wattles',
        titulo: 'La Ciencia de Hacerse Rico',
        especialidad: 'Prosperidad Científica',
        frase: 'Existe una ciencia exacta para crear riqueza.',
        categoria: 'Prosperidad',
        emoji: '💎',
        gradient: 'from-emerald-600 to-emerald-400'
    },
    {
        id: 'hill',
        nombre: 'Napoleon',
        apellido: 'Hill',
        titulo: 'Piense y Hágase Rico',
        especialidad: 'Éxito y Riqueza',
        frase: 'Lo que la mente concibe, puede lograrlo.',
        categoria: 'Prosperidad',
        emoji: '🏆',
        gradient: 'from-amber-600 to-amber-400'
    },
    {
        id: 'holmes',
        nombre: 'Ernest',
        apellido: 'Holmes',
        titulo: 'La Ciencia de la Mente',
        especialidad: 'Tratamiento Espiritual',
        frase: 'La mente es el único poder creativo.',
        categoria: 'New Thought',
        emoji: '🧠',
        gradient: 'from-indigo-600 to-indigo-400'
    },
    {
        id: 'allen',
        nombre: 'James',
        apellido: 'Allen',
        titulo: 'Como el Hombre Piensa',
        especialidad: 'Filosofía del Pensamiento',
        frase: 'Eres literalmente lo que piensas.',
        categoria: 'Filosofía',
        emoji: '📖',
        gradient: 'from-slate-600 to-slate-400'
    },
    {
        id: 'atkinson',
        nombre: 'William',
        apellido: 'Atkinson',
        titulo: 'La Ley de Atracción',
        especialidad: 'Magnetismo Mental',
        frase: 'Los pensamientos son cosas reales.',
        categoria: 'Poder Mental',
        emoji: '🧲',
        gradient: 'from-red-600 to-red-400'
    },
    {
        id: 'behrend',
        nombre: 'Genevieve',
        apellido: 'Behrend',
        titulo: 'Visualización Creativa',
        especialidad: 'Manifestación Visual',
        frase: 'Tu visualización atrae tu realidad.',
        categoria: 'Manifestación',
        emoji: '🌟',
        gradient: 'from-purple-600 to-purple-400'
    },
    {
        id: 'collier',
        nombre: 'Robert',
        apellido: 'Collier',
        titulo: 'El Secreto de las Edades',
        especialidad: 'Mente Maestra',
        frase: 'Visualiza, cree, recibe.',
        categoria: 'Prosperidad',
        emoji: '📊',
        gradient: 'from-cyan-600 to-cyan-400'
    },
    {
        id: 'haanel',
        nombre: 'Charles',
        apellido: 'Haanel',
        titulo: 'Master Key System',
        especialidad: 'Sistema Maestro',
        frase: 'La llave maestra del universo.',
        categoria: 'Prosperidad',
        emoji: '🔑',
        gradient: 'from-yellow-600 to-yellow-400'
    },
    {
        id: 'troward',
        nombre: 'Thomas',
        apellido: 'Troward',
        titulo: 'Filosofía Mental',
        especialidad: 'Metafísica Práctica',
        frase: 'El pensamiento es la única causa.',
        categoria: 'New Thought',
        emoji: '🎓',
        gradient: 'from-violet-600 to-violet-400'
    },
    {
        id: 'fox',
        nombre: 'Emmet',
        apellido: 'Fox',
        titulo: 'El Poder del Pensamiento',
        especialidad: 'Biblia Metafísica',
        frase: 'No hay problemas, solo oportunidades.',
        categoria: 'New Thought',
        emoji: '🦊',
        gradient: 'from-orange-600 to-orange-400'
    },
    {
        id: 'bloodworth',
        nombre: 'Venice',
        apellido: 'Bloodworth',
        titulo: 'La Clave Mental',
        especialidad: 'Conciencia Interior',
        frase: 'La llave eres tú mismo.',
        categoria: 'New Thought',
        emoji: '💫',
        gradient: 'from-fuchsia-600 to-fuchsia-400'
    },
    {
        id: 'trine',
        nombre: 'Ralph Waldo',
        apellido: 'Trine',
        titulo: 'En Sintonía con el Infinito',
        especialidad: 'Armonía Universal',
        frase: 'Vive en armonía con el Todo.',
        categoria: 'Filosofía',
        emoji: '☮️',
        gradient: 'from-teal-600 to-teal-400'
    },
    {
        id: 'marden',
        nombre: 'Orison Swett',
        apellido: 'Marden',
        titulo: 'Empuje y Éxito',
        especialidad: 'Motivación Práctica',
        frase: 'El éxito es tu destino natural.',
        categoria: 'Filosofía',
        emoji: '🎯',
        gradient: 'from-rose-600 to-rose-400'
    },
    {
        id: 'larson',
        nombre: 'Christian',
        apellido: 'Larson',
        titulo: 'El Ideal Hecho Real',
        especialidad: 'Optimismo Creativo',
        frase: 'Tu ideal puede ser real.',
        categoria: 'Filosofía',
        emoji: '🌈',
        gradient: 'from-purple-600 to-pink-400'
    },
    {
        id: 'brown',
        nombre: 'Henry',
        apellido: 'Brown',
        titulo: 'New Thought Práctico',
        especialidad: 'Poder del Ahora',
        frase: 'El poder está en el presente.',
        categoria: 'Poder Mental',
        emoji: '⚡',
        gradient: 'from-amber-600 to-yellow-400'
    },
    {
        id: 'hamblin',
        nombre: 'Henry',
        apellido: 'Hamblin',
        titulo: 'Poder Interno',
        especialidad: 'Fuerza Mental',
        frase: 'Tu poder interno es ilimitado.',
        categoria: 'Poder Mental',
        emoji: '💪',
        gradient: 'from-green-600 to-emerald-400'
    },
    {
        id: 'andersen',
        nombre: 'U.S.',
        apellido: 'Andersen',
        titulo: 'Tres Palabras Mágicas',
        especialidad: 'Magia Mental',
        frase: 'The magic in your mind.',
        categoria: 'Poder Mental',
        emoji: '🪄',
        gradient: 'from-purple-600 to-blue-400'
    },
    {
        id: 'hicks',
        nombre: 'Abraham',
        apellido: 'Hicks',
        titulo: 'La Ley de Atracción',
        especialidad: 'Vórtice de Manifestación',
        frase: 'Reach for a better feeling thought.',
        categoria: 'Canalización',
        emoji: '🔮',
        gradient: 'from-pink-600 to-purple-400'
    },
    {
        id: 'delmar',
        nombre: 'Eugene',
        apellido: 'Del Mar',
        titulo: 'Telepatía Mental',
        especialidad: 'Comunicación Mental',
        frase: 'La mente no conoce distancias.',
        categoria: 'Canalización',
        emoji: '👁️',
        gradient: 'from-indigo-600 to-blue-400'
    },
    {
        id: 'lanyon',
        nombre: 'Walter',
        apellido: 'Lanyon',
        titulo: 'Consciousness',
        especialidad: 'Conciencia Pura',
        frase: 'La consciencia es todo.',
        categoria: 'Canalización',
        emoji: '🌀',
        gradient: 'from-cyan-600 to-blue-400'
    },
    {
        id: 'mulford',
        nombre: 'Prentice',
        apellido: 'Mulford',
        titulo: 'Fuerzas del Pensamiento',
        especialidad: 'Poder Mental',
        frase: 'Los pensamientos son fuerzas reales.',
        categoria: 'Canalización',
        emoji: '🌊',
        gradient: 'from-blue-600 to-cyan-400'
    },
    {
        id: 'buchanan',
        nombre: 'Uriel',
        apellido: 'Buchanan',
        titulo: 'Sanación Metafísica',
        especialidad: 'Curación Espiritual',
        frase: 'La sanación viene de dentro.',
        categoria: 'Canalización',
        emoji: '🕊️',
        gradient: 'from-green-600 to-teal-400'
    },
];

export default function MaestroSelectorApple({ onSelect }: { onSelect: (maestroId: string) => void }) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollTo = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400;
            const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
            scrollContainerRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-white">

            {/* Hero Section */}
            <section className="relative pt-16 pb-20 px-6 text-center overflow-hidden">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-6xl md:text-8xl font-bold mb-6 text-black">
                        Los Maestros
                    </h1>
                    <p className="text-2xl md:text-3xl text-gray-600 mb-4">
                        25 sabios espirituales.
                    </p>
                    <p className="text-xl text-gray-500">
                        Infinita sabiduría a tu alcance.
                    </p>
                </div>
            </section>

            {/* Featured Maestro - Hero Grande */}
            <section className="relative py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <button
                        onClick={() => onSelect(maestros[0].id)}
                        className="group relative w-full bg-gradient-to-br from-gray-100 to-gray-50 rounded-[40px] overflow-hidden shadow-2xl hover:scale-[1.02] transition-all duration-500"
                    >
                        <div className="relative z-10 p-16 md:p-24">

                            {/* Badge */}
                            <div className="inline-block px-4 py-1 bg-black/10 backdrop-blur-sm rounded-full text-sm font-semibold text-black/70 mb-6">
                                Destacado
                            </div>

                            {/* Emoji Grande */}
                            <div className="text-9xl mb-8 group-hover:scale-110 transition-transform duration-500">
                                {maestros[0].emoji}
                            </div>

                            {/* Título */}
                            <h2 className={`text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r ${maestros[0].gradient} bg-clip-text text-transparent`}>
                                {maestros[0].apellido}
                            </h2>
                            <p className="text-2xl md:text-3xl text-gray-600 mb-6">
                                {maestros[0].titulo}
                            </p>
                            <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-8">
                                {maestros[0].frase}
                            </p>

                            {/* CTA */}
                            <div className="inline-flex items-center gap-2 text-lg font-semibold text-blue-600">
                                Hablar con {maestros[0].nombre}
                                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>

                        {/* Gradient Background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${maestros[0].gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
                    </button>
                </div>
            </section>

            {/* Horizontal Scroll Gallery */}
            <section className="py-20">
                <div className="mb-12 px-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-black text-center mb-4">
                        Explora todos los maestros
                    </h2>
                    <p className="text-xl text-gray-600 text-center">
                        Desliza para descubrir más sabiduría
                    </p>
                </div>

                {/* Scroll Container */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto px-6 pb-8 snap-x snap-mandatory scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {maestros.slice(1).map((maestro, index) => (
                        <button
                            key={maestro.id}
                            onClick={() => onSelect(maestro.id)}
                            className="group flex-shrink-0 w-[340px] snap-start"
                        >
                            <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-[30px] p-8 h-full hover:shadow-2xl transition-all duration-500 hover:scale-105">

                                {/* Emoji */}
                                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-500">
                                    {maestro.emoji}
                                </div>

                                {/* Nombre */}
                                <h3 className="text-sm text-gray-500 mb-1">{maestro.nombre}</h3>
                                <h4 className={`text-3xl font-bold mb-3 bg-gradient-to-r ${maestro.gradient} bg-clip-text text-transparent`}>
                                    {maestro.apellido}
                                </h4>

                                {/* Especialidad */}
                                <p className="text-gray-600 mb-4 font-medium">
                                    {maestro.especialidad}
                                </p>

                                {/* Frase */}
                                <p className="text-sm text-gray-500 mb-6 line-clamp-2">
                                    "{maestro.frase}"
                                </p>

                                {/* CTA */}
                                <div className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600">
                                    Hablar
                                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Scroll Indicators (optional) */}
                <div className="flex justify-center gap-2 mt-8">
                    <button
                        onClick={() => scrollTo('left')}
                        className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-all"
                    >
                        ←
                    </button>
                    <button
                        onClick={() => scrollTo('right')}
                        className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-all"
                    >
                        →
                    </button>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-20 px-6 text-center bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
                        Comienza tu viaje espiritual
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Conecta con la sabiduría ancestral de los grandes maestros
                    </p>
                </div>
            </section>

            <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </div>
    );
}
