'use client';

import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const hideCursor = () => setIsVisible(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseleave', hideCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseleave', hideCursor);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 w-4 h-4 bg-black rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-100 ease-out"
      style={{
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
      }}
    />
  );
};
