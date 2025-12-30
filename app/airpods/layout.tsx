import React from 'react';
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "AirPods - Apple (LA)",
    description: "De su fácil configuración al audio de alta calidad, los AirPods brindan una experiencia inalámbrica inigualable.",
    icons: {
        icon: 'https://www.apple.com/favicon.ico',
    },
};

export default function AirPodsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-white text-[#1d1d1f] min-h-screen font-sans antialiased selection:bg-[#0071e3] selection:text-white overflow-x-hidden">
            {/* 
        This div wraps the page content and forces white background + dark text,
        overriding the global dark nebula theme from app/globals.css 
      */}
            <style>{`
        /* Force override body/html backgrounds for this route if needed, 
           though the div wrapper usually suffices if it covers the viewport.
           We add !important to ensure we kill the galaxy background.
        */
        body {
           background: #ffffff !important;
           background-image: none !important;
           color: #1d1d1f !important;
        }
      `}</style>
            {children}
        </div>
    );
}
