import React from 'react';
import { SlideProps } from './types';
import { SpotlightCard } from './ui/SpotlightCard';
import { landingContent } from '@/data/landingContent';
import { UserCheck, BookOpen, Save, Map } from 'lucide-react';

export default function SpotlightSection({ isActive }: SlideProps) {
    const { beneficios } = landingContent;
    const icons = [UserCheck, BookOpen, Save, Map];

    return (
        <section
            data-index="2"
            className="min-h-screen w-full flex flex-col items-center justify-center bg-background relative px-4 py-20"
        >
            <div className={`text-center mb-12 transition-all duration-1000 transform ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{beneficios.title}</h2>
            </div>

            <div className={`max-w-6xl w-full flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 no-scrollbar transition-all duration-1000 delay-300 ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}>
                {beneficios.items.map((item, index) => {
                    const Icon = icons[index];
                    return (
                        <div key={index} className="min-w-[280px] md:min-w-0 h-full snap-center">
                            <SpotlightCard className="p-8 h-full flex flex-col items-center text-center group hover:border-indigo-500/50 transition-colors">
                                <div className="mb-6 p-4 rounded-full bg-white/5 group-hover:bg-indigo-500/10 transition-colors">
                                    <Icon className="text-indigo-400 group-hover:text-indigo-300 transition-colors" size={32} />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-4">{item.title}</h3>
                                <p className="text-secondary text-sm leading-relaxed">{item.description}</p>
                            </SpotlightCard>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
