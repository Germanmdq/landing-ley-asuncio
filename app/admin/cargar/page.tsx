'use client'

import { useState } from 'react'

export default function CargarPage() {
    const [loading, setLoading] = useState(false)
    const [resultado, setResultado] = useState<any>(null)
    const [files, setFiles] = useState<{ [key: string]: File | null }>({
        metadata: null,
        texto_completo: null,
        conceptos: null,
        tecnicas: null,
        citas_biblicas: null,
        metaforas: null,
        testimonios: null
    })

    const fileTypes = [
        { id: 'metadata', label: '1. Metadata (metadata.json)' },
        { id: 'texto_completo', label: '2. Texto Completo (texto_completo.json)' },
        { id: 'conceptos', label: '3. Conceptos (conceptos.json)' },
        { id: 'tecnicas', label: '4. Técnicas (tecnicas.json)' },
        { id: 'citas_biblicas', label: '5. Citas Bíblicas (citas_biblicas.json)' },
        { id: 'metaforas', label: '6. Metáforas (metaforas.json)' },
        { id: 'testimonios', label: '7. Testimonios (testimonios.json)' }
    ]

    const handleFileChange = (id: string, file: File | null) => {
        setFiles(prev => ({ ...prev, [id]: file }))
    }

    const readFileAsJson = (file: File): Promise<any> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = (e) => {
                try {
                    resolve(JSON.parse(e.target?.result as string))
                } catch (err) {
                    reject(new Error(`Error parseando ${file.name}: JSON inválido`))
                }
            }
            reader.onerror = () => reject(new Error(`Error leyendo ${file.name}`))
            reader.readAsText(file)
        })
    }

    async function cargarConferencia() {
        if (!files.metadata) {
            alert('El archivo de metadata es obligatorio')
            return
        }

        setLoading(true)
        setResultado(null)

        try {
            const payload: any = {}

            for (const type of fileTypes) {
                if (files[type.id]) {
                    payload[type.id] = await readFileAsJson(files[type.id]!)
                } else {
                    payload[type.id] = type.id === 'metadata' ? null : []
                }
            }

            const res = await fetch('/api/cargar-conferencia-001', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })

            const data = await res.json()

            if (!res.ok) {
                setResultado({
                    error: data.error || 'Error en el servidor',
                    detalles: data.errores || []
                })
            } else {
                setResultado(data)
            }
        } catch (error: any) {
            setResultado({ error: error.message })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-black text-white p-10">
            <div className="max-w-3xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
                <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                    Cargador de Biblioteca (Upload)
                </h1>
                <p className="text-zinc-400 mb-8">
                    Subí los 7 archivos JSON generados para sincronizarlos con Supabase.
                </p>

                <div className="grid grid-cols-1 gap-4 mb-8">
                    {fileTypes.map(type => (
                        <div key={type.id} className="bg-black/40 p-4 rounded-xl border border-zinc-800 flex flex-col gap-2">
                            <label className="text-sm font-medium text-zinc-300">{type.label}</label>
                            <input
                                type="file"
                                accept=".json"
                                onChange={(e) => handleFileChange(type.id, e.target.files?.[0] || null)}
                                className="text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer"
                            />
                        </div>
                    ))}
                </div>

                <button
                    onClick={cargarConferencia}
                    disabled={loading || !files.metadata}
                    className={`
            w-full py-4 rounded-xl font-bold text-lg transition-all
            ${loading || !files.metadata
                            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:scale-[0.98] shadow-lg shadow-purple-500/20'
                        }
          `}
                >
                    {loading ? 'PROCESANDO ARCHIVOS...' : 'SUBIR Y SINCRONIZAR'}
                </button>

                {resultado && (
                    <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-xl font-semibold mb-4">Resultado:</h2>
                        {resultado.error ? (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
                                <strong className="block mb-1">Error: {resultado.error}</strong>
                                {resultado.detalles && resultado.detalles.length > 0 && (
                                    <pre className="mt-2 text-xs bg-black/50 p-2 rounded overflow-auto">
                                        {JSON.stringify(resultado.detalles, null, 2)}
                                    </pre>
                                )}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <StatCard label="Conferencia" value={resultado.conferencia?.titulo_es} success={!!resultado.conferencia} />
                                <StatCard label="Citas Bíblicas" value={resultado.citas} success={resultado.citas > 0} />
                                <StatCard label="Técnicas" value={resultado.tecnicas} success={resultado.tecnicas > 0} />
                                <StatCard label="Testimonios" value={resultado.testimonios} success={resultado.testimonios > 0} />
                                <StatCard label="Conceptos" value={resultado.conceptos} success={resultado.conceptos > 0} />
                                <StatCard label="Metáforas" value={resultado.metaforas} success={resultado.metaforas > 0} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

function StatCard({ label, value, success }: { label: string, value: any, success: boolean }) {
    return (
        <div className={`p-4 rounded-xl border ${success ? 'bg-green-500/5 border-green-500/20' : 'bg-zinc-800/50 border-zinc-800'}`}>
            <div className="text-xs text-zinc-500 uppercase mb-1">{label}</div>
            <div className={`text-lg font-bold ${success ? 'text-green-400' : 'text-zinc-400'}`}>
                {typeof value === 'number' ? `+${value}` : value}
            </div>
        </div>
    )
}
