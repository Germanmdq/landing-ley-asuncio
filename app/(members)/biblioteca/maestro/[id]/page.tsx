"use client";

import { useParams, useRouter } from "next/navigation";
import { maestros } from "@/data/maestros";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Book } from "lucide-react";

export default function MaestroLibraryPage() {
    const params = useParams();
    const router = useRouter();
    const maestro = maestros.find(m => m.id === params.id);

    if (!maestro) {
        return <div className="p-8 text-center">Maestro no encontrado</div>;
    }

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-4xl mx-auto">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="mb-8 gap-2 text-text-muted hover:text-white"
                >
                    <ArrowLeft size={20} />
                    Volver a la Biblioteca
                </Button>

                <div className="bg-surface border border-white/10 rounded-2xl p-8 mb-8 relative overflow-hidden">
                    <div
                        className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{ background: `radial-gradient(circle at top right, ${maestro.color}, transparent 70%)` }}
                    />

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                        <div className="text-8xl filter drop-shadow-2xl">
                            {maestro.emoji}
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl font-bold text-white mb-2">
                                {maestro.nombre} {maestro.apellido}
                            </h1>
                            <p className="text-xl text-primary mb-4">{maestro.especialidad}</p>
                            <p className="text-text-muted italic">"{maestro.frase}"</p>
                        </div>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Book className="text-primary" />
                    Biblioteca de Obras ({maestro.libros.length})
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {maestro.libros.map((libro, index) => (
                        <div
                            key={index}
                            className="p-4 rounded-xl bg-surface border border-white/5 hover:border-primary/30 hover:bg-white/5 transition-all group cursor-pointer"
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                                    <Book size={24} />
                                </div>
                                <div>
                                    <h3 className="font-medium text-white group-hover:text-primary transition-colors mb-1">
                                        {libro}
                                    </h3>
                                    <p className="text-xs text-text-muted">
                                        Disponible para lectura
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
