"use client";

import { Message } from "@/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface MessageBubbleProps {
    message: Message;
}

import { useChatStore } from "@/store/chatStore";

function extractSuggestedOptions(message: string): {
    content: string;
    options: string[]
} {
    const lines = message.split('\n');
    const options: string[] = [];
    let contentEndIndex = lines.length;

    // Buscar opciones al final (líneas que empiezan con • o -)
    let foundOptions = false;
    for (let i = lines.length - 1; i >= 0; i--) {
        const line = lines[i].trim();
        if (line.startsWith('•') || line.startsWith('-')) {
            options.unshift(line.replace(/^[•\-]\s*/, '').trim());
            foundOptions = true;
            contentEndIndex = i;
        } else if (foundOptions && line.length > 0) {
            break;
        }
    }

    const content = lines.slice(0, contentEndIndex).join('\n').trim();

    return { content, options };
}

import { useEffect, useState } from 'react';

export default function MessageBubble({ message }: MessageBubbleProps) {
    const isUser = message.role === "user";
    const { sendMessage } = useChatStore();
    const [displayedContent, setDisplayedContent] = useState('');

    // Detectar si es el mensaje de "Pensando..."
    const isThinking = message.content === '●●● Pensando...';

    // Extraer opciones solo si NO está pensando y es mensaje de Neville
    const { content, options } = !isThinking && !isUser
        ? extractSuggestedOptions(message.content)
        : { content: message.content, options: [] };

    // Efecto typewriter solo si está en streaming y NO está pensando
    useEffect(() => {
        if (message.isStreaming && !isThinking) {
            // Mostrar el contenido directamente mientras llega del stream
            setDisplayedContent(content);
        } else {
            // Si ya terminó, mostrar todo
            setDisplayedContent(content);
        }
    }, [content, message.isStreaming, isThinking]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "flex gap-4 mb-6",
                isUser ? "flex-row-reverse" : "flex-row"
            )}
        >
            <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden",
                isUser ? "bg-white/5 border border-white/10" : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
            )}>
                {isUser ? (
                    "G"
                ) : (
                    <img
                        src="/neville-avatar.jpg"
                        alt="Neville"
                        className="w-full h-full object-cover"
                    />
                )}
            </div>

            <div className={cn(
                "max-w-[80%] rounded-2xl p-4",
                isUser ? "bg-surface border border-border text-gray-200" : "bg-surface/80 backdrop-blur-sm border border-white/10 text-gray-200"
            )}>
                {/* Si está "Pensando..." mostrar animación */}
                {isThinking ? (
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                        <span className="ml-2 text-text-muted text-sm">Pensando...</span>
                    </div>
                ) : (
                    <>
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                            {displayedContent}
                            {message.isStreaming && (
                                <span className="typing-cursor">▋</span>
                            )}
                        </div>

                        {/* Opciones sugeridas (solo cuando NO está en streaming) */}
                        {!message.isStreaming && options.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                                {options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => sendMessage(option)}
                                        className="option-button"
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                )}

                <span className="text-xs text-white/30 mt-2 block">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>
        </motion.div>
    );
}
