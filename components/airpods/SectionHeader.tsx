import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
    title: string;
    className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    className
}) => {
    return (
        <h2 className={cn("text-4xl md:text-6xl lg:text-[80px] font-semibold tracking-tight text-[#1d1d1f] leading-tight mb-12", className)}>
            {title}
        </h2>
    );
};
