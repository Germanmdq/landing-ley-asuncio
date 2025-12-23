
import React, { useState } from 'react';
import { LandingPageData } from './types';
import LandingPagePreview from './components/LandingPagePreview';

const DEFAULT_DATA: LandingPageData = {
  businessName: "Pablo y German",
  offerName: "Dominando la Ley de la Asunción",
  sections: [
    {
      id: "above_the_fold",
      name: "1. Above the Fold",
      purpose: "Capture attention and prompt immediate action.",
      content: {
        eyebrow: "Asumí el estado deseado sin ansiedad, sin dudas y sin sabotearte.",
        headline: "Aprendé a Dominar la Ley de la Asunción",
        bullets: [
          "Asumí el estado deseado sin sabotearte",
          "Liberá la carga emocional que interfiere",
          "Entrenamiento práctico para el sistema interno"
        ],
        cta: "Quiero Inscribirme Ahora",
        frictionRemover: "Inversión: 27 USD / 27000 ARS",
        videoUrl: "/assets/videos/workshop-video.mp4",
        mercadoPagoUrl: "https://mpago.la/2NQFYEi?ref=nevillegoddard.blog",
        paypalUrl: "https://www.paypal.com/ncp/payment/NFCE9GEV66TWU?ref=nevillegoddard.blog"
      }
    },
    {
      id: "lead_section",
      name: "2. Lead Section",
      purpose: "Build credibility and connect with pain points.",
      content: {
        headline: "El secreto de la manifestación real",
        usp: "Integración real de mente, cuerpo y emoción.",
        painPoint: "¿Visualizás y afirmás pero la ansiedad vuelve a los 5 minutos? Intentar sostener el estado no es tan simple como te lo explicaron.",
        solutionTeaser: "No se trata de desear, se trata de SER. Te enseñamos a entrenar tu sistema interno completo para habitar una realidad nueva."
      }
    },
    {
      id: "benefits_section",
      name: "4. Benefits Section",
      purpose: "Highlight the dream outcome.",
      content: {
        headline: "Lo que vas a lograr en este Workshop",
        bullets: [
          "Sostener el estado deseado sin ansiedad",
          "Liberar la carga emocional que interfiere",
          "Dejar la vigilancia mental constante",
          "Un mes gratuito al Club de la Imaginación"
        ]
      }
    },
    {
      id: "differentiators",
      name: "5. Power Differentiators",
      purpose: "Why this workshop is unique.",
      content: {
        headline: "¿Por qué aprender con Pablo?",
        imageUrl: "/assets/images/pablo.jpg",
        authorName: "Pablo",
        authorTitle: "Empresario (42 años)",
        authorQuote: "Toma decisiones reales cada día. No es maestro ni gurú, es alguien que aprendió a entrenar su sistema interno.",
        bullets: [
          "No es teoría, es práctica de años",
          "Enfoque en decisiones reales de negocios",
          "Sin lenguaje de gurú ni promesas de milagros",
          "Basado en la integración de mente y cuerpo"
        ]
      }
    },
    {
      id: "how_it_works",
      name: "6. How It Works",
      purpose: "Clarify the process.",
      content: {
        headline: "Tu camino a la claridad",
        steps: [
          { title: "Paso 1: Inscripción", desc: "Completás un formulario breve tras tu pago." },
          { title: "Paso 2: Comunidad", desc: "Te sumamos al grupo privado de Telegram para acceso al link." },
          { title: "Paso 3: Workshop Vivo", desc: "Entrenamiento y preguntas en vivo por Zoom." }
        ]
      }
    },
    {
      id: "offer_section",
      name: "7. Offer Section",
      purpose: "Summarize offer and drive action.",
      content: {
        headline: "Asumí tu estado deseado hoy mismo",
        bullets: [
          "Workshop en vivo",
          "Grabación completa de la sesión",
          "Cuaderno de ejercicios para tu práctica",
          "Un mes gratuito al Club de la Imaginación"
        ],
        cta: "Inscribirme Ahora",
        frictionRemover: "Valor real superior a 250 USD - Hoy solo 27 USD / 27000 ARS",
        mercadoPagoUrl: "https://mpago.la/2NQFYEi?ref=nevillegoddard.blog",
        paypalUrl: "https://www.paypal.com/ncp/payment/NFCE9GEV66TWU?ref=nevillegoddard.blog"
      }
    },
    {
      id: "social_proof_intent",
      name: "9. Social Proof with Intent",
      purpose: "Tailor to audience archetypes.",
      content: {
        headline: "Esto es para vos si...",
        archetypes: [
          { title: "El Ansioso", quote: "Si visualizás pero sentís que algo interno se desacomoda rápido." },
          { title: "El Pragmático", quote: "Si buscás herramientas reales y honestas sin misticismo exagerado." }
        ]
      }
    },
    {
      id: "faqs",
      name: "10. FAQs",
      purpose: "Remove final objections.",
      content: {
        headline: "Tus dudas resueltas",
        faqs: [
          { q: "¿Qué pasa si no puedo asistir al vivo?", a: "Recibirás la grabación completa para verla a tu ritmo." },
          { q: "¿Tengo que saber algo previo?", a: "Es ideal si ya conocés la Ley, pero el enfoque es práctico y accesible para todos." }
        ]
      }
    },
    {
      id: "full_stop",
      name: "11. Full Stop",
      purpose: "Final recap and drive action.",
      content: {
        headline: "La claridad es el punto de inflexión",
        bullets: [
          "Entrenamiento intensivo",
          "Sin dudas, sin sabotaje",
          "Inversión única: 27 USD / 27000 ARS"
        ],
        cta: "Sí, Quiero Empezar Ahora",
        frictionRemover: "Te esperamos, Pablo y German.",
        mercadoPagoUrl: "https://mpago.la/2NQFYEi?ref=nevillegoddard.blog",
        paypalUrl: "https://www.paypal.com/ncp/payment/NFCE9GEV66TWU?ref=nevillegoddard.blog"
      }
    }
  ]
};

const App: React.FC = () => {
  const [data] = useState<LandingPageData>(DEFAULT_DATA);

  return (
    <div className="min-h-screen bg-slate-950 font-sans relative overflow-x-hidden">
      {/* Glow effect */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-indigo-900/10 blur-[120px] pointer-events-none z-0"></div>

      <main className="relative z-10 w-full">
        <LandingPagePreview data={data} isMobile={false} />
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.15);
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;

