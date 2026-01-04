import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY0NTE5MjgyMCwiZXhwIjoxOTYwNzY4ODIwfQ.M9J8KQF7N5e1A8QE3g9zJ1QH3pU7aU2O1E5xV6yR9pM'
)

function mapearDificultad(dificultad: string): string {
    if (!dificultad) return 'intermediate'
    const map: Record<string, string> = {
        'fundamental': 'foundational',
        'intermedio': 'intermediate',
        'avanzado': 'advanced',
        'baja': 'foundational', // Mapeado a foundational por consistencia con la tabla
        'media': 'intermediate',
        'alta': 'advanced'
    }
    return map[dificultad.toLowerCase()] || 'intermediate'
}

export async function POST(request: NextRequest) {
    console.log('🚀 API /api/cargar-conferencia-001 iniciada (POST)')
    try {
        const body = await request.json()

        const {
            metadata,
            texto_completo: textoCompletoFile,
            conceptos: conceptosFile,
            tecnicas: tecnicasFile,
            citas_biblicas: citasFile,
            metaforas: metaforasFile,
            testimonios: testimoniosFile
        } = body

        if (!metadata) {
            return NextResponse.json({ error: 'Falta el archivo de metadata' }, { status: 400 })
        }

        // Extraer arrays manejando TODAS las variaciones
        const conceptos = conceptosFile?.conceptos_clave || conceptosFile?.conceptos_espirituales || conceptosFile?.conceptos || conceptosFile || []
        const tecnicas = tecnicasFile?.tecnicas_practicas || tecnicasFile?.tecnicas || tecnicasFile || []
        const citasBiblicas = citasFile?.citas_biblicas || citasFile?.referencias_biblicas || citasFile?.referencias || citasFile || []
        const metaforas = metaforasFile?.metaforas || metaforasFile || []
        const testimonios = testimoniosFile?.testimonios || testimoniosFile || []
        const textoCompleto = textoCompletoFile || {}

        const resultados: any = {
            conferencia: null,
            citas: 0,
            tecnicas: 0,
            testimonios: 0,
            conceptos: 0,
            metaforas: 0,
            chunks: 0,
            errores: []
        }

        // 1. Insertar conferencia
        console.log('⏳ Insertando conferencia...')
        const { data: conferencia, error: confError } = await supabase
            .from('conferencias')
            .upsert({
                conferencia_id: metadata.lecture_id,
                titulo_es: metadata.titulo_es || metadata.title_es,
                year: parseInt(metadata.year) || 0,
                duration: metadata.duracion || metadata.duration,
                difficulty: mapearDificultad(metadata.dificultad || metadata.difficulty),
                main_themes: metadata.temas_principales || metadata.main_themes,
                full_text: textoCompleto.full_text || textoCompleto.texto_completo || '',
                word_count: textoCompleto.word_count || textoCompleto.cantidad_palabras || 0,
                estimated_reading_time: textoCompleto.estimated_reading_time || textoCompleto.tiempo_lectura || 0
            }, { onConflict: 'conferencia_id' })
            .select()
            .single()

        if (confError) {
            console.error('❌ Error en Supabase (conferencias):', confError)
            resultados.errores.push({ paso: 'conferencia', error: confError.message, details: confError })
            return NextResponse.json(resultados, { status: 500 })
        }

        resultados.conferencia = conferencia

        // 2. Insertar citas bíblicas
        if (citasBiblicas.length > 0) {
            console.log('⏳ Insertando citas bíblicas...')
            const citasData = citasBiblicas.map((ref: any) => {
                const reference = ref.referencia || ref.reference
                const match = reference?.match(/^(\w+)\s+(\d+):(\d+)/)
                const libro = match ? match[1] : (reference?.split(' ')[0] || '')
                const capitulo = match ? parseInt(match[2]) : 0
                const versiculo = match ? parseInt(match[3]) : 0

                return {
                    reference,
                    libro,
                    capitulo,
                    versiculo,
                    texto_biblico: ref.texto || ref.text,
                    interpretacion_neville: ref.interpretacion_neville || ref.neville_interpretation,
                    tecnica_relacionada: ref.tecnica_relacionada || ref.related_technique,
                    aplicacion_practica: ref.aplicacion_practica || ref.practical_application,
                    contexto: ref.contexto || ref.context,
                    conferencia_id: metadata.lecture_id,
                    temas: [],
                    palabras_clave: []
                }
            })

            const { error: citasError } = await supabase
                .from('citas_biblicas')
                .upsert(citasData, { onConflict: 'reference,conferencia_id' })

            if (citasError) {
                console.error('❌ Error en Supabase (citas_biblicas):', citasError)
                resultados.errores.push({ paso: 'citas_biblicas', error: citasError.message })
            } else {
                resultados.citas = citasData.length
            }
        }

        // 3. Insertar técnicas
        if (tecnicas.length > 0) {
            console.log('⏳ Insertando técnicas...')
            const tecnicasData = tecnicas.map((tech: any) => ({
                technique_id: tech.id_tecnica || tech.technique_id,
                nombre_es: tech.nombre || tech.name_es,
                nombre_en: tech.name || tech.nombre || tech.name_es,
                cuando_usar: tech.cuando_usar || tech.when_to_use,
                dificultad: mapearDificultad(tech.dificultad || tech.difficulty),
                pasos: tech.pasos || tech.steps,
                puntos_clave: tech.puntos_clave || tech.key_points,
                errores_comunes: tech.errores_comunes || tech.common_mistakes,
                cita_neville: tech.cita_neville || tech.neville_quote,
                conferencia_id: metadata.lecture_id
            }))

            const { error: techError } = await supabase
                .from('tecnicas')
                .upsert(tecnicasData, { onConflict: 'technique_id' })

            if (techError) {
                console.error('❌ Error en Supabase (tecnicas):', techError)
                resultados.errores.push({ paso: 'tecnicas', error: techError.message })
            } else {
                resultados.tecnicas = tecnicasData.length
            }
        }

        // 4. Insertar testimonios
        if (testimonios.length > 0) {
            console.log('⏳ Insertando testimonios...')
            const testimoniosData = testimonios.map((test: any) => ({
                testimony_id: test.testimony_id || `${metadata.lecture_id}_test_${test.id_testimonio}`,
                categoria: test.categoria || test.category,
                problema: test.problema || test.problem,
                tecnica_usada: test.tecnica_usada || test.technique_used,
                que_hicieron: test.que_hicieron || test.what_they_did,
                timeline: test.tiempo_resultado || test.timeline,
                resultado: test.resultado || test.outcome,
                leccion_clave: test.leccion_clave || test.key_lesson,
                comentario_neville: test.comentario_neville || test.neville_commentary,
                conferencia_id: metadata.lecture_id,
                tipo_manifestacion: null,
                dificultad: null,
                tiempo_manifestacion: test.tiempo_resultado || test.timeline
            }))

            const { error: testError } = await supabase
                .from('testimonios')
                .upsert(testimoniosData, { onConflict: 'testimony_id' })

            if (testError) {
                console.error('❌ Error en Supabase (testimonios):', testError)
                resultados.errores.push({ paso: 'testimonios', error: testError.message })
            } else {
                resultados.testimonios = testimoniosData.length
            }
        }

        // 5. Insertar conceptos
        if (conceptos.length > 0) {
            console.log('⏳ Insertando conceptos...')
            const conceptosData = conceptos.map((concept: any, idx: number) => ({
                concepto_id: `${metadata.lecture_id}_concept_${idx}`,
                nombre: concept.concepto || concept.concept || concept.nombre,
                definicion: concept.definicion || concept.definition,
                explicacion_detallada: concept.explicacion || concept.explanation || concept.explicacion_detallada,
                ejemplos: concept.ejemplos || concept.examples || [],
                conferencia_id: metadata.lecture_id
            }))

            const { error: conceptError } = await supabase
                .from('conceptos')
                .upsert(conceptosData, { onConflict: 'concepto_id' })

            if (conceptError) {
                console.error('❌ Error en Supabase (conceptos):', conceptError)
                resultados.errores.push({ paso: 'conceptos', error: conceptError.message })
            } else {
                resultados.conceptos = conceptosData.length
            }
        }

        // 6. Insertar metáforas
        if (metaforas.length > 0) {
            console.log('⏳ Insertando metáforas...')
            const metaforasData = metaforas.map((meta: any, idx: number) => ({
                metafora_id: `${metadata.lecture_id}_metaphor_${idx}`,
                termino: meta.metafora || meta.metaphor || meta.termino,
                significado: meta.lenguaje_simple || meta.plain_language || meta.significado,
                uso_en_contexto: meta.explicacion || meta.explanation || meta.uso_en_contexto,
                conferencia_id: metadata.lecture_id
            }))

            const { error: metaError } = await supabase
                .from('metaforas')
                .upsert(metaforasData, { onConflict: 'metafora_id' })

            if (metaError) {
                console.error('❌ Error en Supabase (metaforas):', metaError)
                resultados.errores.push({ paso: 'metaforas', error: metaError.message })
            } else {
                resultados.metaforas = metaforasData.length
            }
        }

        // 7. Generar chunks
        const fullText = textoCompleto.full_text || textoCompleto.texto_completo
        if (fullText) {
            console.log('⏳ Generando y subiendo chunks...')
            const chunks = dividirEnChunks(fullText, 1000)
            const chunksData = chunks.map((chunk, idx) => ({
                chunk_id: `${metadata.lecture_id}_chunk_${idx}`,
                conferencia_id: metadata.lecture_id,
                chunk_index: idx,
                total_chunks: chunks.length,
                contenido: chunk,
                tipo: 'chunk'
            }))

            const { error: chunksError } = await supabase
                .from('chunks')
                .upsert(chunksData, { onConflict: 'chunk_id' })

            if (chunksError) {
                console.error('❌ Error en Supabase (chunks):', chunksError)
                resultados.errores.push({ paso: 'chunks', error: chunksError.message })
            } else {
                resultados.chunks = chunksData.length
            }
        }

        console.log('🏁 Proceso finalizado con éxito')
        return NextResponse.json(resultados)

    } catch (error: any) {
        console.error('🔥 ERROR CRÍTICO EN API:', error)
        return NextResponse.json({
            error: error.message,
            stack: error.stack,
            hint: 'Revisá la terminal para ver el error completo'
        }, { status: 500 })
    }
}

function dividirEnChunks(texto: string, tamano: number): string[] {
    const palabras = texto.split(' ')
    const chunks = []

    for (let i = 0; i < palabras.length; i += tamano - 100) {
        const chunk = palabras.slice(i, i + tamano).join(' ')
        chunks.push(chunk)
    }

    return chunks
}
