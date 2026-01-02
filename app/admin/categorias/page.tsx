'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

export default function CategoriasAdmin() {
    const [categorias, setCategorias] = useState<any[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingCat, setEditingCat] = useState<any>(null);
    const [formData, setFormData] = useState({ name: '', slug: '', description: '', icon: '📁' });
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        loadCategorias();
    }, []);

    async function loadCategorias() {
        const { data } = await supabase.from('forum_categories').select('*').order('order', { ascending: true });
        if (data) setCategorias(data);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMensaje('');

        try {
            const dataToSave = { ...formData, order: editingCat ? editingCat.order : categorias.length };

            if (editingCat) {
                const { error } = await supabase
                    .from('forum_categories')
                    .update(dataToSave)
                    .eq('id', editingCat.id);
                if (error) throw error;
                setMensaje('✅ Categoría actualizada');
            } else {
                const { error } = await supabase.from('forum_categories').insert(dataToSave);
                if (error) throw error;
                setMensaje('✅ Categoría creada');
            }

            setFormData({ name: '', slug: '', description: '', icon: '📁' });
            setShowForm(false);
            setEditingCat(null);
            loadCategorias();
        } catch (error: any) {
            setMensaje(`❌ Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('¿Eliminar esta categoría? Se eliminarán todos los temas asociados.')) return;
        const { error } = await supabase.from('forum_categories').delete().eq('id', id);
        if (!error) {
            setMensaje('✅ Categoría eliminada');
            loadCategorias();
        }
    }

    async function moveCategory(id: string, direction: 'up' | 'down') {
        const index = categorias.findIndex(c => c.id === id);
        if ((direction === 'up' && index === 0) || (direction === 'down' && index === categorias.length - 1)) return;

        const newCategorias = [...categorias];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        [newCategorias[index], newCategorias[targetIndex]] = [newCategorias[targetIndex], newCategorias[index]];

        // Update order in database
        for (let i = 0; i < newCategorias.length; i++) {
            await supabase.from('forum_categories').update({ order: i }).eq('id', newCategorias[i].id);
        }

        loadCategorias();
    }

    function handleEdit(cat: any) {
        setEditingCat(cat);
        setFormData({ name: cat.name, slug: cat.slug, description: cat.description || '', icon: cat.icon || '📁' });
        setShowForm(true);
    }

    const iconos = ['📁', '🎯', '🧘', '❓', '💭', '💡', '🔥', '⭐', '🎨', '📚', '🌟', '✨'];

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Categorías del Foro</h1>
                    <p className="text-text-muted">Organiza los temas de tu comunidad</p>
                </div>
                <button
                    onClick={() => { setShowForm(!showForm); setEditingCat(null); setFormData({ name: '', slug: '', description: '', icon: '📁' }); }}
                    className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" /> Nueva Categoría
                </button>
            </div>

            {mensaje && (
                <div className={`mb-6 p-4 rounded-lg ${mensaje.includes('✅') ? 'bg-green-500/10 border border-green-500 text-green-200' : 'bg-red-500/10 border border-red-500 text-red-200'}`}>
                    {mensaje}
                </div>
            )}

            {/* Form */}
            {showForm && (
                <div className="bg-surface border border-white/10 rounded-xl p-6 mb-8">
                    <h2 className="text-xl font-bold text-white mb-4">{editingCat ? 'Editar Categoría' : 'Nueva Categoría'}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-white/60 mb-2">Nombre</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white/60 mb-2">Slug (URL)</label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                                placeholder="exitos-manifestaciones"
                                className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white/60 mb-2">Descripción</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white/60 mb-2">Icono</label>
                            <div className="grid grid-cols-6 gap-2 mb-3">
                                {iconos.map((icono) => (
                                    <button
                                        key={icono}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, icon: icono })}
                                        className={`p-3 text-2xl rounded-lg border ${formData.icon === icono ? 'border-primary bg-primary/20' : 'border-white/10 hover:border-white/30'}`}
                                    >
                                        {icono}
                                    </button>
                                ))}
                            </div>
                            <input
                                type="text"
                                value={formData.icon}
                                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                placeholder="O escribe un emoji"
                                className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white"
                            />
                        </div>
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold disabled:opacity-50"
                            >
                                {loading ? 'Guardando...' : (editingCat ? 'Actualizar' : 'Crear')}
                            </button>
                            <button
                                type="button"
                                onClick={() => { setShowForm(false); setEditingCat(null); }}
                                className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg font-semibold"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* List */}
            <div className="bg-surface border border-white/10 rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-white/5">
                        <tr>
                            <th className="text-left px-6 py-4 text-sm font-semibold text-white/60">Orden</th>
                            <th className="text-left px-6 py-4 text-sm font-semibold text-white/60">Categoría</th>
                            <th className="text-left px-6 py-4 text-sm font-semibold text-white/60">Descripción</th>
                            <th className="text-right px-6 py-4 text-sm font-semibold text-white/60">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {categorias.map((cat, index) => (
                            <tr key={cat.id} className="hover:bg-white/5">
                                <td className="px-6 py-4">
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => moveCategory(cat.id, 'up')}
                                            disabled={index === 0}
                                            className="p-1 hover:bg-white/10 rounded disabled:opacity-30"
                                        >
                                            <ArrowUp className="w-4 h-4 text-white/60" />
                                        </button>
                                        <button
                                            onClick={() => moveCategory(cat.id, 'down')}
                                            disabled={index === categorias.length - 1}
                                            className="p-1 hover:bg-white/10 rounded disabled:opacity-30"
                                        >
                                            <ArrowDown className="w-4 h-4 text-white/60" />
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{cat.icon}</span>
                                        <div>
                                            <div className="text-white font-medium">{cat.name}</div>
                                            <div className="text-xs text-text-muted">{cat.slug}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-text-muted text-sm">{cat.description}</td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => handleEdit(cat)}
                                        className="p-2 hover:bg-white/10 rounded-lg text-blue-400 inline-flex items-center gap-2 mr-2"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(cat.id)}
                                        className="p-2 hover:bg-white/10 rounded-lg text-red-400 inline-flex items-center gap-2"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {categorias.length === 0 && (
                    <div className="p-12 text-center text-text-muted">
                        No hay categorías. Crea una nueva.
                    </div>
                )}
            </div>
        </div>
    );
}
