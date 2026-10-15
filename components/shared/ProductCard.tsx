import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import type { Product } from "@/types/product";
import { AddToCartButton } from "@/app/components/cart/AddToCartButton";
import { PriceDisplay } from "@/components/shared/PriceDisplay";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact";
}

export function ProductCard({ product, variant = "default" }: ProductCardProps) {
  if (variant === "compact") {
    return (
      <Link href={`/products/${product.slug}`} className="group block">
        <div className="relative mb-4 aspect-square overflow-hidden border border-border bg-secondary transition-colors group-hover:border-accent">
          {product.image && <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />}
        </div>
        <h3 className="mb-2 text-sm font-medium transition-colors group-hover:text-accent">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <PriceDisplay price={product.price} priceClassName="text-sm" />
          <div className="flex items-center gap-1">
            <Star className="size-3.5 fill-accent text-accent" />
            <span className="text-xs text-foreground/60">{product.rating ?? "New"}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <article className="group">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative mb-4 aspect-3/4 overflow-hidden bg-gray-100">
          {product.image && <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />}
          {product.discount > 0 && (
            <div className="absolute left-4 top-4 bg-black px-2 py-1 text-[10px] font-bold uppercase tracking-tighter text-white">
              -{product.discount}%
            </div>
          )}
        </div>

        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            {product.category}
          </p>
          <h3 className="text-sm font-medium text-gray-900 group-hover:underline">{product.name}</h3>
          <PriceDisplay
            price={product.price}
            originalPrice={product.originalPrice ?? undefined}
            currency={product.currency}
            className="pt-1"
            priceClassName="text-sm text-gray-900"
            originalPriceClassName="text-xs text-gray-400"
          />
        </div>
      </Link>

      <AddToCartButton
        product={product}
        className="mt-4 h-11 w-full rounded-none bg-black py-3 text-[11px] font-bold uppercase tracking-[0.25em] text-white hover:bg-black/90"
      >
        Add to Cart
      </AddToCartButton>
    </article>
  );
}
