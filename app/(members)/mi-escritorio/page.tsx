export default function MiEscritorioPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-white mb-6">Mi Escritorio</h1>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-surface border border-white/10 p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold text-white mb-4">Estado de tu Membresía</h2>
                    <p className="text-text-muted">Bienvenido al Club.</p>
                </div>
                <div className="bg-surface border border-white/10 p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold text-white mb-4">Novedades</h2>
                    <p className="text-text-muted">No hay novedades recientes.</p>
                </div>
            </div>
        </div>
    );
}
