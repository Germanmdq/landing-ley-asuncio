import React from 'react';
import { SlideProps } from './types';
import { landingContent } from '@/data/landingContent';
import { Check } from 'lucide-react';

export default function PricingSection({ isActive }: SlideProps) {
    const { pricing } = landingContent;

    return (
        <section data-index="4" className="min-h-screen w-full flex flex-col items-center justify-center bg-background px-4 relative overflow-hidden py-20">
            <div className={`text-center mb-12 transition-all duration-1000 transform ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{pricing.title}</h2>
                <p className="text-secondary max-w-2xl mx-auto">{pricing.subtitle}</p>
            </div>

            <div className={`w-full max-w-6xl grid md:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                {pricing.plans.map((plan, index) => (
                    <div
                        key={index}
                        className={`relative rounded-2xl p-8 border flex flex-col ${plan.featured
                            ? 'bg-surface border-purple-500/50 shadow-2xl shadow-purple-500/10 scale-105 z-10'
                            : 'bg-surface/50 border-white/10 backdrop-blur-sm hover:border-white/20'
                            }`}
                    >
                        {plan.featured && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                                {plan.badge}
                            </div>
                        )}

                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-bold text-white">{plan.price}</span>
                                <span className="text-secondary text-sm">{plan.period}</span>
                            </div>
                        </div>

                        <ul className="space-y-4 mb-8 flex-1">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                    <Check className={`w-5 h-5 flex-shrink-0 ${plan.featured ? 'text-purple-400' : 'text-gray-500'}`} />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button className={`w-full py-3 rounded-xl font-medium transition-all ${plan.featured
                            ? 'bg-white text-black hover:bg-gray-200'
                            : 'bg-white/10 text-white hover:bg-white/20'
                            }`}>
                            {plan.cta}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}
