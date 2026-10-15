'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { AddToCartInput, CartItem } from '@/types/cart';
import type { StorefrontHome } from '@/services/storefront.service';

const CART_STORAGE_KEY = 'fashion-saas-cart';

export type { CartItem };

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  currency: string;
  addItem: (input: AddToCartInput) => void;
  updateItemQuantity: (cartItemId: string, quantity: number) => void;
  removeItem: (cartItemId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function buildCartItemId(productId: string, variantId: string | null, size: string, color: string) {
  return `${productId}-${variantId ?? `${size}-${color}`}`;
}

export function CartProvider({ children, commerce }: { children: ReactNode; commerce: StorefrontHome['commerce'] }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') {
      return [];
    }

    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);

    if (!storedCart) {
      return [];
    }

    try {
      const parsed = JSON.parse(storedCart) as Partial<CartItem>[];
      if (!Array.isArray(parsed)) return [];
      return parsed
        .filter((item): item is Partial<CartItem> & { productId: string } => typeof item.productId === 'string')
        .map((item) => ({
          ...item,
          variantId: typeof item.variantId === 'string' ? item.variantId : null,
          currency: item.currency || commerce.currency,
        } as CartItem));
    } catch {
      window.localStorage.removeItem(CART_STORAGE_KEY);
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    // Display estimates only. The checkout API calculates the final totals.
    const shipping = items.length === 0 ? 0 : commerce.freeShippingThreshold !== null && subtotal >= commerce.freeShippingThreshold ? 0 : commerce.shippingFlatRate;
    const tax = subtotal * commerce.taxRatePercent / 100;
    const total = subtotal + shipping + tax;

    return {
      items,
      itemCount,
      subtotal,
      shipping,
      tax,
      total,
      currency: commerce.currency,
      addItem: ({ product, quantity = 1, size, color, variantId }) => {
        const resolvedSize = size ?? product.availableSizes[0] ?? 'One Size';
        const resolvedColor = color ?? product.availableColors[0] ?? 'Default';
        const selectedVariant = variantId
          ? product.variants.find((variant) => variant.id === variantId)
          : product.variants.find((variant) => variant.size === resolvedSize && variant.color === resolvedColor);
        const resolvedVariantId = selectedVariant?.id ?? null;
        const cartItemId = buildCartItemId(product.id, resolvedVariantId, resolvedSize, resolvedColor);

        setItems((currentItems) => {
          const existingItem = currentItems.find((item) => item.cartItemId === cartItemId);

          if (existingItem) {
            return currentItems.map((item) =>
              item.cartItemId === cartItemId
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            );
          }

          return [
            ...currentItems,
            {
              cartItemId,
              productId: product.id,
              variantId: resolvedVariantId,
              name: product.name,
              image: product.image,
              price: selectedVariant?.price ?? product.price,
              originalPrice: selectedVariant?.compareAtPrice ?? product.originalPrice,
              currency: product.currency,
              category: product.category,
              size: resolvedSize,
              color: resolvedColor,
              quantity,
            },
          ];
        });
      },
      updateItemQuantity: (cartItemId, quantity) => {
        setItems((currentItems) =>
          currentItems.flatMap((item) => {
            if (item.cartItemId !== cartItemId) {
              return [item];
            }

            if (quantity <= 0) {
              return [];
            }

            return [{ ...item, quantity }];
          }),
        );
      },
      removeItem: (cartItemId) => {
        setItems((currentItems) => currentItems.filter((item) => item.cartItemId !== cartItemId));
      },
      clearCart: () => setItems([]),
    };
  }, [items, commerce]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}
