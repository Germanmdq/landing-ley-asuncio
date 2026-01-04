'use client';

import Link from 'next/link';
import { Mail, Zap, Brain, BookOpen, ArrowRight } from 'lucide-react';

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

        <div className="bg-gradient-to-br from-primary/20 to-purple-600/20 border border-primary/30 rounded-2xl p-8 md:p-12 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Mail className="w-8 h-8 text-primary" />
            <h2 className="text-2xl font-bold">Newsletter Exclusivo para Miembros</h2>
          </div>

          <p className="text-white/70 mb-6 text-lg">
            Recibe cada día una dosis de sabiduría práctica sobre la Ley de la Asunción,
            técnicas de manifestación y reflexiones inspiradoras directamente en tu email.
          </p>

          <div className="bg-black/30 border border-white/10 rounded-xl p-6 mb-6">
            <h3 className="font-bold mb-4 text-primary">Incluye:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Email diario con ejercicios prácticos de manifestación</span>
              </li>
              <li className="flex items-start gap-3">
                <Brain className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Técnicas paso a paso de la Ley de la Asunción</span>
              </li>
              <li className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Enseñanzas exclusivas de Neville Goddard</span>
              </li>
            </ul>
          </div>

          <Link
            href="/#planes"
            className="flex items-center justify-center gap-2 w-full bg-primary text-black font-bold py-4 px-6 rounded-xl hover:bg-primary/90 transition-all group"
          >
            Ver Planes y Suscribirme
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <p className="text-sm text-white/40 mt-4 text-center">
            Disponible en los planes Plata y Oro
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
