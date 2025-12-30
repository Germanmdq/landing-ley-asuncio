import { DailyPlan } from "@/types";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Circle } from "lucide-react";

interface PlanCardProps {
    plan: DailyPlan;
}

export default function PlanCard({ plan }: PlanCardProps) {
    return (
        <Card className={`border-l-4 ${plan.completed ? 'border-l-green-500' : 'border-l-primary'}`}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <span className="text-sm font-bold text-text-muted uppercase tracking-wider">
                        Día {plan.day}
                    </span>
                    <h3 className="text-xl font-bold mt-1">{plan.title}</h3>
                </div>
                {plan.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                ) : (
                    <Circle className="w-6 h-6 text-white/20" />
                )}
            </div>

            <p className="text-text-muted mb-6">{plan.description}</p>

            <div className="flex gap-3">
                <Button size="sm" variant={plan.completed ? "outline" : "primary"}>
                    {plan.completed ? "Completado" : "Marcar Listo"}
                </Button>
                <Button size="sm" variant="ghost">
                    Hablar con Neville
                </Button>
            </div>
        </Card>
    );
}
