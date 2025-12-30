'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export interface ResearchResult {
    facts: string[];
    searchResults: { title: string; url: string }[];
    imagePrompt: string;
}

export async function researchTopicAction(
    topic: string,
    perspective: string,
    aesthetic: string,
    language: string
): Promise<ResearchResult> {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is not set');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `
    Actúa como un experto investigador y director visual para "Sabiduría Online Vision".
    
    Tema: "${topic}"
    Perspectiva/Enfoque: "${perspective}"
    Estética Visual: "${aesthetic}"
    Idioma de Salida: "Español" (SIEMPRE responde en español, excepto el prompt de imagen que debe ser en inglés para mejor calidad)

    Tu tarea es:
    1. Investigar este tema y encontrar 3-5 datos fascinantes o hechos curiosos adecuados para la perspectiva elegida.
    2. Crear un prompt de generación de imagen altamente detallado y cinematográfico para una infografía educativa o visualización sobre este tema. El prompt de imagen DEBE ser en INGLÉS.
    3. Simular resultados de búsqueda que serían fuentes relevantes.

    Devuelve SOLO un objeto JSON con esta estructura:
    {
      "facts": ["dato 1", "dato 2", "dato 3"],
      "searchResults": [
        {"title": "Título Fuente 1", "url": "dominio.com"},
        {"title": "Título Fuente 2", "url": "dominio.com"}
      ],
      "imagePrompt": "Detailed image prompt in English..."
    }
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up markdown code blocks if present
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonStr) as ResearchResult;
    } catch (error) {
        console.error('Error researching topic:', error);
        // Fallback mock data if API fails or parsing fails
        return {
            facts: [
                "La IA generativa puede procesar millones de datos en segundos.",
                "El concepto de 'Sabiduría Online' combina arte y ciencia.",
                "La visualización de datos mejora la retención en un 400%."
            ],
            searchResults: [
                { title: "Wikipedia - Generative AI", url: "wikipedia.org" },
                { title: "Google DeepMind Research", url: "deepmind.google" }
            ],
            imagePrompt: `A futuristic infographic about ${topic}, ${aesthetic} style, glowing neon accents, detailed data visualization.`
        };
    }
}
import { getRelevantContext } from '@/lib/rag';
import { SYSTEM_PROMPT } from '@/lib/prompts';

export async function demoChatAction(query: string): Promise<string> {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is not set');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Get relevant context from JSON files
    const context = getRelevantContext(query);

    const fullPrompt = `${SYSTEM_PROMPT}\n\n${context}\n\nUsuario: ${query}`;

    try {
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Error in demoChatAction:', error);
        return "Lo siento, tuve un problema al conectar con mi sabiduría interna. Por favor, intentá de nuevo en un momento.";
    }
}
