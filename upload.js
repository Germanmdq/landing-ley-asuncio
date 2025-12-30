require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
)

async function main() {
    // El usuario tiene los datos en su carpeta HOME
    const basePath = path.join(process.env.HOME, 'data', 'conferencia_001')

    console.log(`🔍 Buscando datos en: ${basePath}`)

    if (!fs.existsSync(basePath)) {
        console.error(`❌ Error: El directorio ${basePath} no existe.`)
        return
    }

    // Leer archivos
    try {
        const metadata = JSON.parse(fs.readFileSync(path.join(basePath, 'metadata.json'), 'utf-8'))
        const textoCompleto = JSON.parse(fs.readFileSync(path.join(basePath, 'texto_completo.json'), 'utf-8'))
        const citasFile = JSON.parse(fs.readFileSync(path.join(basePath, 'citas_biblicas.json'), 'utf-8'))
        const tecnicasFile = JSON.parse(fs.readFileSync(path.join(basePath, 'tecnicas.json'), 'utf-8'))
        const testimoniosFile = JSON.parse(fs.readFileSync(path.join(basePath, 'testimonios.json'), 'utf-8'))
        const conceptosFile = JSON.parse(fs.readFileSync(path.join(basePath, 'conceptos.json'), 'utf-8'))
        const metaforasFile = JSON.parse(fs.readFileSync(path.join(basePath, 'metaforas.json'), 'utf-8'))

        // Mapeos flexibles (combinando los del usuario y los robustos)
        const citas = citasFile.referencias_biblicas || citasFile.citas_biblicas || citasFile.referencias || []
        const tecnicas = tecnicasFile.tecnicas_practicas || tecnicasFile.tecnicas || []
        const testimonios = testimoniosFile.testimonios || []
        const conceptos = conceptosFile.conceptos_espirituales || conceptosFile.conceptos_clave || conceptosFile.conceptos || []
        const metaforas = metaforasFile.metaforas || []

        console.log('\n📊 DATOS LEÍDOS:')
        console.log(`Citas: ${citas.length}`)
        console.log(`Técnicas: ${tecnicas.length}`)
        console.log(`Testimonios: ${testimonios.length}`)
        console.log(`Conceptos: ${conceptos.length}`)
        console.log(`Metáforas: ${metaforas.length}\n`)

        // 1. Insertar conferencia
        const { error: confError } = await supabase.from('conferencias').upsert({
            conferencia_id: metadata.lecture_id,
            titulo_es: metadata.titulo_es || metadata.title_es,
            year: parseInt(metadata.year) || 0,
            duration: metadata.duracion || metadata.duration,
            difficulty: 'intermediate',
            main_themes: metadata.temas_principales || metadata.main_themes,
            full_text: textoCompleto.full_text || textoCompleto.texto_completo || '',
            word_count: textoCompleto.word_count || 0,
            estimated_reading_time: String(textoCompleto.estimated_reading_time || '0')
        }, { onConflict: 'conferencia_id' })

        if (confError) {
            console.error('❌ Error conferencia:', confError.message)
            return
        }
        console.log('✅ Conferencia guardada (upsert)')

        // 2. Citas
        if (citas.length > 0) {
            const citasData = citas.map(c => {
                const ref = c.referencia || c.reference
                const match = ref?.match(/^(\w+)\s+(\d+):(\d+)/)
                return {
                    reference: ref,
                    libro: match ? match[1] : (ref?.split(' ')[0] || ''),
                    capitulo: match ? parseInt(match[2]) : 0,
                    versiculo: match ? parseInt(match[3]) : 0,
                    texto_biblico: c.texto || c.text || '',
                    interpretacion_neville: c.interpretacion_neville || c.neville_interpretation || '',
                    tecnica_relacionada: c.tecnica_relacionada || c.related_technique || '',
                    aplicacion_practica: c.aplicacion_practica || c.practical_application || '',
                    contexto: c.contexto || c.context || '',
                    conferencia_id: metadata.lecture_id,
                    temas: [],
                    palabras_clave: []
                }
            })

            const { error: citasError } = await supabase.from('citas_biblicas').upsert(citasData, { onConflict: 'reference,conferencia_id' })
            if (citasError) console.error('❌ Citas:', citasError.message)
            else console.log(`✅ ${citasData.length} citas guardadas`)
        }

        // 3. Técnicas
        if (tecnicas.length > 0) {
            const tecnicasData = tecnicas.map(t => {
                const dif = (t.dificultad || '').toLowerCase()
                let dificultad = 'intermediate'

                if (dif === 'alta' || dif === 'high' || dif === 'advanced' || dif === 'avanzado') dificultad = 'advanced'
                else if (dif === 'baja' || dif === 'low' || dif === 'beginner' || dif === 'fundamental') dificultad = 'foundational'
                else if (dif === 'media' || dif === 'medium' || dif === 'intermediate' || dif === 'intermedio') dificultad = 'intermediate'

                return {
                    technique_id: t.id_tecnica || t.technique_id,
                    nombre_es: t.nombre || t.name_es,
                    nombre_en: t.nombre || t.name_es,
                    cuando_usar: t.cuando_usar || t.when_to_use,
                    dificultad: dificultad,
                    pasos: t.pasos || [],
                    puntos_clave: t.puntos_clave || [],
                    errores_comunes: t.errores_comunes || [],
                    cita_neville: t.cita_neville || t.neville_quote || '',
                    conferencia_id: metadata.lecture_id
                }
            })

            const { error } = await supabase.from('tecnicas').upsert(tecnicasData, { onConflict: 'technique_id' })
            if (error) console.error('❌ Técnicas:', error.message)
            else console.log(`✅ ${tecnicasData.length} técnicas guardadas`)
        }

        // 4. Testimonios
        if (testimonios.length > 0) {
            const testimoniosData = testimonios.map(t => ({
                testimony_id: t.testimony_id || `${metadata.lecture_id}_test_${t.id_testimonio}`,
                categoria: t.categoria || t.category || '',
                problema: t.problema || t.problem || '',
                tecnica_usada: t.tecnica_usada || t.technique_used || '',
                que_hicieron: t.que_hicieron || t.what_they_did || '',
                timeline: t.tiempo_resultado || t.timeline || '',
                resultado: t.resultado || t.outcome || '',
                leccion_clave: t.leccion_clave || t.key_lesson || '',
                comentario_neville: t.comentario_neville || t.neville_commentary || '',
                conferencia_id: metadata.lecture_id,
                tipo_manifestacion: null,
                dificultad: null,
                tiempo_manifestacion: t.tiempo_resultado || t.timeline || ''
            }))

            const { error } = await supabase.from('testimonios').upsert(testimoniosData, { onConflict: 'testimony_id' })
            if (error) console.error('❌ Testimonios:', error.message)
            else console.log(`✅ ${testimoniosData.length} testimonios guardados`)
        }

        // 5. Conceptos
        if (conceptos.length > 0) {
            const conceptosData = conceptos.map((c, i) => ({
                concepto_id: `${metadata.lecture_id}_concept_${i}`,
                nombre: c.concepto || c.nombre || c.concept || '',
                definicion: c.explicación || c.explicacion || c.definition || '',
                explicacion_detallada: c.explicación || c.explicacion || c.explanation || '',
                ejemplos: c.ejemplos || [],
                conferencia_id: metadata.lecture_id
            }))

            const { error } = await supabase.from('conceptos').upsert(conceptosData, { onConflict: 'concepto_id' })
            if (error) console.error('❌ Conceptos:', error.message)
            else console.log(`✅ ${conceptosData.length} conceptos guardados`)
        }

        // 6. Metáforas
        if (metaforas.length > 0) {
            const metaforasData = metaforas.map((m, i) => ({
                metafora_id: `${metadata.lecture_id}_meta_${i}`,
                termino: m.metafora || m.metaphor || m.termino || '',
                significado: m.lenguaje_sencillo || m.plain_language || m.significado || '',
                uso_en_contexto: m.explicacion || m.explanation || m.uso_en_contexto || '',
                conferencia_id: metadata.lecture_id
            }))

            const { error } = await supabase.from('metaforas').upsert(metaforasData, { onConflict: 'metafora_id' })
            if (error) console.error('❌ Metáforas:', error.message)
            else console.log(`✅ ${metaforasData.length} metáforas guardadas`)
        }

        console.log('\n🎉 COMPLETADO CON ÉXITO\n')

    } catch (err) {
        console.error('🔥 Error al procesar los archivos:', err.message)
    }
}

main()
