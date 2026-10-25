import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Decorative SVG component for background swirl lines (warm aesthetic).
 */
const Swirls = () => (
  <>
    <svg
      className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 text-amber-500/10 pointer-events-none"
      width="600"
      height="600"
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M515.266 181.33C377.943 51.564 128.537 136.256 50.8123 293.565C-26.9127 450.874 125.728 600 125.728 600"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
    <svg
      className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 text-emerald-500/10 pointer-events-none"
      width="700"
      height="700"
      viewBox="0 0 700 700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M26.8838 528.274C193.934 689.816 480.051 637.218 594.397 451.983C708.742 266.748 543.953 2.22235 543.953 2.22235"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  </>
);

export function FloatingFoodHero({
  title,
  description,
  images = [],
  className,
  badge,
  actions
}) {
  return (
    <section
      className={cn(
        'relative w-full min-h-[50vh] flex items-center justify-center overflow-hidden py-12 md:py-20 rounded-[32px] bg-gradient-to-b from-stone-900/90 via-stone-950 to-stone-950 border border-stone-800 shadow-2xl backdrop-blur-xl',
        className
      )}
    >
      <div className="absolute inset-0 z-0">
        <Swirls />
      </div>
      
      {/* 3D Floating Food Assets with dynamic parallax floating */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className={cn('absolute object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.7)] transition-all', image.className)}
            style={{ 
              animationDelay: `${index * 350}ms`, 
              animationDuration: `${4 + index * 0.8}s` 
            }}
          />
        ))}
      </div>

      {/* Hero Text & Controls */}
      <div className="relative z-20 container mx-auto px-4 text-center max-w-3xl space-y-5">
        {badge && (
          <div className="flex justify-center">
            {badge}
          </div>
        )}

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-stone-100 leading-tight">
          {title}
        </h1>
        
        <p className="text-sm sm:text-base md:text-lg leading-relaxed text-stone-300 max-w-2xl mx-auto font-normal">
          {description}
        </p>

        {actions && (
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            {actions}
          </div>
        )}
      </div>
    </section>
  );
}

export default FloatingFoodHero;
