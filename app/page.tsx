"use client";

import HeroV2 from "@/components/landing-v2/HeroV2";
import PillarsSection from "@/components/landing-v2/PillarsSection";
import CommunityPreview from "@/components/landing-v2/CommunityPreview";
import BlogPreview from "@/components/landing-v2/BlogPreview";
import LibraryPreview from "@/components/landing-v2/LibraryPreview";
import WorkshopsSection from "@/components/landing-v2/WorkshopsSection";
import AnteSection from "@/components/landing-v2/AnteSection";
import PlansV2 from "@/components/landing-v2/PlansV2";
import FAQV2 from "@/components/landing-v2/FAQV2";
import FinalCTA from "@/components/landing-v2/FinalCTA";
import Footer from "@/components/landing-v3/Footer";

export default function HomePage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-white/20">
            <HeroV2 />
            <PillarsSection />
            <CommunityPreview />
            <BlogPreview />
            <LibraryPreview />
            <WorkshopsSection />
            <AnteSection />
            <PlansV2 />
            <FAQV2 />
            <FinalCTA />
            <Footer />
        </main>
    );
}
