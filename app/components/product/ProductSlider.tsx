"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Maximize2,
  ShoppingBag,
  Star,
} from "lucide-react";
import { categories, featuredProducts } from "../../lib/products-data";

export function ProductSlider() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) {
      return;
    }

    sliderRef.current.scrollBy({
      left: direction === "left" ? -340 : 340,
      behavior: "smooth",
    });
  };

  const filteredProducts =
    selectedCategory === "All"
      ? featuredProducts
      : featuredProducts.filter((product) => product.category === selectedCategory);

  return (
    <section className="overflow-hidden bg-white px-4 py-12 md:px-6">
      <div>
        <div className="mb-8 md:px-6">
          <p className="text-sm uppercase tracking-wide text-gray-500">Our Products</p>
          <div className="flex flex-col items-center justify-between md:flex-row">
            <h2 className="mt-2 text-4xl font-bold text-gray-900">Our Top Seller Products</h2>

            <div className="no-scrollbar my-2 flex items-center justify-between overflow-x-auto pl-6 md:my-0 md:px-6">
              <div className="flex gap-2 pb-2 md:pb-0">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`whitespace-nowrap rounded-full border px-6 py-2 text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? "border-gray-900 bg-gray-900 text-white shadow-md"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="group/main relative px-0 md:px-6">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="absolute -left-2 top-[40%] z-20 hidden -translate-y-1/2 rounded-full border border-gray-100 bg-white p-3 text-gray-800 shadow-xl transition-all hover:bg-gray-50 md:flex"
            aria-label="Previous products"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            ref={sliderRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-6"
          >
            {filteredProducts.map((product) => (
              <article key={product.id} className="w-[280px] shrink-0 snap-start md:w-[320px]">
                <Link href={`/products/${product.id}`} className="block">
                  <div className="group/image relative aspect-[4/5] overflow-hidden bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 280px, 320px"
                      className="object-cover transition-transform duration-700 group-hover/image:scale-110"
                    />

                    <div className="absolute left-4 top-4 bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-900 shadow-sm backdrop-blur-sm">
                      {product.discount}% OFF
                    </div>

                    <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-300 group-hover/image:opacity-100" />

                    <div className="absolute right-4 top-4 flex translate-x-4 flex-col gap-2 opacity-0 transition-all duration-300 group-hover/image:translate-x-0 group-hover/image:opacity-100">
                      <IconButton label="Save item" icon={<Heart size={18} />} />
                      <IconButton label="Quick view" icon={<Maximize2 size={18} />} />
                      <IconButton label="Add to cart" icon={<ShoppingBag size={18} />} />
                    </div>
                  </div>

                  <div className="px-1 pt-4">
                    <p className="mb-1 text-xs uppercase tracking-widest text-gray-400">
                      {product.category}
                    </p>
                    <h3 className="mb-2 truncate text-base font-semibold text-gray-800">
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
                        <Star size={14} className="fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-gray-700">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scroll("right")}
            className="absolute -right-2 top-[40%] z-20 hidden -translate-y-1/2 rounded-full border border-gray-100 bg-white p-3 text-gray-800 shadow-xl transition-all hover:bg-gray-50 md:flex"
            aria-label="Next products"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

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

function IconButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="rounded-full bg-white p-2.5 text-gray-700 shadow-lg transition-colors hover:bg-gray-900 hover:text-white"
    >
      {icon}
    </button>
  );
}
