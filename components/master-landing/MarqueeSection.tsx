import React from 'react';
import { SlideProps } from '../types';
import { landingContent } from '@/data/landingContent';
import { Marquee } from './ui/Marquee';

export default function MarqueeSection({ isActive }: SlideProps) {
    const maestros = landingContent.maestros.list;
    const third = Math.ceil(maestros.length / 3);
    const firstRow = maestros.slice(0, third);
    const secondRow = maestros.slice(third, third * 2);
    const thirdRow = maestros.slice(third * 2);

    return (
        <section data-index="3" className="min-h-screen w-full flex flex-col items-center justify-center bg-background overflow-hidden relative py-20">
            <div className={`text-center mb-12 transition-all duration-1000 transform ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{landingContent.maestros.title}</h2>
                <p className="text-secondary max-w-2xl mx-auto px-4">{landingContent.maestros.subtitle}</p>
            </div>

            <div className={`w-full flex flex-col gap-8 transition-all duration-1000 delay-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                <Marquee pauseOnHover className="[--duration:40s]">
                    {firstRow.map((maestro, index) => (
                        <MaestroCard key={index} maestro={maestro} />
                    ))}
                </Marquee>

                <Marquee reverse pauseOnHover className="[--duration:40s]">
                    {secondRow.map((maestro, index) => (
                        <MaestroCard key={index} maestro={maestro} />
                    ))}
                </Marquee>

                <Marquee pauseOnHover className="[--duration:40s]">
                    {thirdRow.map((maestro, index) => (
                        <MaestroCard key={index} maestro={maestro} />
                    ))}
                </Marquee>
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background"></div>
        </section>
    );
}

function MaestroCard({ maestro }: { maestro: any }) {
    return (
        <div className="mx-4 flex items-center gap-4 bg-surface/50 border border-white/5 hover:border-white/20 hover:bg-surface p-4 rounded-xl backdrop-blur-sm transition-all cursor-pointer w-[300px]">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-white/10 text-white font-bold">
                {maestro.iniciales}
            </div>
            <div className="flex flex-col">
                <span className="text-white font-medium">{maestro.nombre}</span>
                <span className="text-xs text-secondary">{maestro.resumen}</span>
            </div>
        </div>
    );
}
