"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ChatInterface from "@/components/dashboard/ChatInterface";
import MaestroSelectorCards from "@/components/MaestroSelectorCards";

export default function DashboardPage() {
    const router = useRouter();
    // Default to 'neville' as requested
    const [selectedMaestro, setSelectedMaestro] = useState<string | null>('neville');

    // Removed localStorage effect to prevent being stuck on previous selection
    // useEffect(() => {
    //     const maestro = localStorage.getItem('selectedMaestro');
    //     if (maestro) {
    //         setSelectedMaestro(maestro);
    //     }
    // }, []);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleMaestroSelect = (id: string) => {
        setSelectedMaestro(id);
        localStorage.setItem('selectedMaestro', id);
    };

    const handleResetMaestro = () => {
        setSelectedMaestro(null);
        // Optional: Clear localStorage if you want the user to always select on refresh
        // localStorage.removeItem('selectedMaestro'); 
    };

    if (!selectedMaestro) {
        return (
            <div className="h-full overflow-y-auto bg-black">
                <MaestroSelectorCards onSelect={handleMaestroSelect} />
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <header className="p-4 border-b border-white/5 flex justify-between items-center bg-[#0a0a0a] sticky top-0 z-20">
                <h1 className="text-xl font-bold text-white">Chat con Maestros</h1>
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleResetMaestro}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg transition-all text-sm font-medium text-white"
                    >
                        Cambiar Maestro
                    </button>
                    <div className="text-sm text-green-400 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        Online
                    </div>
                </div>
            </header>

            <div className="flex-1 overflow-hidden">
                <ChatInterface selectedMaestro={selectedMaestro} />
            </div>
        </div>
    );
}
