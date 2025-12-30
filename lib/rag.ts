import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface ContextItem {
    source: string;
    content: string;
    type: 'concept' | 'technique' | 'testimony' | 'metaphor' | 'biblical';
}

export async function getRelevantContextSupabase(query: string): Promise<string> {
    const STOP_WORDS = ['hola', 'buen', 'buenos', 'buenas', 'dias', 'tardes', 'noches', 'como', 'estas', 'saludos', 'neville'];
    const contextItems: ContextItem[] = [];
    const queryLower = query.toLowerCase();
    const words = queryLower.split(/\s+/).filter(w => w.length > 3 && !STOP_WORDS.includes(w));

    if (words.length === 0) return "";

    // Construimos un filtro de búsqueda simple (OR de palabras clave)
    const searchFilter = words.map(w => `%${w}%`).join(',');

    try {
        // 1. Buscar en Conceptos
        const { data: conceptos } = await supabase
            .from('conceptos')
            .select('*, conferencias(titulo_es, year)')
            .or(words.map(w => `nombre.ilike.%${w}%,definicion.ilike.%${w}%,explicacion_detallada.ilike.%${w}%`).join(','));

        conceptos?.forEach((c: any) => {
            contextItems.push({
                source: `${c.conferencias?.titulo_es} (${c.conferencias?.year})`,
                type: 'concept',
                content: `Concepto: ${c.nombre}. Explicación: ${c.explicacion_detallada}`
            });
        });

        // 2. Buscar en Técnicas
        const { data: tecnicas } = await supabase
            .from('tecnicas')
            .select('*, conferencias(titulo_es, year)')
            .or(words.map(w => `nombre_es.ilike.%${w}%,cuando_usar.ilike.%${w}%`).join(','));

        tecnicas?.forEach((t: any) => {
            contextItems.push({
                source: `${t.conferencias?.titulo_es} (${t.conferencias?.year})`,
                type: 'technique',
                content: `Técnica: ${t.nombre_es}. Pasos: ${t.pasos?.join(', ')}. Puntos clave: ${t.puntos_clave?.join(', ')}`
            });
        });

        // 3. Buscar en Testimonios
        const { data: testimonios } = await supabase
            .from('testimonios')
            .select('*, conferencias(titulo_es, year)')
            .or(words.map(w => `problema.ilike.%${w}%,resultado.ilike.%${w}%,que_hicieron.ilike.%${w}%`).join(','));

        testimonios?.forEach((t: any) => {
            contextItems.push({
                source: `${t.conferencias?.titulo_es} (${t.conferencias?.year})`,
                type: 'testimony',
                content: `Testimonio - Problema: ${t.problema}. Lo que hizo: ${t.que_hicieron}. Resultado: ${t.resultado}`
            });
        });

        // 4. Buscar en Metáforas
        const { data: metaforas } = await supabase
            .from('metaforas')
            .select('*, conferencias(titulo_es, year)')
            .or(words.map(w => `termino.ilike.%${w}%,significado.ilike.%${w}%,uso_en_contexto.ilike.%${w}%`).join(','));

        metaforas?.forEach((m: any) => {
            contextItems.push({
                source: `${m.conferencias?.titulo_es} (${m.conferencias?.year})`,
                type: 'metaphor',
                content: `Metáfora: ${m.termino}. Significado: ${m.significado}. Explicación: ${m.uso_en_contexto}`
            });
        });

        // 5. Buscar en Citas Bíblicas
        const { data: citas } = await supabase
            .from('citas_biblicas')
            .select('*, conferencias(titulo_es, year)')
            .or(words.map(w => `reference.ilike.%${w}%,texto_biblico.ilike.%${w}%,interpretacion_neville.ilike.%${w}%`).join(','));

        citas?.forEach((q: any) => {
            contextItems.push({
                source: `Biblia - ${q.reference} [${q.conferencias?.titulo_es || 'General'}]`,
                type: 'biblical',
                content: `Versículo: ${q.texto_biblico}. Interpretación de Neville: ${q.interpretacion_neville}`
            });
        });

    } catch (error) {
        console.error('Error fetching context from Supabase:', error);
    }

    // Limit context to avoid token overflow (keep top 8 relevant items for more depth)
    const limitedContext = contextItems.slice(0, 8);

    if (limitedContext.length === 0) return "";

    return "CONTEXTO RELEVANTE EXTRAÍDO DE LA BIBLIOTECA (SUPABASE):\n" +
        limitedContext.map(item => `[Fuente: ${item.source}] ${item.content}`).join('\n\n');
}

