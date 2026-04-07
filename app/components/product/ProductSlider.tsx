"use client";

import { useState, useRef } from "react";
import {
  Heart,
  Maximize2,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import { products, categories } from "../../lib/products-data";
import Image from "next/image"; // Switched to Next.js Image for optimization

export function ProductSlider() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = 340;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.productType === selectedCategory);

  return (
    <section className="bg-white py-12 px-4 md:px-6 overflow-hidden">
      <div>
        {/* Header Section */}
        <div className="mb-8  md:text-left md:px-6">
          <p className="text-gray-500 text-sm uppercase tracking-wide">
            Our Products
          </p>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h2 className="text-4xl font-bold text-gray-900 mt-2">
              Our Top Seller Products
            </h2>

            {/* Improved Mobile Tabs (Scrollable Pills) */}
            <div className="flex items-center justify-between pl-6 md:px-6 my-2 md:my-0 overflow-x-auto no-scrollbar">
              <div className="flex gap-2 pb-2 md:pb-0">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 border ${
                      selectedCategory === category
                        ? "bg-gray-900 border-gray-900 text-white shadow-md"
                        : "bg-white border-gray-200 text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Slider Area */}
        <div className="relative group/main px-0 md:px-6">
          {/* Navigation Arrows (Desktop Only) */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute -left-2 top-[40%] -translate-y-1/2 z-20 p-3 rounded-full bg-white shadow-xl text-gray-800 hover:bg-gray-50 transition-all border border-gray-100"
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Slider - no-scrollbar class removes the bar */}
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-6 snap-x snap-mandatory"
          >
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="shrink-0 w-[280px] md:w-[320px] snap-start"
              >
                {/* Product Image Container - HOVER TRIGGER HERE */}
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 group/image">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover/image:scale-110"
                  />

                  {/* Discount Badge */}

                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-amber-900 px-2.5 py-1  text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    {product.discount}% OFF
                  </div>

                  {/* Icons: Only show when hovering /image container */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />

                  <div className="absolute right-4 top-4 flex flex-col gap-2 translate-x-4 opacity-0 group-hover/image:translate-x-0 group-hover/image:opacity-100 transition-all duration-300">
                    <IconButton icon={<Heart size={18} />} />
                    <IconButton icon={<Maximize2 size={18} />} />
                    <IconButton icon={<ShoppingBag size={18} />} />
                  </div>
                </div>

                {/* Product Info */}
                <div className="pt-4 px-1">
                  <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">
                    {product.category}
                  </p>
                  <h3 className="text-base font-semibold text-gray-800 truncate mb-2">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star
                        size={14}
                        className="fill-amber-400 text-amber-400"
                      />
                      <span className="text-xs font-bold text-gray-700">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute -right-2 top-[40%] -translate-y-1/2 z-20 p-3 rounded-full bg-white shadow-xl text-gray-800 hover:bg-gray-50 transition-all border border-gray-100"
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Internal CSS for removing scrollbar */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

// Reusable Icon Button Component
function IconButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="bg-white p-2.5 rounded-full text-gray-700 hover:bg-gray-900 hover:text-white transition-colors shadow-lg">
      {icon}
    </button>
  );
}
