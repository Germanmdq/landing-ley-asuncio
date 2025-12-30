'use client';

import { useState } from 'react';
import { BookOpen, Sparkles, X, Quote, Lightbulb } from 'lucide-react';

// Tipos de datos
interface CitaBiblica {
    referencia: string;
    texto: string;
    interpretacion: string;
    conferencia: string;
    año: number;
}

interface TestimonioTecnica {
    categoria: string;
    problema: string;
    tecnica: string;
    proceso: string;
    tiempo: string;
    resultado: string;
    leccion: string;
    conferencia: string;
    año: number;
}

// Datos
const citasBiblicas: CitaBiblica[] = [
    {
        referencia: "Job 33:14-15",
        texto: "En un sueño y en una visión nocturna, cuando un sueño profundo cae sobre los hombres, mientras dormitan en sus lechos; entonces él abre los oídos de los hombres y sella su instrucción.",
        interpretacion: "Dios no es alguien ajeno, sino tu propia capacidad de soñar la que recibe instrucciones directas desde lo más profundo de tu ser.",
        conferencia: "Todos los sueños provienen de Dios",
        año: 1969
    },
    {
        referencia: "Génesis 40:8",
        texto: "Solo Dios puede interpretar el sueño. Díganmelo, se lo ruego.",
        interpretacion: "José representa a una persona que ya se dio cuenta de su identidad divina, capaz de descifrar los símbolos de la mente.",
        conferencia: "Todos los sueños provienen de Dios",
        año: 1969
    },
    {
        referencia: "Lucas 2:12",
        texto: "Porque esto os servirá de señal: encontraréis a un bebé envuelto en pañales, acostado en el suelo.",
        interpretacion: "El nacimiento de un bebé es una señal de que Dios acaba de despertar dentro de una persona.",
        conferencia: "Todos los sueños provienen de Dios",
        año: 1969
    },
    {
        referencia: "Salmo 44:23",
        texto: "¡Despierta! ¿Por qué duermes, oh Señor? ¡Despierta!",
        interpretacion: "Un llamado al Dios que está profundamente dormido en cada ser humano esperando despertar.",
        conferencia: "Todos los sueños provienen de Dios",
        año: 1969
    },
    {
        referencia: "1 Corintios 13:13",
        texto: "Fe, esperanza y amor, estos tres; pero el mayor de ellos es el amor.",
        interpretacion: "El amor es la esencia misma de la divinidad que te abraza cuando te integrás con tu verdadero ser.",
        conferencia: "Todos los sueños provienen de Dios",
        año: 1969
    },
    {
        referencia: "Salmo 82:6",
        texto: "Yo digo que ustedes son dioses, hijos del Altísimo, todos ustedes.",
        interpretacion: "Todos somos fragmentos de una sola divinidad que decidió experimentar la limitación humana.",
        conferencia: "Todos los sueños provienen de Dios",
        año: 1969
    },
    {
        referencia: "Juan 19:11",
        texto: "No tienes poder sobre mí, si no te fuera dado de arriba.",
        interpretacion: "Nada de lo que pasa en el mundo exterior tiene poder real por sí mismo. Todo viene desde tu nivel de conciencia.",
        conferencia: "Todos los sueños provienen de Dios",
        año: 1969
    },
    {
        referencia: "Hebreos 11:1",
        texto: "La fe es la seguridad de las cosas que se esperan, la convicción de las cosas que no se ven.",
        interpretacion: "La fe es lealtad a la realidad invisible, no le da realidad a lo que no se ve.",
        conferencia: "Creación = Fe",
        año: 1968
    },
    {
        referencia: "Romanos 4:17",
        texto: "Dios llama a las cosas que no son como si fueran.",
        interpretacion: "No crea algo de la nada, reorganiza lo que ya existe hasta que implique lo que quieres.",
        conferencia: "Creación = Fe",
        año: 1968
    },
    {
        referencia: "Colosenses 1:27",
        texto: "El misterio escondido desde los siglos, Cristo en vosotros, es la esperanza de gloria.",
        interpretacion: "Cristo es tu poder interno, no una figura externa. Cualquier enseñanza de un Cristo externo es falsa.",
        conferencia: "Creación = Fe",
        año: 1968
    }
];

