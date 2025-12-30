import { LibraryItem } from "@/types";
import { Card } from "@/components/ui/Card";
import { Clock, BarChart, Heart, Book, Mic2 } from "lucide-react";

interface LectureCardProps {
    lecture: LibraryItem;
}

export default function LectureCard({ lecture }: LectureCardProps) {
    return (
        <Card hoverEffect className="group cursor-pointer relative overflow-hidden h-full flex flex-col">
            <div className="absolute top-4 right-4 z-10">
                <button className="text-text-muted hover:text-primary transition-colors">
                    <Heart className="w-5 h-5" />
                </button>
            </div>

            <div className="mb-4 flex items-center gap-2">
                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded uppercase tracking-wider">
                    {lecture.year}
                </span>
                <span className="text-xs font-bold text-white/50 bg-white/5 px-2 py-1 rounded uppercase tracking-wider flex items-center gap-1">
                    {lecture.type === 'book' ? <Book className="w-3 h-3" /> : <Mic2 className="w-3 h-3" />}
                    {lecture.type === 'book' ? 'Libro' : 'Conf'}
                </span>
            </div>

            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {lecture.title_es}
            </h3>
            <p className="text-sm text-primary/80 mb-4 font-medium">
                {lecture.author || "Neville Goddard"}
            </p>

            <div className="flex items-center gap-4 text-sm text-text-muted mb-4 mt-auto">
                {lecture.type === 'lecture' && (
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {lecture.duration}
                    </div>
                )}
                <div className="flex items-center gap-1">
                    <BarChart className="w-4 h-4" />
                    <span className="capitalize">{lecture.difficulty}</span>
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                {lecture.main_themes.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs bg-white/5 px-2 py-1 rounded text-white/70">
                        #{tag}
                    </span>
                ))}
            </div>
        </Card>
    );
}
