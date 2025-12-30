import React from 'react';
import Image from 'next/image';
import { Button } from './Button';

interface ProductCardProps {
    title: string;
    subtitle?: string;
    imageSrc: string;
    price?: string;
    learnMoreLink: string;
    buyLink: string;
    features?: string[];
    isNew?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    title,
    subtitle,
    imageSrc,
    learnMoreLink,
    buyLink,
    features,
    isNew
}) => {
    return (
        <div className="flex flex-col items-center text-center p-6 group">
            <div className="h-[200px] md:h-[300px] w-full relative mb-8 flex items-end justify-center">
                {/* Placeholder for image if external not allowed, but we try standard img first */}
                {/* using standard img tag for external URLs to avoid NEXT config issues for now, or use next/image if configured */}
                <img
                    src={imageSrc}
                    alt={title}
                    className="object-contain max-h-full max-w-full drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {isNew && (
                <span className="text-[#bf4800] text-xs font-semibold mb-2 uppercase tracking-wide">Nuevo</span>
            )}

            <h3 className="text-2xl md:text-3xl font-semibold text-[#1d1d1f] mb-2">{title}</h3>
            {subtitle && (
                <p className="text-base md:text-lg text-[#1d1d1f] mb-6 max-w-[250px] mx-auto">{subtitle}</p>
            )}

            <div className="flex flex-col gap-3 mb-8 w-full items-center">
                <Button href={buyLink}>Comprar</Button>
                <Button href={learnMoreLink} variant="link">Más información</Button>
            </div>

            {features && features.length > 0 && (
                <div className="mt-4 border-t border-gray-200 pt-8 w-full">
                    <ul className="space-y-6">
                        {features.map((feature, idx) => (
                            <li key={idx} className="text-sm md:text-[15px] font-medium text-[#1d1d1f]">
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
