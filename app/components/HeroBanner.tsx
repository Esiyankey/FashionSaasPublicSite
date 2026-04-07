'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export function Hero() {
  return (
    <section
      className="min-h-screen bg-cover bg-right relative overflow-hidden"
      style={{
        backgroundImage:
          'url(/images/hero-image-1.jpg)',
      }}
    >
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-linear-to-r from-gray-50 via-gray-50/95 to-transparent"></div>

      

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="pt-10 lg:pt-0">
            {/* Badge */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-amber-700 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-amber-400 rounded-full" />
              </div>
              <span className="text-gray-700 text-sm font-medium">50% OFF Summer Super Sale</span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Step into Style: Your Ultimate Fashion Destination
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-lg mb-8 max-w-md leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            </p>

            {/* CTA Button */}
            <button className="bg-amber-900 hover:bg-amber-950 text-white px-8 py-3 font-semibold flex items-center gap-2 transition-colors">
              Shop Now
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Right - Decorative elements overlay */}
          
        </div>
      </div>
    </section>
  );
}
