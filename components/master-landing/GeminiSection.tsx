import React from 'react';
import { SlideProps } from '../types';
import { landingContent } from '@/data/landingContent';
import ChatInterface from '@/components/dashboard/ChatInterface';
import Sidebar from '@/components/dashboard/Sidebar';

export default function GeminiSection({ isActive }: SlideProps) {
    const { dashboard } = landingContent;

    return (
        <section data-index="4" className="min-h-screen w-full flex flex-col items-center justify-center bg-background px-4 relative overflow-hidden py-20">
            {/* Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className={`w-full max-w-[90rem] h-[85vh] flex flex-col transition-all duration-1000 transform ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {/* Header Text */}
                <div className="text-center mb-6 flex-shrink-0 px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{dashboard.title}</h2>
                    <p className="text-secondary max-w-2xl mx-auto text-sm">{dashboard.subtitle}</p>
                </div>

                {/* Dashboard Demo Card (Browser Window) */}
                <div className="flex-1 relative bg-surface border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl flex flex-col">
                    {/* Fake Browser Header */}
                    <div className="h-10 border-b border-white/10 bg-white/5 flex items-center px-4 gap-2 flex-shrink-0">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        </div>
                        <div className="flex-1 text-center text-xs text-white/30 font-mono">dashboard.neville.ai</div>
                    </div>

                    {/* Dashboard Layout Simulation */}
                    <div className="flex-1 flex overflow-hidden">
                        {/* Real Sidebar in Demo Mode */}
                        <Sidebar isDemo={true} />

                        {/* Main Content Area */}
                        <div className="flex-1 flex flex-col bg-background/50 relative">
                            {/* Simulated Header */}
                            <header className="h-14 border-b border-white/10 flex items-center justify-between px-4 bg-surface/30 backdrop-blur-md">
                                <div className="font-medium text-white">Probar el Sistema</div>
                                <div className="flex items-center gap-2 text-xs text-green-400">
                                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                    Online
                                </div>
                            </header>

                            {/* Real Chat Interface */}
                            <div className="flex-1 overflow-hidden relative">
                                <ChatInterface />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
