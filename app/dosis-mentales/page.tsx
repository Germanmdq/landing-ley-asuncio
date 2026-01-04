export default function DosisMentalesPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Dosis Mentales
          </h1>
          <p className="text-xl text-white/60">
            Tu inspiración diaria para manifestar la vida que deseas
          </p>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-2xl p-8 md:p-12 mb-8">
          <h2 className="text-2xl font-bold mb-6">📬 Suscríbete al Newsletter</h2>
          <p className="text-white/70 mb-8">
            Recibe cada día una dosis de sabiduría práctica sobre la Ley de la Asunción,
            técnicas de manifestación y reflexiones inspiradoras directamente en tu email.
          </p>

          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/60 mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/60 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30"
                placeholder="tu@email.com"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black font-bold py-3 px-6 rounded-xl hover:bg-white/90 transition-all"
            >
              Suscribirme
            </button>
          </form>

          <p className="text-xs text-white/40 mt-4 text-center">
            Enviaremos un email diario. Puedes cancelar tu suscripción en cualquier momento.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="text-3xl mb-3">✨</div>
            <h3 className="font-bold mb-2">Inspiración Diaria</h3>
            <p className="text-sm text-white/60">
              Una dosis de motivación cada mañana para comenzar tu día con el estado correcto
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="text-3xl mb-3">🧠</div>
            <h3 className="font-bold mb-2">Técnicas Prácticas</h3>
            <p className="text-sm text-white/60">
              Ejercicios y métodos concretos que puedes aplicar inmediatamente
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="font-bold mb-2">Enseñanzas de Neville</h3>
            <p className="text-sm text-white/60">
              Sabiduría destilada de las conferencias y libros del maestro
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
