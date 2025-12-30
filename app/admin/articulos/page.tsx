
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminArticulos() {
    const [titulo, setTitulo] = useState('');
    const [slug, setSlug] = useState('');
    const [contenido, setContenido] = useState('');
    const [resumen, setResumen] = useState('');
    const [imagen, setImagen] = useState('');
    const [tiempoLectura, setTiempoLectura] = useState(10);
    const [metaDescription, setMetaDescription] = useState('');
    const [keywords, setKeywords] = useState('');
    const [autorId, setAutorId] = useState('');
    const [autores, setAutores] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        async function loadAuthors() {
            const { data } = await supabase
                .from('autores')
                .select('id, nombre, slug')
                .order('nombre');

            if (data) setAutores(data);
        }
        loadAuthors();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMensaje('');

        try {
            if (!autorId) {
                setMensaje('Error: Debes seleccionar un autor');
                setLoading(false);
                return;
            }

            // PROCESAMIENTO INTELIGENTE:
            // 1. Separa por líneas.
            // 2. Detecta **Título** y lo convierte en <h2>.
            // 3. Detecta **texto** y lo convierte en <strong>.
            // 4. Envuelve el resto en <p>.
            const htmlContent = contenido
                .split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 0)
                .map(line => {
                    // Si la línea es EXACTAMENTE **Algo**, es un título H2
                    const headerMatch = line.match(/^\*\*(.+)\*\*$/);
                    if (headerMatch) {
                        return `<h2>${headerMatch[1]}</h2>`;
                    }

                    // Si no, es un párrafo. Procesamos negritas internas.
                    const processedLine = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
                    return `<p>${processedLine}</p>`;
                })
                .join('');

            const { data, error } = await supabase
                .from('articulos')
                .insert({
                    autor_id: autorId,
                    titulo,
                    slug,
                    contenido: htmlContent,
                    resumen,
                    imagen_portada: imagen,
                    tiempo_lectura: tiempoLectura,
                    meta_description: metaDescription,
                    keywords: keywords.split(',').map(k => k.trim()),
                    estado: 'publicado'
                })
                .select()
                .single();

            if (error) throw error;

            setMensaje(`✅ Artículo publicado: /blog/${slug}`);

            // Limpiar form
            setTitulo('');
            setSlug('');
            setContenido('');
            setResumen('');
            setImagen('');
            setKeywords('');
            setAutorId('');

        } catch (error: any) {
            setMensaje(`❌ Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-white">Publicar Artículo</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-2 font-bold text-white">Autor:</label>
                        <select
                            value={autorId}
                            onChange={(e) => setAutorId(e.target.value)}
                            className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-white"
                            required
                        >
                            <option value="">Seleccionar Autor...</option>
                            {autores.map(autor => (
                                <option key={autor.id} value={autor.id}>
                                    {autor.nombre} ({autor.slug})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 font-bold text-white">Título:</label>
                        <input
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-bold text-white">Slug (URL del artículo):</label>
                        <input
                            type="text"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            placeholder="ej: emmet-fox-ingeniero-del-alma"
                            className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-bold text-white">Resumen (2-3 líneas):</label>
                        <textarea
                            value={resumen}
                            onChange={(e) => setResumen(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-bold text-white">Contenido (pegá el texto con formato):</label>
                        <p className="text-sm text-gray-400 mb-2">Pega el texto aquí. Los párrafos separados por una línea vacía se formatearán automáticamente.</p>
                        <textarea
                            value={contenido}
                            onChange={(e) => setContenido(e.target.value)}
                            rows={20}
                            placeholder="Pega aquí el texto de la biografía..."
                            className="w-full px-4 py-3 bg-surface border border-border rounded-lg font-mono text-sm text-white whitespace-pre-wrap"
                            style={{ whiteSpace: 'pre-wrap' }}
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-bold text-white">URL Imagen Cloudinary:</label>
                        <input
                            type="url"
                            value={imagen}
                            onChange={(e) => setImagen(e.target.value)}
                            className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-bold text-white">Tiempo de lectura (min):</label>
                        <input
                            type="number"
                            value={tiempoLectura}
                            onChange={(e) => setTiempoLectura(Number(e.target.value))}
                            className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-bold text-white">Meta Description (máx 155 caracteres):</label>
                        <input
                            type="text"
                            value={metaDescription}
                            onChange={(e) => setMetaDescription(e.target.value)}
                            maxLength={155}
                            className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-bold text-white">Keywords (separadas por coma):</label>
                        <input
                            type="text"
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            placeholder="emmet fox, nuevo pensamiento, la llave de oro"
                            className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-white"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-6 py-4 bg-accent hover:bg-accent/90 rounded-lg font-bold text-lg disabled:opacity-50 text-white"
                    >
                        {loading ? 'Publicando...' : 'Publicar Artículo'}
                    </button>

                    {mensaje && (
                        <div className={`p-4 rounded-lg ${mensaje.includes('✅') ? 'bg-green-500/10 border border-green-500 text-green-200' : 'bg-red-500/10 border border-red-500 text-red-200'}`}>
                            {mensaje}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
