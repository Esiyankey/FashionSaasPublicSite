"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ShoppingCart, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import {
  categories,
  filterProducts,
  products,
  sortProducts,
  type Product,
  type ProductCategory,
  type ProductSortOption,
} from "@/app/lib/products-data";

const priceBounds: [number, number] = [0, 300];

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative mb-4 aspect-[3/4] overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {product.discount > 0 && (
            <div className="absolute left-4 top-4 bg-black px-2 py-1 text-[10px] font-bold uppercase tracking-tighter text-white">
              -{product.discount}%
            </div>
          )}
          <span className="absolute bottom-0 left-0 right-0 flex translate-y-full items-center justify-center gap-2 bg-white/95 py-3 text-[11px] font-bold uppercase tracking-widest transition-transform duration-300 group-hover:translate-y-0">
            <ShoppingCart className="size-3" />
            Add to Cart
          </span>
        </div>

        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            {product.category}
          </p>
          <h3 className="text-sm font-medium text-gray-900 group-hover:underline">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 pt-1">
            <span className="text-sm font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="col-span-full py-24 text-center">
      <p className="italic text-gray-400">No products match your current filters.</p>
      <button
        type="button"
        onClick={onReset}
        className="mt-4 text-sm font-bold uppercase tracking-widest text-amber-900 underline"
      >
        Reset all filters
      </button>
    </div>
  );
}

export function ShopCatalog() {
  const [priceRange, setPriceRange] = useState<[number, number]>(priceBounds);
  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>(["Women"]);
  const [sortBy, setSortBy] = useState<ProductSortOption>("featured");

  const filteredProducts = useMemo(() => {
    return sortProducts(filterProducts(products, selectedCategories, priceRange), sortBy);
  }, [priceRange, selectedCategories, sortBy]);

  const handleCategoryChange = (category: ProductCategory) => {
    if (category === "All") {
      setSelectedCategories([]);
      return;
    }

    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setPriceRange(priceBounds);
    setSortBy("featured");
  };

  return (
    <div className="flex flex-col gap-12 md:flex-row">
      <aside className="w-full shrink-0 md:w-56">
        <div className="sticky top-24">
          <h2 className="mb-8 text-sm font-bold uppercase tracking-wider">Filter Options</h2>

          <div className="mb-10 border-b border-gray-200 pb-8">
            <h3 className="mb-5 text-sm font-semibold">Category</h3>
            <div className="flex gap-3 overflow-x-auto md:flex-col md:overflow-visible">
              {categories.map((category) => (
                <label
                  key={category}
                  className="group flex cursor-pointer items-center gap-2 whitespace-nowrap"
                >
                  <input
                    type="checkbox"
                    checked={
                      category === "All"
                        ? selectedCategories.length === 0
                        : selectedCategories.includes(category)
                    }
                    onChange={() => handleCategoryChange(category)}
                    className="size-4 cursor-pointer border-gray-300 text-amber-900 focus:ring-amber-900"
                  />
                  <span className="text-sm text-gray-600 transition-colors group-hover:text-black">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="mb-5 text-sm font-semibold">Price Range</h3>
            <div className="space-y-2">
              <Slider
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as [number, number])}
                min={priceBounds[0]}
                max={priceBounds[1]}
                step={5}
                className="w-full"
                aria-label="Price range"
              />
              <div className="flex justify-between text-xs font-medium text-gray-500">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1">
        <div className="mb-10 flex flex-col gap-4 border-b border-gray-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm text-gray-500">{filteredProducts.length} Products Found</span>
            {selectedCategories.length > 0 && (
              <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
                {selectedCategories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryChange(category)}
                    className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-[10px] font-bold uppercase text-gray-800 transition-colors hover:bg-gray-200"
                    aria-label={`Remove ${category} filter`}
                  >
                    {category}
                    <X className="size-3" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <label className="flex items-center gap-2 text-sm font-semibold">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Sort By:
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as ProductSortOption)}
                className="appearance-none bg-transparent pr-6 text-sm font-semibold outline-none"
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2" />
            </div>
          </label>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <EmptyState onReset={handleReset} />
          )}
        </div>
      </div>
    </div>
  );
}