const testimoniosTecnicas: TestimonioTecnica[] = [
    {
        categoria: "Revelación Espiritual",
        problema: "Incapacidad de la mente racional para comprender que el movimiento físico es una ilusión mental.",
        tecnica: "Registro escrito de visiones y espera de revelación interna",
        proceso: "Neville anotó un mensaje recibido en 1954 que decía que no nos movemos realmente al estar despiertos, sino que todo es movimiento mental.",
        tiempo: "5 años",
        resultado: "En 1959 experimentó el despertar dentro de su propio cráneo, comprendiendo que la vida es un sueño profundo.",
        leccion: "La razón suele rechazar la verdad, pero la revelación viene de una profundidad que la lógica no puede alcanzar.",
        conferencia: "Todos los sueños provienen de Dios",
        año: 1969
    },
    {
        categoria: "Despertar de la Conciencia",
        problema: "Vivir atrapado en el sueño de la vida, experimentando violencia y limitaciones.",
        tecnica: "Resurrección interna y nacimiento desde arriba",
        proceso: "Experimentó una vibración intensa y un viento fuerte centrado en su cabeza que lo llevó a despertar conscientemente dentro de su propio cráneo.",
        tiempo: "Un eón de sueño",
        resultado: "Salió de su cráneo como ser espiritual, encontró el simbolismo del niño en pañales y se dio cuenta que él es el Señor Jesucristo despertando.",
        leccion: "El cráneo humano es el verdadero sepulcro donde la divinidad está enterrada soñando que es una persona común.",
        conferencia: "Todos los sueños provienen de Dios",
        año: 1969
    },
    {
        categoria: "Unión Mística",
        problema: "Necesidad de validar la verdad del mensaje espiritual y la conexión con la fuente divina.",
        tecnica: "Aceptación implícita y total de la palabra del mensajero",
        proceso: "Varias personas aceptaron al 100% la historia del nacimiento de Dios en el hombre contada por Neville.",
        tiempo: "No especificado",
        resultado: "Tuvieron experiencias de unión mística extática en sus sueños, actos creativos simbólicos de gran intensidad.",
        leccion: "Aceptar la verdad espiritual permite que se manifieste y estalle dentro de la persona.",
        conferencia: "Todos los sueños provienen de Dios",
        año: 1969
    },
    {
        categoria: "Manifestación / Cambio de Realidad",
        problema: "Deseo de transformar las circunstancias actuales en el mundo físico.",
        tecnica: "Persuasión mental y asunción del deseo cumplido",
        proceso: "Una persona visualiza a su círculo íntimo viéndola como quien desea ser, escuchando sus voces de aprobación hasta convencerse.",
        tiempo: "Un intervalo de gestación",
        resultado: "Al mantener la sensación de que el deseo ya se cumplió, esa 'fecundación' mental se manifestó en el mundo físico.",
        leccion: "Si sabés que sos el soñador, podés cambiar el sueño simplemente asumiendo una nueva identidad.",
        conferencia: "Todos los sueños provienen de Dios",
        año: 1969
    },
    {
        categoria: "Manifestación Familiar",
        problema: "Deseo de sentir el orgullo de padres fallecidos por logros actuales.",
        tecnica: "Reorganización mental y asunción de la realidad invisible",
        proceso: "Neville recordó a su madre (fallecida en 1941) y su padre (fallecido en 1959), visualizándolos hablando con orgullo sobre sus logros actuales, escuchando sus voces de alegría.",
        tiempo: "Un intervalo de gestación",
        resultado: "Al permanecer fiel a esa escena invisible, la sensación se externalizó y manifestó en su realidad emocional.",
        leccion: "Todo lo que puedes concebir existe en la estructura del universo. Tus seres queridos fallecidos son plenamente conscientes de tus logros.",
        conferencia: "Creación = Fe",
        año: 1968
    },
    {
        categoria: "Perdón y Liberación",
        problema: "Dolor causado por otra persona que necesita ser sanado.",
        tecnica: "Reorganización mental y perdón imaginativo",
        proceso: "Reorganizar la estructura mental para liberar a quien causó dolor imaginando que nunca sucedió, usando la ley del perdón.",
        tiempo: "Variable según la persistencia",
        resultado: "Liberación completa del dolor y del perpetrador, permitiendo un nuevo comienzo limpio.",
        leccion: "Cuando conoces esta ley puedes perdonar a cualquiera reorganizando tu mente. No importa lo que se haya hecho.",
        conferencia: "Creación = Fe",
        año: 1968
    },
    {
        categoria: "Poder sobre la Realidad",
        problema: "Sentirse impotente ante las circunstancias del mundo.",
        tecnica: "Asunción de identidad divina y cambio de intenciones",
        proceso: "Reconocer el poder de detener el mundo mentalmente, verlo muerto, liberarlo y cambiar sus intenciones para que haga lo contrario.",
        tiempo: "Inmediato al despertar completo",
        resultado: "Capacidad de manejar un poder tan grande que puede detener el mundo y reanimar con nuevas intenciones.",
        leccion: "Ese es el poder que será tuyo cuando sepas que eres uno con el cuerpo del amor, llamado el Salvador Eterno.",
        conferencia: "Creación = Fe",
        año: 1968
    },
    {
        categoria: "Técnica del Vórtice Mental",
        problema: "Necesidad de viajar a un nuevo estado de conciencia sin moverse físicamente.",
        tecnica: "El Vórtice de Movimiento Mental",
        proceso: "Quedarse quieto, reconocer que el cuerpo no necesita moverse, generar un torbellino mental intenso, mantener el centro en quietud perfecta, aumentar intensidad hasta que la nueva escena se sienta real.",
        tiempo: "Instantáneo cuando se domina",
        resultado: "Cambio de realidad o viaje a nuevo estado de conciencia sin movimiento físico.",
        leccion: "No te mueves al estar despierto, como tampoco te mueves en tu cama al dormir. Todo es movimiento mental.",
        conferencia: "Todos los sueños provienen de Dios",
        año: 1969
    },
    {
        categoria: "Técnica del Círculo Íntimo",
        problema: "Transformar identidad o situación actual a través de la percepción de los demás.",
        tecnica: "La Técnica del Círculo Íntimo",
        proceso: "Traer a la mente personas cercanas, visualizarlas frente a ti, permitir que te vean como quien quieres ser, escuchar sus voces felicitándote, observar sus rostros reflejando tu nueva realidad, sentir convicción de que ellos ya perciben ese hecho.",
        tiempo: "Tiempo de gestación variable",
        resultado: "Al romper el hechizo una vez convencido, la nueva identidad se manifiesta en el mundo físico.",
        leccion: "Usar personas conocidas añade realismo a la escena. El foco está en cómo ellos te ven a vos.",
        conferencia: "Todos los sueños provienen de Dios",
        año: 1969
    },
    {
        categoria: "Asunción del Deseo Cumplido",
        problema: "Reprogramar el 'sueño de la vida' desde el estado de vigilia.",
        tecnica: "Asunción del Deseo Cumplido en el Sueño",
        proceso: "Antes de dormir, identificar claramente el deseo (dinero, salud, relaciones), asumir la sensación de que ya es realidad, mantener esa sensación mientras te quedas dormido, ver la realidad actual como fluida, aceptar que el mundo es un sueño que puedes cambiar.",
        tiempo: "Intervalo de gestación después de la noche",
        resultado: "El deseo se fecunda en el mundo de los sueños y se manifiesta en el mundo físico del César.",
        leccion: "El mundo es un sueño profundo y vos sos el soñador. La sensación es la clave para fecundar el mundo de los sueños.",
        conferencia: "Todos los sueños provienen de Dios",
        año: 1969
    },
    {
        categoria: "Fe como Lealtad",
        problema: "Confusión sobre qué es la fe verdadera.",
        tecnica: "Lealtad a la realidad invisible",
        proceso: "Permanecer fiel a una construcción mental invisible día tras día, sin que importe lo que digan los sentidos, hasta que se exteriorice como hecho compartible.",
        tiempo: "Requiere persistencia diaria",
        resultado: "Descubrimiento del gran secreto de la creación: la fe no da realidad, es lealtad a lo que ya existe invisiblemente.",
        leccion: "La fe no da realidad a lo que no se ve. La fe es lealtad a la realidad invisible.",
        conferencia: "Creación = Fe",
        año: 1968
    },
    {
        categoria: "Envidia vs Empatía",
        problema: "Elegir las reacciones correctas para manifestar buena suerte.",
        tecnica: "Selección consciente de testigos mentales",
        proceso: "Si tus amigos se enteraran de tu buena suerte, elegir conscientemente a quienes sentirían empatía (alegría por ti) o envidia (deseo de tener lo mismo). Usar esa imagen específica.",
        tiempo: "Inmediato en visualización",
        resultado: "La reacción elegida (empatía o envidia) ancla la manifestación con mayor fuerza emocional.",
        leccion: "No elijas a nadie que pueda simpatizar contigo, porque no quieres simpatía. Querés empatía o envidia.",
        conferencia: "Creación = Fe",
        año: 1968
    },
    {
        categoria: "Reorganización de Estados",
        problema: "Ver el mundo como demasiado real o rígido para ser cambiado.",
        tecnica: "Reorganización de estados invisibles",
        proceso: "Reorganizar estados invisibles adecuadamente para que exterioricen lo que implican. Escuchar atentamente pensamientos invisibles y sus implicaciones. Nombrar el deseo y reorganizar la mente para implicar que ya lo tienes.",
        tiempo: "Depende de la persistencia en la nueva estructura",
        resultado: "Los estados invisibles se exteriorizan porque la potencia de cada acto imaginal está en su implicación.",
        leccion: "Todas las cosas existen en la eternidad independientemente de tu acto creativo. Puedes acceder a ellas reorganizando tu mente.",
        conferencia: "Creación = Fe",
        año: 1968
    },
    {
        categoria: "Instrucción de Abdullah",
        problema: "Necesidad de guía espiritual profunda.",
        tecnica: "Estudio intensivo con maestro espiritual",
        proceso: "Neville estudió con Abdullah desde 1931 hasta 1936, recibiendo enseñanzas sobre la identidad divina y el poder de la imaginación.",
        tiempo: "5 años de estudio (1931-1936)",
        resultado: "Fundamento completo de sus enseñanzas posteriores sobre la imaginación como Dios y la Biblia como psicología.",
        leccion: "La instrucción profunda con un maestro que conoce la verdad puede transformar completamente tu comprensión espiritual.",
        conferencia: "Referenciado en artículos",
        año: 1957
    }
];

