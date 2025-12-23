
import React from 'react';
import { LandingPageData } from '../types';
import {
  CheckCircleIcon,
  PlayIcon,
  UserCircleIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  UserGroupIcon
} from '@heroicons/react/24/solid';

interface LandingPagePreviewProps {
  data: LandingPageData;
  isMobile: boolean;
}

const LandingPagePreview: React.FC<LandingPagePreviewProps> = ({ data, isMobile }) => {
  const getSection = (id: string) => data.sections.find(s => s.id === id);

  return (
    <div className={`bg-white w-full text-slate-900 transition-all ${isMobile ? 'text-xs' : 'text-base'}`}>
      {/* 1. ABOVE THE FOLD */}
      {(() => {
        const s = getSection('above_the_fold');
        if (!s) return null;
        return (
          <section className="relative px-6 py-12 md:py-24 bg-gradient-to-br from-indigo-50 to-white text-center overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <span className="inline-block px-3 py-1 mb-4 text-indigo-700 font-bold tracking-widest uppercase text-[10px] md:text-xs bg-indigo-100 rounded-full">
                {s.content.eyebrow}
              </span>
              <h1 className="text-3xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                {s.content.headline}
              </h1>

              {s.content.videoUrl && (
                <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-video relative group">
                  <video
                    src={s.content.videoUrl}
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}

              <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-10">
                {s.content.bullets?.map((b, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-600 font-medium">
                    <CheckCircleIcon className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
              <p className="text-slate-500 font-medium flex items-center justify-center gap-2 mb-6">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                {s.content.frictionRemover}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
                {s.content.mercadoPagoUrl && (
                  <a
                    href={s.content.mercadoPagoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg font-bold shadow-xl shadow-blue-200 transition-all transform hover:scale-105 active:scale-95 flex flex-col items-center"
                  >
                    <span>{s.content.cta}</span>
                    <span className="text-[10px] opacity-80 uppercase tracking-wider">Argentina (Mercado Pago)</span>
                  </a>
                )}
                {s.content.paypalUrl && (
                  <a
                    href={s.content.paypalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-lg font-bold shadow-xl shadow-indigo-200 transition-all transform hover:scale-105 active:scale-95 flex flex-col items-center"
                  >
                    <span>{s.content.cta}</span>
                    <span className="text-[10px] opacity-80 uppercase tracking-wider">Resto del Mundo (PayPal)</span>
                  </a>
                )}
                {!s.content.mercadoPagoUrl && !s.content.paypalUrl && (
                  <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-lg font-bold shadow-xl shadow-indigo-200 transition-all transform hover:scale-105 active:scale-95">
                    {s.content.cta}
                  </button>
                )}
              </div>
              {s.content.socialProof && (
                <div className="mt-12 pt-12 border-t border-slate-200 flex flex-col items-center">
                  <div className="flex items-center -space-x-2 mb-3">
                    {[
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100",
                      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100",
                      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100",
                      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100"
                    ].map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        alt={`User ${i + 1}`}
                        className="w-10 h-10 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-slate-500">{s.content.socialProof}</p>
                </div>
              )}
            </div>
          </section>
        );
      })()}

      {/* 2. LEAD SECTION */}
      {(() => {
        const s = getSection('lead_section');
        if (!s) return null;
        return (
          <section className="px-6 py-16 bg-white border-y border-slate-100">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4">
                  {/* Fix: Using dynamic headline from section content */}
                  {s.content.headline}
                </h2>
                <p className="text-xl md:text-2xl font-semibold leading-relaxed text-slate-800 italic mb-6">
                  "{s.content.painPoint}"
                </p>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {s.content.solutionTeaser}
                </p>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <CheckCircleIcon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-bold">Resultados Reales</h4>
                    <p className="text-xs text-slate-500">{s.content.usp}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <PlayIcon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-bold">Acceso inmediato</h4>
                    <p className="text-xs text-slate-500">Metodología paso a paso</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* 3. PROOF SECTION */}
      {(() => {
        const s = getSection('proof_section');
        if (!s) return null;
        return (
          <section className="px-6 py-16 bg-slate-50">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">{s.content.headline}</h2>
                <p className="text-slate-500 font-medium">{s.content.socialProof}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {s.content.reviews?.map((review, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 relative">
                    <div className="flex gap-1 mb-4 text-yellow-400">
                      {[1, 2, 3, 4, 5].map(j => <StarIcon key={j} className="w-4 h-4" />)}
                    </div>
                    <p className="text-slate-700 italic mb-4">"{review.text}"</p>
                    <p className="font-bold text-sm text-indigo-600">— {review.author}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* 4. BENEFITS SECTION */}
      {(() => {
        const s = getSection('benefits_section');
        if (!s) return null;
        return (
          <section className="px-6 py-16 bg-slate-900 text-white">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-12">{s.content.headline}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {s.content.bullets?.map((b, i) => (
                  <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition group text-left">
                    <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-500 transition">
                      <CheckCircleIcon className="w-5 h-5 text-indigo-400 group-hover:text-white" />
                    </div>
                    <p className="font-bold leading-snug">{b}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* 5. DIFFERENTIATORS */}
      {(() => {
        const s = getSection('differentiators');
        if (!s) return null;
        return (
          <section className="px-6 py-16 bg-white">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {s.content.imageUrl && (
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-indigo-100 rounded-3xl transform rotate-3 group-hover:rotate-1 transition-transform"></div>
                    <img
                      src={s.content.imageUrl}
                      alt="Pablo"
                      className="relative w-full aspect-square object-cover rounded-2xl shadow-2xl mb-6"
                    />
                    {s.content.authorName && (
                      <div className="relative bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <p className="font-bold text-xl text-slate-900">{s.content.authorName}</p>
                        <p className="text-indigo-600 font-medium mb-4">{s.content.authorTitle}</p>
                        <p className="text-slate-600 italic leading-relaxed">"{s.content.authorQuote}"</p>
                      </div>
                    )}
                  </div>
                )}
                <div>
                  <h2 className="text-3xl font-bold mb-8">{s.content.headline}</h2>
                  <div className="space-y-4">
                    {s.content.bullets?.map((b, i) => (
                      <div key={i} className="flex gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50 items-center">
                        <ShieldCheckIcon className="w-6 h-6 text-indigo-600 flex-shrink-0" />
                        <span className="font-medium text-slate-800">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* 6. HOW IT WORKS */}
      {(() => {
        const s = getSection('how_it_works');
        if (!s) return null;
        return (
          <section className="px-6 py-16 bg-slate-50 border-y border-slate-100">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">{s.content.headline}</h2>
              <div className="relative">
                <div className="absolute left-[23px] top-0 bottom-0 w-0.5 bg-indigo-100 hidden md:block"></div>
                <div className="space-y-12">
                  {s.content.steps?.map((step, i) => (
                    <div key={i} className="flex gap-6 items-start relative z-10">
                      <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 font-bold text-xl shadow-lg shadow-indigo-200">
                        {i + 1}
                      </div>
                      <div className="pt-1">
                        <h3 className="text-xl font-bold mb-1">{step.title}</h3>
                        <p className="text-slate-600">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* 7. OFFER SECTION */}
      {(() => {
        const s = getSection('offer_section');
        if (!s) return null;
        return (
          <section className="px-6 py-16 bg-white">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[3rem] p-8 md:p-16 text-white shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <GlobeAltIcon className="w-48 h-48" />
              </div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-8">{s.content.headline}</h2>
                <ul className="space-y-4 mb-10">
                  {s.content.bullets?.map((b, i) => (
                    <li key={i} className="flex items-center gap-3 text-lg font-medium text-indigo-100">
                      <CheckCircleIcon className="w-6 h-6 text-indigo-300" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col items-center gap-6">
                  <p className="text-indigo-200 text-lg font-semibold">{s.content.frictionRemover}</p>
                  <div className="flex flex-col sm:flex-row gap-4 items-center w-full justify-center">
                    {s.content.mercadoPagoUrl && (
                      <a
                        href={s.content.mercadoPagoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-10 py-5 bg-white text-blue-600 rounded-2xl text-xl font-bold hover:bg-blue-50 transition transform hover:scale-105 active:scale-95 flex flex-col items-center"
                      >
                        <span>{s.content.cta}</span>
                        <span className="text-[10px] opacity-80 uppercase tracking-wider">Argentina (Mercado Pago)</span>
                      </a>
                    )}
                    {s.content.paypalUrl && (
                      <a
                        href={s.content.paypalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-10 py-5 bg-white text-indigo-600 rounded-2xl text-xl font-bold hover:bg-indigo-50 transition transform hover:scale-105 active:scale-95 flex flex-col items-center"
                      >
                        <span>{s.content.cta}</span>
                        <span className="text-[10px] opacity-80 uppercase tracking-wider">Resto del Mundo (PayPal)</span>
                      </a>
                    )}
                    {!s.content.mercadoPagoUrl && !s.content.paypalUrl && (
                      <button className="w-full md:w-auto px-10 py-5 bg-white text-indigo-600 rounded-2xl text-xl font-bold hover:bg-indigo-50 transition transform hover:scale-105 active:scale-95">
                        {s.content.cta}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* 8. ABOUT TEAM */}
      {(() => {
        const s = getSection('about_team');
        if (!s) return null;
        return (
          <section className="px-6 py-16 bg-slate-50">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">{s.content.headline}</h2>
              <div className="space-y-6">
                {s.content.team?.map((member, i) => (
                  <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-8 items-center text-left transition hover:shadow-md">
                    <div className="w-32 h-32 bg-indigo-50 rounded-2xl flex-shrink-0 flex items-center justify-center text-indigo-300">
                      <UserCircleIcon className="w-24 h-24" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-indigo-600">{member.name}</h3>
                      <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">{member.role}</p>
                      <p className="text-slate-600 leading-relaxed italic">"{member.desc}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* 9. SOCIAL PROOF WITH INTENT */}
      {(() => {
        const s = getSection('social_proof_intent');
        if (!s) return null;
        return (
          <section className="px-6 py-16 bg-white border-y border-slate-100">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">{s.content.headline}</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {s.content.archetypes?.map((arch, i) => (
                  <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-600">
                        <UserGroupIcon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold">{arch.title}</h3>
                    </div>
                    <p className="text-slate-600 italic">"{arch.quote}"</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* 10. FAQs */}
      {(() => {
        const s = getSection('faqs');
        if (!s) return null;
        return (
          <section className="px-6 py-16 bg-white">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
                <ChatBubbleLeftRightIcon className="w-8 h-8 text-indigo-600" />
                {s.content.headline}
              </h2>
              <div className="space-y-6">
                {s.content.faqs?.map((faq, i) => (
                  <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 transition hover:border-indigo-200">
                    <h4 className="font-bold text-lg mb-2 text-slate-800">¿{faq.q}?</h4>
                    <p className="text-slate-600">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* 11. FULL STOP */}
      {(() => {
        const s = getSection('full_stop');
        if (!s) return null;
        return (
          <section className="px-6 py-16 bg-indigo-600 text-white text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">{s.content.headline}</h2>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {s.content.bullets?.map((b, i) => (
                  <span key={i} className="px-4 py-2 bg-white/10 rounded-full text-sm font-semibold border border-white/20 backdrop-blur-sm">
                    {b}
                  </span>
                ))}
              </div>
              <p className="text-indigo-100 font-medium text-lg mb-6">
                {s.content.frictionRemover}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                {s.content.mercadoPagoUrl && (
                  <a
                    href={s.content.mercadoPagoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-12 py-5 bg-white text-blue-600 rounded-2xl text-xl font-bold shadow-2xl hover:bg-blue-50 transition transform hover:-translate-y-1 active:translate-y-0 flex flex-col items-center"
                  >
                    <span>{s.content.cta}</span>
                    <span className="text-[10px] opacity-80 uppercase tracking-wider">Argentina (Mercado Pago)</span>
                  </a>
                )}
                {s.content.paypalUrl && (
                  <a
                    href={s.content.paypalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-12 py-5 bg-white text-indigo-600 rounded-2xl text-xl font-bold shadow-2xl hover:bg-slate-50 transition transform hover:-translate-y-1 active:translate-y-0 flex flex-col items-center"
                  >
                    <span>{s.content.cta}</span>
                    <span className="text-[10px] opacity-80 uppercase tracking-wider">Resto del Mundo (PayPal)</span>
                  </a>
                )}
                {!s.content.mercadoPagoUrl && !s.content.paypalUrl && (
                  <button className="px-12 py-5 bg-white text-indigo-600 rounded-2xl text-xl font-bold shadow-2xl hover:bg-slate-50 transition transform hover:-translate-y-1 active:translate-y-0">
                    {s.content.cta}
                  </button>
                )}
              </div>
            </div>
          </section>
        );
      })()}

      {/* FOOTER */}
      <footer className="px-6 py-12 bg-slate-900 text-slate-500 text-center text-sm border-t border-white/5">
        <p>© 2024 {data.businessName}. Todos los derechos reservados.</p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="#" className="hover:text-white transition">Privacidad</a>
          <a href="#" className="hover:text-white transition">Términos</a>
          <a href="#" className="hover:text-white transition">Contacto</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPagePreview;