export function getRelevantContext(query: string): string {
    const STOP_WORDS = ['hola', 'buen', 'buenos', 'buenas', 'dias', 'tardes', 'noches', 'como', 'estas', 'saludos', 'neville'];
    const contextItems: ContextItem[] = [];
    const queryLower = query.toLowerCase();
    const words = queryLower.split(/\s+/).filter(w => w.length > 3 && !STOP_WORDS.includes(w));

    const dataDir = path.join(process.cwd(), 'data');
    const conferencesDir = path.join(dataDir, 'conferencias');

    // 1. Search in conferences JSONs
    if (fs.existsSync(conferencesDir)) {
        const files = fs.readdirSync(conferencesDir);

        files.forEach(file => {
            if (!file.endsWith('.json')) return;

            const filePath = path.join(conferencesDir, file);
            const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            const lectureId = file.split('_')[0];

            // We'll assume metadata exists to get the title
            const metadataPath = path.join(conferencesDir, `${lectureId}_metadata.json`);
            let sourceTitle = `Conferencia ${lectureId}`;
            if (fs.existsSync(metadataPath)) {
                const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
                sourceTitle = `${metadata.title_es} (${metadata.year})`;
            }

            if (file.includes('_concepts')) {
                content.forEach((c: any) => {
                    if (matches(c.concept + c.explanation + (c.keywords?.join(' ') || ''), words)) {
                        contextItems.push({
                            source: sourceTitle,
                            type: 'concept',
                            content: `Concepto: ${c.concept}. Explicación: ${c.explanation}`
                        });
                    }
                });
            } else if (file.includes('_techniques')) {
                content.forEach((t: any) => {
                    if (matches(t.name_es + t.when_to_use + (t.steps?.join(' ') || ''), words)) {
                        contextItems.push({
                            source: sourceTitle,
                            type: 'technique',
                            content: `Técnica: ${t.name_es}. Pasos: ${t.steps.join(', ')}. Puntos clave: ${t.key_points.join(', ')}`
                        });
                    }
                });
            } else if (file.includes('_testimonies')) {
                content.forEach((t: any) => {
                    if (matches(t.problem + t.what_they_did + t.outcome, words)) {
                        contextItems.push({
                            source: sourceTitle,
                            type: 'testimony',
                            content: `Testimonio - Problema: ${t.problem}. Lo que hizo: ${t.what_they_did}. Resultado: ${t.outcome}`
                        });
                    }
                });
            } else if (file.includes('_metaphors')) {
                content.forEach((m: any) => {
                    if (matches(m.metaphor + m.plain_language + m.explanation, words)) {
                        contextItems.push({
                            source: sourceTitle,
                            type: 'metaphor',
                            content: `Metáfora: ${m.metaphor}. Significado: ${m.plain_language}. Explicación: ${m.explanation}`
                        });
                    }
                });
            }
        });
    }

    // 2. Search in enriched biblical quotes
    const biblicalPath = path.join(dataDir, 'citas-biblicas-enriquecidas.json');
    if (fs.existsSync(biblicalPath)) {
        const quotes = JSON.parse(fs.readFileSync(biblicalPath, 'utf-8'));
        quotes.forEach((q: any) => {
            if (matches(q.versiculo + q.texto_es + q.interpretacionNeville, words)) {
                contextItems.push({
                    source: `Biblia - ${q.versiculo}`,
                    type: 'biblical',
                    content: `Versículo: ${q.texto_es}. Interpretación de Neville: ${q.interpretacionNeville}`
                });
            }
        });
    }

    // Limit context to avoid token overflow (keep top 5 relevant items)
    const limitedContext = contextItems.slice(0, 5);

    if (limitedContext.length === 0) return "";

    return "CONTEXTO RELEVANTE EXTRAÍDO DE LA BIBLIOTECA:\n" +
        limitedContext.map(item => `[Fuente: ${item.source}] ${item.content}`).join('\n\n');
}

function matches(text: string, words: string[]): boolean {
    if (!text) return false;
    const textLower = text.toLowerCase();
    return words.some(word => textLower.includes(word));
}