export default function SabiduriaPage() {
    const [activeTab, setActiveTab] = useState<'citas' | 'testimonios'>('citas');
    const [selectedCita, setSelectedCita] = useState<CitaBiblica | null>(null);
    const [selectedTestimonio, setSelectedTestimonio] = useState<TestimonioTecnica | null>(null);

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <Lightbulb className="w-8 h-8 text-primary" />
                Sabiduría y Revelaciones
            </h1>
            <p className="text-text-muted mb-8">
                Explora las interpretaciones bíblicas y técnicas prácticas de Neville Goddard.
            </p>

            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b border-white/10">
                <button
                    onClick={() => setActiveTab('citas')}
                    className={`pb-4 px-4 font-medium transition-colors relative ${activeTab === 'citas' ? 'text-primary' : 'text-gray-400 hover:text-white'
                        }`}
                >
                    <div className="flex items-center gap-2">
                        <Quote size={18} />
                        Citas Bíblicas
                    </div>
                    {activeTab === 'citas' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('testimonios')}
                    className={`pb-4 px-4 font-medium transition-colors relative ${activeTab === 'testimonios' ? 'text-primary' : 'text-gray-400 hover:text-white'
                        }`}
                >
                    <div className="flex items-center gap-2">
                        <Sparkles size={18} />
                        Testimonios y Técnicas
                    </div>
                    {activeTab === 'testimonios' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
                    )}
                </button>
            </div>

            {/* Content */}
            {activeTab === 'citas' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {citasBiblicas.map((cita, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedCita(cita)}
                            className="bg-white/5 border border-white/10 rounded-xl p-6 cursor-pointer hover:bg-white/10 hover:border-primary/30 transition-all group"
                        >
                            <div className="text-primary text-sm font-bold mb-3 uppercase tracking-wider">
                                {cita.referencia}
                            </div>
                            <p className="text-lg font-serif italic mb-4 text-gray-200 group-hover:text-white transition-colors">
                                "{cita.texto}"
                            </p>
                            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                                <div className="text-xs text-text-muted">
                                    <span>{cita.conferencia}</span>
                                    <span className="ml-2">({cita.año})</span>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // TODO: Implement Strong's Concordance logic
                                        alert("Funcionalidad de Concordancia Strong próximamente");
                                    }}
                                    className="text-xs bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-lg transition-colors font-medium"
                                >
                                    Ver Concordancia Strong
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimoniosTecnicas.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedTestimonio(item)}
                            className="bg-white/5 border border-white/10 rounded-xl p-6 cursor-pointer hover:bg-white/10 hover:border-primary/30 transition-all group"
                        >
                            <div className="inline-block px-2 py-1 rounded bg-primary/10 text-primary text-xs font-bold mb-3">
                                {item.categoria}
                            </div>
                            <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                                {item.tecnica}
                            </h3>
                            <p className="text-sm text-text-muted line-clamp-3 mb-4">
                                {item.problema}
                            </p>
                            <div className="text-xs text-text-muted mt-auto pt-4 border-t border-white/5 flex justify-between">
                                <span>{item.conferencia}</span>
                                <span>{item.año}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal Citas */}
            {selectedCita && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedCita(null)}
                >
                    <div
                        className="bg-[#1a1a1a] border border-white/10 rounded-2xl max-w-2xl w-full p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto"
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedCita(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <X size={24} />
                        </button>

                        <div className="mb-6">
                            <span className="text-primary font-bold text-lg tracking-wide">
                                {selectedCita.referencia}
                            </span>
                        </div>

                        <blockquote className="text-2xl font-serif italic text-white mb-8 pl-4 border-l-4 border-primary/50">
                            "{selectedCita.texto}"
                        </blockquote>

                        <div className="bg-white/5 rounded-xl p-6 mb-6">
                            <h4 className="text-sm font-bold text-gray-400 uppercase mb-2">Interpretación de Neville</h4>
                            <p className="text-lg text-gray-200 leading-relaxed">
                                {selectedCita.interpretacion}
                            </p>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-text-muted">
                            <BookOpen size={16} />
                            <span>Fuente: {selectedCita.conferencia} ({selectedCita.año})</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Testimonios */}
            {selectedTestimonio && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedTestimonio(null)}
                >
                    <div
                        className="bg-[#1a1a1a] border border-white/10 rounded-2xl max-w-2xl w-full p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto"
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedTestimonio(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex flex-wrap gap-2 mb-6">
                            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-bold">
                                {selectedTestimonio.categoria}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-white/10 text-gray-300 text-sm">
                                {selectedTestimonio.año}
                            </span>
                        </div>

                        <h2 className="text-2xl font-bold mb-6 text-white">
                            {selectedTestimonio.tecnica}
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <h4 className="text-sm font-bold text-red-400 uppercase mb-2">El Problema</h4>
                                <p className="text-gray-300">{selectedTestimonio.problema}</p>
                            </div>

                            <div className="bg-white/5 rounded-xl p-5 border border-white/5">
                                <h4 className="text-sm font-bold text-primary uppercase mb-2">El Proceso / Técnica</h4>
                                <p className="text-gray-200 leading-relaxed">{selectedTestimonio.proceso}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-sm font-bold text-green-400 uppercase mb-2">Resultado</h4>
                                    <p className="text-gray-300">{selectedTestimonio.resultado}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-yellow-400 uppercase mb-2">Tiempo</h4>
                                    <p className="text-gray-300">{selectedTestimonio.tiempo}</p>
                                </div>
                            </div>

                            <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
                                <h4 className="text-sm font-bold text-primary uppercase mb-2">Lección Espiritual</h4>
                                <p className="text-gray-200 italic">"{selectedTestimonio.leccion}"</p>
                            </div>

                            <div className="text-xs text-text-muted pt-4 border-t border-white/5">
                                Fuente: {selectedTestimonio.conferencia}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
