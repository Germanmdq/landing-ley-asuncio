import { create } from 'zustand';
interface Message {
    id: string;
    role: 'user' | 'neville';
    content: string;
    timestamp: Date;
    isStreaming?: boolean;
}

interface ChatStore {
    messages: Message[];
    userName: string;
    isLoading: boolean;
    addMessage: (message: Message) => void;
    updateMessageContent: (id: string, content: string) => void;
    setMessageStreaming: (id: string, isStreaming: boolean) => void;
    sendMessage: (content: string, maestroId?: string) => Promise<any>;
    setUserName: (name: string) => void;
    setLoading: (isLoading: boolean) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
    messages: [],
    userName: 'Invitado',
    isLoading: false,

    setLoading: (isLoading) => set({ isLoading }),

    addMessage: (message) => set((state) => ({
        messages: [...state.messages, message],
    })),

    updateMessageContent: (id, content) => set((state) => ({
        messages: state.messages.map((msg) =>
            msg.id === id ? { ...msg, content } : msg
        ),
    })),

    setMessageStreaming: (id, isStreaming) => set((state) => ({
        messages: state.messages.map((msg) =>
            msg.id === id ? { ...msg, isStreaming } : msg
        ),
    })),

    setUserName: (name) => set({ userName: name }),

    sendMessage: async (content: string, maestroId?: string) => {
        const { addMessage, messages, userName, updateMessageContent, setMessageStreaming } = get();

        // 1. Agregar mensaje del usuario
        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content,
            timestamp: new Date(),
        };
        addMessage(userMessage);

        // 2. INMEDIATAMENTE crear el mensaje "Pensando..." de Neville
        const nevilleMessageId = (Date.now() + 1).toString();
        const loadingMessage: Message = {
            id: nevilleMessageId,
            role: 'neville',
            content: '●●● Pensando...', // Contenido temporal
            timestamp: new Date(),
            isStreaming: true,
        };
        addMessage(loadingMessage);

        set({ isLoading: true });

        try {
            // 3. Esperar respuesta del servidor
            // Enviamos todo el historial para que el backend lo maneje
            const conversationHistory = messages.map(m => ({
                role: m.role,
                content: m.content
            }));

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: content,
                    conversationHistory, // <-- Enviamos el array de mensajes
                    userName,
                    maestroId // <-- Enviamos el ID del maestro
                }),
            });

            if (!response.ok) throw new Error('Error en la respuesta del servidor');

            const data = await response.json();
            const fullText = data.response;

            // 4. REEMPLAZAR "Pensando..." con el texto real
            updateMessageContent(nevilleMessageId, ''); // Limpiar primero

            // 5. Streaming palabra por palabra
            const words = fullText.split(' ');
            let currentText = '';

            for (let i = 0; i < words.length; i++) {
                currentText += (i > 0 ? ' ' : '') + words[i];
                updateMessageContent(nevilleMessageId, currentText);

                const word = words[i];
                let delay = 80;

                if (word.includes('.') || word.includes('?') || word.includes('!')) {
                    delay = 300;
                } else if (word.includes(',') || word.includes(':')) {
                    delay = 150;
                }

                await new Promise(resolve => setTimeout(resolve, delay));
            }

            setMessageStreaming(nevilleMessageId, false);

            // Return data for the component to use (token usage)
            return {
                reply: fullText,
                tokenUsage: data.tokenUsage
            };

        } catch (error) {
            console.error('Error enviando mensaje:', error);
            updateMessageContent(
                nevilleMessageId,
                'Disculpá, hubo un error. Probá de nuevo.'
            );
            setMessageStreaming(nevilleMessageId, false);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },
}));
