"use client";

import LusionHero from "@/components/landing-v2/LusionHero";
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
import { LusionMenu } from "@/components/ui/LusionMenu";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import RevealText from "@/components/animations/RevealText";
import ProjectsSection from "@/components/lusion/ProjectsSection";

export default function HomePage() {
    // Activar scroll suave
    useSmoothScroll();

    return (
        <>
            {/* Cursor personalizado */}
            <CustomCursor />

            {/* Menú overlay estilo Lusion */}
            <LusionMenu />

            <main className="min-h-screen bg-[#f5f5f5] text-black selection:bg-purple-200">
                <LusionHero />

                {/* Sección "Beyond Visions" con RevealText */}
                <section className="min-h-screen bg-white flex items-center justify-center px-6 md:px-10 py-20">
                    <div className="max-w-6xl">
                        <RevealText className="text-black text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter">
                            Expandí tu mente con práctica real
                        </RevealText>
                        <div className="mt-10 text-gray-600 text-lg md:text-xl max-w-2xl">
                            <RevealText>
                                El Club de la Imaginación es tu espacio para sostener el estado mental óptimo a través de biblioteca curada, comunidad activa y un tutor IA personalizado
                            </RevealText>
                        </div>
                    </div>
                </section>

                {/* Sección de proyectos con scroll horizontal estilo Lusion */}
                <ProjectsSection />

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
        </>
    );
}
