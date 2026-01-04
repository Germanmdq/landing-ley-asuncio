'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function AutoresAdmin() {
    const [autores, setAutores] = useState<any[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingAutor, setEditingAutor] = useState<any>(null);
    const [formData, setFormData] = useState({ nombre: '', slug: '', biografia: '', imagen_url: '' });
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        loadAutores();
    }, []);

    async function loadAutores() {
        const { data } = await supabase.from('autores').select('*').order('created_at', { ascending: false });
        if (data) setAutores(data);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMensaje('');

        try {
            if (editingAutor) {
                const { error } = await supabase
                    .from('autores')
                    .update(formData)
                    .eq('id', editingAutor.id);
                if (error) throw error;
                setMensaje('✅ Autor actualizado');
            } else {
                const { error } = await supabase.from('autores').insert(formData);
                if (error) throw error;
                setMensaje('✅ Autor creado');
            }

            setFormData({ nombre: '', slug: '', biografia: '', imagen_url: '' });
            setShowForm(false);
            setEditingAutor(null);
            loadAutores();
        } catch (error: any) {
            setMensaje(`❌ Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('¿Eliminar este autor?')) return;
        const { error } = await supabase.from('autores').delete().eq('id', id);
        if (!error) {
            setMensaje('✅ Autor eliminado');
            loadAutores();
        }
    }

    function handleEdit(autor: any) {
        setEditingAutor(autor);
        setFormData({ nombre: autor.nombre, slug: autor.slug, biografia: autor.biografia || '', imagen_url: autor.imagen_url || '' });
        setShowForm(true);
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Autores</h1>
                    <p className="text-text-muted">Gestiona los autores de tus artículos</p>
                </div>
                <button
                    onClick={() => { setShowForm(!showForm); setEditingAutor(null); setFormData({ nombre: '', slug: '', biografia: '', imagen_url: '' }); }}
                    className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" /> Nuevo Autor
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
                    <h2 className="text-xl font-bold text-white mb-4">{editingAutor ? 'Editar Autor' : 'Nuevo Autor'}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-white/60 mb-2">Nombre</label>
                            <input
                                type="text"
                                value={formData.nombre}
                                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white/60 mb-2">Slug (URL amigable)</label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                                placeholder="neville-goddard"
                                className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white/60 mb-2">Biografía</label>
                            <textarea
                                value={formData.biografia}
                                onChange={(e) => setFormData({ ...formData, biografia: e.target.value })}
                                rows={4}
                                className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white/60 mb-2">URL Imagen</label>
                            <input
                                type="url"
                                value={formData.imagen_url}
                                onChange={(e) => setFormData({ ...formData, imagen_url: e.target.value })}
                                placeholder="https://..."
                                className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white"
                            />
                        </div>
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold disabled:opacity-50"
                            >
                                {loading ? 'Guardando...' : (editingAutor ? 'Actualizar' : 'Crear')}
                            </button>
                            <button
                                type="button"
                                onClick={() => { setShowForm(false); setEditingAutor(null); }}
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
                            <th className="text-left px-6 py-4 text-sm font-semibold text-white/60">Nombre</th>
                            <th className="text-left px-6 py-4 text-sm font-semibold text-white/60">Slug</th>
                            <th className="text-right px-6 py-4 text-sm font-semibold text-white/60">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {autores.map((autor) => (
                            <tr key={autor.id} className="hover:bg-white/5">
                                <td className="px-6 py-4 text-white">{autor.nombre}</td>
                                <td className="px-6 py-4 text-text-muted">{autor.slug}</td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => handleEdit(autor)}
                                        className="p-2 hover:bg-white/10 rounded-lg text-blue-400 inline-flex items-center gap-2 mr-2"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(autor.id)}
                                        className="p-2 hover:bg-white/10 rounded-lg text-red-400 inline-flex items-center gap-2"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {autores.length === 0 && (
                    <div className="p-12 text-center text-text-muted">
                        No hay autores registrados. Crea uno nuevo.
                    </div>
                )}
            </div>
        </div>
    );
}
