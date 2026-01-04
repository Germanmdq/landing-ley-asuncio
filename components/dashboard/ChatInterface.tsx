"use client";

import { useState, useRef, useEffect } from "react";
import { useChatStore } from "@/store/chatStore";
import MessageBubble from "./MessageBubble";
import { Button } from "@/components/ui/Button";
import { Send, Sparkles } from "lucide-react";
import ChatReactorCore from "./ChatReactorCore";

import { DEMO_SCRIPT } from "@/lib/demoScript";

export default function ChatInterface({ selectedMaestro }: { selectedMaestro: string }) {
    const { messages, sendMessage, addMessage, isLoading, setLoading, updateMessageContent, setMessageStreaming } = useChatStore();
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const prevMessagesLength = useRef(messages.length);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const lastMessage = messages[messages.length - 1];
        if (messages.length !== prevMessagesLength.current || lastMessage?.isStreaming) {
            scrollToBottom();
            prevMessagesLength.current = messages.length;
        }
    }, [messages]);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [input]);

    const runDemoSequence = async (startIndex: number) => {
        // Helper to wait
        const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        for (let i = startIndex; i < DEMO_SCRIPT.length; i++) {
            const step = DEMO_SCRIPT[i];

            // 1. Simulate User Typing (except for the first trigger which was real)
            if (i > 0) {
                // Type in the input field
                const userChars = step.trigger.split('');
                let currentInput = '';

                for (const char of userChars) {
                    currentInput += char;
                    setInput(currentInput);
                    // Slower typing for user (40-70ms)
                    await wait(Math.random() * 30 + 40);
                }

                await wait(1000); // Pause before sending
                setInput(""); // Clear input

                // Add User Message
                addMessage({
                    id: Date.now().toString(),
                    role: 'user',
                    content: step.trigger,
                    timestamp: new Date()
                });
            }

            // 2. Simulate Assistant Thinking
            setLoading(true);
            await wait(2500); // Slower thinking time
            setLoading(false);

            // 3. Add Assistant Message (Empty first)
            const msgId = Date.now().toString();
            addMessage({
                id: msgId,
                role: 'neville',
                content: '',
                timestamp: new Date(),
                isStreaming: true
            });

            // 4. Simulate Typing (Character by character)
            const chars = step.response.split('');
            let currentText = '';

            for (const char of chars) {
                currentText += char;
                updateMessageContent(msgId, currentText);
                // Slower typing for Neville (20-50ms)
                await wait(Math.random() * 30 + 20);
            }

            setMessageStreaming(msgId, false);

            // 5. Wait before next turn
            await wait(3000); // Longer reading time
        }
    };

    const handleSendMessage = async (content: string) => {
        if (!content.trim() || isLoading || !selectedMaestro) return;

        // Check if it's the start of the demo
        const isDemoStart = content.toLowerCase().trim() === "hola";

        if (isDemoStart) {
            // Add the initial "hola" immediately
            addMessage({
                id: Date.now().toString(),
                role: 'user',
                content: content,
                timestamp: new Date()
            });

            setLoading(true);
            setTimeout(async () => {
                setLoading(false);
                // Response to "hola"
                const msgId = Date.now().toString();
                addMessage({
                    id: msgId,
                    role: 'neville',
                    content: '',
                    timestamp: new Date(),
                    isStreaming: true
                });

                // Type the first response
                const chars = DEMO_SCRIPT[0].response.split('');
                let currentText = '';
                const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

                for (const char of chars) {
                    currentText += char;
                    updateMessageContent(msgId, currentText);
                    await wait(Math.random() * 20 + 10);
                }
                setMessageStreaming(msgId, false);

                // Continue with the rest of the script automatically
                await runDemoSequence(1);
            }, 1000);

            return;
        }

        try {
            const response = await sendMessage(content, selectedMaestro);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        const content = input;
        setInput("");
        await handleSendMessage(content);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="flex flex-col h-full max-w-4xl mx-auto relative z-10">
            {/* Glowing gradient background behind content */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/20 blur-[100px] pointer-events-none" />

            {/* Messages Area - Scrollable */}
            <div className="flex-1 overflow-y-auto pt-0 pb-4 px-4 md:pt-0 md:pb-8 md:px-8 space-y-4 relative z-10 scroll-smooth">
                {messages.length === 0 && (
                    <div className="text-center text-text-muted mt-12 mb-8">
                        <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 inline-block mb-4">
                            <Sparkles size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Pregúntale a {selectedMaestro.charAt(0).toUpperCase() + selectedMaestro.slice(1)}</h2>
                        <p className="text-white/60">Hazme cualquier pregunta sobre sus enseñanzas</p>
                    </div>
                )}

                {messages.map((msg) => (
                    <MessageBubble key={msg.id} message={msg} />
                ))}

                {isLoading && selectedMaestro && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <ChatReactorCore maestro={selectedMaestro} />
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area - Fixed at bottom */}
            <div className="p-4 border-t border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl relative z-20">
                <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto">
                    <div className="flex bg-white/5 rounded-2xl border border-white/10 px-4 py-3 focus-within:border-blue-500/50 focus-within:bg-white/10 transition-all items-end gap-2">
                        <textarea
                            ref={textareaRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit();
                                }
                            }}
                            placeholder="Escribe tu mensaje aquí..."
                            className="bg-transparent border-none outline-none w-full resize-none min-h-[24px] max-h-[120px] text-white placeholder-white/40 py-1"
                            rows={1}
                            style={{ height: 'auto' }}
                        />
                        <Button
                            type="submit"
                            className="h-8 w-8 shrink-0 bg-white text-black hover:bg-gray-200 rounded-lg transition-colors"
                            disabled={!input.trim() || isLoading}
                        >
                            <Send className="w-4 h-4" />
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
