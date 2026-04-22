'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Product } from '@/app/lib/products-data';

const CART_STORAGE_KEY = 'fashion-saas-cart';
const SHIPPING_COST = 0;
const TAX_RATE = 0.08;

export type CartItem = {
  cartItemId: string;
  productId: number;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  category: Product['category'];
  size: string;
  color: string;
  quantity: number;
};

type AddToCartInput = {
  product: Product;
  quantity?: number;
  size?: string;
  color?: string;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  addItem: (input: AddToCartInput) => void;
  updateItemQuantity: (cartItemId: string, quantity: number) => void;
  removeItem: (cartItemId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function buildCartItemId(productId: number, size: string, color: string) {
  return `${productId}-${size}-${color}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') {
      return [];
    }

    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);

    if (!storedCart) {
      return [];
    }

    try {
      return JSON.parse(storedCart) as CartItem[];
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
    const shipping = items.length > 0 ? SHIPPING_COST : 0;
    const tax = subtotal * TAX_RATE;
    const total = subtotal + shipping + tax;

    return {
      items,
      itemCount,
      subtotal,
      shipping,
      tax,
      total,
      addItem: ({ product, quantity = 1, size, color }) => {
        const resolvedSize = size ?? product.availableSizes[0] ?? 'One Size';
        const resolvedColor = color ?? product.availableColors[0] ?? 'Default';
        const cartItemId = buildCartItemId(product.id, resolvedSize, resolvedColor);

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
              name: product.name,
              image: product.image,
              price: product.price,
              originalPrice: product.originalPrice,
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
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}
