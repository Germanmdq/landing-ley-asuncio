import React from 'react';

interface BorderBeamProps {
    duration?: number;
    borderWidth?: number;
    size?: number;
    colorFrom?: string;
    colorTo?: string;
    delay?: number;
}

export const BorderBeam: React.FC<BorderBeamProps> = ({
    duration = 15,
    borderWidth = 1.5,
    size = 300,
    colorFrom = '#ffaa40',
    colorTo = '#9c40ff',
    delay = 0,
}) => {
    return (
        <div
            style={
                {
                    '--duration': duration,
                    '--anchor': 90,
                    '--border-width': borderWidth,
                    '--color-from': colorFrom,
                    '--color-to': colorTo,
                    '--delay': delay,
                    '--size': size,
                } as React.CSSProperties
            }
            className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
        >
            <div
                className="absolute aspect-square inset-0 h-full w-full animate-border-beam bg-[conic-gradient(from_calc(var(--anchor)*1deg),var(--color-from),var(--color-to),transparent_calc(var(--size)*1deg))] [offset-anchor:calc(var(--anchor)*1deg)_50%] [offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]"
            />
        </div>
    );
};
