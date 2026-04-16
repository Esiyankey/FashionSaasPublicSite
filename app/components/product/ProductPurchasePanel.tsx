"use client";

import { useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/app/lib/products-data";

const tabs = [
  { id: "description", label: "Description" },
  { id: "specifications", label: "Specifications" },
  { id: "reviews", label: "Reviews" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function ProductPurchasePanel({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState(product.availableSizes[0] ?? "One Size");
  const [selectedColor, setSelectedColor] = useState(product.availableColors[0] ?? "Default");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<TabId>("description");
  const [wishlist, setWishlist] = useState(false);

  return (
    <>
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="mb-4 text-4xl font-light text-balance">{product.name}</h1>

          <div className="mb-6 flex items-center gap-4 border-b border-border pb-6">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  className={cn(
                    "size-4 transition-colors",
                    index < Math.floor(product.rating)
                      ? "fill-accent text-accent"
                      : "text-border",
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-foreground/60">{product.rating} average rating</span>
          </div>

          <p className="mb-6 leading-relaxed text-foreground/70">{product.description}</p>

          <div className="mb-8">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest">
              Special Features
            </h2>
            <ul className="space-y-2">
              {product.features.map((feature) => (
                <li key={feature} className="flex gap-3 text-sm text-foreground/70">
                  <span className="mt-1 text-accent">+</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <label className="mb-3 block text-sm font-semibold uppercase tracking-widest">
              Size
            </label>
            <div className="flex flex-wrap gap-2">
              {product.availableSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "rounded border-2 px-4 py-2 text-sm font-medium transition-all",
                    selectedSize === size
                      ? "border-accent bg-secondary"
                      : "border-border hover:border-accent/50",
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="mb-3 block text-sm font-semibold uppercase tracking-widest">
              Color
            </label>
            <div className="flex flex-wrap gap-3">
              {product.availableColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    "rounded border-2 px-4 py-2 text-sm transition-all",
                    selectedColor === color
                      ? "border-accent bg-secondary"
                      : "border-border hover:border-accent/50",
                  )}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6 flex items-center gap-4 border-b border-border pb-6">
            <div className="flex items-center  border border-border">
              <button
                type="button"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                className="px-4 py-2 transition-colors hover:bg-secondary"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="px-6 py-2 text-center">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((current) => current + 1)}
                className="px-4 py-2 transition-colors hover:bg-secondary"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <div className="flex-1 text-right">
              <p className="text-sm text-foreground/60">Price</p>
              <div className="flex items-baseline justify-end gap-2">
                <span className="text-3xl font-light">${product.price}</span>
                <span className="text-sm text-foreground/40 line-through">
                  ${product.originalPrice}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2  bg-accent py-4 font-semibold tracking-wide text-accent-foreground transition-opacity hover:opacity-90"
          >
            <ShoppingCart className="size-5" />
            Add to Cart
          </button>
          <button
            type="button"
            onClick={() => setWishlist((current) => !current)}
            className={cn(
              "flex w-full items-center justify-center gap-2  border-2 py-4 font-semibold tracking-wide transition-all",
              wishlist
                ? "border-accent bg-secondary text-accent"
                : "border-border hover:border-accent",
            )}
          >
            <Heart className="size-5" fill={wishlist ? "currentColor" : "none"} />
            {wishlist ? "Added to Wishlist" : "Add to Wishlist"}
          </button>
        </div>
      </div>

      <div className="mb-16 border-t border-border pt-12">
        <div className="mb-8 flex gap-8 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative pb-4 text-sm font-semibold uppercase tracking-widest transition-colors",
                activeTab === tab.id ? "text-primary" : "text-foreground/60 hover:text-foreground",
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />
              )}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {activeTab === "description" && (
            <>
              <p className="leading-relaxed text-foreground/70">{product.description}</p>
              <p className="leading-relaxed text-foreground/70">{product.summary}</p>
            </>
          )}
          {activeTab === "specifications" && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest">Category</h3>
                <p className="text-foreground/70">{product.category}</p>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest">Product Type</h3>
                <p className="text-foreground/70 capitalize">{product.productType}</p>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest">Available</h3>
                <p className="text-foreground/70">{product.availableSizes.join(", ")}</p>
              </div>
            </div>
          )}
          {activeTab === "reviews" && (
            <div className="py-12 text-center text-foreground/60">
              No reviews yet. Be the first to review this product.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
