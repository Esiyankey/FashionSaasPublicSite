"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { ProductCard } from "@/components/shared/ProductCard";
import { ProductCardSkeleton } from "@/components/shared/ProductCardSkeleton";
import { useProducts } from "@/hooks/queries/useProducts";
import { getProductFilters } from "@/services/product.service";
import { getCategories } from "@/services/category.service";
import { categoryKeys } from "@/services/queries/query-keys";
import type { ProductCategory, ProductSortOption } from "@/types/product";

export function ShopCatalog({ initialCategory }: { initialCategory?: string }) {
  const [priceRange, setPriceRange] = useState<[number, number] | undefined>();
  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>(initialCategory ? [initialCategory] : ["women"]);
  const [sortBy, setSortBy] = useState<ProductSortOption>("featured");
  const { data: categories = [] } = useQuery({ queryKey: categoryKeys.all, queryFn: getCategories });
  const { data: filters } = useQuery({ queryKey: ["product-filters"], queryFn: getProductFilters });

  const { data: products = [], isLoading } = useProducts({
    categories: selectedCategories,
    priceRange: priceRange ?? (filters ? [0, Math.max(1, filters.priceRange.max)] : undefined),
    sortBy,
  });

  const handleCategoryChange = (category: ProductCategory) => {
    setSelectedCategories((current) =>
      current.includes(category) ? current.filter((item) => item !== category) : [...current, category],
    );
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setPriceRange(undefined);
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
              <label className="group flex cursor-pointer items-center gap-2 whitespace-nowrap">
                <input type="checkbox" checked={selectedCategories.length === 0} onChange={() => setSelectedCategories([])} className="size-4 cursor-pointer border-gray-300 text-amber-900 focus:ring-amber-900" />
                <span className="text-sm text-gray-600 transition-colors group-hover:text-black">All</span>
              </label>
              {categories.filter((category) => category.parentId === null).map((category) => (
                <label
                  key={category.id}
                  className="group flex cursor-pointer items-center gap-2 whitespace-nowrap"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.slug)}
                    onChange={() => handleCategoryChange(category.slug)}
                    className="size-4 cursor-pointer border-gray-300 text-amber-900 focus:ring-amber-900"
                  />
                  <span className="text-sm text-gray-600 transition-colors group-hover:text-black">
                    {category.title}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="mb-5 text-sm font-semibold">Price Range</h3>
            <div className="space-y-2">
              <Slider
                value={priceRange ?? [0, Math.max(1, filters?.priceRange.max ?? 1)]}
                onValueChange={(value) => setPriceRange(value as [number, number])}
                min={0}
                max={Math.max(1, filters?.priceRange.max ?? 1)}
                step={Math.max(1, Math.round((filters?.priceRange.max ?? 1) / 100))}
                className="w-full"
                aria-label="Price range"
              />
              <div className="flex justify-between text-xs font-medium text-gray-500">
                <span>${(priceRange ?? [0, filters?.priceRange.max ?? 0])[0]}</span>
                <span>${(priceRange ?? [0, filters?.priceRange.max ?? 0])[1]}</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1">
        <div className="mb-10 flex flex-col gap-4 border-b border-gray-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm text-gray-500">{products.length} Products Found</span>
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
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Sort By:</span>
            <div className="relative">
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value as ProductSortOption)} className="appearance-none bg-transparent pr-6 text-sm font-semibold outline-none" aria-label="Sort products">
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="name-asc">Name</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2" />
            </div>
          </label>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading ? (
            Array.from({ length: 8 }, (_, index) => <ProductCardSkeleton key={index} />)
          ) : products.length > 0 ? (
            products.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <div className="col-span-full py-24 text-center">
              <p className="italic text-gray-400">No products match your current filters.</p>
              <button type="button" onClick={handleReset} className="mt-4 text-sm font-bold uppercase tracking-widest text-amber-900 underline">Reset all filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
