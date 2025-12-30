"use client";

import React from 'react';
import ClubHero from '@/components/landing-club/ClubHero';
import TwoAMSection from '@/components/landing-club/TwoAMSection';
import AnteTeaser from '@/components/landing-club/AnteTeaser';
import HomePlans from '@/components/landing-club/HomePlans';
import Footer from '@/components/landing-v3/Footer'; // Reusing existing footer

export default function HomePage() {
    return (
        <main className="min-h-screen bg-background text-white selection:bg-primary/30">
            <ClubHero />
            <TwoAMSection />
            <AnteTeaser />
            <HomePlans />

            {/* Simple Divider for transparency */}
            <div className="py-12 text-center text-text-muted text-sm">
                <p>El Club de la Imaginación — 2025</p>
                <p>Un espacio para la práctica real de la Ley.</p>
            </div>

            <Footer />
        </main>
    );
}
