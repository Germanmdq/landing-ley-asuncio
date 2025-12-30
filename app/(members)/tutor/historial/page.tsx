import { Card } from "@/components/ui/Card";
import { MessageSquare, Clock, Trash2 } from "lucide-react";

export default function HistorialPage() {
    // Mock data
    const history = [
        { id: 1, title: "Sobre la Ley de Asunción", date: "Hace 2 horas", messages: 12 },
        { id: 2, title: "Dudas sobre SATS", date: "Ayer", messages: 8 },
        { id: 3, title: "Interpretación de sueño", date: "Hace 3 días", messages: 24 },
    ];

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Historial de Conversaciones</h1>

            <div className="grid gap-4">
                {history.map((item) => (
                    <Card key={item.id} hoverEffect className="flex items-center justify-between p-6 cursor-pointer group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                <MessageSquare className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{item.title}</h3>
                                <div className="flex items-center gap-4 text-sm text-text-muted mt-1">
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> {item.date}
                                    </span>
                                    <span>{item.messages} mensajes</span>
                                </div>
                            </div>
                        </div>

                        <button className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-full transition-colors opacity-0 group-hover:opacity-100">
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </Card>
                ))}
            </div>
        </div>
    );
}
