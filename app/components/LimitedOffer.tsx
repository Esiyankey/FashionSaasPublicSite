'use client';

import { ArrowRight } from 'lucide-react';

export function LimitedOffer() {
  return (
    <section
      className="min-h-screen bg-cover bg-left relative overflow-hidden flex items-center"
      style={{
        backgroundImage:
          'url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gn0xST26bmY1NlGY5ce57xI7HFRjdg.png)',
      }}
    >
      {/* Overlay gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-50/90 to-gray-50"></div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image is background */}
          <div className="hidden lg:block" />

          {/* Right - Content */}
          <div className="py-10 lg:py-0">
            {/* Label */}
            <p className="text-gray-600 text-sm font-medium mb-4 uppercase tracking-wide">
              Limited Time Offers
            </p>

            {/* Heading */}
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              25% Off All Fashion Favorites - Limited Time!
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-lg mb-8 max-w-md leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            </p>

            {/* CTA Button */}
            <button className="bg-amber-900 hover:bg-amber-950 text-white px-8 py-3 font-semibold flex items-center gap-2 transition-colors">
              Shop Now
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
