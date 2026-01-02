import React from 'react';
import { ShimmerText } from './ui/ShimmerText';
import { landingContent } from '@/data/landingContent';
import { SlideProps } from './types';
import { MoveDown, ArrowRight, Github } from 'lucide-react';

export default function HeroSection({ isActive }: SlideProps) {
    return (
        <section data-index="0" className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background py-20">

            {/* 1. Dynamic Background Layer */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                {/* Grid Pattern with Fade Mask */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

                {/* Moving Blobs */}
                <div className={`absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob transition-transform duration-1000 ${isActive ? 'scale-100' : 'scale-50'}`}></div>
                <div className={`absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 transition-transform duration-1000 ${isActive ? 'scale-100' : 'scale-50'}`}></div>
                <div className={`absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 transition-transform duration-1000 ${isActive ? 'scale-100' : 'scale-50'}`}></div>
            </div>

            {/* 2. Content Container */}
            <div className="z-10 text-center max-w-5xl px-6 relative">

                {/* Badge / Pill */}
                <div className={`flex justify-center mb-8 transition-all duration-1000 delay-100 transform ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.03] px-3 py-1 text-sm text-secondary backdrop-blur-md hover:border-white/10 hover:bg-white/[0.05] transition-colors cursor-pointer group">
                        <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                        <span className="font-medium bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent">v2.0 Now Available</span>
                        <ArrowRight size={14} className="text-white/30 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                </div>

                {/* Main Title */}
                <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/50 mb-8 transition-all duration-1000 delay-300 transform ${isActive ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'}`}>
                    {landingContent.hero.title.split(' ').slice(0, 2).join(' ')} <br className="hidden md:block" />
                    {landingContent.hero.title.split(' ').slice(2).join(' ')}
                </h1>

                {/* Subtitle */}
                <p className={`text-lg md:text-xl text-secondary max-w-2xl mx-auto mb-10 leading-relaxed font-light transition-all duration-1000 delay-500 transform ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {landingContent.hero.subtitle}
                </p>

                {/* CTA Buttons */}
                <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-700 transform ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-white px-8 font-medium text-black transition-all hover:bg-gray-200 hover:scale-105 active:scale-95">
                        <span className="mr-2">{landingContent.hero.ctaPrimary}</span>
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
                    </button>

                    <button className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 font-medium text-white transition-all hover:bg-white/10 hover:scale-105 active:scale-95 backdrop-blur-sm">
                        <span>{landingContent.hero.ctaSecondary}</span>
                    </button>
                </div>
                {/* Footer Scroll Hint */}
                <div className={`absolute -bottom-32 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 transform ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
                    <ShimmerText text="SCROLL TO EXPLORE" className="text-[10px] font-bold tracking-[0.2em] text-white/40" />
                    <MoveDown className="mx-auto mt-4 text-white/20 animate-bounce" size={16} />
                </div>
            </div>
        </section>
    );
}
