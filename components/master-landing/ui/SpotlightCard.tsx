import React, { useRef, useState, useCallback } from 'react';

interface SpotlightCardProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, className = "", style = {} }) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }, []);

    const handleMouseEnter = useCallback(() => {
        setOpacity(1);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setOpacity(0);
    }, []);

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative rounded-xl border border-border bg-surface overflow-hidden ${className}`}
            style={style}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`,
                }}
            />
            {/* Border Highlight */}
            <div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 z-10"
                style={{
                    opacity,
                    background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.15), transparent 40%)`,
                    maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
                    maskComposite: 'exclude',
                    WebkitMaskComposite: 'xor', // For Safari
                }}
            />
            <div className="relative h-full">{children}</div>
        </div>
    );
};
