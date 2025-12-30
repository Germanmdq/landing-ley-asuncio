import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps {
  href: string;
  variant?: 'primary' | 'link';
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  href,
  variant = 'primary',
  className,
  children
}) => {
  const baseStyles = "inline-flex items-center justify-center transition-colors duration-200 group/button";

  const variants = {
    primary: "bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full px-[22px] py-[8px] text-[17px] font-normal tracking-tight transition-all",
    link: "text-[#0066cc] hover:underline hover:text-[#004499] text-[17px] md:text-[21px] font-normal tracking-tight transition-colors"
  };

  return (
    <Link
      href={href}
      className={cn(baseStyles, variants[variant], className)}
    >
      {children}
      {variant === 'link' && (
        <span className="ml-[6px] text-[14px] leading-none mb-[1px] font-semibold transition-transform duration-200 group-hover/button:translate-x-0.5">›</span>
      )}
    </Link>
  );
};
