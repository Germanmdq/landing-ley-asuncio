import React from 'react';

interface MarqueeProps {
    children: React.ReactNode;
    vertical?: boolean;
    repeat?: number;
    reverse?: boolean;
    pauseOnHover?: boolean;
    className?: string;
    duration?: number; // seconds
}

export const Marquee: React.FC<MarqueeProps> = ({
    children,
    vertical = false,
    repeat = 4,
    reverse = false,
    pauseOnHover = false,
    className = "",
    duration = 20,
}) => {
    return (
        <div
            className={`group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] ${vertical ? "flex-col" : "flex-row"
                } ${className}`}
        >
            {Array(repeat)
                .fill(0)
                .map((_, i) => (
                    <div
                        key={i}
                        style={{
                            '--duration': `${duration}s`,
                        } as React.CSSProperties}
                        className={`flex shrink-0 justify-around [gap:var(--gap)] ${vertical
                                ? "animate-marquee-vertical flex-col"
                                : "animate-marquee"
                            } ${reverse ? "[animation-direction:reverse]" : ""} ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
                            }`}
                    >
                        {children}
                    </div>
                ))}
        </div>
    );
};
