"use client";

import React from 'react';
import Hero from '@/components/landing-v3/Hero';
import Comparison from '@/components/landing-v3/Comparison';
import Included from '@/components/landing-v3/Included';
import HowItWorks from '@/components/landing-v3/HowItWorks';
import BibleStrong from '@/components/landing-v3/BibleStrong';
import Actionable from '@/components/landing-v3/Actionable';
import Devices from '@/components/landing-v3/Devices';
import Pricing from '@/components/landing-v3/Pricing';
import Unique from '@/components/landing-v3/Unique';
import Demo from '@/components/landing-v3/Demo';
import Testimonials from '@/components/landing-v3/Testimonials';
import FAQ from '@/components/landing-v3/FAQ';
import Footer from '@/components/landing-v3/Footer';

export default function LandingV3Page() {
    return (
        <main className="bg-black text-white selection:bg-primary/30 selection:text-primary-foreground overflow-x-hidden">
            <Hero />
            <Comparison />
            <Included />
            <HowItWorks />
            <BibleStrong />
            <Actionable />
            <Devices />
            <Pricing />
            <Unique />
            <Demo />
            <Testimonials />
            <FAQ />
            <Footer />
        </main>
    );
}
