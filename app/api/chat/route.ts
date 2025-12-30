import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

import { getRelevantContextSupabase } from '@/lib/rag';
import { SYSTEM_PROMPT } from '@/lib/prompts';

export async function POST(request: NextRequest) {
    try {
        if (!GEMINI_API_KEY) {
            console.error('❌ GEMINI_API_KEY no está configurada');
            return NextResponse.json({ error: 'API key no configurada' }, { status: 500 });
        }

        const body = await request.json();
        const { message, userName } = body;

        if (!message) {
            return NextResponse.json({ error: 'Mensaje requerido' }, { status: 400 });
        }

        console.log('📨 Mensaje recibido:', message, 'de:', userName);

        // Get relevant context from Supabase
        const context = await getRelevantContextSupabase(message);
        console.log('🔍 Contexto encontrado:', context ? 'Sí' : 'No');

        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        const userContext = userName ? `El nombre del usuario es ${userName}. ` : '';
        const fullPrompt = `${SYSTEM_PROMPT}\n\n${userContext}${context}\n\nUsuario: ${message}`;
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = response.text();

        console.log('✅ Respuesta de Gemini recibida');

        const palabrasClave = ['ansiedad', 'ansioso', 'estrés', 'estresado', 'nervioso', 'preocupado', 'miedo'];
        const tieneAnsiedad = palabrasClave.some(palabra => message.toLowerCase().includes(palabra));

        return NextResponse.json({
            response: text,
            followUp: tieneAnsiedad ? '💡 Veo que mencionaste ansiedad. ¿Querés que te muestre técnicas específicas de Neville y Murphy para calmar la mente?' : null
        });

    } catch (error: any) {
        console.error('❌ Error en /api/chat:', error);
        return NextResponse.json(
            { error: error.message || 'Error interno del servidor' },
            { status: 500 }
        );
    }
}
