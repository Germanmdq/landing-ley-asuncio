"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';

import { demoChatAction } from '@/app/actions';

export default function Demo() {
    const [messages, setMessages] = useState([
        { role: 'bot', content: '¡Hola! Soy tu Tutor Espiritual. Haceme cualquier pregunta sobre las enseñanzas de Neville, Murphy o la Biblia. ¿En qué puedo ayudarte hoy?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [questionsLeft, setQuestionsLeft] = useState(3);

    const handleSend = async () => {
        if (!input.trim() || questionsLeft <= 0 || isTyping) return;

        const userMessage = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsTyping(true);
        setQuestionsLeft(prev => prev - 1);

        try {
            const response = await demoChatAction(userMessage);
            setMessages(prev => [...prev, { role: 'bot', content: response }]);
        } catch (error) {
            console.error('Error in demo chat:', error);
            setMessages(prev => [...prev, { role: 'bot', content: "Lo siento, tuve un problema al procesar tu pregunta. Por favor, intentá de nuevo." }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <section className="py-16 md:py-32 px-4 bg-black relative">
            <div className="absolute inset-0 bg-primary/5 pointer-events-none" />

            <div className="container max-w-4xl mx-auto">
                <div className="text-center mb-12 md:mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] md:text-xs font-bold mb-4 uppercase tracking-widest">
                        <span>Demo Interactiva</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Probá el sistema ahora</h2>
                    <p className="text-lg md:text-xl text-text-muted">
                        Hacé hasta 3 preguntas de prueba y comprobá la precisión de las respuestas.
                    </p>
                </div>

                <div className="bg-surface border border-white/10 rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col h-[500px] md:h-[600px]">
                    {/* Chat Header */}
                    <div className="p-4 md:p-6 border-b border-white/10 bg-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary flex items-center justify-center text-black">
                                <Bot size={18} />
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-sm md:text-base">Sabiduría Online</h4>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-[8px] md:text-[10px] text-text-muted uppercase font-bold tracking-tighter">En línea</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-[10px] md:text-xs font-bold text-primary bg-primary/10 px-2 md:px-3 py-1 rounded-full">
                            {questionsLeft} restantes
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 scrollbar-hide">
                        <AnimatePresence initial={false}>
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] md:max-w-[80%] p-3 md:p-4 rounded-2xl text-sm md:text-base ${msg.role === 'user'
                                        ? 'bg-primary text-black font-medium rounded-tr-none'
                                        : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {isTyping && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                                <div className="bg-white/5 border border-white/10 p-3 md:p-4 rounded-2xl rounded-tl-none flex gap-1">
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 md:p-6 border-t border-white/10 bg-white/5">
                        <div className="relative flex items-center gap-2 md:gap-3">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                disabled={questionsLeft <= 0 || isTyping}
                                placeholder={questionsLeft > 0 ? "Escribí tu pregunta..." : "¡Demo finalizada!"}
                                className="flex-1 bg-black border border-white/10 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-white placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-all disabled:opacity-50"
                            />
                            <Button
                                onClick={handleSend}
                                disabled={!input.trim() || questionsLeft <= 0 || isTyping}
                                className="h-11 w-11 md:h-14 md:w-14 rounded-xl md:rounded-2xl bg-primary text-black hover:bg-primary/90 p-0 flex items-center justify-center shrink-0"
                            >
                                <Send size={18} />
                            </Button>
                        </div>
                        {questionsLeft <= 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 text-center"
                            >
                                <p className="text-xs text-text-muted mb-3">Para seguir conversando y acceder a los 900+ textos:</p>
                                <Button className="bg-primary text-black font-bold px-6 py-2 text-sm h-auto">Ver Planes y Precios</Button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
