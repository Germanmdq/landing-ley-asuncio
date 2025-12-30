import React from 'react';

interface ShimmerTextProps {
    text: string;
    className?: string;
}

export const ShimmerText: React.FC<ShimmerTextProps> = ({ text, className = "" }) => {
    return (
        <span
            className={`inline-flex animate-background-shine bg-[linear-gradient(110deg,#939393,45%,#1e293b,55%,#939393)] bg-[length:250%_100%] bg-clip-text text-transparent ${className}`}
            style={{
                backgroundImage: 'linear-gradient(110deg, #555, 45%, #fff, 55%, #555)',
            }}
        >
            {text}
        </span>
    );
};
