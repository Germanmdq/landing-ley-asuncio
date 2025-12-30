'use client';

import { useState, useEffect } from 'react';
import { Plus, Calendar as CalendarIcon, CheckCircle, Clock, XCircle } from 'lucide-react';

interface ManifestationEntry {
    id: string;
    date: Date;
    desire: string;
    technique: string;
    feelings: string;
    notes: string;
    status: 'in_progress' | 'manifested' | 'cancelled';
}

export default function CuadernoPage() {
    const [entries, setEntries] = useState<ManifestationEntry[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [newEntry, setNewEntry] = useState({
        desire: '',
        technique: '',
        feelings: '',
        notes: ''
    });

    // Cargar entradas del localStorage
    useEffect(() => {
        const saved = localStorage.getItem('manifestation_entries');
        if (saved) {
            const parsed = JSON.parse(saved);
            setEntries(parsed.map((e: any) => ({
                ...e,
                date: new Date(e.date)
            })));
        }
    }, []);

    // Guardar entradas en localStorage
    useEffect(() => {
        if (entries.length > 0) {
            localStorage.setItem('manifestation_entries', JSON.stringify(entries));
        }
    }, [entries]);

    const entriesForDate = entries.filter(e =>
        e.date.toDateString() === selectedDate.toDateString()
    );

    const handleSaveEntry = () => {
        if (!newEntry.desire) return;

        const entry: ManifestationEntry = {
            id: Date.now().toString(),
            date: selectedDate,
            desire: newEntry.desire,
            technique: newEntry.technique,
            feelings: newEntry.feelings,
            notes: newEntry.notes,
            status: 'in_progress'
        };

        setEntries([...entries, entry]);
        setNewEntry({ desire: '', technique: '', feelings: '', notes: '' });
        setShowModal(false);
    };

    const updateEntryStatus = (id: string, status: ManifestationEntry['status']) => {
        setEntries(entries.map(e => e.id === id ? { ...e, status } : e));
    };

    // Calendario
    const daysInMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        0
    ).getDate();

    const firstDayOfMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        1
    ).getDay();

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

    const hasEntryOnDate = (day: number) => {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        return entries.some(e => e.date.toDateString() === date.toDateString());
    };

    const previousMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold mb-2">📓 Cuaderno de Manifestación</h1>
                    <p className="text-text-muted">Registra tus deseos y técnicas diarias</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-primary hover:bg-primary-dark px-4 py-2 rounded-lg transition-colors text-black font-bold shadow-lg shadow-primary/20"
                >
                    <Plus className="w-5 h-5" />
                    Nueva Entrada
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendario */}
                <div className="lg:col-span-2 bg-card p-6 rounded-xl border border-white/5">
                    {/* Header del calendario */}
                    <div className="flex justify-between items-center mb-6">
                        <button
                            onClick={previousMonth}
                            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                        >
                            ←
                        </button>

                        <h2 className="text-xl font-bold">
                            {currentMonth.toLocaleDateString('es-AR', { month: 'long', year: 'numeric' })}
                        </h2>

                        <button
                            onClick={nextMonth}
                            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                        >
                            →
                        </button>
                    </div>

                    {/* Días de la semana */}
                    <div className="grid grid-cols-7 gap-2 mb-2">
                        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                            <div key={day} className="text-center text-sm text-text-muted font-semibold py-2">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Grid del calendario */}
                    <div className="grid grid-cols-7 gap-2">
                        {/* Celdas vacías */}
                        {blanks.map(i => (
                            <div key={`blank-${i}`} className="aspect-square" />
                        ))}

                        {/* Celdas de días */}
                        {days.map(day => {
                            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                            const isSelected = date.toDateString() === selectedDate.toDateString();
                            const isToday = date.toDateString() === new Date().toDateString();
                            const hasEntry = hasEntryOnDate(day);

                            return (
                                <button
                                    key={day}
                                    onClick={() => setSelectedDate(date)}
                                    className={`
                    aspect-square rounded-lg flex items-center justify-center relative transition-all
                    ${isSelected ? 'bg-primary text-white scale-105' : 'hover:bg-white/5'}
                    ${isToday && !isSelected ? 'border-2 border-primary' : 'border border-white/5'}
                  `}
                                >
                                    <span className="font-medium">{day}</span>
                                    {hasEntry && (
                                        <div className="absolute bottom-1 w-1.5 h-1.5 bg-primary rounded-full" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Entradas del día seleccionado */}
                <div className="bg-card p-6 rounded-xl border border-white/5">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5 text-primary" />
                        {selectedDate.toLocaleDateString('es-AR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        })}
                    </h2>

                    {entriesForDate.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-text-muted mb-4">No hay entradas para este día</p>
                            <button
                                onClick={() => setShowModal(true)}
                                className="bg-primary text-black font-bold px-6 py-3 rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                            >
                                Crear primera entrada
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {entriesForDate.map(entry => (
                                <div
                                    key={entry.id}
                                    className="bg-background p-4 rounded-lg border border-white/5"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-semibold text-white">{entry.desire}</h3>
                                        <div className="flex gap-2">
                                            {entry.status === 'manifested' ? (
                                                <CheckCircle className="w-5 h-5 text-green-500" />
                                            ) : entry.status === 'cancelled' ? (
                                                <XCircle className="w-5 h-5 text-red-500" />
                                            ) : (
                                                <Clock className="w-5 h-5 text-yellow-500" />
                                            )}
                                        </div>
                                    </div>

                                    {entry.technique && (
                                        <p className="text-sm text-text-muted mb-2">
                                            <span className="text-primary">Técnica:</span> {entry.technique}
                                        </p>
                                    )}

                                    {entry.feelings && (
                                        <p className="text-sm text-text-muted mb-2">
                                            <span className="text-primary">Sentimientos:</span> {entry.feelings}
                                        </p>
                                    )}

                                    {entry.notes && (
                                        <p className="text-sm text-white/70 mt-2 pt-2 border-t border-white/5">
                                            {entry.notes}
                                        </p>
                                    )}

                                    {/* Botones de estado */}
                                    {entry.status === 'in_progress' && (
                                        <div className="flex gap-2 mt-3">
                                            <button
                                                onClick={() => updateEntryStatus(entry.id, 'manifested')}
                                                className="flex-1 text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded hover:bg-green-500/30"
                                            >
                                                ✓ Manifestado
                                            </button>
                                            <button
                                                onClick={() => updateEntryStatus(entry.id, 'cancelled')}
                                                className="flex-1 text-xs bg-red-500/20 text-red-400 px-3 py-1 rounded hover:bg-red-500/30"
                                            >
                                                ✗ Cancelar
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal para nueva entrada */}
            {showModal && (
                <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[2147483647] p-4 backdrop-blur-md">
                    <div className="bg-[#111111] p-6 rounded-2xl max-w-md w-full border border-white/10 shadow-2xl">
                        <h2 className="text-2xl font-bold mb-4">Nueva Entrada de Manifestación</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">¿Qué deseas manifestar? *</label>
                                <input
                                    type="text"
                                    value={newEntry.desire}
                                    onChange={(e) => setNewEntry({ ...newEntry, desire: e.target.value })}
                                    placeholder="Ej: Conseguir el trabajo ideal"
                                    className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Técnica que usarás</label>
                                <input
                                    type="text"
                                    value={newEntry.technique}
                                    onChange={(e) => setNewEntry({ ...newEntry, technique: e.target.value })}
                                    placeholder="Ej: SATS, Revisión, Asunción"
                                    className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">¿Cómo te sentirías al lograrlo?</label>
                                <input
                                    type="text"
                                    value={newEntry.feelings}
                                    onChange={(e) => setNewEntry({ ...newEntry, feelings: e.target.value })}
                                    placeholder="Ej: Feliz, seguro, pleno"
                                    className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Notas adicionales</label>
                                <textarea
                                    value={newEntry.notes}
                                    onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                                    placeholder="Observaciones, sincronicidades, señales..."
                                    rows={3}
                                    className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 focus:border-primary focus:outline-none resize-none"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSaveEntry}
                                disabled={!newEntry.desire}
                                className="flex-1 bg-primary hover:bg-primary-dark px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold"
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
