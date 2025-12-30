"use client";

import React from "react";
import Hero from "@/components/landing-v3/Hero";
import WhatIsIt from "@/components/landing-v3/WhatIsIt";
import HowItWorks from "@/components/landing-v3/HowItWorks";
import Included from "@/components/landing-v3/Included";
import Unique from "@/components/landing-v3/Unique";
import Comparison from "@/components/landing-v3/Comparison";
import UseCases from "@/components/landing-v3/UseCases";
import BibleStrong from "@/components/landing-v3/BibleStrong";
import Devices from "@/components/landing-v3/Devices";
import Demo from "@/components/landing-v3/Demo";
import Pricing from "@/components/landing-v3/Pricing";
import FAQ from "@/components/landing-v3/FAQ";
import Actionable from "@/components/landing-v3/Actionable";
import Footer from "@/components/landing-v3/Footer";

export default function HomePage() {
    return (
        <main className="min-h-screen bg-background text-white selection:bg-primary/30">
            <Hero />
            <WhatIsIt />
            <HowItWorks />
            <Included />
            <Unique />
            <Comparison />
            <UseCases />
            <BibleStrong />
            <Devices />
            <Demo />
            <Pricing />
            <FAQ />
            <Actionable />
            <Footer />
        </main>
    );
}
