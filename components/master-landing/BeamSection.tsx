import React from 'react';
import { SlideProps } from '../types';
import { BorderBeam } from './ui/BorderBeam';
import { Library, MessageCircle, History } from 'lucide-react';
import { landingContent } from '@/data/landingContent';

export default function BeamSection({ isActive }: SlideProps) {
    const { features } = landingContent;
    const icons = [Library, MessageCircle, History];

    return (
        <section data-index="1" className="relative min-h-screen w-full flex flex-col items-center justify-center bg-background px-6 overflow-hidden py-20">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div className={`z-10 mb-12 text-center transition-all duration-1000 transform ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">{features.title}</h2>
                <p className="text-secondary max-w-2xl mx-auto">{features.subtitle}</p>
            </div>

            <div className="flex md:grid md:grid-cols-3 gap-6 z-10 max-w-6xl w-full overflow-x-auto md:overflow-visible snap-x snap-mandatory px-4 pb-4 md:pb-0 no-scrollbar">
                {features.items.map((item, index) => {
                    const Icon = icons[index];
                    return (
                        <div key={index} className={`relative h-80 min-w-[280px] md:min-w-0 rounded-xl border border-border bg-surface/50 backdrop-blur-sm p-8 flex flex-col items-center justify-center text-center transition-all duration-700 delay-${(index * 200) + 100} transform snap-center ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                            <div className="mb-6 rounded-full bg-white/5 p-4">
                                <Icon className="text-indigo-400" size={32} />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">{item.title}</h3>
                            <p className="text-sm text-secondary leading-relaxed">{item.description}</p>
                            <BorderBeam size={150} duration={12} delay={index * 3} colorFrom="#6366f1" colorTo="#a855f7" />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
