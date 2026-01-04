import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
    title: "El Club de la Imaginación",
    description: "Un espacio completo para acompañarte: práctica, biblioteca, comunidad y un tutor disponible cuando lo necesitás.",
};


// ... (imports)

import Navbar from "@/components/ui/Navbar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className="dark">
            <body className="bg-background text-text min-h-screen antialiased overflow-x-hidden overscroll-x-none font-sans">
                <AuthProvider>
                    {/* isolate = mezcla controlada + pila más predecible */}
                    <div className="relative isolate flex min-h-screen flex-col overflow-x-clip">

                        {/* Noise Overlay: tiene que ser “atmósfera”, no “techo” */}
                        <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-overlay">
                            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                <filter id="noiseFilter">
                                    <feTurbulence
                                        type="fractalNoise"
                                        baseFrequency="0.65"
                                        numOctaves="3"
                                        stitchTiles="stitch"
                                    />
                                </filter>
                                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                            </svg>
                        </div>

                        {/* Navbar arriba del contenido */}
                        <div className="relative z-40">
                            <Navbar />
                        </div>

                        {/* Importante: NO le pongas z-index al main */}
                        <main className="relative flex-1">
                            {children}
                        </main>

                        {/* Root para portales */}
                        <div id="portal-root" />
                    </div>
                </AuthProvider>
            </body>
        </html>
    );
}
