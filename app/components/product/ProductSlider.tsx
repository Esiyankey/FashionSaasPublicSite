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
import { useFeaturedProducts } from "@/hooks/queries/useFeaturedProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/currency";

export function ProductSlider() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const sliderRef = useRef<HTMLDivElement>(null);
  const { data: featuredProducts = [], isLoading } = useFeaturedProducts();
  const productCategories = [...new Set(featuredProducts.map((product) => product.category))];

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
    <section className="overflow-hidden bg-white px-6 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-wide text-gray-500">Our Products</p>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              Our Top Seller Products
            </h2>

            <div className="no-scrollbar -mx-1 overflow-x-auto">
              <div className="flex gap-2 px-1 pb-2 md:pb-0">
                {["All", ...productCategories].map((category) => (
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

        <div className="group/main relative">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="absolute -left-4 top-[38%] z-20 hidden -translate-y-1/2 rounded-full border border-gray-100 bg-white p-3 text-gray-800 shadow-xl transition-all hover:bg-gray-50 lg:flex"
            aria-label="Previous products"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            ref={sliderRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-6 sm:gap-6"
          >
            {isLoading &&
              Array.from({ length: 4 }, (_, index) => (
                <div key={index} className="w-[280px] shrink-0 md:w-[320px]">
                  <Skeleton className="aspect-4/5 w-full" />
                </div>
              ))}
            {filteredProducts.map((product) => (
              <article key={product.id} className="w-[280px] shrink-0 snap-start md:w-[320px]">
                <Link href={`/products/${product.slug}`} className="block">
                  <div className="group/image relative aspect-[4/5] overflow-hidden bg-gray-100">
                    {product.image && <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 280px, 320px"
                      className="object-cover transition-transform duration-700 group-hover/image:scale-110"
                    />}

                    {product.discount > 0 && <div className="absolute left-4 top-4 bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm backdrop-blur-sm">
                      {product.discount}% OFF
                    </div>}

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
                          {formatCurrency(product.price, product.currency)}
                        </span>
                        {product.originalPrice !== null && product.originalPrice > product.price && <span className="text-sm text-gray-400 line-through">
                          {formatCurrency(product.originalPrice, product.currency)}
                        </span>}
                      </div>
                      {product.rating !== null && <div className="flex items-center gap-1">
                        <Star size={14} className="fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-gray-700">{product.rating}</span>
                      </div>}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scroll("right")}
            className="absolute -right-4 top-[38%] z-20 hidden -translate-y-1/2 rounded-full border border-gray-100 bg-white p-3 text-gray-800 shadow-xl transition-all hover:bg-gray-50 lg:flex"
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
