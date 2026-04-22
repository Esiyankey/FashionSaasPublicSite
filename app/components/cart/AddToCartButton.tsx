'use client';

import type { ReactNode } from 'react';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '@/app/lib/products-data';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useCart } from './CartProvider';

type AddToCartButtonProps = {
  product: Product;
  quantity?: number;
  size?: string;
  color?: string;
  className?: string;
  children?: ReactNode;
};

export function AddToCartButton({
  product,
  quantity = 1,
  size,
  color,
  className,
  children,
}: AddToCartButtonProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = () => {
    addItem({ product, quantity, size, color });

    startTransition(() => {
      router.push('/cart');
    });
  };

  return (
    <Button
      type="button"
      onClick={handleAddToCart}
      disabled={isPending}
      className={cn('gap-2', className)}
    >
      <ShoppingCart className="size-4" />
      {children ?? 'Add to Cart'}
    </Button>
  );
}
