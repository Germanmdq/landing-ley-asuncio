import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { User, Mail, Calendar, BarChart, Zap } from "lucide-react";

export default function CuentaPage() {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Mi Cuenta</h1>

            <div className="grid gap-8">
                {/* Profile Info */}
                <Card className="p-8">
                    <div className="flex items-start gap-6">
                        <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
                            <User className="w-10 h-10" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold mb-1">Usuario Invitado</h2>
                            <div className="flex items-center gap-2 text-text-muted mb-4">
                                <Mail className="w-4 h-4" />
                                <span>usuario@ejemplo.com</span>
                            </div>
                            <div className="flex gap-3">
                                <Button size="sm" variant="outline">Editar Perfil</Button>
                                <Button size="sm" variant="secondary">Cerrar Sesión</Button>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-6 text-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                            <BarChart className="w-5 h-5" />
                        </div>
                        <div className="text-3xl font-bold mb-1">12</div>
                        <div className="text-sm text-text-muted">Conversaciones</div>
                    </Card>
                    <Card className="p-6 text-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                            <Zap className="w-5 h-5" />
                        </div>
                        <div className="text-3xl font-bold mb-1">5</div>
                        <div className="text-sm text-text-muted">Técnicas Aprendidas</div>
                    </Card>
                    <Card className="p-6 text-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <div className="text-3xl font-bold mb-1">3</div>
                        <div className="text-sm text-text-muted">Días de Racha</div>
                    </Card>
                </div>

                {/* Subscription */}
                <Card className="p-8 border-primary/50 bg-primary/5">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-xl font-bold mb-1">Plan Actual: Gratuito</h3>
                            <p className="text-text-muted">Tienes acceso limitado a las funciones.</p>
                        </div>
                        <Button>Mejorar Plan</Button>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full w-[40%]" />
                    </div>
                    <p className="text-xs text-text-muted mt-2 text-right">40% de mensajes usados hoy</p>
                </Card>
            </div>
        </div>
    );
}
