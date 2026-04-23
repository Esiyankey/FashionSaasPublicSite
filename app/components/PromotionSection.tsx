"use client";

import Image from "next/image";

export default function PromotionSection() {
  return (
    <section className="w-full">
      {/* TOP HERO */}
      <div className="relative w-full h-[40px] md:h-[450px] overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/hero-image-4.jpg" // <-- replace with your image
          alt="Fashion woman"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          
       

          {/* Main Text */}
          <p className="text-white text-lg mb-2">Daily</p>
          <h2 className="text-white text-4xl md:text-6xl font-bold mb-3">
            Styles
          </h2>
          <p className="text-white/80 max-w-md text-sm md:text-base">
            Check our collection to prepare your daily style
          </p>

          {/* Side labels */}
          <span className="absolute left-6 bottom-20 text-xs text-orange-500">
            The Bag
          </span>

          <span className="absolute right-6 top-20 text-xs text-orange-500">
            The Midi Dress
          </span>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="bg-gray-100 px-6 md:px-16 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left */}
        <h3 className="text-2xl md:text-3xl font-semibold text-gray-900">
          Last previous <br /> collection
        </h3>

        {/* Right */}
        <div className="text-center md:text-left max-w-md">
          <p className="text-gray-600 mb-4 text-sm md:text-base">
            The last stock from the previous season, we still provide last
            season for those of you.
          </p>

          <button className="border border-gray-400 px-5 py-2 text-sm hover:bg-black hover:text-white transition">
            Show all collection →
          </button>
        </div>
      </div>
    </section>
  );
}