import React from 'react';
import { SlideProps } from '../types';
import { landingContent } from '@/data/landingContent';
import { ArrowRight } from 'lucide-react';

export default function FooterSection({ isActive }: SlideProps) {
    const { ctaFinal, footer } = landingContent;

    return (
        <section data-index="5" className="min-h-screen w-full flex flex-col items-center justify-center bg-background px-4 relative overflow-hidden py-20">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-background pointer-events-none" />

            <div className={`w-full max-w-4xl text-center relative z-10 transition-all duration-1000 transform ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {/* Final CTA */}
                <div className="mb-20">
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">{ctaFinal.title}</h2>
                    <p className="text-xl text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
                        {ctaFinal.subtitle}
                    </p>

                    <div className="flex flex-col items-center gap-6">
                        <button className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-white px-10 font-medium text-black transition-all hover:bg-gray-200 hover:scale-105 active:scale-95 text-lg">
                            <span className="mr-2">{ctaFinal.buttonText}</span>
                            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
                        </button>
                        <p className="text-sm text-white/40">{ctaFinal.stats}</p>
                    </div>
                </div>

                {/* Footer Content */}
                <div className={`border-t border-white/10 pt-12 transition-all duration-1000 delay-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="text-left">
                            <h3 className="text-white font-bold mb-2">{footer.title}</h3>
                            <p className="text-secondary text-sm max-w-md">{footer.description}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-white/30 text-xs">{footer.copyright}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
