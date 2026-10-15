import type { Product } from "./product";

export interface CartItem {
  cartItemId: string;
  productId: string;
  variantId: string | null;
  name: string;
  image: string;
  price: number;
  originalPrice: number | null;
  currency: string;
  category: Product["category"];
  size: string;
  color: string;
  quantity: number;
}

export interface AddToCartInput {
  product: Product;
  quantity?: number;
  size?: string;
  color?: string;
  variantId?: string | null;
}
