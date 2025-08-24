"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface HeroFigureProps {
  className?: string;
}

export default function HeroFigure({ className = "" }: HeroFigureProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading animation
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* 3D Action Figure - Clean and minimal */}
      <div className="relative w-24 h-32">
        {/* Main figure container */}
        <div className={`relative w-full h-full`}>
          {/* Your 3D Action Figure Image */}
          <div className="absolute inset-0 flex items-end justify-center">
            <Image
              src="/images/hero-figure.png"
              alt="Guillaume Odier Action Figure"
              width={96}
              height={128}
              className="w-full h-full object-contain transform rotate-2 hover:rotate-0 transition-transform duration-300"
              priority={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
