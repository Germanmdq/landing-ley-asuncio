import { useState } from 'react';
import { Search, Sparkles, Book, X } from 'lucide-react';

interface Maestro {
    id: string;
    nombre: string;
    apellido: string;
    especialidad: string;
    categoria: string;
    emoji: string;
    frase: string;
    color: string;
    libros: string[];
}

const maestros: Maestro[] = [
    {
        id: 'neville',
        nombre: 'Neville',
        apellido: 'Goddard',
        especialidad: 'Ley de la Asunción',
        categoria: 'Manifestación',
        emoji: '🎩',
        frase: 'La imaginación es Dios en acción',
        color: '#7A5BA6',
        libros: [
            'A Tu Mando',
            'Tu Fe Es Tu Fortuna',
            'Libertad Para Todos',
            'El Sentimiento Es El Secreto',
            'La Oración: El Arte de Creer',
            'Fuera de Este Mundo',
            'La Búsqueda',
            'Imaginación Despierta',
            'Tiempo de Siembra y Cosecha',
            'La Ley y La Promesa'
        ]
    },
    {
        id: 'hicks',
        nombre: 'Abraham',
        apellido: 'Hicks',
        especialidad: 'Ley de Atracción Moderna',
        categoria: 'Canalización',
        emoji: '🔮',
        frase: 'Busca un pensamiento que se sienta mejor',
        color: '#EC4899',
        libros: [
            'Pide y Se Te Dará',
            'La Ley de la Atracción',
            'El Asombroso Poder de la Intención Deliberada',
            'El Asombroso Poder de las Emociones',
            'Dinero y la Ley de la Atracción',
            'El Vórtice',
            'Entrando en el Vórtice',
            'Sara (Libros 1, 2 y 3)',
            'La Colección Esencial de la Ley de la Atracción',
            'Co-creando en Su Mejor Momento',
            'Manifiesta Tus Deseos',
            'La Ley de la Atracción en Acción',
            'Relaciones y la Ley de la Atracción'
        ]
    },
    {
        id: 'haanel',
        nombre: 'Charles',
        apellido: 'Haanel',
        especialidad: 'La Llave Maestra',
        categoria: 'Prosperidad',
        emoji: '🔑',
        frase: 'La llave maestra del universo',
        color: '#EAB308',
        libros: [
            'El Sistema de la Llave Maestra',
            'Química Mental',
            'La Nueva Psicología'
        ]
    },
    {
        id: 'larson',
        nombre: 'Christian',
        apellido: 'Larson',
        especialidad: 'Ideal Hecho Real',
        categoria: 'Filosofía',
        emoji: '🌈',
        frase: 'Tu ideal puede ser real',
        color: '#7C3AED',
        libros: [
            'El Ideal Hecho Real',
            'Tus Fuerzas y Cómo Usarlas',
            'El Sendero de las Rosas',
            'El Secreto Oculto',
            'Dominio de Uno Mismo',
            'Cómo Mantenerse Joven',
            'Lo Grande Interior',
            'Dominio del Destino',
            'Equilibrio y Poder',
            'El Todo Perfecto'
        ]
    },
    {
        id: 'fox',
        nombre: 'Emmet',
        apellido: 'Fox',
        especialidad: 'Poder del Pensamiento',
        categoria: 'Nuevo Pensamiento',
        emoji: '🦊',
        frase: 'No hay problemas, solo oportunidades',
        color: '#F97316',
        libros: [
            'El Sermón del Monte',
            'Poder a Través del Pensamiento Constructivo',
            'Encuentra y Usa Tu Poder Interior',
            'Altera Tu Vida',
            'Haz Que Tu Vida Valga la Pena',
            'Los Diez Mandamientos',
            'Reclama Tu Derecho',
            'Alrededor del Año con Emmet Fox',
            'Diagramas Para Vivir',
            'La Llave Dorada',
            'La Vida Es Conciencia',
            'Chispas de Verdad'
        ]
    },
    {
        id: 'holmes',
        nombre: 'Ernest',
        apellido: 'Holmes',
        especialidad: 'Ciencia de la Mente',
        categoria: 'Nuevo Pensamiento',
        emoji: '🧠',
        frase: 'Cambia tu pensamiento, cambia tu vida',
        color: '#6366F1',
        libros: [
            'La Ciencia de la Mente',
            'Mente Creativa',
            'Mente Creativa y Éxito',
            'Esto Llamado Tú',
            'El Arte de la Vida',
            'Amor y Ley',
            'Preguntas y Respuestas sobre la Ciencia de la Mente',
            'El Poder Oculto de la Biblia',
            'Lo Que Enseña la Ciencia Religiosa',
            'Viviendo la Ciencia de la Mente'
        ]
    },
    {
        id: 'delmar',
        nombre: 'Eugene',
        apellido: 'Del Mar',
        especialidad: 'Telepatía Mental',
        categoria: 'Canalización',
        emoji: '👁️',
        frase: 'La mente no conoce distancias',
        color: '#6366F1',
        libros: [
            'La Llave de las Escrituras',
            'Atracción Espiritual y Material',
            'La Ciencia de Vivir Exitosamente'
        ]
    },
    {
        id: 'shinn',
        nombre: 'Florence',
        apellido: 'Scovel Shinn',
        especialidad: 'Palabra Hablada',
        categoria: 'Manifestación',
        emoji: '✨',
        frase: 'El juego de la vida se juega con palabras',
        color: '#EC4899',
        libros: [
            'El Juego de la Vida y Cómo Jugarlo',
            'Tu Palabra Es Tu Varita Mágica',
            'La Puerta Secreta al Éxito',
            'El Poder de la Palabra Hablada'
        ]
    },
    {
        id: 'behrend',
        nombre: 'Genevieve',
        apellido: 'Behrend',
        especialidad: 'Visualización Creativa',
        categoria: 'Manifestación',
        emoji: '🌟',
        frase: 'Tu visualización atrae tu realidad',
        color: '#8B5CF6',
        libros: [
            'Tu Poder Invisible',
            'Alcanzando el Deseo de Tu Corazón'
        ]
    },
    {
        id: 'brown',
        nombre: 'Henry H.',
        apellido: 'Brown',
        especialidad: 'Nuevo Pensamiento Práctico',
        categoria: 'Poder Mental',
        emoji: '⚡',
        frase: 'El poder está en el ahora',
        color: '#F59E0B',
        libros: [
            'No Hipnotismo Sino Sugestión',
            'Concentración: El Camino al Éxito',
            'Cómo Controlar el Destino a Través de la Sugestión',
            'Auto-Sanación a Través de la Sugestión',
            'El Éxito y Cómo Lo Ganó',
            '¡Los Dólares Me Quieren!',
            'El Mayor Descubrimiento del Hombre',
            'La Nueva Emancipación',
            'El Diario de Grant Wallace',
            'El Aliento de Vida'
        ]
    },
    {
        id: 'hamblin',
        nombre: 'Henry T.',
        apellido: 'Hamblin',
        especialidad: 'Poder Interno',
        categoria: 'Poder Mental',
        emoji: '💪',
        frase: 'Tu poder interno es ilimitado',
        color: '#059669',
        libros: [
            'Dentro de Ti Está el Poder',
            'El Poder del Pensamiento',
            'Pensamiento Dinámico',
            'El Mensaje de una Flor',
            'El Camino del Triunfador',
            'Tesoros Escondidos',
            'Vida Sin Tensión',
            'La Vida Más Grande',
            'Por los Pensamientos Vivimos',
            'Todas las Cosas Son Posibles'
        ]
    },
    {
        id: 'allen',
        nombre: 'James',
        apellido: 'Allen',
        especialidad: 'Como Hombre Piensa',
        categoria: 'Filosofía',
        emoji: '📖',
        frase: 'Como piensas, así eres',
        color: '#475569',
        libros: [
            'Como el Hombre Piensa',
            'De la Pobreza al Poder',
            'Todas Estas Cosas Añadidas',
            'Caminos de Bendición',
            'El Camino de la Paz',
            'El Dominio del Destino',
            'Por Encima de las Turbulencias de la Vida',
            'De la Pasión a la Paz',
            'Ocho Pilares de la Prosperidad',
            'El Hombre: Rey de la Mente, Cuerpo y Circunstancias'
        ]
    },
    {
        id: 'murphy',
        nombre: 'Joseph',
        apellido: 'Murphy',
        especialidad: 'Poder del Subconsciente',
        categoria: 'Manifestación',
        emoji: '📚',
        frase: 'Tu subconsciente es tu servidor fiel',
        color: '#3B82F6',
        libros: [
            'El Poder de Tu Mente Subconsciente',
            'El Milagro de la Dinámica Mental',
            'Tu Poder Infinito Para Ser Rico',
            'Poder Milagroso Para Riquezas Infinitas',
            'Telepsíquica',
            'Las Asombrosas Leyes del Poder Mental Cósmico',
            'Secretos del I-Ching',
            'El Poder Cósmico Dentro de Ti',
            'Poder Infinito Para Una Vida Más Rica',
            'El Energizador Cósmico'
        ]
    },
    {
        id: 'broome',
        nombre: 'Margaret',
        apellido: 'Ruth Broome',
        especialidad: 'La Llave Perfecta',
        categoria: 'Nuevo Pensamiento',
        emoji: '🗝️',
        frase: 'La llave es tu propia consciencia',
        color: '#F472B6',
        libros: [
            'La Llave Perfecta'
        ]
    },
    {
        id: 'hill',
        nombre: 'Napoleon',
        apellido: 'Hill',
        especialidad: 'Piense y Hágase Rico',
        categoria: 'Prosperidad',
        emoji: '🏆',
        frase: 'Lo que la mente puede concebir, puede lograr',
        color: '#F59E0B',
        libros: [
            'Piense y Hágase Rico',
            'La Ley del Éxito',
            'Más Astuto Que el Diablo',
            'El Éxito a Través de una Actitud Mental Positiva',
            'Crezca Rico Con Paz Mental',
            'La Llave Maestra de las Riquezas',
            'Tú Puedes Obrar Tus Propios Milagros',
            'Cómo Vender Tu Camino a Través de la Vida',
            'Cree y Logra',
            'La Sabiduría de Andrew Carnegie'
        ]
    },
    {
        id: 'marden',
        nombre: 'Orison Swett',
        apellido: 'Marden',
        especialidad: 'Empuje & Éxito',
        categoria: 'Filosofía',
        emoji: '🎯',
        frase: 'El éxito es tu destino natural',
        color: '#DC2626',
        libros: [
            'Empujando Hacia el Frente',
            'Arquitectos del Destino',
            'Ascendiendo en el Mundo',
            'Una Voluntad de Hierro',
            'El Secreto del Logro',
            'La Alegría Como Poder de Vida',
            'Cada Hombre un Rey',
            'Él Puede Quien Piensa Que Puede',
            'Cómo Conseguir Lo Que Quieres',
            'El Milagro del Pensamiento Correcto'
        ]
    },
    {
        id: 'mulford',
        nombre: 'Prentice',
        apellido: 'Mulford',
        especialidad: 'Fuerzas del Pensamiento',
        categoria: 'Canalización',
        emoji: '🌊',
        frase: 'Pensamientos son fuerzas reales',
        color: '#0EA5E9',
        libros: [
            'Tus Fuerzas y Cómo Usarlas (Volumen I)',
            'Tus Fuerzas y Cómo Usarlas (Volumen II)',
            'Tus Fuerzas y Cómo Usarlas (Volumen III)',
            'Tus Fuerzas y Cómo Usarlas (Volumen IV)',
            'Tus Fuerzas y Cómo Usarlas (Volumen V)',
            'Tus Fuerzas y Cómo Usarlas (Volumen VI)'
        ]
    },
    {
        id: 'trine',
        nombre: 'Ralph Waldo',
        apellido: 'Trine',
        especialidad: 'Armonía con el Infinito',
        categoria: 'Filosofía',
        emoji: '☮️',
        frase: 'En sintonía con el Infinito',
        color: '#14B8A6',
        libros: [
            'En Sintonía con el Infinito',
            'La Cosa Más Grande Jamás Conocida',
            'Construcción del Carácter: Poder del Pensamiento',
            'Toda Criatura Viviente',
            'Lo Que Todo el Mundo Está Buscando',
            'La Nueva Alineación de la Vida',
            'Los Poderes Superiores de la Mente y el Espíritu',
            'El Hombre Que Sabía',
            'En el Camino Abierto',
            'Esta Vida Mística Nuestra'
        ]
    },
    {
        id: 'collier',
        nombre: 'Robert',
        apellido: 'Collier',
        especialidad: 'Secreto de las Edades',
        categoria: 'Prosperidad',
        emoji: '📊',
        frase: 'Visualiza, cree, recibe',
        color: '#06B6D4',
        libros: [
            'El Secreto de las Edades',
            'Riquezas a Tu Alcance',
            'El Imán de la Vida',
            'El Dios en Ti',
            'El Secreto del Poder',
            '¡Sé Rico!',
            'La Oración Funciona',
            'El Libro de Cartas de Robert Collier'
        ]
    },
    {
        id: 'troward',
        nombre: 'Thomas',
        apellido: 'Troward',
        especialidad: 'Filosofía Mental',
        categoria: 'Nuevo Pensamiento',
        emoji: '🎓',
        frase: 'El pensamiento es la única causa',
        color: '#8B5CF6',
        libros: [
            'Las Conferencias de Edimburgo sobre Ciencia Mental',
            'Las Conferencias Dore sobre Ciencia Mental',
            'El Proceso Creativo en el Individuo',
            'Misterio y Significado de la Biblia',
            'La Ley y La Palabra',
            'El Poder Oculto'
        ]
    },
    {
        id: 'andersen',
        nombre: 'U.S.',
        apellido: 'Andersen',
        especialidad: 'Tres Palabras Mágicas',
        categoria: 'Poder Mental',
        emoji: '🪄',
        frase: 'La magia en tu mente',
        color: '#8B5CF6',
        libros: [
            'Tres Palabras Mágicas',
            'La Magia en Tu Mente',
            'El Mayor Poder en el Universo',
            'Cibernética del Éxito',
            'El Secreto de los Secretos',
            'La Magia de la Auto-Dirección'
        ]
    },
    {
        id: 'buchanan',
        nombre: 'Uriel',
        apellido: 'Buchanan',
        especialidad: 'Sanación Metafísica',
        categoria: 'Canalización',
        emoji: '🕊️',
        frase: 'La sanación viene de dentro',
        color: '#10B981',
        libros: [
            'Dominio Mental',
            'El Arte de Ser',
            'Dominio Mental',
            'Fuerzas del Éxito',
            'El Poder Interior',
            'Dinámica del Pensamiento',
            'La Llave Mental'
        ]
    },
    {
        id: 'bloodworth',
        nombre: 'Venice',
        apellido: 'Bloodworth',
        especialidad: 'Clave Mental',
        categoria: 'Nuevo Pensamiento',
        emoji: '💫',
        frase: 'La llave eres tú mismo',
        color: '#A855F7',
        libros: [
            'La Llave Para Ti Mismo'
        ]
    },
    {
        id: 'wattles',
        nombre: 'Wallace',
        apellido: 'Wattles',
        especialidad: 'Ciencia de Hacerse Rico',
        categoria: 'Prosperidad',
        emoji: '💎',
        frase: 'Existe una Ciencia para hacerse rico',
        color: '#10B981',
        libros: [
            'La Ciencia de Hacerse Rico',
            'La Ciencia de Estar Bien',
            'La Ciencia de Ser Grande'
        ]
    },
    {
        id: 'lanyon',
        nombre: 'Walter',
        apellido: 'Lanyon',
        especialidad: 'Consciencia',
        categoria: 'Canalización',
        emoji: '🌀',
        frase: 'La consciencia es todo',
        color: '#06B6D4',
        libros: [
            'La Casa de Dios',
            'La Risa de Dios',
            'El Código de Jerusalén',
            'Yo Soy Imaginación',
            'El Trueno del Silencio',
            'Los Ojos del Ciego',
            'He Aquí Sus Manos',
            'El Eterno Ahora',
            'La Ciudad No Hecha con Manos',
            'El Mensaje de Jesús'
        ]
    },
    {
        id: 'atkinson',
        nombre: 'William W.',
        apellido: 'Atkinson',
        especialidad: 'Ley de Atracción',
        categoria: 'Poder Mental',
        emoji: '🧲',
        frase: 'Los pensamientos son cosas',
        color: '#DC2626',
        libros: [
            'Vibración del Pensamiento',
            'La Ley del Nuevo Pensamiento',
            'El Poder de la Concentración',
            'Influencia Mental Práctica',
            'Tu Mente y Cómo Usarla',
            'Memoria: Cómo Desarrollarla, Entrenarla y Usarla',
            'Poder Mental: El Secreto de la Magia Mental',
            'Hatha Yoga',
            'Raja Yoga',
            'La Ciencia de la Respiración',
            'Catorce Lecciones en Filosofía Yogi',
            'El Kybalion',
            'La Mente Maestra',
            'El Poder del Magnetismo Personal'
        ]
    }
];

