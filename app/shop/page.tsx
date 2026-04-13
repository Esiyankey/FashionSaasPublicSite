"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ShoppingCartIcon, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { products, type Product } from "../lib/products-data";

const categories = ["All", "Men", "Women", "Accessories"];

export default function ProductPage() {
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Women"]);
  const [sortBy, setSortBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);

  // ✅ SIMULATE LOADING ON MOUNT
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // ✅ FILTER LOGIC
  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    const priceMatch =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    return categoryMatch && priceMatch;
  });

  const handleCategoryChange = (cat: string) => {
    if (cat === "All") {
      setSelectedCategories([]);
    } else {
      setSelectedCategories((prev) => {
        const isSelected = prev.includes(cat);
        return isSelected ? prev.filter((c) => c !== cat) : [...prev, cat];
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      {/* Header */}
      <header className="bg-gray-200 border-b">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">All Products</h1>
          <nav className="flex justify-center gap-4 text-xs uppercase tracking-widest text-gray-500">
            <span>Home</span>
            <span>/</span>
            <span>Shop</span>
          </nav>
        </div>
      </header>

      <main className="max-w-[85rem] mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full md:w-56 shrink-0">
            <div className="sticky top-24">
              <h2 className="text-sm font-bold uppercase tracking-wider mb-8">Filter Options</h2>

              {/* CATEGORY FILTER */}
              <div className="mb-10 pb-8 border-b border-gray-200">
                <h3 className="font-semibold text-sm mb-5">Category</h3>
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={cat === "All" ? selectedCategories.length === 0 : selectedCategories.includes(cat)}
                        onChange={() => handleCategoryChange(cat)}
                        className="w-4 h-4 rounded border-gray-300 text-amber-900 focus:ring-amber-900 cursor-pointer"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-black transition-colors">
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* PRICE FILTER */}
              <div className="mb-8">
                <h3 className="font-semibold text-sm mb-5">Price Range</h3>
                <div className="space-y-6">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={300}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs font-medium text-gray-500">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <div className="flex-1">
            {/* TOOLBAR */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-sm text-gray-500">
                  {isLoading ? "Fetching items..." : `${filteredProducts.length} Products Found`}
                </span>

                {!isLoading && selectedCategories.length > 0 && (
                  <div className="flex gap-2 items-center border-l pl-4 border-gray-200">
                    {selectedCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-[10px] uppercase font-bold flex items-center gap-1 transition-colors"
                      >
                        {cat}
                        <X className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">Sort By:</span>
                <button className="flex items-center gap-1 text-sm font-semibold">
                  {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* PRODUCT GRID */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
              {isLoading ? (
                // ✅ SKELETON LOADER STATE
                [...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 aspect-[3/4] mb-4"></div>
                    <div className="h-3 bg-gray-200 w-1/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 w-1/2"></div>
                  </div>
                ))
              ) : filteredProducts.length > 0 ? (
                // ✅ ACTUAL PRODUCT DATA
                filteredProducts.map((product) => (
                  <div key={product.id} className="group">
                    {/* IMAGE CONTAINER */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      {/* DISCOUNT BADGE */}
                      {product.discount > 0 && (
                        <div className="absolute top-4 left-4 bg-black text-white px-2 py-1 text-[10px] font-bold uppercase tracking-tighter">
                          -{product.discount}%
                        </div>
                      )}

                      {/* QUICK ADD TO CART OVERLAY */}
                      <button className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm py-3 text-[11px] font-bold uppercase tracking-widest translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center items-center gap-2 hover:bg-amber-900 hover:text-white">
                        <ShoppingCartIcon className="w-3 h-3" />
                        Add to Cart
                      </button>
                    </div>

                    {/* PRODUCT DETAILS */}
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                        {product.category}
                      </p>
                      <h3 className="text-sm font-medium text-gray-900 group-hover:underline decoration-1 underline-offset-4">
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
                  </div>
                ))
              ) : (
                // ✅ EMPTY STATE
                <div className="col-span-full text-center py-24">
                  <p className="text-gray-400 italic">No products match your current filters.</p>
                  <button 
                    onClick={() => {setSelectedCategories([]); setPriceRange([0, 300]);}}
                    className="mt-4 text-sm font-bold uppercase tracking-widest text-amber-900 underline"
                  >
                    Reset all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}