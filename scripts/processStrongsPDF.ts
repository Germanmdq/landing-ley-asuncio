import fs from 'fs-extra';
import path from 'path';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

interface StrongEntry {
  number: string;
  word: string;
  transliteration: string;
  pronunciation: string;
  definition: string;
  definition_en: string;
  nevilleInsight?: string;
}

interface StrongDictionary {
  [key: string]: StrongEntry;
}

async function extractTextFromPDF(pdfPath: string): Promise<string> {
  console.log('📄 Leyendo PDF:', pdfPath);
  
  const dataBuffer = fs.readFileSync(pdfPath);
  const loadingTask = pdfjsLib.getDocument({ data: dataBuffer });
  const pdfDocument = await loadingTask.promise;
  
  console.log('✅ PDF leído. Total de páginas:', pdfDocument.numPages);
  
  let fullText = '';
  
  for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
    const page = await pdfDocument.getPage(pageNum);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item: any) => item.str).join(' ');
    fullText += pageText + '\n';
    
    if (pageNum % 10 === 0) {
      console.log(`  ✓ Procesadas ${pageNum} páginas...`);
    }
  }
  
  console.log('✅ Caracteres extraídos:', fullText.length);
  
  return fullText;
}

function parseHebrewEntries(text: string): StrongDictionary {
  console.log('\n📖 Parseando entradas hebreas (H####)...');
  
  const entries: StrongDictionary = {};
  const hebrewPattern = /H(\d{1,4})\s+([\u0590-\u05FF]+)\s+(\w+)\s+([\w'-]+);?\s*(.+?)(?=H\d{1,4}|$)/gs;
  
  let match;
  let count = 0;
  
  while ((match = hebrewPattern.exec(text)) !== null) {
    const [, number, hebrewWord, transliteration, pronunciation, definition] = match;
    
    entries[`H${number}`] = {
      number: `H${number}`,
      word: hebrewWord.trim(),
      transliteration: transliteration.trim(),
      pronunciation: pronunciation.trim(),
      definition: cleanDefinition(definition),
      definition_en: cleanDefinition(definition),
    };
    
    count++;
    if (count % 100 === 0) {
      console.log(`  ✓ Procesadas ${count} entradas hebreas...`);
    }
  }
  
  console.log(`✅ Total entradas hebreas: ${count}`);
  return entries;
}

function parseGreekEntries(text: string): StrongDictionary {
  console.log('\n📖 Parseando entradas griegas (G####)...');
  
  const entries: StrongDictionary = {};
  const greekPattern = /G(\d{1,4})\s+([\u0370-\u03FF\u1F00-\u1FFF]+)\s+(\w+)\s+([\w'-]+)\s+(.+?)(?=G\d{1,4}|$)/gs;
  
  let match;
  let count = 0;
  
  while ((match = greekPattern.exec(text)) !== null) {
    const [, number, greekWord, transliteration, pronunciation, definition] = match;
    
    entries[`G${number}`] = {
      number: `G${number}`,
      word: greekWord.trim(),
      transliteration: transliteration.trim(),
      pronunciation: pronunciation.trim(),
      definition: cleanDefinition(definition),
      definition_en: cleanDefinition(definition),
    };
    
    count++;
    if (count % 100 === 0) {
      console.log(`  ✓ Procesadas ${count} entradas griegas...`);
    }
  }
  
  console.log(`✅ Total entradas griegas: ${count}`);
  return entries;
}

function cleanDefinition(def: string): string {
  return def
    .replace(/\s+/g, ' ')
    .replace(/[\n\r]+/g, ' ')
    .replace(/\d+\./g, '')
    .trim();
}

function enrichWithMetadata(entries: StrongDictionary): StrongDictionary {
  console.log('\n📝 Enriqueciendo con metadatos...');
  
  const nevilleInsights: Record<string, string> = {
    'H430': 'Neville interpreta Elohim (Dios) como la IMAGINACIÓN humana.',
    'H1254': 'Bara (crear) es el mismo poder que tienes en tu imaginación.',
    'H6754': 'Tselem (imagen) significa que TÚ ERES la imagen de Dios.',
    'G4100': 'Pisteuō (creer) según Neville es ASUNCIÓN.',
    'G2983': 'Lambanō (recibir) en tiempo perfecto significa acción COMPLETADA.',
    'G3056': 'Logos (palabra) es tu imaginación hablando.',
  };
  
  Object.entries(nevilleInsights).forEach(([number, insight]) => {
    if (entries[number]) {
      entries[number].nevilleInsight = insight;
    }
  });
  
  console.log(`✅ Agregados insights de Neville`);
  return entries;
}

async function saveToJSON(
  hebrewEntries: StrongDictionary,
  greekEntries: StrongDictionary,
  outputDir: string
) {
  console.log('\n💾 Guardando archivos JSON...');
  
  await fs.ensureDir(outputDir);
  
  const hebrewPath = path.join(outputDir, 'strong-hebrew.json');
  await fs.writeJSON(hebrewPath, hebrewEntries, { spaces: 2 });
  console.log(`✅ Guardado: ${hebrewPath}`);
  
  const greekPath = path.join(outputDir, 'strong-greek.json');
  await fs.writeJSON(greekPath, greekEntries, { spaces: 2 });
  console.log(`✅ Guardado: ${greekPath}`);
  
  const stats = {
    hebrew: { total: Object.keys(hebrewEntries).length },
    greek: { total: Object.keys(greekEntries).length },
    processedAt: new Date().toISOString(),
  };
  
  const statsPath = path.join(outputDir, 'processing-stats.json');
  await fs.writeJSON(statsPath, stats, { spaces: 2 });
  
  return stats;
}

async function main() {
  console.log('🚀 PROCESANDO STRONG\'S CONCORDANCE PDF\n');
  
  const pdfPath = './strongs-concordance.pdf';
  const outputDir = './data/strong';
  
  try {
    const text = await extractTextFromPDF(pdfPath);
    await fs.writeFile('./strongs-raw-text.txt', text);
    console.log('✅ Texto raw guardado\n');
    
    const hebrewEntries = parseHebrewEntries(text);
    const greekEntries = parseGreekEntries(text);
    
    const enrichedHebrew = enrichWithMetadata(hebrewEntries);
    const enrichedGreek = enrichWithMetadata(greekEntries);
    
    const stats = await saveToJSON(enrichedHebrew, enrichedGreek, outputDir);
    
    console.log('\n✅ COMPLETADO');
    console.log(`Hebreo: ${stats.hebrew.total} entradas`);
    console.log(`Griego: ${stats.greek.total} entradas`);
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();