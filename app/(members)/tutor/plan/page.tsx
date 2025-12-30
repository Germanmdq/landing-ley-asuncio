import PlanCard from "@/components/dashboard/PlanCard";
import { DailyPlan } from "@/types";

// Mock data
const dailyPlans: DailyPlan[] = [
    {
        day: 1,
        title: "Definición del Deseo",
        description: "Escribe claramente qué es lo que quieres manifestar. Sé específico y no te preocupes por el 'cómo'.",
        completed: true
    },
    {
        day: 2,
        title: "Construcción de la Escena",
        description: "Crea una escena corta que implique el cumplimiento de tu deseo. Debe ser algo que suceda DESPUÉS de haberlo logrado.",
        completed: false
    },
    {
        day: 3,
        title: "Práctica de SATS",
        description: "Entra en un estado somnoliento y repite tu escena una y otra vez hasta que se sienta real.",
        completed: false
    }
];

export default function PlanPage() {
    const progress = Math.round((dailyPlans.filter(p => p.completed).length / dailyPlans.length) * 100);

    return (
        <div className="p-8 max-w-4xl mx-auto relative z-10">
            {/* Glowing gradient background behind content */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/20 blur-[100px] pointer-events-none" />

            <div className="mb-8 relative z-10">
                <h1 className="text-3xl font-bold mb-4 tracking-tight">Mi Plan de Manifestación</h1>

                <div className="bg-surface border border-border rounded-full h-4 w-full overflow-hidden">
                    <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="flex justify-between mt-2 text-sm text-secondary">
                    <span>Progreso: {progress}%</span>
                    <span>3 días totales</span>
                </div>
            </div>

            <div className="space-y-6 relative z-10">
                {dailyPlans.map((plan) => (
                    <PlanCard key={plan.day} plan={plan} />
                ))}
            </div>
        </div>
    );
}
