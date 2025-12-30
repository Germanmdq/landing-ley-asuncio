const fs = require('fs');
const path = require('path');

function generateStaticData() {
    console.log('📊 Iniciando generación de datos estáticos...');

    const conferencesDir = path.join(process.cwd(), 'data', 'conferencias');
    const outputDir = path.join(process.cwd(), 'public', 'data');

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const files = fs.readdirSync(conferencesDir);

    // 1. Identificar todas las conferencias por sus archivos de metadata
    const lectureIds = files
        .filter(f => f.endsWith('_metadata.json'))
        .map(f => f.split('_')[0]);

    const allTestimonies = [];
    const allBiblicalQuotes = [];

    lectureIds.forEach(id => {
        // Leer metadata
        const metadataPath = path.join(conferencesDir, `${id}_metadata.json`);
        if (!fs.existsSync(metadataPath)) return;

        const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
        const lectureTitle = metadata.title_es || 'Sin título';
        const lectureYear = metadata.year || 'Desconocido';

        // Procesar Testimonios
        const testimoniesPath = path.join(conferencesDir, `${id}_testimonies.json`);
        if (fs.existsSync(testimoniesPath)) {
            try {
                const testimonies = JSON.parse(fs.readFileSync(testimoniesPath, 'utf-8'));
                testimonies.forEach((t, index) => {
                    allTestimonies.push({
                        id: `${id}-${index}`,
                        conferencia: lectureTitle,
                        año: lectureYear,
                        categoria: t.category || 'general',
                        testimonio: t.what_they_did + ' ' + t.outcome, // Combinamos para mostrar un texto completo si es necesario, o usamos campos separados
                        full_testimonio: t, // Guardamos el objeto completo por si acaso
                        tecnica: t.technique_used || 'General',
                        resultado: t.outcome || 'Manifestado'
                    });
                });
            } catch (e) {
                console.error(`Error leyendo testimonios de ${id}:`, e);
            }
        }

        // Procesar Citas Bíblicas
        const biblicalPath = path.join(conferencesDir, `${id}_biblical_references.json`);
        if (fs.existsSync(biblicalPath)) {
            try {
                const quotes = JSON.parse(fs.readFileSync(biblicalPath, 'utf-8'));
                quotes.forEach((q, index) => {
                    allBiblicalQuotes.push({
                        id: `${id}-${index}`,
                        versiculo: q.reference,
                        texto: q.text,
                        explicacion: q.neville_interpretation,
                        conferencia: lectureTitle,
                        año: lectureYear,
                        concepto: q.related_technique || 'General'
                    });
                });
            } catch (e) {
                console.error(`Error leyendo citas bíblicas de ${id}:`, e);
            }
        }
    });

    // Procesar Citas Enriquecidas (Strong's)
    const enrichedPath = path.join(process.cwd(), 'data', 'citas-biblicas-enriquecidas.json');
    if (fs.existsSync(enrichedPath)) {
        try {
            const enrichedQuotes = JSON.parse(fs.readFileSync(enrichedPath, 'utf-8'));
            enrichedQuotes.forEach(q => {
                // Check if already exists to avoid duplicates (optional, but good practice)
                // For now, we just add them with a flag
                allBiblicalQuotes.unshift({ // Add to top
                    id: q.id,
                    versiculo: q.versiculo,
                    texto: q.texto_es,
                    explicacion: q.interpretacionNeville,
                    conferencia: q.conferencia,
                    año: q.año,
                    concepto: q.categoria,
                    enriched: true, // Flag to identify enriched quotes
                    full_data: q // Store full enriched data
                });
            });
            console.log(`✅ ${enrichedQuotes.length} citas enriquecidas añadidas`);
        } catch (e) {
            console.error('Error leyendo citas enriquecidas:', e);
        }
    }

    // Escribir archivos
    fs.writeFileSync(
        path.join(outputDir, 'testimonios.json'),
        JSON.stringify(allTestimonies, null, 2)
    );

    fs.writeFileSync(
        path.join(outputDir, 'citas-biblicas.json'),
        JSON.stringify(allBiblicalQuotes, null, 2)
    );

    console.log(`✅ ${allTestimonies.length} testimonios extraídos`);
    console.log(`✅ ${allBiblicalQuotes.length} citas bíblicas extraídas`);
}

generateStaticData();