export default function MaestroSelectorCards({ onSelect }: { onSelect: (maestroId: string) => void }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [selectedBookMaestro, setSelectedBookMaestro] = useState<Maestro | null>(null);

    const filteredMaestros = maestros.filter(m =>
        m.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.especialidad.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-12 relative">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Sparkles className="text-[#7A5BA6] animate-pulse" size={32} />
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#7A5BA6] to-[#8B5CF6] bg-clip-text text-transparent">
                            Selecciona tu Guía
                        </h1>
                        <Sparkles className="text-[#8B5CF6] animate-pulse" size={32} />
                    </div>
                    <p className="text-gray-400 text-lg mb-8">Explora la sabiduría de 25 maestros espirituales</p>

                    {/* Search Bar */}
                    <div className="relative max-w-md mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                        <input
                            type="text"
                            placeholder="Buscar maestro, especialidad..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 text-white placeholder-gray-500 focus:outline-none focus:border-[#7A5BA6] focus:bg-white/10 transition-all"
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredMaestros.map((maestro) => (
                        <div
                            key={maestro.id}
                            onClick={() => onSelect(maestro.id)}
                            onMouseEnter={() => setHoveredId(maestro.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:border-white/20"
                            style={{
                                boxShadow: hoveredId === maestro.id ? `0 0 30px ${maestro.color} 20` : 'none'
                            }}
                        >
                            {/* Background Gradient on Hover */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                                style={{
                                    background: `radial - gradient(circle at center, ${maestro.color}, transparent 70 %)`
                                }}
                            />

                            <div className="relative z-10 flex flex-col items-center text-center h-full">
                                <div
                                    className="text-6xl mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                                    style={{ filter: `drop - shadow(0 0 10px ${maestro.color}40)` }}
                                >
                                    {maestro.emoji}
                                </div>

                                <h3 className="text-xl font-bold mb-1 group-hover:text-white transition-colors">
                                    {maestro.nombre} {maestro.apellido}
                                </h3>

                                <div
                                    className="text-xs font-medium px-3 py-1 rounded-full mb-3"
                                    style={{
                                        backgroundColor: `${maestro.color} 20`,
                                        color: maestro.color,
                                        border: `1px solid ${maestro.color} 40`
                                    }}
                                >
                                    {maestro.especialidad}
                                </div>

                                <p className="text-sm text-gray-400 italic mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    "{maestro.frase}"
                                </p>

                                {/* View Books Button */}
                                <button
                                    onClick={() => {
                                        // Allow click to propagate to parent to select maestro
                                        // But if we want a specific action for books, we can handle it here
                                        // For now, let's make the button also select the maestro
                                        onSelect(maestro.id);
                                    }}
                                    className="mt-auto px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-all opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 flex items-center gap-2"
                                >
                                    <Book size={14} />
                                    Chatear
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredMaestros.length === 0 && (
                    <div className="text-center text-gray-500 mt-12">
                        No se encontraron maestros con ese nombre.
                    </div>
                )}

            </div>

            {/* Books Modal */}
            {selectedBookMaestro && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedBookMaestro(null)}>
                    <div
                        className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 max-w-lg w-full relative max-h-[80vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                        style={{ boxShadow: `0 0 50px ${selectedBookMaestro.color} 20` }}
                    >
                        <button
                            onClick={() => setSelectedBookMaestro(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="text-center mb-6">
                            <div className="text-6xl mb-4">{selectedBookMaestro.emoji}</div>
                            <h2 className="text-2xl font-bold text-white mb-1">
                                {selectedBookMaestro.nombre} {selectedBookMaestro.apellido}
                            </h2>
                            <p className="text-sm text-gray-400">Biblioteca Completa</p>
                        </div>

                        <div className="space-y-2">
                            {selectedBookMaestro.libros.map((libro, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                                    <Book size={16} className="text-gray-400" />
                                    <span className="text-sm text-gray-200">{libro}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
