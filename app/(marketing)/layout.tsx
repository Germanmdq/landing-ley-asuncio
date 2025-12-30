import Navbar from "@/components/ui/Navbar";

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative isolate min-h-screen flex flex-col overflow-x-clip">
            {/* Noise Overlay: atmósfera para marketing */}
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

            <div className="relative z-40">
                <Navbar />
            </div>

            <main className="relative flex-1">
                {children}
            </main>
        </div>
    );
}
