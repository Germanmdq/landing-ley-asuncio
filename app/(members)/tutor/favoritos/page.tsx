import LectureCard from "@/components/dashboard/LectureCard";
import { Lecture } from "@/types";
import { Heart } from "lucide-react";

// Mock data
const favorites: Lecture[] = [
    {
        id: "001",
        type: 'lecture',
        title_es: "Tu Fe es Tu Fortuna",
        title_en: "Your Faith is Your Fortune",
        year: "1941",
        duration: "45 min",
        difficulty: "foundational",
        main_themes: ["Conciencia", "Yo Soy", "Fe", "Manifestación"]
    }
];

export default function FavoritosPage() {
    return (
        <div className="p-8 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Heart className="w-8 h-8 text-primary fill-primary" />
                Mis Favoritos
            </h1>

            {favorites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((lecture) => (
                        <LectureCard key={lecture.id} lecture={lecture} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-text-muted">
                    <p className="text-xl">No tienes conferencias guardadas aún.</p>
                </div>
            )}
        </div>
    );
}
