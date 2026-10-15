'use client';

import type { ReactNode } from 'react';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useCart } from './CartProvider';

type AddToCartButtonProps = {
  product: Product;
  quantity?: number;
  size?: string;
  color?: string;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
};

export function AddToCartButton({
  product,
  quantity = 1,
  size,
  color,
  disabled = false,
  className,
  children,
}: AddToCartButtonProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = () => {
    const selectedVariant = product.variants.find((variant) => variant.available && (!size || variant.size === size) && (!color || variant.color === color))
      ?? (!size && !color ? product.variants.find((variant) => variant.available) : undefined);
    if (product.variants.length > 0 && !selectedVariant) return;
    addItem({ product, quantity, size: selectedVariant?.size ?? size, color: selectedVariant?.color ?? color, variantId: selectedVariant?.id });

    startTransition(() => {
      router.push('/cart');
    });
  };

  return (
    <Button
      type="button"
      onClick={handleAddToCart}
      disabled={isPending || disabled || !product.inStock}
      className={cn('gap-2', className)}
    >
      <ShoppingCart className="size-4" />
      {children ?? 'Add to Cart'}
    </Button>
  );
}
